import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import Step102Kyc from '../sections/redeem/Step102Kyc';
import Step3KYCAML from '../sections/supply/KYCAMLPage/Step3KYCAML';

const AMLPage = () => {

  return <Box>
    <Text>Supply</Text>
    <Step3KYCAML />

    <br />
    <br />
    <br />

    <Text>Redeem</Text>
    <Step102Kyc />
  </Box>
};

export default AMLPage;
