import { a as slot, p as pop, b as push } from "../../../../../chunks/index.js";
import { s as sidebarStore } from "../../../../../chunks/sidebar.store.js";
function _layout($$payload, $$props) {
  push();
  sidebarStore.set({ visible: true });
  $$payload.out += `<!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!---->`;
  pop();
}
export {
  _layout as default
};
