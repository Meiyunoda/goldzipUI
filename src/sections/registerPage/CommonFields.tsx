import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";
import { ChakraField } from "../../components";

const CommonFields = () => {
  // const [showPassword, setShowPassword] = React.useState(false);
  // const [showPassword2, setShowPassword2] = React.useState(false);

  return (<>
    <Field name={'email'}>
      {({ field }) => (
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input {...field} name="email" type="email" autoComplete="email" isRequired />
          <FormHelperText>You will be notified by an email and able to login after onboard process finished</FormHelperText>
        </FormControl>
      )}
    </Field>

    <ChakraField name={'walletAddress'} label={'VSYS Wallet Address'} helperText={'Accept only one wallet address during the process.'} />
  </>)
}

export default CommonFields;