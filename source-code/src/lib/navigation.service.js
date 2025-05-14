import { goto } from "$app/navigation";

/**
 * @param {string} url
 */
export function gotoURL(url) {
  if (!url) return;
  if (url == "default") {
    history.back();
  } else {
    goto(url);
  }
}
