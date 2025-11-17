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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-xl font-semibold">Verify your email</h2>

        <form onSubmit={submit} className="mt-4 space-y-3">
          <input
            className="w-full border p-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Verify OTP
          </button>
        </form>

        <div className="mt-3 text-sm">
          Didn’t receive it?{" "}
          <button onClick={resend} className="text-blue-600">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}
