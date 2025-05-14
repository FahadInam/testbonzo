import { sessionStore } from "$lib/persist.store";
import { writable } from "svelte/store";

export const gameDataStore = sessionStore("gameDataStore", { subject: "" });
