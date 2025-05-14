<script>
  export let title = "Progress";
  export let data = [];
  export let columns = undefined;
  export let description = "";
  export let bgColor = "bg-blue-900";
  export let textColor = "text-white";
    $: console.log(data, "data here ")
  // Helper function to get value from data for a specific column

   $: formattedData = !columns && data && data.length > 0 && data[0].lesson_name ? 
    [
      { [data[0].lesson_name]: `${data[0].avg_completion}%` },
      { [`${data[0].completed_by} of ${data[0].total_players} have completed`]: "" }
    ] : 
    data;

  function getValue(item, column) {
    return column.key ? item[column.key] : item[column];
  }
</script>

<div class="rounded-[20px] overflow-hidden shadow-md  ">
  <!-- Header -->
  <div class="{bgColor} {textColor} p-4 font-bold text-center text-xl">
    {title}
  </div>

  <!-- Content -->
  <div class="p-6 bg-white">
    {#if columns}
      <!-- Multi-column layout with headers -->
      <div class="flex w-full mb-4">
        {#each columns as column}
          <div class="flex-1 font-semibold text-gray-700">
            {column.label || column}
          </div>
        {/each}
      </div>

      {#each data as item}
        <div class="flex w-full py-2 border-b border-gray-100 last:border-0">
          {#each columns as column}
            <div class="flex-1">
              {getValue(item, column)}
            </div>
          {/each}
        </div>
      {/each}
    {:else}
      <!-- Two-column layout without headers -->
      {#each formattedData as item, i}
        <div class="py-2 {i !== 0 ? 'pt-4' : ''}">
          <div class="flex flex-col">
            {#if i === 0 && description}
              <div>
                <div class="font-semibold text-gray-700">{Object.keys(item)[0]}</div>
                <div class="text-sm text-gray-500 mt-1">{description}</div>
              </div>
              <div class="mt-4 text-right font-bold text-gray-800">{Object.values(item)[0]}</div>
            {:else}
              <div class="flex justify-between items-center">
                <div class="font-semibold text-gray-700">{Object.keys(item)[0]}</div>
                <div class="font-bold text-gray-800">{Object.values(item)[0]}</div>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>