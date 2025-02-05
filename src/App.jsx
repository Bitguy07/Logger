import React, {useState} from 'react'
import CustomerPage from './components/pages/CustomerPage'
import DashBoard from './components/pages/DashBoard'
import TaskBar from './components/pages/TaskBar'
import SearchPage from './components/pages/SearchPage'
import AddCustomer from './components/pages/AddCustomer'
import LoginPage from './components/pages/LoginPage'
import UnifiedMenuPanel from './components/pages/UnifiedMenuPanel'
import PrivacyPolicy from './components/pages/Privacy_&_Policy'
import TermsAndConditions from './components/pages/Terms_&_Conditions'
import SignupPage from './components/pages/SignupPage'
import HomePage from './components/pages/HomePage'
import AboutUs from './components/pages/AboutUs'
import RenderRoutes from './components/structure/RenderRoutes'
import { BrowserRouter } from 'react-router-dom'
import Authwrapper from './Authentication/Authwrapper'

const App = () => {
  const [isClicked, setIsClicked] = useState(false);

  const MenuPannel = () => setIsClicked(!isClicked);
  const BlurDiv = () => setIsClicked(false);

  return (
    <div className="h-svh  flex items-center justify-center w-screen">
        <BrowserRouter>
          {/* <div className='relative h-full w-full sm:max-w-3xl '>   */}
          {/* < CustomerPage/>
          < SearchPage />
          < DashBoard onclick = {MenuPannel} menucard = {isClicked} />
          < TaskBar />  
          < AddCustomer /> */}
          {/* {isClicked && 
          <>
            < UnifiedMenuPanel />
            < div onClick={BlurDiv} className={`inset-0 bg-[#000000] fixed opacity-80 backdrop-blur-sm `}></div>
          </>
          } */}
          {/* </div> */}
          {/* < SignupPage /> */}
          {/* < LoginPage /> */}
          {/* < TermsAndConditions /> */}
          {/* < AboutUs /> */}
          {/* < PrivacyPolicy /> */}
          {/* < HomePage /> */}
          <Authwrapper />
        </BrowserRouter>
    </div>
  )
}

export default App