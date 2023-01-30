import { create } from "zustand";
import localForage from "localforage";

localForage.config({
  driver: localForage.INDEXEDDB,
});

const customStorage = {
  getItem: async (pk: string): Promise<any | null> => {
    return await localForage.getItem<any>(pk);
  },
  setItem: async (pk: string, value: any): Promise<any> => {
    return await localForage.setItem(pk, value);
  },
};

export type MetadataStore = {
  metadata: any;
  get: (pk: string) => Promise<any>;
  save: (pk: string, metadata: any) => Promise<void>;
};

export const useMetadataStore = create<MetadataStore>((set, get) => ({
  metadata: {},
  get: async (pk: string) => {
    let value = get().metadata[pk];
    if (value) {
      return value;
    }
    let saved = await customStorage.getItem(pk);
    if (saved) {
      set((state) => ({
        metadata: { ...state.metadata, [pk]: saved },
      }));
    }
    return saved;
  },
  save: async (pk: string, metadata: any) => {
    let saved = await customStorage.setItem(pk, metadata);
    set((state) => ({
      metadata: { ...state.metadata, [pk]: saved },
    }));
  },
}));
