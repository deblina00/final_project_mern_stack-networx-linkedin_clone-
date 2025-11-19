import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginComp from "../../components/GoogleLogin/googleLoginComp";
import { ToastContainer, toast } from "react-toastify";
import api from "../../lib/api";

const SignUp = (props) => {
  const navigate = useNavigate();
  const [registerField, setRegisterField] = useState({
    email: "",
    password: "",
    f_name: "",
    username: "",
  });

  const handleInputField = (e, key) => {
    setRegisterField({ ...registerField, [key]: e.target.value });
  };

  const handleRegister = async () => {
    if (
      !registerField.email ||
      !registerField.password ||
      !registerField.f_name ||
      !registerField.username
    ) {
      return toast.error("Please Fill All Details.");
    }

    try {
      await api.post("/auth/register", registerField);

      toast.success("OTP sent! Please verify your email.");
      navigate("/verify-otp", { state: { email: registerField.email } });
    } catch (err) {
      toast.error(err?.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-50 min-h-screen px-4">
      {/* Heading */}
      <div className="text-4xl md:text-5xl font-semibold text-purple-700 mb-6 text-center">
        Make the most of your professional life
      </div>

      {/* Signup Card */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8 md:p-10">
        <div className="flex flex-col gap-4">
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

          <div>
            <label className="text-gray-600 font-medium">Password</label>
            <input
              value={registerField.password}
              onChange={(e) => handleInputField(e, "password")}
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:border-purple-500 focus:outline-none"
              placeholder="Password"
            />
          </div>

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
            onClick={handleRegister}
            className="w-full bg-linear-to-r from-purple-600 to-purple-900 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-200 rounded-full text-lg py-2.5"
          >
            Register
          </button>
          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-gray-500">or</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          {/* Google Login */}
          <div>
            <GoogleLoginComp changeLoginValue={props.changeLoginValue} />
          </div>
        </div>
      </div>

      {/* Bottom link */}
      <div className="mt-6 text-lg mb-10">
        Already on Networx?{" "}
        <Link to={"/login"} className="text-blue-800 font-semibold">
          Sign in
        </Link>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignUp;
