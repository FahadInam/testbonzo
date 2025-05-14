import { get, writable } from "svelte/store";

export const titleStore = writable({ productName: "Bonzo" });

/**
 * @param {string} text
 */
export function getTitle(text) {
  return text + " - " + get(titleStore).productName;
}
