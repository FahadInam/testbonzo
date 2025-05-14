import { afterNavigate, beforeNavigate } from "$app/navigation";
import { get, writable } from "svelte/store";
import { goto } from "$app/navigation";
import { page } from "$app/state";

export const navigationStore = writable({ back_url: "/" });

/**
 * @param {string} targetPath
 */
export function storeBackUrlOnNavigationTo(targetPath) {
  beforeNavigate(({ to }) => {
    if (to?.url?.pathname.includes(targetPath)) {
      navigationStore.set({ back_url: window.location.href });
    }
  });
}

export function clearBackUrlIfPathMatches() {
  const { back_url } = get(navigationStore);
  if (back_url && window.location.href === back_url) {
    navigationStore.update((state) => ({ ...state, back_url: "/" }));
    return true;
  }
  return false;
}

/**
 * @param {string} back_url
 */
export function setBackUrl(back_url) {
  navigationStore.set({ back_url: back_url });
}

/**
 * @param {string} path
 */
function extractBasePath(path) {
  const parts = path.split("/").filter(Boolean);
  if (parts.length > 3) {
    return `/${parts[0]}/${parts[1]}/${parts[2]}`;
  }
  return `/${parts[0]}/${parts[1]}`;
}

/**
 * @param {string} url
 */
export function gotoURL(url) {
  // Check if URL is provided
  if (!url) return;

  // Handle external links (http or https)
  if (url.startsWith("http://") || url.startsWith("https://")) {
    window.location.href = url; // Correct usage
    return;
  }

  // Handle internal links
  if (url.indexOf("{competitionHome}") > -1) {
    url = url.replace("{competitionHome}", extractBasePath(page.url.pathname));
  }

  if (url === "default") {
    history.back();
  } else {
    goto(url);
  }
}

export function goBack() {
  const { back_url } = get(navigationStore);
  gotoURL(back_url);
}

/**
 * @param {string} basePath
 * @param {(arg0: string, arg1: Record<string, string>) => void} onChange
 */
export function onLayoutPathMount(basePath, onChange) {
  if (!basePath) return;

  afterNavigate(() => {
    const newPath = page.url.pathname;
    if (isWithinLayout(newPath, basePath)) {
      onChange(newPath, page.params);
    }
  });
}

/**
 * @param {string} path
 * @param {string} basePath
 */
function isWithinLayout(path, basePath) {
  return path === basePath || path.startsWith(basePath + "/");
}
