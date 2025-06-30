import { s as store_get, a as slot, u as unsubscribe_stores, p as pop, b as push } from "../../../chunks/index.js";
import { g as get } from "../../../chunks/index3.js";
import { A as AppBar, __tla as __tla_0 } from "../../../chunks/AppBar.js";
import { B as BackgroundImage } from "../../../chunks/BackgroundImage.js";
import { __tla as __tla_1 } from "../../../chunks/appbar.da.js";
import { u as userStore } from "../../../chunks/user.store.js";
import { a as appbarStore, s as setBackUrl, c as competitionStore } from "../../../chunks/appbar.store.js";
import "lz-string";
import { g as getText } from "../../../chunks/language.store.js";
import "../../../chunks/system..da.js";
import "../../../chunks/client.js";
import "../../../chunks/index2.js";
import { __tla as __tla_2 } from "../../../chunks/api.definitions.js";
import "notyf";
import { __tla as __tla_3 } from "../../../chunks/user.auth.da.js";
import { u as userActivityStore } from "../../../chunks/useractivity.store.js";
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
    setTimeout(async () => {
      appbarStore.set({
        visible: true,
        backLabel: await getText("back"),
        isLogoVisible: false,
        isCoinVisible: true,
        isBackButtonVisible: true,
        isProfileVisible: true,
        isNotificationVisible: true
      });
    }, 50);
    let compItem = get(competitionStore);
    setBackUrl("/competitions/" + compItem.url + "/home");
    let dropdownItems = [];
    BackgroundImage($$payload, {});
    $$payload.out += `<!----> <div class="flex flex-col h-screen"><div class="flex flex-1 overflow-hidden"><div class="flex flex-col flex-1">`;
    AppBar($$payload, {
      backLabel: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).backLabel,
      isBackButtonVisible: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).isBackButtonVisible,
      isLogoVisible: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).isLogoVisible,
      isCoinVisible: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).isCoinVisible,
      profilePicture: store_get($$store_subs ??= {}, "$userStore", userStore).profile_picture,
      coinCount: store_get($$store_subs ??= {}, "$userActivityStore", userActivityStore).total_coins_earned,
      isProfileVisible: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).isProfileVisible,
      dropdownItems
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
