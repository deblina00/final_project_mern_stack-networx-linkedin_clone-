import React, { useState, useEffect } from "react";
import Card from "../Card/card";

const Advertisement = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("userInfo");
    setUserData(data ? JSON.parse(data) : null);
  }, []);

  return (
    <div className="sticky top-20">
      <Card padding={0}>
        {/* Banner Section */}
        <div className="relative h-28">
          <img
            src="https://media.licdn.com/dms/image/v2/C5616AQH797ZatUkJ_w/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1630965387365?e=1764806400&v=beta&t=D3eCW16qr_IlFAm4lTOoqtBykb0Zl2sa6aRUtucQNEg"
            className="rounded-t-md w-full h-full object-cover"
            alt="Banner"
          />

          {/* Profile Image */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <img
              src={
                userData?.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="rounded-full border-2 h-16 w-16 border-white shadow-md object-cover cursor-pointer"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="px-5 mt-10 mb-5 text-center">
          <p className="text-sm font-semibold">{userData?.f_name || "User"}</p>

          <p className="text-sm mt-3 text-gray-700">
            Get the latest jobs and industry news
          </p>

          <div className="mt-3">
            <button className="text-sm font-bold p-2 rounded-2xl bg-blue-800 text-white w-full cursor-pointer transition hover:bg-blue-900">
              Explore
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Advertisement;
