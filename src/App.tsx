import { Container, Flex, Text, VStack } from "@chakra-ui/react";
import { MdOutlineSettings } from "react-icons/md";
import "./App.css";
import Feed from "./components/feed/Feed";
import Logo from "./components/Logo";
import Navigation from "./components/Navigation";
import Utilities from "./components/Utilities";

function App() {
  return (
    <Container maxW="container.lg" as="main" h="full" py="4">
      <VStack h="full">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          w="full"
          mb="2"
        >
          <Logo />
          <Flex alignItems="center" gap="2">
            <Flex direction="column" alignItems="end" lineHeight="1" gap="1">
              <Text fontWeight="bold">Test</Text>
              <Text opacity="50%" fontSize="sm">
                npub123...
              </Text>
            </Flex>
            <MdOutlineSettings size="32px" cursor="pointer" />
          </Flex>
        </Flex>
        <Flex gap="32px" h="full" w="full" minH="0">
          <Navigation />
          <Feed />
          <Utilities />
        </Flex>
      </VStack>
    </Container>
  );
}

export default App;
