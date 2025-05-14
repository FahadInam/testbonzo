// @ts-nocheck
import { browser } from "$app/environment";
import { beforeNavigate } from "$app/navigation";

export function storeScrollPosition(containerSelector = ".save-scroll") {
  if (browser) {
    const container = document.querySelector(containerSelector);
    if (container) {
      const path = window.location.pathname;
      sessionStorage.setItem(`scrollY-${path}`, "" + container.scrollTop);
    }
  }
}

export function manageScrollOnNavigation(
  clearOnPaths = [],
  containerSelector = ".save-scroll"
) {
  if (browser) {
    beforeNavigate(({ to }) => {
      const path = to?.url.pathname;

      // Check if the path requires clearing the scroll position
      if (path && clearOnPaths.includes(path)) {
        clearScrollPosition(path);
      } else {
        storeScrollPosition(containerSelector);
      }
    });
  }
}

export function clearScrollPosition() {
  if (browser) {
    const path = window.location.pathname;
    sessionStorage.removeItem(`scrollY-${path}`);
  }
}

export function restoreScrollPosition(containerSelector = ".save-scroll") {
  if (browser) {
    setTimeout(() => {
      const container = document.querySelector(containerSelector);
      if (container) {
        const path = window.location.pathname;
        const savedScrollY = sessionStorage.getItem(`scrollY-${path}`);
        if (savedScrollY !== null) {
          container.scrollTop = parseInt(savedScrollY);
        }
      }
    }, 50);
  }
}
