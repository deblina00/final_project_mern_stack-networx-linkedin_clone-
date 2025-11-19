// Resume.jsx
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
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* Left/Main Section */}
      <div className="w-full sm:w-[70%] py-5 flex flex-col gap-5">
        <Card
          padding={2}
          className="rounded-2xl shadow-lg border border-purple-100"
        >
          <div className="text-xl text-purple-800 font-semibold mb-4">
            {userData?.f_name}'s Resume
          </div>

          {userData?.resume ? (
            <img
              className="w-full rounded-lg"
              src={userData.resume}
              alt="Resume"
            />
          ) : (
            <div className="text-center text-gray-500 text-lg py-20">
              No Resume Uploaded
            </div>
          )}
        </Card>
      </div>

      {/* Right/Advertisement Section */}
      <div className="w-[26%] py-5 hidden md:block">
        <div className="sticky top-20">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};

export default Resume;
