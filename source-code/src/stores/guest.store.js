import { writable } from "svelte/store";

const initialState = {
  points: 0,
  guest_mode: false,
};

export const guestStore = writable({ ...initialState });

export const resetGuestStore = () => {
  guestStore.set({ ...initialState });
};
