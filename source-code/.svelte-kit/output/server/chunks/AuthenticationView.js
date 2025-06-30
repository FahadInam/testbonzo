import { b as push, c as attr, e as escape_html, d as bind_props, p as pop, k as copy_payload, l as assign_payload, m as spread_props, j as ensure_array_like, f as stringify } from "./index.js";
import { g as get } from "./index3.js";
import { B as Button } from "./Button.js";
import { F as Form, __tla as __tla_0 } from "./Form.js";
import { P as PopupScreen } from "./PopupScreen.js";
import { M as Modal } from "./Modal.js";
import "./client.js";
import { f as fallback } from "./utils2.js";
import "./client2.js";
import { d as getFormViewLogo, j as isGlobalClimateLiteracy, a as isShupavu, s as systemSettingsStore } from "./system..da.js";
import { I as Image } from "./Image.js";
let AuthenticationView;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function InfoCardButton($$payload, $$props) {
    push();
    let image = fallback($$props["image"], "");
    let title = fallback($$props["title"], "");
    let description = fallback($$props["description"], "");
    let link = fallback($$props["link"], "");
    let onClick = fallback($$props["onClick"], () => {
    });
    $$payload.out += `<button class="flex flex-col md:flex-row md:items-center text-left md:text-left p-10 bg-white w-full rounded-3xl border-2 border-gray-200 hover:border-[var(--primary-color)] hover:bg-[var(--primary-color)]/5"><div class="flex-shrink-0 mb-4 md:mb-0 md:mr-4"><img${attr("src", image)} alt="Learner Icon" class="w-28 object-contain mx-auto md:mx-0"></div> <div class="text-center md:text-left w-full md:w-auto ps-0 md:ps-5"><h2 class="text-2xl font-semibold text-gray-800 mb-3">${escape_html(title)}</h2> <p class="text-sm font-normal text-gray-600">${escape_html(description)}</p></div></button>`;
    bind_props($$props, {
      image,
      title,
      description,
      link,
      onClick
    });
    pop();
  }
  AuthenticationView = function($$payload, $$props) {
    push();
    let useModal = fallback($$props["useModal"], false);
    let isModalVisible = fallback($$props["isModalVisible"], false);
    let showBackButton = fallback($$props["showBackButton"], true);
    let cards = fallback($$props["cards"], () => [], true);
    let logo = fallback($$props["logo"], getFormViewLogo, true);
    let cardTitle = fallback($$props["cardTitle"], "");
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
      },
      forgotPassword: {
        label: "",
        link: ""
      },
      alternativeButtons: [
        {
          label: "",
          type: "",
          image: "",
          onClick: () => {
          }
        }
      ],
      footer: {
        text: "",
        button: {
          label: "",
          type: "",
          link: ""
        }
      },
      role: ""
    }), true);
    const component = useModal ? Modal : PopupScreen;
    let logoClass = "w-32";
    if (isGlobalClimateLiteracy) {
      logoClass = "w-42 md:w-50";
    }
    if (isShupavu) {
      logoClass = "w-40 md:w-48";
    }
    const back_url = get(systemSettingsStore)?.account_back_url;
    let $$settled = true;
    let $$inner_payload;
    function $$render_inner($$payload2) {
      $$payload2.out += `<!---->`;
      component?.($$payload2, {
        backButtonLabel: "Home",
        backButtonLink: back_url,
        showBackButton,
        get open() {
          return isModalVisible;
        },
        set open($$value) {
          isModalVisible = $$value;
          $$settled = false;
        },
        $$slots: {
          body: ($$payload3) => {
            $$payload3.out += `<div slot="body"><div class="text-left">`;
            Image($$payload3, {
              src: logo,
              alt: "Instance Logo",
              className: `${logoClass} mx-auto mb-4`
            });
            $$payload3.out += `<!----> `;
            if (cards.length == 0) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<h3 class="text-xl md:text-2xl font-medium text-gray-800 mt-5 pt-2">${escape_html(form.title)}</h3>`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--></div> `;
            if (cards.length > 0) {
              $$payload3.out += "<!--[-->";
              const each_array = ensure_array_like(cards);
              $$payload3.out += `<p class="text-2xl font-semibold text-gray-800 mt-5 pt-2 text-center">${escape_html(cardTitle)}</p> <div class="mt-6 space-y-7"><!--[-->`;
              for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                let card = each_array[$$index];
                InfoCardButton($$payload3, spread_props([
                  card
                ]));
              }
              $$payload3.out += `<!--]--></div>`;
            } else {
              $$payload3.out += "<!--[!-->";
              $$payload3.out += `<main class="mt-4">`;
              Form($$payload3, {
                fields: form.fields,
                buttons: form.buttons,
                turnstileSiteKey: form.turnstileSiteKey,
                enableTurnstile: form.enableTurnstile,
                handleSubmit: form.handleSubmit,
                forgotPassword: form.forgotPassword
              });
              $$payload3.out += `<!----> `;
              if (form.alternativeButtons && form.alternativeButtons.length > 0) {
                $$payload3.out += "<!--[-->";
                const each_array_1 = ensure_array_like(form.alternativeButtons);
                $$payload3.out += `<div class="text-center my-4 text-gray-500 font-poppins text-sm font-semibold">or</div> <div${attr("class", `flex ${stringify(form.alternativeButtons.length === 1 ? "flex-col" : "gap-4 flex-wrap")}`)}><!--[-->`;
                for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                  let button = each_array_1[$$index_1];
                  Button($$payload3, {
                    label: button.label,
                    type: button.type,
                    image: button.image,
                    imageClass: "w-6 h-6 mr-2 mt-[2px]",
                    customClass: "grow",
                    onClick: () => button.onClick(form.role)
                  });
                }
                $$payload3.out += `<!--]--></div>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--></main>`;
            }
            $$payload3.out += `<!--]--></div>`;
          },
          footer: ($$payload3) => {
            $$payload3.out += `<div slot="footer">`;
            if (Object.keys(form.footer).length > 0) {
              $$payload3.out += "<!--[-->";
              if (cards.length == 0) {
                $$payload3.out += "<!--[-->";
                $$payload3.out += `<div class="text-center mt-0 text-gray-600 bg-gray-100 p-2">${escape_html(form.footer.text)} <span class="ms-3"></span> `;
                Button($$payload3, spread_props([
                  {
                    width: "w-[120px]"
                  },
                  form.footer.button
                ]));
                $$payload3.out += `<!----></div>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]-->`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--></div>`;
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
    bind_props($$props, {
      useModal,
      isModalVisible,
      showBackButton,
      cards,
      logo,
      cardTitle,
      form
    });
    pop();
  };
});
export {
  AuthenticationView as A,
  __tla
};
