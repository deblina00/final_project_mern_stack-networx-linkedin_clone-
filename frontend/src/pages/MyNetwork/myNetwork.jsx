import React, { useState, useEffect } from "react";
import ProfileCard from "../../components/ProfileCard/profileCard";
import api from "../../lib/api";

const MyNetwork = () => {
  const [text, setText] = useState("Catch Up with Friends");
  const [data, setData] = useState([]);

const fetchFriendList = async () => {
  try {
    const res = await api.get("/auth/friendsList");
    setData(res.data.friends || []); // ✅ FIXED
  } catch (err) {
    console.log(err);
    alert("Something Went Wrong");
  }
};

const fetchPendingRequest = async () => {
  try {
    const res = await api.get("/auth/pendingFriendsList");
    setData(res.data.pendingFriends || []); // ✅ FIXED
  } catch (err) {
    console.log(err);
    alert("Something Went Wrong");
  }
};
;

  useEffect(() => {
    if (text === "Catch Up with Friends") fetchFriendList();
    else fetchPendingRequest();
  }, [text]);

  return (
    <div className="px-5 xl:px-50 py-9 flex flex-col gap-5 w-full mt-5 bg-gray-100">
      {/* HEADER */}
      <div className="py-4 px-10 border border-gray-400 w-full flex justify-between my-5 text-xl bg-white rounded-xl">
        <div>{text}</div>
        <div className="flex gap-3">
          <button
            onClick={() => setText("Catch Up with Friends")}
            className={`p-1 border rounded-lg border-gray-300 ${
              text === "Catch Up with Friends" ? "bg-blue-800 text-white" : ""
            }`}
          >
            Friends
          </button>

          <button
            onClick={() => setText("Pending Request")}
            className={`p-1 border rounded-lg border-gray-300 ${
              text === "Pending Request" ? "bg-blue-800 text-white" : ""
            }`}
          >
            Pending Request
          </button>
        </div>
      </div>

      {/* CARDS */}
      <div className="flex h-[80vh] w-full gap-7 flex-wrap items-start justify-center">
        {data?.length > 0 ? (
          data.map((item) => (
            <div key={item._id} className="md:w-[23%] h-[270px] sm:w-full">
              <ProfileCard data={item} />
            </div>
          ))
        ) : (
          <div>
            {text === "Catch Up with Friends"
              ? "No Friends Yet"
              : "No Pending Friends yet"}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyNetwork;
