import React, { useReducer } from "react";
import { useAuth } from "../../Authentication/AuthContext";

// Initial state for the login form
const initialState = {
  username: "",
  password: "",
};

// Reducer function to handle state updates
const reducer = (state, action) => {
  switch (action.type) {
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

const LoginPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {Login, errorStatus} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Login(state.username, state.password);
  };

  return (
    <div className="flex justify-center items-center w-full sm:pb-10 pb-28 h-screen bg-[#266E73] sm:bg-[#C6ECCF]">
      <div className="bg-[#266E73] text-[#FFFFFF] p-8 rounded-lg sm:shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-thin text-center mb-10">
          Login to{" "}
          <span className="nokora-regular font-semibold text-[#C6ECCF]">
            Logger
          </span>
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-lg font-medium mb-1"
            >
              Username
            </label>
            <input
              type="email"
              id="username"
              value={state.username}
              onChange={(e) =>
                dispatch({ type: "SET_USERNAME", payload: e.target.value })
              }
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFFF] text-black"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-lg font-medium mb-1"
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
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFFF] text-black"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#C6ECCF] text-[#266E73] font-bold py-2 rounded-md hover:bg-[#FFFFFF] hover:text-[#266E73] transition"
          >
            Login
          </button>
          {errorStatus && (
          <div className="w-full px-4 py-2 mt-1 text-white text-center bg-red-600 rounded-md focus:outline-none">
            {errorStatus}
          </div>
        )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
