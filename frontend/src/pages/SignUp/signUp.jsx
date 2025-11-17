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
      const res = await api.post("/auth/register", registerField);

      toast.success("OTP sent! Please verify your email.");

      navigate("/verify-otp", {
        state: { email: registerField.email }, // SEND EMAIL FOR VERIFY PAGE
      });
    } catch (err) {
      toast.error(err?.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="text-4xl mb-5">
        Make the most of your professional life
      </div>

      <div className="w-[85%] md:w-[28%] shadow-xl rounded-sm box p-10">
        <div className="flex flex-col gap-4">
          <div>
            <label>Email</label>
            <input
              value={registerField.email}
              onChange={(e) => handleInputField(e, "email")}
              type="text"
              className="w-full text-xl border-2 rounded-lg px-5 py-1"
              placeholder="Email"
            />
          </div>

          <div>
            <label>Password</label>
            <input
              value={registerField.password}
              onChange={(e) => handleInputField(e, "password")}
              type="password"
              className="w-full text-xl border-2 rounded-lg px-5 py-1"
              placeholder="Password"
            />
          </div>

          <div>
            <label>Full name</label>
            <input
              value={registerField.f_name}
              onChange={(e) => handleInputField(e, "f_name")}
              type="text"
              className="w-full text-xl border-2 rounded-lg px-5 py-1"
              placeholder="Full name"
            />
          </div>

          <div>
            <label>Username</label>
            <input
              value={registerField.username}
              onChange={(e) => handleInputField(e, "username")}
              type="text"
              className="w-full text-xl border-2 rounded-lg px-5 py-1"
              placeholder="Username"
            />
          </div>

          <div
            onClick={handleRegister}
            className="w-full hover:bg-blue-900 bg-blue-800 text-white py-3 px-4 rounded-xl text-center text-xl cursor-pointer my-2"
          >
            Register
          </div>
        </div>

        <div className="my-5">
          <GoogleLoginComp changeLoginValue={props.changeLoginValue} />
        </div>
      </div>

      <div className="mt-4 mb-10">
        Already on LinkedIn?{" "}
        <Link to={"/login"} className="text-blue-800 cursor-pointer">
          Sign in
        </Link>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignUp;
