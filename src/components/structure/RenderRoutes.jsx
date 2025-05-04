import React from 'react'
import {Routes, Route, useLocation} from 'react-router-dom';
import { useAuth } from '../../Authentication/AuthContext';
import { getNavigationButtons } from './Navigation';
import { encryptOwnerData } from '../../utils/encryption';

const RenderRoutes = () => {
  const {user, loading} = useAuth();

  if (user && user.username && user.id) {
    // Generate the encrypted link from user data.
    const encodedLink = encryptOwnerData({ ownerId: user.id, email: user.username });
    console.log('OwnersParamsEncryptedData:', encodeURIComponent(encodedLink));
  }

  // Get navigation buttons using the computed encodedLink.
  const navigation_button = getNavigationButtons();
  
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