import { Box, Button, FormLabel, Stack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import React from 'react';
import { mutate } from 'swr';
import { ReceivePaymentQRCode } from '../../components';


const Step105SendGoldzip = ({ ticket100, ticket105, ticket106 }) => {
  const [auth, isAuthLoading] = useSession();

  const goldbarInKg = Number(parseInt(ticket100?.data?.goldbarQuantity));
  const redeemFee = goldbarInKg * 1.7
  const amount = goldbarInKg * 1000 + redeemFee;
  const toast = useToast();

  const invoice = `${ticket100.email}_${ticket100.goldzipId}_105`;


  return <Stack spacing="6" textAlign={'center'}>
    {ticket106  // if next ticket exist, meaning the pay is paid
      ? <Box>Payment of {ticket105.data.redeemFee} is received at {ticket105?.createdAt.slice(0, 10)}</Box>
      : <>
        <FormLabel textAlign={'center'}>Info below can not be updated after the payment is finished</FormLabel>
        <ReceivePaymentQRCode amount={amount} invoice={invoice} />
        <Button colorScheme="blue" onClick={async () => {
          try {
            const req = await axios.post(`/ticket/create`, {
              type: 105,
              data: { paymentId: invoice, redeemFee: amount, walletAddress: ticket100?.data?.walletAddress },
              goldzipId: ticket100.goldzipId,
              email: auth?.user?.email,
            }, {headers: {'Authorization': auth?.accessToken}});
            mutate(`/ticket/getAllTickets?email=${auth?.user?.email}`)
            toast({
              title: 'OK',
              status: "success",
            });
          } catch (e) {
            toast({
              title: JSON.stringify(e),
              status: "error",
            })
          }
        }}>Payment is finished</Button>
      </>
    }
  </Stack>
};

export default Step105SendGoldzip;