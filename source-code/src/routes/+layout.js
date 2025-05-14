import { initializeLanguage } from "../stores/language.store";

export const ssr = false;
export const prerender = true;

export const load = async (event) => {
  await initializeLanguage("en", event); // Wait for language to load

  // Dynamically import the function after language is set, otherwise, a race condition occurs
  const { updateInstanceConfig, updateLocalConfig } = await import(
    "../data-actions/instance/instance.da"
  );

  // Call the function
  updateInstanceConfig();
  updateLocalConfig();
  return { completed: true }; // Proceed with rendering
};
