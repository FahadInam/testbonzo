import { i as initializeLanguage } from "../../chunks/language.store.js";
let load, prerender, ssr;
let __tla = (async () => {
  ssr = false;
  prerender = true;
  load = async (event) => {
    await initializeLanguage("en", event);
    const { updateInstanceConfig, updateLocalConfig } = await import("../../chunks/instance.da.js").then(async (m) => {
      await m.__tla;
      return m;
    });
    updateInstanceConfig();
    updateLocalConfig();
    return {
      completed: true
    };
  };
})();
export {
  __tla,
  load,
  prerender,
  ssr
};
