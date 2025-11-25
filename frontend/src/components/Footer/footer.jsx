import React from "react";

const Footer = () => {
  return (
    // <footer className="w-full bg-white/80 backdrop-blur-md border-t border-purple-100 flex justify-center">
    <footer className="bg-white/80 text-gray-400 flex justify-center py-3 md:py-6 text-center text-sm md:text-base">
      <div className="w-full max-w-6xl flex flex-col items-center py-6">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-purple-500 via-purple-600 to-purple-800 shadow-[0_0_10px_rgba(168,85,247,0.55)] flex items-center justify-center">
            <span className="text-white font-extrabold">N</span>
          </div>
          <h3 className="text-2xl bg-linear-to-r from-purple-600 to-purple-800 text-transparent bg-clip-text font-bold">
            Networx
          </h3>
        </div>

        {/* Copyright */}
        <p className="text-gray-600 text-sm mt-2">
          © 2025 Networx — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
