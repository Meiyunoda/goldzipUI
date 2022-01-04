import React from "react";
import { ChakraField, ImageUpload } from "../../components";

const CorporateFields = ({ formikProps }) => {
  return (<>
    <ChakraField name={'companyName'} label={'Company Name'} />
    <ChakraField name={'telephoneNumber'} label={'Telephone Number'} />
    <ChakraField name={'contactPerson'} label={'Contact Person'} />
    <ImageUpload
      name={'groupChartForMultilayerCompany'} label={'Group Chart For Multilayer Company'}
      onChange={(url: string) => formikProps.setFieldValue('identityDocumentProof', url)}
    />
    <ChakraField name={'businessRegistrationNumber'} label={'Business Registration Number'} />
    <ImageUpload
      name={'businessRegistrationProof'} label={'Business Registration Proof'}
      onChange={(url: string) => formikProps.setFieldValue('businessRegistrationProof', url)}
    />
    <ChakraField name={'issuingCountry'} label={'Issuing Country'} />
    <ChakraField name={'registeredAddress'} label={'Registered Address'} />
    <ImageUpload
      name={'registeredAddressProof'} label={'Registered Address Proof'}
      onChange={(url: string) => formikProps.setFieldValue('registeredAddressProof', url)}
    />
    <ImageUpload
      name={'directorsAndSubstantialShareholdersParticulars'} label={'Directors And Substantial Shareholders Particulars'}
      onChange={(url: string) => formikProps.setFieldValue('directorsAndSubstantialShareholdersParticulars', url)}
    />
  </>)
};

export default CorporateFields;