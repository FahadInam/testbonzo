import { e as escape_html } from "../../../chunks/escaping.js";
import "clsx";
import { p as pop, b as push } from "../../../chunks/index.js";
import { g as goto } from "../../../chunks/client.js";
function _page($$payload, $$props) {
  push();
  let seconds = 2;
  const countdown = setInterval(
    () => {
      seconds--;
      if (seconds === 0) {
        clearInterval(countdown);
        goto();
      }
    },
    1e3
  );
  $$payload.out += `<h1>Oops! This page doesn't exist.</h1> <p>Redirecting to the home page in ${escape_html(seconds)} seconds...</p>`;
  pop();
}
export {
  _page as default
};
