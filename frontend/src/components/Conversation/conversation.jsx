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
      className={`flex items-center gap-3 p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-200 ${
        activeConvId === item?._id ? "bg-gray-200" : ""
      }`}
    >
      <img src={memberData?.profilePic} className="w-12 h-12 rounded-full" />
      <div>
        <p className="text-md">{memberData?.f_name}</p>
        <p className="text-sm text-gray-500">{memberData?.headline}</p>
      </div>
    </div>
  );
};

export default Conversation;
