import { s as store_get, k as copy_payload, l as assign_payload, u as unsubscribe_stores, p as pop, b as push, h as head, e as escape_html, j as ensure_array_like, c as attr, m as spread_props } from "../../../../../../chunks/index.js";
import { o as onDestroy } from "../../../../../../chunks/index-server.js";
import { t } from "../../../../../../chunks/language.store.js";
import { m as mapGrades, __tla as __tla_0 } from "../../../../../../chunks/competitions.da.js";
import { g as getTopCandidates, L as LeaderboardCard, T as Table } from "../../../../../../chunks/leaderboards.da.js";
import { S as SelectBox } from "../../../../../../chunks/SelectBox.js";
import { I as IMAGES } from "../../../../../../chunks/images.constants.js";
import { P as PageHeading } from "../../../../../../chunks/PageHeading.js";
import { g as getInstitutionLeaderBoard, a as getInstitutionSchoolLeaderBoard, __tla as __tla_1 } from "../../../../../../chunks/admin.competition.da.js";
import { T as TabSwitch } from "../../../../../../chunks/TabSwitch.js";
import { a as gradesStore } from "../../../../../../chunks/utils.js";
import "../../../../../../chunks/client.js";
import "../../../../../../chunks/client2.js";
import { a as appbarStore } from "../../../../../../chunks/appbar.store.js";
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
  _page = function($$payload, $$props) {
    push();
    var $$store_subs;
    let users = [];
    let currentUser = [];
    let topCandidates = [];
    let mergedUsers = [];
    let time_type = 0;
    let isLoading = true;
    let interval;
    let selectedTab = 0;
    let gradeOptions = [];
    let selectedGrade = null;
    let LeaderboardFilters = [
      {
        value: "0",
        label: store_get($$store_subs ??= {}, "$t", t)("all_time_leaderboard")
      },
      {
        value: "1",
        label: store_get($$store_subs ??= {}, "$t", t)("daily")
      },
      {
        value: "2",
        label: store_get($$store_subs ??= {}, "$t", t)("weekly")
      },
      {
        value: "3",
        label: store_get($$store_subs ??= {}, "$t", t)("monthly")
      }
    ];
    appbarStore.set({
      isLogoVisible: false,
      isBackButtonVisible: true,
      isVoucherButtonVisible: false,
      backLabel: "Competitions",
      isProfileVisible: true
    });
    let rankImages = {
      1: IMAGES.POSITION_1_ICON,
      2: IMAGES.POSITION_2_ICON,
      3: IMAGES.POSITION_3_ICON
    };
    async function fetchLeaderboard() {
      isLoading = true;
      clearInterval(interval);
      let data;
      if (selectedTab === 0) {
        data = await getInstitutionLeaderBoard(time_type, 0, selectedGrade);
      } else {
        data = await getInstitutionSchoolLeaderBoard(time_type, 1, selectedGrade);
      }
      if (data?.data?.users?.length > 0) {
        users = data.data.users;
        currentUser = data.data.current_user;
        if (currentUser != null) {
          mergedUsers = [
            currentUser,
            ...users
          ];
        } else {
          mergedUsers = [
            ...users
          ];
        }
      } else if (data?.data?.schools?.length > 0) {
        users = data.data.schools;
        currentUser = null;
        mergedUsers = [
          ...users
        ];
      }
      topCandidates = await getTopCandidates(currentUser, users);
      console.log(topCandidates, "topCandidates here");
      interval = setInterval(fetchLeaderboard, 6e4);
      isLoading = false;
    }
    onDestroy(() => clearInterval(interval));
    if (selectedTab !== void 0) {
      fetchLeaderboard();
    }
    if (store_get($$store_subs ??= {}, "$gradesStore", gradesStore)?.grades && store_get($$store_subs ??= {}, "$gradesStore", gradesStore)?.grades.length > 0) {
      gradeOptions = mapGrades(store_get($$store_subs ??= {}, "$gradesStore", gradesStore)?.grades);
    }
    let $$settled = true;
    let $$inner_payload;
    function $$render_inner($$payload2) {
      head($$payload2, ($$payload3) => {
        $$payload3.title = `<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("leaderboard"))}</title>`;
      });
      $$payload2.out += `<div class="flex justify-center w-full px-4 sm:px-6 md:px-8 lg:px-10"><div class="w-full max-w-screen-lg space-y-6"><div class="w-full relative"><div class="flex flex-col xl:flex-row xl:justify-between items-center w-full gap-4"><div class="flex items-center gap-3 xl:absolute xl:left-1/2 xl:transform xl:-translate-x-1/2">`;
      PageHeading($$payload2, {
        customClass: "xl:mr-10",
        icon: IMAGES.LEADERBOARD_ICON,
        title: "players",
        imageClass: "w-9 h-11 sm:w-13 sm:h-11"
      });
      $$payload2.out += `<!----></div> <div class="w-full xl:w-auto flex justify-center xl:ml-auto"><div class="flex flex-row gap-4 justify-center md:justify-end">`;
      if (gradeOptions.length > 0) {
        $$payload2.out += "<!--[-->";
        SelectBox($$payload2, {
          width: "100%",
          customClass: "w-20 min-w-[140px] md:min-w-[185px]",
          options: gradeOptions,
          onSelect: async (data) => {
            selectedGrade = data;
            fetchLeaderboard();
          }
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      SelectBox($$payload2, {
        width: "100%",
        customClass: "w-20 min-w-[140px] md:min-w-[185px]",
        options: LeaderboardFilters,
        onSelect: async (data) => {
          time_type = parseInt(data, 10);
          fetchLeaderboard();
        }
      });
      $$payload2.out += `<!----></div></div></div></div> <div class="flex justify-center items-center">`;
      TabSwitch($$payload2, {
        tabs: [
          store_get($$store_subs ??= {}, "$t", t)("individual"),
          store_get($$store_subs ??= {}, "$t", t)("schools")
        ],
        className: "gap-6 w-full max-w-[540px] text-center",
        get selectedTab() {
          return selectedTab;
        },
        set selectedTab($$value) {
          selectedTab = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></div> `;
      if (topCandidates.length > 0) {
        $$payload2.out += "<!--[-->";
        const each_array = ensure_array_like([
          1,
          0,
          2
        ]);
        $$payload2.out += `<div class="flex justify-evenly items-end mt-8 md:mt-24 mb-4 md:mb-12"><!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let index = each_array[$$index];
          $$payload2.out += `<div${attr("class", `leaderboard-card relative flex flex-col items-center w-1/3 sm:w-auto
    ${index === 0 ? "max-w-[240px] scale-125 xl:max-w-[220px] xl:scale-115 lg:max-w-[200px] lg:scale-110 md:max-w-[160px] md:scale-90 sm:max-w-[110px] sm:scale-65 max-[640px]:max-w-[80px] max-[640px]:scale-70" : "max-w-[200px] scale-100 xl:max-w-[180px] xl:scale-95 lg:max-w-[160px] lg:scale-90 md:max-w-[140px] md:scale-80 sm:max-w-[90px] sm:scale-60 max-[640px]:max-w-[70px] max-[640px]:scale-55"}`)}>`;
          LeaderboardCard($$payload2, spread_props([
            topCandidates?.[index] ?? {},
            {
              isLoading
            }
          ]));
          $$payload2.out += `<!----></div>`;
        }
        $$payload2.out += `<!--]--></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (users.length > 0) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="w-full mb-20 md:mb-10">`;
        Table($$payload2, {
          columns: [
            {
              label: store_get($$store_subs ??= {}, "$t", t)("rank"),
              key: "rank",
              type: "text",
              width: "10%"
            },
            {
              label: store_get($$store_subs ??= {}, "$t", t)("players"),
              key: "name",
              type: "avatar",
              width: "70%"
            },
            {
              label: store_get($$store_subs ??= {}, "$t", t)("coins_earned"),
              key: "total_points",
              type: "icon",
              width: "20%"
            }
          ],
          data: mergedUsers,
          isLoading,
          rankImages
        });
        $$payload2.out += `<!----></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div></div>`;
    }
    do {
      $$settled = true;
      $$inner_payload = copy_payload($$payload);
      $$render_inner($$inner_payload);
    } while (!$$settled);
    assign_payload($$payload, $$inner_payload);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  };
});
export {
  __tla,
  _page as default
};
