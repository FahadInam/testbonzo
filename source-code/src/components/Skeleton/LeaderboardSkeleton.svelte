<script>
  export let itemsCount = 3; // Top 3 players
  export let leaderboardItems = 6; // Leaderboard rows
</script>

<!-- Top 3 Players Skeleton -->
<div class="grid grid-cols-3 gap-4 mb-6 sm:mt-10 mx-auto max-w-4xl">
  {#each Array(itemsCount) as _, i}
    <div class="flex flex-col items-center">
      <div
        class="sm:w-24 sm:h-24 w-20 h-20 bg-gray-300 animate-pulse rounded-full mb-2"
      ></div>
      <div
        class="sm:w-32 w-28 h-6 bg-gray-300 animate-pulse rounded-lg mb-1"
      ></div>
      <div class="w-16 h-4 bg-gray-300 animate-pulse rounded-lg"></div>
    </div>
  {/each}
</div>

<!-- Leaderboard Table Skeleton -->
<div class="mx-auto max-w-4xl bg-white rounded-3xl p-4 sm:mt-8 shadow-md">
  <div class="flex gap-4 p-3 pt-1 border-b border-gray-300">
    <div class="w-12 h-6 bg-gray-300 animate-pulse rounded-lg"></div>
    <div class="flex-1 sm:ml-4">
      <div class="max-w-40 h-6 bg-gray-300 animate-pulse rounded-lg"></div>
    </div>
    <div
      class="max-w-[120px] w-full h-6 bg-gray-300 animate-pulse rounded-lg"
    ></div>
  </div>

  {#each Array(leaderboardItems) as _, i}
    <div class="flex gap-4 p-3 border-b last:border-none border-gray-200">
      <div class="w-10 h-10 bg-gray-300 animate-pulse rounded-xl"></div>
      <div class="flex flex-1 sm:ml-6 items-center gap-2">
        <div class="w-9 h-9 bg-gray-300 animate-pulse rounded-full"></div>
        <div
          class="max-w-60 w-full h-6 bg-gray-300 animate-pulse rounded-lg"
        ></div>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
        <div class="w-20 h-6 bg-gray-300 animate-pulse rounded-lg"></div>
      </div>
    </div>
  {/each}
</div>
