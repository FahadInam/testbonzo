<div class="w-full text-center space-y-4 mt-5">
  {#each Array(3) as _, index}
    <div class="w-full text-center space-y-4 mt-5">
      <div class="rounded-2xl mb-8 px-4 max-w-[600px] md:max-w-[960px] mx-auto">
        <div class="p-6 rounded-2xl bg-gray-200 text-center text-white">
          <div class="animate-pulse">
            <div class="h-2 mt-2 flex items-center justify-center">
              <div class="h-10 w-10 bg-gray-400/50 rounded-full mr-2"></div>
              <div class="h-8 md:w-64 w-52 bg-gray-400/50 rounded-xl"></div>
            </div>
            <div
              class="flex flex-col items-center md:flex-row md:items-start md:mt-16 mt-12 justify-evenly"
            >
              <div class="flex md:mb-0 mb-8 flex-col items-center">
                <div class="w-[200px] h-8 bg-gray-400/50 rounded-full"></div>
                <div class="w-[200px] my-5 h-28 bg-gray-400/50 rounded-xl"></div>
                <div class="w-[140px] h-16 bg-gray-400/50 rounded-xl"></div>
              </div>
              <div>
                {#each Array(5) as _, i}
                  <div class="w-[230px] h-10 bg-gray-400/50 rounded-full mb-3.5"></div>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
