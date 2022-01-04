import { Button, Flex, Input, useClipboard } from "@chakra-ui/react";
import React from "react";

const Copy2Clipboard = ({ value }) => {
  const { hasCopied, onCopy } = useClipboard(value)

  return (
    <Flex>
      <Input value={value} isReadOnly />
      <Button onClick={onCopy} ml={2}>
        {hasCopied ? "Copied" : "Copy"}
      </Button>
    </Flex>
  )
}

export default Copy2Clipboard;