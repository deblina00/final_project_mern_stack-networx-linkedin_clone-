import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import api from "../../lib/api";
import { useNavigate } from "react-router-dom";

const GoogleLoginComp = (props) => {
  const navigate = useNavigate();

  const handleOnSucess = async (credResponse) => {
    try {
      const token = credResponse.credential;

      const res = await api.post("/auth/google", { idToken: token });

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
      localStorage.setItem("isLogin", "true");

      props.changeLoginValue(true);
      navigate("/feeds");
    } catch (error) {
      console.log("Google login error:", error);
    }
  };

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleOnSucess}
        onError={() => console.log("Google login failed")}
      />
    </div>
  );
};

export default GoogleLoginComp;
