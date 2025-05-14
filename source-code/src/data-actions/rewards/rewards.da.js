import { IMAGES } from "$lib/assets/images/images.constants";
import { decompressLZString, waitForCompetitionGradeData } from "$lib/utils";
import { get } from "svelte/store";
import { getText } from "../../stores/language.store";
import { competitionStore } from "../../stores/competition.store";
import { API_DEFINITIONS } from "../../apis/api.definitions";
import { request } from "$lib/api.service";

export async function getUserRewards() {
  await waitForCompetitionGradeData();
  const grade = get(competitionStore).current_grade;
  const id = get(competitionStore).competition_id;

  return await request(
    API_DEFINITIONS.REWARDS,
    { competition_id: id, grade: grade },
    {}
  );
}
/**
 * @param {string} full_name
 */
export async function updateCertificateUserName(full_name) {
  await waitForCompetitionGradeData();
  const grade = get(competitionStore).current_grade;
  const id = get(competitionStore).competition_id;

  return await request(
    API_DEFINITIONS.CERTIFICATE_NAME_UPDATE,
    { competition_id: id, grade: grade, full_name: full_name },
    {}
  );
}

/**
 * @param {number} reward_type
 */
export function getBadgeIcon(reward_type) {
  /** @type {{ [key: number]: string }} */
  const badgeIcons = {
    0: IMAGES.DAILY_BADGE,
    1: IMAGES.WEEKLY_BADGE,
    3: IMAGES.MONTHLY_BADGE,
  };

  return badgeIcons[reward_type] || "";
}

/**
 * @param {string} certificate_json
 */
/**
 * @param {string} certificate_json
 * @param {number} certificate_status
 */
export function getCertificateData(certificate_json, certificate_status) {
  let certificateReward = {};

  let certificate_data = certificate_json
    ? JSON.parse(decompressLZString(certificate_json) || "{}")
    : "";

  if (certificate_data) {
    certificateReward = {
      reward_type: -1,
      image: IMAGES.CERTIFICATE_IMAGE,
      title: certificate_data.certificate_data.certificate_title,
      primary_text:
        certificate_status === 1
          ? certificate_data.certificate_data.certified_desc
          : certificate_data.certificate_data.non_certified_desc,
      instructions:
        certificate_status === 1
          ? certificate_data.certificate_data.certified_popup
          : certificate_data.certificate_data.non_certified_popup,
      ...certificate_data,
    };
  }
  return certificateReward;
}

export const RewardsType = [
  { label: await getText("all_rewards"), value: 0 },
  { label: await getText("earned_rewards"), value: 1 },
  { label: await getText("competition_rewards"), value: 2 },
  { label: await getText("claimed_redeemed_rewards"), value: 3 },
];

/**
 * @param {string} label
 * @param {{ instructions: string }} data
 */
export function InstructionsData(label, data) {
  /** @type {{ [key: string]: string }} */
  const titlesMap = {
    Claimed: label,
    "How to Earn": label,
    Download: "Claim Certificate",
  };

  const instructionTitle =
    label === "Download" ? "Congratulations!" : "Instructions";

  return {
    title: titlesMap[label] || label,
    instructionTitle,
    detailsText: data.instructions,
    type: label === "Download" ? 1 : 0,
  };
}
