import { b as push, f as ensure_array_like, c as bind_props, p as pop, i as copy_payload, j as assign_payload, s as store_get, u as unsubscribe_stores } from "./index.js";
import { L as ListingSkeleton } from "./ListingSkeleton.js";
import { f as fallback } from "./utils2.js";
import { I as IMAGES } from "./images.constants.js";
import { B as Button } from "./Button.js";
import { I as Image } from "./Image.js";
import { M as Modal } from "./Modal.js";
import { t } from "./language.store.js";
import { e as escape_html } from "./escaping.js";
import "./client.js";
function ProfileSkeleton($$payload, $$props) {
  push();
  const cards = Array(4).fill(0);
  let buttonsCount = fallback($$props["buttonsCount"], 3);
  let isCompetitionLevel = fallback($$props["isCompetitionLevel"], false);
  const each_array_1 = ensure_array_like(Array(buttonsCount));
  $$payload.out += `<div class="flex justify-center w-full"><div class="w-full max-w-screen-xl space-y-6"><div class="bg-white rounded-[20px] p-6 md:p-8"><div class="flex justify-around items-center flex-col md:flex-row md:gap-8"><div class="flex md:flex-col items-center md:items-start md:gap-6"><div class="bg-gray-200 rounded-full w-24 h-24 animate-pulse m-auto"></div> <div class="mt-4 md:mt-0 text-center"><div class="bg-gray-200 h-6 w-32 rounded-md animate-pulse mx-auto"></div> <div class="bg-gray-200 h-4 w-24 rounded-md mt-4 animate-pulse mx-auto"></div></div></div> `;
  if (!isCompetitionLevel) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(cards);
    $$payload.out += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      each_array[$$index];
      $$payload.out += `<div class="border border-gray-100 rounded-lg p-4 md:p-6"><div class="flex items-center"><div class="bg-gray-200 rounded-full w-12 h-12 animate-pulse"></div> <div class="ml-4"><div class="bg-gray-200 h-8 w-12 rounded-md animate-pulse"></div> <div class="bg-gray-200 h-4 w-32 rounded-md mt-2 animate-pulse"></div></div></div></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="mt-10"><div class="bg-gray-100 flex items-center gap-4 p-3 max-w-5xl mx-auto h-16 mb-12 rounded-md mt-2"><!--[-->`;
  for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
    each_array_1[i];
    $$payload.out += `<div class="bg-gray-300/80 h-full w-32 rounded-lg animate-pulse"></div>`;
  }
  $$payload.out += `<!--]--></div> `;
  ListingSkeleton($$payload, {});
  $$payload.out += `<!----></div></div></div></div>`;
  bind_props($$props, { buttonsCount, isCompetitionLevel });
  pop();
}
function CertificateModal($$payload, $$props) {
  push();
  let showModal = fallback($$props["showModal"], false);
  let title = fallback($$props["title"], "");
  let message = fallback($$props["message"], "");
  let buttonText = fallback($$props["buttonText"], "");
  let iconSrc = fallback($$props["iconSrc"], () => IMAGES.WARNING, true);
  let onConfirm = fallback($$props["onConfirm"], () => {
  });
  let onCancel = fallback($$props["onCancel"], () => {
  });
  function handleConfirm() {
    onConfirm();
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
          $$payload3.out += `<span slot="header"><div class="bg-[var(--primary-color)] px-4 py-2 flex justify-center items-center rounded-t-lg gap-2">`;
          Image($$payload3, {
            src: iconSrc,
            alt: "Warning Icon",
            className: "w-10 h-10"
          });
          $$payload3.out += `<!----> <span class="text-white font-semibold text-xl ms-2">${escape_html(title)}</span></div></span>`;
        },
        body: ($$payload3) => {
          $$payload3.out += `<span slot="body"><div class="bg-white py-4 text-center"><h6 class="sm:text-xl text-lg font-medium text-[var(--dark-gray)] mb-8 md:px-12">${escape_html(message)}</h6> <div class="flex justify-center sm:gap-6 gap-4">`;
          Button($$payload3, {
            label: buttonText,
            size: "small",
            type: "3d-primary",
            customClass: "w-[300px]",
            onClick: handleConfirm
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
  bind_props($$props, {
    showModal,
    title,
    message,
    buttonText,
    iconSrc,
    onConfirm,
    onCancel
  });
  pop();
}
function CertificateDownloadModal($$payload, $$props) {
  push();
  var $$store_subs;
  let showModal = fallback($$props["showModal"], false);
  let title = fallback($$props["title"], "");
  let buttonText = fallback($$props["buttonText"], "");
  let data = fallback($$props["data"], () => ({}), true);
  let iconSrc = fallback($$props["iconSrc"], () => IMAGES.WARNING, true);
  let onConfirm = fallback($$props["onConfirm"], () => {
  });
  let onCancel = fallback($$props["onCancel"], () => {
  });
  function handleConfirm() {
    showModal = false;
    onConfirm();
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
            className: "w-9 h-9"
          });
          $$payload3.out += `<!----> <span class="text-white font-semibold text-xl ms-2">${escape_html(title)}</span></div></span>`;
        },
        body: ($$payload3) => {
          $$payload3.out += `<span slot="body"><div class="bg-white py-4 text-center"><h6 class="sm:text-xl text-lg font-medium text-[var(--black-gray)] mb-8">${escape_html(store_get($$store_subs ??= {}, "$t", t)("earned_certificate_of"))}
        ${escape_html(data?.type)}
        ${escape_html(store_get($$store_subs ??= {}, "$t", t)("in"))} <span class="text-[var(--theme-dark-blue)] font-semibold">${escape_html(data?.competition_name)}</span> ${escape_html(store_get($$store_subs ??= {}, "$t", t)("against"))} <span class="text-[var(--theme-dark-blue)] font-semibold">${escape_html(store_get($$store_subs ??= {}, "$t", t)("grade"))} ${escape_html(data?.grade)}</span>. ${escape_html(store_get($$store_subs ??= {}, "$t", t)("to_download_certificate"))}</h6> <div class="flex justify-center sm:gap-6 gap-4">`;
          Button($$payload3, {
            label: buttonText,
            size: "small",
            type: "3d-primary",
            customClass: "w-[170px] text-lg md:text-[22px]",
            onClick: handleConfirm
          });
          $$payload3.out += `<!----></div> <h6 class="sm:text-xl font-medium !text-lg text-[var(--black-gray)] mt-8">${escape_html(store_get($$store_subs ??= {}, "$t", t)("update_name_from_profile"))} <a href="profile/edit" class="underline text-[var(--primary-color)]">${escape_html(store_get($$store_subs ??= {}, "$t", t)("profile_settings"))}</a></h6></div></span>`;
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
    buttonText,
    data,
    iconSrc,
    onConfirm,
    onCancel
  });
  pop();
}
export {
  CertificateModal as C,
  ProfileSkeleton as P,
  CertificateDownloadModal as a
};
