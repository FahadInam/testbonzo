import { a as slot } from "../../../../chunks/index.js";
import { A as AppBar, __tla as __tla_0 } from "../../../../chunks/AppBar.js";
import { B as BackgroundImage } from "../../../../chunks/BackgroundImage.js";
let _layout;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  _layout = function($$payload, $$props) {
    BackgroundImage($$payload, {});
    $$payload.out += `<!----> <div class="flex flex-col h-screen"><div class="flex flex-1 overflow-hidden"><div class="flex flex-col flex-1">`;
    AppBar($$payload, {});
    $$payload.out += `<!----> <div class="flex-1 overflow-y-auto save-scroll"><!---->`;
    slot($$payload, $$props, "default", {});
    $$payload.out += `<!----></div></div></div></div>`;
  };
});
export {
  __tla,
  _layout as default
};
