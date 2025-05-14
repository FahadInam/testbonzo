<script>
  import { get } from "svelte/store";
  import { competitionStore } from "../../stores/competition.store";
  import { IMAGES } from "$lib/assets/images/images.constants";

  export let title = "Select Grade";
  export let options = [
    { value: "", label: "Select Grade" },
    { value: "6", label: "Six" },
    { value: "7", label: "Seven" },
    { value: "8", label: "Eight" },
    { value: "9", label: "Nine" },
    { value: "form2", label: "Form 2" },
  ];
  export let iconSrc = IMAGES.OTP_CHANGE_GRADE;

  /**
   * @type {(arg0: string) => void}
   */
  export let onSelect;

  // initialize from store
  let selectedValue = get(competitionStore).current_grade ?? "";

  /**
   * set the new value and notify
   * @param {string} value
   */
  function handleSelect(value) {
    selectedValue = value;
    onSelect(selectedValue);
  }

  // exclude the placeholder option
  $: filteredOptions = options.filter((o) => o.value !== "");
</script>

<div class="w-full mx-auto bg-white rounded-[20px] shadow-lg overflow-hidden">
  <div
    class="bg-blue-900 text-white py-2 flex justify-center items-center gap-4"
  >
    <div class="flex items-center">
      {#if iconSrc}
        <img src={iconSrc} class="w-11 h-12 m-1 mr-3" alt="Grade Icon" />
      {/if}
      <span class="text-xl font-semibold">{title}</span>
    </div>
  </div>

  <div class="p-4">
    {#each filteredOptions as option}
      <div class="my-3">
        <button
          class={`w-full py-3 text-center rounded-lg border transition  ${selectedValue !== option.value ? "hover:bg-gray-200" : ""}`}
          on:click={() => handleSelect(option.value)}
          class:bg-gray-300={selectedValue === option.value}
          class:bg-white={selectedValue !== option.value}
          class:border-gray-300={selectedValue !== option.value ||
            selectedValue === option.value}
        >
          {option.label}
        </button>
      </div>
    {/each}
  </div>
</div>

<style>
  /* additional styling if needed */
</style>
