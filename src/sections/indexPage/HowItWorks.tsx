import { Box, Text, SimpleGrid } from '@chakra-ui/react';

const HowItWorks = () => {
  return <Box p={4} id={'how-it-works'} data-aos="fade-up">
    <Text variant={'gold-title'}>How it works?</Text>
    <SimpleGrid columns={{ base: 1, md: 2 }} alignItems={"center"} justifyItems={"center"}>
      <Text variant={'bold'} p={4}>
        Going digital is the future of gold investment
      </Text>
      <img src="/sections/how-it-works-img.svg" />
    </SimpleGrid>
  </Box>
}

export default HowItWorks;