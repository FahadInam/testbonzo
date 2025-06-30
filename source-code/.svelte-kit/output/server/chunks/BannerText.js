import { c as bind_props, p as pop, b as push } from "./index.js";
import { I as IMAGES } from "./images.constants.js";
import { a as attr } from "./attributes.js";
import { h as html } from "./html.js";
const getTextForRole = (role, subscriptionStatus, textObject, lang = "eng") => {
  const defaultTexts = { text: "" };
  if (!textObject || !role) {
    return defaultTexts;
  }
  lang = lang?.trim() || "eng";
  const { principal = {}, paid_principal = {}, learner = {} } = textObject;
  switch (role) {
    case "principal":
      return {
        text: principal?.[lang] || principal?.eng || defaultTexts.text
      };
    case "learner":
    default:
      return {
        text: learner?.[lang] || learner?.eng || defaultTexts.text
      };
  }
};
function BannerText($$payload, $$props) {
  push();
  let text = $$props["text"];
  $$payload.out += `<div class="card-button-shadow bg-white card rounded-[20px] overflow-hidden flex justify-center items-center px-3 py-8 w-full h-full max-w-[400px] md:max-w-[2000px] md:w-[640px] lg:w-[912px]"><img${attr("src", IMAGES.BANNER_CERT_IMG)} class="mr-3 w-14 h-12 object-contain" alt="Button icon"> <div>${html(text)}</div></div>`;
  bind_props($$props, { text });
  pop();
}
export {
  BannerText as B,
  getTextForRole as g
};
