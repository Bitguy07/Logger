import {useEffect, useState } from 'react';
import RenderRoutes from '../components/structure/RenderRoutes';
import { AuthContext } from "./AuthContext"; 
import { useNavigate } from 'react-router-dom';
import qrCode from '../QR_Tasks/qrCode';
import axios from 'axios';

axios.defaults.withCredentials = true;
const origin =  window.location.hostname === "localhost"
                ? import.meta.env.VITE_API_LOCAL
                : import.meta.env.VITE_API_PROD;

// A helper function to transform the flat response data into the nested structure.
    const transformResponseData = (data) => {
        return data.reduce((acc, curr) => {
        // Determine the key and title based on type_id
        const planKey = curr.type_id === 1 ? 'regular' : 'special';
        const titleKey = curr.type_id === 1 ? '1 Month Regular Plan' : 'Ramadan special plan';
    
        // Look for an existing plan with this title
        let plan = acc.find(item => item.title === titleKey);
        if (!plan) {
            plan = { title: titleKey };
            plan[planKey] = [];
            acc.push(plan);
        } else if (!plan[planKey]) {
            // If the plan exists but the key doesn't, initialize it.
            plan[planKey] = [];
        }
    
        // Push the transformed object into the correct key
        plan[planKey].push({
            time: curr.time_slot,
            price: parseFloat(curr.price) // Convert string to a number
        });
    
        return acc;
        }, []);
    };


const Authwrapper = () => {
    const navigate = useNavigate();
    const [signupData, setSignupData] = useState(null);
    const [loginData, setLoginData] = useState(null);
    const [errorStatus, setErrorStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const [menuPlanData, setMenuPlanData] = useState(JSON.parse(localStorage.getItem('menuPlanData')));
    const [updateMenuPlan, setUpdateMenuPlan] = useState(null);
    

    //To Show and Hide the Menu Panel for logout and other options
    const [isClicked, setIsClicked] = useState(false);
    const MenuPannel = () => setIsClicked((prev) => !prev);
    const BlurDiv = () => setIsClicked(false);

    // Handle Signup api calls
    useEffect(() => {
      if(!signupData) return; //Prevent api call if no data present

      const perfomSignup = async () => {
        setLoading(true);
        try {

          const response = await axios.post(`${origin}/signup-page`, signupData);
          setLoading(false);
          if (response.data.Status === 'Success') {
              navigate('/login-page');
              setErrorStatus(null);
          } else {

            setErrorStatus(response.data.Error)
            navigate('/login-page')
            // throw new Error(response.data.Error || 'Signup Failed');
          }
        } catch (error) {
          setLoading(false);
          setErrorStatus(error.Error || 'Network Error !');
          navigate('/login-page');
        }
      };

      perfomSignup();

    }, [signupData])

    //Handle Login api calls
    useEffect(() => {
      if(!loginData) return; //Prevent api call if no data present
      const performLogin = async () => {
        setLoading(true);
        try{
          const response= await axios.post(`${origin}/login-page`, loginData);
          setLoading(false);
          if(response.data.Status === 'Success') {
            setUser({
              id : response.data.id,
              name: response.data.name, 
              username: response.data.username, 
              isAuthenticated: response.data.isAuthenticated
            })
            if ( response?.data?.menuPlanData === null || response?.data?.menuPlanData.some(plan => plan?.price === null || plan?.price === "0.00"))
            {   
                const transformedSubscription = transformResponseData(response?.data?.menuPlanData);
                setMenuPlanData(transformedSubscription);
                localStorage.setItem(
                  'menuPlanData',
                  JSON.stringify(transformedSubscription)
                );
                navigate('/menu-setting-pannel');

            } else {
              const transformedSubscription = transformResponseData(response?.data?.menuPlanData);
              setMenuPlanData(transformedSubscription);
              // Menu plan is not set. Save data in local storage 
              localStorage.setItem(
                'menuPlanData',
                JSON.stringify(transformedSubscription)
              );
              // Navigate to a page where the owner can set the menu plan (e.g., /set-menu-plan)
              navigate('/customer-page');
            }

            setErrorStatus(null);
          } else {
            setErrorStatus(response.data?.Error);
          }
        } catch (error) {
          setLoading(false);
          setErrorStatus(error.Error || 'Network Error !')
        }
      }

      performLogin ();
    }, [loginData]);

    //Verify that the user is authenticated with the help of cookies
    useEffect(() => {
      const verifyAuthToken = async () => {
        try {
          const response = await axios.get(`${origin}/`);
          if(response.data.Status === 'Success'){
            setUser(prev => ({
              ...prev, // Preserve previous state
              id: response.data.id,
              name: response.data.name,
              username: response.data.username,
              isAuthenticated: response.data.isAuthenticated,
          }));
          }else if(response.data.Error === 'Token Expired') {
            console.log('Please login again, Your session has expired. Hurry up !');
            setUser(pre => ({
              ...pre, 
              name:'', 
              isAuthenticated: false
            }));
            // navigate('/');
          }else {
            return;
          }
        }catch (error) {
          console.log("Error during verification:", error);
        }
      }

      verifyAuthToken ();
    }, []);

    useEffect(() => {
      if(!updateMenuPlan) return;
      // console.log(updateMenuPlan);
      const UpdateMenuPrice = async () => {
        try {
          const response = await axios.post(`${origin}/menu-setting-pannel`, updateMenuPlan);
          if(response.data.Status === 'Price Updated SuccessFully'){
            const transformedSubscription = transformResponseData(response.data.subscription_plans);
            setMenuPlanData(transformedSubscription);
            localStorage.setItem('menuPlanData',JSON.stringify(transformedSubscription));
            console.log('Price for diffenet menus are updated successfully.')
          } else {
            console.error("No subscription plans returned in the response.");
          }
        }
        catch(err) {
          console.error("Error updating menu plan prices:", err);
          // alert('Something went wrong Please Login again.');
        }
      }

      UpdateMenuPrice();
    }, [updateMenuPlan])

    const HandleLogout =  async () => {
      try {
        const response = await axios.post(`${origin}/logout`);

        if(response.data.Status === 'Logged out'){

          //Clear any client-side state related to the user
          setUser(prev => ({ 
            ...prev, 
            name: '', 
            isAuthenticated: response.data.isAuthenticated 
          }));

          //Redirect to the home page
          navigate('/');
        }
      }catch(error) {
        console.log('Error during Logout', error);
      }
    }

    const handleSignup = (name, username, password) => {
        setSignupData({ name, username, password });
    };

    const handleLogin = (username, password) => {
      setLoginData({username, password});
    }

    const HandleUpdateMenuPlanData = (priceData, owners_id, username) => {
      setUpdateMenuPlan({priceData, owners_id, username }); // Merge owners_id into priceData
    };

    const qrCodeImage = qrCode(user); //Because it will returen a promise so we need to store it in a variable
    const AuthDAta = {
        qCodeImage: qrCodeImage
    }

    return (  
      <AuthContext.Provider value={{origin, menuPlanData, user, AuthDAta, errorStatus, PriceUpdate: HandleUpdateMenuPlanData, logout: HandleLogout, Signup: handleSignup, Login: handleLogin, isClicked, MenuPannel, BlurDiv, loading}}>
        <RenderRoutes />
      </AuthContext.Provider>  
    );
};

export default Authwrapper;
