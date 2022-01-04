import { Box, Text, SimpleGrid } from '@chakra-ui/react'

const Roadmap = () => {
  return <Box p={4} id={'roadmap'} data-aos="fade-up">
    <Text variant={'gold-title'}>Roadmap</Text>
    <Text>The Roadmap demonstrates how GoldZIP is going to revolutionize the industry</Text>

    <SimpleGrid columns={{ base: 1, md: 2 }} alignItems={"center"} justifyItems={"center"}>
      <img src="/sections/roadmap-img-0.svg" />
      <img src="/sections/roadmap-img-1.svg" />
    </SimpleGrid>
  </Box>
}

export default Roadmap;