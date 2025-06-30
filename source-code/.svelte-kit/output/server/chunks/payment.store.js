import { s as sessionStore } from "./user.store.js";
import "clsx";
const paymentStore = sessionStore("paymentStore", {
  competition_id: null,
  current_grade: null,
  url: null,
  payment_status: null
});
export {
  paymentStore as p
};
