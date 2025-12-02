"use client";

import { useEffect, useState } from "react";

export default function ProgressCard({
  icon,
  title,
  label,
  targetValue = 0,
  speed = 40,
}) {
  const [progress, setProgress] = useState(0);

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

      <div className="w-full h-4 bg-gray-200 rounded-full mt-2">
        <div
          className="h-full bg-blue-600 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-xs mt-2 text-gray-500">{label}</p>
    </div>
  );
}
