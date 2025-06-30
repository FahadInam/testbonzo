import { f as ensure_array_like, c as bind_props, s as store_get, h as head, u as unsubscribe_stores, p as pop, b as push, k as spread_props } from "../../../../../chunks/index.js";
import { o as onDestroy } from "../../../../../chunks/index-server.js";
import { t } from "../../../../../chunks/language.store.js";
import { g as getCompetitionLeaderBoard, __tla as __tla_0 } from "../../../../../chunks/competitions.da.js";
import { g as getTopCandidates, L as LeaderboardCard, T as Table } from "../../../../../chunks/leaderboards.da.js";
import { S as SelectBox } from "../../../../../chunks/SelectBox.js";
import { I as IMAGES } from "../../../../../chunks/images.constants.js";
import { P as PageHeading } from "../../../../../chunks/PageHeading.js";
import { f as fallback } from "../../../../../chunks/utils2.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
import { a as attr } from "../../../../../chunks/attributes.js";
let _page;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function LeaderboardSkeleton($$payload, $$props) {
    let itemsCount = fallback($$props["itemsCount"], 3);
    let leaderboardItems = fallback($$props["leaderboardItems"], 6);
    const each_array = ensure_array_like(Array(itemsCount));
    const each_array_1 = ensure_array_like(Array(leaderboardItems));
    $$payload.out += `<div class="grid grid-cols-3 gap-4 mb-6 sm:mt-10 mx-auto max-w-4xl"><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      each_array[i];
      $$payload.out += `<div class="flex flex-col items-center"><div class="sm:w-24 sm:h-24 w-20 h-20 bg-gray-300 animate-pulse rounded-full mb-2"></div> <div class="sm:w-32 w-28 h-6 bg-gray-300 animate-pulse rounded-lg mb-1"></div> <div class="w-16 h-4 bg-gray-300 animate-pulse rounded-lg"></div></div>`;
    }
    $$payload.out += `<!--]--></div> <div class="mx-auto max-w-4xl bg-white rounded-3xl p-4 sm:mt-8 shadow-md"><div class="flex gap-4 p-3 pt-1 border-b border-gray-300"><div class="w-12 h-6 bg-gray-300 animate-pulse rounded-lg"></div> <div class="flex-1 sm:ml-4"><div class="max-w-40 h-6 bg-gray-300 animate-pulse rounded-lg"></div></div> <div class="max-w-[120px] w-full h-6 bg-gray-300 animate-pulse rounded-lg"></div></div> <!--[-->`;
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      each_array_1[i];
      $$payload.out += `<div class="flex gap-4 p-3 border-b last:border-none border-gray-200"><div class="w-10 h-10 bg-gray-300 animate-pulse rounded-xl"></div> <div class="flex flex-1 sm:ml-6 items-center gap-2"><div class="w-9 h-9 bg-gray-300 animate-pulse rounded-full"></div> <div class="max-w-60 w-full h-6 bg-gray-300 animate-pulse rounded-lg"></div></div> <div class="flex items-center gap-2"><div class="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div> <div class="w-20 h-6 bg-gray-300 animate-pulse rounded-lg"></div></div></div>`;
    }
    $$payload.out += `<!--]--></div>`;
    bind_props($$props, {
      itemsCount,
      leaderboardItems
    });
  }
  _page = function($$payload, $$props) {
    push();
    var $$store_subs;
    let users = [];
    let currentUser = [];
    let topCandidates = [];
    let mergedUsers = [];
    let time_type = 0;
    let is_school_based = 0;
    let isLoading = true;
    let interval;
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
    let rankImages = {
      1: IMAGES.POSITION_1_ICON,
      2: IMAGES.POSITION_2_ICON,
      3: IMAGES.POSITION_3_ICON
    };
    async function fetchLeaderboard() {
      isLoading = true;
      clearInterval(interval);
      const data = await getCompetitionLeaderBoard(time_type, is_school_based);
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
        topCandidates = await getTopCandidates(currentUser, users);
      }
      interval = setInterval(fetchLeaderboard, 6e4);
      isLoading = false;
    }
    onDestroy(() => clearInterval(interval));
    head($$payload, ($$payload2) => {
      $$payload2.title = `<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("leaderboard"))}</title>`;
    });
    $$payload.out += `<div class="flex justify-center w-full px-4 sm:px-6 md:px-8 lg:px-10"><div class="w-full max-w-screen-lg space-y-6"><div class="w-full relative"><div class="flex flex-col sm:flex-row sm:justify-between items-center w-full gap-4"><div class="flex items-center gap-3 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">`;
    PageHeading($$payload, {
      icon: IMAGES.LEADERBOARD_ICON,
      title: "leaderboard",
      imageClass: "w-9 h-11 sm:w-13 sm:h-11"
    });
    $$payload.out += `<!----></div> <div class="w-full sm:w-auto flex justify-center sm:ml-auto">`;
    SelectBox($$payload, {
      customClass: "w-36",
      options: LeaderboardFilters,
      onSelect: async (data) => {
        time_type = parseInt(data, 10);
        fetchLeaderboard();
      }
    });
    $$payload.out += `<!----></div></div></div> `;
    if (isLoading) {
      $$payload.out += "<!--[-->";
      LeaderboardSkeleton($$payload, {});
    } else {
      $$payload.out += "<!--[!-->";
      if (topCandidates.length > 0) {
        $$payload.out += "<!--[-->";
        const each_array = ensure_array_like([
          1,
          0,
          2
        ]);
        $$payload.out += `<div class="flex justify-evenly items-end mt-8 md:mt-24 mb-4 md:mb-12"><!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let index = each_array[$$index];
          $$payload.out += `<div${attr("class", `leaderboard-card relative flex flex-col items-center w-1/3 sm:w-auto
    ${index === 0 ? "max-w-[240px] scale-125 xl:max-w-[220px] xl:scale-115 lg:max-w-[200px] lg:scale-110 md:max-w-[160px] md:scale-90 sm:max-w-[110px] sm:scale-65 max-[640px]:max-w-[80px] max-[640px]:scale-70" : "max-w-[200px] scale-100 xl:max-w-[180px] xl:scale-95 lg:max-w-[160px] lg:scale-90 md:max-w-[140px] md:scale-80 sm:max-w-[90px] sm:scale-60 max-[640px]:max-w-[70px] max-[640px]:scale-55"}`)}>`;
          LeaderboardCard($$payload, spread_props([
            topCandidates?.[index] ?? {},
            {
              isLoading
            }
          ]));
          $$payload.out += `<!----></div>`;
        }
        $$payload.out += `<!--]--></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (users.length > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="w-full mb-20 md:mb-10">`;
        Table($$payload, {
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
        $$payload.out += `<!----></div>`;
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
