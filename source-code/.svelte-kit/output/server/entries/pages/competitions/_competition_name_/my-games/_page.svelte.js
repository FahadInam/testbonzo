import { h as head, p as pop, b as push, s as store_get, u as unsubscribe_stores } from "../../../../../chunks/index.js";
import { I as IMAGES } from "../../../../../chunks/images.constants.js";
import { P as PageHeading } from "../../../../../chunks/PageHeading.js";
import { t } from "../../../../../chunks/language.store.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
import "clsx";
import "../../../../../chunks/user.store.js";
import "lz-string";
import "../../../../../chunks/client.js";
import "../../../../../chunks/client2.js";
import "../../../../../chunks/system..da.js";
import "../../../../../chunks/index2.js";
import { __tla as __tla_0 } from "../../../../../chunks/api.definitions.js";
import "notyf";
import { __tla as __tla_1 } from "../../../../../chunks/user.auth.da.js";
import "../../../../../chunks/gamedata.store.js";
import "../../../../../chunks/GameCard.svelte_svelte_type_style_lang.js";
import { G as GameCardSkeleton } from "../../../../../chunks/GameCardSkeleton.js";
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
  function GameListingSkeleton($$payload) {
    $$payload.out += `<div class="flex justify-center items-center mt-10 mb-10 animate-pulse space-y-4"><div class="bg-black/30 w-full h-[50px] flex flex-col max-w-xl p-3 md:p-5 rounded-xl md:rounded-2xl"></div></div> `;
    GameCardSkeleton($$payload);
    $$payload.out += `<!---->`;
  }
  _page = function($$payload, $$props) {
    push();
    var $$store_subs;
    head($$payload, ($$payload2) => {
      $$payload2.title = `<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("my_games"))}</title>`;
    });
    $$payload.out += `<div class="flex justify-center w-full px-4 sm:px-6 md:px-8 lg:px-10"><div class="w-full max-w-screen-lg space-y-6"><div class="w-full">`;
    PageHeading($$payload, {
      icon: IMAGES.TOPICS_ICON,
      title: "my_games",
      imageClass: "w-8 h-8 sm:w-10 sm:h-10"
    });
    $$payload.out += `<!----></div> <div class="w-full">`;
    {
      $$payload.out += "<!--[-->";
      GameListingSkeleton($$payload);
    }
    $$payload.out += `<!--]--></div></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  };
});
export {
  __tla,
  _page as default
};
