import { Text, Box, VStack, HStack, Button } from '@chakra-ui/react';
import Image from 'next/image';
import Link from '../../components/Link';

const WelcomeHeroBanner = () => {
  const BoxContent = () => <>
    <Text>Welcome to</Text>
    <img src="/goldzip-logo.svg" alt={'logo'} />
    <Text fontSize={14}>
      The GoldZIP is inspired by 110-year-old Chinese Gold & Silver Exchange, the sole precious metal exchange recognized by Hong Kong government. GoldZIP is smartly digitalized by advance enterprise blockchain technologies.
    </Text>
    <HStack>
      <Button backgroundColor={'gold'} color={'black'} as={Link} href={'/#how-it-works'}>
        How it works
      </Button>
      <Button variant={"outline"} as={Link} href={'/#about-us'}>
        Why us
      </Button>
    </HStack>
  </>;

  return <Box position={'relative'}>
    <VStack display={{ base: 'block', md: 'none' }} p={4}>
      {BoxContent()}
    </VStack>

    <VStack position={'absolute'} top={'20px'} width={'400px'} right={'20px'} display={{ base: 'none', md: 'block' }} zIndex={2}>
      {BoxContent()}
    </VStack>

    <Box zIndex={1}>
      <Image src="/sections/welcome-img.svg" width={1021} height={479} />
    </Box>
  </Box>

}

export default WelcomeHeroBanner;