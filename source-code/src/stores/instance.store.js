import { writable } from "svelte/store";

export const instanceStore = writable({ instance_id: null, banner_text: "" });
