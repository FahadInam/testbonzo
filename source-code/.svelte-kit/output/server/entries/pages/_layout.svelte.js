import { a as slot, p as pop, b as push } from "../../chunks/index.js";
import "../../chunks/client.js";
import "../../chunks/language.store.js";
import "clsx";
import "../../chunks/user.store.js";
import { p as page } from "../../chunks/index4.js";
import "notyf";
function checkPathRedirection(path, instanceId = null) {
  return;
}
function _layout($$payload, $$props) {
  push();
  let loaderInterval = -1;
  function hideMainLoader() {
    clearInterval(loaderInterval);
    loaderInterval = setTimeout(
      () => {
      },
      1e3
    );
  }
  hideMainLoader();
  checkPathRedirection(page.url.pathname);
  $$payload.out += `<!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _layout as default
};
