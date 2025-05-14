// @ts-nocheck
import { PUBLIC_API_BASE_URL } from "$env/static/public";
import { get, writable } from "svelte/store";
import { userStore } from "../stores/user.store";
import { awaitStoreKey, waitForUserData } from "./utils";
import { firstLoadStore } from "../stores/firstload.store";

const API_BASE_URL = PUBLIC_API_BASE_URL;
const apiCache = writable(new Map());
const activeControllers = new Set();
const CACHE_EXPIRATION_TIME = 2 * 60 * 1000;

function isCacheValid(cachedData) {
  return (
    cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION_TIME
  );
}

function dispatchApiError(message, status, retryCallback) {
  setTimeout(async () => {
    await awaitStoreKey(firstLoadStore, "isUILoaded");
    window.dispatchEvent(
      new CustomEvent("apiError", {
        detail: { message, status, retryCallback },
      })
    );
  }, 5);
}

export async function request(apiDefinition, params = {}, options = {}) {
  const {
    definitionOverrides = {},
    allowFailing = false,
    headers: customHeaders = {},
    ...fetchOptions
  } = options;
  const mergedDefinition = { ...apiDefinition, ...definitionOverrides };
  const {
    method,
    endpoint,
    cache,
    secure,
    contentType = "application/json",
    loader,
  } = mergedDefinition;

  const cacheKey = `${endpoint}:${JSON.stringify(params)}`;
  validateParams(mergedDefinition, params);

  if (cache) {
    let cachedData;
    apiCache.subscribe((cacheMap) => {
      cachedData = cacheMap.get(cacheKey);
    })();
    if (cachedData && isCacheValid(cachedData)) {
      return cachedData.data;
    }
  }

  if (loader) {
    window.dispatchEvent(
      new CustomEvent("loaderStart", {
        detail: { apiDefinition: mergedDefinition, params },
      })
    );
  }

  const controller = new AbortController();
  activeControllers.add(controller);

  let result;

  const makeRequest = async () => {
    try {
      const baseURL = mergedDefinition.baseURL || API_BASE_URL;
      const url = `${baseURL}${endpoint}`;
      const headers = { ...customHeaders }; // Merge custom headers

      if (secure) {
        const token = getAuthToken();
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        } else {
          throw { message: "Authentication token is missing", status: 401 };
        }
      }

      let body;
      if (contentType === "multipart/form-data") {
        const formData = new FormData();
        for (const key in params) {
          formData.append(key, params[key]);
        }
        body = formData;
      } else {
        headers["Content-Type"] = "application/json";
        body = method !== "GET" ? JSON.stringify(params) : undefined;
      }

      const response = await fetch(url, {
        method,
        headers,
        body,
        signal: controller.signal,
        ...fetchOptions,
      });

      if (!response.ok) {
        const error = {
          status: response.status,
          message: `${endpoint} request failed with status ${response.status} ${response.statusText}`,
        };
        if (allowFailing) {
          return Promise.reject(error);
        }
        throw error;
      }

      result = await response.json();

      if (result && result.error_code && result.error_code !== 0) {
        const errorMessage = mergedDefinition?.errorCodes[result.error_code];
        if (errorMessage) {
          window.dispatchEvent(
            new CustomEvent("showErrorToast", {
              detail: { message: errorMessage },
            })
          );
        } else {
          console.error(result.error_code + " error code is not defined");
        }
      }

      if (cache) {
        apiCache.update((cacheMap) => {
          if (cacheMap.size >= 20) {
            const firstKey = cacheMap.keys().next().value;
            cacheMap.delete(firstKey);
          }
          cacheMap.set(cacheKey, { data: result, timestamp: Date.now() });
          return cacheMap;
        });
      }
    } catch (error) {
      if (allowFailing) {
        return Promise.reject(error);
      }
      return new Promise((resolve) => {
        dispatchApiError(error.message, error.status || "Unknown", () => {
          resolve(makeRequest());
        });
      });
    } finally {
      activeControllers.delete(controller);
      if (loader) {
        window.dispatchEvent(
          new CustomEvent("loaderEnd", {
            detail: { apiDefinition: mergedDefinition, params },
          })
        );
      }
    }
    return result;
  };

  return makeRequest();
}

function validateParams(apiDefinition, params) {
  const { requiredParams } = apiDefinition;
  if (!requiredParams) return true;

  const missingParams = requiredParams.filter((param) => !(param in params));
  if (missingParams.length > 0) {
    dispatchApiError(
      `Missing required parameters: ${missingParams.join(", ")}`,
      "400"
    );
  }
  return true;
}

function getAuthToken() {
  return get(userStore).auth_token;
}

export function abortAllRequests() {
  for (const controller of activeControllers) {
    controller.abort();
  }
  activeControllers.clear();
}
