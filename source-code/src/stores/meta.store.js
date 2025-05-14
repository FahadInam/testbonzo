import { browser } from "$app/environment";
import { writable } from "svelte/store";

// Load initial data from sessionStorage
const defaultMeta = { title: "", description: "", url: "", link: "" };

const initialMeta = browser
  ? JSON.parse(sessionStorage.getItem("meta") || JSON.stringify(defaultMeta))
  : defaultMeta;

export const metaStore = writable(initialMeta);

// Subscribe to store updates and persist in sessionStorage
if (browser) {
  metaStore.subscribe((value) => {
    sessionStorage.setItem("meta", JSON.stringify(value));
  });
}
