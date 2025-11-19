import React, { useState } from "react";
import axios from "axios";

const ImageModal = ({ isCircular, selfData, handleEditFunc }) => {
  const [imgLink, setImageLink] = useState(
    isCircular ? selfData?.profilePic : selfData?.cover_pic
  );

  const [loading, setLoading] = useState(false);

  const handleInputImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "networxLinkedinClone");

    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dkhlftovn/image/upload",
        formData
      );

      setImageLink(response.data.url);
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitBtn = () => {
    const updated = {
      ...selfData,
      ...(isCircular ? { profilePic: imgLink } : { cover_pic: imgLink }),
    };

    handleEditFunc(updated);
  };

  return (
    <div className="p-6 relative h-full flex flex-col items-center bg-white">
      {/* == IMAGE PREVIEW == */}
      {isCircular ? (
        <img
          src={imgLink}
          className="w-40 h-40 rounded-md object-cover shadow"
        />
      ) : (
        <img
          src={imgLink}
          className="w-full h-[200px] rounded-md object-cover shadow"
        />
      )}

      {/* == BUTTONS AREA == */}
      <div className="flex justify-between w-full mt-6 px-4">
        {/* Upload Button */}
        <label
          htmlFor="imgUploadInput"
          className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-xl cursor-pointer shadow transition"
        >
          Upload
        </label>

        <input
          id="imgUploadInput"
          type="file"
          className="hidden"
          onChange={handleInputImage}
        />

        {/* Save Button */}
        {loading ? (
          <div className="w-6 h-6 border-2 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div>
        ) : (
          <button
            onClick={handleSubmitBtn}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-xl shadow transition"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
