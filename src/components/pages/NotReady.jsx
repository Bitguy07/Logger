import React from "react";
import Page_not_ready_yet from '../../assets/Page_not_ready_yet.svg'

const NotReady = () => {
    return (
<>
    <div className='h-full w-full pb-10  relative flex flex-col rounded-md'>
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

export default NotReady;