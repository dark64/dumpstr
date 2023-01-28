import { Flex, Text } from "@chakra-ui/react";
import {
    MdMessage,
    MdOutlineNotificationsNone,
    MdRssFeed
} from "react-icons/md"; // MdOutlineNotificationsActive

function Navigation() {
  return (
    <Flex h="full" direction="column" alignItems="end" w="160px" gap="2" flexShrink="0">
      <Flex alignItems="center" gap="2" cursor="pointer">
        <Text fontWeight="bold">Feed</Text>
        <MdRssFeed size="20px" />
      </Flex>
      <Flex alignItems="center" gap="2" cursor="pointer">
        <Text>Notifications</Text>
        <MdOutlineNotificationsNone size="20px" />
      </Flex>
      <Flex alignItems="center" gap="2" cursor="pointer">
        <Text>Messages</Text>
        <MdMessage size="20px" />
      </Flex>
    </Flex>
  );
}

export default Navigation;
