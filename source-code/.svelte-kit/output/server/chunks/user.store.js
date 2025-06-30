import { w as writable } from "./index3.js";
function createLocalStorage() {
  if (typeof window === "undefined") {
    return {
      get: () => null,
      set: () => {
      },
      remove: () => {
      }
    };
  }
  return {
    get: (key) => JSON.parse(localStorage.getItem(key)),
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    remove: (key) => localStorage.removeItem(key)
  };
}
function persistStore(store, storage, key, condition = () => true) {
  if (typeof window !== "undefined") {
    const storedValue = storage.get(key);
    if (storedValue !== null) {
      store.set(storedValue);
    }
    store.subscribe((value) => {
      if (condition(value)) {
        storage.set(key, value);
      } else {
        storage.remove(key);
      }
    });
  }
  return store;
}
function sessionStore(key, initialValue) {
  let storedValue;
  const isBrowser = typeof window !== "undefined" && typeof sessionStorage !== "undefined";
  if (isBrowser) {
    const storedItem = sessionStorage.getItem(key);
    storedValue = storedItem ? JSON.parse(storedItem) : initialValue;
  } else {
    storedValue = initialValue;
  }
  const store = writable(storedValue);
  if (isBrowser) {
    store.subscribe((value) => {
      sessionStorage.setItem(key, JSON.stringify(value));
    });
  }
  return store;
}
const userStore = persistStore(
  writable({
    user_id: null,
    auth_token: null,
    refresh_token: null,
    profile_picture: null,
    is_guest_mode: null
  }),
  createLocalStorage(),
  "userStore",
  (value) => !value.is_guest_mode && value.user_id
);
export {
  sessionStore as s,
  userStore as u
};
