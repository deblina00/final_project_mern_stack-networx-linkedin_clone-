import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginComp from "../../components/GoogleLogin/googleLoginComp";
import { toast } from "react-toastify";
import api from "../../lib/api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = (props) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [loginField, setLoginField] = useState({
    emailOrUsername: "",
    password: "",
  });

  const onChangeInput = (e, key) => {
    setLoginField({ ...loginField, [key]: e.target.value });
  };

  const handleLogin = async () => {
    if (!loginField.emailOrUsername || !loginField.password) {
      return toast.error("Please fill all credentials");
    }

    try {
      const res = await api.post("/auth/login", loginField);
      toast.success("Login Successful! Welcom to Networx.");
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
      localStorage.setItem("isLogin", "true");

      props.changeLoginValue(true);
      navigate("/feeds");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#f3f2ef] px-4">
      {/* Card */}
      <div className="w-full max-w-[420px] bg-white shadow-xl rounded-lg p-8 sm:p-10">
        {/* Heading */}
        <div className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6 text-center sm:text-left">
          Sign in
        </div>

        {/* Google Sign-In */}
        <div className="mb-6 flex justify-center sm:block">
          <GoogleLoginComp changeLoginValue={props.changeLoginValue} />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-gray-500">or</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>

        {/* Inputs */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="flex flex-col gap-4 mt-4"
        >
          {/* Email / Username */}
          <input
            value={loginField.emailOrUsername}
            onChange={(e) => onChangeInput(e, "emailOrUsername")}
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:border-purple-500 focus:outline-none"
            placeholder="Email or Username"
          />

          {/* Password with eye icon */}
          <div className="relative w-full">
            <input
              value={loginField.password}
              onChange={(e) => onChangeInput(e, "password")}
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 text-base focus:border-purple-500 focus:outline-none"
              placeholder="Password"
            />

            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-800 text-xl"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-purple-600 to-purple-900 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-200 rounded-full text-lg py-2.5"
          >
            Sign in
          </button>
        </form>
      </div>

      {/* Bottom Text */}
      <div className="mt-4 mb-10 text-gray-700 text-center">
        New to Networx?{" "}
        <Link
          to="/signUp"
          className="text-purple-700 font-semibold hover:underline"
        >
          Join now
        </Link>
      </div>
    </div>
  );
};

export default Login;
