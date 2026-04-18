/**
 * Lưu và khôi phục search params (query string) vào sessionStorage.
 *
 * Convention:
 *   key = "search:<routePath>"
 *   value = chuỗi search (ví dụ "?thuTucId=135")
 */

const SESSION_KEY_PREFIX = "search:";

export const persistSearch = (routePath: string, search: string) => {
  if (!routePath) return;
  try {
    if (search && search !== "?") {
      sessionStorage.setItem(`${SESSION_KEY_PREFIX}${routePath}`, search);
    }
  } catch {
    // ignore
  }
};

export const getPersistedSearch = (routePath: string): string => {
  try {
    return sessionStorage.getItem(`${SESSION_KEY_PREFIX}${routePath}`) ?? "";
  } catch {
    return "";
  }
};

export const clearPersistedSearch = (routePath: string) => {
  try {
    sessionStorage.removeItem(`${SESSION_KEY_PREFIX}${routePath}`);
  } catch {
    // ignore
  }
};
