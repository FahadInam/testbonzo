import { c as bind_props, p as pop, b as push, d as stringify } from "./index.js";
import { o as onDestroy } from "./index-server.js";
import { f as fallback } from "./utils2.js";
import { a as attr } from "./attributes.js";
import { e as escape_html } from "./escaping.js";
function SelectBox($$payload, $$props) {
  push();
  let options = fallback(
    $$props["options"],
    () => [
      { value: "3-4", label: "3-4" },
      { value: "5-6", label: "5-6" },
      { value: "7-8", label: "7-8" },
      { value: "9-10", label: "9-10" },
      { value: "11+", label: "11+" }
    ],
    true
  );
  let onSelect = $$props["onSelect"];
  let customClass = fallback($$props["customClass"], "");
  let selectedValue = fallback($$props["selectedValue"], () => options[0].value, true);
  let width = fallback($$props["width"], "200px");
  function handleClickOutside(event) {
  }
  onDestroy(() => {
    document.removeEventListener("mousedown", handleClickOutside);
  });
  $$payload.out += `<div${attr("class", `relative ${stringify(customClass)} svelte-1fy7c5q`)}${attr("style", `width: ${stringify(width)};`)}><button type="button" class="w-full flex items-center justify-between custom-dropdown text-white rounded-full text-base font-medium focus:outline-none shadow-sm svelte-1fy7c5q"><span class="px-3 py-2 truncate max-w-[calc(100%-40px)]">${escape_html(options.find((opt) => opt.value === selectedValue)?.label || "Select")}</span> <span class="pr-6 flex-shrink-0"><svg${attr("class", `w-4 h-4 transition-transform transform ${stringify("")}`)} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></span></button> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, {
    options,
    onSelect,
    customClass,
    selectedValue,
    width
  });
  pop();
}
export {
  SelectBox as S
};
