import { writable } from "svelte/store";

export const appbarStore = writable({
  visible: false,
  backLabel: "",
  isLogoVisible: false,
  isCoinVisible: false,
  isBackButtonVisible: true,
  isVoucherButtonVisible: false,
  isVoucherModalVisible: false,
  isNotificationVisible: false,
  isShowPaymentBanner: false,
  isShowRules: false,
  isProfileVisible: true,
});

export const appbarDropDownStore = writable([]);
