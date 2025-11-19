import React from "react";
import { Link } from "react-router-dom";

const Navbar1 = () => {
  return (
    <nav className="w-full shadow-sm border-b border-purple-100 md:px-[100px] px-4 flex justify-between items-center py-3">
      {/* 🔹 Logo Section */}
      <Link to={"/"} className="flex items-center gap-2">
        {/* Block N with gradient glow */}
        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 via-purple-600 to-purple-800 shadow-[0_0_12px_rgba(168,85,247,0.6)] flex items-center justify-center">
          <span className="text-white font-extrabold text-xl">N</span>
        </div>

        <h3 className="text-2xl bg-linear-to-r from-purple-600 to-purple-800 text-transparent bg-clip-text font-bold tracking-tight">
          Networx
        </h3>
      </Link>

      {/* 🔹 Auth Buttons */}
      <div className="flex items-center md:gap-4 gap-2">
        {/* Join Now = transparent with slim border */}
        <Link
          to={"/login"}
          className="md:px-4 md:py-2 px-3 py-1 rounded-3xl text-purple-700 border-2 border-purple-400 hover:border-purple-500 hover:bg-purple-50 hover:shadow-lg hover:scale-[1.03] transition-all duration-200 font-medium"
        >
          Sign in
        </Link>

        {/* Sign In = beautiful gradient fill */}
        <Link
          to={"/signUp"}
          className="px-4.5 py-2.5 rounded-3xl bg-linear-to-r from-purple-500 to-purple-900 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-200"
        >
          Join now for free
        </Link>
      </div>
    </nav>
  );
};

export default Navbar1;
