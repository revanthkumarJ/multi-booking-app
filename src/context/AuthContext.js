import React, { createContext, useContext, useState } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the application
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [mode,setMode]=useState("light");

  // Function to log in
  const login = (user) => {
   
    localStorage.setItem('user', JSON.stringify(user));
    setIsLoggedIn(true);
  };

  // Function to log out
  const logout = () => {
    localStorage.removeItem('user');
    
    setIsLoggedIn(false);
  };

  // function to change mode
  const toggle=()=>{
    if(mode==="light")
    {
        setMode("dark");
    }
    else
    {
        setMode("light")
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout,toggle,mode }}>
      {children}
    </AuthContext.Provider>
  );
}
