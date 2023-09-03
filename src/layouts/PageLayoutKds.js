import React from "react";
import Main from "./Mian";
import { useLocation } from "react-router-dom";
import { DrawerProvider } from "../context/Drawer";
import HeaderKds from "./HeaderKds";

export default function PageLayout({ children }) {
  const location = useLocation();

  return (
    <DrawerProvider>
      <HeaderKds />
      {/* <Sidebar /> */}
      <Main>
        <>
          {children}
          {/* {location.pathname !== "/message" ? <Footer /> : ""} */}
        </>
      </Main>
    </DrawerProvider>
  );
}
