import React from 'react'
import delete_icon from '../../assets/icon_delete.svg'
import call_icon from '../../assets/Icon_green_call.svg'
import customer_dp_icon from '../../assets/customer_dp_icon.svg'

const CustomerHeader = () => {
  return (
<>
<div className="flex items-center bg-[#266E73] text-white px-4 py-2 w-full">
      {/* Left Arrow Icon */}
        <button className='hover:bg-[#399298] -ml-4 rounded-full p-3'>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
      {/* User Avatar (white circle with user icon) */}
      <div className=" p-2 box-shadow-md rounded-full bg-white flex items-center justify-center">
            <img src={customer_dp_icon} className=' -mr-[1px]' alt="dp.svg" />
      </div>

      {/* Text Container */}
      <div className="flex flex-col text-shadow-md shadow-black ml-4">
        {/* Main line (truncate if too long) */}
        <span className="truncate text-xl font-medium w-44 sm:w-auto">
          Mohd Yunus
        </span>
        {/* Subtext (lighter color) */}
        <span className="text-sm text-white/70">
          +91 63495 48994
        </span>
      </div>

      {/* Push icons to the far right */}
      <div className="ml-auto flex items-center space-x-1">
        {/* Trash Icon */}
        <button className='p-[6px] rounded-full'>
            <img src={delete_icon} alt="delete.svg" />
        </button>

        {/* Phone Icon */}
        <button className='p-[5px] rounded-full'>
            <img src={call_icon} alt="call.svg" />
        </button>
      </div>
    </div>
        <div className="flex  justify-evenly items-center bg-[#02494E] text-white">
        <button className="hover:bg-[#399298] py-1 px-12  rounded-xl">History</button>
        <span className="h-6 w-1 rounded-full bg-white"></span>
        <button className="hover:bg-[#399298] py-1 px-10  rounded-xl ">Massage</button>     {/* text-shadow-md font-bold text-green-300 */}
      </div>
</>
  )
}

export default CustomerHeader