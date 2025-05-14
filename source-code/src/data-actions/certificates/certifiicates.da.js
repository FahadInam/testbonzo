import { request } from "$lib/api.service";
import { get } from "svelte/store";
import { competitionStore } from "../../stores/competition.store";
import { API_DEFINITIONS } from "../../apis/api.definitions";

export async function getCertificates() {
  const competition_id = get(competitionStore).competition_id;
  const response = await request(
    API_DEFINITIONS.GET_CERTIFICATES,
    competition_id ? { competition_id } : {},
    {},
  );
  return response;
}

/**
 * Filter competition data into completions and achievements arrays
 * @param {Object} apiResponse - The API response containing user_competitions
 * @return {Object} Object containing completions and achievements arrays
 */
export function filterCertificates(apiResponse) {
  // Check if the API response is valid and has user_certifications
  if (
    !apiResponse ||
    !apiResponse.user_certifications ||
    !Array.isArray(apiResponse.user_certifications)
  ) {
    return { completions: [], achievements: [] };
  }

  // Filter competitions into respective arrays
  const completions = apiResponse.user_certifications
    .filter((certificate) => certificate.participation_json)
    .map((certificate) => {
      return {
        ...certificate,
        json: certificate.participation_json,
      };
    });

  const achievements = apiResponse.user_certifications
    .filter((certificate) => certificate.achievement_json)
    .map((certificate) => {
      return {
        ...certificate,
        json: certificate.achievement_json,
      };
    });
  console.log(completions, achievements, "completionscompletions");
  return { completions, achievements };
}

export async function getProfileStats() {
  const response = await request(API_DEFINITIONS.GET_PROFILE_STATS, {}, {});
  return response;
}
