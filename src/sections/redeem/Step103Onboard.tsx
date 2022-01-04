import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Checkbox, Select, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { Spinner } from "baseui/spinner";
import { Form, Formik } from 'formik';
import React from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { ChakraField, ImageUpload } from '../../components';
import { RenderTicket } from '../../pages/ticket';
import { ticketTypes } from '../../utils/constants';
import { fetcher } from '../../utils/fn';
import { useSession } from 'next-auth/client';


const flowStep = 103;
const flowTitle = ticketTypes[flowStep];

const getTicketUrl = `/ticket/getAllTickets?type=${flowStep - 1}&status=0`;

const Step103Onboard = () => {
  const { data: tickets, error: error1 } = useSWR(getTicketUrl, fetcher)
  const { mutate } = useSWRConfig();
  const [auth] = useSession();
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
        initialValues={{ email: ticket.email }}
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
              <ChakraField name={'email'} label={'Email'} inputRest={{ isReadOnly: true }} />

              <Select placeholder="KYC Result" isRequired onChange={(v) => formikProps.setFieldValue('kycResult', v.target.value)}>
                {['pass', 'fail'].map((kycResult, i) =>
                  <option style={{ textTransform: 'capitalize' }} key={i} value={kycResult}>
                    {kycResult}
                  </option>)}
              </Select>

              <ImageUpload
                name={'assetExchangeAgreement'} label={'Asset Exchange Agreement'}
                onChange={(url: string) => formikProps.setFieldValue('assetExchangeAgreement', url)}
                filePath='assetExchangeAgreement'
              />

              <Select placeholder="Risk Rating" isRequired onChange={(v) => formikProps.setFieldValue('riskRating', v.target.value)}>
                {['high', 'medium', 'low'].map((rating, i) =>
                  <option style={{ textTransform: 'capitalize' }} key={i} value={rating}>
                    {rating}
                  </option>)}
              </Select>

              <ImageUpload
                name={'riskAssessmentReport'} label={'Risk Assessment Report'}
                onChange={(url: string) => formikProps.setFieldValue('riskAssessmentReport', url)}
                filePath='riskAssessmentReport'
              />

              <Checkbox isRequired>Redeemer account is created in AWS console cognito</Checkbox>

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
    <Text>Step {flowStep } {flowTitle}</Text>
    <Accordion allowMultiple >
      {tickets && tickets.map((ticket, i) => {
        if (ticket?.data?.assayDates) return null  // not showing if dates are inputted

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

export default Step103Onboard;