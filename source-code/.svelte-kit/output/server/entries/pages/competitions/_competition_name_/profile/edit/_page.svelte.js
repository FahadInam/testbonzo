import "clsx";
import { p as pop, b as push } from "../../../../../../chunks/index.js";
import { o as onDestroy } from "../../../../../../chunks/index-server.js";
import { s as sideBarAndAppBarSettings } from "../../../../../../chunks/utils.js";
import "../../../../../../chunks/language.store.js";
import "../../../../../../chunks/client.js";
import "../../../../../../chunks/user.store.js";
import "../../../../../../chunks/country.constant.js";
import { __tla as __tla_0 } from "../../../../../../chunks/api.definitions.js";
import "notyf";
import "../../../../../../chunks/system..da.js";
import "../../../../../../chunks/client2.js";
import "js-sha256";
import "../../../../../../chunks/avatar2.js";
import { E as EditProfileSkeleton } from "../../../../../../chunks/EditProfileSkeleton.js";
let _page;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  _page = function($$payload, $$props) {
    push();
    onDestroy(() => {
      sideBarAndAppBarSettings(true, "competitions", "/competitions");
    });
    $$payload.out += `<div class="w-full max-w-[940px] m-auto px-4">`;
    {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="w-full">`;
      EditProfileSkeleton($$payload);
      $$payload.out += `<!----></div>`;
    }
    $$payload.out += `<!--]--></div>`;
    pop();
  };
});
export {
  __tla,
  _page as default
};
