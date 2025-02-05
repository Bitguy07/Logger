import React from 'react'
import icon from '../../assets/QR_key_Icon.svg'

const QR_code = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <div className='sm:mx-64 mx-10 sm:mb-5 flex items-center justify-center flex-col space-y-6 text-center sm:font-light font-serif '>
            <img className='h-56' src={icon} alt="secret key, missing." />
            <h1 className='sm:mx-0 mx-10'>Key ID & Secrect Id is needed to create QR code</h1>
        </div>
    </div>
  )
}

export default QR_code;