import { k as copy_payload, l as assign_payload, p as pop, b as push, h as head, e as escape_html, s as store_get, u as unsubscribe_stores } from "../../../chunks/index.js";
import { t } from "../../../chunks/language.store.js";
import { I as IMAGES } from "../../../chunks/images.constants.js";
import { P as PageHeading } from "../../../chunks/PageHeading.js";
import "clsx";
import "../../../chunks/avatar2.js";
import { __tla as __tla_0 } from "../../../chunks/rewards.da.js";
import "notyf";
import "../../../chunks/user.store.js";
import { g as goto } from "../../../chunks/client.js";
import "../../../chunks/client2.js";
import "lz-string";
import "../../../chunks/system..da.js";
import "../../../chunks/index2.js";
import "../../../chunks/country.constant.js";
import { __tla as __tla_1 } from "../../../chunks/api.definitions.js";
import { P as ProfileSkeleton, C as CertificateModal, a as CertificateDownloadModal } from "../../../chunks/CertificateDownloadModal.js";
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
    let stats = [];
    let showConfirm = false;
    let showDownload = false;
    let currentCertificate = {};
    function onConfirmChange() {
      showConfirm = false;
      goto("/competitions/" + currentCertificate?.url + "/home");
    }
    function confirmDownload() {
    }
    if (stats && Object.keys(stats).length) ;
    let $$settled = true;
    let $$inner_payload;
    function $$render_inner($$payload2) {
      head($$payload2, ($$payload3) => {
        $$payload3.title = `<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("profile"))}</title>`;
      });
      $$payload2.out += `<div class="flex justify-center w-full"><div class="w-full max-w-screen-xl space-y-6"><div class="w-full mb-8">`;
      PageHeading($$payload2, {
        icon: IMAGES.REWARDS_ICON,
        title: "profile",
        imageClass: "w-9 h-11 sm:w-10 sm:h-11"
      });
      $$payload2.out += `<!----></div></div></div> `;
      {
        $$payload2.out += "<!--[-->";
        ProfileSkeleton($$payload2, {});
      }
      $$payload2.out += `<!--]--> `;
      CertificateModal($$payload2, {
        title: store_get($$store_subs ??= {}, "$t", t)("certificate_locked"),
        message: store_get($$store_subs ??= {}, "$t", t)("certificate_locked_message"),
        buttonText: store_get($$store_subs ??= {}, "$t", t)("start_playing"),
        onConfirm: onConfirmChange,
        iconSrc: IMAGES.CERT_LOCK,
        get showModal() {
          return showConfirm;
        },
        set showModal($$value) {
          showConfirm = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      CertificateDownloadModal($$payload2, {
        title: store_get($$store_subs ??= {}, "$t", t)("congratulations"),
        data: currentCertificate,
        buttonText: store_get($$store_subs ??= {}, "$t", t)("download"),
        onConfirm: confirmDownload,
        iconSrc: IMAGES.CONFETTI_ICON,
        get showModal() {
          return showDownload;
        },
        set showModal($$value) {
          showDownload = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!---->`;
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
