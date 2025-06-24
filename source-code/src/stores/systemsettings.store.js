import { writable } from "svelte/store";

export const systemSettingsStore = writable({
  instance_id: 0,
  account_back_url: "",
  principal_enabled: false,
  lms_login_enabled: false,
  comp_banner_locked: false,
  safaricom_domain: "",
  meta_settings: {
    title: "",
    fav_icons: {
      "32x32": "",
      "16x16": "",
    },
  },
  logo: {
    web_dark: "web_dark",
    mobile_dark: "mobile_dark",
    web_light: "web_light",
    mobile_light: "mobile_light",
  },
  city_list: [],
  landing_navigation: [], // Add this property as optional
});
