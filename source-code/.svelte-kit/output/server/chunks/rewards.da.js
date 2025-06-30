import "clsx";
import "./user.store.js";
import "lz-string";
import "./client.js";
import "./client2.js";
import { g as getText } from "./language.store.js";
import "./system..da.js";
import "./index2.js";
import { __tla as __tla_0 } from "./api.definitions.js";
let RewardsType;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  RewardsType = [
    {
      label: await getText("all_rewards"),
      value: 0
    },
    {
      label: await getText("earned_rewards"),
      value: 1
    },
    {
      label: await getText("competition_rewards"),
      value: 2
    },
    {
      label: await getText("claimed_redeemed_rewards"),
      value: 3
    }
  ];
});
export {
  RewardsType as R,
  __tla
};
