<script>
  import { onMount } from "svelte";
  import BackgroundImage from "../../../../components/BackgroundImage/BackgroundImage.svelte";
  import { getText, t } from "../../../../stores/language.store";
  import { getTitle } from "../../../../stores/title.store";
  import { transferStore } from "../../../../stores/transfer.store";
  import { get } from "svelte/store";
  import { goto } from "$app/navigation";
  import {
    getCompetitionDetails,
    mapGrades,
    setCompetitionGrade,
  } from "../../../../data-actions/competitions/competitions.da";
  import GradeSelectBox from "../../../../components/GradeSelectBox/GradeSelectBox.svelte";
  import { competitionStore } from "../../../../stores/competition.store";
  import { isShupavu } from "../../../../data-actions/system/system..da";
  import ShupavuGradeSelector from "../../../../components/GradeSelectBox/ShupavuGradeSelector.svelte";
  import GradeConfirmModal from "../../../../components/CustomModals/GradeConfirmModal.svelte";
  import { showError } from "../../../../stores/toast.store";
  import { gradesStore } from "../../../../stores/grades.store";

  let cGrades = [{ value: "", label: $t("select_grade") }];
  let showConfirm = false;
  let pendingGrade = "";

  async function loadGrades() {
    const response = await getCompetitionDetails();
    const allGrades = mapGrades(response.data.grades);

    if (!Array.isArray(allGrades) || allGrades.length === 0) {
      showError(await getText("no_content"));
      goto("/competitions");
      return;
    }
    const grades = allGrades;
    gradesStore.set({
      grades: response.data.grades,
      current_grade: response.data.current_grade,
    });
    transferStore.set(allGrades);

    cGrades = [...cGrades, ...grades];
  }

  onMount(() => {
    loadGrades();
    // const grades = get(transferStore);
    // if (!Array.isArray(grades)) {
    //   goto("/competitions");
    // } else {
    // cGrades = [...cGrades, ...grades];
    // }
  });
  /**
   * @param {string} grade
   */
  async function handleSelect(grade) {
    const current = get(competitionStore).current_grade;

    // 1) First-time: no current grade set → go directly
    if (!current) {
      await setCompetitionGrade(grade);
      return;
    }

    // 2) Same grade picked again → no-op
    if (grade === current) {
      return;
    }

    // 3) Existing grade → confirm before changing
    pendingGrade = grade;
    showConfirm = true;
  }

  async function onConfirmChange() {
    showConfirm = false;
    await setCompetitionGrade(pendingGrade);
  }

  function onCancelChange() {
    showConfirm = false;
    pendingGrade = "";
  }
</script>

<svelte:head>
  <title>{getTitle($t("select_grade"))}</title>
</svelte:head>

{#if isShupavu}
  <h1 class="md:text-4xl text-3xl font-bold text-white text-center w-full">
    {$t("select_grade_kenya_title")}
  </h1>
{:else}
  <h1 class="md:text-4xl text-3xl font-bold text-white text-center w-full">
    {$t("select_grade")}
  </h1>
{/if}
<BackgroundImage>
  <div
    class="flex items-center justify-center max-w-xl w-full bg-transparent rounded-lg p-8 mx-auto text-center space-y-10"
  >
    <!-- <div class="text-white text-2xl mt-5">{$t("select_grade")}</div> -->

    {#if isShupavu}
      <ShupavuGradeSelector
        title={$t("select_grade")}
        options={cGrades}
        onSelect={handleSelect}
      />
    {:else}
      <GradeSelectBox
        title={$t("select_grade")}
        options={cGrades}
        onSelect={handleSelect}
      />
    {/if}
    <GradeConfirmModal
      bind:showModal={showConfirm}
      title={$t("change_grade")}
      message={$t("change_grade_sure")}
      warningText={$t("lost_earning")}
      onConfirm={onConfirmChange}
      onCancel={onCancelChange}
    />
  </div>
</BackgroundImage>
