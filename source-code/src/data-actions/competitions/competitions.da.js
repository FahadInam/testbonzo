import { request } from "$lib/api.service";
import {
  awaitStoreKey,
  updateStoreVariable,
  validateSecretCode,
  waitForCompetitionGradeData,
  waitForInstance,
  waitForUserData,
} from "$lib/utils";
import { get } from "svelte/store";
import { API_DEFINITIONS } from "../../apis/api.definitions";
import { userStore } from "../../stores/user.store";
import { competitionStore } from "../../stores/competition.store";
import { goto } from "$app/navigation";
import { getText } from "../../stores/language.store";
import { IMAGES } from "$lib/assets/images/images.constants";
import { showError } from "../../stores/toast.store";
import { refreshUserToken } from "../authentication/user.auth.da";
import { instanceStore } from "../../stores/instance.store";
import { isGCLC, isShupavu } from "../system/system..da";
import { gradesStore } from "../../stores/grades.store";
import { transferStore } from "../../stores/transfer.store";
import { metaStore } from "../../stores/meta.store";
import { systemSettingsStore } from "../../stores/systemsettings.store";

// @ts-ignore
export async function getNavBarItems() {
  // console.log("isShupavu --> he he he", isShupavu);
  const showFriends = get(userStore).is_guest_mode ? false : true;
  const showLessons = get(competitionStore).is_lesson_page_hide == 0;
  const showMyGames = get(competitionStore).is_games_page == 1;

  const allNavItems = [
    {
      icon: IMAGES.SIDE_NAV_HOME,
      label: await getText("home"),
      link: "{competitionHome}/home",
      isRequired: true,
    },
    ...(get(competitionStore)?.is_games_page == 1 && showFriends
      ? [
          {
            icon: IMAGES.SIDE_NAV_MY_GAMES,
            label: await getText("my_games"),
            link: "{competitionHome}/my-games",
          },
        ]
      : []),
    {
      icon: IMAGES.SIDE_NAV_LESSON,
      label: await getText("lessons"),
      link: "{competitionHome}/lessons",
    },
    // Only show the "Friends" tab if isShupavu is false
    ...(isShupavu
      ? []
      : [
          {
            icon: IMAGES.SIDE_NAV_FRIENDS,
            label: await getText("friends"),
            link: "{competitionHome}/friends",
          },
        ]),
    {
      icon: IMAGES.SIDE_NAV_LEADERBOARD,
      label: await getText("leaderboard"),
      link: "{competitionHome}/leaderboard",
      isRequired: true,
    },
    {
      icon: IMAGES.SIDE_NAV_REWARDS,
      label: await getText("rewards"),
      link: "{competitionHome}/rewards",
      isRequired: true,
    },
  ];

  return allNavItems.filter(
    (item) =>
      item.isRequired ||
      (item.link === "{competitionHome}/friends" && showFriends) ||
      (item.link === "{competitionHome}/lessons" && showLessons) ||
      (item.link === "{competitionHome}/my-games" && showMyGames),
  );
}

export async function getCompetitions() {
  await waitForUserData();
  const { active_role } = get(userStore);
  const apiUrl = active_role === "principal" ? API_DEFINITIONS.INSTITUTION_COMPETITIONS : API_DEFINITIONS.COMPETITIONS;
  const response = await request(apiUrl, {});

  await updateUserTimezoneIfNeeded(response);

  return response;
}

/**
 * @param {{ error_code: number; }} response
 */
async function updateUserTimezoneIfNeeded(response) {
  const { active_role, is_guest_mode, timezone } = get(userStore);
  const is_principal = active_role === "principal";

  const shouldUpdateTimezone = response.error_code === 0 && !is_principal && !is_guest_mode && isShupavu && !timezone;

  if (!shouldUpdateTimezone) return;

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const tzResponse = await request(API_DEFINITIONS.UPDATE_TIMEZONE, { timezone: userTimezone }, {});

  if (tzResponse.error_code === 0) {
    updateStoreVariable(userStore, "timezone", userTimezone);
  }
}

// get demo competitions for landing page
export async function getDemoCompetitions() {
  await waitForInstance();
  const instance_id = get(instanceStore).instance_id;
  return await request(
    API_DEFINITIONS.DEMO_COMPETITIONS,
    {},
    {
      headers: {
        instance_id: instance_id,
      },
    },
  );
}

export async function getCompetitionDetails() {
  await awaitStoreKey(competitionStore, "competition_id");
  const id = get(competitionStore).competition_id;
  return await request(API_DEFINITIONS.COMPETITION_DETAILS, { competition_id: id }, {});
}

export async function loadGrades() {
  const details = await getCompetitionDetails();
  const allGrades = mapGrades(details.data.grades);
  gradesStore.set({
    grades: details.data.grades,
    current_grade: details.data.current_grade,
  });
  transferStore.set(allGrades);
  updateStoreVariable(competitionStore, "current_grade", details.data.current_grade);
}

/**
 * @param {any[]} input
 */
export function mapGrades(input) {
  // Use a Set to store unique grade values
  const uniqueGrades = new Set();

  // Map through the input array and add unique grades to the Set
  return input.reduce((acc, item) => {
    if (!uniqueGrades.has(item.grade)) {
      uniqueGrades.add(item.grade);
      acc.push({
        value: item.grade,
        label: item.grade_alias,
        sort_order: item.sort_order,
      });
    }
    if (acc.some((/** @type {{ sort_order: null; }} */ items) => items.sort_order !== null)) {
      acc = acc.sort(
        (/** @type {{ sort_order: number | null; }} */ a, /** @type {{ sort_order: number | null; }} */ b) =>
          a.sort_order !== null && b.sort_order !== null ? a.sort_order - b.sort_order : 0,
      );
    }
    return acc;
  }, []);
}
/**
 * Maps the grades data to an array of subject options for the SelectBox.
 * @param {Array} grades - The grades data from the gradesStore.
 * @returns {Array} - An array of objects with `value` and `label` properties.
 */
export function mapSubjects(grades) {
  if (!grades || grades.length === 0) return [];

  // Extract unique subjects
  const uniqueSubjects = [...new Set(grades.map((item) => item.subject))];

  // Map subjects to the required format
  return uniqueSubjects.map((subject) => ({
    value: subject,
    label: subject,
  }));
}
/**
 * @param {string} grade
 */
export async function setCompetitionGrade(grade) {
  const isGuestUser = get(userStore).is_guest_mode;
  const currentCompetition = get(competitionStore);
  const user = get(userStore);
  const isLearner = user?.active_role === "learner";
  const hasCurrentGrade = currentCompetition && get(competitionStore).current_grade;
  const isUserNameNumber = !isNaN(user?.name);

  if (isGuestUser) {
    updateStoreVariable(competitionStore, "current_grade", grade);
  } else {
    //call update API
    await request(API_DEFINITIONS.SETTINGS_UPDATE, {
      competition_id: get(competitionStore).competition_id,
      grade: grade,
      points: 0,
      school_id: 0,
      friend_id: 0,
    });

    updateStoreVariable(competitionStore, "current_grade", grade);
    updateStoreVariable(metaStore, "current_grade", grade);
  }

  const isShupavuNewUser = isShupavu && isLearner && !hasCurrentGrade && isUserNameNumber;
  const baseUrl = `/competitions/${currentCompetition?.url}`;

  if (isShupavuNewUser) {
    const target = `${baseUrl}/profile/edit`;
    const state = { fromChangeGrade: true };
    goto(target, { state });
  } else {
    const target = `${baseUrl}/home`;
    goto(target);
  }
}

export async function getCompetitionRecommendation() {
  await waitForCompetitionGradeData();
  const grade = get(competitionStore).current_grade;
  const id = get(competitionStore).competition_id;

  return await request(API_DEFINITIONS.LESSON_RECOMMENDATION, { competition_id: id, grade: grade }, {});
}

export async function getCompetitionActivities() {
  await waitForCompetitionGradeData();
  const grade = get(competitionStore).current_grade;
  const id = get(competitionStore).competition_id;

  return await request(API_DEFINITIONS.COMPETITION_ACTIVITIES, { competition_id: id, grade: grade }, {});
}

/**
 * @param {number} time_type
 * @param {number} is_school_based
 */
export async function getCompetitionLeaderBoard(time_type, is_school_based) {
  await waitForCompetitionGradeData();
  const grade = get(competitionStore).current_grade;
  const id = get(competitionStore).competition_id;

  return await request(
    API_DEFINITIONS.LEARNER_LEADERBOARD,
    { competition_id: id, grade: grade, time_type: time_type, is_school_based },
    {},
  );
}

/**
 * @param {any} subject
 */
export async function getCompetitionFriends(subject) {
  await waitForCompetitionGradeData();
  const grade = get(competitionStore).current_grade;
  const id = get(competitionStore).competition_id;

  return await request(API_DEFINITIONS.FRIENDS, { competition_id: id, grade: grade, subject: subject }, {});
}

/**
 * @param {string} username
 */
export async function searchFriends(username) {
  await waitForCompetitionGradeData();
  const grade = get(competitionStore).current_grade;
  const id = get(competitionStore).competition_id;

  return await request(API_DEFINITIONS.SEARCH_FRIENDS, { competition_id: id, grade: grade, username: username }, {});
}

export async function getUserLessons() {
  await waitForCompetitionGradeData();
  const grade = get(competitionStore).current_grade;
  const id = get(competitionStore).competition_id;

  return await request(API_DEFINITIONS.USER_LESSONS, { competition_id: id, grade: grade }, {});
}

/**
 * @param {string} voucherCode
 * @param {() => void} onVoucherSuccess
 * @param {number} competition_id
 */

export async function addVoucherCode(voucherCode, onVoucherSuccess, competition_id) {
  if (!(await CodeVerification(voucherCode))) return;
  const config = get(systemSettingsStore);

  let apiUrl = config?.comp_banner_locked ? API_DEFINITIONS.ADD_GCLC_VOUCHER : API_DEFINITIONS.ADD_VOUCHER;

  let dto = {
    secret_code: voucherCode,
    ...(config?.comp_banner_locked && { competition_id }),
  };

  let response = await request(apiUrl, dto);
  if (response.error_code === 0) {
    await refreshUserToken(async () => {
      onVoucherSuccess();
    });
  }
}

/**
 * @param {string} secretCode - The secret code to verify.
 */
async function CodeVerification(secretCode) {
  if (!secretCode) {
    showError(await getText("code_required"));
  } else if (!validateSecretCode(secretCode)) {
    showError(await getText("code_required_alpha_numeric"));
  } else if (secretCode.length < 3) {
    showError(await getText("code_length"));
  } else return true;
  return false;
}

export async function getAdminNavBarItems() {
  const allNavItems = [
    {
      icon: IMAGES.SIDE_NAV_HOME,
      label: await getText("overview"),
      link: "{competitionHome}/overview",
      isRequired: true,
    },
    {
      icon: IMAGES.SIDE_NAV_LEADERBOARD,
      label: await getText("players"),
      link: "{competitionHome}/players",
      isRequired: true,
    },
  ];

  return allNavItems.filter((item) => item.isRequired);
}

export async function getMyGames() {
  await waitForCompetitionGradeData();
  const grade = get(competitionStore).current_grade;
  const id = get(competitionStore).competition_id;

  return await request(API_DEFINITIONS.MY_GAMES, { competition_id: id, grade: grade, page: 1 }, {});
}

/**
 * Extracts subjects from competition details, filtered by current grade
 * @returns {Promise<Array<{value: string, label: string}>>} Array of subject objects for dropdown
 */
export async function extractSubjects() {
  const apiResponse = await getCompetitionDetails();
  const currentGrade = get(competitionStore).current_grade;

  // Check if the response has the expected structure
  if (!apiResponse?.data?.grades || !Array.isArray(apiResponse.data.grades)) {
    return [{ value: "", label: "Select Subject" }];
  }

  // Filter grades based on current grade
  const filteredGrades = apiResponse.data.grades.filter((grade) => grade.grade === currentGrade);

  // Extract unique subject names from filtered grades
  const uniqueSubjects = [...new Set(filteredGrades.map((grade) => grade.subject))];

  // Format the subjects for dropdown
  let title = [{ value: "", label: "Select Subject" }];
  const formattedSubjects = [
    ...title,
    ...uniqueSubjects.map((subject) => ({
      value: subject,
      label: subject,
    })),
  ];

  return formattedSubjects;
}
