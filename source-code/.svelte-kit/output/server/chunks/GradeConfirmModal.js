import { b as push, s as store_get, f as ensure_array_like, u as unsubscribe_stores, c as bind_props, p as pop, d as stringify, i as copy_payload, j as assign_payload } from "./index.js";
import { c as competitionStore } from "./appbar.store.js";
import { I as IMAGES } from "./images.constants.js";
import { f as fallback } from "./utils2.js";
import { a as attr } from "./attributes.js";
import { e as escape_html } from "./escaping.js";
import { g as get } from "./index3.js";
import { B as Button } from "./Button.js";
import { I as Image } from "./Image.js";
import { M as Modal } from "./Modal.js";
import { t } from "./language.store.js";
function GradeSelectBox($$payload, $$props) {
  push();
  var $$store_subs;
  let title = fallback($$props["title"], "Select Grade");
  let options = fallback(
    $$props["options"],
    () => [
      { value: "", label: "Select Grade" },
      { value: "1", label: "Grade 1" }
    ],
    true
  );
  let iconSrc = fallback($$props["iconSrc"], () => IMAGES.CHANGE_GRADE_ICON, true);
  let onSelect = $$props["onSelect"];
  store_get($$store_subs ??= {}, "$competitionStore", competitionStore).current_grade || "";
  const each_array = ensure_array_like(options);
  $$payload.out += `<div class="w-full mx-auto bg-white rounded-[20px] shadow-lg overflow-hidden opacity-100"><div class="bg-blue-900 text-white py-2 flex justify-center items-center gap-4"><div class="flex items-center">`;
  if (iconSrc) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<img${attr("src", iconSrc)} class="w-11 h-12 m-1 mr-3" alt="Grade Icon">`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <span class="text-xl font-semibold">${escape_html(title)}</span></div></div> <div class="p-9"><select class="w-full dropdown cursor-pointer border border-gray-600 border-1 text-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring focus:ring-blue-300"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let option = each_array[$$index];
    $$payload.out += `<option${attr("value", option.value)} class="cursor-pointer">${escape_html(option.label)}</option>`;
  }
  $$payload.out += `<!--]--></select></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { title, options, iconSrc, onSelect });
  pop();
}
function ShupavuGradeSelector($$payload, $$props) {
  push();
  let filteredOptions;
  let title = fallback($$props["title"], "Select Grade");
  let options = fallback(
    $$props["options"],
    () => [
      { value: "", label: "Select Grade" },
      { value: "6", label: "Six" },
      { value: "7", label: "Seven" },
      { value: "8", label: "Eight" },
      { value: "9", label: "Nine" },
      { value: "form2", label: "Form 2" }
    ],
    true
  );
  let iconSrc = fallback($$props["iconSrc"], () => IMAGES.OTP_CHANGE_GRADE, true);
  let onSelect = $$props["onSelect"];
  let selectedValue = get(competitionStore).current_grade ?? "";
  filteredOptions = options.filter((o) => o.value !== "");
  const each_array = ensure_array_like(filteredOptions);
  $$payload.out += `<div class="w-full mx-auto bg-white rounded-[20px] shadow-lg overflow-hidden"><div class="bg-blue-900 text-white py-2 flex justify-center items-center gap-4"><div class="flex items-center">`;
  if (iconSrc) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<img${attr("src", iconSrc)} class="w-11 h-12 m-1 mr-3" alt="Grade Icon">`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <span class="text-xl font-semibold">${escape_html(title)}</span></div></div> <div class="p-4"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let option = each_array[$$index];
    $$payload.out += `<div class="my-3"><button${attr("class", `${stringify(`w-full py-3 text-center rounded-lg border transition  ${selectedValue !== option.value ? "hover:bg-gray-200" : ""}`)} ${stringify([
      selectedValue === option.value ? "bg-gray-300" : "",
      selectedValue !== option.value ? "bg-white" : "",
      selectedValue !== option.value || selectedValue === option.value ? "border-gray-300" : ""
    ].filter(Boolean).join(" "))}`)}>${escape_html(option.label)}</button></div>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  bind_props($$props, { title, options, iconSrc, onSelect });
  pop();
}
function GradeConfirmModal($$payload, $$props) {
  push();
  var $$store_subs;
  let showModal = fallback($$props["showModal"], false);
  let title = fallback($$props["title"], "");
  let message = fallback($$props["message"], "");
  let warningText = fallback($$props["warningText"], "");
  let iconSrc = fallback($$props["iconSrc"], () => IMAGES.WARNING, true);
  let onConfirm = fallback($$props["onConfirm"], () => {
  });
  let onCancel = fallback($$props["onCancel"], () => {
  });
  function handleConfirm() {
    onConfirm();
    showModal = false;
  }
  function handleCancel() {
    onCancel();
    showModal = false;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Modal($$payload2, {
      get open() {
        return showModal;
      },
      set open($$value) {
        showModal = $$value;
        $$settled = false;
      },
      $$slots: {
        header: ($$payload3) => {
          $$payload3.out += `<span slot="header"><div class="bg-[var(--primary-color)] px-4 py-3 flex justify-center items-center rounded-t-lg gap-2">`;
          Image($$payload3, {
            src: iconSrc,
            alt: "Warning Icon",
            className: "w-9 h-9 min-w-9"
          });
          $$payload3.out += `<!----> <span class="text-white font-semibold text-xl ms-2">${escape_html(title)}</span></div></span>`;
        },
        body: ($$payload3) => {
          $$payload3.out += `<span slot="body"><div class="bg-white py-4 text-center"><h6 class="sm:text-xl text-lg font-semibold text-[var(--dark-gray)] mb-4">${escape_html(message)}</h6> `;
          if (warningText) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<h6 class="text-red-600 sm:text-xl text-lg font-semibold mb-7">${escape_html(warningText)}</h6>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> <div class="flex justify-center sm:gap-6 gap-4">`;
          Button($$payload3, {
            label: store_get($$store_subs ??= {}, "$t", t)("change"),
            size: "small",
            type: "3d-primary",
            customClass: "w-[170px] text-lg md:text-[22px]",
            onClick: handleConfirm
          });
          $$payload3.out += `<!----> `;
          Button($$payload3, {
            size: "small",
            type: "3d-secondary",
            customClass: "w-[170px] text-lg md:text-[22px]",
            label: store_get($$store_subs ??= {}, "$t", t)("cancel"),
            onClick: handleCancel
          });
          $$payload3.out += `<!----></div></div></span>`;
        }
      }
    });
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    showModal,
    title,
    message,
    warningText,
    iconSrc,
    onConfirm,
    onCancel
  });
  pop();
}
export {
  GradeSelectBox as G,
  ShupavuGradeSelector as S,
  GradeConfirmModal as a
};
