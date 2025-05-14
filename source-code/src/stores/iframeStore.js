import { writable } from "svelte/store";

export const iframeStore = writable({
  isVisible: false,
  url: "",
});

export function openIframe(url) {
  iframeStore.set({ isVisible: true, url });
}

export function closeIframe() {
  iframeStore.set({ isVisible: false, url: "" });
}
