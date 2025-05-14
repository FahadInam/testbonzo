import { writable } from "svelte/store";

export const authModalStore = writable({ page: "user-login", visible: false });
