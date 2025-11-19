import React, { useState, useEffect } from "react";
import ProfileCard from "../../components/ProfileCard/profileCard";
import api from "../../lib/api";

const MyNetwork = () => {
  const [text, setText] = useState("Catch Up with Friends");
  const [data, setData] = useState([]);

  const fetchFriendList = async () => {
    try {
      const res = await api.get("/auth/friendsList");
      setData(res.data.friends || []);
    } catch (err) {
      console.log(err);
      alert("Something Went Wrong");
    }
  };

  const fetchPendingRequest = async () => {
    try {
      const res = await api.get("/auth/pendingFriendsList");
      setData(res.data.pendingFriends || []);
    } catch (err) {
      console.log(err);
      alert("Something Went Wrong");
    }
  };

  useEffect(() => {
    if (text === "Catch Up with Friends") fetchFriendList();
    else fetchPendingRequest();
  }, [text]);

  return (
    <div className="px-5 xl:px-50 py-9 flex flex-col gap-5 w-full mt-5 bg-gray-100">
      {/* HEADER */}
      <div className="py-4 px-10 border border-gray-300 w-full flex justify-between my-5 text-lg bg-white rounded-2xl shadow-md">
        <div className="font-semibold text-gray-800">{text}</div>
        <div className="flex gap-3">
          <button
            onClick={() => setText("Catch Up with Friends")}
            className={`px-4 py-2 border rounded-lg border-gray-300 font-medium transition-all ${
              text === "Catch Up with Friends"
                ? "bg-purple-700 text-white shadow-md"
                : "bg-white text-gray-800 hover:bg-purple-50"
            }`}
          >
            Friends
          </button>

          <button
            onClick={() => setText("Pending Request")}
            className={`p-2 border rounded-lg border-gray-300 font-medium transition-all ${
              text === "Pending Request"
                ? "bg-purple-700 text-white shadow-md"
                : "bg-white text-purple-700 border-purple-700 hover:bg-purple-50"
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
            <div key={item._id} className="md:w-[23%] sm:w-full h-[270px] shadow-xl">
              <ProfileCard data={item}/>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-lg mt-10">
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
