import { browser } from "$app/environment";
import { checkInternetStability } from "./internetStabilityChecker";

let internetCheckInterval;
let isTabFocused = true;

const startInternetCheck = () => {
  clearInterval(internetCheckInterval);
  internetCheckInterval = setInterval(() => {
    checkInternetStability();
  }, 120000); // 2 minutes
};

const stopInternetCheck = () => {
  clearInterval(internetCheckInterval);
};

const handleVisibilityChange = () => {
  if (document.visibilityState === "visible") {
    if (!isTabFocused) {
      isTabFocused = true;
      startInternetCheck();
    }
  } else {
    if (isTabFocused) {
      isTabFocused = false;
      stopInternetCheck();
    }
  }
};

// Call this once from +layout.svelte
export function initInternetMonitoring() {
  if (!browser) return;

  if (isTabFocused) startInternetCheck();
  document.addEventListener("visibilitychange", handleVisibilityChange);
}
