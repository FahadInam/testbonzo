import { w as writable } from "./index3.js";
const defaultMeta = { title: "", description: "", url: "", link: "" };
const initialMeta = defaultMeta;
const metaStore = writable(initialMeta);
export {
  metaStore as m
};
