import {
  Button,
  Flex,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { ImBin } from "react-icons/im";
import { useRelayStore } from "../../../stores/relays";

export type RelaysTabProps = {
  onClose: () => void;
};

export const RelaysTab = (props: RelaysTabProps) => {
  const relayStore = useRelayStore();
  const [relays, setRelays] = useState([...relayStore.relays]);
  const [relayUrl, setRelayUrl] = useState("");

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    relayStore.save(relays);
    props.onClose();
  };

  const onChange = (
    e: React.SyntheticEvent<HTMLInputElement>,
    index: number
  ) => {
    let newRelays = [...relays];
    newRelays[index] = e.currentTarget.value;
    setRelays(newRelays);
  };

  const onRestore = () => {
    setRelays(relayStore.restore());
  };

  return (
    <Flex as="form" gap="4" direction="column" onSubmit={onSubmit}>
      {relays.map((r, i) => (
        <InputGroup size="md" key={i}>
          <Input
            value={r}
            onChange={(e) => onChange(e, i)}
            fontSize="xs"
            focusBorderColor="accent"
            pattern="^wss:\/\/(.*)$"
            pr="2.5rem"
            required={true}
          />
          <InputRightElement width="2.5rem">
            <IconButton
              size="xs"
              aria-label="Delete a relay"
              icon={<ImBin />}
              onClick={() => {
                let newRelays = [...relays];
                newRelays.splice(i, 1);
                setRelays(newRelays);
              }}
            />
          </InputRightElement>
        </InputGroup>
      ))}
      <FormControl>
        <InputGroup size="md">
          <Input
            value={relayUrl}
            onChange={(e) => setRelayUrl(e.currentTarget.value)}
            placeholder="Add a relay"
            fontSize="xs"
            focusBorderColor="accent"
            pr="2.5rem"
            pattern="^wss:\/\/(.*)$"
          />
          <InputRightElement width="2.5rem">
            <IconButton
              size="xs"
              aria-label="Add a relay"
              icon={<GoPlus />}
              onClick={() => {
                setRelays([...new Set([...relays, relayUrl])]);
                setRelayUrl("");
              }}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <Flex justifyContent="end">
          <Flex gap="2" direction="row">
            <Button
              variant="ghost"
              fontWeight="normal"
              fontSize="xs"
              opacity="0.5"
              onClick={onRestore}
            >
              Restore defaults
            </Button>
            <Button type="submit" fontWeight="normal" fontSize="sm">
              Save
            </Button>
          </Flex>
        </Flex>
      </FormControl>
    </Flex>
  );
};
