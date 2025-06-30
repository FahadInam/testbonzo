import "./client.js";
import { w as writable } from "./index3.js";
import "./client2.js";
import "clsx";
const navigationStore = writable({ back_url: "/" });
function setBackUrl(back_url) {
  navigationStore.set({ back_url });
}
const competitionStore = writable({
  url: null,
  name: null,
  current_grade: null,
  competition_id: null,
  is_lesson_page_hide: null,
  is_games_page: null,
  is_premium: null
});
const appbarStore = writable({
  visible: false,
  backLabel: "",
  isLogoVisible: false,
  isCoinVisible: false,
  isBackButtonVisible: true,
  isVoucherButtonVisible: false,
  isVoucherModalVisible: false,
  isNotificationVisible: false,
  isShowPaymentBanner: false,
  isShowRules: false,
  isProfileVisible: true
});
export {
  appbarStore as a,
  competitionStore as c,
  navigationStore as n,
  setBackUrl as s
};
