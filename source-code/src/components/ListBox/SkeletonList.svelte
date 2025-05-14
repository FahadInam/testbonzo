<script>
  export let skeletonCount = 6;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  {#each Array(skeletonCount) as _}
    <div class="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md animate-pulse">
      <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
      <div class="flex flex-col flex-1 space-y-2">
        <div class="w-3/4 h-4 bg-gray-200 rounded"></div>
        <div class="w-1/2 h-3 bg-gray-200 rounded"></div>
      </div>
      <div class="ml-auto w-12 h-6 bg-gray-200 rounded-full"></div>
    </div>
  {/each}
</div>
