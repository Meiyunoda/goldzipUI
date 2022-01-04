import { Box, Button, chakra, Checkbox, Stack, Table, Tbody, Td, Text, Tr, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { Card, ReceivePaymentQRCode } from '../../components';
import { collectorValue2Label } from '../../utils/constants';


const Step2ConfirmTicket = ({ formData }) => {
  const router = useRouter();
  const toast = useToast();
  const isByRepresentative = formData.by === 'byRepresentative';
  let formData2Table = [
    ['GoldZIP Quantity', formData.quantity],
    ['Date', formData.date],
    ['Collection Method', collectorValue2Label[formData.by]],
  ];
  if (isByRepresentative) {
    formData2Table = [...formData2Table,
    ['Name', formData.name],
    ['Identity Document Number', formData.identityDocumentNumber],
    ['Issuing Country', formData.issuingCountry]
    ];
  }

  return <Box textAlign={'center'}>
    <Text >
      Confirm Your Redemption Ticket
    </Text>
    <Card>
      <Table>
        <Tbody>
          {formData2Table.map((tr, i) => <Tr key={i}>
            {tr.map((td, ii) => <Td key={ii}>{td}</Td>)}
          </Tr>)}
        </Tbody>
      </Table>
      {
        (isByRepresentative) && <>
          <Text>Identity Document Proof</Text>
          <img height="300" width="400"
            src={formData.identityDocumentProof}
            alt={'identityDocumentProof'} />
        </>
      }
    </Card>

    <Text color={'red'}>
      Non-refundable application fee is
      {' ' + process.env.NEXT_PUBLIC_GOLDZIP_REDEMPTION_HANDLING_FEE + ' '}
      GoldZIP token
    </Text>

    <Text color={'red'}>
      {formData.quantity} GoldZip token have to paid after the KYC of current ticket is passed within 30 calendar days
    </Text>
    <br />
    <ReceivePaymentQRCode amount={process.env.NEXT_PUBLIC_GOLDZIP_REDEMPTION_HANDLING_FEE} />
    <br />

    <chakra.form onSubmit={(e) => {
      e.preventDefault();
      // TODO: post data here
      toast({
        title: 'Ticket is submitted',
        description: `${formData.quantity} GoldZip token have to be paid after the KYC of current ticket is passed within 30 calendar days`,
        status: 'success',
        duration: 2000
      });
      router.push('/redemption');
    }}>
      <Stack>
        <Checkbox isRequired>Redemption ticket is correct</Checkbox>
        <Checkbox isRequired>Non-refundable application fee is paid</Checkbox>
        <Checkbox isRequired>Please note that you have 30 days to finish your online application.
          The number of days remaining to submit your application appears in redemption page.
          If your application is not submitted within 30 days, it will automatically be failed.
        </Checkbox>
        <Button type={'submit'} colorScheme={'blue'}>
          Confirm Payment
        </Button>
      </Stack>
    </chakra.form>
  </Box >
}

export default Step2ConfirmTicket;
