<script>
  import { onMount } from "svelte";
  import { fetchGoogleUserInfo } from "../../../data-actions/authentication/common.auth.data";
  import { browser } from "$app/environment";


     onMount(async () => {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      await fetchGoogleUserInfo(hash);
         }
  });
</script>
<div>
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        class="w-16 h-16 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"
      ></div>
    </div>
</div>
