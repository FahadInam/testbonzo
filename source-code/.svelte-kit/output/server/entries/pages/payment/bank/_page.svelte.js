import { e as escape_html, s as store_get, u as unsubscribe_stores, p as pop, b as push } from "../../../../chunks/index.js";
import { S as Stepper } from "../../../../chunks/Stepper.js";
import { B as BANK_DETAILS, __tla as __tla_0 } from "../../../../chunks/payment.da.js";
import { t } from "../../../../chunks/language.store.js";
import { s as setBackUrl } from "../../../../chunks/appbar.store.js";
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
    var $$store_subs;
    const steps = [
      {
        title: "Choose Payment"
      },
      {
        title: "Pending"
      }
    ];
    const activeStep = 1;
    let subscriptionData = {};
    let data;
    setBackUrl("/payment");
    $$payload.out += `<div class="bg-white"><div class="flex flex-col items-center py-6"><div class="bg-white rounded-3xl overflow-y-auto z-10 mb-8 lg:mb-0 w-full"><div class="bg-white"><div class="flex flex-col sm:flex-row items-baseline pt-0.5 lg:pt-0"><div class="w-full mb-4">`;
    Stepper($$payload, {
      steps,
      activeStep
    });
    $$payload.out += `<!----></div></div> <h1 class="text-2xl font-bold text-[#1D2433] mb-2">${escape_html(store_get($$store_subs ??= {}, "$t", t)("confirm_payment"))}</h1> <p class="text-[#1D2433] font-medium mb-8">${escape_html(store_get($$store_subs ??= {}, "$t", t)("transaction_id_no"))} ${escape_html(data)}. ${escape_html(store_get($$store_subs ??= {}, "$t", t)("bank_instruction"))}</p> <div class="flex flex-col lg:flex-row justify-between mb-4 mt-8 gap-8 items-center"><div class="flex-1"><h2 class="text-2xl font-bold text-[#1D2433]">${escape_html(store_get($$store_subs ??= {}, "$t", t)("bank_instructions"))}</h2> <div><p class="text-gray-500 my-3">${escape_html(store_get($$store_subs ??= {}, "$t", t)("step_1"))}</p> <p class="text-[#1D2433] font-medium my-3">${escape_html(store_get($$store_subs ??= {}, "$t", t)("screenshot_detail"))}</p> <p class="text-gray-500 my-3">${escape_html(store_get($$store_subs ??= {}, "$t", t)("step_2"))}</p> <p class="text-[#1D2433] font-medium my-3">Initiate a bank transfer of PKR ${escape_html(subscriptionData[0]?.amount)}/= to the details mentioned.</p> <p class="text-gray-500 my-3">${escape_html(store_get($$store_subs ??= {}, "$t", t)("step_3"))}</p> <p class="text-[#1D2433] font-medium my-3">${escape_html(store_get($$store_subs ??= {}, "$t", t)("whatsapp_detail"))}</p></div></div> <div class="flex-1 w-full md:w-auto"><h3 class="text-2xl font-bold text-[#1D2433]">${escape_html(store_get($$store_subs ??= {}, "$t", t)("bank_details"))}</h3> <div class="bg-white shadow-md rounded-lg mt-4 p-4"><div class="block md:flex justify-between mb-1 gap-8 text-center md:text-left"><p class="text-gray-500 my-3">${escape_html(store_get($$store_subs ??= {}, "$t", t)("bank_account_title"))}</p> <p class="text-[#1D2433] font-medium my-3">${escape_html(BANK_DETAILS.ACCOUNT_TITLE)}</p></div> <div class="block md:flex justify-between mb-1 text-center md:text-left"><p class="text-gray-500 my-3">${escape_html(store_get($$store_subs ??= {}, "$t", t)("bank_iban"))}</p> <p class="text-[#1D2433] font-medium my-3">${escape_html(BANK_DETAILS.IBAN)}</p></div> <div class="block md:flex justify-between mb-1 text-center md:text-left"><p class="text-gray-500 my-3">${escape_html(store_get($$store_subs ??= {}, "$t", t)("bank_account_number"))}</p> <div class="flex items-center justify-center md:justify-start"><p class="text-[#1D2433] font-medium my-3">${escape_html(BANK_DETAILS.ACCOUNT_NUMBER)}</p> <button class="ml-2 text-[#02BBFE]" aria-label="Copy to clipboard"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg></button></div></div> <div class="block md:flex justify-between mb-1 text-center md:text-left"><p class="text-gray-500 my-3">${escape_html(store_get($$store_subs ??= {}, "$t", t)("bank_name"))}</p> <p class="text-[#1D2433] font-medium my-3">${escape_html(BANK_DETAILS.BANK_NAME)}</p></div> <div class="border-t border-gray-300 my-4"></div> <div class="block md:flex text-center md:text-left justify-between"><p class="text-gray-500 my-3">${escape_html(store_get($$store_subs ??= {}, "$t", t)("pending_amount"))}</p> <p class="text-[#1D2433] font-medium my-3">PKR ${escape_html(subscriptionData[0]?.amount)}</p></div></div></div></div></div></div></div></div> `;
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
