/**
 * Dual-layer persistent storage for Mango Landing Page CMS.
 * Layer 1: IndexedDB (Virtually unlimited storage, never fails on photos)
 * Layer 2: localStorage (Instant synchronous cache)
 */

const DB_NAME = 'BengaliMangoCMS_DB';
const DB_VERSION = 1;
const STORE_NAME = 'cms_store';

function openIndexedDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
}

export async function savePersistentData(key, value) {
  // 1. Save to IndexedDB (handles gigabytes, totally immune to 5MB localStorage limit)
  try {
    const db = await openIndexedDB();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve(true);
      req.onerror = (e) => reject(e.target.error);
    });
  } catch (err) {
    console.warn('IndexedDB save failed:', err);
  }

  // 2. Save to localStorage for instant synchronous load
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn('localStorage save failed (quota exceeded?):', err);
  }
}

export async function loadPersistentData(key, defaultData) {
  // 1. Try IndexedDB first
  try {
    const db = await openIndexedDB();
    const idbData = await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = (e) => reject(e.target.error);
    });
    if (idbData && typeof idbData === 'object') {
      return idbData;
    }
  } catch (err) {
    console.warn('IndexedDB read failed:', err);
  }

  // 2. Fallback to localStorage
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.warn('localStorage read failed:', err);
  }

  return defaultData;
}

export async function clearPersistentData(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {}
  try {
    const db = await openIndexedDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(key);
  } catch (e) {}
}