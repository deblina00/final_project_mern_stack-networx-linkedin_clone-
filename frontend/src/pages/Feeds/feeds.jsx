// Feeds.jsx
import React, { useState, useEffect } from "react";
import Card from "../../components/Card/card";
import ProfileCard from "../../components/ProfileCard/profileCard";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Advertisement from "../../components/Advertisement/advertisement";
import Post from "../../components/Post/post";
import Modal from "../../components/Modal/modal";
import AddModal from "../../components/AddModal/addModal";
import api from "../../lib/api";
import { ToastContainer, toast } from "react-toastify";

const Feeds = () => {
  const [personalData, setPersonalData] = useState(null);
  const [post, setPost] = useState([]);
  const [addPostModal, setAddPostModal] = useState(false);
  const [uploadMode, setUploadMode] = useState("post"); // NEW

  const fetchData = async () => {
    try {
      const [userData, postData] = await Promise.all([
        api.get("/auth/self"),
        api.get("/post/getAllPost"),
      ]);

      setPersonalData(userData.data.user);
      localStorage.setItem("userInfo", JSON.stringify(userData.data.user));
      setPost(postData.data.posts);
    } catch (err) {
      toast.error(err?.response?.data?.error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenPostModal = (mode = "post") => {
    setUploadMode(mode);
    setAddPostModal(true);
  };

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* left side */}
      <div className="w-[21%] sm:block sm:w-[23%] hidden py-5">
        <div className="h-fit">
          <ProfileCard data={personalData} />
        </div>
        <div className="w-full my-5">
          <Card
            padding={2}
            className="rounded-2xl shadow-lg border border-purple-100"
          >
            <div className="flex justify-between text-gray-700 font-medium">
              <span>Profile Viewers</span>
              <span className="text-purple-700">23</span>
            </div>
            <div className="flex justify-between text-gray-700 font-medium mt-2">
              <span>Post Impressions</span>
              <span className="text-purple-700">90</span>
            </div>
          </Card>
        </div>
      </div>

      {/* middle side */}
      <div className="w-full py-5 sm:w-[50%] ">
        {/* Post section */}
        <div>
          <Card
            padding={2}
            className="rounded-2xl shadow-lg border border-purple-100"
          >
            <div className="flex gap-2 items-center">
              <img
                className="rounded-full w-12 h-12 border-2 border-white shadow-sm cursor-pointer"
                src={personalData?.profilePic}
              />
              <div
                onClick={() => handleOpenPostModal("post")}
                className="w-full border border-purple-200 py-3 px-4 rounded-3xl cursor-pointer hover:shadow-md hover:border-purple-300 transition-all text-gray-700"
              >
                Start a post...
              </div>
            </div>

            <div className="flex mt-3 text-gray-700">
              <PostOption
                icon={<SmartDisplayIcon sx={{ color: "green" }} />}
                text="Video"
                onClick={() => handleOpenPostModal("video")}
              />
              <PostOption
                icon={<InsertPhotoIcon sx={{ color: "blue" }} />}
                text="Photo"
                onClick={() => handleOpenPostModal("photo")}
              />
              <PostOption
                icon={<NewspaperIcon sx={{ color: "brown" }} />}
                text="Article"
                onClick={() => handleOpenPostModal("article")}
              />
            </div>
          </Card>
        </div>

        <div className="border-b border-purple-200 w-full my-5" />

        <div className="w-full flex flex-col gap-5">
          {post.map((item, index) => (
            <Post item={item} key={index} personalData={personalData} />
          ))}
        </div>
      </div>

      {/* right side */}
      <div className="w-[26%] py-5 hidden md:block">
        <div>
          <Card
            padding={2}
            className="rounded-2xl shadow-lg border border-purple-100"
          >
            <div className="text-xl text-purple-800 font-semibold">
              Networx News
            </div>
            <div className="text-gray-400 text-sm mb-3">Top Stories</div>
            <div className="my-1">
              <div className="text-md font-medium">
                Buffet to remain Barkshir chair
              </div>
              <div className="text-xs text-gray-400">2h ago</div>
            </div>
            <div className="my-1">
              <div className="text-md font-medium">
                Foreign investments surge again
              </div>
              <div className="text-xs text-gray-400">3h ago</div>
            </div>
          </Card>
        </div>

        <div className="my-5 sticky top-20">
          <Advertisement />
        </div>
      </div>

      {/* MODAL */}
      {addPostModal && (
        <Modal closeModal={() => setAddPostModal(false)}>
          <AddModal personalData={personalData} mode={uploadMode} />
        </Modal>
      )}

      <ToastContainer />
    </div>
  );
};

// ✅ Post Option Button
const PostOption = ({ icon, text, onClick }) => (
  <div
    onClick={onClick}
    className="flex gap-2 p-2 flex-1 cursor-pointer rounded-lg hover:bg-purple-50 transition-all items-center justify-center font-medium text-gray-800"
  >
    {icon} {text}
  </div>
);

export default Feeds;
