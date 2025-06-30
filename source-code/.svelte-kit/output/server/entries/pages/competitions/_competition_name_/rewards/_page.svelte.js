import { j as ensure_array_like, d as bind_props, k as copy_payload, l as assign_payload, p as pop, b as push, h as head, e as escape_html, s as store_get, u as unsubscribe_stores } from "../../../../../chunks/index.js";
import { t } from "../../../../../chunks/language.store.js";
import { P as PageHeading } from "../../../../../chunks/PageHeading.js";
import { R as RewardsType, __tla as __tla_0 } from "../../../../../chunks/rewards.da.js";
import { I as IMAGES } from "../../../../../chunks/images.constants.js";
import "../../../../../chunks/client.js";
import { g as get } from "../../../../../chunks/index3.js";
import "../../../../../chunks/client2.js";
import { S as SelectBox } from "../../../../../chunks/SelectBox.js";
import "notyf";
import { u as userStore } from "../../../../../chunks/user.store.js";
import { f as fallback } from "../../../../../chunks/utils2.js";
let _page;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function RewardsSkeleton($$payload, $$props) {
    let itemsCount = fallback($$props["itemsCount"], 6);
    const each_array = ensure_array_like(Array(itemsCount));
    $$payload.out += `<div class="grid grid-cols-1 mb-6 mx-auto max-w-[310px] sm:max-w-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      each_array[i];
      $$payload.out += `<div class="bg-white mb-5 rounded-[20px] card-button-shadow max-w-[310px] w-full mx-auto p-2"><div class="h-48 bg-gray-300 animate-pulse rounded-2xl mb-5"></div> <div class="mx-3 mb-4 h-7 bg-gray-300 animate-pulse rounded-lg"></div> <div class="flex mb-4 gap-6 mx-3 space-y-2"><div class="flex-[.5] h-5 bg-gray-300 animate-pulse rounded-lg"></div> <div class="flex-[.5] h-5 bg-gray-300 animate-pulse rounded-lg"></div></div> <div class="mx-3 mb-2 h-11 bg-gray-300 animate-pulse rounded-lg"></div></div>`;
    }
    $$payload.out += `<!--]--></div>`;
    bind_props($$props, {
      itemsCount
    });
  }
  _page = function($$payload, $$props) {
    push();
    var $$store_subs;
    let selectedRewardsType = 0;
    get(userStore).name;
    function handleRewardsTypeChange(value) {
      selectedRewardsType = value;
      RewardsType[value]?.label || "";
    }
    let $$settled = true;
    let $$inner_payload;
    function $$render_inner($$payload2) {
      head($$payload2, ($$payload3) => {
        $$payload3.title = `<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("rewards"))}</title>`;
      });
      $$payload2.out += `<div class="flex justify-center w-full px-4 sm:px-6 md:px-8 lg:px-10"><div class="w-full max-w-screen-lg space-y-6"><div class="w-full relative"><div class="flex flex-col sm:flex-row sm:justify-between items-center w-full gap-4"><div class="flex items-center gap-3 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">`;
      PageHeading($$payload2, {
        icon: IMAGES.REWARDS_ICON,
        title: "rewards",
        imageClass: "w-9 h-11 sm:w-10 sm:h-11"
      });
      $$payload2.out += `<!----></div> <div class="w-full sm:w-auto flex justify-center sm:ml-auto">`;
      SelectBox($$payload2, {
        customClass: "w-56",
        options: RewardsType.map((type) => ({
          ...type,
          value: type.value
        })),
        onSelect: (value) => handleRewardsTypeChange(Number(value)),
        get value() {
          return selectedRewardsType;
        },
        set value($$value) {
          selectedRewardsType = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></div></div></div> `;
      {
        $$payload2.out += "<!--[-->";
        RewardsSkeleton($$payload2, {});
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
