import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import Step103Onboard from '../sections/redeem/Step103Onboard';
import Step107TransferWithdraw from '../sections/redeem/Step107TransferWithdraw';
import Step108GoldPendingPickup from '../sections/redeem/Step108GoldPendingPickup';
import Step109BurnGZOffBoard from '../sections/redeem/Step109BurnGZOffBoard';
import Step10SignOffDepositTransfer from '../sections/supply/validatorPage/Step10SignOffDepositTransfer';
import Step11MintSendOffBoard from '../sections/supply/validatorPage/Step11MintSendOffBoard';
import Step4OnBoardSupplier from '../sections/supply/validatorPage/Step4OnBoardSupplier';
import Step6SignOffDepositForm from '../sections/supply/validatorPage/Step6SignOffDepositForm';
import Step8SignOffWithdrawForm from '../sections/supply/validatorPage/Step8SignOffWithdrawForm';

const Page = () => {

  return <Box>
    <Text>Supply</Text>

    <Step4OnBoardSupplier />
    <Step6SignOffDepositForm />
    <Step8SignOffWithdrawForm />
    <Step10SignOffDepositTransfer />
    <Step11MintSendOffBoard />

    <br />
    <br />
    <br />
    <Text>Redeem</Text>
    <Step103Onboard />
    <Step107TransferWithdraw/>
    <Step108GoldPendingPickup/>
    <Step109BurnGZOffBoard/>
  </Box>
}

export default Page;