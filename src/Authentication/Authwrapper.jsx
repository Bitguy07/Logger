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
const Authwrapper = () => {
    const navigate = useNavigate();
    const [signupData, setSignupData] = useState(null);
    const [loginData, setLoginData] = useState(null);
    const [errorStatus, setErrorStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    

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
            setUser({name: response.data.name, username: response.data.username, isAuthenticated: response.data.isAuthenticated})
            navigate('/customer-page');
            setErrorStatus(null);
          } else {
            setErrorStatus(response.data.Error);
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
            setUser({name: response.data.name, isAuthenticated: response.data.isAuthenticated});
          }else if(response.data.Error === 'Token Expired') {
            console.log('Please login again, Your session has expired. Hurry up !');
            setUser({name:'', isAuthenticated: false});
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

    const HandleLogout =  async () => {
      try {
        const response = await axios.post(`${origin}/logout`);

        if(response.data.Status === 'Logged out'){

          //Clear any client-side state related to the user
          setUser({name: '', isAuthenticated: response.data.isAuthenticated});

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

    const qrCodeImage = qrCode(user); //Because it will returen a promise so we need to store it in a variable
    const AuthDAta = {
        qCodeImage: qrCodeImage
    }

    return (
      <AuthContext.Provider value={{user, AuthDAta, errorStatus, logout: HandleLogout, Signup: handleSignup, Login: handleLogin, isClicked, MenuPannel, BlurDiv, loading}}>
        <RenderRoutes />
      </AuthContext.Provider>  
    );
};

export default Authwrapper;
