import { create } from "zustand";
import { getKeypair, Keypair, saveKeypair } from "./keys";

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
