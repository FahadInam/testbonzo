import "clsx";
import { p as pop, b as push } from "../../../../../chunks/index.js";
import { __tla as __tla_0 } from "../../../../../chunks/user.auth.da.js";
import "../../../../../chunks/client.js";
import "../../../../../chunks/client2.js";
import "../../../../../chunks/user.store.js";
import "lz-string";
import "../../../../../chunks/language.store.js";
import "../../../../../chunks/system..da.js";
import "../../../../../chunks/index2.js";
import "js-sha256";
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
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
    pop();
  };
});
export {
  __tla,
  _page as default
};
