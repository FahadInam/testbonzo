import { a as authModalStore, l as logoutUser, __tla as __tla_0 } from "./common.auth.data.js";
import { g as getText } from "./language.store.js";
import { a as appbarStore } from "./appbar.store.js";
import { w as writable, g as get } from "./index3.js";
import { p as paymentStore } from "./payment.store.js";
import { m as metaStore } from "./meta.store.js";
let loggedInUserCompAppBarData;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const transferStore = writable({});
  const getCurrentUrl = () => get(metaStore)?.url || "";
  const guestUserAppBarData = [
    {
      label: await getText("create_account"),
      link: "",
      clickCB: () => {
        authModalStore.set({
          visible: true,
          page: "user-selection"
        });
      },
      icon: "i i-enter"
    },
    {
      label: await getText("signout"),
      link: "",
      clickCB: () => {
        logoutUser();
      },
      icon: "i i-Sign-out"
    }
  ];
  const loggedInUserAppBarData = [
    {
      label: await getText("update_profile"),
      link: "/profile",
      clickCB: () => {
        alert("profile page - work in progress");
      },
      icon: "i i-Update-Profile",
      hidden: true
    },
    guestUserAppBarData[1]
  ];
  const adminUserAppBarData = [
    {
      label: await getText("edit_profile"),
      link: "/profile/edit",
      clickCB: () => {
        alert("edit profile - principal view");
      },
      icon: "i i-Update-Profile",
      hidden: true
    },
    guestUserAppBarData[1]
  ];
  const premiumUserAppBarData = [
    {
      label: await getText("my_subscription"),
      link: "/competitions/" + getCurrentUrl() + "/my-subscription",
      icon: "i i-Update-Profile"
    }
  ];
  loggedInUserCompAppBarData = async function() {
    const payment = get(paymentStore);
    const grades = Array.isArray(get(transferStore)) ? get(transferStore) : [];
    return [
      {
        label: await getText("stats"),
        link: "/competitions/" + getCurrentUrl() + "/stats",
        icon: "i i-Stats"
      },
      {
        label: await getText("rewards"),
        link: "/competitions/" + getCurrentUrl() + "/rewards",
        icon: "i i-Rewards"
      },
      ...Array.isArray(grades) && grades.length > 1 ? [
        {
          label: await getText("change_grade"),
          link: "/competitions/" + getCurrentUrl() + "/change-grade",
          icon: "i i-Change-Grades"
        }
      ] : [],
      ...payment?.payment_status?.is_subscribed === 1 ? premiumUserAppBarData : [],
      {
        label: await getText("rules"),
        icon: "i i-Rules",
        clickCB: () => {
          appbarStore.update((state) => ({
            ...state,
            isShowRules: true
          }));
        }
      },
      {
        label: await getText("update_profile"),
        link: "/competitions/" + getCurrentUrl() + "/profile",
        icon: "i i-Update-Profile"
      },
      ...loggedInUserAppBarData.slice(1)
    ];
  };
  [
    adminUserAppBarData[0],
    {
      label: await getText("signout"),
      link: "",
      clickCB: () => {
        logoutUser();
      },
      icon: "i i-Sign-out"
    }
  ];
});
export {
  __tla,
  loggedInUserCompAppBarData as l
};
