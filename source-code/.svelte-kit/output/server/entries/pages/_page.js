import { L as LandingPageNavigation } from "../../chunks/utils.js";
const prerender = true;
const load = async () => {
  LandingPageNavigation();
};
export {
  load,
  prerender
};
