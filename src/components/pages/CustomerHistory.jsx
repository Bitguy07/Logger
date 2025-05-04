import React from 'react'

const Customer = () => {
  return (
    <div className=' w-full flex-1 overflow-y-scroll scrollable-element' >
        <div className='mx-2 mt-7'>
        <span className='bg-[#C6ECCF] ml-4 rounded-t-xl px-12 py-1 text-[#266E73]'>New</span>
        <div className='h-auto w-full box-shadow-md text-shadow-md shadow-black font-light bg-[#287378] border-b-4 border-t-2 rounded-2xl border-[#C6ECCF]'>
            <div className='flex justify-between text-base mx-2 text-white mt-5 pb-2 border-b-[1px] border-white'>
                <p className='ml-5'>Afternoon & evening</p>
                <p className='mr-5'>12/15 days</p>
            </div>
            <div className='grid grid-cols-2 text-sm mx-4 mt-3 text-white '>
                <div className='space-y-1'>
                    <p className='text-base font-normal sm:font-semibold'>Total days: 15 days</p>
                    <p>Start date: 12/01/2025</p>
                    <p>End date: 27/01/2025</p>
                    <p>Payment method: Physical</p>
                    {/* <p className='text-yellow-300'>Edited: +2 Days</p> */}
                    {/* <p className='text-[#f8ee98]'>Paused from:</p>
                    <p className='text-[#f8ee98]'>29/01/2025 <span className='font-bold'>-</span>  05/02/2025</p> */}
                </div>
                <div className='space-y-1'>
                    <p className='text-base font-normal sm:font-semibold'>Total amount: 1650.00</p>
                </div>
            </div>
            <div className=' flex justify-between mx-4 mt-5 mb-8'>
                <button className='px-10 py-2 box-shadow-md rounded-lg bg-[#C6ECCF] text-[#266E73] text-lg '>
                    Edit
                </button>
                 <button className='px-8 py-2 box-shadow-md rounded-lg bg-[#C6ECCF] text-[#266E73] text-lg '> {/* bg-[#f8ee98] */}
                    Pause
                </button>
            </div>
        </div>
      </div>
      <div className='mx-2 mt-7 mb-5'>
        <span className='bg-[#C6ECCF] ml-4 rounded-t-xl px-12 py-1 text-[#266E73]'>Old</span>
        <div className='h-auto w-full box-shadow-md text-shadow-md shadow-black font-light bg-[#287378] border-b-4 border-t-2 rounded-2xl border-[#C6ECCF]'>
            <div className=' mb-12'>
                {/* <div className='mx-2 space-y-1'>
                    <div className='h-[1px] w-full bg-white rounded'></div>
                    <div className='h-[1px] w-full bg-white rounded'></div>
                </div> */}
                <div className='flex justify-between text-base mx-2 text-white mt-5 pb-2 border-b-[1px] border-white'>
                    <p className='ml-5'>Afternoon & evening</p>
                </div>
                <div className='grid grid-cols-2 text-sm mx-4 mt-3 text-white '>
                    <div className='space-y-1'>
                        <p className='text-base font-normal sm:font-semibold'>Total days: 15 days</p>
                        <p>Start date: 12/01/2025</p>
                        <p>End date: 27/01/2025</p>
                        <p>Payment method: Physical</p>
                        {/* <p className='text-yellow-300'>Edited: +2 Days</p> */}
                        {/* <p className='text-[#f8ee98]'>Paused from:</p>
                        <p className='text-[#f8ee98]'>29/01/2025 <span className='font-bold'>-</span>  05/02/2025</p> */}
                    </div>
                    <div className='space-y-1'>
                        <p className='text-base font-normal sm:font-semibold'>Total amount: 1650.00</p>
                    </div>
                </div>
            </div>
            <div className=' mt-8 mb-12'>
                <div className='mx-2 space-y-1'>
                    <div className='h-[1px] w-full bg-white rounded'></div>
                    <div className='h-[1px] w-full bg-white rounded'></div>
                </div>
                <div className=' text-base mx-2 text-white mt-5 pb-2 border-b-[1px] border-white'>
                    <p className='ml-5'>Afternoon & evening</p>
                </div>
                <div className='grid grid-cols-2 text-sm mx-4 mt-3 text-white '>
                    <div className='space-y-1'>
                        <p className='text-base font-normal sm:font-semibold'>Total days: 15 days</p>
                        <p>Start date: 12/01/2025</p>
                        <p>End date: 27/01/2025</p>
                        <p>Payment method: Physical</p>
                        {/* <p className='text-yellow-300'>Edited: +2 Days</p> */}
                        {/* <p className='text-[#f8ee98]'>Paused from:</p>
                        <p className='text-[#f8ee98]'>29/01/2025 <span className='font-bold'>-</span>  05/02/2025</p> */}
                    </div>
                    <div className='space-y-1'>
                        <p className='text-base font-normal sm:font-semibold'>Total amount: 1650.00</p>
                    </div>
                </div>
            </div>
            <div className=' mt-8 mb-12'>
                <div className='mx-2 space-y-1'>
                    <div className='h-[1px] w-full bg-white rounded'></div>
                    <div className='h-[1px] w-full bg-white rounded'></div>
                </div>
                <div className='flex justify-between text-base mx-2 text-white mt-5 pb-2 border-b-[1px] border-white'>
                    <p className='ml-5'>Afternoon & evening</p>
                </div>
                <div className='grid grid-cols-2 text-sm mx-4 mt-3 text-white '>
                    <div className='space-y-1'>
                        <p className='text-base font-normal sm:font-semibold'>Total days: 15 days</p>
                        <p>Start date: 12/01/2025</p>
                        <p>End date: 27/01/2025</p>
                        <p>Payment method: Physical</p>
                        {/* <p className='text-yellow-300'>Edited: +2 Days</p> */}
                        {/* <p className='text-[#f8ee98]'>Paused from:</p>
                        <p className='text-[#f8ee98]'>29/01/2025 <span className='font-bold'>-</span>  05/02/2025</p> */}
                    </div>
                    <div className='space-y-1'>
                        <p className='text-base font-normal sm:font-semibold'>Total amount: 1650.00</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Customer