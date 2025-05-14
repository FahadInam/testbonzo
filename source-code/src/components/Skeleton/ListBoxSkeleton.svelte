<script>
  /**
   * Number of skeleton items to display.
   * Adjust as needed (e.g., 4, 6, 8).
   */
  export let itemsCount = 6;
</script>

<!-- Main container with a blue header and white body -->
<div
  class="max-w-5xl mx-auto bg-white rounded-[20px] overflow-hidden shadow-lg mb-10"
>
  <!-- Header (blue) -->
  <div
    class="bg-blue-900 text-white py-2 flex justify-center items-center gap-4"
  >
    <!-- Icon (replace with your own or an <img> tag) -->
    <!-- <Image src={icon} alt="Section Icon" className="w-11 h-12" />
    <h2 class="text-lg font-bold">Recently Played</h2> -->
    <div class="w-11 h-11 rounded-3xl bg-gray-200 animate-pulse"></div>
    <div class="w-44 h-8 rounded-3xl bg-gray-200 animate-pulse"></div>
  </div>

  <!-- Body with scroll if more than ~4 rows (400px) -->
  <div class="p-4 max-h-[400px] overflow-y-auto">
    <!-- Responsive 2-column grid on md+ screens -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each Array(itemsCount) as _, i}
        <!-- Skeleton card -->
        <div
          class="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md
                 hover:shadow-lg transition-shadow animate-pulse"
        >
          <!-- Avatar placeholder -->
          <div class="w-12 h-12 bg-gray-200 rounded-full"></div>

          <!-- Text placeholders -->
          <div class="flex flex-col flex-1 space-y-2">
            <div class="w-3/4 h-4 bg-gray-200 rounded"></div>
            <div class="w-1/2 h-3 bg-gray-200 rounded"></div>
          </div>

          <!-- Badge placeholder -->
          <div class="w-12 h-6 bg-gray-200 rounded-full ml-auto"></div>
        </div>
      {/each}
    </div>
  </div>
</div>
