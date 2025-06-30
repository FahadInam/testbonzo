import { e as escape_html, s as store_get, j as ensure_array_like, c as attr, u as unsubscribe_stores, d as bind_props, p as pop, b as push, h as head } from "../../../../../chunks/index.js";
import { o as onDestroy } from "../../../../../chunks/index-server.js";
import { s as sideBarAndAppBarSettings } from "../../../../../chunks/utils.js";
import { t } from "../../../../../chunks/language.store.js";
import "clsx";
import { g as goto } from "../../../../../chunks/client.js";
import "../../../../../chunks/client2.js";
import { I as IMAGES } from "../../../../../chunks/images.constants.js";
import "../../../../../chunks/avatar2.js";
import { f as fallback } from "../../../../../chunks/utils2.js";
import { I as Image } from "../../../../../chunks/Image.js";
import { B as Button } from "../../../../../chunks/Button.js";
function gotoURL(url) {
  {
    goto();
  }
}
function Result($$payload, $$props) {
  push();
  var $$store_subs;
  let data = fallback($$props["data"], () => [], true);
  let title = fallback($$props["title"], "Recently Played");
  let isLoading = fallback($$props["isLoading"], false);
  let skeletonCount = fallback($$props["skeletonCount"], 6);
  let callback = fallback($$props["callback"], (user, mode) => {
  });
  let icon = fallback($$props["icon"], "");
  let Mode = fallback($$props["Mode"], 0);
  let isLocked = fallback($$props["isLocked"], false);
  let selected_user = {};
  const StartAction = (selected_mode) => {
    callback(selected_user, selected_mode);
  };
  $$payload.out += `<div class="bg-white rounded-[20px] shadow-lg overflow-hidden flex flex-col min-h-[500px] w-full max-w-[500px] lg:w-[48%] xl:w-[500px]"><div class="bg-blue-900 text-white py-2 md:py-3 flex justify-center items-center gap-4">`;
  Image($$payload, { src: icon, width: "40", height: "40" });
  $$payload.out += `<!----> <h2 class="text-xl font-semibold">${escape_html(store_get($$store_subs ??= {}, "$t", t)(title))}</h2></div> <div class="p-4 flex-col flex-grow h-[400px] overflow-y-auto">`;
  if (isLoading) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(Array(skeletonCount));
    $$payload.out += `<div class="flex flex-wrap justify-center gap-4"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      each_array[$$index];
      $$payload.out += `<div class="flex flex-col items-center gap-3 p-4 bg-white rounded-xl shadow-md animate-pulse w-[30%] max-w-[250px] min-w-[150px]"><div class="w-12 h-12 bg-gray-200 rounded-full"></div> <div class="flex flex-col items-center space-y-2 w-full"><div class="w-3/4 h-4 bg-gray-200 rounded"></div> <div class="w-1/2 h-3 bg-gray-200 rounded"></div></div> <div class="w-12 h-6 bg-gray-200 rounded-full"></div></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array_1 = ensure_array_like(data);
    $$payload.out += `<div class="flex flex-wrap justify-center items-center gap-4 h-full"><!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      each_array_1[$$index_1];
      $$payload.out += `<div${attr("class", `flex flex-col items-center justify-center p-4 rounded-xl w-[28%] max-w-[200px] min-w-[120px] transition-all duration-300
            ${isLocked ? "bg-gray-200 cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"}`)} role="button"${attr("tabindex", isLocked ? -1 : 0)}><div class="flex flex-col items-center w-full mt-2"><span class="font-medium text-sm truncate w-full text-center text-gray-600"></span></div></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="bg-gray-100 p-4 flex justify-center mt-auto w-full">`;
  Button($$payload, {
    label: store_get($$store_subs ??= {}, "$t", t)("start"),
    size: "medium",
    type: "3d-primary",
    customClass: "w-[130px]",
    onClick: () => {
      StartAction(Mode);
    }
  });
  $$payload.out += `<!----></div></div>`;
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
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let metaData;
  onDestroy(() => {
    sideBarAndAppBarSettings(false, "competitions", "/competitions");
  });
  function Back(data) {
    gotoURL();
  }
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("lessons_listing"))}</title>`;
  });
  Result($$payload, {
    data: [metaData],
    title: "single_mode",
    icon: IMAGES.SINGLE_PLAYER_ICON,
    Mode: 0,
    callback: Back
  });
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
