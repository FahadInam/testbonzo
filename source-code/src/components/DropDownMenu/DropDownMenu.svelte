<script>
  // @ts-nocheck
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { onMount, onDestroy } from "svelte";
  import { gotoURL } from "../../stores/navigation.store";

  // State for dropdown items
  export let items = [
    { label: "Option 1", link: "", clickCB: null, icon: null },
    { label: "Option 2", link: "", clickCB: null, icon: null },
  ];

  let isOpen = false;

  // Function to close the dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (!event.target.closest(".dropdown-container")) {
      isOpen = false;
    }
  };

  onMount(() => {
    if (browser) {
      document.addEventListener("click", handleClickOutside);
    }
  });

  onDestroy(() => {
    if (browser) {
      document.removeEventListener("click", handleClickOutside);
    }
});

  const onClick = (/** @type {number} */ index) => {
    if (items[index]?.link?.length > 0) {
      //goto(items[index].link);
      gotoURL(items[index].link);
    } else if (items[index]?.clickCB) {
      items[index].clickCB();
    }
    isOpen = false;
  };
</script>

<div class="relative dropdown-container">
  <!-- Button to toggle the dropdown -->
  <button on:click={() => (isOpen = !isOpen)}>
    <slot />
  </button>

  <!-- Dropdown Menu -->
  {#if isOpen}
    <div
      class="absolute right-0 mt-2 bg-white rounded-3xl shadow-lg py-3 w-49 overflow-hidden"
    >
      <div class="py-1">
        {#each items as item, index}
          <button
            class="flex items-center px-4 py-3 font-medium text-base text-gray-700 hover:bg-[var(--primary-color)] w-full text-left hover:text-white"
            on:click={() => {
              onClick(index);
            }}
          >
            {#if item.icon}
              <!-- <span class="mr-2" innerHTML={item.icon}></span> -->
              <i class={`${item.icon} mr-4 text-xl`}></i>
            {/if}
            {item.label}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>
