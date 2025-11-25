// --- MessageModal.jsx ---
import React, { useState } from "react";
import api from "../../lib/api";

const MessageModal = ({ selfData, userData }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    await api.post("/conversation/add-conversation", {
      receiverId: userData?._id,
      message,
    });
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-white w-full">
      <textarea
        rows={5}
        className="w-full p-3 border border-purple-200 rounded-xl bg-gray-50 text-sm"
        placeholder={`Message to ${userData?.f_name}`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="flex justify-end">
        <button
          onClick={handleSendMessage}
          className="bg-purple-700 text-white px-5 py-2 rounded-2xl text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageModal;