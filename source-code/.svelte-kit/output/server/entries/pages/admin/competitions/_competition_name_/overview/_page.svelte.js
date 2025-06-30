import { c as attr, e as escape_html, d as bind_props, j as ensure_array_like, b as push, f as stringify, p as pop, s as store_get, u as unsubscribe_stores } from "../../../../../../chunks/index.js";
import { I as IMAGES } from "../../../../../../chunks/images.constants.js";
import "clsx";
import "../../../../../../chunks/user.store.js";
import "lz-string";
import "../../../../../../chunks/client.js";
import "../../../../../../chunks/client2.js";
import "../../../../../../chunks/language.store.js";
import { a as gradesStore } from "../../../../../../chunks/utils.js";
import "../../../../../../chunks/system..da.js";
import "../../../../../../chunks/index2.js";
import { f as fallback } from "../../../../../../chunks/utils2.js";
import { A as Avatar } from "../../../../../../chunks/Avatar.js";
import { P as PageHeading } from "../../../../../../chunks/PageHeading.js";
import { S as SelectBox } from "../../../../../../chunks/SelectBox.js";
import { f as fetchDashboardData, b as getDashboardReportItems, __tla as __tla_0 } from "../../../../../../chunks/admin.competition.da.js";
import { m as mapGrades, a as mapSubjects, __tla as __tla_1 } from "../../../../../../chunks/competitions.da.js";
let _page;
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
  function GameStatsCard($$payload, $$props) {
    let number = fallback($$props["number"], 0);
    let title = fallback($$props["title"], "Total Games");
    let icon = fallback($$props["icon"], "");
    $$payload.out += `<div class="w-full max-w-md bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center"><div class="w-12 h-12 text-gray-600 mb-4"><img${attr("src", icon)}${attr("alt", title)} class="w-full h-full object-contain"></div> <div class="text-4xl font-semibold text-gray-700">${escape_html(number ?? 0)}</div> <div class="text-lg text-gray-500 mt-1">${escape_html(title)}</div></div>`;
    bind_props($$props, {
      number,
      title,
      icon
    });
  }
  function OverviewSkeletonLoader($$payload, $$props) {
    let isLoading = fallback($$props["isLoading"], true);
    if (isLoading) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(Array(3));
      const each_array_1 = ensure_array_like(Array(2));
      const each_array_3 = ensure_array_like(Array(2));
      $$payload.out += `<div class="animate-pulse"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"><!--[-->`;
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        each_array[i];
        $$payload.out += `<div class="bg-gray-200 rounded-lg p-6 flex flex-col"><div class="flex items-center mb-4"><div class="w-10 h-10 rounded-full bg-gray-300 mr-3"></div> <div class="h-5 bg-gray-300 rounded w-1/2"></div></div> <div class="h-8 bg-gray-300 rounded w-1/3 mb-2"></div></div>`;
      }
      $$payload.out += `<!--]--></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"><!--[-->`;
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        each_array_1[i];
        const each_array_2 = ensure_array_like(Array(3));
        $$payload.out += `<div class="bg-gray-200 rounded-lg p-6"><div class="h-6 bg-gray-300 rounded w-1/3 mb-6"></div> <!--[-->`;
        for (let j = 0, $$length2 = each_array_2.length; j < $$length2; j++) {
          each_array_2[j];
          $$payload.out += `<div class="flex items-center justify-between py-3 border-b border-gray-300"><div class="flex items-center"><div class="w-8 h-8 rounded-full bg-gray-300 mr-3"></div> <div class="h-4 bg-gray-300 rounded w-24"></div></div> <div class="h-4 bg-gray-300 rounded w-12"></div></div>`;
        }
        $$payload.out += `<!--]--></div>`;
      }
      $$payload.out += `<!--]--></div> <div class="flex flex-col gap-8 my-8"><!--[-->`;
      for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
        each_array_3[i];
        const each_array_4 = ensure_array_like(Array(3));
        $$payload.out += `<div class="bg-gray-200 rounded-lg p-6"><div class="h-6 bg-gray-300 rounded w-1/4 mb-6"></div> <div class="space-y-4"><!--[-->`;
        for (let j = 0, $$length2 = each_array_4.length; j < $$length2; j++) {
          each_array_4[j];
          $$payload.out += `<div class="flex flex-col"><div class="flex justify-between mb-2"><div class="h-4 bg-gray-300 rounded w-1/3"></div> <div class="h-4 bg-gray-300 rounded w-16"></div></div> <div class="h-4 bg-gray-300 rounded-full w-full"></div></div>`;
        }
        $$payload.out += `<!--]--></div></div>`;
      }
      $$payload.out += `<!--]--></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
    bind_props($$props, {
      isLoading
    });
  }
  function LearnerPerformanceCard($$payload, $$props) {
    push();
    let performers = fallback($$props["performers"], () => [], true);
    let title = fallback($$props["title"], "Struggling Performers");
    $$payload.out += `<div class="bg-blue-900 rounded-[20px] pt-4 w-full shadow-lg flex flex-col"><h2 class="text-white font-bold text-xl mb-4 text-center">${escape_html(title)}</h2> `;
    if (performers && performers.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(performers);
      $$payload.out += `<div class="space-y-3 bg-white rounded-b-[20px] px-4 py-3 flex-grow"><!--[-->`;
      for (let index = 0, $$length = each_array.length; index < $$length; index++) {
        let performer = each_array[index];
        $$payload.out += `<div${attr("class", `flex items-center justify-between p-2 rounded-[15px] ${stringify(index % 2 === 1 ? "bg-[#F5F6F7]" : "bg-white")}`)}><div class="flex items-center gap-3"><div class="relative">`;
        Avatar($$payload, {
          t: performer.profile_picture,
          s: 30,
          u: 30,
          ml: "auto",
          mr: "auto"
        });
        $$payload.out += `<!----></div> <span class="text-gray-500 font-medium truncate max-w-xs">${escape_html(performer.name)}</span></div> <span class="text-gray-500 font-medium">${escape_html(performer.avg_score.toFixed(2))}%</span></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="bg-white rounded-b-[20px] p-6 flex flex-col items-center justify-center flex-grow"><img${attr("src", IMAGES.NO_DATA_FOUND_IMAGE)} alt="No data" class="w-40 h-40 mb-4"> <p class="text-gray-500 text-center">No data to display</p></div>`;
    }
    $$payload.out += `<!--]--></div>`;
    bind_props($$props, {
      performers,
      title
    });
    pop();
  }
  function ProgressCard($$payload, $$props) {
    push();
    let formattedData;
    let title = fallback($$props["title"], "Progress");
    let data = fallback($$props["data"], () => [], true);
    let columns = fallback($$props["columns"], void 0);
    let description = fallback($$props["description"], "");
    let bgColor = fallback($$props["bgColor"], "bg-blue-900");
    let textColor = fallback($$props["textColor"], "text-white");
    function getValue(item, column) {
      return column.key ? item[column.key] : item[column];
    }
    console.log(data, "data here ");
    formattedData = !columns && data && data.length > 0 && data[0].lesson_name ? [
      {
        [data[0].lesson_name]: `${data[0].avg_completion}%`
      },
      {
        [`${data[0].completed_by} of ${data[0].total_players} have completed`]: ""
      }
    ] : data;
    $$payload.out += `<div class="rounded-[20px] overflow-hidden shadow-md"><div${attr("class", `${stringify(bgColor)} ${stringify(textColor)} p-4 font-bold text-center text-xl`)}>${escape_html(title)}</div> <div class="p-6 bg-white">`;
    if (columns) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(columns);
      const each_array_1 = ensure_array_like(data);
      $$payload.out += `<div class="flex w-full mb-4"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let column = each_array[$$index];
        $$payload.out += `<div class="flex-1 font-semibold text-gray-700">${escape_html(column.label || column)}</div>`;
      }
      $$payload.out += `<!--]--></div> <!--[-->`;
      for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
        let item = each_array_1[$$index_2];
        const each_array_2 = ensure_array_like(columns);
        $$payload.out += `<div class="flex w-full py-2 border-b border-gray-100 last:border-0"><!--[-->`;
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let column = each_array_2[$$index_1];
          $$payload.out += `<div class="flex-1">${escape_html(getValue(item, column))}</div>`;
        }
        $$payload.out += `<!--]--></div>`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array_3 = ensure_array_like(formattedData);
      $$payload.out += `<!--[-->`;
      for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
        let item = each_array_3[i];
        $$payload.out += `<div${attr("class", `py-2 ${stringify(i !== 0 ? "pt-4" : "")}`)}><div class="flex flex-col">`;
        if (i === 0 && description) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div><div class="font-semibold text-gray-700">${escape_html(Object.keys(item)[0])}</div> <div class="text-sm text-gray-500 mt-1">${escape_html(description)}</div></div> <div class="mt-4 text-right font-bold text-gray-800">${escape_html(Object.values(item)[0])}</div>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<div class="flex justify-between items-center"><div class="font-semibold text-gray-700">${escape_html(Object.keys(item)[0])}</div> <div class="font-bold text-gray-800">${escape_html(Object.values(item)[0])}</div></div>`;
        }
        $$payload.out += `<!--]--></div></div>`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></div></div>`;
    bind_props($$props, {
      title,
      data,
      columns,
      description,
      bgColor,
      textColor
    });
    pop();
  }
  _page = function($$payload, $$props) {
    push();
    var $$store_subs;
    let reportItems, topPerformers, strugglingLearners;
    let competitionSummary = null;
    let performanceData = null;
    let gamesReport = null;
    let lessonReport = null;
    let isLoading = true;
    let gradeOptions = [];
    let subjectOptions = [];
    let selectedGrade = "";
    let selectedSubject = "";
    async function loadDashboardData(gradeValue, subjectValue) {
      console.log("Loading dashboard data for grade:", gradeValue, "and subject:", subjectValue);
      isLoading = true;
      try {
        const gradeIndex = store_get($$store_subs ??= {}, "$gradesStore", gradesStore)?.grades.findIndex((item) => item.grade.toString() === gradeValue.toString());
        const subjectIndex = store_get($$store_subs ??= {}, "$gradesStore", gradesStore)?.grades.findIndex((item) => item.subject === subjectValue);
        if (gradeIndex !== -1 && subjectIndex !== -1) {
          const data = {
            cms_course_id: store_get($$store_subs ??= {}, "$gradesStore", gradesStore)?.grades[subjectIndex].cms_course_id,
            grade: store_get($$store_subs ??= {}, "$gradesStore", gradesStore)?.grades[gradeIndex].grade
          };
          const dashboardData = await fetchDashboardData(data);
          competitionSummary = dashboardData.competitionSummary;
          performanceData = dashboardData.performanceData;
          gamesReport = dashboardData.gamesReport;
          lessonReport = dashboardData.lessonsReport;
        }
      } finally {
        isLoading = false;
      }
    }
    function updateSubjectsForGrade(grade) {
      console.log("Selected grade:", grade);
      const filteredSubjects = store_get($$store_subs ??= {}, "$gradesStore", gradesStore)?.grades.filter((item) => item.grade.toString() === grade.toString()).map((item) => item.subject);
      subjectOptions = mapSubjects(store_get($$store_subs ??= {}, "$gradesStore", gradesStore)?.grades.filter((item) => filteredSubjects.includes(item.subject)));
      if (filteredSubjects.length > 0) {
        selectedSubject = filteredSubjects[0];
      }
    }
    function updateGradeForSubject(subject) {
      const selectedGradeFromSubject = store_get($$store_subs ??= {}, "$gradesStore", gradesStore)?.grades.find((item) => item.subject === subject)?.grade;
      if (selectedGradeFromSubject) {
        selectedGrade = selectedGradeFromSubject;
      }
    }
    const columns = [
      {
        key: "title",
        label: "Games"
      },
      {
        key: "avg_score",
        label: "Avg.Score"
      },
      {
        key: "completion_percentage",
        label: "Completed By"
      }
    ];
    reportItems = competitionSummary ? getDashboardReportItems(competitionSummary) : [];
    topPerformers = performanceData?.top || [];
    strugglingLearners = performanceData?.struggling || [];
    if (store_get($$store_subs ??= {}, "$gradesStore", gradesStore)?.grades && store_get($$store_subs ??= {}, "$gradesStore", gradesStore)?.grades.length > 0) {
      console.log("Grades Store Updated:", store_get($$store_subs ??= {}, "$gradesStore", gradesStore).grades);
      gradeOptions = mapGrades(store_get($$store_subs ??= {}, "$gradesStore", gradesStore)?.grades);
    }
    $$payload.out += `<div class="flex justify-center w-full px-4 sm:px-6 md:px-8 lg:px-10"><div class="w-full max-w-screen-lg space-y-6"><div class="w-full relative"><div class="flex flex-col xl:flex-row xl:justify-between items-center w-full gap-4"><div class="flex items-center gap-3 xl:absolute xl:left-1/2 xl:transform xl:-translate-x-1/2">`;
    PageHeading($$payload, {
      customClass: "xl:mr-10",
      icon: IMAGES.LEADERBOARD_ICON,
      title: "overview",
      imageClass: "w-9 h-10 sm:w-13 sm:h-11"
    });
    $$payload.out += `<!----></div> <div class="w-full xl:w-auto flex justify-center xl:ml-auto"><div class="flex flex-row gap-2 justify-center md:justify-end">`;
    if (gradeOptions.length > 0) {
      $$payload.out += "<!--[-->";
      SelectBox($$payload, {
        width: "100%",
        customClass: "w-20 min-w-[140px] md:min-w-[185px]",
        options: gradeOptions,
        selectedValue: selectedGrade,
        onSelect: async (data) => {
          selectedGrade = data;
          updateSubjectsForGrade(data);
          await loadDashboardData(data, selectedSubject);
        }
      });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (subjectOptions.length > 0) {
      $$payload.out += "<!--[-->";
      SelectBox($$payload, {
        width: "100%",
        customClass: "w-20 min-w-[140px] md:min-w-[185px]",
        options: subjectOptions,
        selectedValue: selectedSubject,
        onSelect: async (data) => {
          selectedSubject = data;
          updateGradeForSubject(data);
          await loadDashboardData(selectedGrade, data);
        }
      });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div></div></div> `;
    OverviewSkeletonLoader($$payload, {
      isLoading
    });
    $$payload.out += `<!----> `;
    if (!isLoading && competitionSummary) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(reportItems);
      $$payload.out += `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        $$payload.out += `<div class="sm:col-span-1 sm:place-self-auto col-span-1 place-self-center max-w-sm w-full">`;
        GameStatsCard($$payload, {
          number: item.number,
          title: item.title,
          icon: item.icon
        });
        $$payload.out += `<!----></div>`;
      }
      $$payload.out += `<!--]--></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">`;
      LearnerPerformanceCard($$payload, {
        performers: topPerformers,
        title: "Top Performers"
      });
      $$payload.out += `<!----> `;
      LearnerPerformanceCard($$payload, {
        performers: strugglingLearners,
        title: "Struggling Performers"
      });
      $$payload.out += `<!----></div> <div class="flex flex-col gap-8 my-8">`;
      ProgressCard($$payload, {
        title: "Competition Progress",
        data: lessonReport
      });
      $$payload.out += `<!----> `;
      ProgressCard($$payload, {
        title: "Games Progress",
        data: gamesReport,
        columns
      });
      $$payload.out += `<!----></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      if (!isLoading) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="p-6 text-center"><p class="text-gray-600">No competition data available.</p></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  };
});
export {
  __tla,
  _page as default
};
