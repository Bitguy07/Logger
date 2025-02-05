import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Authentication/AuthContext';

const menuItems = [
  { label: 'Help', icon: <ion-icon name="help-circle-outline"></ion-icon>, color: '#2E6D71', isDanger: false },
  { label: 'Contact Us', icon: <ion-icon name="chevron-down-outline"></ion-icon>, color: '#2E6D71', isDanger: false },
  { label: 'Terms & Condition', icon: <ion-icon name="reader-outline"></ion-icon>, color: '#2E6D71', isDanger: false },
  { label: 'Log Out', icon: <ion-icon name="exit-outline"></ion-icon>, color: '#FF0505', isDanger: true },
];

const contactOptions = [
    { icon: <ion-icon name="logo-instagram"></ion-icon>, label: 'Instagram', link: '#' },
    { icon: <ion-icon name="logo-linkedin"></ion-icon>, label: 'LinkedIn', link: '#' },
    { icon: <ion-icon name="mail"></ion-icon>, label: 'Email', link: '#' },
  ];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [linkData, setLinkData] = useState(null);
  const navigate = useNavigate();
  const {logout} = useAuth();

  const Link_navigation = (label) => {
    setLinkData({label: label});
  }

  useEffect (() => {
    if(!linkData?.label) return;

    switch(linkData?.label) {
      case 'Help' : 
          navigate('/about-us');
      break;

      case 'Terms & Condition' :
          navigate('/terms-&-conditions');
      break;

      case 'Log Out' :
          logout();
      break;

      default: 
        return;
    }

  }, [linkData, navigate, logout])

  const toggle = () => {
    setOpen(!open);
  } 
  return (
    <div className=' sm:w-[60%] w-[90%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-20 '>
        <div className=" bg-[#266E73]/[.8] p-8 sm:p-12 rounded-lg shadow-lg">
        {menuItems.map((item, index) => (
          <div key={index} onClick={['Contact Us'].includes(item.label) ? toggle : () => Link_navigation (item.label) } className={` ${['Terms & Condition', 'Help'].includes(item.label) && `hover:bg-[#C6ECCF]`} ${['Log Out'].includes(item.label) ? `hover:bg-[#ff0505] hover:text-white`:``} font-medium cursor-pointer text-lg px-5 bg-[#FFFFFF] py-1 mb-2 rounded-lg`}>
              <div
              className={`flex justify-between items-center space-x-8 sm:space-x-16 rounded-lg ${
                  item.isDanger ? 'text-[#FF0505] hover:text-white' : 'text-[#063336]'
              } `}
              >
              <span className="flex items-center">
                  {item.label}
              </span>
              {item.icon && <span key={item.index} className={`${(open && ['Contact Us'].includes(item.label) ) ? `rotate-180 py-1 transition-all duration-500` : `mt-2 `}`} >{item.icon}</span>}
              </div>
              {open && <>
                {item.label === 'Contact Us' && <div className='border-t-[1px] mt-1 pt-4 flex items-center justify-around border-[#2E6D71] '>
                  {contactOptions.map((option, index) => (
                  <a
                    key={index}
                    href={option.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#063336] hover:text-[#2E6D71] transition"
                    aria-label={option.label}
                  >
                    {option.icon}
                  </a>
                  ))}
              </div> }
              </>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
