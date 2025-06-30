import { b as push, f as ensure_array_like, d as stringify, c as bind_props, p as pop, s as store_get, u as unsubscribe_stores, i as copy_payload, j as assign_payload } from "../../../chunks/index.js";
import { f as fallback } from "../../../chunks/utils2.js";
import { a as attr } from "../../../chunks/attributes.js";
import { e as escape_html } from "../../../chunks/escaping.js";
import { S as Stepper } from "../../../chunks/Stepper.js";
import { C as COLOR_CONFIG, D as DEFAULT_COLORS, t as texts, G as GAMES_COUNT, d as filterBundlesByUserType, p as paymentDataFields, e as processSafaricomPayment, h as processDpoPayment, j as paymentOptions, __tla as __tla_0 } from "../../../chunks/payment.da.js";
import { u as userStore } from "../../../chunks/user.store.js";
import { t } from "../../../chunks/language.store.js";
import { p as paymentStore } from "../../../chunks/payment.store.js";
import "../../../chunks/client.js";
import { a as isShupavu } from "../../../chunks/system..da.js";
import { i as isSafaricomUser } from "../../../chunks/user.constants.js";
import { I as IMAGES } from "../../../chunks/images.constants.js";
import { F as Form } from "../../../chunks/Form.js";
let _page;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function PaymentCard($$payload, $$props) {
    push();
    let paymentOptions2 = fallback($$props["paymentOptions"], () => [], true);
    let selectedOption = fallback($$props["selectedOption"], "");
    const each_array = ensure_array_like(paymentOptions2);
    $$payload.out += `<div class="grid grid-cols-1 lg:grid-cols-3 gap-4"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let option = each_array[$$index];
      $$payload.out += `<button type="button"${attr("class", `border min-h-[169px] p-6 rounded-xl cursor-pointer transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex flex-col justify-between h-full ${stringify([
        selectedOption === option.value ? "shadow-lg" : ""
      ].filter(Boolean).join(" "))}`)} tabindex="0"${attr("aria-pressed", selectedOption === option.value)}>`;
      if (option.icon) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<img${attr("src", option.icon)}${attr("alt", option.label)} class="w-11 mb-2">`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> <p class="text-lg font-medium mt-8">${escape_html(option.label)}</p></button>`;
    }
    $$payload.out += `<!--]--></div>`;
    bind_props($$props, {
      paymentOptions: paymentOptions2,
      selectedOption
    });
    pop();
  }
  function ShupavuPaymentCard($$payload, $$props) {
    push();
    let bundleType, image, colors, gamesCount, gameCount;
    let bundle = fallback($$props["bundle"], () => [], true);
    let isSelected = fallback($$props["isSelected"], false);
    let onClick = fallback($$props["onClick"], () => {
    });
    bundleType = bundle.title?.toLowerCase() || "daily";
    image = IMAGES[`${bundleType.toUpperCase()}_BUNDLE_IMAGE`] || IMAGES.DAILY_BUNDLE_IMAGE;
    colors = COLOR_CONFIG[bundleType] || DEFAULT_COLORS;
    [gamesCount] = bundle.description?.split(" ") || [
      "0"
    ];
    gameCount = GAMES_COUNT[bundleType] || 10;
    $$payload.out += `<div${attr("class", `bundle-card cursor-pointer border-2 border-black rounded-2xl bg-white transition-all duration-300 ease-in-out text-center m-1 transform scale-100 min-w-[234px] ${stringify(isSelected ? "selected-card border-[#02bbfe] bg-[#f0f8ff]" : "")}`)} tabindex="0" role="button"><div class="bundle-card-content p-0 relative">`;
    if (colors.discountText) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="bundle-discount absolute top-0 w-full text-center py-1 font-bold text-white text-base z-10"${attr("style", `background-color: ${stringify(colors.discountBgColor || "#0086FF")};`)}>${escape_html(colors.discountText)}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div${attr("class", `bundle-card-inner min-h-[320px] rounded-[14px] mb-[11px] p-[15px] pb-0 ${stringify(isSelected ? "shadow-[0px_12px_0px_-1px_#02bbfe]" : "bundle-card-shadow shadow-[0px_12px_0px_-1px_#d5dbea]")}`)}><div class="bundle-shape-box relative mt-[10px] mb-0"><div class="bundle-icon absolute w-[60px] left-[-22px] z-10 top-[-5px]"><img${attr("src", image)}${attr("alt", `${stringify(bundle.title)} Bundle Icon`)} class="w-full"></div> <div class="bundle-shape-container w-[90%] h-[50px] relative rounded-lg svelte-wr7ntx"${attr("style", `background-color: ${stringify(colors.bgColor)};`)}><span class="bundle-title text-white text-[22px] font-medium flex justify-start items-center h-full pl-[60px]">${escape_html(bundle.title)}</span></div> <span class="bundle-fix-title font-semibold text-lg mt-[2px] block text-left pl-[60px]"${attr("style", `color: ${stringify(colors.textColor)}`)}>${escape_html(texts.BUNDLE)}</span></div> <div class="mt-2 relative">`;
    if (colors.perdayText) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="games_badge absolute text-xs w-fit-content top-1 right-8 rounded-[30px] p-[2px_8px] font-medium transform -rotate-7"${attr("style", `color: ${stringify(colors.bgColor)}; background-color: ${stringify(colors.perdayTextBg)}`)}>${escape_html(colors.perdayText)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <h4 class="bundle-games-count text-[47px] font-semibold my-1 mx-0 relative"><span class="text-shadow-custom"${attr("style", `color: ${stringify(colors.gameNumberColor)};`)}>${escape_html(gamesCount)}</span> <span class="games-count-title text-[28px] mx-2 text-black">${escape_html(texts.GAMES)}</span></h4></div> <div class="bundle-pricing flex justify-center items-center font-semibold text-[22px] uppercase leading-[90px]"><span class="currency-title text-black">KES</span> <span class="bundle-amount text-[76px] text-[#ffff00] px-5 text-shadow-custom">${escape_html(bundle.amount)}</span></div> <div class="pb-4"><p class="bundle-description text-xs font-normal leading-normal py-0 px-5 w-[160px] mx-auto text-black">Up for ${escape_html(gameCount)} Games For Form 2</p></div></div></div></div>`;
    bind_props($$props, {
      bundle,
      isSelected,
      onClick
    });
    pop();
  }
  function ShupavuPayment($$payload, $$props) {
    push();
    var $$store_subs;
    let filteredBundle, formFields;
    let selectedBundle = null;
    let selectedOption = fallback($$props["selectedOption"], "");
    let paymentInitiated = fallback($$props["paymentInitiated"], false);
    const baseUrl = window.location.origin;
    let bundles = fallback($$props["bundles"], () => [], true);
    function handleBundleSelect(bundle) {
      selectedBundle = bundle;
      selectedOption = bundle;
    }
    const initiatePayment = async (data) => {
      const dto = {
        amount: selectedBundle.amount,
        subscription_guid: selectedBundle.subscription_guid,
        vendor_uid: selectedBundle.payment_vendor_guid,
        phone_number: store_get($$store_subs ??= {}, "$userStore", userStore).phone_number,
        grade: store_get($$store_subs ??= {}, "$paymentStore", paymentStore).current_grade.toString(),
        currency: "KES",
        duration_in_days: selectedBundle.duration_in_days,
        competition_id: store_get($$store_subs ??= {}, "$paymentStore", paymentStore)?.competition_id,
        timezone: store_get($$store_subs ??= {}, "$userStore", userStore)?.timezone,
        redirect_url: `${baseUrl}/payment/status`,
        back_url: `${baseUrl}/payment`,
        email: data.email
      };
      if (isSafaricomUser()) {
        await processSafaricomPayment(dto);
      } else {
        await processDpoPayment(dto);
      }
    };
    filteredBundle = filterBundlesByUserType(bundles);
    formFields = isSafaricomUser() ? paymentDataFields.fields.filter((field) => field.name !== "email") : paymentDataFields.fields;
    console.log(paymentDataFields, "isSafaricomUser");
    $$payload.out += `<div class="flex justify-center">`;
    if (!paymentInitiated && filteredBundle.length) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(filteredBundle);
      $$payload.out += `<!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let bundle = each_array[$$index];
        ShupavuPaymentCard($$payload, {
          bundle,
          isSelected: selectedBundle?.id === bundle.id,
          onClick: () => handleBundleSelect(bundle)
        });
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      Form($$payload, {
        enableTurnstile: false,
        turnstileSiteKey: "",
        handleSubmit: initiatePayment,
        fields: formFields,
        buttons: [
          {
            type: "submit",
            label: "Continue",
            customClass: "w-[500px]"
          }
        ]
      });
    }
    $$payload.out += `<!--]--></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, {
      selectedOption,
      paymentInitiated,
      bundles
    });
    pop();
  }
  _page = function($$payload, $$props) {
    push();
    var $$store_subs;
    let activeStep = 1;
    let subscriptionData = [];
    let paymentInitiated = false;
    const isSmallScreen = window.innerWidth < 640;
    const steps = [
      {
        title: isSmallScreen ? "Payment" : "Choose Payment"
      },
      {
        title: "Confirm"
      }
    ];
    let selectedOption = "";
    let $$settled = true;
    let $$inner_payload;
    function $$render_inner($$payload2) {
      Stepper($$payload2, {
        steps,
        activeStep
      });
      $$payload2.out += `<!----> <div class="text-left">`;
      if (!isShupavu) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<h1 class="sm:text-3xl text-2xl font-bold mb-3 sm:mb-6 mt-6 sm:mt-12">${escape_html(store_get($$store_subs ??= {}, "$t", t)("payment"))}</h1>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (!paymentInitiated) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<p${attr("class", `sm:text-lg text-gray-600  ${isShupavu ? "text-center mt-3 mb-3" : "mb-8"}`)}>`;
        if (isShupavu) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `${escape_html(store_get($$store_subs ??= {}, "$t", t)("shupavu_payment_method"))}`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `${escape_html(store_get($$store_subs ??= {}, "$t", t)("preferred_payment_method"))}`;
        }
        $$payload2.out += `<!--]--></p>`;
      } else {
        $$payload2.out += "<!--[!-->";
        if (isSafaricomUser()) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<p class="text-lg text-center mt-4 mb-8">${escape_html(store_get($$store_subs ??= {}, "$t", t)("confirm_timezone"))}</p>`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<p class="text-lg text-center mt-4 mb-8">${escape_html(store_get($$store_subs ??= {}, "$t", t)("enter_email"))}</p>`;
        }
        $$payload2.out += `<!--]-->`;
      }
      $$payload2.out += `<!--]--> `;
      if (isShupavu && !paymentInitiated) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<p class="text-center text-sm text-gray-600 mb-6">${escape_html(store_get($$store_subs ??= {}, "$t", t)("total_games"))}</p>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (isShupavu && subscriptionData.length) {
        $$payload2.out += "<!--[-->";
        ShupavuPayment($$payload2, {
          bundles: subscriptionData,
          get selectedOption() {
            return selectedOption;
          },
          set selectedOption($$value) {
            selectedOption = $$value;
            $$settled = false;
          },
          get paymentInitiated() {
            return paymentInitiated;
          },
          set paymentInitiated($$value) {
            paymentInitiated = $$value;
            $$settled = false;
          }
        });
      } else {
        $$payload2.out += "<!--[!-->";
        PaymentCard($$payload2, {
          paymentOptions,
          get selectedOption() {
            return selectedOption;
          },
          set selectedOption($$value) {
            selectedOption = $$value;
            $$settled = false;
          }
        });
      }
      $$payload2.out += `<!--]--> `;
      if (selectedOption && !paymentInitiated && !isShupavu) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<p class="text-gray-600 text-sm mt-4">You selected ${escape_html(selectedOption)} as your payment method.</p>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div> `;
      if (!paymentInitiated) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="flex justify-center items-center min-h-18 sm:mt-18 lg:mt-8"><button class="bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold text-lg disabled:bg-gray-600/25 w-[32rem]"${attr("disabled", !selectedOption, true)}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("continue"))}</button></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    }
    do {
      $$settled = true;
      $$inner_payload = copy_payload($$payload);
      $$render_inner($$inner_payload);
    } while (!$$settled);
    assign_payload($$payload, $$inner_payload);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  };
});
export {
  __tla,
  _page as default
};
