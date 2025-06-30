import { h as head, p as pop, b as push, s as store_get, u as unsubscribe_stores } from "../../../../../chunks/index.js";
import { t } from "../../../../../chunks/language.store.js";
import { P as PageHeading } from "../../../../../chunks/PageHeading.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
import "clsx";
import "../../../../../chunks/user.store.js";
import "lz-string";
import "../../../../../chunks/client.js";
import "../../../../../chunks/client2.js";
import "../../../../../chunks/system..da.js";
import { I as IMAGES } from "../../../../../chunks/images.constants.js";
import "../../../../../chunks/index2.js";
import { __tla as __tla_0 } from "../../../../../chunks/api.definitions.js";
import "notyf";
import { __tla as __tla_1 } from "../../../../../chunks/user.auth.da.js";
import "../../../../../chunks/avatar2.js";
import "../../../../../chunks/gamedata.store.js";
import "../../../../../chunks/useractivity.store.js";
import { L as ListingSkeleton } from "../../../../../chunks/ListingSkeleton.js";
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
    head($$payload, ($$payload2) => {
      $$payload2.title = `<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("lessons"))}</title>`;
    });
    $$payload.out += `<div class="flex justify-center w-full px-4 sm:px-6 md:px-8 lg:px-10"><div class="w-full max-w-screen-lg space-y-6"><div class="w-full">`;
    PageHeading($$payload, {
      icon: IMAGES.LESSON_IMAGE,
      title: "lessons",
      imageClass: "w-9 h-11 sm:w-13 sm:h-9"
    });
    $$payload.out += `<!----></div> `;
    {
      $$payload.out += "<!--[-->";
      ListingSkeleton($$payload, {});
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
