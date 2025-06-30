import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.4Zo40VU_.js","_app/immutable/chunks/CmsKOCeN.js","_app/immutable/chunks/Bvbqq-zN.js","_app/immutable/chunks/C_S5TygX.js","_app/immutable/chunks/BWmI7Kwv.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BDr9Qe-U.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/cR8EBM7j.js","_app/immutable/chunks/DJyY-Ao_.js","_app/immutable/chunks/MyGX-iGX.js","_app/immutable/chunks/t8zBqOd3.js","_app/immutable/chunks/CvLKQSYC.js","_app/immutable/chunks/BoEBYeq-.js","_app/immutable/chunks/DjNUT-oc.js","_app/immutable/chunks/E8PaDAPB.js","_app/immutable/chunks/Bg1yBDra.js","_app/immutable/chunks/CbiYp799.js"];
export const stylesheets = ["_app/immutable/assets/0.CRUsmx4y.css","_app/immutable/assets/toast.KOmfmGu7.css","_app/immutable/assets/RetryBox.COlT7sBL.css","_app/immutable/assets/Button.4cFhq8PD.css","_app/immutable/assets/LmsAuthentication.BnASsmZP.css"];
export const fonts = [];
