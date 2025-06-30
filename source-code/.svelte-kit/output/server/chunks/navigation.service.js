import { g as goto } from "./client.js";
function gotoURL(url) {
  if (!url) return;
  if (url == "default") {
    history.back();
  } else {
    goto();
  }
}
export {
  gotoURL as g
};
