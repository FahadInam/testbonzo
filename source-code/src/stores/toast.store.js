import { browser } from "$app/environment";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

if (browser) {
  const style = document.createElement("style");
  // style.textContent = `
  //   .notyf__toast {
  //     min-width: 300px !important;
  //     max-width: 500px !important;
  //   },
  //   .notyf__ripple {
  //     min-width: 300px !important;
  //     max-width: 500px !important;
  //   }`;
  document.head.appendChild(style);
}

/**
 * @type {Notyf}
 */
let successNotyf;
/**
 * @type {Notyf}
 */
let errorNotyf;
/**
 * @type {Notyf}
 */
let warningNotyf;

if (browser) {
  successNotyf = new Notyf({
    duration: 3000,
    position: { x: "right", y: "top" },
  });

  errorNotyf = new Notyf({
    duration: 3000,
    position: { x: "center", y: "top" },
  });

  warningNotyf = new Notyf({
    duration: 5000,
    position: { x: "center", y: "bottom" },
    types: [
      {
        type: "warning",
        background: "#333",
        icon: false,
      },
    ],
  });
}

/**
 * Show a toast that closes when clicked
 * @param {Notyf} notyfInstance
 * @param {string} type
 * @param {string} message
 */
const showToast = (notyfInstance, type, message) => {
  if (!notyfInstance) return;

  notyfInstance.dismissAll();

  // Adjust duration dynamically based on message length
  const baseDuration = 3000;
  const extraDuration = Math.max(0, (message.length - 50) * 50); // Add 50ms per extra character after 50 chars
  const finalDuration = Math.min(baseDuration + extraDuration, 10000); // Capped at 10s
  const disableRipple = message.length > 50;

  const toast = notyfInstance.open({
    type,
    message,
    duration: finalDuration,
    ripple: !disableRipple, // Disable ripple if text is too big
  });

  // Add click listener to dismiss toast
  // @ts-ignore
  toast.on("click", () => {
    notyfInstance.dismiss(toast);
  });
};

/**
 * Show a success toast
 * @param {string} message
 */
export const showSuccess = (message) => {
  showToast(successNotyf, "success", message);
};

/**
 * Show an error toast
 * @param {string} message
 */
export const showError = (message) => {
  showToast(errorNotyf, "error", message);
};

/**
 * Show a warning toast (e.g., inactivity logout)
 * @param {string} message
 */
export const showWarning = (message) => {
  showToast(warningNotyf, "warning", message);
};
