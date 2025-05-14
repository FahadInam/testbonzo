import { request } from "$lib/api.service";
import { get } from "svelte/store";
import { API_DEFINITIONS } from "../../apis/api.definitions";
import { competitionStore } from "../../stores/competition.store";
import { gradesStore } from "../../stores/grades.store";
import { waitForCompetitionGradeData, waitForGradeData } from "$lib/utils";
import { IMAGES } from "$lib/assets/images/images.constants";

export async function getInstitutionCompetitionSummary() {
  const id = get(competitionStore).competition_id;
  const grades = get(gradesStore).grades;
  const { cms_course_id, grade } = grades[0];
  const data = await request(API_DEFINITIONS.INSTITUTION_COMPETITION_SUMMARY, {
    competition_id: id,
    cms_course_id: cms_course_id,
    grade: grade,
  });

  if (data.error_code == 0) {
    return data.data.report;
  }
  return null;
}
export async function getInstitutionCompetitionReport(val) {
  const id = get(competitionStore).competition_id;
  const data = await request(API_DEFINITIONS.INSTITUTION_COMPETITION_REPORT, {
    competition_id: id,
    cms_course_id: val.cms_course_id,
    grade: val.grade,
  });

  if (data.error_code == 0) {
    return data.data.report;
  }
  return null;
}
export async function getInstitutionCompetitionPerformance(val) {
  const id = get(competitionStore).competition_id;
  const data = await request(
    API_DEFINITIONS.INSTITUTION_COMPETITION_PERFORMANCE,
    {
      competition_id: id,
      cms_course_id: val.cms_course_id,
      grade: val.grade,
    },
  );

  if (data.error_code == 0) {
    return data.data;
  }
  return null;
}

export async function getInstitutionGamesReport(val) {
  const id = get(competitionStore).competition_id;
  const data = await request(API_DEFINITIONS.INSTITUTION_GAMES_REPORT, {
    competition_id: id,
    cms_course_id: val.cms_course_id,
    grade: val.grade,
  });

  if (data.error_code == 0) {
    return data.data.report;
  }
  return null;
}
export async function getInstitutionLessonsReport(val) {
  const id = get(competitionStore).competition_id;
  const data = await request(API_DEFINITIONS.INSTITUTION_LESSONS_REPORT, {
    competition_id: id,
    cms_course_id: val.cms_course_id,
    grade: val.grade,
  });

  if (data.error_code == 0) {
    return data.data.lessons;
  }
  return null;
}

/**
 * @param {Object} params - Optional parameters to pass to the API calls
 * @param {string} params.cms_course_id - Course ID to filter data
 * @param {string} params.grade - Grade to filter data
 * @returns {Promise<Object>} Object containing all dashboard data
 */
export async function fetchDashboardData(data) {
  // If no params provided, get from gradesStore
  if (!data) {
    const grades = get(gradesStore).grades;
    if (grades && grades.length > 0) {
      data = {
        cms_course_id: grades[0].cms_course_id,
        grade: grades[0].grade,
      };
    }
  }

  // First API call
  const summaryData = await getInstitutionCompetitionSummary(data);
  // Second and third API calls after first one completes
  const [performanceResult, gamesData, lessonData] = await Promise.all([
    getInstitutionCompetitionPerformance(data),
    getInstitutionGamesReport(data),
    getInstitutionLessonsReport(data),
  ]);

  return {
    competitionSummary: summaryData,
    performanceData: performanceResult || null,
    gamesReport: gamesData || null,
    lessonsReport: lessonData || null,
  };
}

export async function getInstitutionLeaderBoard(
  time_type,
  is_school_based,
  selectedGrade,
) {
  await waitForGradeData();
  const grades = get(gradesStore).grades;
  const id = get(competitionStore).competition_id;

  let grade = selectedGrade;
  if (!grade && grades && grades.length > 0) {
    grade = grades[0].grade;
  }

  return await request(
    API_DEFINITIONS.INSTITUTION_USERS_RANKING,
    { competition_id: id, grade: grade, time_type: time_type, is_school_based },
    {},
  );
}

export async function getInstitutionSchoolLeaderBoard(
  time_type,
  is_school_based,
  selectedGrade,
) {
  await waitForGradeData();
  const grades = get(gradesStore).grades;
  const id = get(competitionStore).competition_id;

  // If selectedGrade is not provided, use the first grade from the store
  let grade = selectedGrade;
  if (!grade && grades && grades.length > 0) {
    grade = grades[0].grade;
  }
  return await request(
    API_DEFINITIONS.INSTITUTION_SCHOOLS_RANKING,
    { competition_id: id, grade: grade, time_type: time_type, is_school_based },
    {},
  );
}
/**
 * @param {Object} competitionSummary - The competition summary data
 * @param {Object} IMAGES - The images constants
 * @returns {Array} Array of report items
 */
export function getDashboardReportItems(competitionSummary) {
  return [
    {
      icon: IMAGES.TOTAL_GAMES,
      number: competitionSummary.total_games,
      title: "Total Games",
    },
    {
      icon: IMAGES.TOTAL_GAMES_PLAYED,
      number: competitionSummary.games_played,
      title: "Total Games played",
    },
    {
      icon: IMAGES.TOTAL_HOURS_SPENT,
      number: competitionSummary.time_spent_in_seconds,
      title: "Total Time Spent",
    },
    {
      icon: IMAGES.TOTAL_PLAYERS,
      number: competitionSummary.total_players,
      title: "Total Players",
    },
    {
      icon: IMAGES.ACTIVE_PLAYERS,
      number: competitionSummary.active_players,
      title: "Active Players",
    },
    {
      icon: IMAGES.AVG_COMPLETION_RATE,
      number: competitionSummary.avg_completion,
      title: "Average Completion rate",
    },
  ];
}
