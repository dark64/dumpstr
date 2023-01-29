import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { PropsWithChildren, useState } from "react";
import { MdRemoveRedEye, MdVpnKey } from "react-icons/md";

export type SettingsModalProps = {
  title: string;
} & PropsWithChildren;

type FormData = {
  name: { value: string };
  about: { value: string };
  pictureUrl: { value: string };
  nip05: { value: string };
  privateKey: { value: string };
};

export const SettingsModal = (props: SettingsModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & FormData;
    const obj = {
      name: target.name.value,
      about: target.about.value,
      pictureUrl: target.pictureUrl.value,
      nip05: target.nip05.value,
      privateKey: target.privateKey.value,
    };
    alert(JSON.stringify(obj, null, 2));
    onClose();
  };

  return (
    <Box onClick={onOpen}>
      {props.children}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="dark" color="accent">
          <form onSubmit={onSubmit}>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody display="flex" gap="4" flexDirection="column">
              <Accordion allowToggle defaultIndex={0}>
                <AccordionItem>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left" fontSize="sm">
                      Profile
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <FormControl mb="2">
                      <Input
                        name="name"
                        fontSize="xs"
                        placeholder="Name"
                        _placeholder={{ color: "accent", opacity: "0.5" }}
                        focusBorderColor="accent"
                      />
                    </FormControl>
                    <FormControl mb="2">
                      <Input
                        name="about"
                        fontSize="xs"
                        placeholder="About"
                        _placeholder={{ color: "accent", opacity: "0.5" }}
                        focusBorderColor="accent"
                      />
                    </FormControl>
                    <FormControl mb="2">
                      <Input
                        name="pictureUrl"
                        fontSize="xs"
                        placeholder="Picture URL"
                        _placeholder={{ color: "accent", opacity: "0.5" }}
                        focusBorderColor="accent"
                      />
                    </FormControl>
                    <FormControl mb="2">
                      <Input
                        name="nip05"
                        fontSize="xs"
                        placeholder="NIP-05 Identifier"
                        _placeholder={{ color: "accent", opacity: "0.5" }}
                        focusBorderColor="accent"
                      />
                    </FormControl>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      <Text
                        fontSize="sm"
                        display="flex"
                        alignItems="center"
                        gap="2"
                      >
                        Your keys <MdVpnKey />
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Text fontSize="xs" opacity="0.5" mb="4">
                      Posts are published using your private key. Others can see
                      your posts or follow you using only your public key.
                    </Text>
                    <FormControl mb="2">
                      <FormLabel fontSize="xs">Private key</FormLabel>
                      <InputGroup size="md">
                        <Input
                          name="privateKey"
                          type={showPrivateKey ? "text" : "password"}
                          fontSize="xs"
                          placeholder="Private key"
                          defaultValue="94ed1e8749fd46abbf44758c18feb8c15a45bf0e91bb0252268deacd90bf2894"
                          _placeholder={{ color: "accent", opacity: "0.5" }}
                          focusBorderColor="accent"
                          required={true}
                        />
                        <InputRightElement
                          cursor="pointer"
                          onClick={() => setShowPrivateKey(!showPrivateKey)}
                        >
                          <MdRemoveRedEye />
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <FormControl mb="2">
                      <FormLabel fontSize="xs">Public key</FormLabel>
                      <Input
                        fontSize="xs"
                        readOnly={true}
                        placeholder="Public key"
                        defaultValue="c5c8ebd5a7a061466c8b5bebbea7053219de3018abb1aca0ba208cc13c502d4d"
                        _placeholder={{ color: "accent", opacity: "0.5" }}
                        focusBorderColor="accent"
                      />
                    </FormControl>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                size="sm"
                opacity="0.5"
                mr="2"
                fontWeight="normal"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                fontWeight="normal"
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SettingsModal;
