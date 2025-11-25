
import React, { useState } from "react";

const EditinfoModal = ({ handleEditFunc, selfData }) => {
  const [data, setData] = useState({
    f_name: selfData.f_name || "",
    headline: selfData.headline || "",
    curr_company: selfData.curr_company || "",
    curr_location: selfData.curr_location || "",
  });

  const onChangeHandle = (event, key) => {
    setData({ ...data, [key]: event.target.value });
  };

  const handleSaveBtn = () => {
    let newData = { ...selfData, ...data };
    handleEditFunc(newData);
  };

  return (
    <div className="bg-white p-4 sm:p-6 space-y-6 w-full max-w-xl mx-auto max-h-[80vh] overflow-y-auto">
      {/* FULL NAME */}
      <div className="space-y-1">
        <label className="font-medium text-gray-700 text-sm sm:text-base">
          Full Name*
        </label>
        <input
          value={data.f_name}
          onChange={(e) => onChangeHandle(e, "f_name")}
          type="text"
          className="p-3 w-full border text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          placeholder="Enter Full Name"
        />
      </div>

      {/* HEADLINE */}
      <div className="space-y-1">
        <label className="font-medium text-gray-700 text-sm sm:text-base">
          Headline*
        </label>
        <textarea
          value={data.headline}
          onChange={(e) => onChangeHandle(e, "headline")}
          className="p-3 w-full border text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          rows={3}
          placeholder="Your headline..."
        ></textarea>
      </div>

      {/* COMPANY */}
      <div className="space-y-1">
        <label className="font-medium text-gray-700 text-sm sm:text-base">
          Current Company*
        </label>
        <input
          type="text"
          value={data.curr_company}
          onChange={(e) => onChangeHandle(e, "curr_company")}
          className="p-3 w-full border text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          placeholder="Enter Current Company"
        />
      </div>

      {/* LOCATION */}
      <div className="space-y-1">
        <label className="font-medium text-gray-700 text-sm sm:text-base">
          Current Location*
        </label>
        <input
          type="text"
          value={data.curr_location}
          onChange={(e) => onChangeHandle(e, "curr_location")}
          className="p-3 w-full border text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          placeholder="Enter Current Location"
        />
      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveBtn}
          className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm sm:text-base"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditinfoModal;
