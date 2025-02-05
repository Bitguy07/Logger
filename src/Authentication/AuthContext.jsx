import { createContext, useContext } from "react";

// Create Auth Context
export const AuthContext = createContext(null);

// Custom Hook to use the Auth Context
export const useAuth = () => useContext(AuthContext);
