import { s as store_get, u as unsubscribe_stores, p as pop, b as push, e as escape_html, c as attr } from "../../../../chunks/index.js";
import { B as Button } from "../../../../chunks/Button.js";
import { P as PopupScreen } from "../../../../chunks/PopupScreen.js";
import { p as page } from "../../../../chunks/stores.js";
import { F as Form, __tla as __tla_0 } from "../../../../chunks/Form.js";
import { P as PUBLIC_TURNSTILE_KEY } from "../../../../chunks/public.js";
import { r as resendEmail, __tla as __tla_1 } from "../../../../chunks/user.auth.da.js";
import { t } from "../../../../chunks/language.store.js";
import "../../../../chunks/client.js";
import { n as navigationStore } from "../../../../chunks/appbar.store.js";
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
    let email = store_get($$store_subs ??= {}, "$page", page).state?.data?.email;
    let logo = "/images/bonzo-logo.png";
    const handleSubmit = (data) => {
      const dto = {
        email: store_get($$store_subs ??= {}, "$page", page).state?.data?.email,
        t_token: data.turnstileToken,
        role: store_get($$store_subs ??= {}, "$page", page).state?.data?.role
      };
      resendEmail(dto);
    };
    {
      if (store_get($$store_subs ??= {}, "$page", page).state && Object.keys(store_get($$store_subs ??= {}, "$page", page).state).length === 0) {
        window.history.go(-1);
      }
    }
    $$payload.out += `<!---->`;
    PopupScreen?.($$payload, {
      backButtonLabel: "Back",
      backButtonLink: store_get($$store_subs ??= {}, "$navigationStore", navigationStore).back_url,
      $$slots: {
        body: ($$payload2) => {
          $$payload2.out += `<div slot="body"><div class="w-full px-2"><img${attr("src", logo)} alt="Bonzo Logo" class="mx-auto mb-4 w-32"> <h2 class="text-2xl font-medium text-gray-800">${escape_html(store_get($$store_subs ??= {}, "$t", t)("account_verification"))}</h2> <div class="pt-5"><p class="text-md font-normal font-['Poppins']">${escape_html(store_get($$store_subs ??= {}, "$t", t)("email_verification"))} <br> <span class="font-semibold">${escape_html(email)}</span>. <br> ${escape_html(store_get($$store_subs ??= {}, "$t", t)("check_inbox"))}</p></div> <div class="pt-5"><p class="text-md font-normal font-['Poppins']">${escape_html(store_get($$store_subs ??= {}, "$t", t)("email_not_received"))} <br></p></div> `;
          Form($$payload2, {
            enableTurnstile: true,
            turnstileSiteKey: PUBLIC_TURNSTILE_KEY,
            handleSubmit,
            fields: [],
            buttons: [
              {
                type: "submit",
                label: "Resend Email",
                customClass: "w-full"
              }
            ]
          });
          $$payload2.out += `<!----></div></div>`;
        },
        footer: ($$payload2) => {
          $$payload2.out += `<div slot="footer"><div class="text-center mt-0 text-gray-600 bg-gray-100 p-2">${escape_html(store_get($$store_subs ??= {}, "$t", t)("already_account"))} <span class="ms-3"></span> `;
          Button($$payload2, {
            width: "w-[120px]",
            type: "secondary-outlined-inverted",
            label: "Login"
          });
          $$payload2.out += `<!----></div></div>`;
        }
      }
    });
    $$payload.out += `<!---->`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  };
});
export {
  __tla,
  _page as default
};
