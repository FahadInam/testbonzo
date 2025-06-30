import { a as slot, s as store_get, u as unsubscribe_stores, p as pop, b as push, e as escape_html } from "../../../chunks/index.js";
import { A as AppBar, __tla as __tla_0 } from "../../../chunks/AppBar.js";
import { B as Button } from "../../../chunks/Button.js";
import { S as SideBar } from "../../../chunks/SideBar.js";
import "clsx";
import { u as userStore } from "../../../chunks/user.store.js";
import { a as appbarStore, c as competitionStore } from "../../../chunks/appbar.store.js";
import "lz-string";
import { s as sidebarStore } from "../../../chunks/sidebar.store.js";
import { g as goto } from "../../../chunks/client.js";
import "../../../chunks/client2.js";
import { t } from "../../../chunks/language.store.js";
import "../../../chunks/system..da.js";
import "../../../chunks/index2.js";
import { __tla as __tla_1 } from "../../../chunks/api.definitions.js";
import "notyf";
import { __tla as __tla_2 } from "../../../chunks/user.auth.da.js";
import { a as authModalStore, __tla as __tla_3 } from "../../../chunks/common.auth.data.js";
import "../../../chunks/country.constant.js";
import "js-sha256";
import { l as loggedInUserCompAppBarData, __tla as __tla_4 } from "../../../chunks/appbar.da.js";
import { u as userActivityStore } from "../../../chunks/useractivity.store.js";
import { p as paymentStore } from "../../../chunks/payment.store.js";
let _layout;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_3;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_4;
    } catch {
    }
  })()
]).then(async () => {
  function StickyBanner($$payload, $$props) {
    $$payload.out += `<div class="bg-black text-center text-white py-3 z-5 space-x-2"><!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!----></div>`;
  }
  _layout = function($$payload, $$props) {
    push();
    var $$store_subs;
    let sideBarNavItems;
    let dropdownItems = [];
    paymentStore.subscribe(async () => {
      dropdownItems = await loggedInUserCompAppBarData();
    });
    $$payload.out += `<div class="flex flex-col h-screen">`;
    if (store_get($$store_subs ??= {}, "$userStore", userStore).is_guest_mode) {
      $$payload.out += "<!--[-->";
      StickyBanner($$payload, {
        children: ($$payload2) => {
          $$payload2.out += `<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("learn_today"))}</span> `;
          Button($$payload2, {
            label: store_get($$store_subs ??= {}, "$t", t)("signup"),
            size: "small",
            type: "3d-secondary",
            customClass: "w-[100px]",
            onClick: () => {
              authModalStore.set({
                visible: true,
                page: "user-selection"
              });
            }
          });
          $$payload2.out += `<!----> `;
          Button($$payload2, {
            label: store_get($$store_subs ??= {}, "$t", t)("login"),
            size: "small",
            type: "3d-primary",
            customClass: "w-[100px]",
            onClick: () => {
              authModalStore.set({
                visible: true,
                page: "user-login"
              });
            }
          });
          $$payload2.out += `<!---->`;
        },
        $$slots: {
          default: true
        }
      });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (store_get($$store_subs ??= {}, "$appbarStore", appbarStore).isShowPaymentBanner && !store_get($$store_subs ??= {}, "$userStore", userStore).is_guest_mode) {
      $$payload.out += "<!--[-->";
      StickyBanner($$payload, {
        children: ($$payload2) => {
          $$payload2.out += `<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("subscription_detail"))}</span> `;
          Button($$payload2, {
            label: store_get($$store_subs ??= {}, "$t", t)("subscribe"),
            size: "small",
            type: "3d-secondary",
            customClass: "w-[100px] ml-auto",
            onClick: () => {
              const { competition_id, current_grade = null, url } = store_get($$store_subs ??= {}, "$competitionStore", competitionStore);
              paymentStore.set({
                competition_id,
                current_grade,
                url
              });
              goto();
            }
          });
          $$payload2.out += `<!---->`;
        },
        $$slots: {
          default: true
        }
      });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="flex flex-1 overflow-hidden">`;
    if (store_get($$store_subs ??= {}, "$sidebarStore", sidebarStore).visible) {
      $$payload.out += "<!--[-->";
      SideBar($$payload, {
        navItems: sideBarNavItems
      });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="flex flex-col flex-1">`;
    AppBar($$payload, {
      backLabel: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).backLabel,
      isBackButtonVisible: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).isBackButtonVisible,
      isLogoVisible: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).isLogoVisible,
      isCoinVisible: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).isCoinVisible,
      isVoucherButtonVisible: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).isVoucherButtonVisible,
      profilePicture: store_get($$store_subs ??= {}, "$userStore", userStore).profile_picture,
      coinCount: store_get($$store_subs ??= {}, "$userActivityStore", userActivityStore).total_coins_earned,
      isProfileVisible: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).isProfileVisible,
      dropdownItems
    });
    $$payload.out += `<!----> <div class="flex-1 overflow-y-auto save-scroll"><!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!----></div></div></div> `;
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  };
});
export {
  __tla,
  _layout as default
};
