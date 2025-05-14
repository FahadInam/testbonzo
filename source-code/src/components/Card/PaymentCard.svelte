<script>
  export let paymentOptions = []; // Array of payment options
  export let selectedOption = ""; // Currently selected option

  // Event dispatcher for selection
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // Handle payment option selection
  function handleSelection(value) {
    selectedOption = value;
    dispatch("select", { selected: value }); // Emit selected value
  }

  // Handle keyboard events (Enter or Space key)
  function handleKeyDown(event, value) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault(); // Prevent default behavior for Space key
      handleSelection(value);
    }
  }
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-4  ">
  {#each paymentOptions as option}
    <button
      type="button"
      class="border min-h-[169px] p-6 rounded-xl cursor-pointer transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex flex-col justify-between h-full"
      class:shadow-lg={selectedOption === option.value}
      on:click={() => handleSelection(option.value)}
      on:keydown={(e) => handleKeyDown(e, option.value)}
      tabindex="0"
      aria-pressed={selectedOption === option.value}
    >
      {#if option.icon}
        <img src={option.icon} alt={option.label} class="w-11 mb-2" />
      {/if}
      <p class="text-lg font-medium mt-8">{option.label}</p>
    </button>
  {/each}
</div>