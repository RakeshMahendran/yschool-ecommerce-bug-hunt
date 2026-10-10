export const STORAGE_PREFIX = 'yschool-';

export const STORAGE_KEYS = {
  cart: `${STORAGE_PREFIX}cart`,
} as const;

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be unavailable (private mode / quota); the app keeps working in memory.
  }
}

/** Removes every key written by the demo store, restoring the initial state. */
export function resetDemoData(): void {
  try {
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith(STORAGE_PREFIX))
      .forEach((key) => window.localStorage.removeItem(key));
  } catch {
    // ignore
  }
}
