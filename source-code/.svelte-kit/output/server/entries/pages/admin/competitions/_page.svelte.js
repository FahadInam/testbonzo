import { h as head, s as store_get, u as unsubscribe_stores, p as pop, b as push } from "../../../../chunks/index.js";
import { g as get } from "../../../../chunks/index3.js";
import { t } from "../../../../chunks/language.store.js";
import { g as getTitle } from "../../../../chunks/title.store.js";
import { u as userStore } from "../../../../chunks/user.store.js";
import { g as getInstanceText } from "../../../../chunks/utils.js";
import { __tla as __tla_0 } from "../../../../chunks/api.definitions.js";
import { B as Button } from "../../../../chunks/Button.js";
import { g as goto } from "../../../../chunks/client.js";
import "notyf";
import { __tla as __tla_1 } from "../../../../chunks/user.auth.da.js";
import { i as instanceStore } from "../../../../chunks/instance.store.js";
import { i as isGCLC } from "../../../../chunks/system..da.js";
import { g as getTextForRole, B as BannerText } from "../../../../chunks/BannerText.js";
import { s as sidebarStore } from "../../../../chunks/sidebar.store.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
import { a as attr } from "../../../../chunks/attributes.js";
let _page;
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
  _page = function($$payload, $$props) {
    push();
    var $$store_subs;
    const instance = get(instanceStore);
    let banner_text = instance.banner_text ? JSON.parse(instance.banner_text) : null;
    const user = get(userStore);
    let text = "";
    sidebarStore.set({
      visible: false
    });
    let isPaidUser = false;
    const continueToPay = () => {
      goto();
    };
    console.log("this is final text", text, isPaidUser);
    text = getTextForRole(user?.active_role, 0, banner_text?.banner_text).text;
    head($$payload, ($$payload2) => {
      $$payload2.title = `<title>${escape_html(getTitle(store_get($$store_subs ??= {}, "$t", t)("competitions")))}</title>`;
    });
    $$payload.out += `<div class="container mx-auto px-4 md:px-6 lg:px-8 mb-8">`;
    {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="flex flex-col items-center space-y-10">${escape_html(console.log("this is false running"))} `;
      if (text) {
        $$payload.out += "<!--[-->";
        BannerText($$payload, {
          text
        });
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> <div class="card-button-shadow bg-white rounded-2xl p-8 space-y-4 max-w-[400px] md:max-w-[2000px] md:w-[640px] lg:w-[912px]"><div class="font-bold text-2xl">${escape_html(store_get($$store_subs ??= {}, "$t", t)("pay_access"))}</div> <div class="text-lg">${escape_html(store_get($$store_subs ??= {}, "$t", t)("pay_message"))}</div> <div class="pt-2">`;
      Button($$payload, {
        label: store_get($$store_subs ??= {}, "$t", t)("continue_pay"),
        width: "full",
        onClick: continueToPay
      });
      $$payload.out += `<!----></div></div> <div class="card-button-shadow bg-white rounded-2xl p-8 space-y-4 max-w-[400px] md:max-w-[2000px] md:w-[640px] lg:w-[912px]"><div class="relative w-full" style="padding-top: 56.25%;"><iframe class="absolute top-0 left-0 w-full h-full"${attr("src", isGCLC ? "https://player.vimeo.com/video/1018226363?h=fb809ecf76" : "https://player.vimeo.com/video/1018288891?")}${attr("title", getInstanceText(store_get($$store_subs ??= {}, "$t", t), "bonzo_overview"))} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div> <div class="font-semibold md:text-2xl text-xl text-gray-900">${escape_html(getInstanceText(store_get($$store_subs ??= {}, "$t", t), "bonzo_overview"))}</div></div></div>`;
    }
    $$payload.out += `<!--]--></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  };
});
export {
  __tla,
  _page as default
};
