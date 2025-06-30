import { s as store_get, u as unsubscribe_stores, p as pop, b as push, f as ensure_array_like, c as bind_props, h as head } from "../../../../chunks/index.js";
import { I as IMAGES } from "../../../../chunks/images.constants.js";
import { S as StartChallenge, u as updateGameData, __tla as __tla_0 } from "../../../../chunks/user.auth.da.js";
import { P as PageHeading } from "../../../../chunks/PageHeading.js";
import { t } from "../../../../chunks/language.store.js";
import { u as userStore } from "../../../../chunks/user.store.js";
import { g as get } from "../../../../chunks/index3.js";
import { b as showWarning } from "../../../../chunks/toast.store.js";
import { A as Avatar } from "../../../../chunks/Avatar.js";
import { I as Image } from "../../../../chunks/Image.js";
import { a as attr } from "../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
import { B as Button } from "../../../../chunks/Button.js";
import { I as IsGuestMode } from "../../../../chunks/utils.js";
import { f as fallback } from "../../../../chunks/utils2.js";
import { g as goto } from "../../../../chunks/client.js";
import { g as gameDataStore } from "../../../../chunks/gamedata.store.js";
import { p as page } from "../../../../chunks/stores.js";
import { b as getCompetitionRecommendation, __tla as __tla_1 } from "../../../../chunks/competitions.da.js";
import "lz-string";
import "../../../../chunks/client2.js";
import "../../../../chunks/system..da.js";
import "../../../../chunks/index2.js";
import { __tla as __tla_2 } from "../../../../chunks/api.definitions.js";
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
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })()
]).then(async () => {
  function CardBanner($$payload, $$props) {
    push();
    var $$store_subs;
    $$payload.out += `<div class="relative my-4 ms-8 me-6 strip-background flex items-center"><img${attr("src", IMAGES.RIBBON_BANNER)} class="w-full" alt="Ribbon Banner"> <div class="absolute -left-4 xs:left-1 flex items-center"><img${attr("src", IMAGES.COINS)} alt="Game-based learning" class="w-[48px] h-[50px] xs:w-[32px] xs:h-[32px]"></div> <p class="absolute left-[38px] xs:left-[50px] text-white text-base font-semibold primary-font pb-1">${escape_html(store_get($$store_subs ??= {}, "$t", t)("three_x_reward_1"))} <span class="font-bold text-amber-300 text-2xl">${escape_html(store_get($$store_subs ??= {}, "$t", t)("three_x_reward_2"))}</span> ${escape_html(store_get($$store_subs ??= {}, "$t", t)("three_x_reward_3"))}</p></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  }
  function AllPlayerChallenged($$payload, $$props) {
    push();
    var $$store_subs;
    $$payload.out += `<div class="relative my-4 strip-background flex items-center h-full"><div class="w-full text-center"><h1 class="text-[#313644] text-2xl sm:text-xl font-semibold">${escape_html(store_get($$store_subs ??= {}, "$t", t)("players_challenged"))}</h1> <p class="text-[#5E5E5E] text-lg sm:text-base max-w-[420px] mx-auto font-poppins font-medium mt-2 mb-6">${escape_html(store_get($$store_subs ??= {}, "$t", t)("players_challenged_dec"))}</p></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  }
  function OpponentSelection($$payload, $$props) {
    push();
    var $$store_subs;
    let data = fallback($$props["data"], () => [], true);
    let title = fallback($$props["title"], "Recently Played");
    let isLoading = fallback($$props["isLoading"], false);
    let skeletonCount = fallback($$props["skeletonCount"], 9);
    let callback = fallback($$props["callback"], (user, mode) => {
    });
    let icon = fallback($$props["icon"], "");
    let Mode = fallback($$props["Mode"], 0);
    let isLocked = fallback($$props["isLocked"], false);
    let selected_user = {};
    let isGuestMode = false;
    const StartAction = (selected_mode) => {
      callback(selected_user, selected_mode);
    };
    if (store_get($$store_subs ??= {}, "$userStore", userStore)) {
      isGuestMode = IsGuestMode();
    }
    $$payload.out += `<div${attr("class", `bg-white rounded-[20px] shadow-lg overflow-hidden flex flex-col w-full max-w-[510px] lg:w-[48%] xl:w-[500px] ${isGuestMode ? "min-h-[400px]" : "min-h-[500px]"}`)}><div class="bg-blue-900 text-white py-2 md:py-3 flex justify-center items-center gap-4">`;
    Image($$payload, {
      src: icon,
      width: "40",
      height: "40"
    });
    $$payload.out += `<!----> <h2 class="text-xl font-semibold">${escape_html(store_get($$store_subs ??= {}, "$t", t)(title))}</h2></div> `;
    if (Mode === 1) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="w-full">`;
      CardBanner($$payload);
      $$payload.out += `<!----></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div${attr("class", `p-4 flex-col flex-grow  overflow-y-auto ${isGuestMode ? "h-[200px]" : "h-[300px]"}`)}>`;
    if (isLoading) {
      $$payload.out += "<!--[-->";
      if (Mode === 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="flex flex-wrap justify-center items-center gap-4 h-full"><div class="flex flex-col justify-center items-center gap-3 p-4 bg-white animate-pulse w-[30%] max-w-[250px] min-w-[150px]"><div class="w-12 h-12 bg-gray-200 rounded-full"></div> <div class="flex flex-col items-center space-y-2 w-full"><div class="w-3/4 h-4 bg-gray-200 rounded"></div> <div class="w-1/2 h-3 bg-gray-200 rounded"></div></div></div></div>`;
      } else {
        $$payload.out += "<!--[!-->";
        const each_array = ensure_array_like(Array(skeletonCount));
        $$payload.out += `<div class="flex flex-wrap justify-center gap-4"><!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          each_array[$$index];
          $$payload.out += `<div class="flex flex-col items-center justify-center gap-3 p-4 bg-white animate-pulse w-[28%] max-w-[200px] min-w-[120px]"><div class="w-12 h-12 bg-gray-200 rounded-full"></div> <div class="flex flex-col items-center space-y-2 w-full"><div class="w-3/4 h-4 bg-gray-200 rounded"></div> <div class="w-1/2 h-3 bg-gray-200 rounded"></div></div></div>`;
        }
        $$payload.out += `<!--]--></div>`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array_1 = ensure_array_like(data);
      if (isLocked) {
        $$payload.out += "<!--[-->";
        AllPlayerChallenged($$payload);
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> <div class="flex flex-wrap justify-center items-center gap-4 h-full"><!--[-->`;
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let user = each_array_1[$$index_1];
        $$payload.out += `<div${attr("class", `flex flex-col items-center justify-center p-4 rounded-xl w-[28%] max-w-[200px] min-w-[120px] transition-all duration-300
    ${isLocked ? "bg-gray-200 cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-gray-100 focus:outline-none focus:bg-gray-200"}`)} role="button"${attr("tabindex", isLocked ? -1 : 0)}>`;
        Avatar($$payload, {
          t: user.profile_picture,
          s: 70,
          u: 70,
          ml: "auto",
          mr: "auto"
        });
        $$payload.out += `<!----> `;
        if (!user.is_guest_mode) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="flex flex-col items-center w-full mt-2"><span class="font-medium text-sm truncate w-full text-center text-gray-600"${attr("title", user.name)}>${escape_html(user.name)}</span></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]--></div> `;
    if (Mode === 1) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="h-2"></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="bg-gray-100 p-4 flex justify-center mt-auto w-full">`;
    if (isLoading) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="w-1/4 h-10 bg-gray-200 rounded animate-pulse"></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      Button($$payload, {
        label: store_get($$store_subs ??= {}, "$t", t)("start"),
        size: "medium",
        type: Mode === 0 ? "3d-primary" : "3d-secondary",
        customClass: "w-[170px] text-lg md:text-[22px]",
        onClick: () => {
          StartAction(Mode);
        }
      });
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
      Mode,
      isLocked
    });
    pop();
  }
  function OptionPicker($$payload, $$props) {
    push();
    let title = fallback($$props["title"], "Select Grade");
    let options = fallback($$props["options"], () => [
      {
        value: "",
        label: "Select Grade"
      },
      {
        value: "1",
        label: "Grade 1"
      }
    ], true);
    let iconSrc = fallback($$props["iconSrc"], () => IMAGES.CHANGE_GRADE_ICON, true);
    let onSelect = $$props["onSelect"];
    const each_array = ensure_array_like(options);
    $$payload.out += `<div class="w-full mx-auto bg-white rounded-[20px] shadow-lg overflow-hidden opacity-100"><div class="bg-blue-900 text-white py-2 flex justify-center items-center gap-4"><div class="flex items-center">`;
    if (iconSrc) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<img${attr("src", iconSrc)} class="w-11 h-12 m-1 mr-3" alt="Grade Icon">`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <span class="text-xl font-semibold">${escape_html(title)}</span></div></div> <div class="p-9"><select class="w-full dropdown cursor-pointer border border-gray-600 border-1 text-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring focus:ring-blue-300"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let option = each_array[$$index];
      $$payload.out += `<option${attr("value", option.value)} class="cursor-pointer">${escape_html(option.label)}</option>`;
    }
    $$payload.out += `<!--]--></select></div></div>`;
    bind_props($$props, {
      title,
      options,
      iconSrc,
      onSelect
    });
    pop();
  }
  _page = function($$payload, $$props) {
    push();
    var $$store_subs;
    let isGuest;
    let data = store_get($$store_subs ??= {}, "$page", page).state;
    let gameData = {};
    let isLoading = true;
    async function StartChallengeCallback(Opponent, playMode) {
      if (playMode === 1 && !Object.keys(Opponent).length) return showWarning();
      if (playMode === 0) console.log("Single Player");
      const response = await StartChallenge(gameData, Opponent, playMode);
      const subject = get(gameDataStore);
      if (response.error_code === 0) {
        updateGameData({
          opponent: Opponent,
          playMode,
          matchData: response.data,
          subjectData: {
            summary_id: response?.data?.summary_id,
            match_id: response?.data?.match_id,
            content_id: subject?.content_id,
            base_points: response?.data?.base_points
          },
          matchingItem: subject,
          link: subject?.link
        });
        get(gameDataStore);
        goto();
      }
    }
    const handleSelect = async (subject) => {
      const Opponent = data.opponent;
      const playMode = 1;
      const res = await getCompetitionRecommendation();
      const matchingItem = res.data.find((item) => item.subject === subject);
      const response = await StartChallenge(matchingItem, Opponent, playMode);
      if (response.error_code === 0) {
        updateGameData({
          opponent: Opponent,
          playMode,
          matchData: response.data,
          subjectData: {
            summary_id: response?.data?.summary_id,
            match_id: response?.data?.match_id,
            content_id: matchingItem?.content_id
          },
          matchingItem,
          link: matchingItem?.link
        });
        get(gameDataStore);
        goto();
      }
    };
    isGuest = get(userStore)?.is_guest_mode;
    head($$payload, ($$payload2) => {
      $$payload2.title = `<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("select_mode"))}</title>`;
    });
    $$payload.out += `<div class="flex justify-center w-full"><div class="w-full max-w-screen-xl space-y-6"><div class="w-full mb-8">`;
    PageHeading($$payload, {
      icon: IMAGES.SELECT_OPPONENT_ICON,
      title: data.fromFriends ? "select_subject" : "select_mode",
      imageClass: "w-9 h-10 sm:w-12 sm:h-11"
    });
    $$payload.out += `<!----></div> `;
    if (data.fromFriends) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div><h1><div class="flex items-center justify-center max-w-xl w-full bg-transparent rounded-lg p-8 mx-auto text-center space-y-10">`;
      OptionPicker($$payload, {
        title: store_get($$store_subs ??= {}, "$t", t)("select_subject"),
        options: data.subject,
        onSelect: handleSelect
      });
      $$payload.out += `<!----></div></h1></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="flex flex-wrap justify-center w-full gap-9 px-4 sm:px-6 md:px-8 lg:px-6">`;
      OpponentSelection($$payload, {
        data: [],
        title: "single_mode",
        icon: IMAGES.SINGLE_PLAYER_ICON,
        Mode: 0,
        callback: StartChallengeCallback,
        isLoading
      });
      $$payload.out += `<!----> `;
      if (!isGuest) {
        $$payload.out += "<!--[-->";
        OpponentSelection($$payload, {
          data: [],
          title: "challenge_mode",
          icon: IMAGES.MULTIPLAYER_PLAYER_ICON,
          Mode: 1,
          callback: StartChallengeCallback,
          isLoading,
          isLocked: false
        });
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
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
