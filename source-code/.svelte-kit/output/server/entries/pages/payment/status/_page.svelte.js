import { e as escape_html, s as store_get, u as unsubscribe_stores, d as bind_props, p as pop, b as push, c as attr } from "../../../../chunks/index.js";
import { t } from "../../../../chunks/language.store.js";
import { f as formatPaymentMethod, c as calculateExpiryDate, P as PAYMENT_SUPPORT_DETAILS, a as formatDate$1, g as getPaymentTitle, b as getPaymentDescription, i as isPaymentSuccessful, __tla as __tla_0 } from "../../../../chunks/payment.da.js";
import { I as IMAGES } from "../../../../chunks/images.constants.js";
import "../../../../chunks/client.js";
import "../../../../chunks/payment.store.js";
import "../../../../chunks/user.store.js";
import "lz-string";
import "../../../../chunks/client2.js";
import { a as isShupavu } from "../../../../chunks/system..da.js";
import "../../../../chunks/index2.js";
import { __tla as __tla_1 } from "../../../../chunks/api.definitions.js";
import "notyf";
import { __tla as __tla_2 } from "../../../../chunks/user.auth.da.js";
import { S as Stepper } from "../../../../chunks/Stepper.js";
import "clsx";
import "../../../../chunks/useractivity.store.js";
import { f as fallback } from "../../../../chunks/utils2.js";
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
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })()
]).then(async () => {
  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", {
      month: "short"
    });
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, "0");
    return `${day} ${month}, ${year} (${formattedHours}:${minutes} ${ampm})`;
  }
  function TransactionReceipt($$payload, $$props) {
    push();
    var $$store_subs;
    let successful = fallback($$props["successful"], false);
    let paymentData = fallback($$props["paymentData"], () => ({}), true);
    const transactionDate = formatDate(/* @__PURE__ */ new Date());
    console.log(paymentData, "paymentData");
    if (isShupavu && successful || !isShupavu) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="w-full max-w-md border border-gray-200 rounded-lg overflow-hidden mb-4"><div class="flex justify-between py-3 px-4 border-gray-200"><span class="text-gray-600">${escape_html(store_get($$store_subs ??= {}, "$t", t)("transaction_date"))}</span> <span class="font-medium">${escape_html(transactionDate)}</span></div> <div class="flex justify-between py-3 px-4 border-gray-200"><span class="text-gray-600">${escape_html(store_get($$store_subs ??= {}, "$t", t)("payment_method"))}</span> <span class="font-medium">${escape_html(formatPaymentMethod(paymentData.payment_mode))}</span></div> <div class="flex justify-between py-3 px-4"><span class="text-gray-600">${escape_html(store_get($$store_subs ??= {}, "$t", t)("amount_paid"))}</span> <span class="font-medium">${escape_html(paymentData.amount || "0")}</span></div></div> `;
      if (successful) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="w-full max-w-md border border-gray-200 rounded-lg overflow-hidden"><div class="flex justify-between py-3 px-4"><span class="text-gray-600">${escape_html(store_get($$store_subs ??= {}, "$t", t)("subscription_expiry"))}</span> <span class="font-medium">${escape_html(calculateExpiryDate(paymentData?.subscription_end_date))}</span></div></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, {
      successful,
      paymentData
    });
    pop();
  }
  function PaymentFooter($$payload, $$props) {
    push();
    var $$store_subs;
    $$payload.out += `<footer class="bg-white py-8 px-4 w-full"><div class="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-center"><div class="mb-6 md:mb-0"><h2 class="text-[#02BBFE] font-bold text-base mb-2">${escape_html(store_get($$store_subs ??= {}, "$t", t)("help_support"))}</h2> <p class="text-gray-700 text-xs">Need our help? Our support team is available for<br> 24/7 assistance for you.</p></div> <div class="flex flex-col space-y-4"><div class="flex items-center gap-2"><img${attr("src", IMAGES.PHONE_ICON)} alt="Phone" class="h-4 w-4"> <span class="text-gray-700 text-xs">${escape_html(PAYMENT_SUPPORT_DETAILS.PHONE)}</span></div> <div class="flex items-center gap-2"><img${attr("src", IMAGES.MESSAGE_ICON)} alt="Email" class="h-4 w-4"> <span class="text-gray-700 text-xs">${escape_html(PAYMENT_SUPPORT_DETAILS.EMAIL)}</span></div></div></div></footer>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  }
  _page = function($$payload, $$props) {
    push();
    var $$store_subs;
    let successful;
    let paymentData = {
      transactionStatus: null,
      transactionRef: "",
      amount: "",
      durationMonths: 0,
      payment_mode: "",
      subscription_end_date: ""
    };
    formatDate$1(/* @__PURE__ */ new Date());
    let activeStep = 3;
    const steps = [
      {
        title: "Choose Payment"
      },
      {
        title: "Confirm"
      },
      {
        title: "Payment Status"
      }
    ];
    successful = isPaymentSuccessful(paymentData);
    $$payload.out += `<div class="flex items-center justify-center"><div class="w-full mx-auto flex flex-col items-center">`;
    Stepper($$payload, {
      steps,
      activeStep
    });
    $$payload.out += `<!----> `;
    {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="w-8 h-8 rounded-full flex items-center justify-center mb-4 mt-6"><img${attr("src", successful ? IMAGES.PAYMENT_SUCCESS_ICON : IMAGES.PAYMENT_FAILED_ICON)} alt="Success Icon" class="w-8 h-8"></div> <h1 class="text-2xl font-bold text-center mb-2">${escape_html(getPaymentTitle(successful, store_get($$store_subs ??= {}, "$t", t)))}</h1> <p class="text-gray-600 text-center mb-6">${escape_html(getPaymentDescription(successful, store_get($$store_subs ??= {}, "$t", t)))}</p> `;
      if (!isShupavu) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="w-full text-center mb-6"><p class="text-gray-800 font-semibold">Order ID: ${escape_html(paymentData.transactionRef || "Processing...")}</p></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      TransactionReceipt($$payload, {
        successful,
        paymentData
      });
      $$payload.out += `<!----> <button class="mt-8 bg-[#02BBFE] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 w-full max-w-sm">`;
      if (successful) {
        $$payload.out += "<!--[-->";
        $$payload.out += `${escape_html(store_get($$store_subs ??= {}, "$t", t)("go_to_my_competitions"))}`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `${escape_html(store_get($$store_subs ??= {}, "$t", t)("try_again"))}`;
      }
      $$payload.out += `<!--]--></button>`;
    }
    $$payload.out += `<!--]--> `;
    PaymentFooter($$payload);
    $$payload.out += `<!----></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  };
});
export {
  __tla,
  _page as default
};
