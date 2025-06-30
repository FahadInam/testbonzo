import { s as store_get, u as unsubscribe_stores, p as pop, b as push } from "../../../../chunks/index.js";
import "../../../../chunks/client.js";
import "clsx";
import "../../../../chunks/client2.js";
import "../../../../chunks/user.store.js";
import "lz-string";
import "../../../../chunks/language.store.js";
import "../../../../chunks/system..da.js";
import "../../../../chunks/index2.js";
import "js-sha256";
import { o as otpStore, __tla as __tla_0 } from "../../../../chunks/user.auth.da.js";
import "notyf";
import { __tla as __tla_1 } from "../../../../chunks/common.auth.data.js";
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
    let isOtpVerified;
    let otpVerificationFields;
    isOtpVerified = store_get($$store_subs ??= {}, "$otpStore", otpStore).is_otp_verified;
    ({
      ...otpVerificationFields,
      fields: otpVerificationFields?.fields.map((field) => {
        if (field.name === "password") {
          return {
            ...field,
            isShow: isOtpVerified
          };
        }
        if (field.name === "otp") {
          return {
            ...field,
            readonly: isOtpVerified
          };
        }
        return field;
      }).filter((field) => field.isShow !== false)
    });
    {
      $$payload.out += "<!--[!-->";
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
