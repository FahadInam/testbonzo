import { writable } from "svelte/store";

export const userActivityStore = writable({
  total_coins_earned: 0,
});
