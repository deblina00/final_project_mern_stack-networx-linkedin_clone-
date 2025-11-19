import React from "react";
import Card from "../Card/card";
import { Link } from "react-router-dom";

const ProfileCard = ({ data }) => {
  if (!data) return null;

  return (
    <Card
      padding={0}
      className="rounded-2xl shadow-lg border border-purple-100 overflow-hidden hover:shadow-xl transition-all"
    >
      {/* COVER PHOTO */}
      <Link to={`/profile/${data?._id}`} className="relative block h-28">
        <img
          src={data?.cover_pic || "/defaultCover.jpg"}
          alt="cover"
          className="w-full h-full object-cover rounded-t-md"
        />
        {/* PROFILE PIC */}
        <div className="absolute -bottom-6 left-4 z-20">
          <img
            src={data?.profilePic || "/defaultProfile.jpg"}
            alt="profile"
            className="w-14 h-14 rounded-full border-2 border-white shadow-md cursor-pointer"
          />
        </div>
      </Link>

      {/* USER INFO */}
      <div className="pt-8 px-5 pb-5">
        <div className="text-purple-800 text-xl font-semibold">
          {data?.f_name}
        </div>
        {data?.headline && (
          <div className="text-gray-700 text-sm mt-1">{data.headline}</div>
        )}
        {data?.curr_location && (
          <div className="text-gray-600 text-sm mt-1">{data.curr_location}</div>
        )}
        {data?.curr_company && (
          <div className="text-gray-700 font-semibold text-base mt-1">{data.curr_company}</div>
        )}
      </div>
    </Card>
  );
};

export default ProfileCard;
