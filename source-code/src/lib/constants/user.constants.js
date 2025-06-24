import { get } from "svelte/store";
import { userStore } from "../../stores/user.store";

export const USER_TYPE = {
  Normal: 0,
  MCD: 1,
  Safaricom: 2,
};

export const isNormalUser = () => get(userStore)?.user_type === USER_TYPE.Normal;
export const isMCDUser = get(userStore)?.user_type === USER_TYPE.MCD;
export const isSafaricomUser = () => get(userStore)?.user_type === USER_TYPE.Safaricom;
