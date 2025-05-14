import { request } from "$lib/api.service";
import { get } from "svelte/store";
import { API_DEFINITIONS } from "../../apis/api.definitions";
import { userStore } from "../../stores/user.store";

export async function getAdminPaymentStatus() {
  const school_id = get(userStore).school_id;
  const data = await request(API_DEFINITIONS.PAYMENT_STATUS, {
    competition_id: school_id,
    grade: "0",
    inquiry_type: 1,
  });

  if (data.error_code == 0 && data.data != null) {
    return data.data;
  }
  return null;
}
