import { Box } from '@chakra-ui/react';
import React from 'react';
import Step1AssayMarkDate from '../sections/supply/assayPage/Step1AssayMarkDate';
import Step7GoldInspection from '../sections/supply/assayPage/Step7GoldInspection';
import Step9AssayResult from '../sections/supply/assayPage/Step9AssayResult';

const Page = () => {

  return <Box>
    <Step1AssayMarkDate />
    <Step7GoldInspection />
    <Step9AssayResult />
  </Box>
}

export default Page;
