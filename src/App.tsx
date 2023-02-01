import { Container, Flex, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./App.css";
import Feed from "./components/feed/Feed";
import Logo from "./components/Logo";
import Navigation from "./components/Navigation";
import UserInfo from "./components/UserInfo";
import Utilities from "./components/Utilities";
import { useMetadataStore } from "./stores/metadata";
import { NostrProvider } from "nostr-react";
import { useRelayStore } from "./stores/relays";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const relayUrls = useRelayStore((state) => state.relays);
  const loadMetadata = useMetadataStore((state) => state.load);

  useEffect(() => {
    loadMetadata().then(() => setIsLoaded(true));
  }, []);

  if (!isLoaded) return <></>;

  return (
    <NostrProvider relayUrls={relayUrls} debug={false}>
      <Container maxW="container.lg" as="main" h="full" py="4">
        <VStack h="full">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            w="full"
            mb="2"
            position="relative"
          >
            <Logo />
            <UserInfo />
          </Flex>
          <Flex gap="32px" h="full" w="full" minH="0">
            <Navigation />
            <Feed />
            <Utilities />
          </Flex>
        </VStack>
      </Container>
    </NostrProvider>
  );
}

export default App;
