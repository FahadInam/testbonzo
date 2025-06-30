// import { ALERT, APP_INTERNAL_MESSAGES } from '$lib/constants';
// import { Toast, User } from "$lib/actions";

import { get } from "svelte/store";
import { userStore } from "../stores/user.store";
import { showWarning } from "../stores/toast.store";
import { internetStore } from "../stores/internet.store";

const url = "https://1.1.1.1/cdn-cgi/trace";
const interval = 1000;
const timeoutThreshold = 1000;
const maxChecks = 7;
const failureThreshold = 2;

export function checkInternetStability() {
  const user = get(userStore);
  const isAuthenticated = (user.user_id && !user.is_guest_mode) || false;
  if (!isAuthenticated) {
    return;
  }

  let failureCount = 0;
  let checkCount = 0;

  const intervalId = setInterval(async () => {
    if (checkCount >= maxChecks) {
      clearInterval(intervalId);

      if (failureCount > failureThreshold) {
        // Toast.Show(APP_INTERNAL_MESSAGES.UNSTABLE_INTERNET, ALERT.WARNING, true);
        // showWarning("Your internet connection is unstable and may cause delays in games and other activities.");
        internetStore.update((state) => ({
          ...state,
          showInternetBanner: true,
        }));

        setTimeout(() => {
          internetStore.update((state) => ({
            ...state,
            showInternetBanner: false,
          }));
        }, 10000);
      }

      return;
    }

    let duration = 0;

    try {
      const controller = new AbortController();
      const signal = controller.signal;
      const startTime = Date.now();

      const response = await fetch(url, { signal });
      duration = Date.now() - startTime;

      if (!response.ok || duration > timeoutThreshold) {
        failureCount++;
      }
    } catch {
      failureCount++;
    }

    checkCount++;
  }, interval);
}
