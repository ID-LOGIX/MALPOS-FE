import React from "react";
import Box from "../elements/Box";

export default function CardLayout({ className, children, style }) {
  return (
    <Box className={`mc-card ${className ? className : ""}`} style={style}>
      {" "}
      {children}
    </Box>
  );
}
