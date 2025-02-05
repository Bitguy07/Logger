import React from 'react'

const Timing = (props) => {
  return (
        <div className={`${props.transparentBackground} ${props.width} flex items-center justify-center ${props.shadow} shadow-md rounded-xl`}>
            <div className={`flex ${props.padding} space-x-2`}>
                {props.timing}
            </div>
        </div> 
    )
}

export default Timing