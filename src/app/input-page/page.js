"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ missing import
import { useBackend } from "../context/BackendContext";

export default function Home() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);

  // ✅ Access backend context
  const { backendData, setBackendData, clearBackendData, loading, setLoading } =
    useBackend();

  // Reset loading if phone becomes invalid
  useEffect(() => {
    if (phone.length !== 10) {
      setLoading(false);
    }
  }, [phone, setLoading]);

  // Phone validation
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // remove non-numbers
    if (value.length > 10) value = value.slice(0, 10);
    setPhone(value);

    if (value.length === 0) setError("");
    else if (value.length < 10) setError("Phone number must be 10 digits");
    else setError("");
  };

  // Function to send data to backend
  const sendPhoneNumber = async () => {
    const fullPhone = `+234-${phone}`;

    try {
      setLoading(true); // start loading
      clearBackendData(); // remove old data

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/score_and_generate_pdf/${fullPhone}`;

      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Request failed with status " + res.status);

      const data = await res.json();
      console.log(data);
      setBackendData(data); // save new data (also persists in localStorage)
    } catch (error) {
      console.error("Error sending phone:", error.message);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Banner */}
      <div className="w-full h-64 md:h-80 relative overflow-hidden">
        <img
          src="/images/pictureee.jpg"
          alt="Credit Card Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form */}
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

        {/* CONSENT CHECKBOX */}
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
        <button
          onClick={() => {
            sendPhoneNumber(); // async, don’t await
            router.push("/analyzing-page");
          }}
          disabled={!consent || phone.length !== 10 || loading}
          className={`w-full text-center bg-blue-600 text-white py-3 mt-6 rounded-lg text-lg font-medium transition
          ${
            !consent || phone.length !== 10 || loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Generating..." : "Generate Score"}
        </button>
      </div>
    </div>
  );
}
