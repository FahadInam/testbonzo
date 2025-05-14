<script>
  /**
 * @param {string} query
 */
  export let onSearch = (query) => {}; // Parent callback function

  let searchQuery = "";

  function handleSearch() {
    if (searchQuery.trim() !== "") {
      onSearch(searchQuery);
    }
  }
  /**
 * @param {KeyboardEvent} event
 */
  function handleKeydown(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  function clearSearch() {
    searchQuery = "";
    onSearch(""); // Optional: Notify parent that search is cleared
  }

  // Watch searchQuery and clear when emptied
  $: if (searchQuery === "") {
    clearSearch();
  }
</script>

<div class="w-full">
  <div class="relative">
    <input
      type="text"
      bind:value={searchQuery}
      placeholder="Search your friends by their name"
      class="w-full px-4 py-3 pr-10 rounded-full bg-blue-900/60 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300"
      aria-label="Search your friends"
      on:keydown={handleKeydown}
    />

    {#if searchQuery}
      <!-- Clear Icon (Appears When Typing) -->
      <button
        on:click={clearSearch}
        class="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-xl"
        aria-label="Clear search"
      >
        <i class="i i-cross"></i>
      </button>
    {:else}
      <!-- Search Icon (Always Visible) -->
      <button
        on:click={handleSearch}
        class="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-2xl pointer-events-none"
        aria-label="Search"
      >
        <i class="i i-search2"></i>
      </button>
    {/if}
  </div>
</div>
