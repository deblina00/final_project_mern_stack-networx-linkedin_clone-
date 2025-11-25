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
      <Card
        padding={0}
        className="rounded-2xl shadow-lg border border-purple-100 overflow-hidden w-full"
      >
        {/* Banner */}
        <div className="relative h-24 sm:h-28 md:h-32">
          <img
            src="https://media.licdn.com/dms/image/v2/C5616AQH797ZatUkJ_w/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1630965387365?e=1764806400&v=beta&t=D3eCW16qr_IlFAm4lTOoqtBykb0Zl2sa6aRUtucQNEg"
            alt="Banner"
            className="w-full h-full object-cover rounded-t-md"
          />

          {/* Profile */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <img
              src={
                userData?.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="rounded-full border-2 border-white h-14 w-14 sm:h-16 sm:w-16 shadow-md object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-5 mt-10 mb-5 text-center">
          <p className="text-purple-800 font-semibold text-base sm:text-lg">
            {userData?.f_name || "User"}
          </p>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Get the latest jobs and industry news
          </p>

          <button className="mt-3 w-full py-2 rounded-full bg-linear-to-r from-purple-600 to-purple-900 shadow-md hover:shadow-lg hover:scale-[1.03] duration-200 text-white text-sm font-medium hover:bg-purple-800 transition">
            Explore
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Advertisement;
