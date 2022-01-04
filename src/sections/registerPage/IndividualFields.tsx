import { Box, FormLabel } from '@chakra-ui/react';
import { DatePicker } from "baseui/datepicker";
import React from "react";
import { ChakraField, ImageUpload } from "../../components";

const IndividualFields = ({ formikProps }) => {
  return (<>
    <ChakraField name={'name'} label={'Name'} />
    <ChakraField name={'identityDocumentNumber'} label={'Identity Document Number'} />
    <ChakraField name={'identityDocumentType'} label={'Identity Document Type'} />
    <ChakraField name={'telephoneNumber'} label={'Telephone Number'} />
    <ImageUpload
      name={'identityDocumentProof'} label={'Identity Document Proof'}
      onChange={(url: string) => formikProps.setFieldValue('identityDocumentProof', url)}
    />
    <ChakraField name={'issuingCountry'} label={'Issuing Country'} />
    {/* <ChakraField name={'dateOfBirth'} label={'Date Of Birth'} inputType={'date'} /> */}

    <Box>
      <FormLabel>Date Of Birth</FormLabel>
      <Box color="black">
        <DatePicker
          value={formikProps.values.dateOfBirth}
          onChange={({ date }) => {
            if (!date) return;
            date = date?.[0] || date;

            // @ts-ignore
            formikProps.setFieldValue('dateOfBirth', date.setHours(date.getHours() + 8))
          }}
          formatString="yyyy-MM-dd"
        />
      </Box>
    </Box>

    <ChakraField name={'address'} label={'Address'} />
    <ImageUpload
      name={'addressProof'} label={'Address Proof'}
      onChange={(url: string) => formikProps.setFieldValue('AddressProof', url)}
    />
  </>)
};

export default IndividualFields;