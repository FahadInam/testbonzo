import { r as request } from "./api.service.js";
import { s as systemSettingsStore, b as instanceConfig, c as configurations } from "./system..da.js";
import { g as get } from "./index3.js";
import { A as API_DEFINITIONS, __tla as __tla_0 } from "./api.definitions.js";
import { i as instanceStore } from "./instance.store.js";
let updateInstanceConfig, updateLocalConfig;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  updateInstanceConfig = async function() {
    if (typeof window !== "undefined") {
      const data = await request(API_DEFINITIONS.INSTANCE_CONFIG, {
        domain_name: window.location.host
      }, {});
      instanceStore.set(data.data);
    }
  };
  updateLocalConfig = function() {
    const hostname = window.location.hostname;
    const instanceKey = configurations[hostname] || "localhost";
    systemSettingsStore.set(instanceConfig[instanceKey]);
    const favicon = get(systemSettingsStore).meta_settings.fav_icons;
    updateFavicon(favicon);
  };
  function updateFavicon(favicon) {
    const iconSizes = [
      "32x32",
      "16x16"
    ];
    iconSizes.forEach((size) => {
      let link = document.querySelector(`link[rel~='icon'][sizes='${size}']`) || document.createElement("link");
      link.rel = "icon";
      link.sizes = size;
      link.href = favicon[size];
      if (!link.parentElement) {
        document.head.appendChild(link);
      }
    });
  }
});
export {
  __tla,
  updateInstanceConfig,
  updateLocalConfig
};
