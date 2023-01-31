import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { getPublicKey, nip19 } from "nostr-tools";
import { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { useKeypair } from "../../../stores/keypair";

export type KeysTabProps = {
  onClose: () => void;
};

export const KeysTab = (props: KeysTabProps) => {
  const keypairStore = useKeypair();
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [privateKey, setPrivateKey] = useState(keypairStore.keypair.sk);
  const [publicKey, setPublicKey] = useState(keypairStore.keypair.pk);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    keypairStore.save({ sk: privateKey, pk: publicKey });
    props.onClose();
  };

  const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let sk = e.currentTarget.value;
    setPrivateKey(sk);
    setPublicKey(sk.length == 64 ? getPublicKey(sk) : "");
  };

  return (
    <Flex as="form" direction="column" onSubmit={onSubmit} gap="4">
      <Text fontSize="xs" opacity="0.5">
        Posts are published using your private key. Others can see your posts or
        follow you using only your public key.
      </Text>
      <FormControl>
        <FormLabel fontSize="xs">Private key</FormLabel>
        <InputGroup size="md">
          <Input
            name="privateKey"
            type={showPrivateKey ? "text" : "password"}
            fontSize="xs"
            placeholder="Private key"
            onChange={onChange}
            value={privateKey}
            _placeholder={{ color: "accent", opacity: "0.5" }}
            focusBorderColor="accent"
            required={true}
            pattern="[0-9a-fA-F]+"
            minLength={64}
            maxLength={64}
          />
          <InputRightElement
            cursor="pointer"
            onClick={() => setShowPrivateKey(!showPrivateKey)}
          >
            <MdRemoveRedEye />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel fontSize="xs">Public key</FormLabel>
        <Input
          fontSize="xs"
          readOnly={true}
          placeholder="Public key"
          value={publicKey !== "" ? nip19.npubEncode(publicKey) : ""}
          _placeholder={{ color: "accent", opacity: "0.5" }}
          focusBorderColor="accent"
        />
      </FormControl>
      <FormControl>
        <Flex justifyContent="center">
          <Button type="submit" fontWeight="normal" fontSize="sm">
            Save keys
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
};
