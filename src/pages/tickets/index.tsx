import { CloseIcon } from '@chakra-ui/icons';
import { Button, HStack, IconButton, Input, Stack, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from 'axios';
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ChakraField, ImageUpload } from "../../components";
import { ticketStatus, ticketTypes } from "../../utils/constants";
import { camelize } from '../../utils/fn';

const TicketForm = ({ ticket }) => {
  const [newFields, setNewFields] = React.useState([]);
  const [newVal, setNewVal] = React.useState('');

  return <Tr>
    <Td />

    <Td>
      <Formik
        initialValues={{
        }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values))

          axios.post(`/ticket/create`, {
            type: parseInt(ticket.type) + 1,
            data: { previousTicket: ticket._id, ...values }
          })
          actions.setSubmitting(false);
        }}
      >
        {(formikProps) => (
          <Form>
            <Stack spacing="6">
              {newFields.map(({ val, type }, i) => <HStack alignItems={'end'} key={i}>
                {type === 'text' && <ChakraField name={camelize(val)} label={val} />}

                {type === 'file' && <ImageUpload
                  name={camelize(val)} label={val}
                  onChange={(url: string) => formikProps.setFieldValue(camelize(val), url)}
                />}

                <IconButton aria-label="delete field" icon={<CloseIcon />} onClick={() => {
                  setNewFields(newFields.filter(({ val: v }) => v !== val));
                  formikProps.setFieldValue(camelize(val), undefined)
                }} />
              </HStack>)}

              <Button colorScheme="blue" isLoading={formikProps.isSubmitting} type="submit">
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik >
    </Td>
    <Td>
      <Stack spacing="6">
        <Input value={newVal} onChange={e => setNewVal(e.target.value)} placeholder={'new field'} />
        <Button isDisabled={!newVal} onClick={() => {
          if (!newVal) return;
          setNewFields(f => [...f, { val: newVal, type: 'text' }]);
          setNewVal('')
        }}>
          Add Text Field
        </Button>

        <Button isDisabled={!newVal} onClick={() => {
          if (!newVal) return;
          setNewFields(f => [...f, { val: newVal, type: 'file' }]);
          setNewVal('')
        }}>
          Add File Field
        </Button>
      </Stack>
    </Td>

    <Td>
      <Button colorScheme="red">
        Reject
      </Button>
    </Td>
  </Tr>
}

const tickets = () => {
  const [tickets, setTickets] = useState(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    axios.get(`/ticket/getAllTickets`)
      .then((res) => {
        setTickets(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <Table variant="simple" mt="4" size="sm">
      <Thead>
        <Tr>
          <Th>Ticket Type</Th>
          <Th>Data</Th>
          <Th>Status</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {tickets &&
          tickets.map((ticket) => {
            return <React.Fragment key={ticket._id}>
              <Tr>
                <Td>
                  {ticketTypes[ticket.type]}
                </Td>
                <Td>
                  <pre style={{ overflow: 'scroll', maxWidth: "30vw" }}>
                    {JSON.stringify(ticket.data, undefined, 4)}
                  </pre>
                </Td>
                <Td>
                  {ticketStatus[ticket.status]}
                </Td>
                <Td>
                  <Button colorScheme="blue" onClick={() => setExpanded(ticket._id)}>Actions</Button>
                </Td>
              </Tr>
              {(expanded && ticket._id == expanded) &&
                <TicketForm ticket={ticket} />
              }
            </React.Fragment>
          })}
      </Tbody>
    </Table >
  )
}

export default tickets