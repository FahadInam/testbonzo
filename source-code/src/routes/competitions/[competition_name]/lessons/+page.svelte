<script>
  import { t } from "../../../../stores/language.store";
  import PageHeading from "../../../../components/PageHeading/PageHeading.svelte";
  import { getUserLessons } from "../../../../data-actions/competitions/competitions.da";
  import { onMount } from "svelte";
  import { RemoveDuplicates } from "$lib/utils";
  import Listings from "../../../../components/Listings/Listings.svelte";
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { gotoURL } from "$lib/navigation.service";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { lessonStore } from "../../../../stores/lesson.store";
  import { getItemsByTopic } from "../../../../data-actions/lessons/lesson.da";
  import ListingSkeleton from "../../../../components/Skeleton/ListingSkeleton.svelte";

  /**
   * @type { any[]}
   */
  let lessons = [];
  /**
   * @type { any[]}
   */
  let topics = [];
  let isLoading = true;
  /**
   * @type { any[]}
   */
  let sortedGames = [];

  onMount(async () => {
    const data = await getUserLessons();
    lessons = data?.data ?? [];
    topics = RemoveDuplicates(lessons, "topic");
    isLoading = false;
  });

  /**
   * @param {any} data
   */
  function ShowGames(data) {
    sortedGames = getItemsByTopic(lessons, data.topicName);
    lessonStore.set(sortedGames);

    if (browser) {
      goto(page.url.pathname + "/listing");
    }
  }
</script>

<svelte:head>
  <title>{$t("lessons")}</title>
</svelte:head>

<!-- Responsive Container -->
<div class="flex justify-center w-full px-4 sm:px-6 md:px-8 lg:px-10">
  <div class="w-full max-w-screen-lg space-y-6">
    <!--heading section-->
    <div class="w-full">
      <PageHeading
        icon={IMAGES.LESSON_IMAGE}
        title={"lessons"}
        imageClass="w-9 h-11 sm:w-13 sm:h-9"
      />
    </div>

    {#if isLoading}
      <ListingSkeleton />
    {:else}
      <!--lesson listing section-->
      {#if topics.length > 0}
        <Listings
          listings={topics}
          title="subjects"
          type={"is_lesson_subjects"}
          {isLoading}
          icon={IMAGES.TOPICS_LIST_ICON}
          onItemClick={ShowGames}
        />
      {/if}
    {/if}
  </div>
</div>
