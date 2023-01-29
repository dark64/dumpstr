import { Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import MessageList from "./MessageList";

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
      <MessageList filter={currentFilter} />
    </Flex>
  );
}

export default Feed;
