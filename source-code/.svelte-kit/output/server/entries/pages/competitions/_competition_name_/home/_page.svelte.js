import { s as store_get, h as head, u as unsubscribe_stores, p as pop, b as push } from "../../../../../chunks/index.js";
import "../../../../../chunks/GameCard.svelte_svelte_type_style_lang.js";
import { t } from "../../../../../chunks/language.store.js";
import { c as competitionStore } from "../../../../../chunks/appbar.store.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
import "clsx";
import { u as userStore } from "../../../../../chunks/user.store.js";
import { I as IsGuestMode } from "../../../../../chunks/utils.js";
import { __tla as __tla_0 } from "../../../../../chunks/api.definitions.js";
import "../../../../../chunks/client.js";
import "notyf";
import { __tla as __tla_1 } from "../../../../../chunks/user.auth.da.js";
import "../../../../../chunks/system..da.js";
import "../../../../../chunks/avatar2.js";
import "../../../../../chunks/gamedata.store.js";
import "../../../../../chunks/useractivity.store.js";
import { G as GameCardSkeleton } from "../../../../../chunks/GameCardSkeleton.js";
import { L as ListBoxSkeleton } from "../../../../../chunks/ListBoxSkeleton.js";
import moment from "moment";
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
  function HomeScreenSkeleton($$payload) {
    $$payload.out += `<div class="flex w-full justify-center items-center mt-10 mb-10 animate-pulse space-y-4"><div class="bg-black/30 w-full flex flex-col p-2.5 rounded-full"></div></div> <div class="mb-14">`;
    GameCardSkeleton($$payload);
    $$payload.out += `<!----></div> `;
    ListBoxSkeleton($$payload, {});
    $$payload.out += `<!---->`;
  }
  _page = function($$payload, $$props) {
    push();
    var $$store_subs;
    let title = "";
    const utcDate = moment().utc();
    utcDate.format("YYYY-MM-DD HH:mm:ss");
    if (store_get($$store_subs ??= {}, "$userStore", userStore)) {
      IsGuestMode();
    }
    head($$payload, ($$payload2) => {
      $$payload2.title = `<title>${escape_html(store_get($$store_subs ??= {}, "$competitionStore", competitionStore).name || store_get($$store_subs ??= {}, "$t", t)("competition"))}</title>`;
    });
    $$payload.out += `<div class="flex justify-center w-full px-4 sm:px-6 md:px-8 lg:px-10"><div class="w-full max-w-screen-lg space-y-6"><div class="w-full mb-0 text-center"><h2 class="text-white font-medium text-3xl mb-2">${escape_html(store_get($$store_subs ??= {}, "$competitionStore", competitionStore).name)}</h2> <p class="text-white font-normal text-lg">${escape_html(title)}</p></div> `;
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    {
      $$payload.out += "<!--[-->";
      HomeScreenSkeleton($$payload);
    }
    $$payload.out += `<!--]--></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  };
});
export {
  __tla,
  _page as default
};
