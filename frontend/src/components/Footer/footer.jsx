
import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-gray-200 flex justify-center ">
      <div className="md:p-3 w-full flex flex-col items-center py-4">
        <div className="flex gap-1 items-center cursor-pointer">
          <h3 className="text-blue-800 font-bold text-xl">Networx</h3>
        </div>
        <div className="text-sm">@Copyright 2025</div>
      </div>
    </div>
  );
};

export default Footer;