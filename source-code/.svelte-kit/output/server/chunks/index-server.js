import { g as current_component } from "./index.js";
import { n as noop } from "./utils2.js";
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
function createEventDispatcher() {
  return noop;
}
async function tick() {
}
export {
  createEventDispatcher as c,
  onDestroy as o,
  tick as t
};
