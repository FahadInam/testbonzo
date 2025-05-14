<script>
  export let itemsCount = 6;
</script>

<div
  class="grid grid-cols-1 mb-6 mx-auto max-w-[310px] sm:max-w-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
>
  {#each Array(itemsCount) as _, i}
    <div
      class="bg-white mb-5 rounded-[20px] card-button-shadow max-w-[310px] w-full mx-auto p-2"
    >
      <div class="h-48 bg-gray-300 animate-pulse rounded-2xl mb-5"></div>
      <div class="mx-3 mb-4 h-7 bg-gray-300 animate-pulse rounded-lg"></div>

      <div class="flex mb-4 gap-6 mx-3 space-y-2">
        <div class="flex-[.5] h-5 bg-gray-300 animate-pulse rounded-lg"></div>
        <div class="flex-[.5] h-5 bg-gray-300 animate-pulse rounded-lg"></div>
      </div>

      <div class="mx-3 mb-2 h-11 bg-gray-300 animate-pulse rounded-lg"></div>
    </div>
  {/each}
</div>
