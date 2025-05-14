<script>
  import Avatar from "../Avatar/Avatar.svelte";
  import { t } from "../../stores/language.store";
  import Image from "../Image/Image.svelte";
  import Button from "../Button/Button.svelte";

  /**
   * @type {any[]}
   */
  export let data = [];
  export let title = "Recently Played";
  export let isLoading = false;
  export let skeletonCount = 6;
  export let callback = (
    /** @type {{}} */ user,
    /** @type {number} */ mode
  ) => {};
  export let icon = "";
  export let Mode = 0;

  export let isLocked = false;

  let selected_user = {};

  const handleAction = (/** @type {{}} */ Opponent) => {
    selected_user = Opponent;
  };

  const StartAction = (/** @type {number} */ selected_mode) => {
    callback(selected_user, selected_mode);
  };
</script>

<div
  class="bg-white rounded-[20px] shadow-lg overflow-hidden flex flex-col min-h-[500px] w-full max-w-[500px] lg:w-[48%] xl:w-[500px]"
>
  <div
    class="bg-blue-900 text-white py-2 md:py-3 flex justify-center items-center gap-4"
  >
    <Image src={icon} width="40" height="40" />
    <h2 class="text-xl font-semibold">{$t(title)}</h2>
  </div>

  <div class="p-4 flex-col flex-grow h-[400px] overflow-y-auto">
    {#if isLoading}
      <div class="flex flex-wrap justify-center gap-4">
        {#each Array(skeletonCount) as _}
          <div
            class="flex flex-col items-center gap-3 p-4 bg-white rounded-xl shadow-md animate-pulse w-[30%] max-w-[250px] min-w-[150px]"
          >
            <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div class="flex flex-col items-center space-y-2 w-full">
              <div class="w-3/4 h-4 bg-gray-200 rounded"></div>
              <div class="w-1/2 h-3 bg-gray-200 rounded"></div>
            </div>
            <div class="w-12 h-6 bg-gray-200 rounded-full"></div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="flex flex-wrap justify-center items-center gap-4 h-full">
        {#each data as user}
          <div
            class={`flex flex-col items-center justify-center p-4 rounded-xl w-[28%] max-w-[200px] min-w-[120px] transition-all duration-300
            ${isLocked ? "bg-gray-200 cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"}`}
            role="button"
            tabindex={isLocked ? -1 : 0}
            on:click={() => !isLocked && handleAction(user)}
            on:keydown={(e) =>
              !isLocked && e.key === "Enter" && handleAction(user)}
          >
            <div class="flex flex-col items-center w-full mt-2">
              <span
                class="font-medium text-sm truncate w-full text-center text-gray-600"></span
              >
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
  <div class="bg-gray-100 p-4 flex justify-center mt-auto w-full">
    <Button
      label={$t("start")}
      size="medium"
      type="3d-primary"
      customClass="w-[130px]"
      onClick={() => {
        StartAction(Mode);
      }}
    />
  </div>
</div>
