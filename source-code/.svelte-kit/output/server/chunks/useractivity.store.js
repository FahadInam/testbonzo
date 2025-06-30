import { s as sessionStore } from "./user.store.js";
import "clsx";
const userActivityStore = sessionStore("userActivityStore", {
  total_coins_earned: 0
});
export {
  userActivityStore as u
};
