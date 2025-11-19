import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../lib/api";

export default function VerifyOtpPage() {
  const loc = useLocation();
  const nav = useNavigate();

  const [email, setEmail] = useState(loc.state?.email || "");
  const [otp, setOtp] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await api.post("/auth/verify-otp", { email, otp });
      alert("Email verified! You may now login.");
      nav("/login");
    } catch (err) {
      alert(err.response?.data?.error || "OTP verification failed");
    }
  }

  async function resend() {
    try {
      await api.post("/auth/resend-otp", { email });
      alert("OTP resent to your email.");
    } catch (err) {
      alert(err.response?.data?.error || "OTP resend failed");
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#f3f2ef]">
      <div className="w-[90%] md:w-[28%] max-w-md bg-white p-8 shadow-lg rounded-lg ">
        <div className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          Verify your email
        </div>

        <form onSubmit={submit} className="mt-4 space-y-3">
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:border-purple-500 focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:border-purple-500 focus:outline-none"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button className="w-full bg-linear-to-r from-purple-600 to-purple-900 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-200 rounded-full text-lg py-2.5">
            Verify OTP
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          Didn’t receive it?{" "}
          <button onClick={resend} className="text-blue-800 font-semibold">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}
