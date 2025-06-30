import { request } from "$lib/api.service";
import { get } from "svelte/store";
import { API_DEFINITIONS } from "../../apis/api.definitions";
import { competitionStore } from "../../stores/competition.store";
import { waitForCompetitionGradeData } from "$lib/utils";
import { paymentStore } from "../../stores/payment.store";
import { appbarStore } from "../../stores/appbar.store";

export async function getLearnerPaymentStatus() {
  await waitForCompetitionGradeData();
  const { competition_id, current_grade, is_premium } = get(competitionStore);
  if (is_premium == 0) {
    return null;
  }

  const data = await request(API_DEFINITIONS.PAYMENT_STATUS, {
    competition_id: competition_id,
    grade: current_grade?.toString(),
    inquiry_type: 1,
  });

  if (data.error_code == 0) {
    paymentStore.update((store) => ({
      ...store,
      payment_status: data.data,
    }));
    appbarStore.update((store) => ({
      ...store,
      isShowPaymentBanner: data.data.is_subscribed === 0,
    }));

    return data.data;
  }
  return null;
}
