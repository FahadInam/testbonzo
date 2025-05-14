<script>
  export let completed = 0;
  export let total = 1;
  export let className = ""; 
  export let outsideLabel = false; 
  // Ensure progress updates reactively
  $: progress = (completed / total) * 100;
</script>
<div class="flex items-center w-full mb-3">
  <div class="w-full">
<div
  class="bg-blue-900 rounded-full w-full min-w-[100px] sm:min-w-[200px]  font-[Poppins] flex items-center relative  overflow-hidden {className}"
>
  <!-- Green progress fill (starts from the left) -->
  <div
    class="bg-[var(--theme-green-color)] bg-color-green h-full rounded-full transition-all duration-300"
    style="width: {progress}%;"
  ></div>

  <!-- Lesson count (positioned at the right end) -->
    {#if !outsideLabel}
        <div class="absolute right-2 top-0 bottom-0 flex items-center text-white text-xs sm:text-sm font-medium">
          <b class="font-bold">{completed}</b> / {total}
        </div>
      {/if}
</div>
</div>
{#if outsideLabel}
    <!-- Lesson count outside and right-aligned -->
    <div class="ml-2 text-sm font-semibold text-blue-900 whitespace-nowrap">
      <b class="font-semibold text-blue-400">{completed}</b> / {total}
    </div>
  {/if}
</div>