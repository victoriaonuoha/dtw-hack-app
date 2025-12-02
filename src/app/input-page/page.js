"use client";

import Link from "next/link";
import { useState } from "react";

//import { useBackend } from "../context/BackendContext"; // ✅ import hook

export default function Home() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);

  // Phone validation logic
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // remove non-numbers

    if (value.length > 10) value = value.slice(0, 10);

    setPhone(value);

    if (value.length === 0) setError("");
    else if (value.length < 10) setError("Phone number must be 10 digits");
    else setError("");
  };
  // Function to send data to backend

  const { backendData, setBackendData, clearBackendData } = useBackend();

  const sendPhoneNumber = async () => {
    const fullPhone = `+234-${phone}`;

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/score_and_generate_pdf/${fullPhone}`;

      // Since a NEW phone was submitted → clear old data first
      clearBackendData();

      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Request failed with status " + res.status);

      const data = await res.json();

      // Save the new data (automatically saved to localStorage)
      setBackendData(data);

      console.log("Backend Response:", data);
    } catch (error) {
      console.error("Error sending phone:", error.message);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="w-full h-64 md:h-80 relative overflow-hidden">
          <img
            src="/images/pictureee.jpg"
            alt="Credit Card Banner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-xl mx-auto px-6 py-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-center mb-6">
            Check Your Credit Score
          </h1>

          <p className="text-center text-gray-600 mb-6">
            Enter the phone number tied to your utility bills and mobile money
          </p>

          {/* PHONE INPUT */}
          <div className="bg-white rounded-xl border p-4 flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🇳🇬</span>
              <span className="font-medium">+234</span>
            </div>

            <input
              type="tel"
              className="flex-1 outline-none"
              placeholder="Enter phone number"
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>

          {/* ERROR MESSAGE */}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <label className="flex items-start space-x-2 mt-4 text-sm text-gray-600">
            <input
              type="checkbox"
              className="mt-1"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>I consent to processing my phone meta-data</span>
          </label>

          {/* BUTTON triggers backend send */}
          <Link
            href="#"
            onClick={sendPhoneNumber}
            className={`w-full block text-center bg-blue-600 text-white py-3 mt-6 rounded-lg text-lg font-medium hover:bg-blue-700 transition
    ${
      !consent || phone.length !== 10
        ? "opacity-50 cursor-not-allowed pointer-events-none"
        : ""
    }`}
          >
            Generate Score
          </Link>
        </div>
      </div>
    </div>
  );
}
