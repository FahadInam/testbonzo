import "clsx";
import { p as pop, b as push } from "../../../../chunks/index.js";
import { __tla as __tla_0 } from "../../../../chunks/common.auth.data.js";
let _page;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  _page = function($$payload, $$props) {
    push();
    $$payload.out += `<div><div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"><div class="w-16 h-16 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div></div></div>`;
    pop();
  };
});
export {
  __tla,
  _page as default
};
