import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, HStack, IconButton, Select, Stack, Text, useToast } from '@chakra-ui/react';
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

const flowStep = 1;
const flowTitle = ticketTypes[flowStep];

const getTicketUrl = `/ticket/getAllTickets?type=${flowStep - 1}&status=0`;

const Step2PrepareMemberInfo = () => {
  const [directorCount, setDirectorCount] = React.useState(1);
  const [significantShareholderCount, setSignificantShareholderCount] = React.useState(1);
  const { data: tickets, error } = useSWR(getTicketUrl, fetcher);
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
              <HStack>
                <Text fontSize="xl">Number of Director(s): {directorCount}</Text>

                <IconButton aria-label="add" icon={<AddIcon />} onClick={() => {
                  setDirectorCount(c => c + 1)
                }} />

                <IconButton aria-label="remove" icon={<MinusIcon />} onClick={() => {
                  if (directorCount <= 0) return;
                  setDirectorCount(c => c - 1);
                  formikProps.setFieldValue(`directorName${directorCount}`, undefined);
                  formikProps.setFieldValue(`directorIdNumberOrPassport${directorCount}`, undefined);
                  formikProps.setFieldValue(`directorIssuingCountry${directorCount}`, undefined);
                  formikProps.setFieldValue(`directorAddress${directorCount}`, undefined);
                  formikProps.setFieldValue(`directorCity${directorCount}`, undefined);
                  formikProps.setFieldValue(`directorCountry${directorCount}`, undefined);
                  formikProps.setFieldValue(`directorProofOfIDOrPassport${directorCount}`, undefined);
                  formikProps.setFieldValue(`directorProofOfAddress${directorCount}`, undefined);
                }} />
              </HStack>

              <HStack>
                <Text fontSize="xl">Number of Significant Shareholder(s): {significantShareholderCount}</Text>

                <IconButton aria-label="add" icon={<AddIcon />} onClick={() => {
                  setSignificantShareholderCount(c => c + 1)
                }} />

                <IconButton aria-label="remove" icon={<MinusIcon />} onClick={() => {
                  if (significantShareholderCount <= 0) return;
                  setSignificantShareholderCount(c => c - 1);
                  formikProps.setFieldValue(`significantShareholderName${significantShareholderCount}`, undefined);
                  formikProps.setFieldValue(`significantShareholderIdNumberOrPassport${significantShareholderCount}`, undefined);
                  formikProps.setFieldValue(`significantShareholderProofOfIDOrPassport${significantShareholderCount}`, undefined);
                  formikProps.setFieldValue(`significantShareholderIssuingCountry${significantShareholderCount}`, undefined);
                  formikProps.setFieldValue(`significantShareholderCity${significantShareholderCount}`, undefined);
                  formikProps.setFieldValue(`significantShareholderCountry${significantShareholderCount}`, undefined);
                  formikProps.setFieldValue(`significantShareholderAddress${significantShareholderCount}`, undefined);
                  formikProps.setFieldValue(`significantShareholderProofOfAddress${significantShareholderCount}`, undefined);
                }} />
              </HStack>

              {Array.from({ length: directorCount }).map((_, i) => <React.Fragment key={i}>
                <ChakraField name={`directorName${i}`} label={`Director #${i + 1} Name `} />
                <ChakraField name={`directorIdNumberOrPassport${i}`} label={`Director #${i + 1} ID Number Or Passport`} />
                <ImageUpload
                  name={`directorProofOfIDOrPassport${i}`} label={`Director #${i + 1} Proof Of ID Or Passport`}
                  onChange={(url: string) => formikProps.setFieldValue(`directorProofOfIDOrPassport${i}`, url)}
                  filePath='directorProofOfIDOrPassport'
                />
                <ChakraField name={`directorIssuingCountry${i}`} label={`Director #${i + 1} Issuing Country`} />
                <ChakraField name={`directorCity${i}`} label={`Director #${i + 1} City`} />
                <ChakraField name={`directorCountry${i}`} label={`Director #${i + 1} Country`} />
                <ChakraField name={`directorAddress${i}`} label={`Director #${i + 1} Address`} />
                <ImageUpload
                  name={`directorProofOfAddress${i}`} label={`Director #${i + 1} Proof of Address`}
                  onChange={(url: string) => formikProps.setFieldValue(`directorProofOfAddress${i}`, url)}
                  filePath='directorProofOfAddress'
                />
              </React.Fragment>)}

              {Array.from({ length: significantShareholderCount }).map((_, i) => <React.Fragment key={i}>
                <ChakraField name={`significantShareholderName${i}`} label={`Significant Shareholder #${i + 1} Name `} />
                <ChakraField name={`significantShareholderIdNumberOrPassport${i}`} label={`Significant Shareholder #${i + 1} ID Number Or Passport`} />
                <ImageUpload
                  name={`significantShareholderProofOfIDOrPassport${i}`} label={`Significant Shareholder #${i + 1} Proof Of ID Or Passport`}
                  onChange={(url: string) => formikProps.setFieldValue(`significantShareholderProofOfIDOrPassport${i}`, url)}
                  filePath='significantShareholderProofOfIDOrPassport'
                />
                <ChakraField name={`significantShareholderIssuingCountry${i}`} label={`Significant Shareholder #${i + 1} Issuing Country`} />
                <ChakraField name={`significantShareholderCity${i}`} label={`Significant Shareholder #${i + 1} City`} />
                <ChakraField name={`significantShareholderCountry${i}`} label={`Significant Shareholder #${i + 1} Country`} />
                <ChakraField name={`significantShareholderAddress${i}`} label={`Significant Shareholder #${i + 1} Address`} />
                <ImageUpload
                  name={`significantShareholderProofOfAddress${i}`} label={`Significant Shareholder #${i + 1} Proof of Address`}
                  onChange={(url: string) => formikProps.setFieldValue(`significantShareholderProofOfAddress${i}`, url)}
                  filePath='significantShareholderProofOfAddress'
                />
              </React.Fragment>)}

              <ChakraField name={'businessRegistrationNumber'} label={'Business Registration Number'} />
              <ImageUpload
                name={`proofOfBusinessRegistrationNumber`} label={`Proof Of Business Registration Number`}
                onChange={(url: string) => formikProps.setFieldValue(`proofOfBusinessRegistrationNumber`, url)}
                filePath='proofOfBusinessRegistrationNumber'
              />

              <ImageUpload
                name={`certificationOfIncorporation`} label={`Certification of Incorporation`}
                onChange={(url: string) => formikProps.setFieldValue(`certificationOfIncorporation`, url)}
                filePath='certificationOfIncorporation'
              />

              <Select placeholder="Company Source of Income" isRequired onChange={(v) => formikProps.setFieldValue('companySourceOfIncome', v.target.value)}>
                {['Shareholders fund', 'Internal financing', 'External financing'].map((source, i) =>
                  <option key={i} value={source}>
                    {source}
                  </option>)}
              </Select>

              <ImageUpload
                name={'assetProofDocument'} label={'Asset Proof Document'}
                onChange={(url: string) => formikProps.setFieldValue('assetProofDocument', url)}
                filePath='assetProofDocument'
              />
              <Button colorScheme="blue" isLoading={formikProps.isSubmitting} type="submit">
                Submit
              </Button>
            </Stack>
          </Form>
        )
        }
      </Formik >
    )
  }

  if (!error && !tickets) return <Spinner />
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

export default Step2PrepareMemberInfo;