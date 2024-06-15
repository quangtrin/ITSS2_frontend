import React from "react";

const ApplyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 h-fit ">
        <div className="flex justify-end pb-2">
          <button
            onClick={() => {
              onClose();
            }}
            className=" text-gray-400 hover:text-red-500"
          >
            ✖
          </button>
        </div>
        <div className="flex justify-center flex-col gap-6">
          <div className=" text-2xl font-semibold">Upload your CV</div>
          <div className="w-2/3">
            <textarea
              placeholder="Please send a few words to the company!"
              className="border-2 border-gray-200 p-2 rounded-lg w-full"
              rows="4"
            ></textarea>
            <p className="pt-2 font-bold">Your CV</p>
            <input
              className="pt-2"
              type="file"
              accept="image/*"
              name="url"
              placeholder="Select CV"
            />
          </div>

          <br />
        </div>
        <div className="flex justify-end gap-2">
          <div className="flex justify-center mt-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
