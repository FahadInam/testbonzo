import { r as request } from "./api.service.js";
import { v as validateSecretCode, b as waitForUserData, u as updateStoreVariable, c as waitForCompetitionGradeData, d as awaitStoreKey } from "./utils.js";
import { g as get } from "./index3.js";
import { A as API_DEFINITIONS, __tla as __tla_0 } from "./api.definitions.js";
import { u as userStore } from "./user.store.js";
import { c as competitionStore } from "./appbar.store.js";
import { g as goto } from "./client.js";
import { g as getText } from "./language.store.js";
import { s as showError } from "./toast.store.js";
import { a as refreshUserToken, __tla as __tla_1 } from "./user.auth.da.js";
import { a as isShupavu, s as systemSettingsStore } from "./system..da.js";
import { m as metaStore } from "./meta.store.js";
let mapSubjects, getCompetitionRecommendation, searchFriends, addVoucherCode, extractSubjects, getCompetitions, getCompetitionLeaderBoard, mapGrades, setCompetitionGrade;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })()
]).then(async () => {
  getCompetitions = async function() {
    await waitForUserData();
    const { active_role } = get(userStore);
    const apiUrl = active_role === "principal" ? API_DEFINITIONS.INSTITUTION_COMPETITIONS : API_DEFINITIONS.COMPETITIONS;
    const response = await request(apiUrl, {});
    await updateUserTimezoneIfNeeded(response);
    return response;
  };
  async function updateUserTimezoneIfNeeded(response) {
    const { active_role, is_guest_mode, timezone } = get(userStore);
    const is_principal = active_role === "principal";
    const shouldUpdateTimezone = response.error_code === 0 && !is_principal && !is_guest_mode && isShupavu && !timezone;
    if (!shouldUpdateTimezone) return;
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzResponse = await request(API_DEFINITIONS.UPDATE_TIMEZONE, {
      timezone: userTimezone
    }, {});
    if (tzResponse.error_code === 0) {
      updateStoreVariable(userStore, "timezone", userTimezone);
    }
  }
  async function getCompetitionDetails() {
    await awaitStoreKey(competitionStore, "competition_id");
    const id = get(competitionStore).competition_id;
    return await request(API_DEFINITIONS.COMPETITION_DETAILS, {
      competition_id: id
    }, {});
  }
  mapGrades = function(input) {
    const uniqueGrades = /* @__PURE__ */ new Set();
    return input.reduce((acc, item) => {
      if (!uniqueGrades.has(item.grade)) {
        uniqueGrades.add(item.grade);
        acc.push({
          value: item.grade,
          label: item.grade_alias,
          sort_order: item.sort_order
        });
      }
      if (acc.some((items) => items.sort_order !== null)) {
        acc = acc.sort((a, b) => a.sort_order !== null && b.sort_order !== null ? a.sort_order - b.sort_order : 0);
      }
      return acc;
    }, []);
  };
  mapSubjects = function(grades) {
    if (!grades || grades.length === 0) return [];
    const uniqueSubjects = [
      ...new Set(grades.map((item) => item.subject))
    ];
    return uniqueSubjects.map((subject) => ({
      value: subject,
      label: subject
    }));
  };
  setCompetitionGrade = async function(grade) {
    const isGuestUser = get(userStore).is_guest_mode;
    const currentCompetition = get(competitionStore);
    if (isGuestUser) {
      updateStoreVariable(competitionStore, "current_grade", grade);
    } else {
      await request(API_DEFINITIONS.SETTINGS_UPDATE, {
        competition_id: get(competitionStore).competition_id,
        grade,
        points: 0,
        school_id: 0,
        friend_id: 0
      });
      updateStoreVariable(competitionStore, "current_grade", grade);
      updateStoreVariable(metaStore, "current_grade", grade);
    }
    console.log(get(competitionStore));
    goto("/competitions/" + currentCompetition.url + "/home");
  };
  getCompetitionRecommendation = async function() {
    await waitForCompetitionGradeData();
    const grade = get(competitionStore).current_grade;
    const id = get(competitionStore).competition_id;
    return await request(API_DEFINITIONS.LESSON_RECOMMENDATION, {
      competition_id: id,
      grade
    }, {});
  };
  getCompetitionLeaderBoard = async function(time_type, is_school_based) {
    await waitForCompetitionGradeData();
    const grade = get(competitionStore).current_grade;
    const id = get(competitionStore).competition_id;
    return await request(API_DEFINITIONS.LEARNER_LEADERBOARD, {
      competition_id: id,
      grade,
      time_type,
      is_school_based
    }, {});
  };
  searchFriends = async function(username) {
    await waitForCompetitionGradeData();
    const grade = get(competitionStore).current_grade;
    const id = get(competitionStore).competition_id;
    return await request(API_DEFINITIONS.SEARCH_FRIENDS, {
      competition_id: id,
      grade,
      username
    }, {});
  };
  addVoucherCode = async function(voucherCode, onVoucherSuccess, competition_id) {
    if (!await CodeVerification(voucherCode)) return;
    const config = get(systemSettingsStore);
    let apiUrl = config?.comp_banner_locked ? API_DEFINITIONS.ADD_GCLC_VOUCHER : API_DEFINITIONS.ADD_VOUCHER;
    let dto = {
      secret_code: voucherCode,
      ...config?.comp_banner_locked && {
        competition_id
      }
    };
    let response = await request(apiUrl, dto);
    if (response.error_code === 0) {
      await refreshUserToken();
    }
  };
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
  extractSubjects = async function() {
    const apiResponse = await getCompetitionDetails();
    const currentGrade = get(competitionStore).current_grade;
    if (!apiResponse?.data?.grades || !Array.isArray(apiResponse.data.grades)) {
      return [
        {
          value: "",
          label: "Select Subject"
        }
      ];
    }
    const filteredGrades = apiResponse.data.grades.filter((grade) => grade.grade === currentGrade);
    const uniqueSubjects = [
      ...new Set(filteredGrades.map((grade) => grade.subject))
    ];
    let title = [
      {
        value: "",
        label: "Select Subject"
      }
    ];
    const formattedSubjects = [
      ...title,
      ...uniqueSubjects.map((subject) => ({
        value: subject,
        label: subject
      }))
    ];
    return formattedSubjects;
  };
});
export {
  __tla,
  mapSubjects as a,
  getCompetitionRecommendation as b,
  searchFriends as c,
  addVoucherCode as d,
  extractSubjects as e,
  getCompetitions as f,
  getCompetitionLeaderBoard as g,
  mapGrades as m,
  setCompetitionGrade as s
};
