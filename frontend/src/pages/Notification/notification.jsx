import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/ProfileCard/profileCard";
import Advertisement from "../../components/Advertisement/advertisement";
import Card from "../../components/Card/card";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";

const Notification = () => {
  const navigate = useNavigate();
  const [ownData, setOwnData] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const fetchNotificationData = async () => {
    try {
      const res = await api.get("/notification");
      setNotifications(res.data.notifications);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleOnClickNotification = async (item) => {
    try {
      await api.put("/notification/isRead", {
        notificationId: item._id,
      });

      if (item.type === "comment") {
        navigate(`/profile/${ownData?._id}/activities/${item.postId}`);
      } else {
        navigate("/myNetwork");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");
    setOwnData(stored ? JSON.parse(stored) : null);

    fetchNotificationData();
  }, []);

  return (
    <div className="px-5 xl:px-20 py-10 w-full mt-3 bg-gray-100 flex gap-6 pb-24">
      {/* LEFT SIDEBAR (Desktop only) */}
      <div className="hidden md:block md:w-[22%] py-6">
        <div className="sticky top-4">
          <ProfileCard data={ownData} />
        </div>
      </div>

      {/* MIDDLE SECTION */}
      <div className="w-full md:w-[50%] h-screen py-6 overflow-y-auto">
        <Card padding={0}>
          <div className="w-full">
            {notifications.length === 0 ? (
              <div className="p-5 text-center text-gray-500">
                No notifications yet
              </div>
            ) : (
              notifications.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleOnClickNotification(item)}
                  className={`flex gap-4 items-center border-b p-4 cursor-pointer transition
                    ${
                      item?.isRead
                        ? "bg-gray-100 hover:bg-gray-200"
                        : "bg-purple-100 hover:bg-purple-200"
                    }`}
                >
                  <img
                    src={item?.sender?.profilePic}
                    className="rounded-full w-12 h-12 border shadow-sm object-cover"
                  />

                  <div className="flex flex-col w-full">
                    <span className="text-sm text-gray-800">
                      {item?.content}
                    </span>

                    <span className="text-xs text-gray-500 mt-1">
                      {item?.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : ""}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* RIGHT SIDEBAR (Desktop only) */}
      <div className="hidden xl:block w-[26%] py-6">
        <div className="sticky top-4">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};

export default Notification;
