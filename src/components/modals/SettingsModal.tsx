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
import { dateToUnix, useNostr } from "nostr-react";
import { Event, getEventHash, Kind, signEvent } from "nostr-tools";
import { PropsWithChildren, useState } from "react";
import { MdRemoveRedEye, MdVpnKey } from "react-icons/md";
import { createKeypair, useKeypair } from "../../stores/keypair";
import { useMetadataStore } from "../../stores/metadata";

export type SettingsModalProps = {
  title: string;
} & PropsWithChildren;

type FormData = {
  name: { value: string };
  about: { value: string };
  picture: { value: string };
  nip05: { value: string };
  privateKey: { value: string };
};

export const SettingsModal = (props: SettingsModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const keypairStore = useKeypair();
  const metadataStore = useMetadataStore();
  const nostr = useNostr();

  const currentMetadata = metadataStore.metadata[keypairStore.keypair.pk];

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & FormData;

    const keypair = createKeypair(target.privateKey.value);
    keypairStore.save(keypair);

    let metadata = {
      name: target.name.value,
      about: target.about.value,
      picture: target.picture.value,
      nip05: target.nip05.value,
    };

    await metadataStore.save(keypair.pk, metadata);

    let event: Event = {
      kind: Kind.Metadata,
      pubkey: keypair.pk,
      content: JSON.stringify(metadata),
      tags: [],
      created_at: dateToUnix(new Date()),
    };

    event.id = getEventHash(event);
    event.sig = signEvent(event, keypair.sk);

    console.log("sending metadata event", event);
    nostr.publish(event);

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
                        defaultValue={currentMetadata?.name}
                        fontSize="xs"
                        placeholder="Name"
                        _placeholder={{ color: "accent", opacity: "0.5" }}
                        focusBorderColor="accent"
                      />
                    </FormControl>
                    <FormControl mb="2">
                      <Input
                        name="about"
                        defaultValue={currentMetadata?.about}
                        fontSize="xs"
                        placeholder="About"
                        _placeholder={{ color: "accent", opacity: "0.5" }}
                        focusBorderColor="accent"
                      />
                    </FormControl>
                    <FormControl mb="2">
                      <Input
                        name="picture"
                        defaultValue={currentMetadata?.picture}
                        fontSize="xs"
                        placeholder="Picture URL"
                        _placeholder={{ color: "accent", opacity: "0.5" }}
                        focusBorderColor="accent"
                      />
                    </FormControl>
                    <FormControl mb="2">
                      <Input
                        name="nip05"
                        defaultValue={currentMetadata?.nip05}
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
                          defaultValue={keypairStore.keypair.sk}
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
                        defaultValue={keypairStore.keypair.pk}
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
