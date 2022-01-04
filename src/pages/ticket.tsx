import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Divider, Spinner, Tag } from '@chakra-ui/react';
import axios from 'axios';
import { Breadcrumbs } from "baseui/breadcrumbs";
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, VerticalTable as Table } from '../components';
import { ticketStatus, ticketTypes } from "../utils/constants";


export const RenderTicket = ({ ticket = [] }) => ticket
  ? <>{
    ticket.map((t, i) => {
      if (!t.data) return;
      const columns = Object.keys(t.data);
      const data = Object.values(t.data);
      const objInData = data.some(d => typeof d === 'object');

      const { objArr, notObjArr } = Object.entries(t.data).reduce((acc, [k, v]) => {
        if (_.isObject(v)) {
          acc.objArr.push(k)
        } else {
          acc.notObjArr.push(k)
        }
        return acc;
      }, { objArr: [], notObjArr: [] });

      const objArr1 = _.pick(t.data, objArr);  // object of t.data which value is object
      const objArr1Values = Object.values(objArr1);
      const objArr2 = _.pick(t.data, notObjArr);  // object of t.data which value is not object

      return <Box key={i}>
        <Tag size={'md'} variant="solid" colorScheme="teal">
          {t.type}: {ticketTypes[t.type]} ({ticketStatus[t.status]}) @{t?.createdAt}
        </Tag>

        {objInData
          ? <>
            {objArr.length && <Table columns={objArr1Values.map(d => Object.keys(d))[0]} data={objArr1Values.map(d => Object.values(d))} />}
            {notObjArr.length && <Table columns={Object.keys(objArr2)} data={[Object.values(objArr2)]} />}
          </>
          : <Table columns={columns} data={[data]} />}
        <br />
        <br />
      </Box>
    })
  }</> : null;

const RenderTickets = ({ tickets = {} }) => Object.keys(tickets).length
  ? <Box>
    {Object.entries(tickets).map(([supplierEmail, ticket], i) => {
      return <Accordion allowMultiple key={supplierEmail}>
        <AccordionItem key={i}>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {supplierEmail}
            </Box>
            <Tag size={'md'} variant="solid" colorScheme="teal" textAlign="right">
              {ticket[0].type}: {ticketTypes[ticket[0].type]}
            </Tag>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel >
            {/* @ts-ignore */}
            <RenderTicket ticket={ticket} />

          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    })}
  </Box>
  : <Spinner />

const TicketPage = () => {
  const [tickets, setTickets] = useState({});

  useEffect(() => {
    axios.get(`/ticket/getAllTickets`)
      .then((res) => {
        const sortedTickets = res.data.reduce((acc, cur, i) => {
          const applicationType = parseInt(cur.type) < 100 ? 'supply' : 'redeem';
          if (!acc[applicationType][cur.email]) {
            acc[applicationType][cur.email] = []
          }
          acc[applicationType][cur.email] = [...acc[applicationType][cur.email], cur];

          return acc;
        }, {
          supply: {}, redeem: {}
        });
        setTickets(sortedTickets);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  if (Object.keys(tickets).length === 0) return <Spinner />;

  return (
    <Box>
      <Breadcrumbs>
        <Link href="/register">100: New supplier Application</Link>
        <Link>101: Auto Check if Kyc fee is paid</Link>
        <Link href="/kyc-aml">102: Submit user info to KYC agent, KYC Agent provide risk level</Link>
        <Link href="/validator">103: User on boarded</Link>
        <Link href={'/redeem'}>104: User finalize collection information</Link>
        <Link href={'/redeem'}>105: User send back Goldzip + Redemption fee</Link>
        <Link>106: Auto Check if Goldzip + Redemption fee is paid</Link>
        <Link href="/validator">107: Gold Transfer from operator vault to issuer, withdraw form to issuer</Link>
        <Link href="/validator">108: Gold is in stock out status, waiting for the pickup</Link>
        <Link href="/validator">109: GZ burn and User off boarding</Link>
      </Breadcrumbs>
      <br />
      {/* @ts-ignore */}
      <RenderTickets tickets={tickets.redeem} />

      <br />
      <Divider />
      <br />


      <Breadcrumbs>
        <Link href="/register?role=supplier">0: New supplier Application</Link>
        <Link href="/assay">0.1: Select dates for supplier to deposit goldbar</Link>
        <Link href="/cgse">1: CGSE Prepare Member Information</Link>
        <Link href="/kyc-aml">2: User KYC/AML Check</Link>
        <Link href="/validator">3: Supplier on board approval and create/ enable account</Link>
        <Link href="/supply/new">4: Supplier Complete Deposit ticket</Link>
        <Link href="/validator">5: Validators sign off the deposit form</Link>
        <Link href="/assay">6: Confirm gold received and conduct inspection in operator vault</Link>
        <Link href="/validator">7: Validators sign off the withdraw form </Link>
        <Link href="/assay">8: Gold Bar Sample assay result</Link>
        <Link href="/validator">9: Validators sign off the deposit & Transfer form</Link>
        <Link href="/validator">10: GZ mint and send, Off boarding supplier</Link>
      </Breadcrumbs>
      <br />
      {/* @ts-ignore */}
      <RenderTickets tickets={tickets.supply} />
    </Box>
  )
}

export default TicketPage;