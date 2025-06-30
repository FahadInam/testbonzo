import { a as slot, c as bind_props } from "./index.js";
import { f as fallback } from "./utils2.js";
import { a as attr } from "./attributes.js";
import { e as escape_html } from "./escaping.js";
function SubscriptionCard($$payload, $$props) {
  let text = fallback($$props["text"], "My Subscription");
  let icon = fallback($$props["icon"], null);
  let bgColor = fallback($$props["bgColor"], "bg-indigo-900");
  let textColor = fallback($$props["textColor"], "text-white");
  let width = fallback($$props["width"], "w-full");
  let padding = fallback($$props["padding"], "p-6");
  $$payload.out += `<div${attr("class", ` max-w-4xl mx-auto overflow-hidden rounded-3xl shadow-lg ${width}`)}><div${attr("class", `flex items-center justify-center px-6 py-4 ${bgColor} ${textColor}`)}>`;
  if (icon) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="mr-3"><img${attr("src", icon)} alt="Icon" class="w-8 h-8"></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <h2 class="text-xl font-bold text-center">${escape_html(text)}</h2></div> <div${attr("class", `bg-white ${padding}`)}><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></div></div>`;
  bind_props($$props, {
    text,
    icon,
    bgColor,
    textColor,
    width,
    padding
  });
}
export {
  SubscriptionCard as S
};
