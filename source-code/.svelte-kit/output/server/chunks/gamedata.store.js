import { s as sessionStore } from "./user.store.js";
import "clsx";
const gameDataStore = sessionStore("gameDataStore", { subject: "" });
export {
  gameDataStore as g
};
