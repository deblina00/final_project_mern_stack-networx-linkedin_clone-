import React, { useState } from "react";
import axios from "axios";

const AboutModal = ({ handleEditFunc, selfData }) => {
  const [data, setData] = useState({
    about: selfData?.about || "",
    skillInp: selfData?.skills?.join(",") || "",
    resume: selfData?.resume || "",
  });

  const [loading, setLoading] = useState(false);

  const onChangeHandle = (event, key) => {
    setData({ ...data, [key]: event.target.value });
  };

  const handleInputImage = async (e) => {
    const files = e.target.files;
    const form = new FormData();
    form.append("file", files[0]);
    form.append("upload_preset", "networxLinkedinClone");

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dkhlftovn/image/upload",
        form
      );

      const imageUrl = response.data.url;
      setData({ ...data, resume: imageUrl });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOnSave = () => {
    const arr = data.skillInp.split(",").map((s) => s.trim());

    const newData = {
      ...selfData,
      about: data.about,
      skills: arr,
      resume: data.resume,
    };

    handleEditFunc(newData);
  };

  return (
    <div className="bg-white rounded-2xl p-6 space-y-6 w-full">
      {/* ABOUT */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700">About</label>
        <textarea
          value={data.about}
          onChange={(e) => onChangeHandle(e, "about")}
          className="w-full p-3 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          rows={4}
          placeholder="Write something about yourself..."
        ></textarea>
      </div>

      {/* SKILLS */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700">
          Skills{" "}
          <span className="text-gray-400 text-sm">(separate with commas)</span>
        </label>
        <textarea
          value={data.skillInp}
          onChange={(e) => onChangeHandle(e, "skillInp")}
          className="w-full p-3 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          rows={3}
          placeholder="React, TailwindCSS, JavaScript..."
        ></textarea>
      </div>

      {/* RESUME UPLOAD */}
      <div className="space-y-3">
        <label
          htmlFor="resumeUpload"
          className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition"
        >
          Upload Resume
        </label>

        <input
          onChange={handleInputImage}
          type="file"
          className="hidden"
          id="resumeUpload"
        />

        {/* Resume Preview */}
        {loading ? (
          <p className="text-sm text-gray-500">Uploading...</p>
        ) : data.resume ? (
          <div className="p-3 bg-gray-50 border border-purple-400 rounded-lg text-sm break-all">
            <a
              href={data.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 underline"
            >
              View Uploaded Resume
            </a>
          </div>
        ) : null}
      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={handleOnSave}
          className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition shadow-sm"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AboutModal;
