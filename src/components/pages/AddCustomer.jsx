import React from 'react'
import icon from '../../assets/icon.svg'
import Wallet from '../../assets/Wallet.svg'
import Peoples from '../../assets/peoples.svg'
import setting from '../../assets/setting.svg'
import Page_not_ready_yet from '../../assets/Page_not_ready_yet.svg'
import Header from './Header'
import TaskBar from './TaskBar'

const AddCustomer = () => {
  return (
    <>
    <div className='h-full w-full pb-10  relative flex flex-col rounded-md'>
      {/* Header section */}
      <Header title = {{ type : "title", Title: "Add Customer" }} 
       />

            {/* Body Section */}
      <div className='flex-1 overflow-y-scroll scrollable-element'>
        <>{false ? 
        <>
        </>         
          : 
        <div className="flex items-center justify-center h-full text-center w-full text-[#266E73] font-medium text-sm">
            <div className="m-12">
            <img src={Page_not_ready_yet} alt="" />
            <p>Not ready yet</p>
            <p className="text-sm font-normal ml-2">
              Page working in progress...
            </p>
            </div>
        </div>
    }
    </>
    </div>
    </div>
    </>

  )
}

export default AddCustomer