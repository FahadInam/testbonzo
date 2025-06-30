import { j as ensure_array_like, c as attr, f as stringify, e as escape_html, d as bind_props, p as pop, b as push } from "./index.js";
import { p as page } from "./index4.js";
import { g as getSystemDarkLogo } from "./system..da.js";
import "./client.js";
import { f as fallback } from "./utils2.js";
import { I as Image } from "./Image.js";
function SideBar($$payload, $$props) {
  push();
  let navItems = fallback(
    $$props["navItems"],
    () => [
      {
        icon: "",
        label: "Home",
        link: "/competition"
      }
    ],
    true
  );
  const { web_logo, mobile_logo } = getSystemDarkLogo();
  const each_array = ensure_array_like(navItems);
  const each_array_1 = ensure_array_like(navItems);
  $$payload.out += `<div class="w-auto z-10"><nav class="fixed flex md:hidden bottom-0 left-0 w-full bg-gray-50 pt-2 justify-center gap-0 md:gap-10"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$payload.out += `<button${attr("class", `flex flex-col items-center p-2 w-22 rounded-t-2xl hover:bg-gray-100 ${stringify(page.url.pathname.indexOf(item.link.split("/")[1]) > -1 ? "active text-yellow-400" : "text-gray-400")} svelte-nqjs1x`)}><div class="w-5 h-5 mb-1 object-contain lg:me-3 mb-1 lg:mb-0 gray-filter svelte-nqjs1x">`;
    Image($$payload, { src: item.icon });
    $$payload.out += `<!----></div> <span class="text-xs font-medium">${escape_html(item.label)}</span></button>`;
  }
  $$payload.out += `<!--]--></nav> <aside class="w-27 hidden md:flex lg:w-60 h-screen" aria-label="Sidebar"><div class="h-full pb-16 overflow-y-auto bg-gray-50 pt-6 w-full"><div class="flex items-center justify-center mb-5 px-4"><img${attr("src", web_logo)} class="h-10 me-0 lg:flex sm:h-11 hidden" alt="Instance Logo"> <img${attr("src", mobile_logo)} class="h-10 me-0 lg:hidden sm:h-11 flex" alt="Instance Logo"> <span class="self-center text-4xl font-semibold whitespace-nowrap hidden">bonzo</span></div> <ul class="space-y-5 mt-6 font-medium pt-10 flex flex-col"><!--[-->`;
  for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
    let item = each_array_1[index];
    $$payload.out += `<li class="mb-4"><button${attr("class", `flex lg:flex-row flex-col items-center py-3 text-gray-500 pl-0 lg:pl-6 w-19/20 rounded-e-full hover:bg-blue-100 group ${stringify(page.url.pathname.indexOf(item.link.split("/")[1]) > -1 ? "active" : "gray-color")} svelte-nqjs1x`)}><div class="w-10 h-10 object-contain lg:me-3 mb-1 lg:mb-0 gray-filter svelte-nqjs1x">`;
    Image($$payload, { src: item.icon });
    $$payload.out += `<!----></div> <span class="text-xs lg:text-lg font-semibold">${escape_html(item.label)}</span></button></li>`;
  }
  $$payload.out += `<!--]--></ul></div></aside></div>`;
  bind_props($$props, { navItems });
  pop();
}
export {
  SideBar as S
};
