import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Checkbox, CheckboxGroup, Select, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { Spinner } from "baseui/spinner";
import { Form, Formik } from 'formik';
import { isObject, pickBy } from 'lodash';
import { useSession } from 'next-auth/client';
import React from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { CTable } from '../../../components';
import { RenderTicket } from '../../../pages/ticket';
import { ticketTypes } from '../../../utils/constants';
import { fetcher } from '../../../utils/fn';
const flowStep = 6;
const flowTitle = ticketTypes[flowStep];

const getTicketUrl = `/ticket/getAllTickets?type=${flowStep - 1}&status=0`;

const Step7GoldInspection = () => {
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
    const { data: tickets, error: error } = useSWR(`/ticket/getAllTickets?goldzipId=${ticket.goldzipId}&type=4`, fetcher)
    if (!error && !tickets) return <Spinner />

    if (!tickets || tickets.length === 0) return <Box>No goldbar found</Box>
    const goldbar = Object.values(pickBy(tickets[0]?.data, isObject));

    return (
      <Formik
        initialValues={{ goldbar: [] }}
        onSubmit={async (values, actions) => {
          try {
            if (values.goldbar.length !== goldbar.length) {
              toast({
                title: 'check all goldbar before submit or reject the supply application',
                status: "error",
              });
              return;
            }
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

              <CheckboxGroup colorScheme="green" onChange={(val) => formikProps.setFieldValue(`goldbar`, val)}>
              {goldbar.map((g, i) => <Checkbox key={i} value={g.serialNum}>
                <CTable columns={Object.keys(g)} data={[Object.values(g)]} />
              </Checkbox>)}
              </CheckboxGroup>
              <Select placeholder="Gold For Assay" isRequired onChange={(v) => formikProps.setFieldValue('goldForAssay', v.target.value)}>
                {goldbar.map((goldForAssay, i) =>
                  <option style={{ textTransform: 'capitalize' }} key={i} value={goldForAssay.serialNum}>
                    {goldForAssay.serialNum}
                  </option>)}
              </Select>

              <Button colorScheme="blue" isLoading={formikProps.isSubmitting} type="submit">
                Submit
              </Button>

              <Button colorScheme="red" onClick={async () => {
                await axios.post('/ticket/update',
                  { id: ticket?._id, update: { status: 2 } },
                  { headers: { 'Authorization': auth?.accessToken } })
              }} type="submit">
                Reject
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

export default Step7GoldInspection;