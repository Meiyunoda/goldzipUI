import { Button, Checkbox, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { ChakraField, ImageUpload } from "../components";


const CorporateForm = () => {
  return (<>
    <Formik
      initialValues={{}} // TODO: fetch initial values from db after backend works
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}
    >
      {(props) => (
        <Form>
          <Stack spacing="6">
          <ChakraField name={'walletAddress'} label={'VSYS Wallet Address'} helperText={'Accept only one wallet address during the process.'} />

            <ChakraField name={'companyName'} label={'Company Name'} />
            <ImageUpload
              name={'groupChartForMultilayerCompany'} label={'Group Chart For Multilayer Company'}
              onChange={(url: string) => props.setFieldValue('identityDocumentProof', url)}
            />
            <ChakraField name={'businessRegistrationNumber'} label={'Business Registration Number'} />
            <ImageUpload
              name={'businessRegistrationProof'} label={'Business Registration Proof'}
              onChange={(url: string) => props.setFieldValue('businessRegistrationProof', url)}
            />
            <ChakraField name={'issuingCountry'} label={'Issuing Country'} />
            <ChakraField name={'registeredAddress'} label={'Registered Address'} />
            <ImageUpload
              name={'registeredAddressProof'} label={'Registered Address Proof'}
              onChange={(url: string) => props.setFieldValue('registeredAddressProof', url)}
            />
            <ChakraField name={'telephoneNumber'} label={'Telephone Number'} />
            <ChakraField name={'contactPerson'} label={'Contact Person'} />
            <ChakraField name={'contactEmail'} label={'Contact Email'} />
            <ImageUpload
              name={'directorsAndSubstantialShareholdersParticulars'} label={'Directors And Substantial Shareholders Particulars'}
              onChange={(url: string) => props.setFieldValue('directorsAndSubstantialShareholdersParticulars', url)}
            />
            <Button colorScheme="blue" isLoading={props.isSubmitting} type="submit">
              Submit
            </Button>
          </Stack>
        </Form>
      )
      }
    </Formik >
  </>
  )
};

const IndividualForm = () => {
  return (<>
    <Formik
      initialValues={{}}  // TODO: fetch initial values from db after backend works
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}
    >
      {(props) => (
        <Form>
          <Stack spacing="6">
          <ChakraField name={'walletAddress'} label={'VSYS Wallet Address'} helperText={'Accept only one wallet address during the process.'} />

            <ChakraField name={'name'} label={'Name'} />
            <ChakraField name={'identityDocumentNumber'} label={'Identity Document Number'} />
            <ChakraField name={'identityDocumentType'} label={'Identity Document Type'} />
            <ImageUpload
              name={'identityDocumentProof'} label={'Identity Document Proof'}
              onChange={(url: string) => props.setFieldValue('identityDocumentProof', url)}
            />
            <ChakraField name={'issuingCountry'} label={'Issuing Country'} />
            <ChakraField name={'dateOfBirth'} label={'Date Of Birth'} inputType={'date'} />
            <ChakraField name={'address'} label={'Address'} />
            <ImageUpload
              name={'addressProof'} label={'Address Proof'}
              onChange={(url: string) => props.setFieldValue('AddressProof', url)}
            />
            <ChakraField name={'telephoneNumber'} label={'Telephone Number'} />
            <ChakraField name={'contactEmail'} label={'Contact Email'} />
            <Button colorScheme="blue" isLoading={props.isSubmitting} type="submit">
              Submit
            </Button>
          </Stack>
        </Form>
      )
      }
    </Formik>
  </>
  )
}

const DepositorForm = () => {
  return (<>
    <Formik
      initialValues={{}}  // TODO: fetch initial values from db after backend works
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}
    >
      {(props) => (
        <Form>
          <Stack spacing="6">
          <ChakraField name={'walletAddress'} label={'VSYS Wallet Address'} helperText={'Accept only one wallet address during the process.'} />

            <ChakraField name={'CGSEMemberID'} label={'CGSE Member ID'} />
            <ChakraField name={'companyName'} label={'Company Name'} />
            <ChakraField name={'contactEmail'} label={'Contact Email'} />

            <Checkbox isRequired>Agree the asset exchange agreement</Checkbox>
            <Checkbox isRequired>Agree the terms and conditions</Checkbox>
            <Checkbox isRequired>Agree to pay KYC/AML fee in GoldZip token</Checkbox>
            <Checkbox isRequired>Consent CGSE release information to GoldZip operator to conduct KYC/AML</Checkbox>

            <Button colorScheme="blue" isLoading={props.isSubmitting} type="submit">
              Submit
            </Button>
          </Stack>
        </Form>
      )
      }
    </Formik>
  </>
  )
}

const userPage = () => {
  return <>
    <Tabs isFitted >
      <Text>
        Fill in all the required information and then choose the "Submit" button to finish creating your account.<br />
        We need this information to confirm who you are and to make sure:<br />

        your information is available to you only; and<br />
        your identity is validated on your return visits.<br />

        Enter a valid email address. We will use this email address to let you know when you have a message or update.
      </Text>

      <TabList>
        <Tab>Individual</Tab>
        <Tab>Corporate</Tab>
        <Tab>Depositor</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <IndividualForm />
        </TabPanel>

        <TabPanel>
          <CorporateForm />
        </TabPanel>

        <TabPanel>
          <DepositorForm />
        </TabPanel>
      </TabPanels>

    </Tabs>
  </>
}

export default userPage;