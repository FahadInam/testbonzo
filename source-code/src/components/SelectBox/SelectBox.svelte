<script>
  import { onMount, onDestroy } from "svelte";

  export let options = [
    { value: "3-4", label: "3-4" },
    { value: "5-6", label: "5-6" },
    { value: "7-8", label: "7-8" },
    { value: "9-10", label: "9-10" },
    { value: "11+", label: "11+" },
  ];

  export let onSelect;
  export let customClass = "";
  export let selectedValue = options[0].value;
  export let width = "200px"; // Default width, can be overridden

  let isOpen = false;
  let dropdownElement;

  function handleClickOutside(event) {
    if (isOpen && dropdownElement && !dropdownElement.contains(event.target)) {
      isOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener("mousedown", handleClickOutside);
  });

  onDestroy(() => {
    document.removeEventListener("mousedown", handleClickOutside);
  });

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function selectOption(value) {
    selectedValue = value;
    isOpen = false;
    if (onSelect) {
      onSelect(value);
    }
  }
</script>

<div
  class="relative {customClass}"
  bind:this={dropdownElement}
  style="width: {width};"
>
  <!-- Dropdown button -->
  <button
    type="button"
    class="w-full flex items-center justify-between custom-dropdown text-white rounded-full text-base font-medium focus:outline-none shadow-sm"
    on:click|stopPropagation={toggleDropdown}
  >
    <span class="px-3 py-2 truncate max-w-[calc(100%-40px)]">
      {options.find((opt) => opt.value === selectedValue)?.label || "Select"}
    </span>
    <span class="pr-6 flex-shrink-0">
      <svg
        class="w-4 h-4 transition-transform transform {isOpen
          ? 'rotate-180'
          : ''}"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </span>
  </button>

  <!-- Dropdown menu -->
  {#if isOpen}
    <div
      class="absolute left-0 right-0 mt-1 bg-white rounded-2xl shadow-lg z-10 overflow-hidden"
      style="width: 100%;"
    >
      {#each options as option}
        <button
          class="w-full text-left px-6 py-2.5 truncate transition-all focus:outline-none
            {selectedValue === option.value
            ? 'bg-sky-500 text-white'
            : 'text-gray-700 hover:bg-sky-500 hover:text-white'}"
          on:click={() => selectOption(option.value)}
          title={option.label}
        >
          {option.label}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .custom-dropdown {
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
