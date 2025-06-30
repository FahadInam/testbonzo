import { f as ensure_array_like, h as head, p as pop, b as push, s as store_get, u as unsubscribe_stores } from "../../../../../chunks/index.js";
import { o as onDestroy } from "../../../../../chunks/index-server.js";
import { t } from "../../../../../chunks/language.store.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
import "clsx";
import "../../../../../chunks/client.js";
import "../../../../../chunks/client2.js";
import "../../../../../chunks/user.store.js";
import { s as sideBarAndAppBarSettings } from "../../../../../chunks/utils.js";
import { __tla as __tla_0 } from "../../../../../chunks/api.definitions.js";
let _page;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function SkeletonStats($$payload) {
    const each_array = ensure_array_like(Array(3));
    $$payload.out += `<div class="w-full text-center space-y-4 mt-5"><!--[-->`;
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      each_array[index];
      const each_array_1 = ensure_array_like(Array(5));
      $$payload.out += `<div class="w-full text-center space-y-4 mt-5"><div class="rounded-2xl mb-8 px-4 max-w-[600px] md:max-w-[960px] mx-auto"><div class="p-6 rounded-2xl bg-gray-200 text-center text-white"><div class="animate-pulse"><div class="h-2 mt-2 flex items-center justify-center"><div class="h-10 w-10 bg-gray-400/50 rounded-full mr-2"></div> <div class="h-8 md:w-64 w-52 bg-gray-400/50 rounded-xl"></div></div> <div class="flex flex-col items-center md:flex-row md:items-start md:mt-16 mt-12 justify-evenly"><div class="flex md:mb-0 mb-8 flex-col items-center"><div class="w-[200px] h-8 bg-gray-400/50 rounded-full"></div> <div class="w-[200px] my-5 h-28 bg-gray-400/50 rounded-xl"></div> <div class="w-[140px] h-16 bg-gray-400/50 rounded-xl"></div></div> <div><!--[-->`;
      for (let i = 0, $$length2 = each_array_1.length; i < $$length2; i++) {
        each_array_1[i];
        $$payload.out += `<div class="w-[230px] h-10 bg-gray-400/50 rounded-full mb-3.5"></div>`;
      }
      $$payload.out += `<!--]--></div></div></div></div></div></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  _page = function($$payload, $$props) {
    push();
    var $$store_subs;
    onDestroy(() => {
      sideBarAndAppBarSettings(true, "competitions", "/competitions");
    });
    head($$payload, ($$payload2) => {
      $$payload2.title = `<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("stats"))}</title>`;
    });
    $$payload.out += `<div class="flex w-full justify-center">`;
    {
      $$payload.out += "<!--[-->";
      SkeletonStats($$payload);
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
