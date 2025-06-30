import { a as authModalStore, l as logoutUser, __tla as __tla_0 } from "./common.auth.data.js";
import { g as getText } from "./language.store.js";
import { g as get } from "./index3.js";
import "./payment.store.js";
import { m as metaStore } from "./meta.store.js";
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
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
  [
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
  [
    {
      label: await getText("my_subscription"),
      link: "/competitions/" + getCurrentUrl() + "/my-subscription",
      icon: "i i-Update-Profile"
    }
  ];
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
  __tla
};
