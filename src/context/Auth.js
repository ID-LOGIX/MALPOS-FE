import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/baseUrl";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Validate the token and get user info
      // Set isAuthenticated and user accordingly
      setIsAuthenticated(true);
      //   setUser({ name: "Your User" }); // The user data can come from the API or token
    }
  }, []);
  const login = async (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    try {
      const response = await axiosInstance.get("/getuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };
  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
