import React from 'react'
import { CiBookmark } from "react-icons/ci";

const CvItem = ({ userCvData }) => {
    return (
        <div className=' flex h-[171px] w-full justify-between gap-1 cursor-pointer '>
            <img src={userCvData?.userImage} className=' h-[171px] w-[171px]' />
            <div className=' flex-1 flex flex-col border border-gray-300 rounded-lg shadow p-6 justify-between  '>
                <div className=' flex flex-col'>
                    <span className=' text-xl font-semibold'>{userCvData?.userName}</span>
                    <div className=' flex text-xs gap-2 items-center'>
                        <div className=' bg-[#E7F6EA] text-green-800 uppercase rounded-[3px] p-1'>{userCvData?.jobLevel}</div>
                        <div className=' text-[#767F8C]'>{userCvData?.phoneNumber}</div>
                    </div>
                </div>
                <div className=' flex h-[48px] gap-3'>
                    <img src={userCvData?.companyImage} className='h-[48px] w-[48px] rounded' />
                    <div className=' flex flex-col gap-1'>
                        <div className=' font-semibold'>{userCvData?.experience}</div>
                        <div className=' text-xs text-[#767F8C]'>{userCvData?.companyLocation}</div>
                    </div>
                </div>
            </div>
            <div className=' flex items-center justify-center p-4 flex-none'><CiBookmark size={48} className=' text-yellow-600' /></div>
        </div >
    )
}

export default CvItem
