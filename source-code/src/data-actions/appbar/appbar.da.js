import { authModalStore } from "../../stores/auth.modal.store";
import { logoutUser } from "../authentication/common.auth.data";
import { getText } from "../../stores/language.store";
import { appbarStore } from "../../stores/appbar.store";
import { get } from "svelte/store";
import { paymentStore } from "../../stores/payment.store";
import { metaStore } from "../../stores/meta.store";
import { transferStore } from "../../stores/transfer.store";

const getCurrentUrl = () => get(metaStore)?.url || "";

/**
 * @typedef {Object} AppBarItem
 * @property {string} label
 * @property {string} link
 * @property {() => void} clickCB
 * @property {string} icon
 * @property {boolean} [hidden] - Optional; if true, this item is hidden from the UI
 */

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
    hidden: true,
  },
  guestUserAppBarData[1],
];

// App bar data for admin (principal) users
/** @type {AppBarItem[]} */
export const adminUserAppBarData = [
  {
    label: await getText("edit_profile"),
    link: "/profile/edit",
    clickCB: () => {
      alert("edit profile - principal view");
    },
    icon: "i i-Update-Profile",
    hidden: true,
  },
  guestUserAppBarData[1],
];

export const premiumUserAppBarData = [
  {
    label: await getText("my_subscription"),
    link: "/competitions/" + getCurrentUrl() + "/my-subscription",
    icon: "i i-Update-Profile",
  },
];

export async function loggedInUserCompAppBarData() {
  const payment = get(paymentStore);
  const grades = Array.isArray(get(transferStore)) ? get(transferStore) : [];

  return [
    {
      label: await getText("stats"),
      link: "/competitions/" + getCurrentUrl() + "/stats",
      icon: "i i-Stats",
    },
    {
      label: await getText("rewards"),
      link: "/competitions/" + getCurrentUrl() + "/rewards",
      icon: "i i-Rewards",
    },
    ...(Array.isArray(grades) && grades.length > 1
      ? [
          {
            label: await getText("change_grade"),
            link: "/competitions/" + getCurrentUrl() + "/change-grade",
            icon: "i i-Change-Grades",
          },
        ]
      : []),
    ...(payment?.payment_status?.is_subscribed === 1 ? premiumUserAppBarData : []),
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
      link: "/competitions/" + getCurrentUrl() + "/profile",
      icon: "i i-Update-Profile",
    },

    ...loggedInUserAppBarData.slice(1),
  ];
}

/** @type {AppBarItem[]} */
export const adminAppBarData = [
  adminUserAppBarData[0],
  {
    label: await getText("signout"),
    link: "",
    clickCB: () => {
      logoutUser();
    },
    icon: "i i-Sign-out",
  },
];
