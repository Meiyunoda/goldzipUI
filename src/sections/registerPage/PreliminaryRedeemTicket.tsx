
import {
  Box, FormControl, FormHelperText, FormLabel
} from "@chakra-ui/react";
import { DatePicker } from "baseui/datepicker";
import React from "react";
import { ChakraField, ImageUpload } from '../../components';


const ByRepresentativeForm = ({ formikProps, required }) => {
  return <>
    <ChakraField name={'representativeName'} label={'Representative Name'} required={required} />
    <ChakraField name={'representativeIdentityDocumentNumber'} label={'Representative Identity Document Number'} required={required} />
    <ChakraField name={'representativeIdentityDocumentType'} label={'Representative Identity Document Type'} required={required} />
    <ImageUpload required={required}
      name={'representativeIdentityDocumentProof'} label={'Representative Identity Document Proof'}
      onChange={(url: string) => formikProps.setFieldValue('representativeIdentityDocumentProof', url)}
    />
    <ChakraField name={'representativeIdentityDocumentIssuingCountry'} label={'Representative Identity Document Issuing Country'} required={required} />
  </>
}

const PreliminaryRedeemTicket = ({ formikProps }) => {
  const today = new Date();
  const _7DaysLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  const _90DaysLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 90);

  return <>
    {/* <FormControl>
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
    </FormControl> */}
    <ChakraField name={'goldbarQuantity'} label={'Goldbar Quantity'} inputType={'number'} helperText={'In kg, (1000 Goldzip token worth 1kg goldbar)'} />

    <FormControl>
      <FormLabel >
        Pick Up Date
      </FormLabel>
      <Box color="black">
        <DatePicker
          value={formikProps.values.pickUpDate}
          onChange={({ date }) => {
            if (!date) return;
            date = date?.[0] || date;

            // @ts-ignore
            formikProps.setFieldValue('pickUpDate', date.setHours(date.getHours() + 8))
          }}
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

    {/* <FormControl> */}
    {/* <FormLabel>
        Collect By
      </FormLabel> */}
    {/* <Tabs isFitted >
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
      </Tabs> */}
    {/* </FormControl> */}
  </>
}

export default PreliminaryRedeemTicket;