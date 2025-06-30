import { writable } from "svelte/store";

export const internetStore = writable({
  showInternetBanner: false,
});
