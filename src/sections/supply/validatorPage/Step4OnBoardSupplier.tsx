import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Checkbox, Select, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { Spinner } from "baseui/spinner";
import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/client';
import React from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { ChakraField, ImageUpload } from '../../../components';
import { RenderTicket } from '../../../pages/ticket';
import { ticketTypes } from '../../../utils/constants';
import { fetcher } from '../../../utils/fn';

const flowStep = 3;
const flowTitle = ticketTypes[flowStep];

const getTicketUrl = `/ticket/getAllTickets?type=${flowStep - 1}&status=0`;

const Step4OnBoardSupplier = () => {
  const { data: step3Tickets, error: error1 } = useSWR(getTicketUrl, fetcher)
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
        initialValues={{ email: ticket.email }}
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
              <ChakraField name={'email'} label={'Supplier Email'} inputRest={{ isReadOnly: true }} />
              <ChakraField name={'supplierCompanyName'} label={'Supplier Company Name'} />
              <ChakraField name={'supplierCGSEID'} label={'Supplier CGSE ID'} />

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

              <Checkbox isRequired>Supplier account is created in AWS console cognito</Checkbox>

              <Button colorScheme="blue" isLoading={formikProps.isSubmitting} type="submit">
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik >
    )
  }

  if (!error1 && !step3Tickets) return <Spinner />

  if (!step3Tickets || step3Tickets.length === 0) return <Box>No pending ticket for Step {flowStep} {flowTitle}</Box>

  return <Box>
    <Text>Step {flowStep} {flowTitle}</Text>
    <Accordion allowMultiple >
      {step3Tickets && step3Tickets.map((ticket, i) => {
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

export default Step4OnBoardSupplier;