// @ts-nocheck
import { browser } from "$app/environment";
import { writable, derived, get } from "svelte/store";

// Default language (fallback if no preference is set)
const DEFAULT_LANGUAGE = "en";

// Store for the current language
export const currentLanguage = writable(DEFAULT_LANGUAGE);

// Store for text (translations)
export const text = writable({});

// Store to track the loading promise
let loadLanguagePromise = Promise.resolve();

let languageLoaded = false;

/**
 * Function to load text dynamically
 * @param {string} lang - The language to load
 * @param {RequestEvent} event - The SvelteKit event object to use event.fetch
 */
export async function loadLanguage(lang, event) {
  languageLoaded = false;
  try {
    const fetchMethod = event?.fetch ?? fetch; // Use event.fetch if available, fallback to global fetch for browser
    const response = await fetchMethod(`/languages/${lang}.json`);
    if (!response.ok) throw new Error("Language file not found");
    const data = await response.json();
    text.set(data);
  } catch (error) {
    console.error("Failed to load text:", error);

    if (browser) {
      // Refresh the page to retry loading the language file
      console.warn("Refreshing the page to retry loading the language file...");
      setTimeout(() => {
        window.location.reload(); // Refresh the page
      }, 1000);
    }
    throw error; // Re-throw the error to propagate it
  }
  languageLoaded = true;
}

// Initialize language and wait for text to load
export async function initializeLanguage(lang = DEFAULT_LANGUAGE, event) {
  currentLanguage.set(lang);
  loadLanguagePromise = loadLanguage(lang, event); // Pass the event object
  await loadLanguagePromise; // Wait for text to load
}

// Derived store for text strings
export const t = derived(
  [currentLanguage, text],
  ([$currentLanguage, $text]) => {
    return (/** @type {string | number} */ key, params = {}) => {
      if (!$text[key]) {
        console.warn(
          `Text key "${key}" not found for language "${$currentLanguage}".`
        );
        return ""; // Return empty string if key is missing
      }
      let value = $text[key];
      // Replace placeholders with params (e.g., "Hello, {name}!")
      Object.keys(params).forEach((param) => {
        value = value.replace(`{${param}}`, params[param]);
      });
      return value;
    };
  }
);

function wait() {
  return new Promise((accept, reject) => {
    setTimeout(() => {
      accept(true);
    }, 100);
  });
}

// Utility function to access text without subscribing
export async function getText(key, params = {}) {
  // Wait for the language loading promise to resolve
  await loadLanguagePromise;
  while (!languageLoaded) {
    await wait();
  }

  const value = get(t)(key, params);
  if (!value) {
    console.warn(`Text key "${key}" not found.`);
  }
  return value || ""; // Return empty string if key is missing
}

// Function to change the language
export async function changeLanguage(lang, event) {
  currentLanguage.set(lang);
  loadLanguagePromise = loadLanguage(lang, event); // Pass the event object
  await loadLanguagePromise; // Wait for text to load
}
