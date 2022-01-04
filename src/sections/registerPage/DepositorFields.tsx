import { Checkbox } from "@chakra-ui/react";
import React from "react";
import { ChakraField } from "../../components";

const DepositorFields = () => {
  // todo: Verification Code
  return (<>
    <ChakraField name={'CGSEMemberID'} label={'CGSE Member ID'} />
    <ChakraField name={'companyName'} label={'Company Name'} helperText={"Same As CGSE's Registration"} />
    <ChakraField name={'goldbarQuantity'} label={'Goldbar Quantity To Supply For This Round Of Application'} helperText={"In kg"} inputType={'number'} />

    <ChakraField name={'nameOfRegisteredManager'} label={'Name of Registered Manager'} />
    <ChakraField name={'mobilePhoneOfRegisteredManager'} label={'Mobile Phone of Registered Manager'} />
    <ChakraField name={'emailAddressOfRegisteredManager'} label={'Email Address of Registered Manager'} />
    {/* <ChakraField name={'Verification Code'} label={'Verification Code'} /> */}
  </>)
}

export const DepositorCheckbox = () => (
  <>
    <Checkbox isRequired>Agree the asset exchange agreement</Checkbox>
    <Checkbox isRequired>Consent CGSE release information to GoldZip operator to conduct KYC/AML</Checkbox>
  </>
)

export default DepositorFields;