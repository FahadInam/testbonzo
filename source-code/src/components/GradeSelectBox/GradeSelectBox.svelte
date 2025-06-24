<script>
  import { competitionStore } from "../../stores/competition.store";
  import { IMAGES } from "$lib/assets/images/images.constants";

  export let title = "Select Grade"; // Default title
  export let options = [
    { value: "", label: "Select Grade" },
    { value: "1", label: "Grade 1" },
  ];
  export let iconSrc = IMAGES.CHANGE_GRADE_ICON; // Path to the icon

  /**
   * @type {(arg0: string) => void}
   */
  export let onSelect;

  let selectedValue = "";

  // Always keep selectedValue in sync with the store's current_grade
  $: selectedValue = $competitionStore.current_grade || "";

  /**
   * @param {Event & { currentTarget: EventTarget & HTMLSelectElement }} event
   */
  function handleSelect(event) {
    const target = event.currentTarget;
    // selectedValue = target.value;
    if (selectedValue === "") {
      target.classList.replace("text-gray-900", "text-gray-500");
    } else {
      target.classList.replace("text-gray-500", "text-gray-900");

      //item has been selected
      onSelect(selectedValue);
    }
  }
</script>

<div
  class="w-full mx-auto bg-white rounded-[20px] shadow-lg overflow-hidden opacity-100"
>
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
  <div class="p-9">
    <select
      class="w-full dropdown cursor-pointer border border-gray-600 border-1 text-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring focus:ring-blue-300"
      bind:value={selectedValue}
      on:change={handleSelect}
    >
      {#each options as option}
        <option value={option.value} class="cursor-pointer"
          >{option.label}</option
        >
      {/each}
    </select>
  </div>
</div>

<style>
</style>
