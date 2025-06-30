import { s as store_get, a as slot, u as unsubscribe_stores, p as pop, b as push } from "../../../chunks/index.js";
import { A as AppBar, __tla as __tla_0 } from "../../../chunks/AppBar.js";
import { __tla as __tla_1 } from "../../../chunks/appbar.da.js";
import { a as appbarStore } from "../../../chunks/appbar.store.js";
import { g as getText } from "../../../chunks/language.store.js";
import "../../../chunks/client.js";
import "clsx";
import "../../../chunks/client2.js";
import "../../../chunks/payment.store.js";
import { u as userStore } from "../../../chunks/user.store.js";
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
        isShowPaymentBanner: false,
        isShowRules: false,
        isNotificationVisible: false
      });
    }, 50);
    let dropdownItems = [];
    $$payload.out += `<div class="flex flex-col h-screen"><div class="flex flex-1 overflow-hidden w-full"><div class="flex flex-col flex-1 w-full">`;
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
    $$payload.out += `<!----> <div class="bg-white w-[95%] lg:w-[80%] rounded-2xl overflow-y-auto z-1 mb-8 lg:mb-0 sm:p-6 mx-auto scrollbar-hide"><div class="w-[91%] mx-auto"><!---->`;
    slot($$payload, $$props, "default", {});
    $$payload.out += `<!----></div></div></div></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  };
});
export {
  __tla,
  _layout as default
};
