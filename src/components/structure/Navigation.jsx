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

function DefaultLayout ({children}) {

    const {isClicked, BlurDiv} = useAuth();
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

const navigation_button = [
    {path: "/",                               name: 'Home',                         element: <Home />,                                          isPrivate: false},
    {path: "/about-us",                       name: 'About Us',                     element: <AboutUs />,                                       isPrivate: false},
    {path: "/privacy-&-policy",               name: 'Privacy & Policy',             element: <PrivacyPolicy/>,                                  isPrivate: false},
    {path: "/terms-&-conditions",             name: 'Terms & Conditions',           element: <TermsConditions/>,                                isPrivate: false},
    {path: "/cancellation-&-refund-policy",   name: 'Cancellation & Refund Policy', element: <CancellationRefunPolicy/>,                        isPrivate: false},
    {path: "/login-page",                     name: 'LoginPage',                    element: <LoginPage />,                                     isPrivate: false},
    {path: "/signup-page",                    name: 'SignupPage',                   element: <SignupPage />,                                    isPrivate: false},
    {path: "/customer-page",                  name: 'CustomerPage',                 element: <DefaultLayout><CustomerPage /></DefaultLayout>,   isPrivate: true},
    {path: "/qr-code",                        name: 'QrCode',                       element: <DefaultLayout><QR_code /></DefaultLayout>,        isPrivate: true},
    {path: "/not-ready",                      name: 'NotReady',                     element: <DefaultLayout><NotReady /></DefaultLayout>,       isPrivate: true},
    {path: "/addcustomer-page",               name: 'AddCustomerPage',              element: <DefaultLayout><AddCustomer /></DefaultLayout>,    isPrivate: true},
    {path: "/search-page",                    name: 'SearchPage',                   element: <DefaultLayout><SearchPage /></DefaultLayout>,     isPrivate: true},
    {path: "/dashBoard-page",                 name: 'DashBoardPage',                element: <DefaultLayout><DashBoard /></DefaultLayout>,      isPrivate: true},
]

export default navigation_button;