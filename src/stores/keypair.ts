import { generatePrivateKey, getPublicKey, nip19 } from "nostr-tools";
import { create } from "zustand";

const LS_KEY = "keys";

export type Keypair = {
  sk: string;
  pk: string;
};

export const createKeypair = (privateKey?: string): Keypair => {
  const sk = privateKey ?? generatePrivateKey();
  const pk = getPublicKey(sk);
  return {
    sk,
    pk,
  };
};

export const getKeypair = (): Keypair => {
  const keys = localStorage.getItem(LS_KEY);
  if (keys) return JSON.parse(keys);

  const keypair = createKeypair();
  localStorage.setItem(LS_KEY, JSON.stringify(keypair));
  return keypair;
};

export const saveKeypair = (keypair: Keypair) => {
  localStorage.setItem(LS_KEY, JSON.stringify(keypair));
};

export const formatPublicKey = (
  pk: string
): { npub: string; display: string } => {
  const npub = nip19.npubEncode(pk);
  const display =
    npub.substring(0, 8) + "..." + npub.substring(npub.length - 4);
  return { npub, display };
};

export type KeypairState = {
  keypair: Keypair;
  save: (keypair: Keypair) => void;
};

export const useKeypair = create<KeypairState>((set) => ({
  keypair: getKeypair(),
  save: (keypair: Keypair) =>
    set(() => {
      saveKeypair(keypair);
      return { keypair };
    }),
}));
