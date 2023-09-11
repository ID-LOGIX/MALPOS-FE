import React, { useContext } from "react";
import { DrawerContext } from "../context/Drawer";
import Box from "../components/elements/Box";

export default function MainKDS({ children }) {
    const { drawer } = useContext(DrawerContext);
    return <Box as="main" className={`.mc-main-kds ${ drawer ? "active" : "" }`}>{ children }</Box>
}