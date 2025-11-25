import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar1 = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full shadow-sm border-b border-purple-100 md:px-[100px] px-4 py-3 flex items-center justify-between relative">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 z-20">
        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 via-purple-600 to-purple-800 shadow-[0_0_12px_rgba(168,85,247,0.6)] flex items-center justify-center">
          <span className="text-white font-extrabold text-xl">N</span>
        </div>
        <h3 className="text-2xl bg-linear-to-r from-purple-600 to-purple-800 text-transparent bg-clip-text font-bold tracking-tight">
          Networx
        </h3>
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden z-20 text-purple-600"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <span className="text-2xl">✖</span>
        ) : (
          <span className="text-3xl">☰</span>
        )}
      </button>

      {/* Links */}
      <div
        className={`flex flex-col md:flex-row md:items-center md:gap-4 gap-3 absolute md:static top-0 left-0 w-full md:w-auto bg-white md:bg-transparent px-6 md:px-0 pt-20 md:pt-0 pb-6 md:pb-0 shadow-md md:shadow-none transition-all duration-300 ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible md:visible md:opacity-100"
        }`}
      >
        <Link
          to="/login"
          className="md:px-4 md:py-2 px-3 py-2 rounded-3xl text-purple-700 border-2 border-purple-400 hover:border-purple-500 hover:bg-purple-50 hover:shadow-lg hover:scale-[1.03] transition-all duration-200 font-medium text-center"
        >
          Sign in
        </Link>
        <Link
          to="/signUp"
          className="px-4.5 py-2.5 rounded-3xl bg-linear-to-r from-purple-500 to-purple-900 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-200 text-center"
        >
          Join now for free
        </Link>
      </div>
    </nav>
  );
};

export default Navbar1;
