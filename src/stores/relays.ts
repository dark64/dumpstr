import { create } from "zustand";

let defaultRelayUrls = [
  "wss://nostr-pub.wellorder.net",
  "wss://relay.snort.social",
  "wss://relay.nostr.ch",
  "wss://nos.lol",
];

export type RelayStore = {
  relays: string[];
  save: (relays: string[]) => void;
  restore: () => string[];
};

export const useRelayStore = create<RelayStore>((set) => ({
  relays:
    JSON.parse(localStorage.getItem("relays") as string) || defaultRelayUrls,
  save: (relays: string[]) => {
    localStorage.setItem("relays", JSON.stringify(relays));
    set(() => ({ relays }));
  },
  restore: () => {
    localStorage.setItem("relays", JSON.stringify(defaultRelayUrls));
    set(() => ({ relays: defaultRelayUrls.slice() }));
    return defaultRelayUrls;
  },
}));
