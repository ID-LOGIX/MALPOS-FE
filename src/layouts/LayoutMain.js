import React from "react";
import Main from "./Mian";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { DrawerProvider } from "../context/Drawer";
import BackSidebar from "./BackSidebar";

export default function LayoutMain({ children }) {
  const location = useLocation();

  return (
    <DrawerProvider>
      {/* <BackSidebar /> */}
      <Header />
      <Main>
        <>
          {children}
          {/* {location.pathname !== "/message" ? <Footer /> : ""} */}
        </>
      </Main>
    </DrawerProvider>
  );
}
