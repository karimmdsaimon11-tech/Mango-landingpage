/**
 * Cloud Synchronization via Google Cloud Firestore REST API.
 * Zero npm dependencies required - pure lightweight browser fetch!
 * Allows changes made on laptop to instantly appear on all phones & devices worldwide.
 */

const CLOUD_CONFIG_KEY = 'bengali_mango_firebase_config';

export function getStoredCloudConfig() {
  try {
    const raw = localStorage.getItem(CLOUD_CONFIG_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveStoredCloudConfig(config) {
  try {
    if (!config) {
      localStorage.removeItem(CLOUD_CONFIG_KEY);
    } else {
      localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(config));
    }
  } catch (e) {}
}

/**
 * Fetch latest website CMS state from Firestore
 */
export async function fetchFromCloud(projectId) {
  if (!projectId) return null;
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId.trim()}/databases/(default)/documents/cms_data/website_state`;
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) {
      if (res.status === 404) return null; // Document not created yet
      console.warn('Cloud fetch non-ok status:', res.status);
      return null;
    }
    const json = await res.json();
    if (json?.fields?.data?.stringValue) {
      return JSON.parse(json.fields.data.stringValue);
    }
  } catch (err) {
    console.warn('Failed to fetch from cloud:', err);
  }
  return null;
}

/**
 * Save website CMS state to Firestore
 */
export async function saveToCloud(projectId, data) {
  if (!projectId || !data) return false;
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId.trim()}/databases/(default)/documents/cms_data/website_state`;
    const payload = {
      fields: {
        data: {
          stringValue: JSON.stringify(data)
        },
        updatedAt: {
          stringValue: new Date().toISOString()
        }
      }
    };
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch (err) {
    console.warn('Failed to save to cloud:', err);
    return false;
  }
}
