import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginComp from "../../components/GoogleLogin/googleLoginComp";
import { ToastContainer, toast } from "react-toastify";
import api from "../../lib/api";

const Login = (props) => {
  const navigate = useNavigate();
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
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#f3f2ef]">
      <div className="w-[90%] md:w-[28%] bg-white shadow-lg rounded-lg p-10">
        {/* Heading */}
        <div className="text-4xl font-semibold text-gray-900 mb-6">Sign in</div>

        {/* Google Sign In */}
        <div className="mb-6">
          <GoogleLoginComp changeLoginValue={props.changeLoginValue} />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-gray-500">or</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4 mt-4">
          <input
            value={loginField.emailOrUsername}
            onChange={(e) => onChangeInput(e, "emailOrUsername")}
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:border-purple-500 focus:outline-none"
            placeholder="Email or Username"
          />

          <input
            value={loginField.password}
            onChange={(e) => onChangeInput(e, "password")}
            type="password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:border-purple-500 focus:outline-none"
            placeholder="Password"
          />

          {/* Login button */}
          <button
            onClick={handleLogin}
            className="w-full bg-linear-to-r from-purple-600 to-purple-900 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-200 rounded-full text-lg py-2.5"
          >
            Sign in
          </button>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-4 mb-10 text-gray-700">
        New to Networx?{" "}
        <Link to="/signUp" className="text-blue-700 font-semibold">
          Join now
        </Link>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
