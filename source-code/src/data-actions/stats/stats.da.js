import { request } from "$lib/api.service";
import { waitForCompetitionGradeData } from "$lib/utils";
import { get } from "svelte/store";
import { API_DEFINITIONS } from "../../apis/api.definitions";
import { competitionStore } from "../../stores/competition.store";
import { numbers } from "$lib/numbers.formate";

/**
 * @param {string} username
 */
export async function getUserStats(username) {
  await waitForCompetitionGradeData();
  const grade = get(competitionStore).current_grade;
  const id = get(competitionStore).competition_id;

  return await request(
    API_DEFINITIONS.USER_STATS,
    { competition_id: id, grade: grade, username: username },
    {},
  );
}

/**
 * @param {number} value
 */
function formatStat(value) {
  return numbers.ZeroPad(numbers.AtLeastZero(value));
}

/**
 * @param {number} value
 */
function formatAccuracy(value) {
  value = Math.max(0, value); // Assign 0 for negative values
  return value % 1 === 0
    ? `${Math.min(100, Math.round(value))}%`
    : `${Math.min(100, Math.round(value * 10) / 10).toFixed(1)}%`;
}

/**
 * @param {any} Data
 */
export function calculateStats(Data) {
  const total_coins =
    Data.points > 0 ? `+ ${numbers.AbbreviatedNumber(Data.points, 1)}` : "0";
  const total_wins = formatStat(Data.total_multiplayer_wins);
  const total_ties = formatStat(Data.total_multiplayer_ties);
  const multiplayer_matches = formatStat(Data.total_multiplayer_matches);
  const single_matches = formatStat(Data.total_single_player_matches);
  const total_lost = formatStat(
    Math.max(0, multiplayer_matches - total_wins - total_ties),
  );
  const accuracy = formatAccuracy(Data.overall_accuracy);

  return {
    total_coins,
    total_wins,
    total_ties,
    multiplayer_matches,
    single_matches,
    total_lost,
    accuracy,
  };
}
