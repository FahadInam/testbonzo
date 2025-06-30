// @ts-nocheck
// +page.js
import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { resultStore } from "../../../stores/result.store";
import { metaStore } from "../../../stores/meta.store";
import { userStore } from "../../../stores/user.store";

/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export function load({ url }) {
  // Only run this code in the browser
  if (browser) {
    const isPrincipal = get(userStore).active_role === "principal";
    const isProfileNotComplete = get(userStore).profile_completion_step == 0;

    if (isPrincipal && isProfileNotComplete) {
      throw redirect(302, "/account/institution/details");
    }
  }

  return {};
}
