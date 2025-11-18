import React from "react";
import { Link } from "react-router-dom";

const Navbar1 = () => {
  return (
    <nav className="w-full bg-gray-100 md:px-[100px] px-5 flex justify-between py-4 box-border">
      {/* 🔹 Logo Section */}
      <Link to={"/"} className="flex justify-between">
        <h3 className="text-2xl text-blue-700 font-bold tracking-tight">
          Networx
        </h3>
      </Link>

      {/* 🔹 Auth Buttons */}
      <div className="flex box-border md:gap-4 gap-2 justify-center items-center">
        <Link
          to={"/signUp"}
          className="md:px-4 md:py-2 box-border text-black rounded-3xl text-xl hover:bg-gray-200 cursor-pointer"
        >
          Join now
        </Link>
        <Link
          to={"/login"}
          className="px-4 py-2 box-border border text-blue-800 border-blue-800 rounded-3xl text-xl hover:bg-blue-50 cursor-pointer"
        >
          Sign in
        </Link>
      </div>
    </nav>
  );
};

export default Navbar1;
