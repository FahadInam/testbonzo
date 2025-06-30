import * as universal from '../entries/pages/admin/_competition_name_/_layout.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/admin/[competition_name]/+layout.js";
export const imports = ["_app/immutable/nodes/4.c1RrYDlM.js","_app/immutable/chunks/BDr9Qe-U.js","_app/immutable/chunks/BNaIvRFi.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BSbvuNr0.js"];
export const stylesheets = [];
export const fonts = [];
