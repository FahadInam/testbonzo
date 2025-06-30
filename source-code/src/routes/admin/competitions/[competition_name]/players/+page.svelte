<script>
  import { onDestroy, onMount } from "svelte";
  import { getText, t } from "../../../../../stores/language.store";
  import { getCompetitionLeaderBoard, mapGrades } from "../../../../../data-actions/competitions/competitions.da";
  import Table from "../../../../../components/Table/Table.svelte";
  import LeaderboardCard from "../../../../../components/LeaderboardCard/LeaderboardCard.svelte";
  import SelectBox from "../../../../../components/SelectBox/SelectBox.svelte";
  import Image from "../../../../../components/Image/Image.svelte";
  import { getTopCandidates } from "../../../../../data-actions/leaderboards/leaderboards.da";
  import { IMAGES } from "$lib/assets/images/images.constants";
  import PageHeading from "../../../../../components/PageHeading/PageHeading.svelte";
  import {
    getInstitutionLeaderBoard,
    getInstitutionSchoolLeaderBoard,
  } from "../../../../../data-actions/admin/admin.competition.da";
  import TabSwitch from "../../../../../components/TabSwitcher/TabSwitch.svelte";
  import { gradesStore } from "../../../../../stores/grades.store";
  import { afterNavigate } from "$app/navigation";
  import { setBackUrl } from "../../../../../stores/navigation.store";
  import { appbarStore } from "../../../../../stores/appbar.store";

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
  let isMobile = false;
  /**
   * @type {number | undefined}
   */
  let interval;
  let selectedTab = 0;
  let gradeOptions = [];
  let selectedGrade = null;
  let LeaderboardFilters = [
    { value: "0", label: $t("all_time_leaderboard") },
    { value: "1", label: $t("daily") },
    { value: "2", label: $t("weekly") },
    { value: "3", label: $t("monthly") },
  ];

  // @ts-ignore
  appbarStore.set({
    isLogoVisible: false,
    isBackButtonVisible: true,
    isVoucherButtonVisible: false,
    backLabel: "Competitions",
    isProfileVisible: true,
  });

  afterNavigate(({ from }) => {
    const previousURL = "/admin/competitions";
    console.log("Previous URL:", from?.url?.pathname);
    setBackUrl(previousURL);
  });
  // rank images
  let rankImages = {
    1: IMAGES.POSITION_1_ICON,
    2: IMAGES.POSITION_2_ICON,
    3: IMAGES.POSITION_3_ICON,
  };

  async function fetchLeaderboard() {
    isLoading = true;
    clearInterval(interval);
    let data;
    if (selectedTab === 0) {
      // Individual leaderboard (default)
      data = await getInstitutionLeaderBoard(time_type, 0, selectedGrade);
    } else {
      // Schools leaderboard
      data = await getInstitutionSchoolLeaderBoard(time_type, 1, selectedGrade);
    }
    if (data?.data?.users?.length > 0) {
      // For individual users data structure
      users = data.data.users;
      currentUser = data.data.current_user;

      if (currentUser != null) {
        mergedUsers = [currentUser, ...users];
      } else {
        mergedUsers = [...users];
      }
    } else if (data?.data?.schools?.length > 0) {
      // For schools data structure
      users = data.data.schools;
      currentUser = null; // No current user for schools
      mergedUsers = [...users];
    }
    topCandidates = await getTopCandidates(currentUser, users);
    console.log(topCandidates, "topCandidates here");

    // Set interval to fetch leaderboard every 1 minute
    interval = setInterval(fetchLeaderboard, 60000);

    isLoading = false;
  }

  // Function to handle window resize and update screen size status
  const updateScreenSize = () => {
    isMobile = window.innerWidth < 600;
  };

  // Set initial screen size when the component is mounted
  onMount(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  });

  $: if (selectedTab !== undefined) {
    fetchLeaderboard();
  }
  $: if ($gradesStore?.grades && $gradesStore?.grades.length > 0) {
    gradeOptions = mapGrades($gradesStore?.grades);
  }

  // onMount(() => {
  //   fetchLeaderboard(); // Initial fetch

  //   return () => clearInterval(interval); // Cleanup on unmount
  // });

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
      <div class="flex flex-col xl:flex-row xl:justify-between items-center w-full gap-4">
        <!-- Centered Title & Image Wrapper -->
        <div class="flex items-center gap-3 xl:absolute xl:left-1/2 xl:transform xl:-translate-x-1/2">
          <PageHeading
            customClass="xl:mr-10"
            icon={IMAGES.LEADERBOARD_ICON}
            title={"players"}
            imageClass="w-9 h-11 sm:w-13 sm:h-11"
          />
        </div>

        <!-- Dropdown Positioned Responsively -->
        <div class="w-full xl:w-auto flex justify-center xl:ml-auto">
          <div class="flex flex-row gap-4 justify-center md:justify-end">
            {#if gradeOptions.length > 0}
              <SelectBox
                width="100%"
                customClass="w-20 min-w-[140px] md:min-w-[185px]"
                options={gradeOptions}
                onSelect={async (data) => {
                  selectedGrade = data;
                  fetchLeaderboard();
                }}
              />
            {/if}
            <SelectBox
              width="100%"
              customClass="w-20 min-w-[140px] md:min-w-[185px]"
              options={LeaderboardFilters}
              onSelect={async (data) => {
                time_type = parseInt(data, 10);
                fetchLeaderboard();
              }}
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center">
      <TabSwitch
        tabs={[$t("individual"), $t("schools")]}
        bind:selectedTab
        className="gap-6 w-full max-w-[540px] text-center"
      />
    </div>

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
            { label: $t("players"), key: "name", type: "avatar", width: "70%" },
            {
              label: isMobile ? $t("coins") : $t("coins_earned"),
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
  </div>
</div>
