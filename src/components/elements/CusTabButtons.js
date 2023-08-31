import React from 'react'
import Text from './Text'
import Box from './Box'
export default function CusTabButtons({ buttonText, activeIndex, handleItemClick ,className}) {
  return (
    <Box className={`${className}`}>
         <Text
      className={`bold floor-bg mr-10  ${
        activeIndex === buttonText.index ? "active" : ""
      }`}
      as="span"
      onClick={() => handleItemClick(buttonText.index)}
      id={buttonText.id}
    >
      {buttonText.text}
    </Text>
    </Box>
  )
}
