import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [
    tailwindcss(),
    topLevelAwait({
      promiseExportName: "__tla",
      promiseImportName: (i) => `__tla_${i}`,
    }),
    sveltekit(),
  ],
});
