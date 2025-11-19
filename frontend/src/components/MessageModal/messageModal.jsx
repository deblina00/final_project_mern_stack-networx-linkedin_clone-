import React, { useState } from "react";
import api from "../../lib/api";

const MessageModal = ({ selfData, userData }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      await api.post("/conversation/add-conversation", {
        receiverId: userData?._id,
        message,
      });

      window.location.reload();
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={6}
        placeholder={`Message to ${userData?.f_name || "User"}`}
        className="w-full p-3 border border-purple-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-700"
      />

      <div
        onClick={handleSendMessage}
        className="self-end bg-purple-700 text-white px-5 py-2 rounded-2xl cursor-pointer hover:bg-purple-800 transition-all font-semibold"
      >
        Send
      </div>
    </div>
  );
};

export default MessageModal;
