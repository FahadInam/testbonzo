import "./client.js";
import { w as writable } from "./index2.js";
import "./client2.js";
import "clsx";
const navigationStore = writable({ back_url: "/" });
function setBackUrl(back_url) {
  navigationStore.set({ back_url });
}
export {
  navigationStore as n,
  setBackUrl as s
};
