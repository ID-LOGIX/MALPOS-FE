import React from 'react'
import { Box, Text } from '../../components/elements'

export default function EmptyDivMh() {
  return (
    <div>
        <Box className={'oldNot-min-w'}>
            <Text as={'span'}className={'f-13 bold'} > Not found</Text>
        </Box>
    </div>
  )
}
