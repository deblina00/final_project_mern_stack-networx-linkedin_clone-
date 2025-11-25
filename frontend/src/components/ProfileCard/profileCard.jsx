import React from "react";
import Card from "../Card/card";
import { Link } from "react-router-dom";

const ProfileCard = ({ data }) => {
  if (!data) return null;

  return (
    <Card
      padding={0}
      className="rounded-2xl shadow-md border border-purple-100 overflow-hidden hover:shadow-xl transition-all bg-white"
    >
      {/* COVER PHOTO */}
      <Link
        to={`/profile/${data?._id}`}
        className="relative block h-28 sm:h-32"
      >
        <img
          src={
            data?.cover_pic ||
            "https://thingscareerrelated.com/wp-content/uploads/2021/10/default-background-image.png"
          }
          alt="cover"
          className="w-full h-full object-cover rounded-t-lg"
        />
        {/* PROFILE PIC */}
        <div className="absolute -bottom-6 left-4 z-20">
          <img
            src={
              data?.profilePic ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white shadow-md"
          />
        </div>
      </Link>

      {/* USER INFO */}
      <div className="pt-8 px-5 pb-5">
        <div className="text-purple-800 text-lg font-semibold truncate">
          {data?.f_name}
        </div>
        {data?.headline && (
          <div className="text-gray-700 text-sm mt-1 line-clamp-2">
            {data.headline}
          </div>
        )}
        {data?.curr_location && (
          <div className="text-gray-600 text-sm mt-1">{data.curr_location}</div>
        )}
        {data?.curr_company && (
          <div className="text-gray-700 font-semibold text-sm mt-1">
            {data.curr_company}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProfileCard;
