import { Flex } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { dateToUnix, useNostrEvents } from "nostr-react";
import { Kind } from "nostr-tools";
import { useRef } from "react";
import { useMetadataStore } from "../../stores/metadata";
import Loader from "../Loader";
import { Message } from "./Message";

export type FeedMessagesProps = {
  filter: string;
};

export const MessageList = (props: FeedMessagesProps) => {
  const now = useRef(new Date()); // make sure current time isn't re-rendered
  const saveMetadata = useMetadataStore((state) => state.save);

  const { events, isLoading, onEvent } = useNostrEvents({
    filter: {
      since: dateToUnix(now.current) - 60, // all new events from now
      kinds: [Kind.Metadata, Kind.Text],
      limit: 20,
    },
  });

  onEvent((e) => {
    if (e.kind === Kind.Metadata) saveMetadata(e.pubkey, JSON.parse(e.content));
  });

  if (isLoading || events.length == 0)
    return <Loader displayText="waiting for data" />;

  return (
    <Flex direction="column" gap="6">
      <AnimatePresence>
        {events
          .filter((e) => e.kind === Kind.Text)
          .map((e) => (
            <Message event={e} key={e.id} />
          ))}
      </AnimatePresence>
    </Flex>
  );
};

export default MessageList;
