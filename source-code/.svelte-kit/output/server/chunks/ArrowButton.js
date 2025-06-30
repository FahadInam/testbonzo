import { c as bind_props, p as pop, b as push, d as stringify } from "./index.js";
import { f as fallback } from "./utils2.js";
import "./client.js";
import { a as attr } from "./attributes.js";
import "./client2.js";
import "./user.store.js";
import "lz-string";
import "./language.store.js";
import "./system..da.js";
import "./index2.js";
import { e as escape_html } from "./escaping.js";
function ArrowButton($$payload, $$props) {
  push();
  let label = fallback($$props["label"], "");
  let arrowType = fallback($$props["arrowType"], "back");
  let link = fallback($$props["link"], "");
  let customClass = fallback($$props["customClass"], "");
  $$payload.out += `<div><button${attr("class", `${stringify(customClass || "")} font-semibold items-center text-lg flex`)}><span>`;
  if (arrowType == "back") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"></path></svg>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></span> `;
  if (label && label.length > 0 && true) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="text-xl">${escape_html(label)}</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></button></div>`;
  bind_props($$props, { label, arrowType, link, customClass });
  pop();
}
export {
  ArrowButton as A
};
