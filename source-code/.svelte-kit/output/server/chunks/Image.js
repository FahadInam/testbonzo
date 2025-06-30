import { c as bind_props } from "./index.js";
import { f as fallback } from "./utils2.js";
import { a as attr } from "./attributes.js";
function Image($$payload, $$props) {
  let src = fallback($$props["src"], "");
  let alt = fallback($$props["alt"], "Image");
  let className = fallback($$props["className"], "");
  let width = fallback($$props["width"], "auto");
  let height = fallback($$props["height"], "auto");
  $$payload.out += `<div class="relative h-full"><img${attr("src", src)}${attr("alt", alt)}${attr("width", width)}${attr("height", height)}${attr("class", ` h-auto transition-opacity duration-500 ease-in-out ${className}`)}></div>`;
  bind_props($$props, { src, alt, className, width, height });
}
export {
  Image as I
};
