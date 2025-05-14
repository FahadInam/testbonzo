import { sessionStore } from "$lib/persist.store";
import { writable } from "svelte/store";

export const paymentStore = sessionStore("paymentStore", {
  competition_id: null,
  current_grade: null,
  url: null,
  payment_status: null,
});
