import { request } from "$lib/api.service";
import {
  configurations,
  instanceConfig,
} from "$lib/constants/config.constants";
import { get } from "svelte/store";
import { API_DEFINITIONS } from "../../apis/api.definitions";
import { instanceStore } from "../../stores/instance.store";
import { systemSettingsStore } from "../../stores/systemsettings.store";

export async function updateInstanceConfig() {
  if (typeof window !== "undefined") {
    const data = await request(
      API_DEFINITIONS.INSTANCE_CONFIG,
      {
        domain_name: window.location.host,
      },
      {},
    );

    instanceStore.set(data.data);
  }
}

export function updateLocalConfig() {
  const hostname = window.location.hostname; // Destructure hostname for simplicity
  const instanceKey = configurations[hostname] || "localhost"; // Fallback to localhost
  systemSettingsStore.set(instanceConfig[instanceKey]);

  const favicon = get(systemSettingsStore).meta_settings.fav_icons;
  updateFavicon(favicon); // Update favicon based on domain
}

/**
 * @typedef {Object} Favicon
 * @param {Favicon} favicon
 */
function updateFavicon(favicon) {
  const iconSizes = ["32x32", "16x16"]; // Define the favicon sizes to handle

  iconSizes.forEach((size) => {
    let link =
      document.querySelector(`link[rel~='icon'][sizes='${size}']`) ||
      document.createElement("link");
    link.rel = "icon";
    link.sizes = size;
    link.href = favicon[size];

    if (!link.parentElement) {
      document.head.appendChild(link);
    }
  });
}
