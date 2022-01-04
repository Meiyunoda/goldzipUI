import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Code, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { Link } from '../components';
const smaller_ratio = 3;

const MobileApp = () => {

  return <>
    <Text>Step 1: click <Code>Token</Code></Text>
    <Image src={'/how-to-pay/app1.png'} width={726 / smaller_ratio} height={1507 / smaller_ratio} />

    <Text>Step 2: click{' '}
      <Code>
        Add Token
      </Code>
    </Text>
    <Image src={'/how-to-pay/app2.png'} width={726 / smaller_ratio} height={1426 / smaller_ratio} />

    <Text>Step 3: Find and {' '}<Code>Add</Code> GoldZip to your token list</Text>
    <Image src={'/how-to-pay/app3.png'} width={726 / smaller_ratio} height={1416 / smaller_ratio} />

    <Text>Step 4: Click GoldZip</Text>
    <Image src={'/how-to-pay/app4.png'} width={726 / smaller_ratio} height={1420 / smaller_ratio} />

    <Text>Step 5: Click <Code>Send Token</Code></Text>
    <Image src={'/how-to-pay/app5.png'} width={726 / smaller_ratio} height={1411 / smaller_ratio} />

    <Text>Step 6: Scan QR code or Fill in{' '}
      <Code>Amount</Code>{' '}
      <Code>Receive Address</Code>{' '}
      <Code>Description</Code>{' '}
      then confirm the transaction
    </Text>
    <Image src={'/how-to-pay/app6.png'} width={726 / smaller_ratio} height={1413 / smaller_ratio} />
  </>
};

const WebWallet = () => {
  return <>
    <Text>Step 1: click{' '}
      <Code>&oplus;</Code> next to{' '}
      <Code>Token watch list</Code>
    </Text>
    <Image src={'/how-to-pay/web1.png'} width={2064 / smaller_ratio} height={1102 / smaller_ratio} />

    <Text>Step 2: Find and{' '}
      <Code>Add</Code> GoldZip
    </Text>
    <Image src={'/how-to-pay/web2.png'} width={2084 / smaller_ratio} height={1096 / smaller_ratio} />

    <Text>Step 3: click{' '}
      <Code>Send</Code>{' '}
      next to GoldZip
    </Text>
    <Image src={'/how-to-pay/web3.png'} width={2131 / smaller_ratio} height={1098 / smaller_ratio} />

    <Text>Step 4: Scan QR code or Fill in{' '}
      <Code>Amount</Code>{' '}
      <Code>Receive Address</Code>{' '}
      <Code>Description</Code>{' '}
      then confirm the transaction
    </Text>
    <Image src={'/how-to-pay/web4.png'} width={2042 / smaller_ratio} height={1474 / smaller_ratio} />
  </>
};

const Extension = () => {
  return <>
    <Text>Step 1: click{' '}
      <Code><ChevronDownIcon /></Code> under account
    </Text>
    <Image src={'/how-to-pay/extension1.png'} width={624 / 2} height={995 / 2} />

    <Text>Step 2: click{' '}
      <Code>Add Token</Code>
    </Text>
    <Image src={'/how-to-pay/extension2.png'} width={624 / 2} height={995 / 2} />

    <Text>Step 3: Find and{' '}
      <Code>Add</Code> GoldZip
    </Text>
    <Image src={'/how-to-pay/extension3.png'} width={624 / 2} height={995 / 2} />

    <Text>Step 4: click{' '}
      <Code>Send</Code>{' '}
    </Text>
    <Image src={'/how-to-pay/extension4.png'} width={624 / 2} height={995 / 2} />

    <Text>Step 5: Fill in{' '}
      <Code>Amount</Code>{' '}
      <Code>Receive Address</Code>{' '}
      <Code>Description</Code>{' '}
      then confirm the transaction
    </Text>
    <Image src={'/how-to-pay/extension5.png'} width={624 / 2} height={995 / 2} />

  </>
}

const HowToPayPage = () => {
  return (
    <Box textAlign={'center'}>
      <Text>
        Set up your VSYS wallet
        {' '}
        <Link href={'https://v.systems/wallet'} textDecoration={'underline'}>
          here
        </Link>
        {' '}
        if you do not have one
      </Text>

      <Text>Or visit {' '}
        <Link href={'https://wallet.v.systems'} textDecoration={'underline'}>
          Web Wallet
        </Link>{' '}
        for quick access
      </Text>

      <br />
      <Text>The token address of GoldZIP is TWZ3nPYyCJAJJmfJBzxcqe8ZfpYJMQK4dpiQ1m6v4</Text>

      <Tabs isFitted>
        <TabList>
          <Tab>Web Wallet</Tab>
          <Tab>Mobile App</Tab>
          <Tab>Chrome Extension</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <WebWallet />
          </TabPanel>
          <TabPanel>
            <MobileApp />
          </TabPanel>
          <TabPanel>
            <Extension />
          </TabPanel>
        </TabPanels>
      </Tabs>

    </Box>
  )
}

export default HowToPayPage;