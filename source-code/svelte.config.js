import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter({
      // Default options for the adapter-static
      pages: "build", // Directory to write static files to
      assets: "build", // Directory to write static assets to
      precompress: false, // Precompresses assets (e.g., gzip)
      fallback: "index.html", // Fallback file to render if the route is not found
    }),
  },
};

export default config;
