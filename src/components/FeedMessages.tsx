import { Box, Flex, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import { dateToUnix, useNostrEvents } from "nostr-react";
import { useRef } from "react";
import Loader from "./Loader";

export type FeedMessagesProps = {
  filter: string;
};

function FeedMessages(props: FeedMessagesProps) {
  const now = useRef(new Date()); // make sure current time isn't re-rendered

  const { events, isLoading } = useNostrEvents({
    filter: {
      since: dateToUnix(now.current), // all new events from now
      kinds: [1],
    },
  });

  if (isLoading || events.length == 0)
    return <Loader displayText="waiting for data" />;

  return (
    <Flex
      direction="column"
      gap="6"
      overflowY="scroll"
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {events.map((e, i) => (
        <Flex w="full" gap="4" key={i} minW="0">
          <Flex minW="32px" direction="column" cursor="pointer">
            <Image
              h="32px"
              w="32px"
              borderRadius="full"
              src="assets/avatar.jpg"
            />
          </Flex>
          <Flex grow="1" direction="column" minW="0">
            <Flex justifyContent="space-between">
              <Box lineHeight="1.25" mb="2" cursor="pointer">
                <Text fontWeight="medium">anonymous</Text>
                <Text opacity="0.5" fontSize="xs">
                  {e.pubkey.substring(0, 4) +
                    "..." +
                    e.pubkey.substring(e.pubkey.length - 4)}
                </Text>
              </Box>
              <Text fontSize="xs" opacity="0.5">
                {moment.unix(e.created_at).fromNow()}
              </Text>
            </Flex>
            <Text>{e.content}</Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}

export default FeedMessages;
