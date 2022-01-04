import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Checkbox, Select, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { Spinner } from "baseui/spinner";
import { Form, Formik } from 'formik';
import React from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { ChakraField } from '../../components';
import { RenderTicket } from '../../pages/ticket';
import { ticketTypes } from '../../utils/constants';
import { fetcher } from '../../utils/fn';
import { useSession } from 'next-auth/client';
const flowStep = 109;
const flowTitle = ticketTypes[flowStep];

const getTicketUrl = `/ticket/getAllTickets?type=${flowStep - 1}&status=0`;

const Step109BurnGZOffBoard = () => {
  const { data: tickets, error } = useSWR(getTicketUrl, fetcher)
  const { mutate } = useSWRConfig();
  const [auth, isAuthLoading] = useSession();
  const toast = useToast();
  if (error) {
    toast({
      title: JSON.stringify(error),
      status: "error",
    })
  }

  const AccordionForm = ({ ticket }) => {
    return (
      <Formik
        initialValues={{}}
        onSubmit={async (values, actions) => {
          try {
            const req = await axios.post(`/ticket/create`, {
              type: flowStep,
              data: values,
              goldzipId: ticket.goldzipId,
              email: ticket.email,
            }, {headers: {'Authorization': auth?.accessToken}});
            mutate(getTicketUrl);
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
          actions.setSubmitting(false);
        }}
      >
        {(formikProps) => (
          <Form>
            <Stack spacing="6">
              <ChakraField name={'contactEmail'} label={'Contact Email'} />
              <ChakraField name={'goldZipWalletAddress'} label={'GoldZip Wallet Address'} />
              <ChakraField name={'goldbarQuantity'} label={'Amount of Gold Redeem (kg)'} />

              <ChakraField name={'numberOfGoldzipBurnt'} label={'Number Of Goldzip Burnt'} />
              <ChakraField name={'blockchainHashIDOfGoldzipBurnt'} label={'Blockchain Hash ID Of Goldzip Burnt'} />

              <Checkbox isRequired>Redeemer account is deleted in AWS console cognito</Checkbox>

              <Button colorScheme="blue" isLoading={formikProps.isSubmitting} type="submit">
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik >
    )
  }

  if (!error && !tickets) return <Spinner />

  if (!tickets || tickets.length === 0) return <Box>No pending ticket for Step {flowStep } {flowTitle}</Box>

  return <Box>
    <Text>Step {flowStep } {flowTitle}</Text>
    <Accordion allowMultiple >
      {tickets && tickets.map((ticket, i) => {

        return <AccordionItem key={i}>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {ticket?.email} @{ticket?.createdAt}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel >
            <RenderTicket ticket={[ticket]} />
            <br />
            <AccordionForm ticket={ticket} />
          </AccordionPanel>
        </AccordionItem>
      })}
    </Accordion>
  </Box>
}

export default Step109BurnGZOffBoard;