<script>
  export let itemsCount = 5;
</script>

<div
  class="max-w-5xl mx-auto bg-white rounded-[20px] overflow-hidden shadow-lg mb-10"
>
  <div
    class="bg-blue-900 text-white py-2 flex justify-center items-center gap-4"
  >
    <div class="w-11 h-11 rounded-3xl bg-gray-200 animate-pulse"></div>
    <div class="w-44 h-8 rounded-3xl bg-gray-200 animate-pulse"></div>
  </div>

  <div class="p-4">
    <div class="">
      {#each Array(itemsCount) as _, i}
        <div
          class="flex items-center gap-3 p-2 px-4 odd:bg-gray-100 mb-2 rounded-xl animate-pulse"
        >
          <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div class="w-3/4 h-4 bg-gray-200 rounded"></div>
          <div class="w-6 h-6 bg-gray-200 rounded-xl ml-auto"></div>
        </div>
      {/each}
    </div>
  </div>
</div>
