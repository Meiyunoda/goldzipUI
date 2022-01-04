import {
  Box, Button, FormControl, FormHelperText, FormLabel, NumberDecrementStepper,
  NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper,
  Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text
} from "@chakra-ui/react";
import { DatePicker } from "baseui/datepicker";
import { Form, Formik } from "formik";
import React from "react";
import { ChakraField, ImageUpload } from '../../components';
import { MAX_GOLDZIP_SUPPLY_QUANTITY } from '../../utils/constants';


const ByRepresentativeForm = ({ formikProps, required }) => {
  return <Stack spacing="6">
    <ChakraField name={'name'} label={'Name'} required={required} />
    <ChakraField name={'identityDocumentNumber'} label={'Identity Document Number'} required={required} />
    <ChakraField name={'identityDocumentType'} label={'Identity Document Type'} required={required} />
    <ImageUpload required={required}
      name={'identityDocumentProof'} label={'Identity Document Proof'}
      onChange={(url: string) => formikProps.setFieldValue('identityDocumentProof', url)}
    />
    <ChakraField name={'issuingCountry'} label={'Issuing Country'} required={required} />
  </Stack>
}

const Step1CreateTicket = ({ onSubmit }) => {
  const today = new Date();
  const _7DaysLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  const _90DaysLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 90);

  return <Formik
    initialValues={{
      date: new Date(),
      by: 'selfPickUp',
      quantity: 1000
    }}
    onSubmit={(values) => {
      onSubmit({ ...values, date: values.date.toISOString().slice(0, 10) });
    }}>
    {(formikProps) => (
      <Form>
        <Stack spacing={6}>
          <FormControl>
            <FormLabel >
              Quantity of GOLDZIP Token
            </FormLabel>
            <NumberInput
              value={formikProps.values.quantity}
              min={1000}
              max={MAX_GOLDZIP_SUPPLY_QUANTITY}
              step={1000}
              onChange={(q) => formikProps.setFieldValue('quantity', q)}
              onBlur={() => formikProps.setFieldValue('quantity', Math.round(formikProps.values.quantity / 1000) * 1000)}
              precision={0}
              inputMode={'numeric'}
              isRequired
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormHelperText>Quantity is rounded to the nearest thousand as each gold bar weights 1kg.</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel >
              Pick Up Date
            </FormLabel>
            <Box color="black">
              <DatePicker
                value={formikProps.values.date}
                onChange={({ date }) => formikProps.setFieldValue('date', date)}
                filterDate={(date: Date) => {
                  // const theDate = new Date(date);
                  const day = date.getDay();
                  return day !== 0 && day !== 6
                    && date > _7DaysLater
                    && date < _90DaysLater;
                }}
                formatString="yyyy-MM-dd"
              />
            </Box>
            <FormHelperText>Format in (YYYY-MM-DD), Holiday is excluded, KYC is valid for 90 days.</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>
              Collect By
            </FormLabel>
            <Tabs isFitted >
              <TabList>
                <Tab onClick={() => formikProps.setFieldValue('by', 'selfPickUp')}>
                  Self Pick Up
                </Tab>
                <Tab onClick={() => formikProps.setFieldValue('by', 'byRepresentative')}>
                  By Representative
                </Tab>
                <Tab onClick={() => formikProps.setFieldValue('by', 'bySecurityService')}>
                  By Security Service
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Text>No additional Information is required.</Text>
                </TabPanel>

                <TabPanel>
                  <ByRepresentativeForm formikProps={formikProps} required={formikProps.values.by === 'byRepresentative'} />
                </TabPanel>

                <TabPanel>
                  <Text>Provide info of security service and escort staff on date of actual collection</Text>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </FormControl>

          <Button colorScheme="blue" isLoading={formikProps.isSubmitting} type="submit">
            Proceed To Payment
          </Button>
        </Stack>
      </Form>
    )}
  </Formik>

}

export default Step1CreateTicket;