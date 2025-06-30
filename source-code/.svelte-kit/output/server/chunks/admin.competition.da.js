import { r as request } from "./api.service.js";
import { g as get } from "./index3.js";
import { A as API_DEFINITIONS, __tla as __tla_0 } from "./api.definitions.js";
import { c as competitionStore } from "./appbar.store.js";
import { w as waitForGradeData, a as gradesStore } from "./utils.js";
import { I as IMAGES } from "./images.constants.js";
let getInstitutionSchoolLeaderBoard, getDashboardReportItems, fetchDashboardData, getInstitutionLeaderBoard;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  async function getInstitutionCompetitionSummary() {
    const id = get(competitionStore).competition_id;
    const grades = get(gradesStore).grades;
    const { cms_course_id, grade } = grades[0];
    const data = await request(API_DEFINITIONS.INSTITUTION_COMPETITION_SUMMARY, {
      competition_id: id,
      cms_course_id,
      grade
    });
    if (data.error_code == 0) {
      return data.data.report;
    }
    return null;
  }
  async function getInstitutionCompetitionPerformance(val) {
    const id = get(competitionStore).competition_id;
    const data = await request(API_DEFINITIONS.INSTITUTION_COMPETITION_PERFORMANCE, {
      competition_id: id,
      cms_course_id: val.cms_course_id,
      grade: val.grade
    });
    if (data.error_code == 0) {
      return data.data;
    }
    return null;
  }
  async function getInstitutionGamesReport(val) {
    const id = get(competitionStore).competition_id;
    const data = await request(API_DEFINITIONS.INSTITUTION_GAMES_REPORT, {
      competition_id: id,
      cms_course_id: val.cms_course_id,
      grade: val.grade
    });
    if (data.error_code == 0) {
      return data.data.report;
    }
    return null;
  }
  async function getInstitutionLessonsReport(val) {
    const id = get(competitionStore).competition_id;
    const data = await request(API_DEFINITIONS.INSTITUTION_LESSONS_REPORT, {
      competition_id: id,
      cms_course_id: val.cms_course_id,
      grade: val.grade
    });
    if (data.error_code == 0) {
      return data.data.lessons;
    }
    return null;
  }
  fetchDashboardData = async function(data) {
    if (!data) {
      const grades = get(gradesStore).grades;
      if (grades && grades.length > 0) {
        data = {
          cms_course_id: grades[0].cms_course_id,
          grade: grades[0].grade
        };
      }
    }
    const summaryData = await getInstitutionCompetitionSummary();
    const [performanceResult, gamesData, lessonData] = await Promise.all([
      getInstitutionCompetitionPerformance(data),
      getInstitutionGamesReport(data),
      getInstitutionLessonsReport(data)
    ]);
    return {
      competitionSummary: summaryData,
      performanceData: performanceResult || null,
      gamesReport: gamesData || null,
      lessonsReport: lessonData || null
    };
  };
  getInstitutionLeaderBoard = async function(time_type, is_school_based, selectedGrade) {
    await waitForGradeData();
    const grades = get(gradesStore).grades;
    const id = get(competitionStore).competition_id;
    let grade = selectedGrade;
    if (!grade && grades && grades.length > 0) {
      grade = grades[0].grade;
    }
    return await request(API_DEFINITIONS.INSTITUTION_USERS_RANKING, {
      competition_id: id,
      grade,
      time_type,
      is_school_based
    }, {});
  };
  getInstitutionSchoolLeaderBoard = async function(time_type, is_school_based, selectedGrade) {
    await waitForGradeData();
    const grades = get(gradesStore).grades;
    const id = get(competitionStore).competition_id;
    let grade = selectedGrade;
    if (!grade && grades && grades.length > 0) {
      grade = grades[0].grade;
    }
    return await request(API_DEFINITIONS.INSTITUTION_SCHOOLS_RANKING, {
      competition_id: id,
      grade,
      time_type,
      is_school_based
    }, {});
  };
  getDashboardReportItems = function(competitionSummary) {
    return [
      {
        icon: IMAGES.TOTAL_GAMES,
        number: competitionSummary.total_games,
        title: "Total Games"
      },
      {
        icon: IMAGES.TOTAL_GAMES_PLAYED,
        number: competitionSummary.games_played,
        title: "Total Games played"
      },
      {
        icon: IMAGES.TOTAL_HOURS_SPENT,
        number: competitionSummary.time_spent_in_seconds,
        title: "Total Time Spent"
      },
      {
        icon: IMAGES.TOTAL_PLAYERS,
        number: competitionSummary.total_players,
        title: "Total Players"
      },
      {
        icon: IMAGES.ACTIVE_PLAYERS,
        number: competitionSummary.active_players,
        title: "Active Players"
      },
      {
        icon: IMAGES.AVG_COMPLETION_RATE,
        number: competitionSummary.avg_completion,
        title: "Average Completion rate"
      }
    ];
  };
});
export {
  __tla,
  getInstitutionSchoolLeaderBoard as a,
  getDashboardReportItems as b,
  fetchDashboardData as f,
  getInstitutionLeaderBoard as g
};
