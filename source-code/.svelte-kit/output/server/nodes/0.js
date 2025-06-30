import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.ook2Uqq6.js","_app/immutable/chunks/CmsKOCeN.js","_app/immutable/chunks/BxzMArrE.js","_app/immutable/chunks/B_TcPqvE.js","_app/immutable/chunks/BNaIvRFi.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BDr9Qe-U.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BSbvuNr0.js","_app/immutable/chunks/CmzilaRh.js","_app/immutable/chunks/DFt3gT4P.js","_app/immutable/chunks/BA3dw9xS.js","_app/immutable/chunks/DV4qm29_.js","_app/immutable/chunks/BmrMg6ND.js","_app/immutable/chunks/BHr6jV4Q.js","_app/immutable/chunks/b7-CKqOq.js","_app/immutable/chunks/DLFvYbDI.js","_app/immutable/chunks/CQJBc34G.js","_app/immutable/chunks/BLC95ett.js","_app/immutable/chunks/Cd7-xMHP.js"];
export const stylesheets = ["_app/immutable/assets/0.C__gSz2A.css","_app/immutable/assets/toast.KOmfmGu7.css","_app/immutable/assets/RetryBox.COlT7sBL.css","_app/immutable/assets/Button.4cFhq8PD.css","_app/immutable/assets/LmsAuthentication.BnASsmZP.css"];
export const fonts = [];
