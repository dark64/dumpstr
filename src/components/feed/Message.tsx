import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import moment from "moment";
import { Event } from "nostr-tools";
import { memo } from "react";
import Linkify from "react-linkify";

export type MessageProps = {
  event: Event;
};

export const Message = memo(
  ({ event }: MessageProps) => {
    const MotionFlex = motion(Flex);
    return (
      <MotionFlex
        w="full"
        gap="4"
        minW="0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
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
                {event.pubkey.substring(0, 4) +
                  "..." +
                  event.pubkey.substring(event.pubkey.length - 4)}
              </Text>
            </Box>
            <Text fontSize="xs" opacity="0.5">
              {moment.unix(event.created_at).fromNow()}
            </Text>
          </Flex>
          <Text>
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <Link target="_blank" href={decoratedHref} key={key}>
                  {decoratedText}
                </Link>
              )}
            >
              {event.content}
            </Linkify>
          </Text>
        </Flex>
      </MotionFlex>
    );
  },
  (prev, next) => prev.event.id === next.event.id
);
