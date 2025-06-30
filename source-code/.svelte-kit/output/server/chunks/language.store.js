import { d as derived, g as get, w as writable } from "./index3.js";
const DEFAULT_LANGUAGE = "en";
const currentLanguage = writable(DEFAULT_LANGUAGE);
const text = writable({});
let loadLanguagePromise = Promise.resolve();
let languageLoaded = false;
async function loadLanguage(lang, event) {
  languageLoaded = false;
  try {
    const fetchMethod = event?.fetch ?? fetch;
    const response = await fetchMethod(`/languages/${lang}.json`);
    if (!response.ok) throw new Error("Language file not found");
    const data = await response.json();
    text.set(data);
  } catch (error) {
    console.error("Failed to load text:", error);
    throw error;
  }
  languageLoaded = true;
}
async function initializeLanguage(lang = DEFAULT_LANGUAGE, event) {
  currentLanguage.set(lang);
  loadLanguagePromise = loadLanguage(lang, event);
  await loadLanguagePromise;
}
const t = derived(
  [currentLanguage, text],
  ([$currentLanguage, $text]) => {
    return (key, params = {}) => {
      if (!$text[key]) {
        console.warn(
          `Text key "${key}" not found for language "${$currentLanguage}".`
        );
        return "";
      }
      let value = $text[key];
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
async function getText(key, params = {}) {
  await loadLanguagePromise;
  while (!languageLoaded) {
    await wait();
  }
  const value = get(t)(key, params);
  if (!value) {
    console.warn(`Text key "${key}" not found.`);
  }
  return value || "";
}
export {
  getText as g,
  initializeLanguage as i,
  t
};
