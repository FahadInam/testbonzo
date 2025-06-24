// since there's no dynamic data here, we can prerender

import { LandingPageNavigation } from "$lib/utils";

// it so that it gets served as a static asset in production
export const prerender = true;

export const load = async () => {
  LandingPageNavigation();
};
