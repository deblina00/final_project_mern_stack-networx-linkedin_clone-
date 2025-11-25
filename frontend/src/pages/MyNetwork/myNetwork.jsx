
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
    <div className="px-4 md:px-8 xl:px-30 py-9 md:py-10 w-full mt-9 bg-gray-100 pb-24 md:pb-10">
      {/* HEADER */}
      <div className="py-3 px-5 border border-gray-300 bg-white rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-semibold text-gray-800 text-lg">{text}</div>

        <div className="flex gap-3">
          <button
            onClick={() => setText("Catch Up with Friends")}
            className={`px-4 py-2 border rounded-lg font-medium transition-all ${
              text === "Catch Up with Friends"
                ? "bg-purple-700 text-white shadow-md border-purple-700"
                : "bg-white text-gray-800 border-gray-300 hover:bg-purple-50"
            }`}
          >
            Friends
          </button>

          <button
            onClick={() => setText("Pending Request")}
            className={`px-4 py-2 border rounded-lg font-medium transition-all ${
              text === "Pending Request"
                ? "bg-purple-700 text-white shadow-md border-purple-700"
                : "bg-white text-purple-700 border-purple-700 hover:bg-purple-50"
            }`}
          >
            Pending Request
          </button>
        </div>
      </div>

      {/* CARDS CONTAINER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {data?.length > 0 ? (
          data.map((item) => <ProfileCard key={item._id} data={item} />)
        ) : (
          <div className="text-gray-500 text-lg mt-10 col-span-full text-center">
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
