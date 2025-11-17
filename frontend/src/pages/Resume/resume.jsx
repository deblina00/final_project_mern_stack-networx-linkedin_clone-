// Resume.jsx
import React, { useState, useEffect } from "react";
import Advertisement from "../../components/Advertisement/advertisement";

const Resume = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const info = localStorage.getItem("userInfo");
    setUserData(info ? JSON.parse(info) : null);
  }, []);

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      <div className="w-full sm:w-[70%] py-5">
        {userData?.resume ? (
          <img className="w-full rounded-lg" src={userData.resume} />
        ) : (
          <div className="text-center text-gray-500 text-xl py-20">
            No Resume Uploaded
          </div>
        )}
      </div>

      <div className="w-[26%] py-5 hidden md:block">
        <div className="sticky top-19">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};

export default Resume;
