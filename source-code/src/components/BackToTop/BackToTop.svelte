<script>
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";

  let showScrollTop = false;

  function handleScroll() {
    if (browser) {
      showScrollTop = window.scrollY > 200;
    }
  }

  function scrollToTop() {
    if (browser) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  onMount(() => {
    if (browser) {
      window.addEventListener("scroll", handleScroll);
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener("scroll", handleScroll);
    }
  });
</script>

{#if showScrollTop}
  <button
    class="fixed z-10 bottom-6 right-6 w-12 h-12 min-w-12 bg-blue-400 shadow-gray-600 shadow-lg text-white p-3 rounded-full hover:bg-blue-500 transition-all duration-300"
    on:click={scrollToTop}
    aria-label="Scroll to top"
  >
    <i class="i i-top"></i>
  </button>
{/if}
