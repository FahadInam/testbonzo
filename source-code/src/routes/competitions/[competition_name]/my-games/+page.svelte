<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { onMount } from "svelte";
  import PageHeading from "../../../../components/PageHeading/PageHeading.svelte";
  import { t } from "../../../../stores/language.store";
  import { getMyGames } from "../../../../data-actions/competitions/competitions.da";
  import LessonListing from "../../../../components/LessonListing/lessonListing.svelte";
  import { lessonStore } from "../../../../stores/lesson.store";
  import { get } from "svelte/store";
  import { RemoveDuplicates } from "$lib/utils";
  import NoDataFound from "../../../../components/NoDataFound/NoDataFound.svelte";
  import GameListingSkeleton from "../../../../components/Skeleton/GameListingSkeleton.svelte";

  /**
   * @type { any[]}
   */
  let list = [];
  /**
   * @type { any[]}
   */
  let games = [];
  let isLoading = true;

  onMount(async () => {
    const data = await getMyGames();
    list = data?.data.data ?? [];
    games = RemoveDuplicates(list, "skill");

    isLoading = false;
  });
</script>

<svelte:head>
  <title>{$t("my_games")}</title>
</svelte:head>

<!-- Responsive Container -->
<div class="flex justify-center w-full px-4 sm:px-6 md:px-8 lg:px-10">
  <div class="w-full max-w-screen-lg space-y-6">
    <!--heading section-->
    <div class="w-full">
      <PageHeading
        icon={IMAGES.TOPICS_ICON}
        title={"my_games"}
        imageClass="w-8 h-8 sm:w-10 sm:h-10"
      />
    </div>

    <!-- game cards listing -->
    <div class="w-full">
      {#if isLoading}
        <GameListingSkeleton />
      {:else if list.length === 0}
        <NoDataFound />
      {:else}
        {#each games as game, index}
          <LessonListing item={game} {list} {index} />
        {/each}
      {/if}
    </div>
  </div>
</div>
