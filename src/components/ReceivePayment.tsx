import { Stack, Text } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import QRCode from 'qrcode.react';
import React from 'react';
import Copy2Clipboard from './Copy2Clipboard';

const ReceivePaymentQRCode = ({
  address = process.env.NEXT_PUBLIC_GOLDZIP_WALLET,
  amount,
  invoice = `invoice ${+new Date()}`
}) => {
  // TODO: send request to backend to retrieve `invoice` instead of hardcode

  const text = JSON.stringify({
    protocol: 'v.systems',
    api: 2,
    opc: 'account',
    address,
    amount: new BigNumber(amount).multipliedBy(1e8),
    invoice
  }).replace(/"amount":"(\d+)"/g, '"amount":$1');

  return <Stack spacing={4} alignItems={'center'}>
    <Text>Pay by scanning the QR code with VSYS wallet</Text>
    <QRCode value={text} size={300} includeMargin />

    <Text as="span" fontWeight="medium">
      OR
    </Text>
    <Text>Send GoldZIP token with the following information</Text>
    <div>
      <Text>Address</Text>
      <Copy2Clipboard value={process.env.NEXT_PUBLIC_GOLDZIP_WALLET} />
    </div>

    <div>
      <Text>Amount</Text>
      <Copy2Clipboard value={amount} />
    </div>

    <div>
      <Text>Description</Text>
      <Copy2Clipboard value={invoice} />
    </div>
  </Stack>
}


export default ReceivePaymentQRCode;