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
    <div className="bg-white p-6 space-y-6 w-full max-h-[450px] overflow-y-auto">
      {/* FULL NAME */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700">Full Name*</label>
        <input
          value={data.f_name}
          onChange={(e) => onChangeHandle(e, "f_name")}
          type="text"
          className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          placeholder="Enter Full Name"
        />
      </div>

      {/* HEADLINE */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700">Headline*</label>
        <textarea
          value={data.headline}
          onChange={(e) => onChangeHandle(e, "headline")}
          className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          rows={3}
          placeholder="Your headline..."
        ></textarea>
      </div>

      {/* CURRENT COMPANY */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700">Current Company*</label>
        <input
          type="text"
          value={data.curr_company}
          onChange={(e) => onChangeHandle(e, "curr_company")}
          className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          placeholder="Enter Current Company"
        />
      </div>

      {/* CURRENT LOCATION */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700">Current Location*</label>
        <input
          type="text"
          value={data.curr_location}
          onChange={(e) => onChangeHandle(e, "curr_location")}
          className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          placeholder="Enter Current Location"
        />
      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSaveBtn}
          className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition shadow-sm"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditinfoModal;
