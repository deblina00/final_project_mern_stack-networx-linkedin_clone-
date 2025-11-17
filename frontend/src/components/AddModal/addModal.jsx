// AddModal.jsx
import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import NewspaperIcon from "@mui/icons-material/Newspaper";
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
    <div>
      <div className="flex gap-4 items-center">
        <img
          className="w-14 h-14 rounded-full"
          src={personalData?.profilePic}
        />
        <div className="text-2xl">{personalData?.f_name}</div>
      </div>

      {/* Caption */}
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        rows={4}
        placeholder="What's on your mind?"
        className="w-full my-3 border p-2"
      />

      {/* IMAGE MODE */}
      {mode === "photo" && (
        <div>
          {imageUrl && <img className="w-40 rounded" src={imageUrl} />}
          <label className="cursor-pointer">
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
        <div>
          {videoUrl && <video className="w-40" src={videoUrl} controls />}
          <label className="cursor-pointer">
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
          rows={4}
          placeholder="Write your article..."
          className="w-full border p-2"
        />
      )}

      <button
        className="bg-blue-900 text-white px-4 py-2 rounded mt-6 float-right"
        onClick={handlePost}
      >
        Post
      </button>
    </div>
  );
};

export default AddModal;
