import { r as request } from "../../../../chunks/api.service.js";
import { g as get } from "../../../../chunks/index3.js";
import { A as API_DEFINITIONS, __tla as __tla_0 } from "../../../../chunks/api.definitions.js";
import { c as competitionStore } from "../../../../chunks/appbar.store.js";
import { c as waitForCompetitionGradeData } from "../../../../chunks/utils.js";
import { p as paymentStore } from "../../../../chunks/payment.store.js";
let load, prerender;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  async function getLearnerPaymentStatus() {
    await waitForCompetitionGradeData();
    const { competition_id, current_grade, is_premium } = get(competitionStore);
    if (is_premium == 0) {
      return null;
    }
    const data = await request(API_DEFINITIONS.PAYMENT_STATUS, {
      competition_id,
      grade: current_grade?.toString(),
      inquiry_type: 1
    });
    if (data.error_code == 0) {
      paymentStore.update((store) => ({
        ...store,
        payment_status: data.data
      }));
      return data.data;
    }
    return null;
  }
  prerender = false;
  load = async function() {
    await getLearnerPaymentStatus();
  };
});
export {
  __tla,
  load,
  prerender
};
