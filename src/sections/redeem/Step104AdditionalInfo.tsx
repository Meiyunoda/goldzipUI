
import { Box, Button, FormLabel, Radio, RadioGroup, Stack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { DatePicker } from "baseui/datepicker";
import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/client';
import React from "react";
import { useSWRConfig } from 'swr';
import { ChakraField } from '../../components';


const flowStep = 104;
const Step104AdditionalInfo = ({ ticket100, ticket103, ticket104, isEditable }) => {
  // const [isEditing, setIsEditing] = React.useState(true);
  const [auth, isAuthLoading] = useSession();
  const { mutate } = useSWRConfig();
  const toast = useToast();

  return <Box>
    {/* <Button leftIcon={<EditIcon />} onClick={() => setIsEditing(e => !e)}>Edit Info</Button> */}

    <Formik
      initialValues={{
        goldbarQuantity: ticket100?.data?.goldbarQuantity,
        pickUpBy: ticket100?.data?.pickUpBy,
        pickUpDate: ticket100?.data?.pickUpDate,
        ...ticket104?.data,
      }}
      onSubmit={async (values, actions) => {
        try {
          Array(values.goldbarQuantity).fill(null).forEach((_, i) => {
            if (!values[`goldbar${i}`]) {
              toast({
                title: `Gold bar #${i} is not selected yet`,
                status: "error",
              });
              return;
            }
          });

          if (ticket104) {
            await axios.post('/ticket/update', 
            { id: ticket104?._id, update: { ...ticket104, data: values } }, 
            {headers: {'Authorization': auth?.accessToken}})

          } else {
            const req = await axios.post(`/ticket/create`, {
              type: flowStep,
              data: values,
              goldzipId: ticket100.goldzipId,
              email: auth?.user?.email,
            }, {headers: {'Authorization': auth?.accessToken}});
          }
          mutate(`/ticket/getAllTickets?email=${auth?.user?.email}`)

          toast({
            title: 'OK',
            status: "success",
          });
        } catch (e) {
          toast({
            title: JSON.stringify(e),
            status: "error",
          })
        }
        actions.setSubmitting(false);
      }}
    >
      {(formikProps) => (
        <Form>
          <Stack spacing="6">
            <RadioGroup isDisabled={!isEditable} onChange={(v) => formikProps.setFieldValue('pickUpBy', v)} value={formikProps.values.pickUpBy}>
              <Stack direction="row">
                <Radio value="selfPickUp">self Pick Up </Radio>
                {/* <Radio value="byRepresentative">Pick Up By Representative</Radio>
                <Radio value="bySecurityService">Pick Up By SecurityService</Radio> */}
              </Stack>
            </RadioGroup>

            <FormLabel>Pick Up Date</FormLabel>
            <DatePicker
              disabled={!isEditable}
              value={new Date(formikProps.values?.pickUpDate)}
              onChange={({ date }) => formikProps.setFieldValue('pickUpDate', date)}
              minDate={new Date()}
              formatString="yyyy-MM-dd"
            />

            <ChakraField name={'goldbarQuantity'} label={'Amount of Gold Redeem (kg)'} inputType={'number'} inputRest={{ isReadOnly: !isEditable }} />

            <FormLabel>Please select the actual gold bar</FormLabel>
            {Array(formikProps.values.goldbarQuantity).fill(null).map((d, i) => { // todo: get real gold pic from inventory

              return <RadioGroup key={i} isDisabled={!isEditable}
                onChange={(v) => formikProps.setFieldValue(`goldbar${i}`, v)}
                value={formikProps.values[`goldbar${i}`]}
              >
                <Stack direction="row">
                  <Radio value={'123'}>
                    <img src={'https://media.istockphoto.com/photos/gold-bar-picture-id170027907'} />
                  </Radio>
                  <Radio value={'124'}>
                    <img src={'https://media.istockphoto.com/photos/gold-bar-picture-id170027907'} />
                  </Radio>
                  <Radio value={'125'}>
                    <img src={'https://media.istockphoto.com/photos/gold-bar-picture-id170027907'} />
                  </Radio>
                </Stack>
              </RadioGroup>
            })}

            {isEditable && <Button colorScheme="blue" isLoading={formikProps.isSubmitting} type="submit">
              Confirm Information
            </Button>}
          </Stack>
        </Form>
      )}
    </Formik >
  </Box>
}


export default Step104AdditionalInfo;