import { b as push, c as bind_props, p as pop, s as store_get, u as unsubscribe_stores } from "../../../../chunks/index.js";
import { f as forgotPasswordForm, __tla as __tla_0 } from "../../../../chunks/user.auth.da.js";
import { A as AuthenticationView } from "../../../../chunks/AuthenticationView.js";
import { r as request } from "../../../../chunks/api.service.js";
import { A as API_DEFINITIONS, __tla as __tla_1 } from "../../../../chunks/api.definitions.js";
import { g as getText, t } from "../../../../chunks/language.store.js";
import { a as showSuccess } from "../../../../chunks/toast.store.js";
import { d as getFormViewLogo } from "../../../../chunks/system..da.js";
import { B as Button } from "../../../../chunks/Button.js";
import { I as Image } from "../../../../chunks/Image.js";
import { f as fallback } from "../../../../chunks/utils2.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
import { o as onDestroy } from "../../../../chunks/index-server.js";
import "../../../../chunks/client.js";
import { s as sideBarAndAppBarSettings } from "../../../../chunks/utils.js";
import { B as BackgroundImage } from "../../../../chunks/BackgroundImage.js";
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
  function SuccessMessage($$payload, $$props) {
    push();
    let title = fallback($$props["title"], "Success!");
    let message = fallback($$props["message"], "");
    let buttonLabel = fallback($$props["buttonLabel"], "Back to login");
    let buttonLink = fallback($$props["buttonLink"], "/");
    let userEmail = fallback($$props["userEmail"], "");
    let logo = fallback($$props["logo"], getFormViewLogo, true);
    $$payload.out += `<div class="flex flex-col items-center justify-center min-h-[100vh]"><div class="bg-white w-full max-w-[90%] md:max-w-[600px] md:max-h-[90%] md:h-auto rounded-[20px] shadow-lg overflow-y-auto relative px-5 py-14 mx-auto">`;
    Image($$payload, {
      src: logo,
      alt: "Instance Logo",
      className: "mx-auto mb-8 w-32"
    });
    $$payload.out += `<!----> <div class="text-center mt-15"><svg class="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <h2 class="text-2xl font-medium text-gray-800 mb-2">${escape_html(title)}</h2> <p class="text-gray-700 mb-6 text-base md:text-lg">${escape_html(message)} <strong>${escape_html(userEmail)}</strong>.</p> `;
    Button($$payload, {
      link: buttonLink,
      label: buttonLabel,
      customClass: "w-full md:w-[160px]"
    });
    $$payload.out += `<!----></div></div></div>`;
    bind_props($$props, {
      title,
      message,
      buttonLabel,
      buttonLink,
      userEmail,
      logo
    });
    pop();
  }
  _page = function($$payload, $$props) {
    push();
    var $$store_subs;
    let isEmailSent = false;
    let userEmail = "";
    const modifiedForgotPasswordForm = {
      ...forgotPasswordForm,
      handleSubmit: async (formData) => {
        const { error_code } = await request(API_DEFINITIONS.FORGOT_PASSWORD, {
          email: formData.email,
          t_token: formData.turnstileToken
        });
        if (error_code === 0) {
          showSuccess(await getText("password_reset_email_sent"));
          isEmailSent = true;
          userEmail = formData.email;
        }
      }
    };
    onDestroy(() => {
      sideBarAndAppBarSettings(true, "back", "/");
    });
    {
      $$payload.out += "<!--[!-->";
      {
        $$payload.out += "<!--[!-->";
        if (isEmailSent) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="w-full">`;
          BackgroundImage($$payload, {});
          $$payload.out += `<!----> `;
          SuccessMessage($$payload, {
            title: store_get($$store_subs ??= {}, "$t", t)("reset_link_sent"),
            message: store_get($$store_subs ??= {}, "$t", t)("reset_link_sent_message"),
            buttonLink: "/account/user/login",
            userEmail
          });
          $$payload.out += `<!----></div>`;
        } else {
          $$payload.out += "<!--[!-->";
          AuthenticationView($$payload, {
            form: modifiedForgotPasswordForm
          });
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
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
