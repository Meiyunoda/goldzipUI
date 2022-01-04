import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import React from "react";

const Protocol = () => {

    return <Box id={"protocol"} p={4} data-aos="fade-up">
        <Text variant={"gold-title"}>Protocol</Text>
        <Text p={4} width={{ base: '100%', md: '30%' }}>GoldZIP is running on VSYS, an enterprise graded Blockchain solution that supports the efficient and agile development of decentralized applications.</Text>

        <SimpleGrid columns={{ md: 2, base: 1 }} p={4} alignItems={"center"} justifyItems={"center"}>
            <Box>
                <Text variant={'bold'}>
                    Why GoldZIP uses VSYS Blockchain Solution?
                </Text>
                <Text>
                    Consensus mechanism enables a lower energy consumption compared with other protocols.
                </Text>
            </Box>
            <img src="/sections/protocol-img.svg" />

        </SimpleGrid>
    </Box>
}

export default Protocol;