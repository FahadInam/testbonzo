import { s as store_get, a as slot, u as unsubscribe_stores, p as pop, b as push } from "../../../chunks/index.js";
import { A as AppBar, __tla as __tla_0 } from "../../../chunks/AppBar.js";
import { B as BackgroundImage } from "../../../chunks/BackgroundImage.js";
import { a as appbarStore } from "../../../chunks/appbar.store.js";
import { g as getText } from "../../../chunks/language.store.js";
import { u as userStore } from "../../../chunks/user.store.js";
import { __tla as __tla_1 } from "../../../chunks/appbar.da.js";
import "../../../chunks/client.js";
import "clsx";
import "../../../chunks/client2.js";
import { p as page } from "../../../chunks/stores.js";
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
  })()
]).then(async () => {
  _layout = function($$payload, $$props) {
    push();
    var $$store_subs;
    let dropdownItems = [];
    setTimeout(async () => {
      appbarStore.set({
        isProfileVisible: true,
        visible: true,
        backLabel: await getText("back"),
        isLogoVisible: false,
        isCoinVisible: false,
        isBackButtonVisible: true,
        isVoucherButtonVisible: false,
        isVoucherModalVisible: false,
        isNotificationVisible: false,
        isShowPaymentBanner: false,
        isShowRules: false
      });
    }, 50);
    store_get($$store_subs ??= {}, "$page", page).url.pathname;
    BackgroundImage($$payload, {});
    $$payload.out += `<!----> <div class="flex flex-col h-screen"><div class="flex flex-1 overflow-hidden"><div class="flex flex-col w-full flex-1">`;
    AppBar($$payload, {
      backLabel: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).backLabel,
      isBackButtonVisible: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).isBackButtonVisible,
      isLogoVisible: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).isLogoVisible,
      isCoinVisible: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).isCoinVisible,
      isVoucherButtonVisible: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).isVoucherButtonVisible,
      profilePicture: store_get($$store_subs ??= {}, "$userStore", userStore).profile_picture,
      isProfileVisible: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).isProfileVisible,
      dropdownItems
    });
    $$payload.out += `<!----> <div class="w-[100%] lg:w-[100%] rounded-2xl overflow-y-auto z-1 mb-8 lg:mb-0 p-2 md:p-4 mx-auto"><div class="w-[100%] mx-auto"><!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!----></div></div></div></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  };
});
export {
  __tla,
  _layout as default
};
