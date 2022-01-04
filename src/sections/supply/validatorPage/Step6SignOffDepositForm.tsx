import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { Spinner } from "baseui/spinner";
import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/client';
import React from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { ImageUpload } from '../../../components';
import { RenderTicket } from '../../../pages/ticket';
import { ticketTypes } from '../../../utils/constants';
import { fetcher } from '../../../utils/fn';

const flowStep = 5;
const flowTitle = ticketTypes[flowStep];

const getTicketUrl = `/ticket/getAllTickets?type=${flowStep - 1}&status=0`;

const Step6SignOffDepositForm = () => {
  const { data: tickets, error: error1 } = useSWR(getTicketUrl, fetcher)
  const { mutate } = useSWRConfig();
  const [auth, isAuthLoading] = useSession();
  const toast = useToast();
  if (error1) {
    toast({
      title: JSON.stringify(error1),
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
            }, { headers: { 'Authorization': auth?.accessToken } });
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
              <ImageUpload
                name={'depositForm'} label={'Deposit Form'}
                onChange={(url: string) => formikProps.setFieldValue('depositForm', url)}
                filePath='depositForm'
              />

              <Button colorScheme="blue" isLoading={formikProps.isSubmitting} type="submit">
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik >
    )
  }

  if (!error1 && !tickets) return <Spinner />

  if (!tickets || tickets.length === 0) return <Box>No pending ticket for Step {flowStep} {flowTitle}</Box>

  return <Box>
    <Text>Step {flowStep} {flowTitle}</Text>
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

export default Step6SignOffDepositForm;