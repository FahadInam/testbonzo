import { s as sessionStore } from "./user.store.js";
import "clsx";
const gameDataStore = sessionStore("gameDataStore", { subject: "" });
const userActivityStore = sessionStore("userActivityStore", {
  total_coins_earned: 0
});
export {
  gameDataStore as g,
  userActivityStore as u
};
