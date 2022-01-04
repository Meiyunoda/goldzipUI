import { Divider, HStack, Text } from "@chakra-ui/react";
import React from "react";

const DividerWithText = ({ label = 'OR' }) => (
  <HStack>
    <Divider />
    <Text as={'span'} fontWeight={'medium'}>
      {label}
    </Text>
    <Divider />
  </HStack>
);

export default DividerWithText;