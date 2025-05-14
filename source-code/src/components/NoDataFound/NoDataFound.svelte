<script>
  import { IMAGES } from "$lib/assets/images/images.constants";

  export let noDataMsg = "";
  export let backgroundColor = "bg-black/30";
  export let textColor = "text-white";
</script>

<div class="w-full flex justify-center items-center">
  <div class={`w-full p-6 rounded-2xl shadow-lg ${backgroundColor}`}>
    <div class="flex justify-center mb-4">
      <img
        src={noDataMsg === "ALL_GAMES_PLAYED"
          ? IMAGES.ALL_GAMES_COMPLETED
          : IMAGES.NO_DATA_FOUND_IMAGE}
        alt="Game-based learning"
        class="w-32 sm:w-48 md:w-64"
      />
    </div>
    <p class={`text-center text-lg font-semibold ${textColor}`}>
      {noDataMsg || "No Data Found"}
    </p>
  </div>
</div>
