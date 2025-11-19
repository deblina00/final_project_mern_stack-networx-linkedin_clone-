import React, { useState, useEffect, useRef } from "react";
import Card from "../../components/Card/card";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Conversation from "../../components/Conversation/conversation";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ImageIcon from "@mui/icons-material/Image";
import Advertisement from "../../components/Advertisement/advertisement";
import api from "../../lib/api";
import socket from "../../../socket";
import axios from "axios";

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [ownData, setOwnData] = useState(null);
  const [activeConvId, setActiveConvId] = useState(null);
  const [selectedConvDetails, setSelectedConDetail] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLink, setImageLink] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Focused");

  const messagesEndRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const userData = localStorage.getItem("userInfo");
    if (userData) setOwnData(JSON.parse(userData));
  }, []);

  useEffect(() => {
    if (ownData?._id) fetchConversationOnLoad();
  }, [ownData]);

  const handleSelectedConv = (id, userData) => {
    setActiveConvId(id);
    socket.emit("joinConversation", id);
    setSelectedConDetail(userData);
  };

  const fetchConversationOnLoad = async () => {
    try {
      const res = await api.get("/conversation/get-conversation");
      const convList = res.data.conversations || [];
      setConversations(convList);

      const firstConv = convList[0];
      if (firstConv) {
        setActiveConvId(firstConv._id);
        socket.emit("joinConversation", firstConv._id);
        const otherMember = firstConv.members.find(
          (m) => m._id !== ownData?._id
        );
        setSelectedConDetail(otherMember);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    if (activeConvId) fetchMessages();
  }, [activeConvId]);

  useEffect(() => {
    const handler = (response) => {
      if (response.sender?._id !== ownData?._id) {
        setMessages((prev) => [...prev, response]);
      }
    };
    socket.on("receiveMessage", handler);
    return () => socket.off("receiveMessage", handler);
  }, [ownData]);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/message/${activeConvId}`);
      setMessages(res.data.message || []);
    } catch (err) {
      console.log(err);
      alert("Something Went Wrong");
    }
  };

  const handleInputImage = async (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "networxLinkedinClone");

    setLoading(true);
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dkhlftovn/image/upload",
        data
      );
      setImageLink(res.data.url);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() && !imageLink) return;

    try {
      const res = await api.post("/message", {
        conversation: activeConvId,
        message: messageText,
        picture: imageLink,
      });

      const newMessage = res.data;
      setMessages((prev) => [...prev, newMessage]);
      socket.emit("sendMessage", activeConvId, newMessage);

      setMessageText("");
      setImageLink(null);

      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      <div className="w-full flex justify-between pt-5">
        {/* LEFT */}
        <div className="w-full md:w-[70%]">
          <Card
            padding={0}
            className="rounded-2xl shadow-lg border border-purple-100"
          >
            <div className="border-b border-purple-200 px-5 py-2 font-semibold text-lg text-gray-800">
              Messaging
            </div>

            {/* Dropdown */}
            <div
              ref={dropdownRef}
              className="border-b border-purple-200 px-5 py-2 relative"
            >
              <div
                className="py-1 px-3 bg-purple-700 text-white rounded-2xl flex gap-2 w-fit cursor-pointer"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                {selectedFilter} <ArrowDropDownIcon />
              </div>
              {dropdownOpen && (
                <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                  {["Focused", "Other", "Archived", "Spam"].map((option) => (
                    <div
                      key={option}
                      className="px-4 py-2 cursor-pointer hover:bg-purple-50"
                      onClick={() => {
                        setSelectedFilter(option);
                        setDropdownOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="md:flex">
              {/* Conversation list */}
              <div className="h-[590px] overflow-auto md:w-[40%] border-r border-purple-200">
                {conversations.map((item) => (
                  <Conversation
                    key={item._id}
                    item={item}
                    ownData={ownData}
                    handleSelectedConv={handleSelectedConv}
                    activeConvId={activeConvId}
                  />
                ))}
              </div>

              {/* Chat window */}
              <div className="md:w-[60%] flex flex-col">
                <div className="border-b border-purple-200 py-2 px-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {selectedConvDetails?.f_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedConvDetails?.headline}
                    </p>
                  </div>
                  <MoreHorizIcon className="text-gray-700" />
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-auto border-b border-purple-200 p-2">
                  <div className="flex gap-3 p-4 border-b border-purple-200">
                    <img
                      src={selectedConvDetails?.profilePic}
                      className="w-14 h-14 rounded-full"
                    />
                    <div>
                      <p className="text-md font-semibold">
                        {selectedConvDetails?.f_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedConvDetails?.headline}
                      </p>
                    </div>
                  </div>

                  <div>
                    {messages.map((msg, idx) => (
                      <div
                        key={`${msg._id}-${msg.createdAt}-${idx}`}
                        className="flex gap-3 p-4"
                      >
                        <img
                          className="w-8 h-8 rounded-full"
                          src={msg.sender?.profilePic || "/default-avatar.png"}
                        />
                        <div>
                          <p className="text-md font-medium">
                            {msg.sender?.f_name || "Unknown"}
                          </p>
                          <p className="mt-2 text-sm text-gray-700">
                            {msg.message}
                          </p>
                          {msg.picture && (
                            <img
                              src={msg.picture}
                              className="w-60 h-[180px] rounded-md mt-2 object-cover"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Input */}
                <div className="p-2 border-b border-purple-200">
                  <textarea
                    rows={3}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full bg-gray-100 p-3 rounded-xl outline-none text-sm"
                    placeholder="Write a message"
                  />
                  {imageLink && (
                    <div className="mt-2 relative w-24 h-24">
                      <img
                        src={imageLink}
                        alt="preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-gray-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        onClick={() => setImageLink(null)}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>

                {/* Send button */}
                <div className="p-3 flex justify-between items-center">
                  <label
                    htmlFor="msgImg"
                    className="cursor-pointer text-gray-700"
                  >
                    <ImageIcon />
                  </label>
                  <input
                    id="msgImg"
                    type="file"
                    className="hidden"
                    onChange={handleInputImage}
                  />
                  {!loading && (
                    <div
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-purple-700 text-white rounded-2xl cursor-pointer hover:bg-purple-800 transition-all"
                    >
                      Send
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex md:w-[25%]">
          <div className="sticky top-20">
            <Advertisement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
