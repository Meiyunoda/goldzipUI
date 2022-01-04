import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { agreeConsent } from "../components/ConsentModal";


const TermsAndConditionsPage = () => {
  const router = useRouter();

  return <>
    <Text>
      Agree to the terms and conditions before using GoldZip services.
    </Text>

    <br />
    <Button colorScheme={'blue'} onClick={() => {
      agreeConsent();
      router.push('/');
    }}>Agree Terms And Conditions</Button>
  </>
}

export default TermsAndConditionsPage;