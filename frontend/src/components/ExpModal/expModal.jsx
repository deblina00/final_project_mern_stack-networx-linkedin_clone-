import React, { useState } from "react";

const ExpModal = ({ handleEditFunc, selfData, updateExp, setUpdateExp }) => {
  const [data, setData] = useState({
    designation: updateExp?.clicked ? updateExp?.data?.designation : "",
    company_name: updateExp?.clicked ? updateExp?.data?.company_name : "",
    duration: updateExp?.clicked ? updateExp?.data?.duration : "",
    location: updateExp?.clicked ? updateExp?.data?.location : "",
  });

  const onChangeHandle = (event, key) => {
    setData({ ...data, [key]: event.target.value });
  };

  const updateExpSave = () => {
    let newFilteredData = selfData?.experience.filter(
      (item) => item._id !== updateExp?.data?._id
    );
    let newArr = [...newFilteredData, data];
    let newData = { ...selfData, experience: newArr };
    handleEditFunc(newData);
  };

  const handleOnSave = () => {
    if (updateExp?.clicked) return updateExpSave();

    let expArr = [...selfData?.experience, data];
    let newData = { ...selfData, experience: expArr };
    handleEditFunc(newData);
  };

  const handleOnDelete = () => {
    let newFilteredData = selfData?.experience.filter(
      (item) => item._id !== updateExp?.data?._id
    );
    let newData = { ...selfData, experience: newFilteredData };
    handleEditFunc(newData);
  };

  return (
    <div className="bg-white p-6 space-y-6 w-full max-h-[450px] overflow-y-auto">
      {/* ROLE */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700">Role*</label>
        <input
          type="text"
          value={data.designation}
          onChange={(e) => onChangeHandle(e, "designation")}
          className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none"
          placeholder="Enter Role"
        />
      </div>

      {/* COMPANY */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700">Company*</label>
        <input
          type="text"
          value={data.company_name}
          onChange={(e) => onChangeHandle(e, "company_name")}
          className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none"
          placeholder="Enter Company Name"
        />
      </div>

      {/* DURATION */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700">Duration*</label>
        <input
          type="text"
          value={data.duration}
          onChange={(e) => onChangeHandle(e, "duration")}
          className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none"
          placeholder="Enter Duration"
        />
      </div>

      {/* LOCATION */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700">Location*</label>
        <input
          type="text"
          value={data.location}
          onChange={(e) => onChangeHandle(e, "location")}
          className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none"
          placeholder="Enter Location"
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-between pt-4">
        <button
          onClick={handleOnSave}
          className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-sm transition"
        >
          Save
        </button>

        {updateExp?.clicked && (
          <button
            onClick={handleOnDelete}
            className="px-5 py-2 border border-red-400 text-red-600 hover:bg-red-50 rounded-xl transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ExpModal;
