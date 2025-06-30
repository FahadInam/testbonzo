import { a as slot, c as bind_props } from "./index.js";
import { f as fallback } from "./utils2.js";
import { a as attr } from "./attributes.js";
function Card($$payload, $$props) {
  let onClick = fallback($$props["onClick"], () => {
  });
  let className = fallback($$props["className"], "");
  let btnClass = fallback($$props["btnClass"], "");
  $$payload.out += `<div${attr("class", `card w-auto relative rounded-[20px] ${className}`)}><button${attr("class", `w-full bg-white text-left cursor-pointer overflow-hidden rounded-[20px] ${btnClass}`)}><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></button></div>`;
  bind_props($$props, { onClick, className, btnClass });
}
export {
  Card as C
};
