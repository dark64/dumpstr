import { Box, Flex, Image, Input, Text } from "@chakra-ui/react";

const mockPeople = [
  {
    pubkey: "2bd7...a5d3",
    name: "pleeeb",
    avatarUrl: "assets/avatar.jpg",
  },
  {
    pubkey: "1b3d...25d3",
    name: "skuller",
    avatarUrl: "assets/avatar.jpg",
  },
  {
    name: "spideygrill",
    pubkey: "45f6...a3cd",
    avatarUrl: "assets/avatar2.jpg",
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
