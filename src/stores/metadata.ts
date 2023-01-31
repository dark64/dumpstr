import { create } from "zustand";
import initDatabase from "../utils/db";

const STORE_NAME = "metadata";

export type Metadata = any; // todo

export type MetadataStore = {
  metadata: Metadata;
  load: () => Promise<void>;
  get: (pk: string) => Promise<Metadata>;
  save: (pk: string, metadata: Metadata) => Promise<void>;
};

export const useMetadataStore = create<MetadataStore>((set, get) => ({
  metadata: {},
  load: async () => {
    let db = await initDatabase<any>(STORE_NAME, 1);
    let data = await db.getAll();
    set((state) => ({
      db,
      metadata: { ...state.metadata, ...data },
    }));
    db.close();
  },
  get: async (pk: string) => {
    let value = get().metadata[pk];
    if (value) {
      return value;
    }
    let db = await initDatabase<any>(STORE_NAME, 1);
    let saved = await db.get(pk);
    if (saved) {
      set((state) => ({
        metadata: { ...state.metadata, [pk]: saved },
      }));
    }
    db.close();
    return saved;
  },
  save: async (pk: string, metadata: any) => {
    let db = await initDatabase<any>(STORE_NAME, 1);
    let saved = await db.save(pk, metadata);
    set((state) => ({
      metadata: { ...state.metadata, [pk]: saved },
    }));
    db.close();
  },
}));
