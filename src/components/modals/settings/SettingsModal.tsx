import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { MdVpnKey } from "react-icons/md";
import { TbNetwork, TbUserCircle } from "react-icons/tb";
import { KeysTab } from "./KeysTab";
import { ProfileTab } from "./ProfileTab";
import { RelaysTab } from "./RelaysTab";

export type SettingsModalProps = {
  title: string;
} & PropsWithChildren;

export const SettingsModal = (props: SettingsModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box onClick={onOpen}>
      {props.children}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="dark" color="accent">
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant="unstyled" colorScheme="whiteAlpha">
              <TabList gap="2">
                <Tab
                  fontSize="sm"
                  gap="2"
                  _selected={{ bg: "darkish", borderRadius: "full" }}
                >
                  <TbUserCircle /> Profile
                </Tab>
                <Tab
                  fontSize="sm"
                  gap="2"
                  _selected={{ bg: "darkish", borderRadius: "full" }}
                >
                  <MdVpnKey /> Keys
                </Tab>
                <Tab
                  fontSize="sm"
                  gap="2"
                  _selected={{ bg: "darkish", borderRadius: "full" }}
                >
                  <TbNetwork /> Relays
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ProfileTab onClose={onClose} />
                </TabPanel>
                <TabPanel>
                  <KeysTab onClose={onClose} />
                </TabPanel>
                <TabPanel>
                  <RelaysTab onClose={onClose} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SettingsModal;
