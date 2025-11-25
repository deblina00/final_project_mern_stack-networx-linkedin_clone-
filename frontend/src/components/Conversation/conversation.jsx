import React, { useEffect, useState } from "react";

const Conversation = ({ item, ownData, handleSelectedConv, activeConvId }) => {
  const [memberData, setMemberData] = useState(null);

  useEffect(() => {
    const other = item?.members?.find((m) => m._id !== ownData?._id);
    setMemberData(other);
  }, [item, ownData]);

  return (
    <div
      onClick={() => handleSelectedConv(item?._id, memberData)}
      className={`flex items-center gap-3 p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${
        activeConvId === item?._id ? "bg-gray-100" : ""
      }`}
    >
      <img
        src={memberData?.profilePic}
        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
      />
      <div className="min-w-0">
        <p className="text-sm md:text-md font-medium truncate">
          {memberData?.f_name}
        </p>
        <p className="text-xs text-gray-500 truncate">{memberData?.headline}</p>
      </div>
    </div>
  );
};

export default Conversation;
