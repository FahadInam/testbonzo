// @ts-nocheck
import { createLocalStorage, persistStore } from "$lib/persist.store";
import { writable } from "svelte/store";

export const userStore = persistStore(
  writable({
    user_id: null,
    auth_token: null,
    refresh_token: null,
    profile_picture: null,
    is_guest_mode: null,
  }),
  createLocalStorage(),
  "userStore",
  (value) => !value.is_guest_mode && value.user_id
);
