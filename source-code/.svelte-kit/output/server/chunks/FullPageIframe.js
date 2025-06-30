import { c as attr, d as bind_props, p as pop, b as push, f as stringify } from "./index.js";
import { f as fallback } from "./utils2.js";
function FullPageIframe($$payload, $$props) {
  push();
  let url = $$props["url"];
  let title = fallback($$props["title"], "Embedded Content");
  let additionalClasses = fallback($$props["additionalClasses"], "");
  $$payload.out += `<div${attr("class", `w-full h-full overflow-hidden bg-white ${stringify(additionalClasses)}`)}><iframe${attr("title", title)}${attr("src", url)} class="w-full h-full border-none" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
  bind_props($$props, { url, title, additionalClasses });
  pop();
}
export {
  FullPageIframe as F
};
