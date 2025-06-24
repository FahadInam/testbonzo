import { get } from "svelte/store";
import { systemSettingsStore } from "../../stores/systemsettings.store";
import { configurations, INSTANCES_ID } from "$lib/constants/config.constants";

/**
 * Retrieves the system logo based on the given type and theme.
 *
 * @param {string} type - The type of logo to fetch (e.g., "web").
 * @param {string} theme - The theme of the logo (e.g., "dark" or "light").
 * @returns {string} - The logo URL or an empty string if unavailable.
 */
export function getSystemLogo(type, theme) {
  const Logo = get(systemSettingsStore)?.logo?.web_dark;
  return Logo;
}

export function getFormViewLogo() {
  const Logo = get(systemSettingsStore).logo.web_dark;
  return Logo;
}

export function getSystemDarkLogo() {
  const systemSettings = get(systemSettingsStore);

  return {
    web_logo: systemSettings.logo.web_dark,
    mobile_logo: systemSettings.logo.mobile_dark,
  };
}

export function getSystemLightLogo() {
  const systemSettings = get(systemSettingsStore);

  return {
    web_logo: systemSettings.logo.web_light,
    mobile_logo: systemSettings.logo.mobile_light,
  };
}

export function currentInstance() {
  if (typeof window === "undefined") {
    return null;
  }

  const hostname = window.location.hostname;

  const instanceKey = configurations[hostname] || "localhost";

  return {
    key: instanceKey,
    id: INSTANCES_ID[instanceKey.toUpperCase()] || null,
    isBonzo: instanceKey === "bonzo",
    is1on1Quiz: instanceKey === "1on1quiz",
    isGlobalClimateLiteracy: instanceKey === "globalclimateliteracy",
    isSingaporeGreenGuardians: instanceKey === "singaporegreenguardians",
    isHealthx: instanceKey === "healthx",
    isShupavuGames: instanceKey === "shupavugames",
    isPocketGames: instanceKey === "pocketgames",
    isQuotient: instanceKey === "quotientgames",
    isLocalhost: instanceKey === "localhost",
  };
}

export const isShupavu = currentInstance()?.isShupavuGames;
export const isBonzo = currentInstance()?.isBonzo;
export const isGCLC = currentInstance()?.isGlobalClimateLiteracy;

export const isGlobalClimateLiteracy = currentInstance()?.isGlobalClimateLiteracy;
export const isPocketGames = currentInstance()?.isPocketGames;

export const isQuotient = currentInstance()?.isQuotient;
export const isHealthx = currentInstance()?.isHealthx;
export const isSGG = currentInstance()?.isSingaporeGreenGuardians;
