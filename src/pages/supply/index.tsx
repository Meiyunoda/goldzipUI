import { Box, Button, Spinner, Stack, Text } from "@chakra-ui/react";
import axios from 'axios';
import { useSession } from 'next-auth/client';
import React from "react";
import useSWR from 'swr';
import { Link } from "../../components";
import { RenderTicket } from "../ticket";

const fetcher = url => axios.get(url).then(res => res.data);

const SupplyPage = () => {
  const [auth] = useSession();
  let { data: supplyRecord, error } = useSWR(auth
    ? `/ticket/getAllTickets?email=${auth?.user?.email}`
    : null,
    fetcher)

  if (!auth) return <Box>
    please login
  </Box>;

  if (!supplyRecord) return <Spinner />;

  supplyRecord = supplyRecord.sort((a, b) => b.type - a.type);

  return <Stack display={'flex'} alignItems={''}>
    <Text>Your will be off-boarded and the account will be disabled after supplying is completed.</Text>
    {
      // supplyRecord.length === 3 && // at 3
      <Button as={Link} href='/supply/new'>
        Create GoldZIP Purchase Order Form
      </Button>
    }

    <RenderTicket ticket={supplyRecord} />
  </Stack>
}

export default SupplyPage;