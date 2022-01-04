import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, FormControl, FormHelperText, FormLabel, NumberInput, NumberInputField, Radio, RadioGroup, Select, Spinner, Stack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { DatePicker } from "baseui/datepicker";
import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/client';
import React from 'react';
import useSWR from 'swr';
import { ChakraField, ImageUpload } from '../../../components';
import { MAX_GOLDZIP_SUPPLY_QUANTITY } from '../../../utils/constants';
import { fetcher } from '../../../utils/fn';

const brandNames = ['ABC', 'Argor Heraeus', 'Asahi USA', 'Credit Suisse', 'Metalor', 'PAMP', 'Royal Canadian Mint', 'Shangdong Gold', 'Valcambi'];
const flowStep = 4;

const AddGoldBarBySupplier = ({ onSubmit, i }) => {
  return (
    <Formik
      initialValues={{
        fineness: 9999
      }}
      onSubmit={(values, actions) => {
        onSubmit && onSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {(formikProps) => (
        <Form>
          <Stack spacing="6">
            <ChakraField name={'serialNum'} label={'Serial Number'} required={true} />
            <FormLabel>Brand Name</FormLabel>
            <Select placeholder="Select Brand Name" isRequired onChange={(e) => formikProps.setFieldValue('brandName', e.target.value)}>
              {brandNames.map((brandName, i) =>
                <option key={i} value={brandName}>{brandName}</option>)}
            </Select>
            <ChakraField name={'fineness'} label={'Fineness'} />
            <ChakraField name={'netWeight'} label={'Net Weight'} />
            <ChakraField name={'originCountry'} label={'Origin Country'} />
            <ImageUpload
              name={'goldImage'} label={'Gold Image'}
              onChange={(url: string) => formikProps.setFieldValue('goldImage', url)}
              filePath='goldBar'
            />
            <ImageUpload
              name={'COA'} label={'COA'}
              onChange={(url: string) => formikProps.setFieldValue('COA', url)}
              filePath='COA'
            />
            <Button colorScheme="blue" isLoading={formikProps.isSubmitting} type="submit">
              Update Goldbar #{i + 1}
            </Button>
          </Stack>
        </Form>
      )
      }
    </Formik >
  )
}

const Step5DepositTicket = () => {
  const [auth, isAuthLoading] = useSession();

  const { data: tickets, error } = useSWR((auth && auth?.user) ? `/ticket/getAllTickets?email=${auth?.user?.email}&type=0` : null, fetcher);
  const [dateSelectedBySupplier, setDateSelectedBySupplier] = React.useState(null);
  const [deliveryTerms, setDeliveryTerms] = React.useState('themselves');
  const [allGoldbarForm, setAllGoldbarForm] = React.useState({});

  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const toast = useToast();

  const goldbarQuantity = tickets ? `${parseInt(tickets.find(t => t.type === 0)?.data?.goldbarQuantity)}` : ''
  const accordionCount = parseInt(goldbarQuantity);
  const unfinishedForm = Array.from({ length: accordionCount }, (_, i) => `goldbar${i.toString()}`).filter(i => !Object.keys(allGoldbarForm).includes(i));

  if (isAuthLoading) return <Spinner />;
  if (!auth) return <Box>
    please login
  </Box>;
  if (!tickets) return <Spinner />;

  return <>
    <Stack spacing={6}>
      <FormControl>
        <FormLabel >
          Quantity of goldbar
        </FormLabel>
        <NumberInput
          value={goldbarQuantity}
          min={1000}
          max={MAX_GOLDZIP_SUPPLY_QUANTITY}
          step={1000}
          // onChange={(q) => setGoldbarQuantity(q)}
          // onBlur={() => {
          //   setGoldbarQuantity(`${(Math.round(parseInt(goldbarQuantity) / 1000) * 1000)}`)
          // }}
          precision={0}
          inputMode={'numeric'}
          isRequired
        >
          <NumberInputField />
          {/* <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper> */}
        </NumberInput>
        <FormHelperText>The number is indicated at the beginning of supply application</FormHelperText>
      </FormControl>

      <FormLabel >
        Date to deliver goldbar to the vault
      </FormLabel>
      <DatePicker
        value={dateSelectedBySupplier}
        onChange={({ date }) => setDateSelectedBySupplier(date)}
        minDate={new Date()}
        includeDates={tickets.find(t => t.type === 0)?.data?.assayDates.map(d => new Date(d))}
        formatString="yyyy-MM-dd"
      />


      <RadioGroup onChange={setDeliveryTerms} value={deliveryTerms}>
        <FormLabel>Delivery Terms</FormLabel>
        <Stack direction="row">
          <Radio value="themselves">Deliver to the vault by yourself</Radio>
          {/* <Radio value="internalTransfer">Internal transfer at the vault</Radio>
          <Radio value="collect">Collect at the supplier's site</Radio> */}
        </Stack>
      </RadioGroup>

      <Accordion allowMultiple >
        {Array.from({ length: accordionCount }).map((_, i) => {
          return <AccordionItem key={i}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Goldbar #{i + 1}
              </Box>
              <Box textAlign="right">
                {unfinishedForm.includes(`goldbar${i.toString()}`) ? '⌛' : '✔️'}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel >
              <AddGoldBarBySupplier i={i} onSubmit={(formValues) => setAllGoldbarForm(d => ({ ...d, [`goldbar${i.toString()}`]: formValues }))} />
            </AccordionPanel>
          </AccordionItem>
        })}
      </Accordion>

      <Button colorScheme="blue" isDisabled={!!unfinishedForm.length || isSubmitted} type="submit" onClick={async () => {
        try {
          // todo: check if and only if previous ticket is completed before allowing user to add gold
          if (!auth) {
            toast({
              title: 'please login',
              status: "error",
            });
            return;
          }
          if (!dateSelectedBySupplier) {
            toast({
              title: 'please select a date to supply your gold',
              status: "error",
            });
            return;
          }

          const dateSelectedBySupplier1 = new Date(dateSelectedBySupplier);
          dateSelectedBySupplier1.setHours(dateSelectedBySupplier1.getHours() + 8);
          const response = await axios.post(`/ticket/create`, {
            type: flowStep,
            email: auth.user.email,
            goldzipId: tickets?.[0]?.goldzipId,
            data: {
              goldbarQuantity,
              deliveryTerms,
              dateSelectedBySupplier: dateSelectedBySupplier1,
              ...allGoldbarForm
            }
          }, {headers: {'Authorization': auth?.accessToken}})
          setIsSubmitted(true);
          toast({
            title: 'OK',
            description: 'You can send gold after GoldZIP approve the ticket.',
            status: "success",
          })
        } catch (e) {
          toast({
            title: JSON.stringify(e.message),
            status: "error",
          })
        }
      }}>
        {
          isSubmitted
            ? 'Form submitted'
            : (!!unfinishedForm.length ? `Goldbar #${parseInt(unfinishedForm[0].slice(7)) + 1} is not updated` : 'Submit')
        }
      </Button>
    </Stack>
  </>
}

export default Step5DepositTicket;