import { g as get, w as writable } from "./index3.js";
const titleStore = writable({ productName: "Bonzo" });
function getTitle(text) {
  return text + " - " + get(titleStore).productName;
}
export {
  getTitle as g
};
