import React, { useEffect, useState } from "react";
import JobOverviewItem from "./JobOverviewItem";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { BsStack } from "react-icons/bs";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FaWallet } from "react-icons/fa";
import { FaMap } from "react-icons/fa";
import apiList from "../lib/apiList";
import { useParams } from "react-router-dom";
import axios from "axios";
import ApplyModal from "./ApplyModal";
const DetailJob = () => {
  const jobID = useParams().id;
  const [job, setJob] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const fetchJob = async () => {
    const res = await axios.get(apiList.detailJob(jobID));
    setJob(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    fetchJob();
  }, []);

  return (
    <div
      className=" w-9/12 flex flex-col gap-4"
      style={{ padding: "10px 50px" }}
    >
      <div className=" text-2xl font-semibold">Detail Job</div>
      <div className=" flex justify-between items-center">
        <div className=" flex gap-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXN9xSEe8unzPBEQOeAKXd9Q55efGHGB9BA&s"
            className=" w-[100px]"
          />
          <div className=" flex flex-col gap-2">
            <div className=" text-2xl font-semibold">{job.title}</div>
            <div className=" bg-green-600 rounded-[3px] text-white px-2">
              {job.jobType}
            </div>
          </div>
        </div>
        <div className=" bg-blue-800 rounded cursor-pointer text-white py-4 px-6 flex gap-2 items-center">
          <span onClick={openPopup}>Apply now</span>
          <FaArrowRight />
        </div>
        <ApplyModal isOpen={isPopupOpen} onClose={closePopup} />
      </div>
      <div className=" flex justify-between gap-4 ">
        <div className=" flex flex-col gap-4 flex-1">
          <div>
            <span className=" font-semibold text-xl">Job Description</span>
            <div>{job.jobDescription}</div>
          </div>
          <div>
            <span className=" font-semibold text-xl">Requirements</span>
            <div>
              {job?.skillsets?.map((re, index) => {
                return <div className="pl-3 p-1">- {re}</div>;
              })}
            </div>
          </div>
          <div>
            <span className=" font-semibold text-xl">Benefits</span>
            <div>
              {job?.benefits?.map((re, index) => {
                return <div className="pl-3 p-1">- {re}</div>;
              })}
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-4 w-2/5 flex-none">
          <div className="flex border-2 border-blue-100 justify-between rounded-lg">
            <div className=" flex flex-col flex-1 justify-center items-center p-8 ">
              <div className=" font-semibold">Salary(USD)</div>
              <div className=" text-2xl text-green-700">{`$${job.salary}`}</div>
              <div className=" text-xs text-gray-600">Yearly salary</div>
            </div>
            <div className=" flex flex-col flex-1 justify-center items-center  p-8">
              <FaMap className=" text-blue-800 font-semibold" size={24} />
              <div className=" font-semibold">Job Location</div>
              <div className=" text-xs text-gray-600">{job.address}</div>
            </div>
          </div>
          <div className=" flex flex-col border-2 border-blue-100 rounded-lg p-8 gap-5">
            <div className=" font-semibold">Job Overview</div>
            <div className="grid grid-cols-3 justify-between gap-5">
              <JobOverviewItem
                icon={
                  <MdOutlineCalendarToday
                    className=" text-blue-800"
                    size={24}
                  />
                }
                title={"job Posted"}
                data={job.dateOfPosting?.slice(0, 10)}
              />
              <JobOverviewItem
                icon={<FiClock className=" text-blue-800" size={24} />}
                title={"Job expire in:"}
                data={
                  job.jobOverview?.length > 0
                    ? job?.jobOverview[0]?.jobExpireIn
                    : ""
                }
              />
              <JobOverviewItem
                icon={<BsStack className=" text-blue-800" size={24} />}
                title={"Job Level:"}
                data={
                  job.jobOverview?.length > 0
                    ? job?.jobOverview[0]?.jobLevel
                    : ""
                }
              />
              <JobOverviewItem
                icon={<FaWallet className=" text-blue-800" size={24} />}
                title={"Experience"}
                data={
                  job.jobOverview?.length > 0
                    ? job?.jobOverview[0]?.experience
                    : ""
                }
              />
              <JobOverviewItem
                icon={
                  <BsFillBriefcaseFill className=" text-blue-800" size={24} />
                }
                title={"Education"}
                data={
                  job.jobOverview?.length > 0
                    ? job?.jobOverview[0]?.education
                    : ""
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailJob;
