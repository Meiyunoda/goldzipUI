import {
  Button, Checkbox, FormControl, FormHelperText, FormLabel, Input, Stack, useToast
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from "react";
import { ChakraField } from '../components';
import { DepositorCheckbox } from '../sections/registerPage';

const EnableSupplierAccountPage = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = React.useState(false);

  return <>
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={async (values, actions) => {
        toast({
          title: 'Application submitted',
          description: 'An email will be sent to you when the KYC/AML checking is finished',
          status: "success",
        })

        console.log(` register2.tsx --- values:`, values)
      }}
    >
      {(formikProps) => (
        <Form>
          <Stack spacing="6">
            <Field name={'email'}>
              {({ field }) => (
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input {...field} name="email" type="email" autoComplete="email" isRequired />
                  <FormHelperText>You will be notified by an email and able to login after onboard process finished</FormHelperText>
                </FormControl>
              )}
            </Field>
            <ChakraField name={'goldbarQuantity'} label={'Goldbar Quantity'} helperText={"In kg"} inputType={'number'} />

            {/* <Field name={'password'}>
              {({ field }) => (
                <FormControl id="password">
                  <FormLabel htmlFor={'password'}>password</FormLabel>

                  <InputGroup>
                    <Input
                      {...field}
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="password"
                      isRequired
                    />
                    <InputRightElement>
                      <IconButton
                        bg="transparent !important"
                        variant="ghost"
                        aria-label={showPassword ? 'Mask password' : 'Reveal password'}
                        icon={showPassword ? <HiEyeOff /> : <HiEye />}
                        onClick={() => setShowPassword(d => !d)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              )}
            </Field> */}

            <DepositorCheckbox />

            <Checkbox isRequired>Agree the terms and conditions</Checkbox>
            <Checkbox isRequired>Agree to pay KYC/AML fee in GoldZip token</Checkbox>

            <Button colorScheme="blue" isLoading={formikProps.isSubmitting} type="submit">
              Enable supply account
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  </>
}

export default EnableSupplierAccountPage;