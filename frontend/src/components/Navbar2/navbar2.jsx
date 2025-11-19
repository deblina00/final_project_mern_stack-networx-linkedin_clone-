import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import api from "../../lib/api";
import "./navbar2.css";

const Navbar2 = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [searchUser, setSearchUser] = useState([]);

  const [notificationCount, setNotificationCount] = useState(0);

  /* Debounce search */
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedTerm(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) searchAPICall();
  }, [debouncedTerm]);

  const searchAPICall = async () => {
    try {
      const res = await api.get(`/auth/findUser?query=${debouncedTerm}`);
      setSearchUser(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNotification = async () => {
    try {
      const res = await api.get("/notification/activeNotification");
      setNotificationCount(res.data.count);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    setUserData(user ? JSON.parse(user) : null);
    fetchNotification();
  }, []);

  return (
    <nav className="w-full fixed top-0 bg-white shadow-sm border-b border-purple-100 flex items-center justify-between px-4 md:px-[100px] h-16 z-1000">
      {/* 🔹 Left Section (Logo + Search) */}
      <div className="flex items-center gap-4">
        {/* Logo same as Navbar1 */}
        <Link to="/feeds" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 via-purple-600 to-purple-800 shadow-[0_0_12px_rgba(168,85,247,0.6)] flex items-center justify-center">
            <span className="text-white font-extrabold text-xl">N</span>
          </div>

          <h3 className="text-2xl bg-linear-to-r from-purple-600 to-purple-800 text-transparent bg-clip-text font-bold tracking-tight">
            Networx
          </h3>
        </Link>

        {/* Search bar */}
        <div className="relative">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="searchInput w-48 md:w-60 bg-gray-100 rounded-xl h-10 px-4 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
          />

          {/* Search Results */}
          {searchUser.length > 0 && debouncedTerm.length !== 0 && (
            <div className="absolute left-0 w-full bg-white rounded-lg shadow-md mt-1 p-2 z-2000">
              {searchUser.map((item, index) => (
                <Link
                  key={index}
                  to={`/profile/${item?._id}`}
                  className="flex gap-2 items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSearchTerm("")}
                >
                  <img
                    className="w-10 h-10 rounded-full border"
                    src={item?.profilePic}
                  />
                  <span className="font-medium">{item?.f_name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Navigation Icons */}
      <div className="hidden md:flex gap-10">
        <NavLinkItem
          to="/feeds"
          label="Home"
          active={location.pathname === "/feeds"}
        >
          <HomeIcon />
        </NavLinkItem>

        <NavLinkItem
          to="/myNetwork"
          label="My Network"
          active={location.pathname === "/myNetwork"}
        >
          <GroupIcon />
        </NavLinkItem>

        <NavLinkItem
          to="/resume"
          label="Resume"
          active={location.pathname === "/resume"}
        >
          <WorkOutlinedIcon />
        </NavLinkItem>

        <NavLinkItem
          to="/messages"
          label="Message"
          active={location.pathname === "/messages"}
        >
          <MessageOutlinedIcon />
        </NavLinkItem>

        {/* Notifications */}
        <Link to="/notification" className="flex flex-col items-center">
          <div className="relative">
            <AddAlertOutlinedIcon
              sx={{
                color:
                  location.pathname === "/notification" ? "#6b21a8" : "gray",
              }}
            />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1 text-xs rounded-full bg-red-600 text-white">
                {notificationCount}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-600">Notifications</span>
        </Link>

        {/* Profile */}
        <Link
          to={`/profile/${userData?._id}`}
          className="flex flex-col items-center"
        >
          <img className="w-8 h-8 rounded-full" src={userData?.profilePic} />
          <span className="text-sm text-gray-600">Me</span>
        </Link>
      </div>
    </nav>
  );
};

/* 🔹 Reusable Nav Item Component */
const NavLinkItem = ({ to, label, active, children }) => (
  <Link
    to={to}
    className="flex flex-col items-center cursor-pointer hover:scale-[1.05] transition-all"
  >
    <div className={`${active ? "text-purple-700" : "text-gray-500"}`}>
      {children}
    </div>
    <span
      className={`text-sm ${
        active
          ? "text-purple-700 font-semibold border-b-2 border-purple-700"
          : "text-gray-500"
      }`}
    >
      {label}
    </span>
  </Link>
);

export default Navbar2;
