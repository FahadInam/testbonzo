import { authModalStore } from "../../stores/auth.modal.store";
import { logoutUser } from "../authentication/common.auth.data";
import { getText } from "../../stores/language.store";
import { appbarStore } from "../../stores/appbar.store";
import { get } from "svelte/store";
import { paymentStore } from "../../stores/payment.store";
import { metaStore } from "../../stores/meta.store";

const url = get(metaStore)?.url;
export const guestUserAppBarData = [
  {
    label: await getText("create_account"),
    link: "",
    clickCB: () => {
      authModalStore.set({ visible: true, page: "user-selection" });
    },
    icon: "i i-enter",
  },
  {
    label: await getText("signout"),
    link: "",
    clickCB: () => {
      logoutUser();
    },
    icon: "i i-Sign-out",
  },
];

export const loggedInUserAppBarData = [
  {
    label: await getText("update_profile"),
    link: "/profile",
    clickCB: () => {
      alert("profile page - work in progress");
    },
    icon: "i i-Update-Profile",
  },
  guestUserAppBarData[1],
];
export const premiumUserAppBarData = [
  {
    label: await getText("my_subscription"),
    link: "/competitions/" + url + "/my-subscription",
    icon: "i i-Update-Profile",
  },
];
export const loggedInUserCompAppBarData = [
  {
    label: await getText("stats"),
    link: "/competitions/" + url + "/stats",
    icon: "i i-Stats",
  },
  {
    label: await getText("rewards"),
    link: "/competitions/" + url + "/rewards",
    icon: "i i-Rewards",
  },
  {
    label: await getText("change_grade"),
    link: "/competitions/" + url + "/change-grade",
    icon: "i i-Change-Grades",
  },
  ...(get(paymentStore)?.payment_status?.is_subscribed === 1
    ? premiumUserAppBarData
    : []),
  {
    label: await getText("rules"),
    // link: "/settings/rules",
    icon: "i i-Rules",
    clickCB: () => {
      appbarStore.update((state) => ({
        ...state,
        isShowRules: true,
      }));
    },
  },
  {
    label: await getText("update_profile"),
    link: "/competitions/" + url + "/profile",
    icon: "i i-Update-Profile",
  },

  ...loggedInUserAppBarData.slice(1),
];

export const adminAppBarData = [
  loggedInUserAppBarData[0],
  {
    label: await getText("signout"),
    link: "",
    clickCB: () => {
      logoutUser();
    },
    icon: "i i-Sign-out",
  },
];
