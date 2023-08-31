import React from "react";
import { Box } from "../elements";
import { Text } from "../elements";
export default function ImageCards({ Imgsrc, alt, productTitle, crossOrigin }) {
  return (
    <Box className={"image-card-box "}>
      <img src={Imgsrc} alt={alt} />
      <Text className={"image-card-overlay-text f-13  "} as="span">
        {productTitle}
      </Text>
         
    </Box>
  );
}
