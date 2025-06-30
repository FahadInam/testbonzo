import "clsx";
import { i as copy_payload, j as assign_payload, c as bind_props, p as pop, b as push, s as store_get, u as unsubscribe_stores } from "../../../../../chunks/index.js";
import "../../../../../chunks/user.store.js";
import "lz-string";
import "../../../../../chunks/client.js";
import "../../../../../chunks/client2.js";
import "../../../../../chunks/language.store.js";
import "../../../../../chunks/system..da.js";
import "../../../../../chunks/index2.js";
import { __tla as __tla_0 } from "../../../../../chunks/api.definitions.js";
import { __tla as __tla_1 } from "../../../../../chunks/common.auth.data.js";
import { __tla as __tla_2 } from "../../../../../chunks/user.auth.da.js";
import "../../../../../chunks/country.constant.js";
import { F as Form } from "../../../../../chunks/Form.js";
import { P as PopupScreen } from "../../../../../chunks/PopupScreen.js";
import { n as navigationStore } from "../../../../../chunks/appbar.store.js";
import { M as Modal } from "../../../../../chunks/Modal.js";
import { f as fallback } from "../../../../../chunks/utils2.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
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
  function InstitutionDetailsView($$payload, $$props) {
    push();
    var $$store_subs;
    let useModal = fallback($$props["useModal"], false);
    let isModalVisible = fallback($$props["isModalVisible"], false);
    let form = fallback($$props["form"], () => ({
      title: "",
      fields: [
        {
          name: "",
          type: "",
          label: "",
          placeholder: "",
          required: true
        }
      ],
      buttons: [
        {
          label: "",
          type: ""
        }
      ],
      turnstileSiteKey: "",
      enableTurnstile: false,
      handleSubmit: (formData) => {
      }
    }), true);
    console.log(form, "form");
    const component = useModal ? Modal : PopupScreen;
    let $$settled = true;
    let $$inner_payload;
    function $$render_inner($$payload2) {
      $$payload2.out += `<!---->`;
      component?.($$payload2, {
        backButtonLabel: "Back",
        backButtonLink: store_get($$store_subs ??= {}, "$navigationStore", navigationStore).back_url,
        get open() {
          return isModalVisible;
        },
        set open($$value) {
          isModalVisible = $$value;
          $$settled = false;
        },
        $$slots: {
          body: ($$payload3) => {
            $$payload3.out += `<div slot="body"><div class="text-left"><h3 class="text-2xl font-medium text-gray-800 mt-5 pt-2">${escape_html(form.title)}</h3></div> <main class="mt-4">`;
            Form($$payload3, {
              fields: form.fields,
              buttons: form.buttons,
              turnstileSiteKey: form.turnstileSiteKey,
              enableTurnstile: form.enableTurnstile,
              handleSubmit: form.handleSubmit
            });
            $$payload3.out += `<!----></main></div>`;
          }
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
    bind_props($$props, {
      useModal,
      isModalVisible,
      form
    });
    pop();
  }
  _page = function($$payload, $$props) {
    push();
    let institutionDetails = {};
    InstitutionDetailsView($$payload, {
      form: institutionDetails
    });
    pop();
  };
});
export {
  __tla,
  _page as default
};
