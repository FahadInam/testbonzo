<script>
  import { onMount } from "svelte";
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { waitForGradeData } from "$lib/utils";
  import GameStatsCard from "../../../../../components/GameStatsCard/GameStatsCard.svelte";
  import OverviewSkeletonLoader from "../../../../../components/GameStatsCard/OverviewSkeletonLoader.svelte";
  import LearnerPerformanceCard from "../../../../../components/LearnerPerformanceCard/LearnerPerformanceCard.svelte";
  import PageHeading from "../../../../../components/PageHeading/PageHeading.svelte";
  import ProgressCard from "../../../../../components/ProgressCard/ProgressCard.svelte";
  import SelectBox from "../../../../../components/SelectBox/SelectBox.svelte";
  import {
    fetchDashboardData,
    getDashboardReportItems,
  } from "../../../../../data-actions/admin/admin.competition.da";
  import {
    mapGrades,
    mapSubjects,
  } from "../../../../../data-actions/competitions/competitions.da";
  import { gradesStore } from "../../../../../stores/grades.store";
  import {
    navigationStore,
    setBackUrl,
  } from "../../../../../stores/navigation.store";
  import { sidebarStore } from "../../../../../stores/sidebar.store";
  import { systemSettingsStore } from "../../../../../stores/systemsettings.store";
  import { get } from "svelte/store";
  import { afterNavigate } from "$app/navigation";
  import { appbarStore } from "../../../../../stores/appbar.store";

  let competitionSummary = null;
  let performanceData = null;
  let gamesReport = null;
  let lessonReport = null;
  let isLoading = true;
  let gradeOptions = [];
  let subjectOptions = [];
  let selectedGrade = "";
  let selectedSubject = "";

  $: reportItems = competitionSummary
    ? getDashboardReportItems(competitionSummary)
    : [];

  $: topPerformers = performanceData?.top || [];
  $: strugglingLearners = performanceData?.struggling || [];

  $: if ($gradesStore?.grades && $gradesStore?.grades.length > 0) {
    console.log("Grades Store Updated:", $gradesStore.grades);
    gradeOptions = mapGrades($gradesStore?.grades);
    // subjectOptions = mapSubjects($gradesStore?.grades);
  }

  afterNavigate(({ from }) => {
    const previousURL = "/admin/competitions";
    console.log("Previous URL:", from?.url?.pathname);
    setBackUrl(previousURL);
  });

  async function loadDashboardData(gradeValue, subjectValue) {
    console.log(
      "Loading dashboard data for grade:",
      gradeValue,
      "and subject:",
      subjectValue,
    );
    isLoading = true;
    try {
      const gradeIndex = $gradesStore?.grades.findIndex(
        (item) => item.grade.toString() === gradeValue.toString(),
      );
      const subjectIndex = $gradesStore?.grades.findIndex(
        (item) => item.subject === subjectValue,
      );

      if (gradeIndex !== -1 && subjectIndex !== -1) {
        const data = {
          cms_course_id: $gradesStore?.grades[subjectIndex].cms_course_id,
          grade: $gradesStore?.grades[gradeIndex].grade,
        };

        const dashboardData = await fetchDashboardData(data);
        competitionSummary = dashboardData.competitionSummary;
        performanceData = dashboardData.performanceData;
        gamesReport = dashboardData.gamesReport;
        lessonReport = dashboardData.lessonsReport;
      }
    } finally {
      isLoading = false;
    }
  }

  function updateSubjectsForGrade(grade) {
    console.log("Selected grade:", grade);
    const filteredSubjects = $gradesStore?.grades
      .filter((item) => item.grade.toString() === grade.toString())
      .map((item) => item.subject);
    subjectOptions = mapSubjects(
      $gradesStore?.grades.filter((item) =>
        filteredSubjects.includes(item.subject),
      ),
    );

    // Update the selected subject to the first available subject for the selected grade
    if (filteredSubjects.length > 0) {
      selectedSubject = filteredSubjects[0];
    }
  }

  // Function to update grade based on the selected subject
  function updateGradeForSubject(subject) {
    const selectedGradeFromSubject = $gradesStore?.grades.find(
      (item) => item.subject === subject,
    )?.grade;
    if (selectedGradeFromSubject) {
      selectedGrade = selectedGradeFromSubject;
    }
  }

  onMount(async () => {
    await waitForGradeData();
    const mappedGrades = mapGrades($gradesStore?.grades);
    // const mappedSubjects = mapSubjects($gradesStore?.grades);
    console.log("this is data to see", mappedGrades);
    if (mappedGrades.length > 0) {
      selectedGrade = mappedGrades[0].value;
      updateSubjectsForGrade(selectedGrade);
      if (subjectOptions.length > 0) {
        selectedSubject = subjectOptions[0].value;
        loadDashboardData(selectedGrade, selectedSubject);
      }
      // loadDashboardData(selectedGrade, selectedSubject);
    }

    // @ts-ignore
    appbarStore.set({
      isLogoVisible: false,
      isBackButtonVisible: true,
      isVoucherButtonVisible: false,
      backLabel: "Competitions",
      isProfileVisible: true,
    });
  });

  // Table configuration
  const columns = [
    { key: "title", label: "Games" },
    { key: "avg_score", label: "Avg.Score" },
    { key: "completion_percentage", label: "Completed By" },
  ];
</script>

<div class="w-full space-y-6 px-4 sm:px-6 md:px-8 lg:px-10">
  <div class="w-full relative mb-8">
    <div
      class="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-6"
    >
      <div class="flex items-center gap-3 justify-center md:justify-start">
        <PageHeading
          icon={IMAGES.LEADERBOARD_ICON}
          title={"players"}
          imageClass="w-9 h-11 sm:w-13 sm:h-11"
        />
      </div>

      <div class="flex flex-row gap-4 justify-center md:justify-end">
        {#if gradeOptions.length > 0}
          <SelectBox
            customClass="w-36 min-w-[140px]"
            options={gradeOptions}
            selectedValue={selectedGrade}
            onSelect={async (data) => {
              selectedGrade = data;
              updateSubjectsForGrade(data);
              await loadDashboardData(data, selectedSubject);
            }}
          />
        {/if}

        {#if subjectOptions.length > 0}
          <SelectBox
            customClass="w-36 min-w-[140px]"
            options={subjectOptions}
            selectedValue={selectedSubject}
            onSelect={async (data) => {
              selectedSubject = data;
              updateGradeForSubject(data);
              await loadDashboardData(selectedGrade, data);
            }}
          />
        {/if}
      </div>
    </div>
  </div>

  <!-- Skeleton loader when loading -->
  <OverviewSkeletonLoader {isLoading} />

  <!-- Actual content when not loading -->
  {#if !isLoading && competitionSummary}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each reportItems as item (item.title)}
        <div
          class="sm:col-span-1 sm:place-self-auto col-span-1 place-self-center max-w-sm w-full"
        >
          <GameStatsCard
            number={item.number}
            title={item.title}
            icon={item.icon}
          />
        </div>
      {/each}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <LearnerPerformanceCard
        performers={topPerformers}
        title="Top Performers"
      />
      <LearnerPerformanceCard
        performers={strugglingLearners}
        title="Struggling Performers"
      />
    </div>
    <div class="flex flex-col gap-8 my-8">
      <ProgressCard title="Competition Progress" data={lessonReport} />
      <ProgressCard title="Games Progress" data={gamesReport} {columns} />
    </div>
  {:else if !isLoading}
    <div class="p-6 text-center">
      <p class="text-gray-600">No competition data available.</p>
    </div>
  {/if}
</div>
