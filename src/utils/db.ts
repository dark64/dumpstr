type KeyValuePairs<T> = { [key: string]: T };

const getAll = async <T>(db: IDBDatabase, storeName: string) => {
  return new Promise<KeyValuePairs<T>>((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    let keys = store.getAllKeys();
    keys.onerror = () => reject(keys.error);
    keys.onsuccess = () => {
      let values = store.getAll();
      values.onerror = () => reject(values.error);
      values.onsuccess = () => {
        resolve(
          values.result.reduce((acc, current, i) => {
            let key = keys.result[i] as string;
            return { ...acc, [key]: current };
          }, {})
        );
      };
    };
    tx.oncomplete = () => db.close();
  });
};

const get = async <T>(db: IDBDatabase, storeName: string, key: string) => {
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    let req = store.get(key);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
    tx.oncomplete = () => db.close();
  });
};

const put = async <T>(
  db: IDBDatabase,
  storeName: string,
  key: string,
  value: T
) => {
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    let req = store.put(value, key);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(value);
  });
};

export type Database<T> = {
  getAll: () => Promise<KeyValuePairs<T>>;
  get: (key: string) => Promise<T>;
  save: (key: string, value: T) => Promise<T>;
  close: () => void;
};

export const init = async <T>(store: string, version: number = 1) => {
  return new Promise<Database<T>>((resolve, reject) => {
    let open = indexedDB.open("dumpstr", version);
    let db: IDBDatabase;
    open.onupgradeneeded = () => {
      db = open.result;
      db.createObjectStore(store);
    };
    open.onerror = () => reject(`database error: ${open.error}`);
    open.onsuccess = () => {
      db = open.result;
      resolve({
        getAll: () => getAll<T>(db, store),
        get: (key: string) => get<T>(db, store, key),
        save: (key: string, value: T) => put<T>(db, store, key, value),
        close: () => db.close(),
      });
    };
  });
};

export default init;
