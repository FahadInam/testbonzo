import { d as stringify, c as bind_props, p as pop, b as push, f as ensure_array_like, h as head, s as store_get, u as unsubscribe_stores } from "../../../../../../chunks/index.js";
import { o as onDestroy } from "../../../../../../chunks/index-server.js";
import { P as PageHeading } from "../../../../../../chunks/PageHeading.js";
import { I as IMAGES } from "../../../../../../chunks/images.constants.js";
import { t } from "../../../../../../chunks/language.store.js";
import { g as gotoURL } from "../../../../../../chunks/navigation.service.js";
import { g as gameDataStore } from "../../../../../../chunks/gamedata.store.js";
import { g as getGameContentType, a as getRandomSubjectImage } from "../../../../../../chunks/GameCard.svelte_svelte_type_style_lang.js";
import { f as fallback } from "../../../../../../chunks/utils2.js";
import { a as attr } from "../../../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../../../chunks/escaping.js";
import "clsx";
import { s as sideBarAndAppBarSettings } from "../../../../../../chunks/utils.js";
function GameCard($$payload, $$props) {
  push();
  let completion = fallback($$props["completion"], null);
  let data = fallback($$props["data"], () => [], true);
  let onClick = $$props["onClick"];
  let gameContentType = getGameContentType(data);
  let Subject = getRandomSubjectImage(data.subject);
  $$payload.out += `<button class="bg-white rounded-[20px] shadow-lg p-3 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[450px] relative cursor-pointer transition-transform duration-200 hover:scale-100 sm:hover:scale-102 card-button-shadow"><div class="flex flex-col items-center rounded-2xl"${attr("style", `background-color: ${stringify(Subject?.color)};`)}><div class="bg-black opacity-90 w-full sm:w-72 md:w-50 bonzo-text-yellow rounded-xl rounded-b-none sm:rounded-b-2xl sm:rounded-t-none py-1 px-4 text-center font-medium text-base sm:text-lg svelte-1h86haf">${escape_html(data.subject)}</div> <div class="flex space-x-2 sm:space-x-4 mb-3 sm:mb-4 items-center w-full p-3 sm:p-4 px-4"><img${attr("src", Subject?.image)} class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain" alt="Subject icon"> <div class="truncate-4line text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] font-semibold text-white break-words text-left">${escape_html(data.topic)}</div></div></div> <div class="flex justify-between items-end px-2.5"><div${attr("class", `${stringify(`${completion ? "bonzo-bg-green" : ""} font-medium text-white mt-2 rounded-full w-13 h-7 sm:w-12 md:w-14 flex items-center justify-center`)} svelte-1h86haf`)}>${escape_html(completion)}</div></div> <div class="bonzo-bg-blue text-sm bottom-2 sm:bottom-6 sm:text-lg rounded-s-full py-2 sm:py-3 px-3 sm:px-4 text-white font-medium flex items-center space-x-1 sm:space-x-2 absolute right-0 svelte-1h86haf"><img${attr("src", gameContentType.content_type_image)} class="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain" alt="Game icon"> <span class="ps-1 font-medium text-sm sm:text-sm md:text-base lg:text-lg">${escape_html(gameContentType.content_type_label)}</span></div></button>`;
  bind_props($$props, { completion, data, onClick });
  pop();
}
const preProcessLessonGames = (title, list) => {
  const filteredByskill = list.filter((item) => item.skill === title);
  if (filteredByskill.length <= 1) return filteredByskill;
  let singleMcqIndex = filteredByskill.findIndex(
    (item) => item.type.toLowerCase() === "mcq"
  );
  if (singleMcqIndex !== -1) {
    const [singleMcq] = filteredByskill.splice(singleMcqIndex, 1);
    filteredByskill.push(singleMcq);
  }
  return filteredByskill;
};
function LessonListing($$payload, $$props) {
  push();
  let index = $$props["index"];
  let item = $$props["item"];
  let list = $$props["list"];
  const listToShow = preProcessLessonGames(item.skill, list);
  function GamePlay(data) {
    gameDataStore.set({ ...data });
    gotoURL("/challenge");
  }
  const each_array = ensure_array_like(listToShow);
  $$payload.out += `<div class="flex flex-col w-full p-4 box-border items-center"><div class="bg-black/50 w-full flex flex-col max-w-lg p-3 md:p-4 rounded-2xl md:rounded-3xl overflow-hidden text-white transition-shadow duration-300 ease-in-out"><h2 class="text-center text-white m-0 p-0 font-medium text-lg md:text-xl lg:text-2xl leading-tight">${escape_html(`${index + 1}. ${item.skill}`)}</h2></div> <div class="mt-4 flex flex-col w-full gap-4 items-center"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let game = each_array[$$index];
    GameCard($$payload, {
      data: game,
      title: game.topic,
      onClick: () => {
        GamePlay(game);
      }
    });
  }
  $$payload.out += `<!--]--></div></div>`;
  bind_props($$props, { index, item, list });
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let list = [];
  let games = [];
  onDestroy(() => {
    sideBarAndAppBarSettings(true, "competitions", "/competitions");
  });
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("lessons_listing"))}</title>`;
  });
  PageHeading($$payload, {
    icon: IMAGES.LESSON_IMAGE,
    title: "lessons_listing",
    imageClass: "w-9 h-11 sm:w-13 sm:h-9"
  });
  $$payload.out += `<!----> `;
  {
    $$payload.out += "<!--[!-->";
    const each_array = ensure_array_like(games);
    $$payload.out += `<!--[-->`;
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let game = each_array[index];
      LessonListing($$payload, { item: game, list, index });
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
