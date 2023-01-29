import { Flex } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { dateToUnix, useNostrEvents } from "nostr-react";
import { useRef } from "react";
import Loader from "../Loader";
import { Message } from "./Message";

export type FeedMessagesProps = {
  filter: string;
};

export const MessageList = (props: FeedMessagesProps) => {
  const now = useRef(new Date()); // make sure current time isn't re-rendered

  const { events, isLoading } = useNostrEvents({
    filter: {
      since: dateToUnix(now.current) - 300, // all new events from now
      kinds: [1],
    },
  });

  if (isLoading || events.length == 0)
    return <Loader displayText="waiting for data" />;

  return (
    <Flex direction="column" gap="6">
      <AnimatePresence>
        {events.map((e) => (
          <Message event={e} key={e.id} />
        ))}
      </AnimatePresence>
    </Flex>
  );
};

export default MessageList;
