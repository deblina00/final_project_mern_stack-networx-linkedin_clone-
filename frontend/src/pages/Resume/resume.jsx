
// --- Resume.jsx ---
import React, { useState, useEffect } from "react";
import Card from "../../components/Card/card";
import Advertisement from "../../components/Advertisement/advertisement";

const Resume = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const info = localStorage.getItem("userInfo");
    setUserData(info ? JSON.parse(info) : null);
  }, []);

  return (
    <div className="px-4 sm:px-5 xl:px-50 py-9 mt-5 bg-gray-100 pb-24 flex flex-col md:flex-row gap-5 w-full">
      {/* MAIN */}
      <div className="w-full md:w-[70%] py-6 ">
        <Card
          padding={2}
          className="rounded-2xl shadow-lg border border-purple-100"
        >
          <div className="text-xl text-purple-800 font-semibold mb-4">
            {userData?.f_name}'s Resume
          </div>

          {userData?.resume ? (
            <img src={userData.resume} className="w-full rounded-lg" />
          ) : (
            <div className="text-center text-gray-500 text-lg py-20">
              No Resume Uploaded
            </div>
          )}
        </Card>
      </div>

      {/* RIGHT ADS */}
      <div className="hidden md:block md:w-[26%]">
        <div className="sticky top-20">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};

export default Resume;
