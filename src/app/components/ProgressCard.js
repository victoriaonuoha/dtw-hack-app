"use client";

import { useEffect, useState } from "react";

export default function ProgressCard({
  icon,
  title,
  label,
  targetValue = 0,
  speed = 40,
  useColor = false,
}) {
  const [progress, setProgress] = useState(0);
  const getColor = (value) => {
    if (value >= 0 && value <= 39) return "bg-yellow-500";
    if (value >= 40 && value <= 50) return "bg-blue-600";
    if (value > 50 && value <= 100) return "bg-green-600";
    return "bg-gray-400";
  };

    // If useColor is false → default blue
  const progressColor = useColor ? getColor(targetValue) : "bg-blue-600";

  useEffect(() => {
    // Reset progress when targetValue changes
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= targetValue) {
          clearInterval(interval); // stop interval
          return targetValue; // ensure exact final value
        }
        return prev + 1; // increment
      });
    }, speed);

    return () => clearInterval(interval); // cleanup on unmount or target change
  }, [targetValue, speed]);

  return (
    <div className="bg-[#E9EBED] p-4 rounded-xl shadow">
      <div className="flex items-center gap-4">
        <img src={icon} alt="" />
        <h2 className="text-sm font-semibold mt-2">{title}</h2>
      </div>

      <h2 className="text-xs font-semibold text-end">{progress}%</h2>

      <div className="w-full h-6 bg-gray-200 rounded-full mt-2">
        <div
          className={`h-full rounded-full ${progressColor}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-xs mt-2 text-gray-500">{label}</p>
    </div>
  );
}
