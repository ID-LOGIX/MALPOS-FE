import React from 'react'
import Text from './Text'
import Box from './Box'
export default function CusTabButtonsKds({ buttonText, activeIndex, handleItemClick ,className}) {
  return (
    <Box className={`${className}`}>
         <Text
      className={`bold floor-bg kds mr-10  ${
        activeIndex === buttonText.index ? "active" : ""
      }`} style={{marginRight:"0px"}}
      as="span"
      onClick={() => handleItemClick(buttonText.index)}
      id={buttonText.id}
    >
      {buttonText.text}
    </Text>
    </Box>
  )
}
