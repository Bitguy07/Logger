import React from 'react'
import {Routes, Route, Link } from 'react-router-dom';
import navigation_button from './Navigation';
import { useAuth } from '../../Authentication/AuthContext';
import TaskBar from '../pages/TaskBar';

const RenderRoutes = () => {
  const {user, loading} = useAuth();
  return (
    <div className="h-full w-full flex items-center justify-center">

        {/*Loading*/}
        {loading ? <div className="h-full bg-[#C6ECCF] font-semibold w-full flex items-center justify-center"><div className='text-[#266E73 text-3xl'>Loading....</div></div> 
        :    
        <Routes>
        <>
            {
                navigation_button.map((route, i) => {
                   if (route.isPrivate && user?.isAuthenticated ) {
                    {/*user.isAuthenticate */}
                       return <Route key={i} path={route.path} element={route.element} />
                    } else if (!route.isPrivate) {
                       return <Route key={i} path={route.path} element={route.element} />
                    }
                    return null; 
                })
            }
        </>
        </Routes>
        }
    </div>   
  )
}

export default RenderRoutes