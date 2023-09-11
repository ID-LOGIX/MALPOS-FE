import React from "react";
import { useLocation } from "react-router-dom";
import { DrawerProvider } from "../context/Drawer";
import HeaderKds from "./HeaderKds";
import MainKDS from "./MainKDS";

export default function PageLayout({ children }) {
  const location = useLocation();

  return (
    <DrawerProvider>
      {/* <HeaderKds /> */}
      {/* <Sidebar /> */}
      
      <MainKDS>
        <>
          {children}
          {/* {location.pathname !== "/message" ? <Footer /> : ""} */}
        </>
      </MainKDS>
    </DrawerProvider>
  );
}
