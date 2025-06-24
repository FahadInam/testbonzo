<script>
  import Avatar from "../Avatar/Avatar.svelte";
  import { t } from "../../stores/language.store";
  import Image from "../Image/Image.svelte";
  import CardBanner from "./CardBanner.svelte";
  import Button from "../Button/Button.svelte";
  import AllPlayerChallenged from "./AllPlayerChallenged.svelte";
  import { IsGuestMode } from "$lib/utils";
  import { userStore } from "../../stores/user.store";

  /**
   * @type {any[]}
   */
  export let data = [];
  export let title = "Recently Played";
  // let isLoading = true;
  export let isLoading = false;
  export let skeletonCount = 9;
  export let callback = (/** @type {{}} */ user, /** @type {number} */ mode) => {};
  export let icon = "";
  export let Mode = 0;

  export let isLocked = false;

  let selected_user = {};
  let isGuestMode = false;
  const handleAction = (/** @type {{}} */ Opponent) => {
    selected_user = Opponent;
    console.log(selected_user);
  };

  const StartAction = (/** @type {number} */ selected_mode) => {
    callback(selected_user, selected_mode);
  };

  $: if ($userStore) {
    isGuestMode = IsGuestMode();
  }
</script>

<div
  class={`bg-white rounded-[20px] shadow-lg overflow-hidden flex flex-col w-full max-w-[510px] lg:w-[48%] xl:w-[500px] ${isGuestMode ? "min-h-[400px]" : "min-h-[500px]"}`}
>
  <div class="bg-blue-900 text-white py-2 md:py-3 flex justify-center items-center gap-4">
    <Image src={icon} width="40" height="40" />
    <h2 class="text-xl font-semibold">{$t(title)}</h2>
  </div>

  <!-- 3x banner-->
  {#if Mode === 1}
    <div class="w-full">
      <CardBanner />
    </div>
  {/if}

  <div class={`p-4 flex-col flex-grow  overflow-y-auto ${isGuestMode ? "h-[200px]" : "h-[300px]"}`}>
    {#if isLoading}
      {#if Mode === 0}
        <div class="flex flex-wrap justify-center items-center gap-4 h-full">
          <div
            class="flex flex-col justify-center items-center gap-3 p-4 bg-white animate-pulse w-[30%] max-w-[250px] min-w-[150px]"
          >
            <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div class="flex flex-col items-center space-y-2 w-full">
              <div class="w-3/4 h-4 bg-gray-200 rounded"></div>
              <div class="w-1/2 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      {:else}
        <div class="flex flex-wrap justify-center gap-4">
          {#each Array(skeletonCount) as _}
            <div
              class="flex flex-col items-center justify-center gap-3 p-4 bg-white animate-pulse w-[28%] max-w-[200px] min-w-[120px]"
            >
              <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div class="flex flex-col items-center space-y-2 w-full">
                <div class="w-3/4 h-4 bg-gray-200 rounded"></div>
                <div class="w-1/2 h-3 bg-gray-200 rounded"></div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    {:else}
      {#if isLocked}
        <AllPlayerChallenged />
      {/if}
      <div class="flex flex-wrap justify-center items-center gap-4 h-full">
        {#each data as user}
          <div
            class={`flex flex-col items-center justify-center p-4 rounded-xl w-[28%] max-w-[200px] min-w-[120px] transition-all duration-300
    ${isLocked ? "bg-gray-200 cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-gray-100 focus:outline-none focus:bg-gray-200"}`}
            role="button"
            tabindex={isLocked ? -1 : 0}
            on:click={() => !isLocked && handleAction(user)}
            on:keydown={(e) => !isLocked && e.key === "Enter" && handleAction(user)}
          >
            <Avatar t={user.profile_picture} s={70} u={70} ml="auto" mr="auto" />
            {#if !user.is_guest_mode}
              <div class="flex flex-col items-center w-full mt-2">
                <span class="font-medium text-sm truncate w-full text-center text-gray-600" title={user.name}
                  >{user.name}</span
                >
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
  {#if Mode === 1}
    <div class="h-2"></div>
  {/if}
  <div class="bg-gray-100 p-4 flex justify-center mt-auto w-full">
    {#if isLoading}
      <div class="w-1/4 h-10 bg-gray-200 rounded animate-pulse"></div>
    {:else}
      <Button
        label={$t("start")}
        size="medium"
        type={Mode === 0 ? "3d-primary" : "3d-secondary"}
        customClass="w-[170px] text-lg md:text-[22px]"
        onClick={() => {
          StartAction(Mode);
        }}
      />
    {/if}
  </div>
</div>
