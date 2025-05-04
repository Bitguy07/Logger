import React from 'react';

const Header = ( props ) => {
  return (
    <div className={`bg-[#266E73] w-full flex justify-between items-center space-x-2 ${props.title.type === "input" ? `px-2 py-[8px]` : `py-[6px] px-2`} rounded-t-sm`}>
      <div className="flex items-center justify-between grow">
        {props.title.type === "input" ? 
          <input
            type="text"
            className={`w-full focus:bg-[#C6ECCF] bg-[#266E73] placeholder-[#C6ECCF] focus:placeholder-slate-400 font-light border border-[#C6ECCF] text-lg rounded-full focus:ring-2 focus:ring-[#175256] py-[7px] pl-4 mr-2 focus:outline-none`}
            placeholder='Search by name or number'
          />
         : 
          <h1 className="nokora-bold mt-1 text-left text-[#C6ECCF]">{props.title.Title}</h1>
        }
        {<div className="flex space-x-1">{props.buttons}</div>}
      </div>
    </div>
  );
};

export default Header;
