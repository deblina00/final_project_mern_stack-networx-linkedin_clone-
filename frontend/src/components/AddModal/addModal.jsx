// AddModal.jsx
import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import api from "../../lib/api";
import axios from "axios";
import { toast } from "react-toastify";

const AddModal = ({ personalData, mode }) => {
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [articleText, setArticleText] = useState("");

  const uploadImage = async (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "networxLinkedinClone");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dkhlftovn/image/upload",
        data
      );
      setImageUrl(res.data.secure_url);
    } catch {
      toast.error("Image upload failed");
    }
  };

  const uploadVideo = async (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "networxLinkedinClone");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dkhlftovn/video/upload",
        data
      );
      setVideoUrl(res.data.secure_url);
    } catch {
      toast.error("Video upload failed");
    }
  };

  const handlePost = async () => {
    if (!desc && !imageUrl && !videoUrl && !articleText)
      return toast.error("Please enter something");

    try {
      await api.post("/post", {
        desc,
        imageLink: imageUrl,
        videoLink: videoUrl,
        article: articleText,
      });

      window.location.reload();
    } catch {
      toast.error("Error while posting");
    }
  };

  return (
    // <div className="w-full max-w-xl max-h-[75vh] overflow-y-auto p-6 bg-white flex flex-col gap-4 mx-auto">
    <div className="w-full max-w-lg max-h-[80vh] overflow-y-auto p-4 sm:p-6 bg-white flex flex-col gap-4 mx-auto rounded-xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          className="w-14 h-14 rounded-full border-2 border-purple-300 shadow-sm"
          src={personalData?.profilePic}
          alt="profile"
        />
        <div className="text-xl font-semibold text-purple-800">
          {personalData?.f_name}
        </div>
      </div>

      {/* Caption */}
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        rows={4}
        placeholder="What's on your mind?"
        className="w-full border border-purple-200 rounded-lg p-3 text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* IMAGE MODE */}
      {mode === "photo" && (
        <div className="flex flex-col gap-2">
          {imageUrl && (
            <img
              className="w-full max-h-60 object-cover rounded-lg"
              src={imageUrl}
            />
          )}
          <label className="flex items-center gap-2 cursor-pointer text-purple-700 font-medium hover:text-purple-900">
            <ImageIcon /> Upload Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={uploadImage}
            />
          </label>
        </div>
      )}

      {/* VIDEO MODE */}
      {mode === "video" && (
        <div className="flex flex-col gap-2">
          {videoUrl && (
            <video
              className="w-full max-h-60 rounded-lg"
              src={videoUrl}
              controls
            />
          )}
          <label className="flex items-center gap-2 cursor-pointer text-purple-700 font-medium hover:text-purple-900">
            <SmartDisplayIcon /> Upload Video
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={uploadVideo}
            />
          </label>
        </div>
      )}

      {/* ARTICLE MODE */}
      {mode === "article" && (
        <textarea
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
          rows={6}
          placeholder="Write your article..."
          className="w-full border border-purple-200 rounded-lg p-3 text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      )}

      {/* Post Button */}
      <button
        onClick={handlePost}
        className="mt-3 self-end px-4 sm:px-6 py-2 rounded-full bg-linear-to-r from-purple-600 to-purple-900 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-200"
      >
        Post
      </button>
    </div>
  );
};

export default AddModal;
