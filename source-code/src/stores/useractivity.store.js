import { sessionStore } from "$lib/persist.store";
import { writable } from "svelte/store";

export const userActivityStore = sessionStore("userActivityStore", {
  total_coins_earned: 0,
});
