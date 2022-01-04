import { Box, Text, SimpleGrid } from '@chakra-ui/react';

const Disclaimers = () => {

  return <Box p={4} id={'disclaimers'} data-aos="fade-up">
    <Text variant={"gold-title"}>Disclaimers</Text>
    <SimpleGrid columns={{ base: 1, md: 2 }} p={4} spacing={4}>
      <Text>By lawyer that you must register with CGSE to have rights over the token holdings</Text>
      <Text>By lawyer that Hong Kong citizens are not allowed</Text>
    </SimpleGrid>
  </Box>
}

export default Disclaimers;