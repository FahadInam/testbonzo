import { g as get } from "./index3.js";
import { u as userStore } from "./user.store.js";
const USER_TYPE = {
  Normal: 0,
  MCD: 1,
  Safaricom: 2
};
const isNormalUser = () => get(userStore)?.user_type === USER_TYPE.Normal;
get(userStore)?.user_type === USER_TYPE.MCD;
const isSafaricomUser = () => get(userStore)?.user_type === USER_TYPE.Safaricom;
export {
  USER_TYPE as U,
  isNormalUser as a,
  isSafaricomUser as i
};
