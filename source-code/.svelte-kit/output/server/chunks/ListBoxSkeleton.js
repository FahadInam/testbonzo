import { f as ensure_array_like, c as bind_props } from "./index.js";
import { f as fallback } from "./utils2.js";
function ListBoxSkeleton($$payload, $$props) {
  let itemsCount = fallback($$props["itemsCount"], 6);
  const each_array = ensure_array_like(Array(itemsCount));
  $$payload.out += `<div class="max-w-5xl mx-auto bg-white rounded-[20px] overflow-hidden shadow-lg mb-10"><div class="bg-blue-900 text-white py-2 flex justify-center items-center gap-4"><div class="w-11 h-11 rounded-3xl bg-gray-200 animate-pulse"></div> <div class="w-44 h-8 rounded-3xl bg-gray-200 animate-pulse"></div></div> <div class="p-4 max-h-[400px] overflow-y-auto"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    each_array[i];
    $$payload.out += `<div class="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow animate-pulse"><div class="w-12 h-12 bg-gray-200 rounded-full"></div> <div class="flex flex-col flex-1 space-y-2"><div class="w-3/4 h-4 bg-gray-200 rounded"></div> <div class="w-1/2 h-3 bg-gray-200 rounded"></div></div> <div class="w-12 h-6 bg-gray-200 rounded-full ml-auto"></div></div>`;
  }
  $$payload.out += `<!--]--></div></div></div>`;
  bind_props($$props, { itemsCount });
}
export {
  ListBoxSkeleton as L
};
