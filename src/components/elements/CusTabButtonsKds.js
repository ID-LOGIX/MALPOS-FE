import React from 'react'
import Text from './Text'
import Box from './Box'
export default function CusTabButtonsKds({ buttonText, activeIndex, handleItemClick ,className, change}) {
  return (
    <Box className={`${className}`}>
         <Text
  className={`bold floor-bg kds mr-10 ${
    activeIndex === buttonText.index ? "active" : ""
  }`}
  style={{
    marginRight: "0px",
    color: change ? "#c9e3f7" : "#403e57",
    backgroundColor: activeIndex === buttonText.index && change ? "#00000040" : activeIndex === buttonText.index && !change ? "#f07343" : "transparent"
  }}
  as="span"
  onClick={() => handleItemClick(buttonText.index)}
  id={buttonText.id}
>
  {buttonText.text}
</Text>

    </Box>
  )
}
