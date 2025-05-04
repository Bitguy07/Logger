import AboutUs from '../pages/AboutUs';
import Home from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import PrivacyPolicy from '../pages/Privacy_&_Policy';
import SignupPage from '../pages/SignupPage';
import TermsConditions from '../pages/Terms_&_Conditions';
import CancellationRefunPolicy from '../pages/Cancellation_&_Refund_Policy';
import CustomerPage from '../pages/CustomerPage';
import AddCustomer from '../pages/AddCustomer';
import SearchPage from '../pages/SearchPage';
import DashBoard from '../pages/DashBoard';
import TaskBar from '../pages/TaskBar';
import UnifiedMenuPanel from '../pages/UnifiedMenuPanel';
import { useAuth } from '../../Authentication/AuthContext';
import QR_code from '../pages/QR_code';
import NotReady from '../pages/NotReady';
import MenuSettingPannel from '../pages/MenuSettingPannel';
import OwnersWebPage from '../pages/OwnersWebPage';
import Customer from '../pages/CustomerHistory';
import CustomerHeader from '../SmallComponents/CustomerHeader';
import CustomerMessages from '../pages/CustomerMessages';

function DefaultLayout_00 ({children}) {
    const {isClicked, BlurDiv ,} = useAuth();

    return (
        <div className='relative h-full w-full sm:max-w-3xl '>
            <>
                {children}
                < TaskBar />
                {isClicked && 
                <>
                    < UnifiedMenuPanel />
                    < div onClick={BlurDiv} className={`inset-0 bg-[#000000] fixed opacity-80 backdrop-blur-sm `}></div>
                </>
                }
            </>
        </div>
    )
}

function DefaultLayout_01 ({children}) {
    return(
        <div className='bg-[#205b5f] flex flex-col h-full w-full sm:max-w-3xl' >
            <>
            <CustomerHeader />
            {children}
            </>
        </div>
    )
}

// Instead of calling useAuth() here, accept encodedLink as an argument.
export const getNavigationButtons = ( ) => {

    return [
      { path: "/",                               name: 'Home',                         element: <Home />,                                                  isPrivate: false },
      { path: "/about-us",                       name: 'About Us',                     element: <AboutUs />,                                               isPrivate: false },
      { path: "/privacy-&-policy",               name: 'Privacy & Policy',             element: <PrivacyPolicy />,                                           isPrivate: false },
      { path: "/terms-&-conditions",             name: 'Terms & Conditions',           element: <TermsConditions />,                                         isPrivate: false },
      { path: "/cancellation-&-refund-policy",   name: 'Cancellation & Refund Policy', element: <CancellationRefunPolicy />,                                 isPrivate: false },
      { path: "/login-page",                     name: 'LoginPage',                    element: <LoginPage />,                                             isPrivate: false },
      { path: "/signup-page",                    name: 'SignupPage',                   element: <SignupPage />,                                            isPrivate: false },
      { path: "/customer-page",                  name: 'CustomerPage',                 element: <DefaultLayout_00><CustomerPage /></DefaultLayout_00>,      isPrivate: true },
      { path: "/qr-code",                        name: 'QrCode',                       element: <DefaultLayout_00><QR_code /></DefaultLayout_00>,           isPrivate: true },
      { path: "/not-ready",                      name: 'NotReady',                     element: <DefaultLayout_00><NotReady /></DefaultLayout_00>,          isPrivate: true },
      { path: "/addcustomer-page",               name: 'AddCustomerPage',              element: <DefaultLayout_00><AddCustomer /></DefaultLayout_00>,       isPrivate: true },
      { path: "/search-page",                    name: 'SearchPage',                   element: <DefaultLayout_00><SearchPage /></DefaultLayout_00>,        isPrivate: true },
      { path: "/dashBoard-page",                 name: 'DashBoardPage',                element: <DefaultLayout_00><DashBoard /></DefaultLayout_00>,         isPrivate: true },
      { path: "/menu-setting-pannel",            name: 'MenuSettingPannel',            element: <MenuSettingPannel />,                                      isPrivate: true },
      { path: "/customer-by-id",                 name: 'Customer',                     element: <DefaultLayout_01><Customer /></DefaultLayout_01>,          isPrivate: true },
      { path: "/customer-messages-by-id",        name: 'Customer',                     element: <DefaultLayout_01><CustomerMessages /></DefaultLayout_01>,  isPrivate: true },
      { path: `/owners-webpage/:encrypted/:userencrypteddata?`, name: 'OwnersWebPage', element: <OwnersWebPage />,                                          isPrivate: false},
    ];
  };