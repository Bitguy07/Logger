import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Logo from '../../assets/Logo.png';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { decryptOwnerData } from '../../utils/encryption';
import { useAuth } from '../../Authentication/AuthContext';
import { encryptOwnerData } from '../../utils/encryption.js';
import { finalPaymentStep } from '../../middelware/finalPaymentStep.js';

function setCookie(name, value) {
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 5); // 5-year expiry

  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expirationDate.toUTCString()}; SameSite=Lax`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    let [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

const OwnersWebPage = () => {
  const [userData, setUserData] = useState({ name: "", phone: "" });
  const [showVerify, setShowVerify] = useState(false);
  const [otpPannel, setOtpPannel] = useState(false);  // OTP pannel state
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [timer, setTimer] = useState(150); // 2 minutes 30 seconds
  const [priceData, setPriceData] = useState({ showPriceBtn: false, amount: 0, userData: null });
  const inputRefs = useRef([]);
  const otpPannelRef = useRef(null);
  const [otpMatched, setOtpMatched] = useState(null); // OTP match state
  const { origin } = useAuth();
  const navigate = useNavigate();

  const { encrypted } = useParams(); // This grabs the string after /owners-webpage/

  // Memoize ownerData so decryption is only re-run when the decodedLink changes
  const ownerData = useMemo(() => decryptOwnerData(encrypted), [encrypted]);
  const safeEncrypted = encodeURIComponent(encrypted);
  console.log(ownerData);

  // Initialize Plan state from session storage if available.
const [Plan, setPlan]     = useState(null);
const [loading, setLoading] = useState(true);

// New: Memoized MealSchedules derived from Plan.subscriptionPlans.
  // If today's date lies within the Ramadan period (inclusive), show type_id: 2 plans.
  // Otherwise, show type_id: 1 plans.
  const MealSchedules = useMemo(() => {
    if (Plan && Plan.subscriptionPlans && Plan.ramadanInfo) {
      // Helper function to parse date string in "DD-MM-YYYY" format.
      const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('-');
        return new Date(`${year}-${month}-${day}`);
      };

      const today = new Date();
      // Get only the date part (set time to midnight)
      const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      const ramadanStart = parseDate(Plan.ramadanInfo.ramadanStart);
      const ramadanEnd = parseDate(Plan.ramadanInfo.ramadanEnd);

      if (todayDate >= ramadanStart && todayDate <= ramadanEnd) {
        return Plan.subscriptionPlans.filter(plan => plan.type_id === 2);
      } else {
        return Plan.subscriptionPlans.filter(plan => plan.type_id === 1);
      }
    }
    return [];
  }, [Plan]);

  // Duration dropdown states
  const [days, setDays] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const dropdownRef = useRef(null);

  // Meal schedule dropdown states
  const [schedule, setSchedule] = useState('');
  const [normalDropdownOpen, setNormalDropdownOpen] = useState(false);
  const [dropdownDirection, setDropdownDirection] = useState('down');
  const normalDropdownRef = useRef(null);

  // Memoized booleans for label float logic
  const mainLabelFloats = useMemo(() => isOpen || days !== '', [isOpen, days]);
  const labelFloats = useMemo(() => normalDropdownOpen || schedule !== '', [normalDropdownOpen, schedule]);

  //load the subscription menu plan in session storage on page load
useEffect(() => {
  if (!encrypted) return;
  (async () => {
    try {
      const { data } = await axios.get(
        `${origin}/owners-webpage/${safeEncrypted}`
      );
      setPlan(data);
      sessionStorage.setItem('Plan', JSON.stringify(data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  })();
}, [encrypted]);

  useEffect(() => {
    if (days !== '' && schedule !== '') {
      // Retrieve the encrypted user data from cookies
      const encryptedUserData = getCookie("encryptedUserData");
      console.log("Encrypted User :_) Data:", encryptedUserData);
      if (decryptOwnerData(encryptedUserData)) {
        // Ensure the user data is URL-safe
        const safeUserEncryptedData = encodeURIComponent(encryptedUserData);
        
        // Construct the new URL using the current safeEncoded (from useParams) 
        // and the additional safeUserEncryptedData
        const newPath = `/owners-webpage/${safeEncrypted}/${safeUserEncryptedData}`;

        navigate(newPath);
        const sentData = [days, schedule];
        // Optionally, if the cookie is successfully decoded, make your API request:
        axios.post(`${origin}${newPath}`,sentData)
             .then(response => { 
                                  console.log(`the calculated output is this: ${response.data.price}`);
                                  console.log("this is the user data", response.data.userData);
                                  setPriceData(({
                                    showPriceBtn: true,
                                    amount: response.data.price,
                                    userData: response.data.userData
                                  }));
                                })
                                     
             .catch(error => { /* handle error */ });
      }
    }
  }, [days, schedule, safeEncrypted]);

  // ------------------------------
  //  DROPDOWN & INPUT HANDLERS
  // ------------------------------

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelectPredefined = useCallback((value) => {
    setDays(value);
    setIsOpen(false);
  }, []);

  const handleCustomInputChange = useCallback((e) => {
    const onlyNumbers = e.target.value.replace(/\D/g, '');
    setCustomValue(onlyNumbers);
  }, []);

  const handleConfirmCustomValue = useCallback(() => {
    if (!customValue) return;
    const numericValue = parseInt(customValue, 10);
    if (numericValue < 3) {
      alert('The input days should be greater than 3.');
      return;
    }
    if (numericValue > 90) {
      alert('The input days should be less than or equal to 90.');
      return;
    }
    setDays(`${customValue} Days`);
    setIsOpen(false);
  }, [customValue]);

  const handleCalendarClick = useCallback(() => {
    setShowCalendar((prev) => !prev);
  }, []);

  // Wrap getLocalDateStr in useCallback as it does not change over time
  const getLocalDateStr = useCallback(() => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now - offset).toISOString().split('T')[0];
  }, []);

  const handleDateInputChange = useCallback((e) => {
    const selectedDate = e.target.value; // format: YYYY-MM-DD
    if (!selectedDate) return;
    const todayStr = getLocalDateStr();
    const todayDate = new Date(todayStr);
    const selectedDateObj = new Date(selectedDate);

    if (selectedDateObj < todayDate) {
      alert('You cannot select a past date.');
      return;
    }
    // Calculate the inclusive day difference: (end - start) + 1
    const msDiff = selectedDateObj - todayDate;
    const days = Math.ceil(msDiff / (1000 * 60 * 60 * 24)) + 1;
    setCustomValue(String(days));
    setShowCalendar(false);
  }, [getLocalDateStr]);

  // ------------------------------
  //  OUTSIDE CLICK EFFECTS
  // ------------------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (normalDropdownRef.current && !normalDropdownRef.current.contains(event.target)) {
        setNormalDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ------------------------------
  //  NORMAL DROPDOWN LOGIC
  // ------------------------------
  const toggleNormalDropdown = useCallback(() => {
    setNormalDropdownOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback((option) => {
    setSchedule(option);
    setNormalDropdownOpen(false);
  }, []);

  useEffect(() => {
    if (normalDropdownOpen && normalDropdownRef.current) {
      const rect = normalDropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      if (spaceBelow < 150) {
        setDropdownDirection('up');
      } else {
        setDropdownDirection('down');
      }
    }
  }, [normalDropdownOpen]);

  // ------------------------------
  //  OTP LOGIC
  // ------------------------------
  useEffect(() => {
    if (otpPannelRef.current !== null) {
      const countdown = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(countdown);
    }
    otpPannelRef.current = otpPannel;
  }, [otpPannel]);

  const handleChange = useCallback((e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  }, [otp]);

  const handleKeyDown = useCallback((e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }, [otp]);

  const handleResend = useCallback(() => {
    setOtp(new Array(5).fill(""));
    setTimer(150);
  }, []);

  const verifyOtp = useCallback(() => {
    const otpValue = otp.join("");
    if (otpValue === "12345") {
      alert("OTP Matched ✅");
      setOtpPannel(false);
      setOtpMatched(true);

      const encryptUserdata = encryptOwnerData({
        userName: userData.name,
        userPhone: userData.phone,
      });

      setCookie("otpMatched", true);
      setCookie("encryptedUserData", encryptUserdata);
      // setCookie("userName", userData.name); // Replace with dynamic name
      // setCookie("mobileNumber", userData.phone); // Replace with dynamic number

    } else if (otpValue === "") {
      alert("Please enter OTP !");
    } else {
      alert("Invalid OTP ❌");
    }
  }, [otp]);

  // Load OTP state from cookies on page load
  useEffect(() => {
    const userEncryptedData = getCookie("encryptedUserData")
    if(decryptOwnerData(userEncryptedData)){
    const otpState = getCookie("otpMatched") === "true";
    setOtpMatched(otpState); // Set OTP state in React state
    } else {
      setCookie("otpMatched", false);
    }
  }, []);

  const formattedTime = useMemo(() => {
    return `${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(timer % 60).padStart(2, "0")}`;
  }, [timer]);

  // ------------------------------
  //  FORM VALIDATION HANDLERS
  // ------------------------------
  const handleNameChange = useCallback((event) => {
    setUserData((prev) => ({
      ...prev,
      name: event.target.value.replace(/[^A-Za-z\s]/g, ''),
    }));
  }, []);

  const handlePhoneChange = useCallback((event) => {
    const value = event.target.value.replace(/\D/g, '');
    if (/^\d{0,10}$/.test(value)) {
      setUserData((prev) => ({
        ...prev,
        phone: value,
      }));
      setShowVerify(value.length === 10);
    }
  }, []);

  const handleVerify = useCallback(() => {
    if (!/^[6-9]\d{9}$/.test(userData.phone)) {
      alert("Invalid phone number! Please enter a valid 10-digit Indian number.");
    } else {
      setOtpPannel(true);
      setShowVerify(false);
    }
  }, [userData.phone]);

  // Today's date string for the date input min attribute
  // const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // If there is no encrypted parameter, render nothing.
  if (!encrypted) {
    return null;
  }

  // If decryption fails (or if no valid owner data is available), render an appropriate message.
  if (!ownerData) {
    return <div>Invalid owner data.</div>;
  }

  if (loading) return <h1>Loading…</h1>;

  return (
    <div className='h-full w-full flex flex-col relative sm:max-w-3xl bg-[#eceac6]'>
      <div className='w-full mt-28 flex items-center justify-center'>
        <div className="bg-gradient-to-t flex items-center justify-center sm:w-[25%] w-[40%] h-auto from-[#e7d4ae] to-[#2c959c] rounded-full shadow-2xl">
          <img
            src={Logo}
            alt="Logger App Logo"
            className="rounded-full h-full w-full p-5"
          />
        </div>
      </div>
      { !otpMatched ? (
        <div>
          {/* Form Section */}
          <form onSubmit={(e) => e.preventDefault()} autoComplete='on' className="flex flex-col gap-10 mt-20 mx-10">
            {["text", "tel"].map((type, index) => (
              <div key={index} className="relative">
                <input
                  type={type}
                  id={type === "text" ? "name" : "phone"}
                  required
                  className="peer my-custom-input w-full border bg-[#eceac6] border-[#266E73] rounded-md p-2 pl-3 focus:outline-none focus:ring-2 focus:ring-[#266E73]"
                  onFocus={(e) => e.target.nextSibling.classList.add("focus-label")}
                  onBlur={(e) => {
                    if (e.target.value === "") {
                      e.target.nextSibling.classList.remove("focus-label");
                    }
                  }}
                  onChange={type === "text" ? handleNameChange : handlePhoneChange}
                  {...(type === "text"
                    ? { value: userData.name }
                    : { value: userData.phone, inputMode: "numeric", pattern: "[0-9]*" })}
                />
                <label
                  htmlFor={type === "text" ? "name" : "phone"}
                  className="absolute left-3 font-light top-2 text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 bg-[#eceac6] px-1"
                >
                  {type === "text" ? "Name" : "Phone Number"}
                </label>
              </div>
            ))}
            {/* Verify Button */}
            {showVerify && (
              <button 
                className="bg-[#266E73] text-white py-2 rounded-md hover:bg-[#368086] transition" 
                onClick={handleVerify}
              >
                Verify Phone Number
              </button>
            )}
          </form>

          {/* OTP Panel */}
          {otpPannel && (
            <div className='absolute flex flex-col items-center justify-center bg-slate-600 bg-opacity-35 text-white h-full w-full top-0 left-0'>
              <div className="bg-white shadow-lg rounded-lg p-6 text-center w-full max-w-md">
                <h2 className="text-2xl mt-10 font-bold text-gray-800">OTP Verification</h2>
                <p className="text-gray-600 mt-2">
                  Enter the code from the SMS we sent to <span className="font-semibold text-[#EEC573]">+91{userData.phone}</span>
                </p>

                {/* Timer */}
                <p className="text-red-500 font-semibold text-lg mt-4">{formattedTime}</p>

                {/* OTP Inputs */}
                <div className="flex justify-center gap-2 mt-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="tel"
                      value={digit}
                      maxLength={1}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 text-[#266E73] h-12 text-center text-xl border border-[#EEC573] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EEC573] transition"
                    />
                  ))}
                </div>

                {/* Resend OTP Link */}
                <p className="mt-4 text-sm text-black">
                  Don't receive the OTP?{" "}
                  <button onClick={handleResend} className="text-[#EEC573] font-semibold hover:underline">
                    RESEND
                  </button>
                </p>

                {/* Submit Button */}
                <button onClick={verifyOtp} className="mt-6 w-full bg-[#266E73] text-white py-2 rounded-md text-lg font-semibold hover:bg-[#1b4d52] transition">
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        // OTP Matched Screen
        <div className="flex w-full flex-col items-center">
          <div className='w-full space-y-10 mt-20'> 
            {/* Container for the entire "outlined" dropdown */}
            <div className="relative mx-10" ref={dropdownRef}>

              {/* Button that shows the selected value */}
              <button
                type="button"
                onClick={toggleDropdown}
                className={`
                  w-full py-3 px-3 rounded-md text-left
                  transition-colors duration-200
                  ${isOpen 
                    ? 'border-[#266E73] border-2' 
                    : 'border-[#266E73] border'} 
                  focus:outline-none
                `}
              >
              {/* Main floating label */}
              <label
                className={`
                  absolute left-3 px-1 bg-[#eceac6]
                  transition-all duration-200 
                  ${mainLabelFloats 
                    ? '-top-[10px] text-sm text-[#266E73]' 
                    : 'top-3 text-gray-500'}           
                `}
              >
                Select Duration
              </label>

                {days === '' && !isOpen ? '' : days}
                <span className="float-right">
                  <svg
                    className={`w-4 h-4 ml-2 inline-block transform transition-transform 
                                ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {/* Dropdown menu */}
              {isOpen && (
                <div className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <button
                    onClick={() => handleSelectPredefined('30 Days')}
                    className="w-full text-left px-3 py-2 hover:bg-[#eceac6] border-b border-gray-300"
                  >
                    30 Days
                  </button>
                  <button
                    onClick={() => handleSelectPredefined('15 Days')}
                    className="w-full text-left px-3 py-2 hover:bg-[#eceac6] border-b border-gray-300"
                  >
                    15 Days
                  </button>
                  {/* Custom Option */}
                  <div className="px-3 py-2">
                    <div className="relative">
                      {customValue !== '' && (
                        <span
                          onClick={handleConfirmCustomValue}
                          className="
                            absolute -top-7 shadow-md shadow-black left-2 bg-white text-sm px-2 py-2 text-[#266E73] 
                            border border-[#266E73] rounded-md cursor-pointer
                            transition-all duration-200
                          "
                        >
                          {customValue} Days
                        </span>
                      )}
                      <input
                        type="number"
                        placeholder="Custom Days"
                        className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none"
                        value={customValue}
                        onChange={handleCustomInputChange}
                      />
                      <button
                        type="button"
                        onClick={handleCalendarClick}
                        className="absolute right-0 top-0 h-full px-3 bg-[#2c959c] text-white 
                                  rounded-r-md hover:opacity-90 flex items-center justify-center"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 
                              0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                    {showCalendar && (
                      <div className="mt-2">
                        <input
                          type="date"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          min={getLocalDateStr()}
                          onChange={handleDateInputChange}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="relative mx-10" ref={normalDropdownRef}>

              <button
                type="button"
                onClick={toggleNormalDropdown}
                className={`
                  w-full py-3 px-3 border rounded-md text-left transition-colors duration-200
                  ${normalDropdownOpen ? 'border-[#266E73] border-2' : 'border-[#266E73]'} focus:outline-none
                `}
              >
                              <label
                className={`
                  absolute left-3 px-1 bg-[#eceac6] transition-all duration-200 
                  ${labelFloats ? '-top-2 text-sm text-[#266E73]' : 'top-3 text-gray-500'}
                `}
              >
                Select Meal Schedule
              </label>
              
                {schedule === '' && !normalDropdownOpen ? '' : schedule}
                <span className="float-right">
                  <svg
                    className={`w-4 h-4 ml-2 inline-block transform transition-transform ${normalDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {normalDropdownOpen && (
                <div
                  className={`absolute left-0 w-full z-10 bg-white border border-gray-300 rounded-md shadow-lg ${
                    dropdownDirection === 'down' ? 'top-full mt-1' : 'bottom-full mb-1'
                  }`}
                >
                  {MealSchedules.map((plan, index) => (
                    <button
                      key={plan.id}
                      onClick={() => handleSelect(plan.time_slot)}
                      className={`w-full text-left px-3 py-2 hover:bg-[#eceac6] ${
                        index !== MealSchedules.length - 1 ? 'border-b border-gray-300' : ''
                      }`}
                    >
                      {plan?.time_slot}
                    </button>
                  ))}
                </div>
              )}
              {priceData.showPriceBtn && (
                <button
                  onClick={() => {finalPaymentStep(priceData.amount, priceData.userData.userName, priceData.userData.userPhone)}}
                  disabled={priceData.amount === 0}
                  className={`
                    mt-6 w-full rounded-md text-lg font-semibold transition
                    ${priceData.amount === 0
                      ? "bg-gray-400 py-3 text-gray-200 cursor-not-allowed"
                      : "bg-[#226267] py-3 text-white hover:bg-[#225b60]"}
                  `}
                >
                  {priceData.amount === 0 ? (
                    <ion-icon
                      name="reload-outline"
                    ></ion-icon>
                  ) : (
                    `₹ ${priceData.amount.toFixed(2)}`
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnersWebPage;
