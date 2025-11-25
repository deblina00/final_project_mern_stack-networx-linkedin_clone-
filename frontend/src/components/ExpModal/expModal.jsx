
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
    <div className="bg-white p-4 sm:p-6 space-y-6 w-full max-w-xl mx-auto max-h-[80vh] overflow-y-auto">
      {/* ROLE */}
      <div className="space-y-1">
        <label className="font-medium text-gray-700 text-sm sm:text-base">
          Role*
        </label>
        <input
          type="text"
          value={data.designation}
          onChange={(e) => onChangeHandle(e, "designation")}
          className="p-3 w-full border text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
          placeholder="Enter Role"
        />
      </div>

      {/* COMPANY */}
      <div className="space-y-1">
        <label className="font-medium text-gray-700 text-sm sm:text-base">
          Company*
        </label>
        <input
          type="text"
          value={data.company_name}
          onChange={(e) => onChangeHandle(e, "company_name")}
          className="p-3 w-full border text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
          placeholder="Enter Company Name"
        />
      </div>

      {/* DURATION */}
      <div className="space-y-1">
        <label className="font-medium text-gray-700 text-sm sm:text-base">
          Duration*
        </label>
        <input
          type="text"
          value={data.duration}
          onChange={(e) => onChangeHandle(e, "duration")}
          className="p-3 w-full border text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
          placeholder="Enter Duration"
        />
      </div>

      {/* LOCATION */}
      <div className="space-y-1">
        <label className="font-medium text-gray-700 text-sm sm:text-base">
          Location*
        </label>
        <input
          type="text"
          value={data.location}
          onChange={(e) => onChangeHandle(e, "location")}
          className="p-3 w-full border text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
          placeholder="Enter Location"
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-3">
        <button
          onClick={handleOnSave}
          className="w-full sm:w-auto px-5 py-2 bg-purple-600 hover:bg-purple-700 
          text-white rounded-xl shadow-sm transition text-sm sm:text-base"
        >
          Save
        </button>

        {updateExp?.clicked && (
          <button
            onClick={handleOnDelete}
            className="w-full sm:w-auto px-5 py-2 border border-red-400 
            text-red-600 hover:bg-red-50 rounded-xl text-sm sm:text-base"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ExpModal;
