import { Box, Flex, Image, Input, Text } from "@chakra-ui/react";

const mockPeople = [
  {
    name: "user1",
    pubkey: "npub1q8a...4zpv",
    avatarUrl: "assets/avatar.jpg",
  },
  {
    name: "user2",
    pubkey: "npub1h9h...q0zy",
    avatarUrl: "assets/avatar.jpg",
  },
  {
    name: "user3",
    pubkey: "npub1nu8...gj4g",
    avatarUrl: "assets/avatar.jpg",
  },
];

function Utilities() {
  return (
    <Flex h="full" w="180px" gap="4" direction="column" flexShrink="0">
      <Input
        fontSize="sm"
        placeholder="Search people"
        _placeholder={{ color: "accent", opacity: "0.5" }}
        focusBorderColor="accent"
      />
      <Text fontWeight="bold">Follows</Text>
      <Flex direction="column" gap="4">
        {mockPeople.map((m, i) => (
          <Flex w="full" gap="4" cursor="pointer" key={i}>
            <Flex minW="32px" direction="column">
              <Image h="32px" w="32px" borderRadius="full" src={m.avatarUrl} />
            </Flex>
            <Flex grow="1" direction="column">
              <Box lineHeight="1.25" mb="2">
                <Text fontWeight="medium">{m.name}</Text>
                <Text opacity="0.5" fontSize="xs">
                  {m.pubkey}
                </Text>
              </Box>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

export default Utilities;
