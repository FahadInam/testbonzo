import "clsx";
import { g as get } from "../../../chunks/index3.js";
import { p as pop, b as push } from "../../../chunks/index.js";
import { F as FullPageIframe } from "../../../chunks/FullPageIframe.js";
import { N as NavBar } from "../../../chunks/NavBar.js";
import { s as systemSettingsStore } from "../../../chunks/system..da.js";
function _page($$payload, $$props) {
  push();
  const config = get(systemSettingsStore);
  console.log("config-->", config);
  const contactItem = config.landing_navigation?.find((item) => item.name === "Contact Us" || item.id === "CONTACT_US");
  let url = contactItem?.ref;
  $$payload.out += `<div class="w-full fixed top-0 z-50 shadow-md">`;
  NavBar($$payload);
  $$payload.out += `<!----></div> <div class="flex flex-col h-screen pt-[81px]">`;
  FullPageIframe($$payload, { url, title: "Knowledge Platform" });
  $$payload.out += `<!----></div>`;
  pop();
}
export {
  _page as default
};
