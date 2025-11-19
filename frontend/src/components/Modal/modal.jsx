

// Modal.jsx
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({ children, closeModal, title }) => {
  return (
    <div className="bg-black/50 fixed top-0 left-0 inset-0 z-30 flex justify-center items-start md:items-center overflow-y-auto py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 relative">
        {/* Close Button */}
        <div
          onClick={closeModal}
          className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-gray-900"
        >
          <CloseIcon />
        </div>

        {/* Optional title */}
        {title && <div className="text-xl font-semibold mb-4">{title}</div>}

        {/* Modal content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
