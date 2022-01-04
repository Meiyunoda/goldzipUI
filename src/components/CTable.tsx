import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

export const ValidURL = (str) => {
  const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  return regex.test(str);
};

const CTable = ({ columns, data }) => <Table size="sm">
  <Thead>
    <Tr>
      {columns.map((c, i) => <Th key={i}>{c}</Th>)}
    </Tr>
  </Thead>
  <Tbody>
    {data.map((d, i) => <Tr key={i}>
      {d.map((dd, ii) => <Td key={ii}>
        {ValidURL(dd)
          ? <Box as={'a'} textDecoration={'underline'} href={dd} target="_blank">
            open <ExternalLinkIcon />
          </Box>
          : dd}
      </Td>)}
    </Tr>)}
  </Tbody>
</Table>;

export default CTable;