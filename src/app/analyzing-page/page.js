"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import ProgressCard from "../components/ProgressCard.js";
import { useBackend } from "../context/BackendContext.js";

export default function AnalyzingPage() {
  const router = useRouter();
  const { backendData } = useBackend();

  // Main circular progress
  const [circleValue, setCircleValue] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  //   const pie = backendData?.score_result.score

  // Progress card data
  const [mockDatap, setMockDatap] = useState({
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    p5: 0,
  });

  // Update mockDatap when backendData arrives
  useEffect(() => {
    if (backendData) {
      setMockDatap({
        p1: Math.round(
          (backendData.score_result.score_factors.mobile_money_pattern
            .momo_balance +
            backendData.score_result.score_factors.mobile_money_pattern
              .momo_avg_monthly_inflow +
            backendData.score_result.score_factors.mobile_money_pattern
              .momo_avg_monthly_outflow +
            backendData.score_result.score_factors.mobile_money_pattern
              .momo_avg_monthly_transaction_count) /
            4
        ),
        p2: Math.round(
          backendData.score_result.score_factors.loan_app_pattern
            .transfer_to_loan_app
        ),
        p3: Math.round(
          (backendData.score_result.score_factors.mobile_transaction_pattern
            .avg_monthly_airtime_top_up +
            backendData.score_result.score_factors.mobile_transaction_pattern
              .avg_monthly_mobile_data_usage_gb) /
            2
        ),
        p4: Math.round(
          (backendData.score_result.score_factors.sim_usage_pattern
            .current_sim_use_duration_mt +
            backendData.score_result.score_factors.sim_usage_pattern
              .sim_swap_freq) /
            2
        ),
        p5: Math.round(
          (backendData.score_result.score_factors.income_stability
            .momo_savings_ratio +
            backendData.score_result.score_factors.income_stability
              .employment_status) /
            2
        ),
        p6: Math.round(
          backendData.score_result.score_factors.app_usage_pattern
            .app_usage_category
        ),
      });
    }
  }, [backendData]);

  // Animate main circular progress
  useEffect(() => {
    if (!isComplete) {
      const interval = setInterval(() => {
        setCircleValue((prev) => {
          const next = prev + 1;
          if (next >= 100) {
            clearInterval(interval);
            setIsComplete(true);
            setTimeout(() => {
              router.push("/credscore-page");
            }, 1000);
            return 100;
          }
          return next;
        });
      }, 170); // 17oms is the speed it takes
      return () => clearInterval(interval);
    }
  }, [isComplete, router]);
  const totalTime = 20; // seconds

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-2">
      {/* Main Circular Progress */}
      <div className="w-40 h-40">
        <CircularProgressbar
          value={circleValue}
          text={`${circleValue}/100`}
          styles={buildStyles({
            textColor: "#000",
            pathColor: "#3b82f6",
            trailColor: "#e5e7eb",
          })}
        />
      </div>
      <p className="mt-6 text-gray-700 text-lg">
        {isComplete ? "Analysis Complete ✅" : "Analyzing data securely..."}
      </p>
      <p className="text-gray-400 text-sm mt-1">
        Estimated time:{" "}
        {Math.max(0, totalTime - Math.floor((circleValue / 100) * totalTime))}{" "}
        seconds
      </p>
      {/* Grid of Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12 w-full">
        <ProgressCard
          icon="/images/Group.png"
          title="Mobile Money Patterns"
          label={backendData ? "Completed" : "Loading transactions..."}
          targetValue={mockDatap.p1}
          speed={10}
        />
        <ProgressCard
          icon="/images/Group (1).png"
          title="Loan App History"
          label={backendData ? "Completed" : "Verifying loan records..."}
          targetValue={mockDatap.p2}
          speed={10}
        />
        <ProgressCard
          icon="/images/Group (2).png"
          title="Sim Top-up Pattern"
          label={backendData ? "Completed" : "Analyzing top-up trends..."}
          targetValue={mockDatap.p3}
          speed={10}
        />
        <ProgressCard
          icon="/images/Group (3).png"
          title="Sim Stability Check"
          label={backendData ? "Completed" : "Evaluating sim usage pattern..."}
          targetValue={mockDatap.p4}
          speed={10}
        />
        <ProgressCard
          icon="/images/streamline-cyber-color_network.png"
          title="Income Pattern"
          label={backendData ? "Completed" : "Evaluating income flow"}
          targetValue={mockDatap.p5}
          speed={10}
        />
        <ProgressCard
          icon="/images/betting.png"
          title="Betting App Usuage"
          label={backendData ? "Completed" : "Verifying betting frequency"}
          targetValue={mockDatap.p6}
          speed={10}
        />
      </div>
      {/* <p>{pie}hiii</p> */}
    </div>
  );
}
