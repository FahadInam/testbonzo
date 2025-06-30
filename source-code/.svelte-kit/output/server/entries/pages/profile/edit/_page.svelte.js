import { p as pop, b as push, s as store_get, u as unsubscribe_stores } from "../../../../chunks/index.js";
import { o as onDestroy } from "../../../../chunks/index-server.js";
import "../../../../chunks/client.js";
import "clsx";
import { u as userStore } from "../../../../chunks/user.store.js";
import { s as sideBarAndAppBarSettings } from "../../../../chunks/utils.js";
import "../../../../chunks/country.constant.js";
import { __tla as __tla_0 } from "../../../../chunks/api.definitions.js";
import "../../../../chunks/language.store.js";
import "notyf";
import "../../../../chunks/system..da.js";
import "../../../../chunks/client2.js";
import "js-sha256";
import { __tla as __tla_1 } from "../../../../chunks/user.auth.da.js";
import "../../../../chunks/avatar2.js";
import { E as EditProfileSkeleton } from "../../../../chunks/EditProfileSkeleton.js";
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
    onDestroy(() => {
      if (store_get($$store_subs ??= {}, "$userStore", userStore).active_role == "principal") {
        return;
      } else {
        sideBarAndAppBarSettings(true, "back", "/competitions");
      }
    });
    $$payload.out += `<div class="w-full max-w-[940px] m-auto px-4">`;
    {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="w-full">`;
      EditProfileSkeleton($$payload);
      $$payload.out += `<!----></div>`;
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
