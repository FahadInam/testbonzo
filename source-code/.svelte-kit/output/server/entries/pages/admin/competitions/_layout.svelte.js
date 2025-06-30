import { s as store_get, a as slot, u as unsubscribe_stores, p as pop, b as push } from "../../../../chunks/index.js";
import { A as AppBar, __tla as __tla_0 } from "../../../../chunks/AppBar.js";
import { a as appbarStore } from "../../../../chunks/appbar.store.js";
import "../../../../chunks/client.js";
import "clsx";
import "../../../../chunks/client2.js";
import { u as userStore } from "../../../../chunks/user.store.js";
import { __tla as __tla_1 } from "../../../../chunks/appbar.da.js";
import { u as userActivityStore } from "../../../../chunks/useractivity.store.js";
import { s as sidebarStore } from "../../../../chunks/sidebar.store.js";
import { S as SideBar } from "../../../../chunks/SideBar.js";
import "lz-string";
import "../../../../chunks/language.store.js";
import "../../../../chunks/system..da.js";
import "../../../../chunks/index2.js";
import { __tla as __tla_2 } from "../../../../chunks/api.definitions.js";
import "notyf";
import { __tla as __tla_3 } from "../../../../chunks/user.auth.da.js";
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
  })()
]).then(async () => {
  _layout = function($$payload, $$props) {
    push();
    var $$store_subs;
    let sideBarNavItems;
    let dropdownItems = [];
    $$payload.out += `<div class="flex flex-col h-screen"><div class="flex flex-1 overflow-hidden">`;
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
      profilePicture: store_get($$store_subs ??= {}, "$userStore", userStore).profile_picture,
      coinCount: store_get($$store_subs ??= {}, "$userActivityStore", userActivityStore).total_coins_earned,
      dropdownItems,
      isVoucherButtonVisible: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).isVoucherButtonVisible,
      isProfileVisible: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).isProfileVisible
    });
    $$payload.out += `<!----> <div class="flex-1 overflow-y-auto save-scroll"><!---->`;
    slot($$payload, $$props, "default", {});
    $$payload.out += `<!----></div></div></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  };
});
export {
  __tla,
  _layout as default
};
