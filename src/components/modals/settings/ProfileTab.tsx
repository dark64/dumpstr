import { Button, Flex, FormControl, Input } from "@chakra-ui/react";
import { dateToUnix, useNostr } from "nostr-react";
import { Event, getEventHash, Kind, signEvent } from "nostr-tools";
import { useKeypair } from "../../../stores/keypair";
import { useMetadataStore } from "../../../stores/metadata";
import { shallow } from "zustand/shallow";

type FormData = {
  name: { value: string };
  about: { value: string };
  picture: { value: string };
  nip05: { value: string };
};

export type ProfileTabProps = {
  onClose: () => void;
};

export const ProfileTab = (props: ProfileTabProps) => {
  const keypair = useKeypair((state) => state.keypair);
  const [metadata, saveMetadata] = useMetadataStore(
    (state) => [state.metadata[keypair.pk], state.save],
    shallow
  );
  const nostr = useNostr();

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & FormData;

    let metadata = {
      name: target.name.value,
      about: target.about.value,
      picture: target.picture.value,
      nip05: target.nip05.value,
    };

    await saveMetadata(keypair.pk, metadata);

    let event: Event = {
      kind: Kind.Metadata,
      pubkey: keypair.pk,
      content: JSON.stringify(metadata),
      tags: [],
      created_at: dateToUnix(new Date()),
    };

    event.id = getEventHash(event);
    event.sig = signEvent(event, keypair.sk);

    console.log("sending metadata event", event);
    nostr.publish(event);

    props.onClose();
  };

  return (
    <Flex as="form" direction="column" onSubmit={onSubmit} gap="4">
      <FormControl>
        <Input
          name="name"
          defaultValue={metadata?.name}
          fontSize="xs"
          placeholder="Name"
          _placeholder={{ color: "accent", opacity: "0.5" }}
          focusBorderColor="accent"
        />
      </FormControl>
      <FormControl>
        <Input
          name="about"
          defaultValue={metadata?.about}
          fontSize="xs"
          placeholder="About"
          _placeholder={{ color: "accent", opacity: "0.5" }}
          focusBorderColor="accent"
        />
      </FormControl>
      <FormControl>
        <Input
          name="picture"
          defaultValue={metadata?.picture}
          fontSize="xs"
          placeholder="Picture URL"
          _placeholder={{ color: "accent", opacity: "0.5" }}
          focusBorderColor="accent"
        />
      </FormControl>
      <FormControl>
        <Input
          name="nip05"
          defaultValue={metadata?.nip05}
          fontSize="xs"
          placeholder="NIP-05 Identifier"
          _placeholder={{ color: "accent", opacity: "0.5" }}
          focusBorderColor="accent"
        />
      </FormControl>
      <FormControl>
        <Flex justifyContent="center">
          <Button type="submit" fontWeight="normal" fontSize="sm">
            Save & publish
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
};
