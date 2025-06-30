import { f as ensure_array_like, c as bind_props, p as pop, b as push, s as store_get, u as unsubscribe_stores } from "./index.js";
import { o as onDestroy } from "./index-server.js";
import { B as Button } from "./Button.js";
import { f as fallback } from "./utils2.js";
import { a as attr } from "./attributes.js";
import "./user.store.js";
import "lz-string";
import "./client.js";
import "./client2.js";
import { t } from "./language.store.js";
import { a as isShupavu } from "./system..da.js";
import "./index2.js";
import { sha256 } from "js-sha256";
import { e as escape_html } from "./escaping.js";
function Form($$payload, $$props) {
  push();
  var $$store_subs;
  let fields = fallback($$props["fields"], () => [], true);
  let buttons = fallback($$props["buttons"], () => [], true);
  let turnstileSiteKey = fallback($$props["turnstileSiteKey"], "");
  let enableTurnstile = fallback($$props["enableTurnstile"], false);
  let forgotPassword = fallback($$props["forgotPassword"], () => ({}), true);
  let formData = fallback($$props["formData"], () => ({}), true);
  let handleSubmit = fallback($$props["handleSubmit"], (formData2) => {
  });
  let handleError = fallback($$props["handleError"], (errors2) => {
  });
  let handleCancel = fallback($$props["handleCancel"], () => {
  });
  let handleOtherAction = fallback($$props["handleOtherAction"], (formData2) => {
  });
  let errors = {};
  let turnstileToken = "";
  let submitted = false;
  let showPasswords = {};
  onDestroy(() => {
  });
  const resetTurnstile = () => {
    return new Promise((accept, reject) => {
      if (enableTurnstile) {
        turnstileToken = null;
        enableTurnstile = false;
        setTimeout(
          () => {
            enableTurnstile = true;
            accept(true);
          },
          100
        );
      } else {
        accept(true);
      }
    });
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validatePhone = (phone) => {
    const shupavuRegex = /^\+254\d{9}$/;
    const normalRegex = /^(?:\+92|0)3\d{9}$/;
    const regex = isShupavu ? shupavuRegex : normalRegex;
    return regex.test(phone);
  };
  const validatePassword = (password) => {
    return password.length >= 8;
  };
  const validateField = (field) => {
    const { name, value, type, required } = field;
    if (required && !value) {
      errors[name] = store_get($$store_subs ??= {}, "$t", t)("field_required");
      return false;
    }
    switch (type) {
      case "email":
        if (!validateEmail(value)) {
          errors[name] = store_get($$store_subs ??= {}, "$t", t)("invalid_email");
          return false;
        }
        break;
      case "tel":
        if (!validatePhone(value)) {
          errors[name] = store_get($$store_subs ??= {}, "$t", t)("invalid_phone");
          return false;
        }
        break;
      case "password":
        if (!validatePassword(value)) {
          errors[name] = store_get($$store_subs ??= {}, "$t", t)("invalid_password");
          return false;
        }
        break;
    }
    delete errors[name];
    return true;
  };
  const validateForm = () => {
    let isValid = true;
    fields.forEach((field) => {
      if (!validateField({ ...field, value: formData[field.name] })) {
        isValid = false;
      }
    });
    if (enableTurnstile && !turnstileToken) {
      errors.turnstile = store_get($$store_subs ??= {}, "$t", t)("complete_captcha");
      isValid = false;
    }
    return isValid;
  };
  const handleButtonClick = async (button) => {
    if (button.type === "submit") {
      if (!turnstileToken && enableTurnstile) {
        await resetTurnstile();
      }
      submitted = true;
      if (validateForm()) {
        const passwordField = fields.find((field) => field.type === "password");
        const confirmPasswordField = fields.find((field) => field.name === "confirmPassword");
        if (passwordField && confirmPasswordField && formData[passwordField.name] !== formData[confirmPasswordField.name]) {
          errors.confirmPassword = store_get($$store_subs ??= {}, "$t", t)("password_not_match");
          handleError(errors);
          return;
        }
        const hashedFormData = { ...formData };
        if (passwordField) {
          hashedFormData[passwordField.name] = sha256(formData[passwordField.name]).toString();
        }
        handleSubmit({ ...hashedFormData, turnstileToken });
        resetTurnstile();
      } else {
        handleError(errors);
      }
    } else if (button.action === "cancel") {
      handleCancel();
    } else {
      handleOtherAction(formData);
    }
  };
  const each_array = ensure_array_like(fields);
  const each_array_4 = ensure_array_like(buttons);
  $$payload.out += `<form class="space-y-4"><!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let field = each_array[index];
    if (field.layout === "half") {
      $$payload.out += "<!--[-->";
      if (index === 0 || fields[index - 1].layout !== "half" || index % 2 === 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"><div class="w-full md:flex-1"><label${attr("for", field.name)} class="block text-base font-semibold text-gray-700">${escape_html(field.label)}</label> `;
        if (field.type === "select") {
          $$payload.out += "<!--[-->";
          const each_array_1 = ensure_array_like(field.options);
          $$payload.out += `<select${attr("id", field.name)}${attr("name", field.name)} class="mt-1 dropdown focus:ring block w-full p-3 border-[1px] border-[#DEDEDE] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"${attr("required", field.required, true)}><!--[-->`;
          for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
            let option = each_array_1[$$index];
            $$payload.out += `<option${attr("value", option.value)}${attr("selected", option.value === formData[field.name], true)}>${escape_html(option.label)}</option>`;
          }
          $$payload.out += `<!--]--></select>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<input${attr("type", field.type)}${attr("id", field.name)}${attr("name", field.name)}${attr("value", formData[field.name])} class="mt-1 block w-full p-3 border-[1px] border-[#DEDEDE] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-poppins placeholder:text-[#AEAEAE] bg-white"${attr("placeholder", field.placeholder)}${attr("required", field.required, true)}${attr("readonly", field.readonly, true)}>`;
        }
        $$payload.out += `<!--]--> `;
        if (submitted && errors[field.name]) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<p class="error svelte-1ew89s8">${escape_html(errors[field.name])}</p>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></div> `;
        if (index + 1 < fields.length && fields[index + 1].layout === "half") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="w-full md:flex-1"><label${attr("for", fields[index + 1].name)} class="block text-base font-semibold text-gray-700">${escape_html(fields[index + 1].label)}</label> `;
          if (fields[index + 1].type === "select") {
            $$payload.out += "<!--[-->";
            const each_array_2 = ensure_array_like(fields[index + 1].options);
            $$payload.out += `<select${attr("id", fields[index + 1].name)}${attr("name", fields[index + 1].name)} class="mt-1 dropdown focus:ring block w-full p-3 border-[1px] border-[#DEDEDE] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"${attr("required", fields[index + 1].required, true)}><!--[-->`;
            for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
              let option = each_array_2[$$index_1];
              $$payload.out += `<option${attr("value", option.value)}${attr("selected", option.value === formData[field.name], true)}>${escape_html(option.label)}</option>`;
            }
            $$payload.out += `<!--]--></select> `;
            if (submitted && errors[fields[index + 1].name]) {
              $$payload.out += "<!--[-->";
              $$payload.out += `<p class="error text-start svelte-1ew89s8">${escape_html(errors[fields[index + 1].name])}</p>`;
            } else {
              $$payload.out += "<!--[!-->";
            }
            $$payload.out += `<!--]-->`;
          } else {
            $$payload.out += "<!--[!-->";
            $$payload.out += `<input${attr("type", fields[index + 1].type)}${attr("id", fields[index + 1].name)}${attr("name", fields[index + 1].name)}${attr("value", formData[fields[index + 1].name])} class="mt-1 block w-full p-3 border-[1px] border-[#DEDEDE] rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] font-poppins placeholder:text-[#AEAEAE] bg-white"${attr("placeholder", fields[index + 1].placeholder)}${attr("required", fields[index + 1].required, true)}${attr("readonly", fields[index + 1].readonly, true)}>`;
          }
          $$payload.out += `<!--]--> `;
          if (submitted && errors[fields[index + 1].name]) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<p class="error svelte-1ew89s8">${escape_html(errors[fields[index + 1].name])}</p>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div><label${attr("for", field.name)} class="block text-base font-semibold text-gray-700">${escape_html(field.label)}</label> <div class="relative">`;
      if (field.type === "select") {
        $$payload.out += "<!--[-->";
        const each_array_3 = ensure_array_like(field.options);
        $$payload.out += `<select${attr("id", field.name)}${attr("name", field.name)} class="mt-1 block dropdown focus:ring w-full p-3 border-[1px] border-[#DEDEDE] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"${attr("required", field.required, true)}><!--[-->`;
        for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
          let option = each_array_3[$$index_2];
          $$payload.out += `<option${attr("value", option.value)}${attr("selected", option.value === formData[field.name], true)}>${escape_html(option.label)}</option>`;
        }
        $$payload.out += `<!--]--></select> `;
        if (submitted && errors[field.name]) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<p class="error text-start svelte-1ew89s8">${escape_html(errors[field.name])}</p>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      } else {
        $$payload.out += "<!--[!-->";
        if (field.type === "tel") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="relative"><span class="absolute tracking-wider left-3 top-1/2 transform -translate-y-1/2 text-[#B9B9B9] font-semibold pointer-events-none z-10">${escape_html(field.prefix)}</span> <input type="tel"${attr("id", field.name)}${attr("name", field.name)}${attr("value", formData[field.name] ? formData[field.name].replace(field.prefix, "").trim() : "")} class="block w-full p-3 pl-[calc(0.7rem*4+theme(spacing.3))] border-[1px] border-[#DEDEDE] rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] font-poppins placeholder:text-[#AEAEAE] bg-white"${attr("placeholder", field.placeholder)}${attr("required", field.required, true)}></div> `;
          if (submitted && errors[field.name]) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<p class="error text-start svelte-1ew89s8">${escape_html(errors[field.name])}</p>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]-->`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<input${attr("type", field.type === "password" ? showPasswords[field.name] ? "text" : "password" : field.type)}${attr("id", field.name)}${attr("name", field.name)}${attr("value", formData[field.name])} class="mt-1 block w-full p-3 border-[1px] border-[#DEDEDE] rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] pr-10 font-poppins placeholder:text-[#AEAEAE] bg-white"${attr("placeholder", field.placeholder)}${attr("required", field.required, true)}${attr("readonly", field.readonly, true)}> <div class="w-full"><div>`;
          if (submitted && errors[field.name]) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<p class="error text-start svelte-1ew89s8">${escape_html(errors[field.name])}</p>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></div> `;
          if (forgotPassword && field.type === "password") {
            $$payload.out += "<!--[-->";
            $$payload.out += `<div class="mt-2 flex justify-end"><a${attr("href", forgotPassword.link)} class="text-gray-900 font-medium text-sm hover:underline hover:text-gray-600">${escape_html(forgotPassword.label)}</a></div>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></div>`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]--> `;
      if (field.type === "password") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<button type="button" class="absolute right-0 pr-3 flex items-center text-sm leading-5 top-[12.7px]">`;
        if (showPasswords[field.name]) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<svg class="w-6 h-6 text-[var(--primary-color)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"></path></svg>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<svg class="w-6 h-6 text-[var(--primary-color)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="m4 15.6 3.055-3.056A4.913 4.913 0 0 1 7 12.012a5.006 5.006 0 0 1 5-5c.178.009.356.027.532.054l1.744-1.744A8.973 8.973 0 0 0 12 5.012c-5.388 0-10 5.336-10 7A6.49 6.49 0 0 0 4 15.6Z"></path><path d="m14.7 10.726 4.995-5.007A.998.998 0 0 0 18.99 4a1 1 0 0 0-.71.305l-4.995 5.007a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.402.211.59l-4.995 4.983a1 1 0 1 0 1.414 1.414l4.995-4.983c.189.091.386.162.59.211.011 0 .021.007.033.01a2.982 2.982 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z"></path><path d="m19.821 8.605-2.857 2.857a4.952 4.952 0 0 1-5.514 5.514l-1.785 1.785c.767.166 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z"></path></svg>`;
        }
        $$payload.out += `<!--]--></button>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div></div>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--> `;
  if (enableTurnstile) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="turnstile-container w-full svelte-1ew89s8"><div${attr("turnstile-sitekey", turnstileSiteKey)} turnstile-theme="light" turnstile-size="flexible" turnstile-language="en" turnstile-response-field-name="turnstile" turnstile-response-field=""></div> `;
    if (submitted && errors.turnstile) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p class="error svelte-1ew89s8">${escape_html(errors.turnstile)}</p>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="button-container pt-2 svelte-1ew89s8"><!--[-->`;
  for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
    let button = each_array_4[$$index_4];
    Button($$payload, {
      label: button.label,
      type: button.layout,
      customClass: button.customClass,
      onClick: () => handleButtonClick(button)
    });
  }
  $$payload.out += `<!--]--></div></form>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    fields,
    buttons,
    turnstileSiteKey,
    enableTurnstile,
    forgotPassword,
    formData,
    handleSubmit,
    handleError,
    handleCancel,
    handleOtherAction
  });
  pop();
}
export {
  Form as F
};
