import React from 'react'
import icon from '../../assets/icon_03.svg'
import Wallet from '../../assets/Wallet.svg'
import Peoples from '../../assets/peoples.svg'
import setting from '../../assets/setting.svg'
import Header from './Header'
import TaskBar from './TaskBar'
import UnifiedMenuPanel from './UnifiedMenuPanel'
import { useAuth } from '../../Authentication/AuthContext'
import { useNavigate } from 'react-router-dom'

const DashBoard = () => {

  const { MenuPannel, user } = useAuth();
  const navigate = useNavigate();

  function CapitalizedName(str){
    return str.split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
  }

  return (
    <div className='h-full w-full  pb-10  relative flex flex-col bg-[#C6ECCF] rounded-md'>
      {/* Header section */}
      <Header title = {{ type : "title", Title: "Dashboard" }} 
              buttons = {
                <>
                  {/* <button className='text-[#C6ECCF] p-2 w-10 mr-[0.1rem] mt-[0.11rem] h-10 ring-1 ring-[#C6ECCF] rounded-full hover:bg-[#4a8a8e]'><img className='h-6 w-6' src={icon} alt="" /></button> */}
                  <button onClick={MenuPannel} className='text-[#C6ECCF] p-2 mr-[0.1rem] mt-[0.11rem] w-10 h-10 rounded-full hover:bg-[#4a8a8e] '><ion-icon name="ellipsis-vertical"></ion-icon></button>
                </>
              }
       />

            {/* Body Section */}
      <div className='flex-1 bg-[#C6ECCF] overflow-y-scroll scrollable-element'>
        <>{true ? 
        <>
          <div className=' px-7 pt-11 pb-3'>
            <p className='text-[#266E73] font-medium text-2xl'>Welcome back</p>
            <h1 className='text-black mt-1 mb-2 nokora-black'>{CapitalizedName(user?.name)}</h1>
          </div>

          <div className="grid grid-cols-2 shadow-md bg-[#2E6D71]/[0.21] gap-4 p-3 mx-3 rounded-xl">
            <div onClick={() => navigate('/not-ready')} className='col-span-2 bg-[#C6ECCF] hover:scale-[0.99] cursor-pointer shadow-[3px_4px_4px_#39898e] rounded-xl'>
              <p className='bg-primaryBg text-lg text-[#cbe7e9] flex justify-center py-2 items-center font-medium rounded-t-xl pr-9'><img src={Wallet} alt="wallet.svg" className='mr-4 h-7 w-7'/>Wallet</p>
              <div className='flex items-center text-[#063336] nokora-regular font-bold text-4xl py-8  justify-center'><p>Rs: 00.00</p></div>
            </div>
            <div className='rounded-xl'>
              <p className='bg-primaryBg text-sm text-[#cbe7e9] text-center py-2  font-medium rounded-t-xl'>Active Customer</p>
              <div className='flex flex-col bg-[#C6ECCF] items-center justify-center rounded-b-xl shadow-md gap-2 px-6 pt-5 text-[#063336] pb-2'><img src={Peoples} alt=""/><p className='font-extrabold text-2xl'>0</p></div>
            </div>
            <div onClick={() => navigate('/not-ready')} className='rounded-xl relative hover:scale-[0.99] cursor-pointer shadow-[3px_4px_4px_#39898e]'>
              <p className='bg-primaryBg text-sm text-[#cbe7e9] text-center py-2  font-medium rounded-t-xl'>Other Payments</p>
              {/* <div className='absolute top-9 w-full rounded-b-xl text-center text-red-500 '><p className='bg-white small-text rounded-b-xl p-1'><span className='mr-1 rounded-full px-[5px] py-[2px] border border-red-500'>8</span>Payment {'>'} 900 made. Please check and edit.</p></div> */}
              <div className='flex flex-col bg-[#C6ECCF] items-center justify-center rounded-b-xl shadow-md gap-2 p-[1.78rem] text-[#063336]'><ion-icon name="cash-outline"></ion-icon></div>
            </div>
          </div>

          <div onClick={() => navigate('/menu-setting-pannel')} className='bg-[#EEC573] cursor-pointer flex items-center justify-between my-5 mx-3 p-4 rounded-xl shadow-md'>
            <p className='text-[#6D624C] font-medium ml-1 text-xl'>Menu Management Setting</p>
            <div><img src={setting} alt="setting.svg" className='mr-2'/></div>
          </div>
        </>         
          : 
        <div className='flex items-center justify-center h-full text-center w-full text-[#266E73] font-bold text-2xl'>
            <div className='m-12'>
            <p>No Customer yet!</p>
            <p className='text-sm font-normal'>Please generate the QR code by filling you information...</p>
        </div>
      </div>
    }
    </>
    </div>
    </div>
    
  )
}

export default DashBoard