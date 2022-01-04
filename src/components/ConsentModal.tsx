import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Link } from '.';

export const agreeConsent = () => window.sessionStorage.setItem('isAgreeConsent', '1');

const ConsentModal = () => {
  const router = useRouter();
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })

  const isTermsPage = router.pathname === "/terms-and-conditions";
  const isAgreeConsent = typeof window !== "undefined" && typeof window.sessionStorage.getItem('isAgreeConsent') === 'string'

  if (isAgreeConsent || isTermsPage) {
    return null;
  }

  return <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} closeOnOverlayClick={false}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Terms of use</ModalHeader>
      <ModalBody>
        <Text>
          Agree the
          <Link href={'/terms-and-conditions'} textDecoration={'underline'}>
            Terms and Conditions
          </Link>
          of GoldZip.
        </Text>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={() => {
          router.push('/terms-and-conditions');
        }}>
          Decline
        </Button>

        <Button colorScheme="blue" ml={6} onClick={() => {
          agreeConsent();
          onClose();
        }}>
          Agree
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
}

export default ConsentModal;