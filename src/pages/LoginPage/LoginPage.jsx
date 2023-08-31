import React, { useState, useContext } from "react";
import Cookies from "js-cookie";

import { Box, Button, FormGeneric } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import data from "../../data/loginData.json";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/baseUrl";
import { AuthContext } from "../../context/Auth";

import "./LoginPage.css";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const { login } = useContext(AuthContext); // Use the login function from the context
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/user_login", formData);

      console.log(response);

      if (response.data.token) {
        await login(response.data.token); // Call the login function with the received token
        navigate("/brand-name");
        Cookies.set("userData", response.data.token);
      }
    } catch (error) {
      toast.error("Wrong Email or Password", {
        autoClose: true,
        closeButton: true,
      });
    }
  };

  return (
    <Box className="mc-auth text-center p-4">
      <Box className="mc-auth-group shadow mt-2" style={{ borderRadius: 20 }}>
        <img src={"images/logo-malpos.png"} className="img-fluid" alt="logo" />
        <form onSubmit={handleLogin} className="p-4">
          {data?.input.map((item, index) => (
            <IconField
              key={index}
              icon={item.icon}
              type={item.type}
              name={item.name}
              option={item.option}
              classes={item.fieldSize}
              placeholder={item.placeholder}
              passwordVisible={item.passwordVisible}
              value={formData[item.name] || ""}
              onChange={handleInputChange}
            />
          ))}
          <Button
            className={`mc-auth-btn ${data?.button.fieldSize}`}
            type={data?.button.type}
            submit
          >
            {data?.button.text}
          </Button>
        </form>
      </Box>
    </Box>
  );
}
