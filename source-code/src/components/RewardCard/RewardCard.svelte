<script>
  import Button from "../Button/Button.svelte";

  export let data = {
    title: "",
    image: "",
    primary_text: "",
    cost: 0,
    quantity: 0,
  };

  // Adjust image path to use local assets
  let imagePath =
    data.image && data.image.includes("\\images\\rewards\\")
      ? data.image.replace(
          "\\images\\rewards\\",
          "/src/lib/assets/images/rewards/",
        )
      : data.image || "";

  export let badgeIcon = ""; // Badge icon path
  export let buttonLabel = "How to Earn?"; // Badge icon path
  export let isLoading = false;

  export let onButtonClick = (label, data) => {}; // Callback function
</script>

<div class="flex justify-center mb-5">
  <div
    class="bg-white rounded-[20px] card-button-shadow w-80 text-center mx-auto p-2 h-auto"
  >
    {#if isLoading}
      <div class="animate-pulse">
        <div class="w-full h-40 bg-gray-200 rounded-3xl"></div>
        <div class="h-6 bg-gray-200 rounded w-3/4 mx-auto my-2"></div>
        <div class="flex justify-around items-center my-3 gap-4 h-[45px]">
          <div class="h-6 w-12 bg-gray-200 rounded"></div>
          <div class="h-6 w-12 bg-gray-200 rounded"></div>
        </div>
        <div class="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
      </div>
    {:else}
      <div class="relative w-full h-64 overflow-hidden rounded-2xl">
        <img
          src={imagePath}
          alt={data.title}
          class="w-full h-auto rounded-2xl"
        />
        {#if badgeIcon}
          <img
            src={badgeIcon}
            alt="Badge"
            class="absolute bottom-10 right-2 w-20 h-18"
          />
        {/if}
        <div
          class="absolute bottom-0 left-0 w-full bg-gray-300 text-black text-sm font-semibold p-2 text-center"
        >
          {data.title}
        </div>
      </div>
      <div class="p-3">
        {#if data.primary_text}
          <div class="flex justify-around items-center my-3 gap-4 h-[45px]">
            <p class="text-gray-700 text-sm font-semibold">
              {data.primary_text}
            </p>
          </div>
        {:else}
          <div class="flex justify-around items-center my-3 gap-4 h-[45px]">
            <span class="text-yellow-500 font-bold text-xl"
              >&#x1F4B0; {data.cost}</span
            >
            <span class="text-red-500 text-xl">{data.quantity} left</span>
          </div>
        {/if}
        <Button
          label={buttonLabel}
          type="3d-secondary"
          customClass="bg-blue-500 text-white w-full mt-2 p-4 rounded-xl text-lg md:text-[22px]"
          onClick={() => {
            onButtonClick(buttonLabel, data);
          }}
        />
      </div>
    {/if}
  </div>
</div>
