import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { Spinner } from "baseui/spinner";
import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/client';
import React from 'react';
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import useSWR, { useSWRConfig } from 'swr';
import { RenderTicket } from '../../../pages/ticket';
import { ticketTypes } from '../../../utils/constants';
import { fetcher } from '../../../utils/fn';

const flowStep = 1;  // this is correct, it only update ticket, not create. it was created @ New supplier Application (/register?role=supplier)
const flowTitle = ticketTypes[flowStep];
const getTicketUrl = `/ticket/getAllTickets?type=${flowStep - 1}`;

const Step1AssayMarkDate = () => {
  let { data: step1Tickets, error: error1 } = useSWR(getTicketUrl, fetcher)
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
        initialValues={{ assayDates: [] }}
        onSubmit={async (values, actions) => {
          try {
            if (!values.assayDates || values.assayDates.length === 0) {
              toast({
                title: 'assay dates are not selected',
                status: "error",
              });
              return;
            }
            const req = await axios.post('/ticket/update',
              { id: ticket?._id, update: { data: { ...ticket?.data, assayDates: values.assayDates.map(d => d.format("YYYY-MM-DD")) } } },
              { headers: { 'Authorization': auth?.accessToken } })
            mutate(getTicketUrl);
            toast({
              title: 'ok',
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
              <DatePicker multiple sort
                value={formikProps.values.assayDates}
                onChange={v => {
                  formikProps.setFieldValue('assayDates', v)
                }}
                plugins={[<DatePanel />]}
                format="MMMM DD YYYY"
                render={(value, openCalendar) => {
                  return (
                    <Button onClick={openCalendar} colorScheme="red">
                      Select multiple dates for supplier to deposit goldbar
                    </Button>
                  )
                }}
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

  if (!error1 && !step1Tickets) return <Spinner />

  step1Tickets = step1Tickets.filter(t => !t?.data?.assayDates);
  if (!step1Tickets || step1Tickets.length === 0) return <Box>No pending ticket for Step {flowStep} {flowTitle}</Box>;

  return <Box>
    <Text>Step {flowStep} {flowTitle}</Text>
    <Accordion allowMultiple >
      {step1Tickets && step1Tickets.map((ticket, i) => {

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

export default Step1AssayMarkDate;