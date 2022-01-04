import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Table, Tbody, Td, Tr } from "@chakra-ui/react";
import { isArray } from 'lodash';
import React from "react";
import { ValidURL } from "./CTable";


const VerticalTable = ({ columns = [], data = [] }) => {
  // object keys in data should be the same as the elements in columns
  // column = ['a','b']
  // data can be [{a:1,b:2},{a:3,b:4}]
  // or data can be [[1,2],[3,4]]
  // or mix with them [[1,2],{a:1,b:2}]

  return <Table variant="simple">
    <Tbody>
      {columns.map((col, coli) => {
        return <Tr key={coli}>
          <Td>{col.replace(/([A-Z]+)/g, ' $1').replace('CGSE', 'CGSE ').replace('ID', 'ID ').toUpperCase()}</Td>
          {data.map((d, di) => {
            const k = isArray(d) ? coli : col;
            return <Td key={di}>
              {ValidURL(d[k])
                ? <Box as={'a'} textDecoration={'underline'} href={d[k]} target="_blank">
                  open <ExternalLinkIcon />
                </Box>
                : <Box>{d[k]}</Box>}
            </Td>;
          })}
        </Tr>
      })}
    </Tbody>
  </Table>
};

export default VerticalTable;