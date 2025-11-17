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

      // Redirect based on notification type
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
    const userData = localStorage.getItem("userInfo");
    setOwnData(userData ? JSON.parse(userData) : null);

    fetchNotificationData();
  }, []);

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* left side */}
      <div className="w-[21%] sm:block sm:w-[23%] hidden py-5">
        <div className="h-fit">
          <ProfileCard data={ownData} />
        </div>
      </div>

      {/* middle */}
      <div className="w-full py-5 sm:w-[50%] h-[100vh] overflow-y-auto">
        <Card padding={0}>
          <div className="w-full">
            {notifications.map((item, index) => (
              <div
                key={index}
                onClick={() => handleOnClickNotification(item)}
                className={`border-b cursor-pointer flex gap-4 items-center border-gray-300 p-3 ${
                  item?.isRead ? "bg-gray-200" : "bg-blue-100"
                }`}
              >
                <img
                  src={item?.sender?.profilePic}
                  alt=""
                  className="rounded-full w-12 h-12"
                />
                <div>{item?.content}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* right side */}
      <div className="w-[26%] py-5 hidden md:block">
        <div className="my-5 sticky top-19">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};

export default Notification;
