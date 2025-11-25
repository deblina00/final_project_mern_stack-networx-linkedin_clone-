// === Navbar2.jsx (responsive + bottom nav safe area & accessible) ===
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import SearchIcon from "@mui/icons-material/Search";
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
      setSearchUser(res.data.users || []);
    } catch (err) {
      console.log(err);
    }
  };

  // --- Bottom Navigation Item Component ---
  const BottomNavItem = ({ icon, label, active }) => {
    return (
      <div
        className={`flex flex-col items-center justify-center flex-1 py-2 ${
          active ? "text-purple-700" : "text-gray-500"
        }`}
      >
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </div>
    );
  };

  const fetchNotification = async () => {
    try {
      const res = await api.get("/notification/activeNotification");
      setNotificationCount(res.data.count || 0);
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
    <>
      {/* TOP NAVBAR */}
      <nav className="w-full fixed top-0 bg-white shadow-sm border-b border-purple-100 flex items-center justify-between px-4 md:px-[100px] h-16 z-50">
        {/* MOBILE LAYOUT */}
        <div className="flex md:hidden w-full items-center justify-between">
          {/* Logo Only */}
          <Link to="/feeds" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 via-purple-600 to-purple-800 shadow-md flex items-center justify-center">
              <span className="text-white font-extrabold text-xl">N</span>
            </div>
          </Link>

          {/* Mobile Search Field */}
          <div className="flex items-center bg-gray-100 border border-purple-200 rounded-xl px-3 h-10 w-40 md:w-64">
            <SearchIcon className="text-gray-600" fontSize="small" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent w-full ml-2 text-sm focus:outline-none"
            />
          </div>

          {/* Message Icon */}
          <Link to="/messages">
            <MessageOutlinedIcon className="text-gray-700" fontSize="medium" />
          </Link>
        </div>

        {/* DESKTOP LAYOUT (UNCHANGED) */}
        <div className="hidden md:flex items-center gap-4 w-full justify-between">
          <div className="flex items-center gap-4">
            <Link to="/feeds" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 via-purple-600 to-purple-800 shadow-md flex items-center justify-center">
                <span className="text-white font-extrabold text-xl">N</span>
              </div>
              <h3 className="text-2xl bg-linear-to-r from-purple-600 to-purple-800 text-transparent bg-clip-text font-bold tracking-tight">
                Networx
              </h3>
            </Link>

            {/* Desktop Search */}
            <div className="relative">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="searchInput w-60 bg-gray-100 rounded-xl h-10 px-4 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
              />

              {/* Search Results */}
              {searchUser.length > 0 && debouncedTerm.length !== 0 && (
                <div className="absolute left-0 w-full bg-white rounded-lg shadow-md mt-1 p-2 z-50">
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
                        alt="user"
                      />
                      <span className="font-medium">{item?.f_name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-10 items-center">
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

            <Link to="/notification" className="flex flex-col items-center">
              <div className="relative">
                <AddAlertOutlinedIcon
                  sx={{
                    color:
                      location.pathname === "/notification"
                        ? "#6b21a8"
                        : "gray",
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

            <Link
              to={`/profile/${userData?._id}`}
              className="flex flex-col items-center"
            >
              <img
                className="w-8 h-8 rounded-full"
                src={userData?.profilePic}
                alt="me"
              />
              <span className="text-sm text-gray-600">Me</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* MOBILE BOTTOM NAV (ENABLED) */}
      {/* Use safe area and explicit height so content won't be hidden behind it. */}
      <div
        className="fixed bottom-0 left-0 w-full bg-white border-t flex md:hidden h-14 z-50"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <Link to="/feeds" className="flex-1">
          <BottomNavItem
            icon={<HomeIcon />}
            label="Home"
            active={location.pathname === "/feeds"}
          />
        </Link>

        <Link to="/myNetwork" className="flex-1">
          <BottomNavItem
            icon={<GroupIcon />}
            label="Network"
            active={location.pathname === "/myNetwork"}
          />
        </Link>

        <Link to="/resume" className="flex-1">
          <BottomNavItem
            icon={<WorkOutlinedIcon />}
            label="Resume"
            active={location.pathname === "/resume"}
          />
        </Link>

        <Link to="/notification" className="flex-1">
          <BottomNavItem
            icon={<AddAlertOutlinedIcon />}
            label="Notifications"
            active={location.pathname === "/notification"}
          />
        </Link>

        <Link to={`/profile/${userData?._id}`} className="flex-1">
          <BottomNavItem
            // active={location.pathname.startsWith("/profile")}
            icon={
              <img
                className="w-6 h-6 rounded-full"
                src={userData?.profilePic}
                alt="me"
              />
            }
            label="Me"
          />
        </Link>
      </div>
    </>
  );
};

/* Desktop Nav Item */
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
