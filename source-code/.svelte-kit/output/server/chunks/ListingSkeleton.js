import { j as ensure_array_like, d as bind_props } from "./index.js";
import { f as fallback } from "./utils2.js";
function ListingSkeleton($$payload, $$props) {
  let itemsCount = fallback($$props["itemsCount"], 5);
  const each_array = ensure_array_like(Array(itemsCount));
  $$payload.out += `<div class="max-w-5xl mx-auto bg-white rounded-[20px] overflow-hidden shadow-lg mb-10"><div class="bg-blue-900 text-white py-2 flex justify-center items-center gap-4"><div class="w-11 h-11 rounded-3xl bg-gray-200 animate-pulse"></div> <div class="w-44 h-8 rounded-3xl bg-gray-200 animate-pulse"></div></div> <div class="p-4"><div><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    each_array[i];
    $$payload.out += `<div class="flex items-center gap-3 p-2 px-4 odd:bg-gray-100 mb-2 rounded-xl animate-pulse"><div class="w-10 h-10 bg-gray-200 rounded-full"></div> <div class="w-3/4 h-4 bg-gray-200 rounded"></div> <div class="w-6 h-6 bg-gray-200 rounded-xl ml-auto"></div></div>`;
  }
  $$payload.out += `<!--]--></div></div></div>`;
  bind_props($$props, { itemsCount });
}
export {
  ListingSkeleton as L
};
