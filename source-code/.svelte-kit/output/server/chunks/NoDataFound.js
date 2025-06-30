import { c as attr, e as escape_html, d as bind_props, p as pop, b as push } from "./index.js";
import { I as IMAGES } from "./images.constants.js";
import { f as fallback } from "./utils2.js";
function NoDataFound($$payload, $$props) {
  push();
  let noDataMsg = fallback($$props["noDataMsg"], "");
  let backgroundColor = fallback($$props["backgroundColor"], "bg-black/30");
  let textColor = fallback($$props["textColor"], "text-white");
  let customClass = fallback($$props["customClass"], "shadow-lg");
  $$payload.out += `<div class="w-full flex justify-center items-center"><div${attr("class", `w-full p-6 rounded-2xl ${customClass} ${backgroundColor}`)}><div class="flex justify-center mb-4"><img${attr("src", noDataMsg === "ALL_GAMES_PLAYED" ? IMAGES.ALL_GAMES_COMPLETED : IMAGES.NO_DATA_FOUND_IMAGE)} alt="Game-based learning" class="w-32 sm:w-48 md:w-64"></div> <p${attr("class", `text-center text-lg font-semibold ${textColor}`)}>${escape_html(noDataMsg || "No Data Found")}</p></div></div>`;
  bind_props($$props, {
    noDataMsg,
    backgroundColor,
    textColor,
    customClass
  });
  pop();
}
export {
  NoDataFound as N
};
