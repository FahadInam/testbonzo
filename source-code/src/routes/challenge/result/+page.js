// +page.js
import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { resultStore } from "../../../stores/result.store";
import { metaStore } from "../../../stores/meta.store";

/** @type {import('./$types').PageLoad} */
export function load({ url }) {
  // Only run this code in the browser
  if (browser) {
    const resultStoreValue = get(resultStore);
    const metaStoreValue = get(metaStore);
    console.log(
      resultStoreValue,
      metaStoreValue,
      "resultStoreValue, metaStoreValue",
    );
    if (resultStoreValue?.player?.avatar === null) {
      throw redirect(302, `/competitions/${metaStoreValue.url}/home`);
    }
  }

  return {};
}
