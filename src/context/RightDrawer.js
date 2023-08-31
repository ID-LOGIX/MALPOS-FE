import { createContext, useState } from "react";

export const DrawerContext = createContext();

export const RightDrawerProvider = ({ children }) => {
  const mediaQuery = window.matchMedia("(max-width: 991px)");
  const [drawer, setDrawer] = useState(mediaQuery.matches ? false : true);
  const [fromRight, setFromRight] = useState(false); // New state
  const toggleDrawer = () => {
    setDrawer(!drawer);
    console.log(drawer);
  };
  const toggleFromRight = () => setFromRight(!fromRight); // New function

  return (
    <DrawerContext.Provider
      value={{ drawer, toggleDrawer, fromRight, toggleFromRight }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
