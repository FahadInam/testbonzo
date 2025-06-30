import { e as escape_html, c as attr, a as slot, d as bind_props, p as pop, b as push, f as stringify, s as store_get, u as unsubscribe_stores } from "../../../../../chunks/index.js";
import { I as IMAGES } from "../../../../../chunks/images.constants.js";
import { I as Image } from "../../../../../chunks/Image.js";
import { f as fallback } from "../../../../../chunks/utils2.js";
import { g as getText, t } from "../../../../../chunks/language.store.js";
import { a as appbarStore, c as competitionStore } from "../../../../../chunks/appbar.store.js";
import { s as sidebarStore } from "../../../../../chunks/sidebar.store.js";
import { B as Button } from "../../../../../chunks/Button.js";
import { g as goto } from "../../../../../chunks/client.js";
import { g as getInstanceText } from "../../../../../chunks/utils.js";
import { u as userStore } from "../../../../../chunks/user.store.js";
import { h as html } from "../../../../../chunks/html.js";
function DataCard($$payload, $$props) {
  push();
  let title = fallback($$props["title"], "Card Title");
  let imageSrc = fallback($$props["imageSrc"], () => IMAGES.TOPICS_ICON, true);
  let imageClass = fallback($$props["imageClass"], "w-8 h-8 sm:w-10 sm:h-10");
  let maxHeight = fallback($$props["maxHeight"], "400px");
  let cardClass = fallback($$props["cardClass"], "p-2 sm:p-4");
  $$payload.out += `<div class="max-w-full mx-auto bg-white rounded-[20px] shadow-lg overflow-hidden opacity-100"><div class="bg-blue-900 text-white py-2 flex justify-center items-center gap-2 sm:gap-4 h-16"><div class="relative h-full">`;
  Image($$payload, {
    src: imageSrc,
    alt: "Section Icon",
    className: `transition-opacity duration-500 ease-in-out ${stringify(imageClass)}`
  });
  $$payload.out += `<!----></div> <h2 class="text-lg sm:text-xl font-semibold">${escape_html(title)}</h2></div> <div${attr("class", `${stringify(cardClass)} overflow-y-auto`)}${attr("style", `max-height: ${stringify(maxHeight)}`)}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div></div>`;
  bind_props($$props, {
    title,
    imageSrc,
    imageClass,
    maxHeight,
    cardClass
  });
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let isGuestMode;
  sidebarStore.set({ visible: false });
  setTimeout(
    async () => {
      appbarStore.set({
        isProfileVisible: true,
        visible: true,
        backLabel: await getText("competitions"),
        isLogoVisible: false,
        isCoinVisible: false,
        isBackButtonVisible: true,
        isVoucherButtonVisible: false,
        isVoucherModalVisible: false,
        isNotificationVisible: false,
        isShowPaymentBanner: false,
        isShowRules: false
      });
    },
    50
  );
  console.log("rules", store_get($$store_subs ??= {}, "$competitionStore", competitionStore));
  isGuestMode = store_get($$store_subs ??= {}, "$userStore", userStore)?.is_guest_mode;
  $$payload.out += `<div class="mx-auto w-full max-w-[940px] relative px-4 sm:px-6">`;
  DataCard($$payload, {
    title: store_get($$store_subs ??= {}, "$t", t)("rules"),
    imageSrc: IMAGES.RULES,
    imageClass: "w-10 h-10 sm:w-13 sm:h-13",
    maxHeight: "calc(100vh - 175px)",
    cardClass: "p-0",
    children: ($$payload2) => {
      $$payload2.out += `<div${attr("class", `
       overflow-y-auto
      ${isGuestMode ? "sm:max-h-[calc(100vh-335px)] max-h-[calc(100vh-350px)]" : "sm:max-h-[calc(100vh-275px)] max-h-[calc(100vh-260px)]"}
       `)}><div class="rules-content sm:p-6 p-2" style="font-family: system-ui, sans-serif; line-height: 1.6; color: #515151; font-weight: 500; font-size: 14px; sm:font-size: 16px;">${html(store_get($$store_subs ??= {}, "$competitionStore", competitionStore).rules)}</div></div> <div class="flex justify-center gap-2 sm:gap-4 px-2 pb-1 pt-2.5 mb-[15px]">`;
      Button($$payload2, {
        label: getInstanceText(store_get($$store_subs ??= {}, "$t", t), "disagree"),
        type: "3d-primary",
        customClass: "w-full max-w-[140px] sm:max-w-[160px] text-base sm:text-lg md:text-[22px]",
        onClick: () => {
          goto();
        }
      });
      $$payload2.out += `<!----> `;
      Button($$payload2, {
        label: getInstanceText(store_get($$store_subs ??= {}, "$t", t), "agree"),
        type: "3d-secondary",
        customClass: "w-full max-w-[140px] sm:max-w-[160px] text-base sm:text-lg md:text-[22px]",
        onClick: () => {
          goto();
        }
      });
      $$payload2.out += `<!----></div>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
