import React from 'react';
import Box from './Box';
import Text from './Text';

export default function DotBox({ linkTexts }) {
  return (
    <Box className={'dotbox-wrapper'}>
      {linkTexts.map((linkText, index) => (
        <Box className={'dot-box'} key={index}>
          <Box className={'dot-box-item'}>
            <Text as={'span'} className={'f-13'}>
              {linkText}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
