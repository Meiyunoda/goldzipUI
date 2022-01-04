import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Button, chakra, Checkbox, Radio, RadioGroup, Stack, useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import * as React from "react";
import { DividerWithText, Link, ReceivePaymentQRCode } from '../components';
import { CommonFields, CorporateFields, DepositorCheckbox, DepositorFields, IndividualFields, PreliminaryRedeemTicket } from '../sections/registerPage';
import { kycFeeForRedeem } from '../utils/constants';

/*
all accounts will be register by admin after kyc is passed
*/
// flowStep = 100
const Register4Redeem = ({ userRole, setUserRole }) => {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [redemptionForm, setRedemptionForm] = React.useState({
    // quantity: 1000,
    goldbarQuantity: '1',
    email: '',
    // password: '',
    // password2: '',

    pickUpDate: null,
    by: 'selfPickUp'
  })
  const toast = useToast();

  const goldzipId = nanoid();
  const invoice = `${redemptionForm.email}_${goldzipId}_100`;

  if (step === 1)
    return <>
      <Formik
        initialValues={redemptionForm}
        onSubmit={async (values, actions) => {
          // if (values.password !== values.password2) {
          //   toast({
          //     description: 'password is not the same',
          //     status: "error",
          //   })
          //   actions.setSubmitting(false)
          //   return;
          // }
          if (!values.pickUpDate) {
            toast({
              description: 'Pick up date is not selected',
              status: "error",
            })
            actions.setSubmitting(false)
            return;
          }

          // await createUserWithEmailAndPassword(values.email, values.password);  // todo: disable user in back end

          // toast({
          //   title: 'Application submitted',
          //   description: 'An email will be sent to you when the KYC/AML checking is finished',
          //   status: "success",
          // })
          setRedemptionForm(values)
          setStep(2);
        }}
      >
        {(formikProps) => (
          <Form>
            <Stack spacing="6">
              <CommonFields />

              <RadioGroup onChange={setUserRole} value={userRole}>
                <Stack direction="row">
                  <Radio value="individual">Individual </Radio>
                  <Radio value="corporate">Corporate</Radio>
                </Stack>
              </RadioGroup>

              {userRole === 'individual' && <IndividualFields formikProps={formikProps} />}
              {userRole === 'corporate' && <CorporateFields formikProps={formikProps} />}
              {userRole === 'supplier' && <DepositorFields />}

              <PreliminaryRedeemTicket formikProps={formikProps} />

              <Checkbox isRequired>Agree the terms and conditions</Checkbox>
              <Checkbox isRequired>Agree to pay KYC/AML fee in GoldZip token</Checkbox>

              <Button colorScheme="blue" isLoading={formikProps.isSubmitting} type="submit">
                Submit Preliminary Ticket Application
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </>

  if (step === 2)
    return <>
      <Button leftIcon={<ArrowBackIcon />} onClick={() => setStep(1)}>Back to previous step</Button>

      <chakra.form onSubmit={async (e) => {
        e.preventDefault();
        const values = redemptionForm;

        // const [registerReq, ticketReq] = await Promise.all([
        //   axios.post(`/register/${userRole === 'individual' ? 'individualUser' : 'corporateUser'}`, { ...values, goldzipId }),
        //   axios.post(`/ticket/create`, {
        //     type: 100,
        //     data: { ...values, paymentId: invoice, kycFee: kycFeeForRedeem[userRole] },  // todo: kycFee
        //     goldzipId,
        //     email: values.email,
        //   })
        // ]);

        await axios.post(`/ticket/create`, {
          type: 100,
          data: { ...values, paymentId: invoice, kycFee: kycFeeForRedeem[userRole] },  // todo: kycFee
          goldzipId,
          email: values.email,
        });

        toast({
          title: 'Ticket is submitted',
          description: `${parseInt(redemptionForm?.goldbarQuantity) * 1000} GoldZip token have to be paid after the KYC of current ticket is passed within 30 calendar days`,
          status: 'success',
          duration: 2000
        });
        // router.push('/');
        setIsSubmitted(true);
      }}>
        <Stack>
          <ReceivePaymentQRCode amount={kycFeeForRedeem[userRole]} invoice={invoice} />

          {/* <Checkbox isRequired>Redemption ticket is correct</Checkbox> */}
          <Checkbox isRequired>Non-refundable application fee is paid</Checkbox>
          <Checkbox isRequired>Please note that you have 30 days to finish your online application.
            The number of days remaining to submit your application appears in redemption page.
            If your application is not submitted within 30 days, it will automatically be failed.
          </Checkbox>
          <Button type={'submit'} colorScheme={'blue'} isDisabled={isSubmitted}>
            Confirm Payment
          </Button>
        </Stack>
      </chakra.form>
    </>
}

// flowStep = 0
const Register4Supply = () => {
  const toast = useToast();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  return <>
    <Button as={Link} textAlign={'center'} href='/enable-supplier-account'>
      Enable Supplier Account
    </Button>

    <DividerWithText label={'Or Register New Supplier Account'} />

    <Formik
      initialValues={{
        email: ''
      }}
      onSubmit={async (values, actions) => {
        const goldzipId = nanoid();
        // const [registerReq, ticketReq] = await Promise.all([
        //   axios.post(`/register/supplier`, { ...values, goldzipId }),
        //   axios.post(`/ticket/create`, {
        //     type: 0,
        //     data: values,
        //     goldzipId,
        //     email: values.email,
        //   })
        // ]);

        await axios.post(`/ticket/create`, {
          type: 0,
          data: values,
          goldzipId,
          email: values.email,
        })
        setIsSubmitted(true);
        toast({
          title: 'Application submitted',
          description: 'An email will be sent to you when the KYC/AML checking is finished',
          status: "success",
        })

        actions.setSubmitting(false);
      }}
    >
      {(formikProps) => (
        <Form>
          <Stack spacing="6">
            <CommonFields />

            <DepositorFields />
            <DepositorCheckbox />

            <Checkbox isRequired>Agree the terms and conditions</Checkbox>
            <Checkbox isRequired>Agree to pay KYC/AML fee in GoldZip token</Checkbox>

            <Button colorScheme="blue" isLoading={formikProps.isSubmitting} isDisabled={isSubmitted} type="submit">
              {isSubmitted
                ? 'Form Submitted'
                : 'Submit Application as Supplier'}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  </>
}

const RegisterPage = () => {
  const router = useRouter();
  const [userRole, setUserRole] = React.useState('individual');

  React.useEffect(() => {
    const queryRole = router.query.role as string;
    if (['supplier', 'individual', 'corporate'].includes(queryRole)) {
      setUserRole(queryRole)
    } else {
      setUserRole('individual')
    }
  }, [router.query.role]);

  if (userRole === 'supplier') {
    return <Register4Supply />
  }
  else return <Register4Redeem userRole={userRole} setUserRole={setUserRole} />
}

export default RegisterPage;