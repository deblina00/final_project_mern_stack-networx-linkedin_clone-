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
          <Card padding={1}>
            <div className=" w-full flex justify-between">
              <div>Profile Viewers</div>
              <div className="text-blue-900">23</div>
            </div>
            <div className=" w-full flex justify-between">
              <div>Post Impressions</div>
              <div className="text-blue-900">90</div>
            </div>
          </Card>
        </div>
      </div>

      {/* middle side */}
      <div className="w-full py-5 sm:w-[50%] ">
        {/* Post section */}
        <div>
          <Card padding={1}>
            <div className="flex gap-2 items-center">
              <img
                className="rounded-4xl w-12 h-12 border-2 border-white cursor-pointer"
                src={personalData?.profilePic}
              />
              <div
                onClick={() => handleOpenPostModal("post")}
                className="w-full border py-3 px-3 rounded-3xl cursor-pointer hover:bg-gray-100"
              >
                Start a post...
              </div>
            </div>

            <div className="w-full flex mt-3">
              {/* VIDEO */}
              <div
                onClick={() => handleOpenPostModal("video")}
                className="flex gap-2 p-2 cursor-pointer rounded-lg w-[33%] hover:bg-gray-100"
              >
                <SmartDisplayIcon sx={{ color: "green" }} /> Video
              </div>

              {/* PHOTO */}
              <div
                onClick={() => handleOpenPostModal("photo")}
                className="flex gap-2 p-2 cursor-pointer rounded-lg w-[33%] hover:bg-gray-100"
              >
                <InsertPhotoIcon sx={{ color: "blue" }} /> Photo
              </div>

              {/* ARTICLE */}
              <div
                onClick={() => handleOpenPostModal("article")}
                className="flex gap-2 p-2 cursor-pointer rounded-lg w-[33%] hover:bg-gray-100"
              >
                <NewspaperIcon sx={{ color: "brown" }} /> Write article
              </div>
            </div>
          </Card>
        </div>

        <div className="border-b border-gray-300 w-full my-5" />

        <div className="w-full flex flex-col gap-5">
          {post.map((item, index) => (
            <Post item={item} key={index} personalData={personalData} />
          ))}
        </div>
      </div>

      {/* right side */}
      <div className="w-[26%] py-5 hidden md:block">
        <div>
          <Card padding={1}>
            <div className="text-xl">Networx News</div>
            <div className="text-gray-300">Top Stories</div>
            <div className="my-1">
              <div className="text-md">Buffet to remain Barkshir chair</div>
              <div className="text-xs text-gray-400">2h ago</div>
            </div>
            <div className="my-1">
              <div className="text-md">Foreign investments surge again</div>
              <div className="text-xs text-gray-400">3h ago</div>
            </div>
          </Card>
        </div>

        <div className="my-5 sticky top-19">
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

export default Feeds;
