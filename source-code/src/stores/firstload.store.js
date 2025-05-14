import { writable } from "svelte/store";

export const firstLoadStore = writable({ isUILoaded: false });
