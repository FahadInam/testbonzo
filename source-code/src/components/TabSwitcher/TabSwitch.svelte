<script>
  export let tabs = ["Tab 1", "Tab 2"];
  export let selectedTab = 0;
  export let className = "";

  /**
   * @param {number} index 
   */

  function selectTab(index) {
    selectedTab = index;
  }
</script>

<div class="flex bg-white/20 p-1 rounded-full {className} max-w-[540px]">
  {#each tabs as tab, index}
    <button
      class="flex-1 min-w-0 m-1 p-2 rounded-full font-normal transition-all duration-300 font-fredoka
           overflow-hidden whitespace-nowrap truncate text-xs sm:text-sm"
      class:bg-navy={selectedTab === index}
      class:text-selected={selectedTab === index}
      class:bg-transparent={selectedTab !== index}
      class:text-white={selectedTab !== index}
      on:click={() => selectTab(index)}
    >
      {tab}
    </button>
  {/each}
</div>

<style>
  .bg-navy {
    background-color: #112D70;
  }
  .text-selected {
   color: #FFE500
  }
</style>
