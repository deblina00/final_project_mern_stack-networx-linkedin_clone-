// === Feeds.jsx (responsive, mobile modal fallback) ===
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
  const [isMobile, setIsMobile] = useState(false);

  const fetchData = async () => {
    try {
      const [userData, postData] = await Promise.all([
        api.get("/auth/self"),
        api.get("/post/getAllPost"),
      ]);

      setPersonalData(userData.data.user);
      localStorage.setItem("userInfo", JSON.stringify(userData.data.user));
      setPost(postData.data.posts || []);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to load");
    }
  };

  useEffect(() => {
    fetchData();

    const mq = window.matchMedia("(max-width: 767px)"); // mobile < md
    const handler = (e) => setIsMobile(e.matches);
    handler(mq); // initialize
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const handleOpenPostModal = (mode = "post") => {
    setUploadMode(mode);
    setAddPostModal(true);
  };

  const handleCloseModal = () => setAddPostModal(false);

  return (
    // pb-16 prevents mobile bottom nav overlap. md:pb-0 resets for desktop
    <div className="px-3 sm:px-5 xl:px-20 py-9 flex flex-col lg:flex-row gap-6 w-full mt-5 bg-gray-100 pb-16 md:pb-0">
      {/* LEFT SIDEBAR - hidden on mobile (show on md+) */}
      <aside className="hidden md:block md:w-[24%] lg:w-[21%] py-5">
        <div className="h-fit">
          <ProfileCard data={personalData} />
        </div>
        <div className="w-full my-5">
          <Card padding={2} className="rounded-2xl shadow-lg border border-purple-100">
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
      </aside>

      {/* CENTER FEED - full width on mobile, center column on md+ */}
      <main className="w-full md:w-[52%] lg:w-[50%] py-5">
        {/* Post composer */}
        <div className="mb-4">
          <Card padding={2} className="rounded-2xl shadow-lg border border-purple-100">
            <div className="flex gap-3 items-center">
              <img
                className="rounded-full w-10 h-10 md:w-12 md:h-12 border-2 border-white shadow-sm cursor-pointer object-cover"
                src={personalData?.profilePic}
                alt="profile"
              />
              <div
                onClick={() => handleOpenPostModal("post")}
                className="w-full border border-purple-200 py-3 px-4 rounded-3xl cursor-pointer hover:shadow-md hover:border-purple-300 transition-all text-gray-700 text-sm md:text-base"
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

        <div className="border-b border-purple-200 w-full my-4" />

        <div className="w-full flex flex-col gap-5">
          {post.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No posts yet</div>
          ) : (
            post.map((item, index) => (
              <Post item={item} key={item?._id || index} personalData={personalData} />
            ))
          )}
        </div>
      </main>

      {/* RIGHT SIDEBAR - hidden on mobile (show on md+) */}
      <aside className="hidden md:block md:w-[24%] lg:w-[26%] py-5">
        <div>
          <Card padding={2} className="rounded-2xl shadow-lg border border-purple-100">
            <div className="text-xl text-purple-800 font-semibold">Networx News</div>
            <div className="text-gray-400 text-sm mb-3">Top Stories</div>
            <div className="my-1">
              <div className="text-md font-medium">Buffet to remain Barkshir chair</div>
              <div className="text-xs text-gray-400">2h ago</div>
            </div>
            <div className="my-1">
              <div className="text-md font-medium">Foreign investments surge again</div>
              <div className="text-xs text-gray-400">3h ago</div>
            </div>
          </Card>
        </div>

        <div className="my-5 sticky top-20">
          <Advertisement />
        </div>
      </aside>

      {/* MODAL - desktop uses existing Modal; mobile uses full-screen overlay */}
      {addPostModal && (
        <>
          {isMobile ? (
            <div className="fixed inset-0 z-10000 bg-black/60 flex justify-center items-start md:items-center overflow-auto">
              <div className="w-full h-full md:h-auto md:w-3/4 bg-white p-4 md:rounded-xl md:mx-auto md:my-12">
                <div className="w-full h-full">
                  <AddModal personalData={personalData} mode={uploadMode} />
                  <div className="pr-3 text-right">
                    <button
                      onClick={handleCloseModal}
                      className="px-4 py-2 rounded-full bg-gray-200 text-gray-800"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Modal closeModal={handleCloseModal}>
              <AddModal personalData={personalData} mode={uploadMode} />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

// ✅ Post Option Button
const PostOption = ({ icon, text, onClick }) => (
  <div
    onClick={onClick}
    className="flex gap-2 p-2 flex-1 cursor-pointer rounded-lg hover:bg-purple-50 transition-all items-center justify-center font-medium text-gray-800 text-sm md:text-base"
  >
    {icon} {text}
  </div>
);

export default Feeds;

