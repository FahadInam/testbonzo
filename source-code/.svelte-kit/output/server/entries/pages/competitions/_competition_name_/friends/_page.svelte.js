import { c as bind_props, p as pop, b as push, f as ensure_array_like, s as store_get, d as stringify, u as unsubscribe_stores, h as head } from "../../../../../chunks/index.js";
import { t } from "../../../../../chunks/language.store.js";
import { c as searchFriends, e as extractSubjects, __tla as __tla_0 } from "../../../../../chunks/competitions.da.js";
import { f as fallback } from "../../../../../chunks/utils2.js";
import { a as attr } from "../../../../../chunks/attributes.js";
import { A as Avatar } from "../../../../../chunks/Avatar.js";
import { I as Image } from "../../../../../chunks/Image.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
import "clsx";
import "../../../../../chunks/user.store.js";
import "lz-string";
import { g as goto } from "../../../../../chunks/client.js";
import "../../../../../chunks/client2.js";
import "../../../../../chunks/system..da.js";
import "../../../../../chunks/index2.js";
import "../../../../../chunks/gamedata.store.js";
import { __tla as __tla_1 } from "../../../../../chunks/api.definitions.js";
import "notyf";
import "../../../../../chunks/useractivity.store.js";
import { I as IMAGES } from "../../../../../chunks/images.constants.js";
import { P as PageHeading } from "../../../../../chunks/PageHeading.js";
import { N as NoDataFound } from "../../../../../chunks/NoDataFound.js";
import { L as ListBoxSkeleton } from "../../../../../chunks/ListBoxSkeleton.js";
import "../../../../../chunks/avatar2.js";
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
  function SearchBar($$payload, $$props) {
    push();
    let onSearch = fallback($$props["onSearch"], (query) => {
    });
    let searchQuery = "";
    function clearSearch() {
      searchQuery = "";
      onSearch("");
    }
    if (searchQuery === "") {
      clearSearch();
    }
    $$payload.out += `<div class="w-full"><div class="relative"><input type="text"${attr("value", searchQuery)} placeholder="Search your friends by their name" class="w-full px-4 py-3 pr-10 rounded-full bg-blue-900/60 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300" aria-label="Search your friends"> `;
    if (searchQuery) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button class="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-xl" aria-label="Clear search"><i class="i i-cross"></i></button>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<button class="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-2xl pointer-events-none" aria-label="Search"><i class="i i-search2"></i></button>`;
    }
    $$payload.out += `<!--]--></div></div>`;
    bind_props($$props, {
      onSearch
    });
    pop();
  }
  function SkeletonList($$payload, $$props) {
    let skeletonCount = fallback($$props["skeletonCount"], 6);
    const each_array = ensure_array_like(Array(skeletonCount));
    $$payload.out += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      each_array[$$index];
      $$payload.out += `<div class="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md animate-pulse"><div class="w-12 h-12 bg-gray-200 rounded-full"></div> <div class="flex flex-col flex-1 space-y-2"><div class="w-3/4 h-4 bg-gray-200 rounded"></div> <div class="w-1/2 h-3 bg-gray-200 rounded"></div></div> <div class="ml-auto w-12 h-6 bg-gray-200 rounded-full"></div></div>`;
    }
    $$payload.out += `<!--]--></div>`;
    bind_props($$props, {
      skeletonCount
    });
  }
  function ListBox($$payload, $$props) {
    push();
    var $$store_subs;
    let data = fallback($$props["data"], () => [], true);
    let title = fallback($$props["title"], "Recently Played");
    let isLoading = fallback($$props["isLoading"], false);
    let skeletonCount = fallback($$props["skeletonCount"], 6);
    let callback = fallback($$props["callback"], (game) => {
    });
    let icon = fallback($$props["icon"], "");
    let isMobile = fallback($$props["isMobile"], false);
    function getBgClass(index) {
      if (isMobile) {
        return index % 2 === 0 ? "bg-gray-100 hover:bg-gray-200" : "bg-white hover:bg-gray-100";
      } else {
        return index % 4 === 0 || index % 4 === 1 ? "bg-gray-100 hover:bg-gray-200" : "bg-white hover:bg-gray-100";
      }
    }
    isMobile = window.innerWidth < 768;
    $$payload.out += `<div class="max-w-5xl mx-auto bg-white rounded-[20px] shadow-lg overflow-hidden opacity-100"><div class="bg-blue-900 text-white py-2 flex justify-center items-center gap-4">`;
    Image($$payload, {
      src: icon,
      alt: "Section Icon",
      className: "w-11 h-12"
    });
    $$payload.out += `<!----> <h2 class="text-xl font-semibold">${escape_html(store_get($$store_subs ??= {}, "$t", t)(title))}</h2></div> <div class="p-4 max-h-[400px] overflow-y-auto">`;
    if (isLoading) {
      $$payload.out += "<!--[-->";
      SkeletonList($$payload, {
        skeletonCount
      });
    } else {
      $$payload.out += "<!--[!-->";
      const each_array = ensure_array_like(data);
      $$payload.out += `<div${attr("class", `grid gap-4 ${data.length > 0 && data[0].two_column_split ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`)}><!--[-->`;
      for (let index = 0, $$length = each_array.length; index < $$length; index++) {
        let game = each_array[index];
        $$payload.out += `<div${attr("class", `flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-300 ${stringify(getBgClass(index))}`)} role="button" tabindex="0">`;
        if (game.profile_picture) {
          $$payload.out += "<!--[-->";
          Avatar($$payload, {
            t: game.profile_picture,
            s: 50,
            u: 50,
            ml: 0,
            mr: 0
          });
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<span>${escape_html(index + 1)}</span>`;
        }
        $$payload.out += `<!--]--> <div class="flex flex-col items-start text-gray-800 overflow-hidden"><span class="font-medium text-base font-fredoka truncate w-full text-left">${escape_html(game.primaryText ?? game.mode)}</span> <span class="text-sm text-gray-500 font-fredoka font-light">${escape_html(game.result)}</span> <span class="text-sm text-gray-500 font-fredoka font-light">${escape_html(game.secondaryText)}</span></div> <div class="ml-auto flex items-center gap-2">`;
        if (game.dualAction) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<button>`;
          Image($$payload, {
            src: game.badgeIcon,
            className: game.badgeClass
          });
          $$payload.out += `<!----></button> <button>`;
          Image($$payload, {
            src: game.badgeIcon2,
            className: game.badgeClass
          });
          $$payload.out += `<!----></button>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<button>`;
          Image($$payload, {
            src: game.badgeIcon,
            className: game.badgeClass
          });
          $$payload.out += `<!----></button>`;
        }
        $$payload.out += `<!--]--></div></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]--></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, {
      data,
      title,
      isLoading,
      skeletonCount,
      callback,
      icon,
      isMobile
    });
    pop();
  }
  function Listings($$payload, $$props) {
    push();
    let listings = fallback($$props["listings"], () => [], true);
    let structuredData = [];
    let isLoading = fallback($$props["isLoading"], false);
    let title = fallback($$props["title"], "");
    let type = fallback($$props["type"], "");
    let icon = fallback($$props["icon"], "");
    let onItemClick = fallback($$props["onItemClick"], (data, type2) => {
      console.log("Item clicked", data, type2);
    });
    ListBox($$payload, {
      data: structuredData,
      title,
      isLoading,
      callback: onItemClick,
      icon
    });
    bind_props($$props, {
      listings,
      isLoading,
      title,
      type,
      icon,
      onItemClick
    });
    pop();
  }
  _page = function($$payload, $$props) {
    push();
    var $$store_subs;
    let friends_recommendation = [];
    let search_result = [];
    let existing_users = [];
    let isLoading = true;
    let isSearchDone = false;
    async function searchHandler(query) {
      if (!query) {
        isSearchDone = false;
        search_result = [];
        return;
      }
      try {
        isLoading = true;
        const data = await searchFriends(query);
        search_result = data?.data.users ?? [];
        isSearchDone = true;
      } catch (error) {
        console.error("Error searching friends:", error);
      } finally {
        isLoading = false;
      }
    }
    async function PlayChallenge(data) {
      console.log("PlayChallenge", data);
      const subjects = await extractSubjects();
      goto("/challenge/selection", {
        state: {
          opponent: {
            name: data.name,
            profile_picture: data.profile_picture,
            user_id: data.user_id || data.id
          }
        }
      });
      console.log(subjects, "subjects");
    }
    head($$payload, ($$payload2) => {
      $$payload2.title = `<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("friends"))}</title>`;
    });
    $$payload.out += `<div class="flex justify-center w-full px-4 sm:px-6 md:px-8 lg:px-10"><div class="w-full max-w-screen-lg space-y-6"><div class="w-full">`;
    PageHeading($$payload, {
      icon: IMAGES.FRIENDS_ICON,
      title: "friends",
      imageClass: "w-9 h-11 sm:w-13 sm:h-11"
    });
    $$payload.out += `<!----></div> <div class="w-full mb-9">`;
    SearchBar($$payload, {
      onSearch: searchHandler
    });
    $$payload.out += `<!----></div> `;
    if (isLoading) {
      $$payload.out += "<!--[-->";
      ListBoxSkeleton($$payload, {});
    } else {
      $$payload.out += "<!--[!-->";
      if (!isSearchDone && existing_users.length > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="w-full overflow-x-hidden mt-5 mb-20 md:mb-10">`;
        Listings($$payload, {
          listings: existing_users,
          title: "my_friend_list",
          type: "my_friend_list",
          icon: IMAGES.FRIENDS_LIST_ICON,
          isLoading,
          onItemClick: PlayChallenge
        });
        $$payload.out += `<!----></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (!isSearchDone && friends_recommendation.length > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="w-full overflow-x-hidden mt-5 mb-20 md:mb-10">`;
        Listings($$payload, {
          listings: friends_recommendation,
          title: "recommendations",
          type: "is_friend_recommendation",
          icon: IMAGES.FRIENDS_RECOMMENDED_ICON,
          isLoading,
          onItemClick: PlayChallenge
        });
        $$payload.out += `<!----></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (!isSearchDone && !friends_recommendation.length && !existing_users.length) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="w-full overflow-x-hidden mt-5 mb-20 md:mb-10">`;
        NoDataFound($$payload, {});
        $$payload.out += `<!----></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (isSearchDone && search_result.length > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="w-full overflow-x-hidden mt-5 mb-20 md:mb-10">`;
        Listings($$payload, {
          listings: search_result,
          title: "searched_friends",
          type: "is_friend_searched",
          isLoading,
          icon: IMAGES.FRIENDS_LIST_ICON,
          onItemClick: PlayChallenge
        });
        $$payload.out += `<!----></div>`;
      } else {
        $$payload.out += "<!--[!-->";
        if (isSearchDone && !search_result.length) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="w-full overflow-x-hidden mt-5 mb-20 md:mb-10">`;
          NoDataFound($$payload, {});
          $$payload.out += `<!----></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
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
