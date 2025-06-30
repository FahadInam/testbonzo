import { k as copy_payload, l as assign_payload, d as bind_props, p as pop, b as push, s as store_get, a as slot, u as unsubscribe_stores } from "../../../../chunks/index.js";
import { B as BackgroundImage } from "../../../../chunks/BackgroundImage.js";
import { a as appbarStore, s as setBackUrl, c as competitionStore } from "../../../../chunks/appbar.store.js";
import { g as getText } from "../../../../chunks/language.store.js";
import { s as sidebarStore } from "../../../../chunks/sidebar.store.js";
import "clsx";
import "../../../../chunks/user.store.js";
import "lz-string";
import "../../../../chunks/system..da.js";
import "../../../../chunks/client.js";
import "../../../../chunks/index2.js";
import { __tla as __tla_0 } from "../../../../chunks/api.definitions.js";
import { p as paymentStore } from "../../../../chunks/payment.store.js";
import { I as IMAGES } from "../../../../chunks/images.constants.js";
import { B as Button } from "../../../../chunks/Button.js";
import { I as Image } from "../../../../chunks/Image.js";
import { M as Modal } from "../../../../chunks/Modal.js";
import { f as fallback } from "../../../../chunks/utils2.js";
import { h as html } from "../../../../chunks/html.js";
let _layout;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function InfoModal($$payload, $$props) {
    push();
    let showModal = fallback($$props["showModal"], false);
    let data = fallback($$props["data"], () => ({}), true);
    let onClose = fallback($$props["onClose"], () => {
    });
    function onButtonClick(action) {
      {
        showModal = false;
      }
    }
    let $$settled = true;
    let $$inner_payload;
    function $$render_inner($$payload2) {
      Modal($$payload2, {
        onClick: () => {
          onButtonClick();
          onClose();
        },
        maxWidth: 748,
        get open() {
          return showModal;
        },
        set open($$value) {
          showModal = $$value;
          $$settled = false;
        },
        $$slots: {
          header: ($$payload3) => {
            $$payload3.out += `<span slot="header"><div class="bg-blue-800 px-4 py-3 flex justify-center items-center rounded-t-lg gap-2">`;
            Image($$payload3, {
              src: IMAGES.RULES,
              alt: "Rules",
              className: "w-9 h-9 min-w-9"
            });
            $$payload3.out += `<!----> <span class="text-white font-semibold text-xl ms-2">Rules</span></div></span>`;
          },
          body: ($$payload3) => {
            $$payload3.out += `<span slot="body"><div class="p-6"><div class="rules-content h-[50vh]" style="font-family: system-ui, sans-serif; line-height: 1.8; color: #515151; font-weight: 500;">${html(data)}</div></div></span>`;
          },
          footer: ($$payload3) => {
            $$payload3.out += `<span slot="footer" class="p-2"><div class="flex justify-center gap-4">`;
            Button($$payload3, {
              label: "Close",
              size: "small",
              type: "3d-secondary",
              customClass: "w-[170px] text-lg md:text-[22px]",
              onClick: () => {
                onButtonClick();
                onClose();
              }
            });
            $$payload3.out += `<!----></div></span>`;
          }
        }
      });
    }
    do {
      $$settled = true;
      $$inner_payload = copy_payload($$payload);
      $$render_inner($$inner_payload);
    } while (!$$settled);
    assign_payload($$payload, $$inner_payload);
    bind_props($$props, {
      showModal,
      data,
      onClose
    });
    pop();
  }
  _layout = function($$payload, $$props) {
    push();
    var $$store_subs;
    sidebarStore.set({
      visible: true
    });
    setTimeout(async () => {
      appbarStore.set({
        isProfileVisible: true,
        visible: true,
        backLabel: await getText("competitions"),
        isLogoVisible: false,
        isCoinVisible: true,
        isBackButtonVisible: true,
        isVoucherButtonVisible: false,
        isVoucherModalVisible: false,
        isNotificationVisible: true,
        isShowPaymentBanner: store_get($$store_subs ??= {}, "$competitionStore", competitionStore)?.is_premium === 1 && store_get($$store_subs ??= {}, "$paymentStore", paymentStore).payment_status?.is_subscribed === 0 ? true : false,
        isShowRules: false
      });
    }, 50);
    setBackUrl("/competitions");
    const resetStore = () => {
      appbarStore.update((state) => ({
        ...state,
        isShowRules: false
      }));
    };
    if (store_get($$store_subs ??= {}, "$appbarStore", appbarStore)?.isNotificationVisible === false || store_get($$store_subs ??= {}, "$appbarStore", appbarStore)?.isNotificationVisible === void 0) {
      appbarStore.update((state) => ({
        ...state,
        isNotificationVisible: true
      }));
    }
    BackgroundImage($$payload, {});
    $$payload.out += `<!----> <!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!----> `;
    InfoModal($$payload, {
      showModal: store_get($$store_subs ??= {}, "$appbarStore", appbarStore).isShowRules,
      data: store_get($$store_subs ??= {}, "$competitionStore", competitionStore).rules,
      onClose: () => resetStore(),
      useModal: false
    });
    $$payload.out += `<!---->`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  };
});
export {
  __tla,
  _layout as default
};
