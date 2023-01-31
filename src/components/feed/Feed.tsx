import { Button, Flex, Heading, Text, Textarea } from "@chakra-ui/react";
import { dateToUnix, useNostr } from "nostr-react";
import { Event, getEventHash, Kind, signEvent } from "nostr-tools";
import { useState } from "react";
import { MdSend } from "react-icons/md";
import { useKeypair } from "../../stores/keypair";
import MessageList from "./MessageList";

function Feed() {
  const [currentFilter, setCurrentFilter] = useState("global");
  const keypair = useKeypair((state) => state.keypair);
  const nostr = useNostr();

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & { content: { value: string } };
    const content = target.content.value;
    target.content.value = "";

    let event: Event = {
      kind: Kind.Text,
      pubkey: keypair.pk,
      content,
      tags: [],
      created_at: dateToUnix(new Date()),
    };

    event.id = getEventHash(event);
    event.sig = signEvent(event, keypair.sk);
    nostr.publish(event);
  };

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
        h="100%"
        gap="4"
        direction="column"
        overflowY="scroll"
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Flex
          as="form"
          onSubmit={onSubmit}
          direction="column"
          borderRadius="md"
          border="1px"
          borderColor="whiteAlpha.300"
          _hover={{ borderColor: "accent", outline: "2px solid accent" }}
          transitionDuration="200ms"
        >
          <Textarea
            name="content"
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
            <Button
              variant="ghost"
              borderRadius="full"
              type="submit"
              p="2"
              cursor="pointer"
            >
              <MdSend color="accent" size="24px" />
            </Button>
          </Flex>
        </Flex>
        <MessageList filter={currentFilter} />
      </Flex>
    </Flex>
  );
}

export default Feed;
