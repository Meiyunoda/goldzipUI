import { Box, SimpleGrid, Text } from '@chakra-ui/layout';
import React from 'react';


const Feature = () => {
    const [textSelected, setTextSelected] = React.useState(1)
    const text = [
        {
            title: '100% fully backed and redeemable with physical gold in the vault, managed by CGSE',
            content: '100% fully backed and redeemable with physical gold in the vault, managed by CGSE'
        },
        {
            title: '24/7 real time transfer for GoldZIP Tokens',
            content: 'No matter how small or how big the size. Mint token and transfer to other parties with ease.'
        },
        {
            title: 'Blockchain transaction with traceable record that is transparent and cannot be override. ',
            content: 'Enterprise blockchain record and real-time storage transaction record cannot be altered or compromised retrospectively.'
        }
    ];


    return <Box p={4} id={"feature"} data-aos="fade-up">
        <Text variant={"gold-title"}>Features</Text>

        <SimpleGrid columns={[1, null, 2]} spacing="20px" p={4} alignItems={'center'} justifyItems={'center'}>
            <Box>
                {text.map(({ title, content }, i) => {
                    return <Box
                                key={i}
                                onClick={() => setTextSelected(i)}
                                bgColor={i === textSelected ? 'grey' : ''}
                                border={'1px solid grey'}
                                borderRadius={'10px'}
                                p={4}
                                my={4}
                            >
                        <Text fontSize={20}>{title}</Text>
                        <Text fontSize={16}>{content}</Text>
                    </Box>
                })}
            </Box>
            <img src={`/sections/feature-img-${textSelected}.svg`} />
        </SimpleGrid>
    </Box>
}

export default Feature;