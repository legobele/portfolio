/* storage.js — localStorage wrapper that survives private mode + disabled storage */

const memory = new Map();

function available() {
  try {
    const k = "__a11y_probe__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

const USE_STORAGE = available();

export function get(key, fallback = null) {
  try {
    if (USE_STORAGE) {
      const raw = window.localStorage.getItem(key);
      return raw == null ? fallback : JSON.parse(raw);
    }
    return memory.has(key) ? memory.get(key) : fallback;
  } catch {
    return fallback;
  }
}

export function set(key, value) {
  try {
    if (USE_STORAGE) window.localStorage.setItem(key, JSON.stringify(value));
    memory.set(key, value);
  } catch {
    memory.set(key, value);
  }
}

export function remove(key) {
  try {
    if (USE_STORAGE) window.localStorage.removeItem(key);
    memory.delete(key);
  } catch {
    memory.delete(key);
  }
}
