import { b as push, f as ensure_array_like, d as stringify, c as bind_props, p as pop } from "./index.js";
import { A as Avatar } from "./Avatar.js";
import { I as Image } from "./Image.js";
import { I as IMAGES } from "./images.constants.js";
import { f as fallback } from "./utils2.js";
import { a as attr } from "./attributes.js";
import { e as escape_html } from "./escaping.js";
function Table($$payload, $$props) {
  push();
  let columns = fallback($$props["columns"], () => [], true);
  let data = fallback($$props["data"], () => [], true);
  let rankImages = fallback($$props["rankImages"], () => ({}), true);
  let isLoading = fallback($$props["isLoading"], false);
  function getRankImage(rank) {
    return rankImages[rank] || void 0;
  }
  const each_array = ensure_array_like(columns);
  $$payload.out += `<div class="w-full bg-white rounded-3xl shadow-md" style="clip-path: inset(0 0 0 0 round 24px);"><div class="bg-[var(--theme-dark-blue)] sticky top-0 z-10 flex"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let column = each_array[$$index];
    $$payload.out += `<div class="px-2 md:px-4 py-3 text-left font-fredoka text-sm font-normal text-white capitalize"${attr("style", `width: ${stringify(column.width)}`)}>${escape_html(column.label)}</div>`;
  }
  $$payload.out += `<!--]--></div> <div>`;
  if (isLoading) {
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(Array(5));
    $$payload.out += `<!--[-->`;
    for (let rowIndex = 0, $$length = each_array_1.length; rowIndex < $$length; rowIndex++) {
      each_array_1[rowIndex];
      const each_array_2 = ensure_array_like(columns);
      $$payload.out += `<div class="flex first:bg-blue-100 even:bg-gray-100 animate-pulse top-[40px] z-10"><!--[-->`;
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let column = each_array_2[$$index_1];
        $$payload.out += `<div class="px-2 md:px-4 py-2"${attr("style", `width: ${stringify(column.width)}`)}>`;
        if (column.type === "avatar") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="inline-block w-6 h-6 md:w-8 md:h-8 bg-gray-300 rounded-full mr-2"></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="h-4 bg-gray-300 rounded w-2/3 md:w-3/4"></div></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array_3 = ensure_array_like(data);
    $$payload.out += `<!--[-->`;
    for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
      let row = each_array_3[i];
      const each_array_4 = ensure_array_like(columns);
      $$payload.out += `<div class="flex first:bg-[var(--primary-color)] even:bg-gray-100"><!--[-->`;
      for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
        let column = each_array_4[$$index_3];
        $$payload.out += `<div class="px-1 md:px-4 py-2 text-left flex items-center"${attr("style", `width: ${stringify(column.width)}`)}><div class="flex items-center gap-2 w-full">`;
        if (column.key === "rank") {
          $$payload.out += "<!--[-->";
          if (getRankImage(row[column.key])) {
            $$payload.out += "<!--[-->";
            Image($$payload, {
              src: getRankImage(row[column.key]),
              className: "w-7 h-7 md:w-9 md:h-9 ps-1"
            });
          } else {
            $$payload.out += "<!--[!-->";
            $$payload.out += `<div${attr("class", `w-7 h-7 md:h-9 md:w-9 ms-0.5 md:ms-0 text-white font-medium text-sm flex items-center justify-center clip-hexagon ${row[column.key] === 1 ? "bg-blue-800" : "bg-blue-400"}`)}>${escape_html(row[column.key])}</div>`;
          }
          $$payload.out += `<!--]-->`;
        } else {
          $$payload.out += "<!--[!-->";
          if (column.key === "name") {
            $$payload.out += "<!--[-->";
            Avatar($$payload, {
              t: row.profile_picture || IMAGES.SCHOOL_AVATAR,
              s: 40,
              u: 40,
              ml: 0,
              mr: 0
            });
            $$payload.out += `<!----> <div class="truncate font-fredoka font-medium text-sm md:text-base text-gray-600">${escape_html(row[column.key])}</div>`;
          } else {
            $$payload.out += "<!--[!-->";
            if (column.key === "total_points") {
              $$payload.out += "<!--[-->";
              Image($$payload, { src: IMAGES.COINS, width: "20", height: "20" });
              $$payload.out += `<!----> <div class="truncate font-fredoka font-medium text-sm md:text-base text-gray-600">${escape_html(row[column.key])}</div>`;
            } else {
              $$payload.out += "<!--[!-->";
              $$payload.out += `<div class="truncate font-fredoka font-medium text-sm md:text-base text-gray-600">${escape_html(row[column.key])}</div>`;
            }
            $$payload.out += `<!--]-->`;
          }
          $$payload.out += `<!--]-->`;
        }
        $$payload.out += `<!--]--></div></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div></div>`;
  bind_props($$props, { columns, data, rankImages, isLoading });
  pop();
}
function LeaderboardCard($$payload, $$props) {
  push();
  let username = fallback($$props["username"], "");
  let profile_picture = fallback($$props["profile_picture"], "");
  let rank = fallback($$props["rank"], 1);
  let stars = fallback($$props["stars"], 3);
  let size = fallback($$props["size"], "medium");
  let isLoading = fallback($$props["isLoading"], false);
  let name = fallback($$props["name"], "");
  $$payload.out += `<div${attr("class", `relative flex flex-col items-center ${size === "large" ? "scale-125" : ""}`)}>`;
  if (isLoading) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(Array(stars).fill(0));
    $$payload.out += `<div class="animate-pulse flex flex-col items-center"><div class="w-20 h-20 md:w-24 md:h-24 bg-gray-700 rounded-full"></div> <div class="flex space-x-1 mt-2"><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      each_array[i];
      $$payload.out += `<div class="w-4 h-4 bg-gray-600 rounded"></div>`;
    }
    $$payload.out += `<!--]--></div> <div class="w-6 h-6 bg-gray-600 rounded-full mt-2"></div> <div class="w-24 h-4 bg-gray-700 rounded mt-2"></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="absolute w-32 h-32 bg-blue-500 rounded-full blur-2xl opacity-50"></div> <div class="relative z-10">`;
    Avatar($$payload, {
      t: profile_picture || IMAGES.SCHOOL_AVATAR,
      s: 100,
      u: 100,
      ml: "auto",
      mr: "auto"
    });
    $$payload.out += `<!----> `;
    if (rank === 1) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="absolute inset-0 flex justify-center items-center w-[350px] -left-32 -z-1 -top-20">`;
      Image($$payload, { src: IMAGES.RAYS_ICON, className: "w-full" });
      $$payload.out += `<!----></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="absolute -top-7 flex space-x-1 -mt-2 z-20">`;
    if (rank === 1) {
      $$payload.out += "<!--[-->";
      Image($$payload, { src: IMAGES.STARS_THREE, className: "w-18" });
    } else {
      $$payload.out += "<!--[!-->";
      if (rank === 2) {
        $$payload.out += "<!--[-->";
        Image($$payload, { src: IMAGES.STARS_TWO, className: "w-16" });
      } else {
        $$payload.out += "<!--[!-->";
        if (rank === 3) {
          $$payload.out += "<!--[-->";
          Image($$payload, { src: IMAGES.STARS_ONE, className: "w-10" });
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></div> <div class="absolute bottom-12 left-4 w-9 h-10 z-20">`;
    if (rank === 1) {
      $$payload.out += "<!--[-->";
      Image($$payload, { src: IMAGES.POSITION_1_ICON });
    } else {
      $$payload.out += "<!--[!-->";
      if (rank === 2) {
        $$payload.out += "<!--[-->";
        Image($$payload, { src: IMAGES.POSITION_2_ICON });
      } else {
        $$payload.out += "<!--[!-->";
        if (rank === 3) {
          $$payload.out += "<!--[-->";
          Image($$payload, { src: IMAGES.POSITION_3_ICON });
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></div> <div class="w-[150px]"><p class="pt-4 text-white text-md font-semibold truncate overflow-hidden text-lg font-poppins">${escape_html(username || name)}</p></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, {
    username,
    profile_picture,
    rank,
    stars,
    size,
    isLoading,
    name
  });
  pop();
}
async function getTopCandidates(currentUser, users) {
  return new Promise((resolve) => {
    let sortedUsers = [...users].sort(
      (a, b) => b.total_points - a.total_points
    );
    let topUsers = sortedUsers.slice(0, 3);
    if (!currentUser) {
      resolve(topUsers);
      return;
    }
    let isCurrentUserInTop = topUsers.some(
      (user) => user.username === currentUser.username
    );
    if (!isCurrentUserInTop) {
      let lowestTopUser = topUsers[topUsers.length - 1];
      if (currentUser.total_points > lowestTopUser.total_points) {
        topUsers.pop();
        topUsers.push(currentUser);
      }
    }
    topUsers = [
      ...new Map(topUsers.map((user) => [user.username, user])).values()
    ];
    resolve(topUsers.slice(0, 3));
  });
}
export {
  LeaderboardCard as L,
  Table as T,
  getTopCandidates as g
};
