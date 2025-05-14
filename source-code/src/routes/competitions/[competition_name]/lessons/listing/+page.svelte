<script>
  import { onDestroy, onMount } from "svelte";
  import PageHeading from "../../../../../components/PageHeading/PageHeading.svelte";
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { t } from "../../../../../stores/language.store";
  import LessonListing from "../../../../../components/LessonListing/lessonListing.svelte";
  import { lessonStore } from "../../../../../stores/lesson.store";
  import { get } from "svelte/store";
  import { RemoveDuplicates, sideBarAndAppBarSettings } from "$lib/utils";

  /**
   * @type { any[]}
   */
  let list = [];
  /**
   * @type { any[]}
   */
  let games = [];
  let isLoading = false;

  onMount(async () => {
    sideBarAndAppBarSettings(false, "topic", "{competitionHome}");
    list = get(lessonStore);
    games = RemoveDuplicates(list, "skill");
  });

  // Reset sidebar and appbar when navigating away
  onDestroy(() => {
    sideBarAndAppBarSettings(true, "competitions", "/competitions");
  });

  /**
   * @param {any} data
   */
  function PlayGame(data) {
    console.log("ShowGames", data);
  }
</script>

<svelte:head>
  <title>{$t("lessons_listing")}</title>
</svelte:head>

<PageHeading
  icon={IMAGES.LESSON_IMAGE}
  title={"lessons_listing"}
  imageClass="w-9 h-11 sm:w-13 sm:h-9"
/>

{#if isLoading}
  <p>Loading...</p>
{:else}
  {#each games as game, index}
    <LessonListing item={game} {list} {index} />
  {/each}
{/if}
