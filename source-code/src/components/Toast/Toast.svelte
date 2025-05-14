<script>
  import { onDestroy, onMount } from "svelte";

  import { browser } from "$app/environment";
  import { showError } from "../../stores/toast.store";

  // @ts-ignore
  function showErrorToast(e) {
    showError(e.detail.message);
  }

  onMount(() => {
    if (browser) {
      window.addEventListener("showErrorToast", showErrorToast);
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener("showErrorToast", showErrorToast);
    }
  });
</script>
