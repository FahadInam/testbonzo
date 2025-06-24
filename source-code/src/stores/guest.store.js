import { writable } from "svelte/store";

const initialState = {
  points: null,
  guest_mode: false,
};

export const guestStore = writable({ ...initialState });

export const resetGuestStore = () => {
  guestStore.set({ ...initialState });
};
