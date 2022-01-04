import { Box, Text, SimpleGrid } from '@chakra-ui/react'

const GreyBox = ({ title, content }) => {
    return <Box backgroundColor={'grey'} color={"#F7F8F8"} borderRadius={'10px'} p={5}>
        <Text fontSize={"2xl"}>{title}</Text>
        {content.map((c, i) => {
            return <Text key={i}>{c}</Text>
        })}
    </Box>
};

const AboutUs = () => {
    const data = [
        {
            title: 'What is GoldZIP Blockchain?',
            content: [
                'GoldZIP is a Gold-backed token supported by quality gold bars. GoldZIP deployed on an enterprise-grade Blockchain. Registered Holder of GoldZIP has the right to redeem gold bars from the vault',
                'GoldZIP is minted when members deposit physical Gold Bars into the Hong Kong vault.'
            ],
        },
        {
            title: 'What is the source of Gold Bar?',
            content: [
                'Gold Bars are deposit by CGSE members (reputable Gold refinery or gold merchant). Member’s gold bars will be assayed by Hong Kong Precious Metal Assay Centre before enter the vault'
            ]
        },
        {
            title: 'Who manages GoldZIP?',
            content: [
                'GoldZIP is managed, operated, and governed by GoldZIP Pte Ltd, a wholly-owned subsidiary of CGSE in Singapore'
            ]
        },
        {
            title: 'What is the cost of transfer for GoldZIP?',
            content: [
                'For GoldZIP holders to transfer the Gold tokens on blockchain, there will be a fee charged by the operator at around 0.1% (subject to future announcement).'
            ]
        },
        {
            title: 'How can I participate in GoldZIP',
            content: [
                'Blockchain?? (seek legal advice to mention such term on website)'
            ]
        }
    ]

    return <Box p={4} id={"about-us"} data-aos="fade-up">
        <Text variant={"gold-title"}>About Us</Text>
        <Text p={4}>About GoldZip Blockchain by Chinese Gold & Silver Exchange CGSE</Text>

        <SimpleGrid columns={[1, null, 2]} spacing="20px" p={4}>
            {data.map(({ title, content }, i) => <GreyBox key={i} title={title} content={content} />)}
        </SimpleGrid>
    </Box>
}

export default AboutUs;