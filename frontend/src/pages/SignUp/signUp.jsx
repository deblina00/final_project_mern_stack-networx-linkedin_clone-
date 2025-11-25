import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginComp from "../../components/GoogleLogin/googleLoginComp";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import api from "../../lib/api";

const SignUp = (props) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Add loading state
  const [registerField, setRegisterField] = useState({
    email: "",
    password: "",
    f_name: "",
    username: "",
  });

  const togglePassword = () => setShowPassword(!showPassword);

  const handleInputField = (e, key) => {
    setRegisterField({ ...registerField, [key]: e.target.value });
  };

  const handleRegister = async () => {
    if (loading) return; // prevent duplicate requests
    if (
      !registerField.email ||
      !registerField.password ||
      !registerField.f_name ||
      !registerField.username
    ) {
      return toast.error("Please fill all details.");
    }

    setLoading(true); // start loading

    try {
      const response = await api.post("/auth/register", registerField);

      toast.success("OTP sent! Please verify your email.");
      navigate("/verify-otp", { state: { email: registerField.email } });
    } catch (err) {
      const errorMsg =
        err?.response?.data?.error || err?.response?.data?.message || "Registration failed";
      toast.error(errorMsg);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-50 min-h-screen px-4">
      {/* Heading */}
      <div className="text-3xl sm:text-4xl md:text-5xl font-semibold text-purple-700 mb-6 text-center leading-snug px-2">
        Make the most of your
        <br className="hidden sm:block" /> professional life
      </div>

      {/* Signup Card */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8 sm:p-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
          className="flex flex-col gap-4"
        >
          {/* Email */}
          <div>
            <label className="text-gray-600 font-medium">Email</label>
            <input
              value={registerField.email}
              onChange={(e) => handleInputField(e, "email")}
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:border-purple-500 focus:outline-none"
              placeholder="Email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-600 font-medium">Password</label>
            <div className="relative">
              <input
                value={registerField.password}
                onChange={(e) => handleInputField(e, "password")}
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 text-base focus:border-purple-500 focus:outline-none"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="text-gray-600 font-medium">Full Name</label>
            <input
              value={registerField.f_name}
              onChange={(e) => handleInputField(e, "f_name")}
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:border-purple-500 focus:outline-none"
              placeholder="Full name"
            />
          </div>

          {/* Username */}
          <div>
            <label className="text-gray-600 font-medium">Username</label>
            <input
              value={registerField.username}
              onChange={(e) => handleInputField(e, "username")}
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:border-purple-500 focus:outline-none"
              placeholder="Username"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-medium rounded-full text-lg py-2.5 shadow-md transition-all duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-gray-200"
                : "bg-linear-to-r from-purple-600 to-purple-900 text-white hover:shadow-lg hover:scale-[1.03]"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-gray-500">or</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          {/* Google Login */}
          <div className="flex justify-center sm:block">
            <GoogleLoginComp changeLoginValue={props.changeLoginValue} />
          </div>
        </form>
      </div>

      {/* Bottom link */}
      <div className="mt-6 text-lg mb-10 text-center">
        Already on Networx?{" "}
        <Link
          to="/login"
          className="text-purple-700 font-semibold hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
