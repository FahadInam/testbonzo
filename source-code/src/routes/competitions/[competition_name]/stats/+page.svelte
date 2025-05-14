<script>
  // @ts-nocheck
  import { onDestroy, onMount } from "svelte";
  import { getText, t } from "../../../../stores/language.store";

  import Stats from "../../../../components/Stats/Stats.svelte";
  import { sidebarStore } from "../../../../stores/sidebar.store";
  import { appbarStore } from "../../../../stores/appbar.store";
  import { setBackUrl } from "../../../../stores/navigation.store";
  import SkeletonStats from "../../../../components/Stats/SkeletonStats.svelte";
  import { calculateStats, getUserStats } from "../../../../data-actions/stats/stats.da";
  import { sideBarAndAppBarSettings } from "$lib/utils";

  /**
   * @type { any[]}
   */
  let userStats = [];
  /**
   * @type { any[]}
   */
  let subjectStats = [];
  let subject = "";
  let isLoading = true;
  onMount(async () => {
    sideBarAndAppBarSettings(false, "back", "{competitionHome}/home");

    // Fetch user stats
    const data = await getUserStats(subject);
    userStats = data?.data.global ?? [];
    subjectStats = data?.data.subjects ?? [];
    isLoading = false;
  });

    // Reset sidebar and appbar when navigating away
  onDestroy(() => {
    sideBarAndAppBarSettings(true, "competitions", "/competitions");
  });

</script>

<svelte:head>
  <title>{$t("stats")}</title>
</svelte:head>

<div class="flex w-full justify-center">
  {#if isLoading}
    <SkeletonStats />
  {:else}
    <div class="w-full text-center space-y-4">
      {#if userStats.length > 0}
        <div class="w-full overflow-x-hidden mt-5">
          <Stats Data={calculateStats(userStats[0])} title={$t("competition_summary")} />
        </div>
      {/if}
      {#if subjectStats.length > 0}
        {#each subjectStats as stat}
          <div class="w-full overflow-x-hidden mt-5">
            <Stats Data={calculateStats(stat)} title={stat.subject} />
          </div>
        {/each}
      {/if}
    </div>
  {/if}
</div>
