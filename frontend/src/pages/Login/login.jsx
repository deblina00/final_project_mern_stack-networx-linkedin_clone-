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
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-[85%] md:w-[28%] shadow-xl rounded-sm box p-10">
        <div className="text-3xl">Sign In</div>

        <div className="my-5">
          <GoogleLoginComp changeLoginValue={props.changeLoginValue} />
        </div>

        <div className="flex items-center gap-2">
          <div className="border-b w-[45%]" /> <div>or</div>
          <div className="border-b w-[45%]" />
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <input
            value={loginField.emailOrUsername}
            onChange={(e) => onChangeInput(e, "emailOrUsername")}
            type="text"
            className="w-full border px-5 py-1"
            placeholder="Email or Username"
          />

          <input
            value={loginField.password}
            onChange={(e) => onChangeInput(e, "password")}
            type="password"
            className="w-full text-xl border rounded-lg px-5 py-1"
            placeholder="Password"
          />

          <div
            onClick={handleLogin}
            className="w-full bg-blue-800 text-white py-3 rounded-xl text-center text-xl cursor-pointer"
          >
            Login
          </div>
        </div>
      </div>

      <div className="mt-4 mb-14">
        New to LinkedIn?{" "}
        <Link to="/signUp" className="text-blue-800">
          Join Now
        </Link>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
