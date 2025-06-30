<script>
  import Avatar from "../Avatar/Avatar.svelte";
  import Image from "../Image/Image.svelte";
  import { IMAGES } from "$lib/assets/images/images.constants";

  /**
   * @type {{ label: string, key: string, type: string, width: string }[]}
   */
  export let columns = [];

  /**
   * @type {any[]}
   */
  export let data = [];

  /**
   * @type {Record<number, string>}
   */
  export let rankImages = {}; // Stores rank images for top 3 ranks

  export let isLoading = false;
  export let firstRowClass = undefined;

  // function to get the correct rank image if available
  /**
   * Get the rank image if available
   * @param {number} rank - The rank number
   * @returns {string | undefined} - The rank image URL or undefined if no image exists
   */
  function getRankImage(rank) {
    return rankImages[rank] || undefined; // Return undefined instead of null
  }
</script>

<div class="w-full bg-white rounded-3xl shadow-md" style="clip-path: inset(0 0 0 0 round 24px);">
  <!-- Header -->
  <div class="bg-[var(--theme-dark-blue)] sticky top-0 z-10 flex">
    {#each columns as column}
      <div
        class="px-2 md:px-4 py-3 text-left font-fredoka text-sm font-normal text-white capitalize"
        style="width: {column.width}"
      >
        {column.label}
      </div>
    {/each}
  </div>

  <!-- Content -->
  <div>
    {#if isLoading}
      {#each Array(5) as _, rowIndex}
        <div class="flex even:bg-gray-100 animate-pulse top-[40px] z-10">
          {#each columns as column}
            <div class="px-2 md:px-4 py-2" style="width: {column.width}">
              {#if column.type === "avatar"}
                <div class="inline-block w-6 h-6 md:w-8 md:h-8 bg-gray-300 rounded-full mr-2"></div>
              {/if}
              <div class="h-4 bg-gray-300 rounded w-2/3 md:w-3/4"></div>
            </div>
          {/each}
        </div>
      {/each}
    {:else}
      {#each data as row, i}
        <div class="flex {firstRowClass || ''} even:bg-gray-100">
          {#each columns as column}
            <div class="px-1 md:px-4 py-2 text-left flex items-center" style="width: {column.width}">
              <div class="flex items-center gap-2 w-full">
                {#if column.key === "rank"}
                  {#if getRankImage(row[column.key])}
                    <Image src={getRankImage(row[column.key])} className="w-7 h-7 md:w-9 md:h-9 ps-1" />
                  {:else}
                    <div
                      class={`w-7 h-7 md:h-9 md:w-9 ms-0.5 md:ms-0 text-white font-medium text-sm flex items-center justify-center clip-hexagon ${
                        row[column.key] === 1 ? "bg-blue-800" : "bg-blue-400"
                      }`}
                    >
                      {row[column.key]}
                    </div>
                  {/if}
                {:else if column.key === "name"}
                  <!-- Display player avatar and name -->
                  <Avatar t={row.profile_picture || IMAGES.SCHOOL_AVATAR} s={40} u={40} ml={0} mr={0} />
                  <div class="truncate font-fredoka font-medium text-sm md:text-base text-gray-600">
                    {row[column.key]}
                  </div>
                {:else if column.key === "total_points"}
                  <!-- Display coins earned icon -->
                  <Image src={IMAGES.COINS} width="20" height="20" />
                  <div class="truncate font-fredoka font-medium text-sm md:text-base text-gray-600">
                    {row[column.key]}
                  </div>
                {:else}
                  <!-- Fallback for any other columns -->
                  <div class="truncate font-fredoka font-medium text-sm md:text-base text-gray-600">
                    {row[column.key]}
                  </div>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      {/each}
    {/if}
  </div>
</div>
