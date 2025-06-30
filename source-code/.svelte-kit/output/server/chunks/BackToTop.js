import "clsx";
import { p as pop, b as push } from "./index.js";
import { o as onDestroy } from "./index-server.js";
function BackToTop($$payload, $$props) {
  push();
  onDestroy(() => {
  });
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  BackToTop as B
};
