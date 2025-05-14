<script>
  import { t } from "../../stores/language.store";

  export let icon = ""; // Add default values
  export let value = 0;
  export let label = "";
  export let alt = "";
</script>

<div class="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-4">
  <div class="flex items-center gap-2 ml-0 md:ml-2 lg:ml-5 mb-2 md:mb-1">
    <img src={icon} {alt} class="w-8 h-8 md:w-10 md:h-10" />
    <span class="text-xl md:text-3xl font-semibold pl-0 md:pl-1 lg:pl-2">
      {value}
    </span>
  </div>
  <p
    class="text-gray-500 font-normal text-[11px] sm:text-sm md:text-sm lg:text-base mt-1 ml-0 md:ml-14 lg:ml-19"
  >
    {$t(label) || label}
  </p>
</div>
