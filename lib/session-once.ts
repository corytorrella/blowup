/** Returns true the first time a given key is seen this session, false on every repeat. */
export function markSeenOnce(key: string): boolean {
  try {
    if (sessionStorage.getItem(key)) return false;
    sessionStorage.setItem(key, "1");
    return true;
  } catch {
    return true;
  }
}
