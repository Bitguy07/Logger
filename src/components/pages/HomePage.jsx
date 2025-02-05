import React, { useState } from 'react'
import ScreenShot from '../../assets/Mobile_ScreenShot.png';
import MenuBoard from '../../assets/MenuBoard.png';
import Message from '../../assets/Message.png';
import notebook from '../../assets/NoteBook.png';
import Subscription from '../../assets/SubscriptionCashflow.png';
import Wallet from '../../assets/Wallet.png';
import QRCode from '../../assets/QrCode.png';
import Logo from '../../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Authentication/AuthContext';

const HomePage = () => {
    const [click, setClick] = useState(false);
    const navigate = useNavigate();
    const {user} = useAuth();


    const Link = [
        {link:"Features", path:"#features"},
        {link:"About Us", path:"/about-us"},
        {link:"Login/Sign Up", path:"/signup-page"},
    ]

      const handleNavigation = (path) => {
          if (path.startsWith("#")) {
              // Internal scrolling
              const element = document.querySelector(path);
              if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
          } else {
              // Route navigation
              if(user?.isAuthenticated && path === "/signup-page") {
                navigate("/customer-page");
              } else {
                navigate(path);

              }
          }
      };
      
    const HowItWorks =[
      {id: 1, title:"1", description:"Customer scans the QR code."},
      {id: 2, title:"2", description:"Makes a payment for the preferred  plan."},
      {id: 3, title:"3", description:"The app automatically creates or updates the subscription record."},
      {id: 4, title:"4", description:"The owner monitors payments and manages the wallet."},
    ]

    const handleclick = (e) => {
        setClick(!click);
    }
  return (
    <div className="bg-white text-gray-800 h-full w-full relative ">
      {/* Header Section */}
      <header className="p-2 sm:px-6 sm:py-4 flex bg-gradient-to-t from-[#bbe0c3] to-[#f2faf4] justify-between items-center">
      <div className="flex items-center">
      <div className="bg-gradient-to-t ml-6 hidden sm:block from-[#e7d4ae] to-[#2c959c] rounded-full p-2 shadow-lg">
        <img
          src={Logo}
          alt="Logger App Logo"
          className="rounded-full h-14 w-14"
        />
      </div>
      <h1 className="text-4xl  font-bold text-[#266E73] ml-2">Logger</h1>
    </div>

    {/* Menu Button for Mobile */}
    <div className="sm:hidden">
      <button onClick={handleclick} className="text-gray-800">
        {!click ? <i className="w3-xlarge fa fa-bars mr-2 mt-1"></i> : <span className='text-3xl mr-2 mt-1'>&#10006;</span> }
      </button>
    </div>

    {/* Navbar */}
    <div className={`space-x-4 sm:hidden rounded-b-xl 
  ${click ? `translate-y-0 opacity-100 transition-all duration-200` 
           : `-translate-y-64 opacity-0 transition-all duration-100`} 
  bg-white w-full h-40 absolute z-10 left-0 top-14 shadow-sm`}>
        <ul className="flex flex-col space-y-2 p-4">
            {Link.map((link) => {
                return ( 
                    <div onClick={() => handleNavigation(link.path)} key={link.link}>
                        <li className={`${link.link === "Login/Sign Up" ? `bg-[#EEC573]  text-white pl-4 py-2 rounded hover:bg-white border-2 border-[#EEC573]`:`hover:bg-[#C6ECCF] py-1 rounded pl-4`}`}>
                            <a className="text-gray-800 hover:text-[#266E73]">{link.link}</a>
                        </li>
                    </div>
                );
            })}
        </ul>
    </div>
    <nav className="space-x-4 hidden sm:block">
        {
            Link.map((link) => {
                return (
                    <a
                    key={link.link}
                    onClick={() => handleNavigation(link.path)}
                    className={link.link === "Login/Sign Up" ? `bg-[#EEC573]  text-white px-6 py-2 rounded-full shadow-md transition duration-300 hover:shadow-emerald-500 cursor-pointer hover:bg-[#063336]` : `text-[#063336] hover:text-[#C6ECCF] cursor-pointer transition duration-300 pr-5`}
                    >
                    {link.link}
                    </a>
                );
            })
        }
    </nav>

    </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#C6ECCF] h-auto overflow-hidden relative flex sm:flex-row flex-col">
        <div className='sm:w-[60%] '>
            <div className=' w-full sm:h-[608px]'>
                <div className='sm:pt-[174px] sm:pl-[105px] mx-6 mt-14 sm:m-0'>
                    <h2 className=" nokora-bold-1 text-[#063336] mb-8 ">
                        Simplify Your Mess Subscription Management
                    </h2>
                    <p className="text-[#266E73] nokora-regular-1 sm:mb-[115px] mb-14 mr-7 ">
                        Track subscriptions, manage payments, and handle customer records
                        seamlessly.
                    </p>
                    <div className="space-x-4 pb-10 sm:pb-0 ">
                        <button onClick={user?.isAuthenticated ? () => navigate("/customer-page") :() => navigate("/signup-page")} className="bg-gradient-to-r sm:ml-4 from-[#EEC573] to-[#C6ECCF] text-white px-[22px] py-[14px] rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
                            Get Started
                        </button>
                        <button onClick={() => navigate("/about-us")} className="button-border border-[#266E73] text-[#266E73] px-[22px] py-[14px] rounded-lg transition duration-300 hover:bg-gradient-to-r from-[#EEC573] to-[#C6ECCF]">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className='sm:w-[35%]'>
           
        </div>
        <div className="sm:absolute sm:-top-16 sm:-right-5 sm:-rotate-[20.84deg]">
            <img
                src={ScreenShot}
                alt="Mobile app screenshot"
                className='sm:w-[430px] sm:h-[892px] object-contain w-full sm:opacity-80'
            />
        </div>
 
      </section>

      {/* Features Section */}
      <section id='features' className="pb-20 pt-16 px-6 bg-gradient-to-b from-white from-10% via-[#C6ECCF] via-85% to-white to-100%">
        <h2 className="text-[40px] font-bold text-center mb-24 text-glow">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Subscription Management',
              description: 'Handle 15-day or 30-day meal plans for customers with flexible options.',
              imgSrc: Subscription,
            },
            {
              title: 'In-App Wallet',
              description:
                'Consolidate customer payments securely and transfer funds easily.',
              imgSrc: Wallet,
            },
            {
              title: 'Error-Free Records',
              description:
                'Automatically log and edit payments to avoid misunderstandings.',
              imgSrc: notebook
            },
            {
              title: 'Menu Management',
              description: 'Predefine menu prices for quick transactions.',
              imgSrc: MenuBoard,
            },
            {
              title: 'QR-Based Payments',
              description:
                'Customers scan and pay—no extra apps needed.',
              imgSrc: QRCode,
            },
            {
                title: 'Automatic massages',
                description: 'When a subscription expires, an alert is sent to both the owner and the customer.',
                imgSrc: Message,
              },
          ].map((feature, index) => (
            <div
              key={index}
              className="feature-card p-6 bg-[#81a489cc] flex flex-col items-center rounded-lg shadow-lg hover:scale-105 transition-all"
            >
              <img src={feature.imgSrc} alt={feature.title} className="mb-4" />
              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it's Works */}
      <section className='w-full bg-[#EEC573] pt-16 pb-16'>  
      <div className='text-3xl font-semibold flex items-center justify-center pb-9'><p className='text-glow'>How it Works</p> </div> 
         <div className='flex items-center justify-center'>
            <div className='px-8'>
              {
                HowItWorks.map((data) => {
                  return (
                    <div key={data.id} className='flex bg-[#f1d59e] my-4 ring-2 ring-[#b79553] rounded-xl hover:scale-105 items-center justify-start'>
                      <div className='px-7 py-5 m-3 bg-[#266E73] text-white rounded-full'> {data.title}</div>
                      <p className='sm:text-2xl'> {data.description} </p>
                    </div>
                  )
                })
              }
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#063336] text-white py-6">
        <div className="container mx-auto text-center grid grid-cols-1 md:grid-cols-3 gap-6 my-11 ">
          <div className='sm:text-start text-center'>
            {/* <p className='py-1'>
            <i className="fa fa-map-marker text-[23px]"></i> Location
            </p> */}
            <p className='py-1'>
              <i className="fa fa-envelope"></i> logger4647@gmail.com
            </p>
            <p className='py-1'>
              {/* <i className="fa fa-phone text-[20px]"></i> (123) 456-7890 */}
            </p>
          </div>
          {/* <div>
            <p className="text-lg">Follow Us</p>
            <div className="flex justify-center space-x-4">
              <a
                href="#"
                className="bg-[#063336] px-4 py-2 rounded-full hover:bg-[#EEC573] transition duration-300"
              >
                <i className="fa fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="bg-[#063336] py-2 px-[12px] rounded-full hover:bg-[#EEC573] transition duration-300"
              >
                <i className="fa fa-instagram"></i>
              </a>
            </div>
          </div> */}
          <div className='flex space-y-2 flex-col'>
            <button onClick={() => navigate("/terms-&-conditions")} className='text-[#C6ECCF]'>
              Terms & Condition
            </button>
            <button onClick={() => navigate("/privacy-&-policy")} className='text-[#C6ECCF]'>
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage