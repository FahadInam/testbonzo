<script>
  import ListingSkeleton from "./ListingSkeleton.svelte";

  // any script here
  const cards = Array(4).fill(0); // Creates an array with 4 items
  export let buttonsCount = 3;
  export let isCompetitionLevel = false;
</script>

<div class="flex justify-center w-full">
  <div class="w-full max-w-screen-xl space-y-6">
    <div class="bg-white rounded-[20px] p-6 md:p-8">
      <div
        class="flex justify-around items-center flex-col md:flex-row md:gap-8"
      >
        <div class="flex md:flex-col items-center md:items-start md:gap-6">
          <div
            class="bg-gray-200 rounded-full w-24 h-24 animate-pulse m-auto"
          ></div>

          <div class="mt-4 md:mt-0 text-center">
            <div
              class="bg-gray-200 h-6 w-32 rounded-md animate-pulse mx-auto"
            ></div>
            <div
              class="bg-gray-200 h-4 w-24 rounded-md mt-4 animate-pulse mx-auto"
            ></div>
          </div>
        </div>
        {#if !isCompetitionLevel}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each cards as _}
              <div class="border border-gray-100 rounded-lg p-4 md:p-6">
                <div class="flex items-center">
                  <div
                    class="bg-gray-200 rounded-full w-12 h-12 animate-pulse"
                  ></div>
                  <div class="ml-4">
                    <div
                      class="bg-gray-200 h-8 w-12 rounded-md animate-pulse"
                    ></div>
                    <div
                      class="bg-gray-200 h-4 w-32 rounded-md mt-2 animate-pulse"
                    ></div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
      <div class="mt-10">
        <div
          class="bg-gray-100 flex items-center gap-4 p-3 max-w-5xl mx-auto h-16 mb-12 rounded-md mt-2"
        >
          {#each Array(buttonsCount) as _, i}
            <div
              class="bg-gray-300/80 h-full w-32 rounded-lg animate-pulse"
            ></div>
          {/each}
        </div>
        <ListingSkeleton />
      </div>
    </div>
  </div>
</div>
