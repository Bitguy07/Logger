import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TaskBar = () => {

    const [click, setClick] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();
    const link = [
      {
        id: 1, element: <ion-icon name="people-sharp"></ion-icon>,      path: '/customer-page'
      },
      {
        id: 2, element: <ion-icon name="search"></ion-icon>,            path: '/search-page'
      },     
      {
        id: 3,  element: <ion-icon name="person-add-sharp"></ion-icon>, path: '/addcustomer-page'
      },  
      {
        id: 4, element: <ion-icon name="person-circle"></ion-icon>,     path: '/dashBoard-page'
      },  
    ]

    const handle_route = (path, index) => {
      setClick(index);
      navigate(path);
    }

    useEffect (() => {
      const activeIndex = link.findIndex(links => links.path === location.pathname);
      if(activeIndex !== -1)  {
        setClick(activeIndex);
      }
    }, [location.pathname]);
  
  return (
    <>
        <nav className='bg-[#266E73] absolute bottom-0 right-0 w-full'>
            <ul className='flex justify-around  py-1'>
              {
                link.map((links, index) => <li key={links.id} onClick={() => handle_route(links.path, index)} className={`${(index === click ) ? `bg-[#C6ECCF] text-[#266E73]` : `text-[#C6ECCF]`}
                hover:cursor-pointer ${(index === 1 || index === 2) ? `px-[7px] pt-[7px]` : ` pt-[5px] px-[5px]`}  shadow transition-all transform shadow-[#C6ECCF] 
                    rounded-lg`}>{links.element}</li>)
              }
            </ul>
        </nav>
    </>
  )
}

export default TaskBar