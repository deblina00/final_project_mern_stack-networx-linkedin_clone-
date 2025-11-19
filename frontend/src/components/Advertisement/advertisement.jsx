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
        className="rounded-2xl shadow-lg border border-purple-100 overflow-hidden"
      >
        {/* Banner Section */}
        <div className="relative h-28">
          <img
            src="https://media.licdn.com/dms/image/v2/C5616AQH797ZatUkJ_w/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1630965387365?e=1764806400&v=beta&t=D3eCW16qr_IlFAm4lTOoqtBykb0Zl2sa6aRUtucQNEg"
            alt="Banner"
            className="w-full h-full object-cover rounded-t-md"
          />

          {/* Profile Image */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <img
              src={
                userData?.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="rounded-full border-2 border-white h-16 w-16 shadow-md object-cover cursor-pointer"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="px-5 mt-10 mb-5 text-center">
          <p className="text-purple-800 font-semibold text-lg">
            {userData?.f_name || "User"}
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Get the latest jobs and industry news
          </p>

          <button className="mt-4 w-full py-2 rounded-full bg-linear-to-r from-purple-600 to-purple-900 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-200">
            Explore
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Advertisement;
