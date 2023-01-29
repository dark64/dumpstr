import { Box, Flex, Heading, Input, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import MessageList from "./MessageList";
import { MdSend } from "react-icons/md";

function Feed() {
  const [currentFilter, setCurrentFilter] = useState("global");
  return (
    <Flex direction="column" h="full" gap="4" grow="1" minW="0">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading>Feed</Heading>
        <Flex gap="4">
          {["global", "follows", "bots"].map((filter, i) => {
            let props =
              currentFilter === filter
                ? {
                    fontWeight: "bold",
                    opacity: "1",
                  }
                : { opacity: "0.5" };
            return (
              <Text
                {...props}
                cursor="pointer"
                onClick={() => setCurrentFilter(() => filter)}
                key={i}
              >
                {filter}
              </Text>
            );
          })}
        </Flex>
      </Flex>
      <Flex
        direction="column"
        borderRadius="md"
        border="1px"
        borderColor="darkish"
        _hover={{ borderColor: "accent", outline: "2px solid accent" }}
        transitionDuration="200ms"
      >
        <Textarea
          p="2"
          w="100%"
          placeholder="What's on your mind?"
          outline="none"
          resize="none"
          border="none"
          focusBorderColor="transparent"
        />
        <Flex justifyContent="space-between" alignItems="end" p="2">
          <Text
            fontSize="xs"
            opacity="0.5"
            cursor="pointer"
            _hover={{ opacity: "1" }}
            transitionDuration="200ms"
          >
            help
          </Text>
          <Box p="1" cursor="pointer">
            <MdSend color="accent" size="24px" />
          </Box>
        </Flex>
      </Flex>
      <MessageList filter={currentFilter} />
    </Flex>
  );
}

export default Feed;
