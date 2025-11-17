import React, { useState } from "react";
import api from "../../lib/api";

const MessageModal = ({ selfData, userData }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
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
    <div className="my-5">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="p-2 w-full border rounded-md"
        placeholder="Enter Message"
        rows={10}
      />

      <div
        onClick={handleSendMessage}
        className="bg-blue-950 text-white px-3 py-1 mt-3 rounded-2xl w-fit cursor-pointer"
      >
        Send
      </div>
    </div>
  );
};

export default MessageModal;
