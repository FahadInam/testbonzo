import { writable } from "svelte/store";

export const otpStore = writable({
  is_otp_verified: false,
  phone_number: null,
  otp_forgot_password: false,
  user_id: null,
});
