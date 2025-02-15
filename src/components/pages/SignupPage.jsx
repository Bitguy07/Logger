import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Authentication/AuthContext"; // Import from new file

const initialState = {
  name: "",
  username: "",
  password: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const SignupPage = () => {
  const { Signup, errorStatus } = useAuth(); // Fetching the function from context;

  const [state, dispatch] = useReducer(reducer, initialState);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const doSignup = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("You must accept the Terms & Conditions and Privacy Policy.");
      return;
    }
    await Signup(state.name, state.username, state.password);  // Calling the function
  };


  return (
    <div className="flex justify-center items-center sm:pb-10 pb-28 h-screen w-full bg-[#266E73] sm:bg-[#C6ECCF]">
      <form
        onSubmit={doSignup}
        className=" px-6  py-3 shadow-md mt-24 sm:m-0 bg-white p-8 rounded-lg sm:shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl text-[#125a4c] font-thin text-center mb-10">
          Signup to{" "}
          <span className="nokora-regular font-semibold text-[#266E73]">
            Logger
          </span>
        </h1>
        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: "SET_NAME", payload: e.target.value })
            }
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Username Field */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="username"
            value={state.username}
            onChange={(e) =>
              dispatch({ type: "SET_USERNAME", payload: e.target.value })
            }
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "SET_PASSWORD", payload: e.target.value })
            }
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Terms and Conditions */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">
              I agree to the{" "}
              <Link to="/terms-&-conditions" className="text-blue-600 underline">
                Terms & Conditions
              </Link>
              {" "}
              and{" "}
              <Link to="/privacy-&-policy" className="text-blue-600 underline">
                Privacy Policy
              </Link>

              .
            </span>
          </label>
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-[#266E73] rounded-md hover:bg-[#2f868c] focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Signup
        </button>

        {errorStatus && (
          <div className="w-full px-4 py-2 mt-1 text-white text-center bg-red-600 rounded-md focus:outline-none">
            {errorStatus}
          </div>
        )}
      </form>
    </div>
  );
};

export default SignupPage;
