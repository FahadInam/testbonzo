import { a as slot } from "./index.js";
function BackgroundImage($$payload, $$props) {
  $$payload.out += `<div class="fixed bg-[url('/images/bg-stars.png')] left-0 right-0 top-0 bottom-0 opacity-5 z-0" style="pointer-events: none"></div> <!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!---->`;
}
export {
  BackgroundImage as B
};
