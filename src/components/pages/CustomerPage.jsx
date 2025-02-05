import React from 'react'
import QR_Img from  '../../assets/QrCode.svg'
import Card from './Card'
import icon from '../../assets/icon.svg'
import icon_01 from '../../assets/icon_01.svg'
import icon_02 from '../../assets/icon_02.svg'
import sun from "../../assets/Sun.svg";
import moon from "../../assets/Moon.svg";
import sun_fog from "../../assets/Sun_Fog.svg";
import Timing from './Timing'
import Header from './Header'
import TaskBar from './TaskBar'
import { useNavigate } from 'react-router-dom'

const icons = [
  { id: 1, name: "Sunrise", src: sun_fog , alt: "Sunrise Icon" },
  { id: 2, name: "Afternoon", src: sun , alt: "Afternoon Icon" },
  { id: 3, name: "Moon", src: moon , alt: "Moon Icon" },
];

const CustomerPage = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className='h-full w-full  relative flex flex-col bg-[#C6ECCF] rounded-md'>
      {/* Header section */}
      <Header title = {{ type : "title", Title: "Logger" }} 
              buttons = {
                <>
                  <button onClick={() => navigate('/qr-code')} className='text-[#C6ECCF] p-2 mr-[0.1rem] mt-[0.11rem] w-10 h-10 rounded-full hover:bg-[#4a8a8e]'><img className='h-6 w-6' src={QR_Img} alt="" /></button>
                  {/* <button className='text-[#C6ECCF] p-2 mr-[0.1rem] mt-[0.11rem] w-10 h-10 rounded-full hover:bg-[#4a8a8e] '><ion-icon name="ellipsis-vertical"></ion-icon></button> */}
                </>
              }
       />

            {/* Body Section */}
      <div className='flex-1 bg-[#C6ECCF] overflow-y-scroll scrollable-element'>
        <>{false ? 
        <div className='mt-5 space-y-6 mb-20'>

        {/* Unpaid Section */}
      <div>
        <span className='bg-[#732626] ml-4 rounded-t-xl px-10 py-1 font-semibold text-[#FFFFFF]'>Unpaid</span>
        <div className='h-auto w-full space-y-3 p-3 bg-[#ECEBEB] border-y-4 rounded-2xl border-[#732626]'>
        <Card   primaryBgColor = "bg-[#732626]" 
            secondryBgColor = "bg-[#ECEBEB]"
            firstTextColor = "text-[#FFFFFF]"
            secondTextColor = "text-[#000000]"
            shadow = "shadow-[#732626]/[.7]"
            transparentBackground = "bg-[#732626]/[.21]"
            width = "w-[65%]"
            image = {icon_02}
          /> 
        </div>
      </div>

      {/* Paused section */}

      <div>
        <span className='bg-[#6D624C] ml-4 rounded-t-xl px-10 py-1 text-[#EEC573]'>Paused</span>
        <div className='h-auto w-full space-y-3 p-3 bg-[#EEC573] border-y-4 rounded-2xl border-[#6D624C]'>
          <Card   primaryBgColor = "bg-[#6D624C]" 
                  secondryBgColor = "bg-[#EEC573]"
                  firstTextColor = "text-[#EEC573]"
                  secondTextColor = "text-[#69593a]"
                  shadow = "shadow-[#6D624C]/[.7]"
                  transparentBackground = "bg-[#6D624C]/[.21]"
                  width = "w-[61%]"
                  image = {icon_01}
                  TimingComponent =
                  {<Timing 
                          width = "w-[39%]"
                          padding = ""
                          timing = {
                          <div className='py-2'>
                            <p className="font-bold">Paused from</p>
                            <p className="text-center font-semibold">28/12/24</p>
                          </div>
                  }
                 transparentBackground = "bg-[#6D624C]/[.21]"
                 shadow = "shadow-[#6D624C]/[.7]"
                 />}
            /> 
        </div>
      </div>

      {/* Paid section  */}
      
      <div>
        <span className='bg-[#266E73] ml-4 rounded-t-xl px-12 py-1 text-[#C6ECCF]'>Paid</span>
        <div className='h-auto w-full space-y-3 p-3 bg-[#C6ECCF] border-y-4 rounded-2xl border-[#266E73]'>
          <Card primaryBgColor = "bg-primaryBg" 
                secondryBgColor = "bg-[#C6ECCF]"
                firstTextColor = "text-primaryText"
                secondTextColor = "text-[#266E73]"
                shadow = "shadow-[#4a8a8e]"
                transparentBackground = "bg-primaryBg/[.21]"
                width = "w-[65%]"
                image = {icon}
                
                TimingComponent =
                 {<Timing width = "w-[35%]"
                          padding = "py-[1.38rem]"
                          timing = {icons.map((icon) => (
                          <img
                            key={icon.id}
                            src={icon.src}
                            alt={icon.alt}
                            className="w-5 h-5"
                          />
                        ))}
                transparentBackground = "bg-primaryBg/[.21]"
                shadow = "shadow-[#4a8a8e]"
                />}
          />
        </div>
      </div>

    </div> : 
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
    < TaskBar />
    </>

  )
}

export default CustomerPage