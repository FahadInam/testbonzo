import { get } from "svelte/store";
import { userStore } from "../../stores/user.store";
import { loginAsGuest } from "../../data-actions/authentication/guest.auth.da";
import { browser } from "$app/environment";
import {
  getCompetitionDetails,
  getCompetitions,
  mapGrades,
  setCompetitionGrade,
} from "../../data-actions/competitions/competitions.da";
import { getItemByProperty } from "$lib/utils";
import { goto } from "$app/navigation";
import { competitionStore } from "../../stores/competition.store";
import { transferStore } from "../../stores/transfer.store";
import { showError } from "../../stores/toast.store";
import { getText } from "../../stores/language.store";
import { gradesStore } from "../../stores/grades.store";

/**
 * @param {Record<string, string>} params
 */
export async function competitionsLayoutLogic(params) {
  /**
   * @type {never[]}
   */
  let data = [];

  if (browser) {
    const competitionName = params.competition_name;

    const user_id = get(userStore)?.user_id;
    const active_role = get(userStore)?.active_role;

    if (!user_id) {
      await loginAsGuest();
    }
    if (competitionName) {
      let competition = null;
      if (!get(competitionStore).competition_id) {
        const competitions = await getCompetitions();

        competition = getItemByProperty(
          competitionName,
          competitions.data.competitions,
          "url",
        );
      } else {
        competition = get(competitionStore);
      }

      if (competition) {
        competitionStore.set(competition);

        if (!competition.current_grade) {
          //no grade selected, go to select grade
          const compDetails = await getCompetitionDetails();

          if (
            !Array.isArray(compDetails.data.grades) ||
            compDetails.data.grades.length == 0
          ) {
            //no grade found
            console.warn("No grade found for this competition.");
            showError(await getText("no_content"));
            goto("/competitions");
          } else {
            const allGrades = mapGrades(compDetails.data.grades);

            gradesStore.set({
              grades: compDetails.data.grades,
              current_grade: compDetails.data.current_grade || "0", // Convert 0 to string
            });
            console.log("this is grades set", gradesStore, allGrades);

            if (allGrades.length == 1) {
              //only one grade found
              await setCompetitionGrade(allGrades[0].value);
            } else if (active_role !== "principal") {
              // multiple grades found
              transferStore.set(allGrades);
              goto("/settings/change-grade");
            }
          }
        }
      } else {
        // competition not found, redirect to competitions screen
        console.warn("No competition found.");
        goto("/competitions");
      }
    }
  }
  return {
    data,
  };
}
