<script>
  export let label = "";
  export let value;
</script>

<div
  class="flex font-poppins w-full text-center font-medium justify-between md:max-w-[330px] max-w-[300px] bg-black/50 bg-opacity-50 rounded-full text-sm md:text-base mb-3"
>
  <span
    class="md:w-[230px] w-[210px] rounded-full md:px-4 px-3 py-2 mr-2 bg-black"
    >{label}</span
  >
  <span class="pr-6 md:pl-4 pl-3 py-2 md:min-w-20 min-w-16 rounded-full"
    >{value}</span
  >
</div>
