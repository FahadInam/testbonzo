import { s as store_get, u as unsubscribe_stores, p as pop, b as push } from "../../../../chunks/index.js";
import "../../../../chunks/client.js";
import "clsx";
import "../../../../chunks/client2.js";
import { __tla as __tla_0 } from "../../../../chunks/common.auth.data.js";
import { A as AuthenticationView, __tla as __tla_1 } from "../../../../chunks/AuthenticationView.js";
import { t } from "../../../../chunks/language.store.js";
import { g as getInstanceText } from "../../../../chunks/utils.js";
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
    let cards = [];
    const cardTitle = getInstanceText(store_get($$store_subs ??= {}, "$t", t), "bonzo_as");
    {
      $$payload.out += "<!--[!-->";
      AuthenticationView($$payload, {
        useModal: false,
        cardTitle,
        cards
      });
    }
    $$payload.out += `<!--]-->`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  };
});
export {
  __tla,
  _page as default
};
