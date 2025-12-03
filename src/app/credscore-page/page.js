"use client";

import { useEffect, useState, useRef } from "react";
import Confetti from "react-confetti";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressCard from "../components/ProgressCard";
import { useBackend } from "../context/BackendContext";
import { HiDownload } from "react-icons/hi";

export default function CreditScoreScreen() {
  const { backendData, loading } = useBackend();

  const [animatedScore, setAnimatedScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // If loading OR no backend data → show nothing
  if (loading || !backendData) return null;

  const score = backendData.score_result.score;
  const MAX_SCORE = 100;

  // Score Color 
  const getScoreColor = (val) => {
    if (val <= 30) return "#FACC15"; // yellow
    if (val <= 50) return "#3B82F6"; // blue
    return "#22C55E"; // green
  };
  const scoreColor = getScoreColor(animatedScore);

  //  Score Animation 

const prevScoreRef = useRef(0);

useEffect(() => {
  if (score == null) return;

  const startValue = prevScoreRef.current;  // start from previous score
  const endValue = score;                   // animate to new score

  const duration = 1000; // 2 seconds
  const startTime = performance.now();

  const animate = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);

    // Linear interpolation between startValue → endValue
    const currentValue =
      startValue + (endValue - startValue) * progress;

    setAnimatedScore(currentValue);

    if (progress < 1) requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);

  // Save new score for next animation
  prevScoreRef.current = score;
}, [score]);



  // -------- Confetti --------


 
  useEffect(() => {
    if (Math.round(animatedScore) === score && score >= 50) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [animatedScore]);

  // -------- Score Factor Calculations --------
  const factors = backendData.score_result.score_factors;

  const p1 = Math.round(
    (factors.mobile_money_pattern.momo_balance +
      factors.mobile_money_pattern.momo_avg_monthly_inflow +
      factors.mobile_money_pattern.momo_avg_monthly_outflow +
      factors.mobile_money_pattern.momo_avg_monthly_transaction_count) /
      4
  );

  const p2 = Math.round(factors.loan_app_pattern.transfer_to_loan_app);

  const p3 = Math.round(
    (factors.mobile_transaction_pattern.avg_monthly_airtime_top_up +
      factors.mobile_transaction_pattern.avg_monthly_mobile_data_usage_gb) /
      2
  );

  const p4 = Math.round(
    (factors.sim_usage_pattern.current_sim_use_duration_mt +
      factors.sim_usage_pattern.sim_swap_freq) /
      2
  );

  const p5 = Math.round(
    (factors.income_stability.momo_savings_ratio +
      factors.income_stability.employment_status) /
      2
  );
  const p6 = Math.round(factors.app_usage_pattern.app_usage_category);

  const breakdown = backendData.score_result.score_breakdown;

  // -------- Download PDF --------
  const downloadPdf = () => {
    if (!backendData?.pdf_report) return;

    const byteCharacters = atob(backendData.pdf_report);
    const byteArray = new Uint8Array(
      [...byteCharacters].map((c) => c.charCodeAt(0))
    );

    const blob = new Blob([byteArray], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = backendData.filename || "report.pdf";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center bg-gray-50">
      {showConfetti && (
        <Confetti
          style={{ position: "fixed", top: 0, left: 0 }}
          width={document.documentElement.clientWidth}
          height={document.documentElement.clientHeight}
        />
      )}

      {/* SCORE CIRCLE */}
      <div className="mt-10 w-[20rem] h-[220px]">
        <CircularProgressbarWithChildren
          value={(animatedScore / MAX_SCORE) * 100}
          strokeWidth={12}
          circleRatio={300 / 360}
          styles={buildStyles({
            rotation: 0.58,
            pathColor: scoreColor,
            trailColor: "#E5E7EB",
            strokeLinecap: "round",
            
          })}
        >
          <div className="text-center">
            <p className="text-5xl font-bold" style={{ color: scoreColor }}>
              {Math.round(animatedScore)}%
            </p>
            <p className="text-xl font-semibold" style={{ color: scoreColor }}>
              {animatedScore <= 30
                ? "Poor"
                : animatedScore <= 50
                ? "Fair"
                : "Good"}
            </p>
          </div>
        </CircularProgressbarWithChildren>
      </div>

      {/* LOAN ELIGIBILITY */}
      <div className="mt-12 bg-white p-4 shadow rounded-xl text-center z-50">
        <p className="text-gray-600 text-xl">Loan Eligibility</p>
        <p className="text-xl font-semibold">
          Up to ₦{backendData.score_result.eligible_loan_amount}
        </p>
      </div>

      {/* PROGRESS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12 w-full px-6">
        <ProgressCard
          icon="/images/Group.png"
          title="Mobile Money Patterns"
          label="Loading transactions..."
          targetValue={p1}
          speed={10}
          useColor={true}
        />
        <ProgressCard
          icon="/images/Group (1).png"
          title="Loan App History"
          label="Verifying loan records..."
          targetValue={p2}
          speed={10}
          useColor={true}
        />
        <ProgressCard
          icon="/images/Group (2).png"
          title="Sim Top-up Pattern"
          label="Analyzing top-up trends..."
          targetValue={p3}
          speed={10}
          useColor={true}
        />
        <ProgressCard
          icon="/images/Group (3).png"
          title="SIM Stability Check"
          label="Evaluating SIM usage..."
          targetValue={p4}
          speed={10}
          useColor={true}
        />
        <ProgressCard
          icon="/images/streamline-cyber-color_network.png"
          title="Income Pattern"
          label="Evaluating income flow..."
          targetValue={p5}
          speed={10}
          useColor={true}
        />
        <ProgressCard
          icon="/images/betting.png"
          title="Betting App Usuage"
          label="Verifying Betting Frequency..."
          targetValue={p6}
          speed={10}
          useColor={true}
        />
      </div>

      {/* BREAKDOWN */}
      <h2 className="text-3xl font-semibold mb-0 mt-8 w-full lg:w-[70%] ">
        Score Breakdown
      </h2>
      <div className="px-2 md:px-0 lg:w-[70%] w-full">
        <div className=" mt-2 bg-[#E9EBED] p-4 rounded-xl shadow ">
          <div className="space-y-5 text-xl md:text-2xl">
            <BreakdownItem
              label="Loan History"
              value={breakdown.loan_app_pattern}
            />
            <BreakdownItem
              label="Income Stability"
              value={breakdown.income_stability}
            />
            <BreakdownItem
              label="Transaction Consistency"
              value={breakdown.mobile_transaction_pattern}
            />

            <div className="flex gap-12 items-center justify-between p-3 rounded-lg border-[#11182780]  border-b">
              <div className="flex gap-2 items-center whitespace-nowrap">
                <img src="/images/bxs_error.png" alt="" />
                <span className="text-gray-700">Risk Flag</span>
              </div>

              <span className="text-yellow-700 md:text-[22px] text-right text-12px max-w-[30rem]">
                {breakdown.risk_flag}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PDF BUTTON */}
      <div className="flex w-full lg:w-[70%] justify-end my-8">
        <button
          onClick={downloadPdf}
          className="px-8 py-4 bg-[#2D85FF] cursor-pointer text-white rounded-xl font-medium hover:bg-[#064499] flex items-center gap-2"
        >
          <HiDownload size={20} />
          Download PDF Report
        </button>
      </div>
    </div>
  );
}

// -------- BREAKDOWN ITEM --------
function BreakdownItem({ label, value }) {
  return (
    <div className="flex justify-between items-center p-3 bg-[#E9EBED] rounded-lg border-[#11182780]  border-b">
      <div className="flex gap-2 items-center">
        <img src="/images/lets-icons_check-fill.png" alt="" />
        <span className="font-medium text-gray-700">{label}</span>
      </div>
      <span className="font-medium text-green-700">{value}</span>
    </div>
  );
}
