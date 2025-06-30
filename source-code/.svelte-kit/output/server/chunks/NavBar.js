import { j as ensure_array_like, c as attr, e as escape_html, f as stringify, p as pop, b as push } from "./index.js";
import { B as Button } from "./Button.js";
import { p as page } from "./index4.js";
import { g as getSystemDarkLogo, s as systemSettingsStore } from "./system..da.js";
import { g as get } from "./index3.js";
import "./client.js";
function NavBar($$payload, $$props) {
  push();
  let isMenuOpen = false;
  let navItems = [];
  const config = get(systemSettingsStore);
  const buttons = [
    {
      label: "Log in",
      type: "primary",
      link: "/account/user/login",
      width: "w-[130px]",
      class: "flex justify-center items-center"
    },
    {
      label: "Sign up",
      type: "secondary-outlined-inverted",
      link: config?.principal_enabled ? "/account/signup" : "/account/user/signup",
      width: "w-[130px]",
      class: "!hidden xl:!inline-flex xl:flex xl:justify-center xl:items-center"
    }
  ];
  const { web_logo, mobile_logo } = getSystemDarkLogo();
  const each_array = ensure_array_like(buttons);
  const each_array_1 = ensure_array_like(navItems);
  const each_array_3 = ensure_array_like(buttons);
  $$payload.out += `<nav class="bg-white w-full z-20 border-b border-gray-200"><div class="max-w-[1600px] w-full mx-auto flex flex-wrap items-center justify-between py-4 px-3"><a href="/" class="flex items-center space-x-3 rtl:space-x-reverse animate__animated animate__fadeInDown mr-auto"><img${attr("src", web_logo)} class="h-10 me-0 sm:flex sm:h-11 hidden" alt="Instance Logo"> <img${attr("src", mobile_logo)} class="h-10 me-0 sm:hidden sm:h-11 flex" alt="Instance Logo"></a> <div class="flex xl:ml-0 xl:w-auto xl:order-2 space-x-2 rtl:space-x-reverse animate__animated animate__fadeInDown"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let button = each_array[$$index];
    Button($$payload, {
      label: button.label,
      type: button.type,
      link: button.link,
      width: button.width,
      customClass: button.class
    });
  }
  $$payload.out += `<!--]--> <button type="button" class="inline-flex items-center p-3 w-12 h-12 justify-center text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-100" aria-controls="navbar-sticky"${attr("aria-expanded", isMenuOpen)}><span class="sr-only">${escape_html("Open main menu")}</span> `;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<svg class="w-6 h-6 pointer-events-none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"></path></svg>`;
  }
  $$payload.out += `<!--]--></button></div> <div${attr("class", `items-center justify-end mr-10 ${stringify("hidden")} xl:flex w-full xl:w-auto xl:order-1 xl:ml-0 overflow-visible fixed xl:static left-0 top-[80px] bg-white p-3 xl:p-0 z-50`)} id="navbar-sticky"><ul class="flex items-center justify-end flex-col p-4 xl:p-0 font-medium border border-gray-100 rounded-lg bg-white xl:space-x-8 rtl:space-x-reverse xl:flex-row xl:mt-0 xl:border-0 xl:bg-white text-left w-full"><!--[-->`;
  for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
    let item = each_array_1[$$index_2];
    $$payload.out += `<li class="w-full relative animate__animated animate__fadeInDown text-left border-b border-gray-100 last:border-b-0 xl:border-b-0 pl-0 pr-0 xl:pl-2 xl:pr-2 xl:m-0">`;
    if (item.hasSubMenu && item.subMenuItems) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button class="font-semibold text-lg block py-3 px-3 text-gray-900 rounded-sm xl:hover:text-[var(--primary-color)] xl:p-0 cursor-pointer w-full text-left flex justify-between items-center"><span>${escape_html(item.name)}</span> <svg${attr("class", `w-4 h-4 inline ml-1 transition-transform ${stringify("")}`)} fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg></button> `;
      {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<a${attr("href", item.pathname)}${attr("class", `whitespace-nowrap ${stringify(Array.isArray(item.pathname) && item.pathname.includes(page.url.pathname) || page.url.pathname === item.pathname ? "bg-[var(--primary-color)] text-white" : "")} font-semibold text-start xl:text-center xl:leading-[30px] xl:pb-0.5 text-base xl:text-lg block px-3 py-3 xl:py-0 text-gray-900 rounded-sm xl:rounded-full hover:bg-[var(--primary-color)] hover:text-white cursor-pointer`)}>${escape_html(item.name)}</a>`;
    }
    $$payload.out += `<!--]--></li>`;
  }
  $$payload.out += `<!--]--> <li class="w-full flex flex-row gap-2 xl:hidden mt-4"><!--[-->`;
  for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
    let button = each_array_3[$$index_3];
    Button($$payload, {
      label: button.label,
      type: button.type,
      link: button.link,
      width: "w-full",
      customClass: ""
    });
  }
  $$payload.out += `<!--]--></li></ul></div></div></nav>`;
  pop();
}
export {
  NavBar as N
};
