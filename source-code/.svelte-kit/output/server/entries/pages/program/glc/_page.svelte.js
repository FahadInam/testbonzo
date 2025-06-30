import "clsx";
import { F as FullPageIframe } from "../../../../chunks/FullPageIframe.js";
import { N as NavBar } from "../../../../chunks/NavBar.js";
function _page($$payload) {
  let url = "https://knowledgeplatform.com.pk/gclc/?embedded";
  $$payload.out += `<div class="w-full fixed top-0 z-50 shadow-md">`;
  NavBar($$payload);
  $$payload.out += `<!----></div> <div class="flex flex-col h-screen pt-[81px]">`;
  FullPageIframe($$payload, { url, title: "Knowledge Platform" });
  $$payload.out += `<!----></div>`;
}
export {
  _page as default
};
