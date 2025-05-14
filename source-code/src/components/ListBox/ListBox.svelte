<script>
  import Avatar from "../Avatar/Avatar.svelte";
  import { t } from "../../stores/language.store";
  import Image from "../Image/Image.svelte";
  import { onDestroy, onMount } from "svelte";
  import SkeletonList from "./SkeletonList.svelte";

  /**
   * @type { any[]}
   */
  export let data = [];

  export let title = "Recently Played";
  export let isLoading = false;
  export let skeletonCount = 6;
  /**
   * @param {any} game
   */
  export let callback = (game) => {};
  export let icon = "";

  /**
   * @param {any} game
   * @param {any} type
   */
  const handleAction = (game, type) => {
    callback(game, type);
  };

  // Declare isMobile as a reactive store so UI updates properly
  export let isMobile = false;
  $: isMobile = window.innerWidth < 768;

  // Function to check screen size dynamically
  function checkScreenSize() {
    isMobile = window.innerWidth < 768;
  }

  /**
   * Returns a background CSS class based on the index and screen size.
   * Alternates row background colors differently for mobile and desktop views.
   *
   * @param {number} index - The index of the item (used for alternating backgrounds).
   * @returns {string} The corresponding background CSS class.
   */
  function getBgClass(index) {
    if (isMobile) {
      return index % 2 === 0 ? "bg-gray-100 hover:bg-gray-200" : "bg-white hover:bg-gray-100";
    } else {
      return index % 4 === 0 || index % 4 === 1
        ? "bg-gray-100 hover:bg-gray-200"
        : "bg-white hover:bg-gray-100";
    }
  }

  // Listen for screen resize
  onMount(() => {
    checkScreenSize();
    window.addEventListener("resize", () => {
      checkScreenSize();
    });
  });
</script>

<div class="max-w-5xl mx-auto bg-white rounded-[20px] shadow-lg overflow-hidden opacity-100">
  <div class="bg-blue-900 text-white py-2 flex justify-center items-center gap-4">
    <Image src={icon} alt="Section Icon" className="w-11 h-12" />
    <h2 class="text-xl font-semibold">{$t(title)}</h2>
  </div>

  <div class="p-4 max-h-[400px] overflow-y-auto">
    {#if isLoading}
      <SkeletonList {skeletonCount} />
    {:else}
      <div
        class={`grid gap-4 ${data.length > 0 && data[0].two_column_split ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}
      >
        {#each data as game, index}
          <div
            class="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-300 {getBgClass(
              index
            )}"
            role="button"
            tabindex="0"
            on:click={() => handleAction(game, title)}
            on:keydown={(e) => (e.key === "Enter" || e.key === " ") && handleAction(game, title)}
          >
            {#if game.profile_picture}
              <Avatar t={game.profile_picture} s={50} u={50} ml={0} mr={0} />
            {:else}
              <span>{index + 1}</span>
            {/if}

            <!-- <Avatar t={game.profile_picture} s={40} u={40} ml={0} mr={0} /> -->

            <div class="flex flex-col items-start text-gray-800 overflow-hidden">
              <span class="font-medium text-base font-fredoka truncate w-full text-left"
                >{game.primaryText ?? game.mode}</span
              >
              <span class="text-sm text-gray-500 font-fredoka font-light">{game.result}</span>
              <span class="text-sm text-gray-500 font-fredoka font-light">{game.secondaryText}</span
              >
            </div>

            <div class="ml-auto flex items-center gap-2">
              {#if game.dualAction}
                <button class="" on:click|stopPropagation={() => handleAction(game, title)}>
                  <Image src={game.badgeIcon} className={game.badgeClass} />
                </button>
                <button class="" on:click|stopPropagation={() => handleAction(game, title)}>
                  <Image src={game.badgeIcon2} className={game.badgeClass} />
                </button>
              {:else}
                <button class="" on:click|stopPropagation={() => handleAction(game, title)}>
                  <Image src={game.badgeIcon} className={game.badgeClass} />
                </button>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
