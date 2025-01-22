import { openDB } from 'idb';

const DB_NAME = 'choresCache';
const STORE_NAME = 'chores';

export function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
}

export async function saveToCache(key: string, data: unknown) {
  const db = await getDB();
  await db.put(STORE_NAME, { id: key, data });
}

export async function getFromCache(key: string) {
  const db = await getDB();
  const result = await db.get(STORE_NAME, key);
  return result?.data || null;
}

export async function deleteFromCache(key: string) {
  const db = await getDB();
  await db.delete(STORE_NAME, key);
}
