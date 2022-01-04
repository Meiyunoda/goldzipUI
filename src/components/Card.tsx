import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

const Card = (props: BoxProps) => (
  <Box
    bg={useColorModeValue('white', 'gray.700')}
    m={4}
    py="8"
    px={{ base: '4', md: '10' }}
    shadow="base"
    rounded={{ sm: 'lg' }}
    {...props}
  />
)
export default Card;