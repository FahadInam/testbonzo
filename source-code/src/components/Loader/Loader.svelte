<script>
  import { onDestroy, onMount } from "svelte";
  import { loaderStore } from "../../stores/loader.store";
  import { browser } from "$app/environment";

  export let isLoading = false;

  loaderStore.subscribe((data) => {
    if (data) {
      isLoading = data.visible;
    }
  });

  const showLoader = () => {
    loaderStore.set({ visible: true });
  };

  const hideLoader = () => {
    loaderStore.set({ visible: false });
  };

  // Disable keyboard input
  function handleKeyDown(event) {
    if (isLoading) {
      event.preventDefault();
    }
  }

  onMount(() => {
    if (browser) {
      window.addEventListener("loaderStart", showLoader);
      window.addEventListener("loaderEnd", hideLoader);
      window.addEventListener("keydown", handleKeyDown);
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener("loaderStart", showLoader);
      window.removeEventListener("loaderEnd", hideLoader);
      window.addEventListener("keydown", handleKeyDown);
    }
  });
</script>

<div>
  {#if isLoading}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        class="w-16 h-16 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"
      ></div>
    </div>
  {/if}
</div>
