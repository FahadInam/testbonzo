import { b as push, c as attr, f as stringify, a as slot, d as bind_props, p as pop } from "./index.js";
import { o as onDestroy } from "./index-server.js";
import { f as fallback } from "./utils2.js";
function Modal($$payload, $$props) {
  push();
  let open = fallback($$props["open"], false);
  let onClick = fallback($$props["onClick"], () => {
  });
  let maxWidth = fallback($$props["maxWidth"], 600);
  let customClass = fallback($$props["customClass"], "");
  onDestroy(() => {
  });
  if (open) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="fixed inset-0 z-50 flex items-center justify-center p-4"><button class="absolute inset-0 w-full h-full bg-black opacity-60 cursor-default" aria-label="Close modal by clicking outside"></button> <section${attr("class", `relative bg-white rounded-[20px] shadow-xl w-full md:max-h-[100%] max-h-screen md:h-auto flex flex-col overflow-y-auto ${stringify(customClass)}`)}${attr("style", `max-width: ${stringify(maxWidth)}px;`)} role="dialog" aria-modal="true" tabindex="-1"><button class="absolute top-[10px] z-[1] right-3 p-2 rounded-full text-gray-900 bg-gray-100 hover:text-black hover:bg-gray-200 focus:outline-none" aria-label="Close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd"></path></svg></button> <div class="overflow-y-auto flex-1"><!---->`;
    slot($$payload, $$props, "header", {}, null);
    $$payload.out += `<!----></div> <div class="overflow-y-auto flex-1 p-6"><!---->`;
    slot($$payload, $$props, "body", {}, null);
    $$payload.out += `<!----></div> <footer class="overflow-hidden"><!---->`;
    slot($$payload, $$props, "footer", {}, null);
    $$payload.out += `<!----></footer></section></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { open, onClick, maxWidth, customClass });
  pop();
}
export {
  Modal as M
};
