import { writable } from "svelte/store";

export const gradesStore = writable({ current_grade: null, grades: [] });
