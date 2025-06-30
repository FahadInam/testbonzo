import { f as ensure_array_like, d as stringify, c as bind_props } from "./index.js";
import { f as fallback } from "./utils2.js";
import { a as attr } from "./attributes.js";
import { e as escape_html } from "./escaping.js";
function TabSwitch($$payload, $$props) {
  let tabs = fallback($$props["tabs"], () => ["Tab 1", "Tab 2"], true);
  let selectedTab = fallback($$props["selectedTab"], 0);
  let className = fallback($$props["className"], "");
  const each_array = ensure_array_like(tabs);
  $$payload.out += `<div${attr("class", `flex bg-white/20 p-1 rounded-full ${stringify(className)} max-w-[540px] svelte-1lxdvvp`)}><!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let tab = each_array[index];
    $$payload.out += `<button${attr("class", `flex-1 min-w-0 m-1 p-2 rounded-full font-normal transition-all duration-300 font-fredoka overflow-hidden whitespace-nowrap truncate text-xs sm:text-sm svelte-1lxdvvp ${stringify([
      selectedTab === index ? "bg-navy" : "",
      selectedTab === index ? "text-selected" : "",
      selectedTab !== index ? "bg-transparent" : "",
      selectedTab !== index ? "text-white" : ""
    ].filter(Boolean).join(" "))}`)}>${escape_html(tab)}</button>`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { tabs, selectedTab, className });
}
export {
  TabSwitch as T
};
