import { Container, Heading, VStack, Flex, Text } from "@chakra-ui/react";
import "./App.css";

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
          <Heading>dumpstr</Heading>
          <Flex direction="column" alignItems="end">
            <Text fontWeight="bold">John</Text>
            <Text opacity="50%">npub123...</Text>
          </Flex>
        </Flex>
        <Flex gap="32px" direction="row" h="full" w="full">
          <Flex h="full" bg="red" minW={"200px"}>
            a
          </Flex>
          <Flex h="full" bg="green" grow={1}>
            b
          </Flex>
          <Flex h="full" bg="blue" minW={"200px"}>
            c
          </Flex>
        </Flex>
      </VStack>
    </Container>
  );
}

export default App;
