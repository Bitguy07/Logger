import React from 'react'
import MessageRobo from '../../assets/message_robo_icon.svg'
import MessageDpIcon from '../../assets/message_dp_icon.svg'

const CustomerMessages = () => {
  return (
    <div className='bg-white w-full flex-1 pt-5 text-white font-light overflow-y-scroll scrollable-element bg-mobile-doodle'>
        <div className='flex justify-end mt-5'>
            <div className='mx-2 w-[80%]'>
                <span className='flex justify-end mb-1'><img src={MessageRobo} alt="robo.svg" className='w-14 bg-white h-14 p-2 box-shadow-md rounded-full ' /></span>
                <div className='bg-[#02494E] p-4 rounded-xl box-shadow-md'>
                    <p>It has been 5 days since your payment was due. Please make the payment to continue your subscription, or inform the owner if you wish to stop the plan.</p>
                </div>
            </div>
        </div>
        <div className='mt-5'>
            <div className='mx-2 w-[80%]'>
                <span><div className='h-14 w-14 mb-1 flex items-center justify-center rounded-full p-2 bg-[#02494E] box-shadow-md'><img src={MessageDpIcon} alt="robo.svg" /></div></span>
                <div className='text-[#02494E] bg-white p-4 rounded-xl box-shadow-md'>
                    <p>Now I have subscribed for 30 days.</p>
                </div>
            </div>
        </div> 
        <div className='flex justify-end mt-5'>
            <div className='mx-2 w-[80%]'>
                <span className='flex justify-end mb-1'><img src={MessageRobo} alt="robo.svg" className='w-14 bg-white h-14 p-2 box-shadow-md rounded-full ' /></span>
                <div className='bg-[#02494E] p-4 rounded-xl box-shadow-md'>
                    <p>It has been 5 days since your payment was due. Please make the payment to continue your subscription, or inform the owner if you wish to stop the plan.</p>
                </div>
            </div>
        </div>
        <div className='mt-5'>
            <div className='mx-2 w-[80%]'>
                <span><div className='h-14 w-14 mb-1 flex items-center justify-center rounded-full p-2 bg-[#02494E] box-shadow-md'><img src={MessageDpIcon} alt="robo.svg" /></div></span>
                <div className='text-[#02494E] bg-white p-4 rounded-xl box-shadow-md'>
                    <p>Now I have subscribed for 30 days.</p>
                </div>
            </div>
        </div>
        <div className='flex justify-end mt-5'>
            <div className='mx-2 w-[80%]'>
                <span className='flex justify-end mb-1'><img src={MessageRobo} alt="robo.svg" className='w-14 bg-white h-14 p-2 box-shadow-md rounded-full ' /></span>
                <div className='bg-[#02494E] p-4 rounded-xl box-shadow-md'>
                    <p>It has been 5 days since your payment was due. Please make the payment to continue your subscription, or inform the owner if you wish to stop the plan.</p>
                </div>
            </div>
        </div>
        <div className='mt-5'>
            <div className='mx-2 w-[80%]'>
                <span><div className='h-14 w-14 mb-1 flex items-center justify-center rounded-full p-2 bg-[#02494E] box-shadow-md'><img src={MessageDpIcon} alt="robo.svg" /></div></span>
                <div className='text-[#02494E] bg-white p-4 rounded-xl box-shadow-md'>
                    <p>Now I have subscribed for 30 days.</p>
                </div>
            </div>
        </div> 
        <div className='flex justify-end mt-5'>
            <div className='mx-2 w-[80%]'>
                <span className='flex justify-end mb-1'><img src={MessageRobo} alt="robo.svg" className='w-14 bg-white h-14 p-2 box-shadow-md rounded-full ' /></span>
                <div className='bg-[#02494E] p-4 rounded-xl box-shadow-md'>
                    <p>It has been 5 days since your payment was due. Please make the payment to continue your subscription, or inform the owner if you wish to stop the plan.</p>
                </div>
            </div>
        </div>
        <div className='mt-5'>
            <div className='mx-2 w-[80%]'>
                <span><div className='h-14 w-14 mb-1 flex items-center justify-center rounded-full p-2 bg-[#02494E] box-shadow-md'><img src={MessageDpIcon} alt="robo.svg" /></div></span>
                <div className='text-[#02494E] bg-white p-4 rounded-xl box-shadow-md'>
                    <p>Now I have subscribed for 30 days.</p>
                </div>
            </div>
        </div>    
    </div>
  )
}

export default CustomerMessages