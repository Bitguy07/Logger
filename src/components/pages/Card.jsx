import React from "react";

const Card = (props) => {
  return (
    <div className={`${props.primaryBgColor} ${props.shadow} rounded-3xl cursor-pointer p-4 shadow-md  w-full mx-auto`}>
      {/* Top Section */}
      <div className="flex items-center space-x-4">
        <div className={`w-10 h-10 ${props.secondryBgColor} rounded-full flex items-center justify-center`}>
          <img src={props.image} alt="Icon" className="w-7 h-7" />
        </div>
        <div>
          <p className={`font-semibold ${props.firstTextColor}`}>Mohd Yunus</p>
          <p className={`text-sm ${props.firstTextColor}`}>+91 63495 48994</p>
        </div>
      </div>

      {/* Middle Section */}
      <div className={`${props.secondryBgColor} ${props.secondTextColor} space-x-2 rounded-xl mt-4 p-2 w-full h-full flex justify-between items-center`}>
       <div className={`flex justify-between ${props.width} items-center ${props.transparentBackground} ${props.shadow} shadow-md rounded-xl p-2 `}>
            <div>
                <p className="font-bold">Left days:</p>
                <p className="font-bold">Last date:</p>
            </div>
            <div>
                <p className="font-semibold">15 Days</p>
                <p className="font-semibold">28/12/24</p>
            </div>
       </div>
       {props.TimingComponent}
      </div>
    </div>
  );
};

export default Card;
