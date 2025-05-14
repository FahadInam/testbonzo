<script>
  export let number = 0;
  export let title = "Total Games";
  export let icon = ""; // This will be a URL/path to image

</script>

<div class="w-full max-w-md bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center">
  <div class="w-12 h-12 text-gray-600 mb-4">
    <img src={icon} alt={title} class="w-full h-full object-contain" />
  </div>
  
  <div class="text-4xl font-semibold text-gray-700">
    {number ?? 0}
  </div>
  
  <div class="text-lg text-gray-500 mt-1">
    {title}
  </div>
</div>