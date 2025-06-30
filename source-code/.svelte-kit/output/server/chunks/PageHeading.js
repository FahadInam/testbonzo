import { c as attr, e as escape_html, s as store_get, u as unsubscribe_stores, d as bind_props, p as pop, b as push, f as stringify } from "./index.js";
import { I as Image } from "./Image.js";
import { t } from "./language.store.js";
import { f as fallback } from "./utils2.js";
function PageHeading($$payload, $$props) {
  push();
  var $$store_subs;
  let title = fallback($$props["title"], "leaderboard");
  let icon = fallback($$props["icon"], "Leaderboard");
  let imageClass = fallback($$props["imageClass"], "");
  let customClass = fallback($$props["customClass"], "");
  $$payload.out += `<div${attr("class", `flex items-center justify-center w-full gap-3 ${stringify(customClass)}`)}>`;
  Image($$payload, {
    src: icon,
    className: `drop-shadow ${imageClass}`
  });
  $$payload.out += `<!----> <h2 class="text-white font-bold text-2xl sm:text-3xl title-shadow title-drop-shadow">${escape_html(store_get($$store_subs ??= {}, "$t", t)(title))}</h2></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { title, icon, imageClass, customClass });
  pop();
}
export {
  PageHeading as P
};
