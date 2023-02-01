import { Flex, Text } from "@chakra-ui/react";
import { MdOutlineSettings } from "react-icons/md";
import { formatPublicKey, useKeypair } from "../stores/keypair";
import { useMetadataStore } from "../stores/metadata";
import SettingsModal from "./modals/settings/SettingsModal";

export const UserInfo = () => {
  const pk = useKeypair((state) => state.keypair.pk);
  const metadata = useMetadataStore((state) => state.metadata[pk]);
  return (
    <SettingsModal title="Settings">
      <Flex alignItems="center" gap="3" cursor="pointer">
        <Flex direction="column" alignItems="end" lineHeight="1" gap="1">
          <Text fontWeight="bold">{metadata?.name ?? "anonymous"}</Text>
          <Text opacity="50%" fontSize="sm">
            {formatPublicKey(pk).display}
          </Text>
        </Flex>
        <MdOutlineSettings size="32px" />
      </Flex>
    </SettingsModal>
  );
};

export default UserInfo;
