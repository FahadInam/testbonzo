<script>
  import { onDestroy, onMount } from "svelte";
  import { getText, t } from "../../../../stores/language.store";
  import { getCompetitionLeaderBoard } from "../../../../data-actions/competitions/competitions.da";
  import Table from "../../../../components/Table/Table.svelte";
  import LeaderboardCard from "../../../../components/LeaderboardCard/LeaderboardCard.svelte";
  import SelectBox from "../../../../components/SelectBox/SelectBox.svelte";
  import Image from "../../../../components/Image/Image.svelte";
  import { getTopCandidates } from "../../../../data-actions/leaderboards/leaderboards.da";
  import { IMAGES } from "$lib/assets/images/images.constants";
  import PageHeading from "../../../../components/PageHeading/PageHeading.svelte";
  import LeaderboardSkeleton from "../../../../components/Skeleton/LeaderboardSkeleton.svelte";

  /**
   * @type { any[]}
   */
  let users = [];
  /**
   * @type { any[]}
   */
  let currentUser = [];
  /**
   * @type { any[]}
   */
  let topCandidates = [];
  /**
   * @type {any[]}
   */
  let mergedUsers = [];
  let time_type = 0;
  let is_school_based = 0;
  let isLoading = true;
  /**
   * @type {number | undefined}
   */
  let interval;

  let LeaderboardFilters = [
    { value: "0", label: $t("all_time_leaderboard") },
    { value: "1", label: $t("daily") },
    { value: "2", label: $t("weekly") },
    { value: "3", label: $t("monthly") },
  ];

  // rank images
  let rankImages = {
    1: IMAGES.POSITION_1_ICON,
    2: IMAGES.POSITION_2_ICON,
    3: IMAGES.POSITION_3_ICON,
  };

  async function fetchLeaderboard() {
    isLoading = true;
    clearInterval(interval);

    const data = await getCompetitionLeaderBoard(time_type, is_school_based);

    if (data?.data?.users?.length > 0) {
      users = data.data.users;
      currentUser = data.data.current_user;
      if (currentUser != null) {
        mergedUsers = [currentUser, ...users];
      } else {
        mergedUsers = [...users];
      }
      topCandidates = await getTopCandidates(currentUser, users);
    }

    // Set interval to fetch leaderboard every 1 minute
    interval = setInterval(fetchLeaderboard, 60000);

    isLoading = false;
  }

  onMount(() => {
    fetchLeaderboard(); // Initial fetch

    return () => clearInterval(interval); // Cleanup on unmount
  });

  onDestroy(() => clearInterval(interval)); // Ensure cleanup
</script>

<svelte:head>
  <title>{$t("leaderboard")}</title>
</svelte:head>

<!-- Responsive Container -->
<div class="flex justify-center w-full px-4 sm:px-6 md:px-8 lg:px-10">
  <div class="w-full max-w-screen-lg space-y-6">
    <!--heading section (with dropdown)-->
    <div class="w-full relative">
      <div
        class="flex flex-col sm:flex-row sm:justify-between items-center w-full gap-4"
      >
        <!-- Centered Title & Image Wrapper -->
        <div
          class="flex items-center gap-3 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2"
        >
          <PageHeading
            icon={IMAGES.LEADERBOARD_ICON}
            title={"leaderboard"}
            imageClass="w-9 h-11 sm:w-13 sm:h-11"
          />
        </div>

        <!-- Dropdown Positioned Responsively -->
        <div class="w-full sm:w-auto flex justify-center sm:ml-auto">
          <SelectBox
            customClass="w-36"
            options={LeaderboardFilters}
            onSelect={async (data) => {
              time_type = parseInt(data, 10);
              fetchLeaderboard();
            }}
          />
        </div>
      </div>
    </div>

    {#if isLoading}
      <LeaderboardSkeleton />
    {:else}
      <!-- Leaderboard Top 3 -->
      {#if topCandidates.length > 0}
        <div class="flex justify-evenly items-end mt-8 md:mt-24 mb-4 md:mb-12">
          {#each [1, 0, 2] as index}
            <div
              class={`leaderboard-card relative flex flex-col items-center w-1/3 sm:w-auto
    ${
      index === 0
        ? "max-w-[240px] scale-125 xl:max-w-[220px] xl:scale-115 lg:max-w-[200px] lg:scale-110 md:max-w-[160px] md:scale-90 sm:max-w-[110px] sm:scale-65 max-[640px]:max-w-[80px] max-[640px]:scale-70"
        : "max-w-[200px] scale-100 xl:max-w-[180px] xl:scale-95 lg:max-w-[160px] lg:scale-90 md:max-w-[140px] md:scale-80 sm:max-w-[90px] sm:scale-60 max-[640px]:max-w-[70px] max-[640px]:scale-55"
    }`}
            >
              <LeaderboardCard {...topCandidates?.[index] ?? {}} {isLoading} />
            </div>
          {/each}
        </div>
      {/if}

      <!-- Users Table -->
      {#if users.length > 0}
        <div class="w-full mb-20 md:mb-10">
          <Table
            columns={[
              { label: $t("rank"), key: "rank", type: "text", width: "10%" },
              {
                label: $t("players"),
                key: "name",
                type: "avatar",
                width: "70%",
              },
              {
                label: $t("coins_earned"),
                key: "total_points",
                type: "icon",
                width: "20%",
              },
            ]}
            data={mergedUsers}
            {isLoading}
            {rankImages}
          />
        </div>
      {/if}
    {/if}
  </div>
</div>
