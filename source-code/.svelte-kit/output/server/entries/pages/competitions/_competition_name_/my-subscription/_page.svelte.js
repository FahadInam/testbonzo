import "clsx";
import { p as pop, b as push } from "../../../../../chunks/index.js";
import { S as SubscriptionCard } from "../../../../../chunks/SubscriptionCard.js";
import "../../../../../chunks/user.store.js";
import "lz-string";
import "../../../../../chunks/client.js";
import "../../../../../chunks/client2.js";
import "../../../../../chunks/language.store.js";
import "../../../../../chunks/system..da.js";
import { I as IMAGES } from "../../../../../chunks/images.constants.js";
import "../../../../../chunks/index2.js";
import { __tla as __tla_0 } from "../../../../../chunks/api.definitions.js";
import "../../../../../chunks/useractivity.store.js";
import "notyf";
import { __tla as __tla_1 } from "../../../../../chunks/payment.da.js";
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
    let data;
    console.log(data, "data");
    SubscriptionCard($$payload, {
      icon: IMAGES.SUBSCRIPTION_ICON,
      width: "w-[80%]",
      children: ($$payload2) => {
        {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      },
      $$slots: {
        default: true
      }
    });
    pop();
  };
});
export {
  __tla,
  _page as default
};
