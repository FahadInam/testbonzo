import { get } from "svelte/store";
import { goto } from "$app/navigation";
import { userStore } from "../../stores/user.store";
import { browser } from "$app/environment";

// Define route access rules with redirect mapping
// roles and instance are optional fields. You can skip roles and instances if you want to make a redirection universal.

const routeRedirects = [
  {
    paths: ["/admin/*"],
    redirectTo: "/",
    isLoggedIn: false,
  },
  {
    paths: ["/account/*", "/"],
    redirectTo: "/competitions",
    isLoggedIn: true,
    roles: ["learner"],
  },
  {
    paths: ["/account/*", "/", "/competitions"],
    redirectTo: "/admin/competitions",
    isLoggedIn: true,
    roles: ["principal"],
  },
  {
    paths: ["/test/*"],
    redirectTo: "/testing",
    instance: "exclusive",
    roles: ["learner", "principal"],
  },
];

/**
 * Checks if a path matches a given rule, including wildcard support.
 * @param {string} path
 * @param {string[]} rulePaths
 * @returns {boolean}
 */
function matchesRule(path, rulePaths) {
  return rulePaths.some((rulePath) => {
    if (rulePath.endsWith("/*")) {
      return path.startsWith(rulePath.slice(0, -1));
    }
    return path === rulePath;
  });
}

/**
 * Checks access and redirects if necessary.
 * @param {string} path
 * @param {string | null} instanceId (optional)
 */
export function checkPathRedirection(path, instanceId = null) {
  if (!browser) return;
  const user = get(userStore);
  const isAuthenticated = (user.user_id && !user.is_guest_mode) || false;
  const userRole = user.active_role || "guest"; // Default to 'guest' if role is undefined

  console.log("isAuthenticated", isAuthenticated, "userRole", userRole);

  for (const rule of routeRedirects) {
    if (matchesRule(path, rule.paths)) {
      if (rule.isLoggedIn == isAuthenticated) {
        if (!rule.instance || rule.instance === instanceId) {
          if (!rule.roles || rule.roles.includes(userRole)) {
            console.warn(
              "Redirecting user from ",
              path,
              "to the page",
              rule.redirectTo,
            );

            // If the path doesn't start with /, it should be prepended.
            const redirectPath = rule.redirectTo.startsWith("/")
              ? rule.redirectTo
              : "/" + rule.redirectTo;
            goto(redirectPath);
          }
        }
      }
    }
  }
}
