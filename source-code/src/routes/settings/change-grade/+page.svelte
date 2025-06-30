<script>
  import { onMount } from "svelte";
  import BackgroundImage from "../../../components/BackgroundImage/BackgroundImage.svelte";
  import { t } from "../../../stores/language.store";
  import { getTitle } from "../../../stores/title.store";
  import { transferStore } from "../../../stores/transfer.store";
  import { get } from "svelte/store";
  import { goto } from "$app/navigation";
  import { setCompetitionGrade } from "../../../data-actions/competitions/competitions.da";
  import GradeSelectBox from "../../../components/GradeSelectBox/GradeSelectBox.svelte";
  import GradeConfirmModal from "../../../components/CustomModals/GradeConfirmModal.svelte";
  import { competitionStore } from "../../../stores/competition.store";
  import ShupavuGradeSelector from "../../../components/GradeSelectBox/ShupavuGradeSelector.svelte";
  import { isShupavu } from "../../../data-actions/system/system..da";

  let cGrades = [{ value: "", label: $t("select_grade") }];
  let showConfirm = false;
  let pendingGrade = "";

  onMount(() => {
    const grades = get(transferStore);
    if (!Array.isArray(grades)) {
      goto("/competitions");
    } else {
      // @ts-ignore
      cGrades = [...cGrades, ...grades];
    }
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

<h1 class="text-3xl md:text-4xl font-medium text-white text-center w-full mt-20">
  {$t(isShupavu ? "select_grade_kenya_title" : "select_grade")}
</h1>

<BackgroundImage>
  <div
    class="flex items-center justify-center max-w-xl w-full bg-transparent rounded-lg p-8 mx-auto text-center space-y-10"
  >
    <!-- <div class="text-white text-2xl mt-5">{$t("select_grade")}</div> -->
    {#if isShupavu}
      <ShupavuGradeSelector title={$t("select_grade")} options={cGrades} onSelect={handleSelect} />
    {:else}
      <GradeSelectBox title={$t("select_grade")} options={cGrades} onSelect={handleSelect} />
    {/if}
  </div>
  <GradeConfirmModal
    bind:showModal={showConfirm}
    title={$t("select_grade")}
    message={$t("change_grade_sure")}
    warningText={$t("lost_earning")}
    onConfirm={onConfirmChange}
    onCancel={onCancelChange}
  />
</BackgroundImage>
