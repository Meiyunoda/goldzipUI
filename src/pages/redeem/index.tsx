import { Box, Divider, FormLabel, Spinner, Table, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import React from "react";
import useSWR from 'swr';
import { Card, ReceivePaymentQRCode } from '../../components';
import Step104AdditionalInfo from '../../sections/redeem/Step104AdditionalInfo';
import Step105SendGoldzip from '../../sections/redeem/Step105SendGoldzip';
import { fetcher } from '../../utils/fn';


const RenderRedemptionRecords = ({ record }) => {
  record = {
    createdAt: '2021-09-01',
    kycPassedAt: '2021-09-03',
    onboardAt: '2021-09-03',
    collectionMethod: '',
    quantity: 1000,
  }

  const today = new Date();
  const onboardAtDate = new Date(record?.onboardAt);
  const createdAtDate = new Date(record?.createdAt);
  const kycPassedAtDate = new Date(record?.kycPassedAt);

  const _30DaysFromOnboard = new Date(onboardAtDate.getFullYear(), onboardAtDate.getMonth(), onboardAtDate.getDate() + 30);
  const _30DaysFromOnboardDiffDays = Math.ceil(Math.abs(_30DaysFromOnboard.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const _90DaysLater = new Date(kycPassedAtDate.getFullYear(), kycPassedAtDate.getMonth(), kycPassedAtDate.getDate() + 90);
  const _90DaysDiff = Math.ceil(Math.abs(_90DaysLater.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));


  let formData2Table = [
    ['create at', record?.createdAt],
    ['Days left to pay GoldZip token', _30DaysFromOnboardDiffDays],
    ['kyc valid until', _90DaysLater.toJSON()],
  ];


  return <Card>
    <Table>
      <Tbody>
        {formData2Table.map((tr, i) => <Tr key={i}>
          {tr.map((td, ii) => <Td key={ii}>{td}</Td>)}
        </Tr>)}
      </Tbody>
    </Table>

    <Divider />
    <br />

    <ReceivePaymentQRCode amount={record.quantity} />
  </Card>
}

const redemptionPage = () => {
  const [auth, isAuthLoading] = useSession();

  const { data: ticket, error } = useSWR((auth && auth?.user) ? `/ticket/getAllTickets?email=${auth?.user?.email}` : null, fetcher);
  if (isAuthLoading) return <Spinner />
  if (!auth) return <Text>please login</Text>
  if (!ticket && !error) return <Spinner />
  if (!ticket || !ticket.length) return <Text>no ticket</Text>

  const ticket100 = ticket.find(t => t.type === 100);
  const ticket103 = ticket.find(t => t.type === 103);
  const ticket104 = ticket.find(t => t.type === 104);
  const ticket105 = ticket.find(t => t.type === 105);
  const ticket106 = ticket.find(t => t.type === 106);

  return <Box>
    <FormLabel textAlign={'center'}>Your will be off-boarded and the account will be deleted after redemption is completed.</FormLabel>

    {/* <RenderRedemptionRecords record={redemptionRecords} /> */}

    {!ticket103 && <Text>Please wait, lack of previous ticket</Text>}

    {ticket100 && ticket104 && <>
      <br />
      <Divider />
      <br />
      <Step105SendGoldzip ticket100={ticket100} ticket105={ticket105} ticket106={ticket106} />
    </>}

    {ticket100 && ticket103 && (!ticket105 || (ticket104 && ticket104?.status === 0)) && <>
      <br />
      <Divider />
      <br />
      <Step104AdditionalInfo ticket100={ticket100} ticket103={ticket103} ticket104={ticket104}
        isEditable={true}
      // isEditable={(!!ticket103 && !!ticket104 && ticket104.status !== 0)} 
      />
    </>}

  </Box >
}

export default redemptionPage;