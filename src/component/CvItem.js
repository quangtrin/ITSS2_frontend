import { Modal } from "antd";
import React from "react";
import { CiBookmark } from "react-icons/ci";
import { useState } from "react";

const CvItem = ({ userCvData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleClose = () => {
    setIsModalVisible(false);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <div
        onClick={() => setIsModalVisible(true)}
        className=" flex h-[171px] w-full justify-between gap-1 cursor-pointer "
      >
        <img
          src={"https://api.dicebear.com/7.x/miniavs/svg?seed=1"}
          className=" h-[171px] w-[171px]"
        />
        <div className=" flex-1 flex flex-col border border-gray-300 rounded-lg shadow p-6 justify-between  ">
          <div className=" flex flex-col">
            <span className=" text-xl font-semibold">
              {userCvData?.jobApplicant[0].name}
            </span>
            <div className=" flex text-xs gap-2 items-center">
              <div className=" bg-[#E7F6EA] text-green-800 uppercase rounded-[3px] p-1">
                {userCvData?.job[0].title}
              </div>
              <div className=" text-[#767F8C]">
                {userCvData?.jobApplicant[0].numberphone}
              </div>
            </div>
          </div>
          <div className=" flex h-[48px] gap-3">
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReDf5TOy1BLHTd4XHKHbSeKyYmr82upgnb8Q&s"
              }
              className="h-[48px] w-[48px] rounded"
            />
            <div className=" flex flex-col gap-1">
              <div className=" font-semibold">4 years</div>
              <div className=" text-xs text-[#767F8C]">Viet Nam</div>
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center p-4 flex-none">
          <CiBookmark size={48} className=" text-yellow-600" />
        </div>
      </div>
      <Modal
        open={isModalVisible}
        onCancel={handleClose}
        onOk={handleOk}
        cancelText={"Reject"}
        okText={"Accept"}
        onClose={() => setIsModalVisible(false)}
        okButtonProps={{ className: "bg-green-500 text-white" }}
        cancelButtonProps={{ className: "bg-red-500 text-white" }}
        style={{top: 5}}
      >
        <div>
          <img src={userCvData?.resume} alt="avatar" />
        </div>
      </Modal>
    </>
  );
};

export default CvItem;
