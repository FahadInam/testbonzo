<script>
  const skeletonItems = Array(3).fill(0);
</script>

<div class="animate-pulse space-y-8 p-4 flex flex-col w-full">
  {#each skeletonItems as _, index}
    <div
      class="flex bg-gray-200 mx-auto rounded-2xl w-full h-70 max-w-[400px] md:max-w-[2000px] md:w-[640px] md:h-[230px] lg:w-[912px] lg:h-[300px]"
    ></div>
  {/each}
</div>
