import { c as bind_props, p as pop, b as push, d as stringify } from "./index.js";
import { a as avatar } from "./avatar2.js";
import { f as fallback } from "./utils2.js";
import { a as attr } from "./attributes.js";
function Avatar($$payload, $$props) {
  push();
  let t = $$props["t"];
  let s = fallback($$props["s"], 50);
  let u = fallback($$props["u"], 50);
  let ml = $$props["ml"];
  let mr = $$props["mr"];
  const shadowed = false;
  let schoolAvatar = fallback($$props["schoolAvatar"], false);
  let fullSize = fallback($$props["fullSize"], false);
  let borderColor = "#FFCC00";
  let imagePath;
  function updateImagePath() {
    return schoolAvatar ? `/images/profiles/a67.png` : avatar(t);
  }
  if (t) {
    imagePath = updateImagePath();
  }
  $$payload.out += `<div class="relative overflow-hidden flex items-center justify-center rounded-full"${attr("style", `${stringify(fullSize ? `height: 100%; width: 100%;` : `height: ${s}px; width: ${u}px; min-width: ${u}px;`)} margin-left: $${stringify(ml)}; margin-right: $${stringify(mr)};`)}><div class="absolute inset-0 w-full h-full rounded-full border-4"${attr("style", `border-color: ${stringify(borderColor)};`)}></div> <img class="w-full h-full"${attr("src", imagePath)}${attr("alt", t)}></div>`;
  bind_props($$props, {
    t,
    s,
    u,
    ml,
    mr,
    schoolAvatar,
    fullSize,
    shadowed
  });
  pop();
}
export {
  Avatar as A
};
