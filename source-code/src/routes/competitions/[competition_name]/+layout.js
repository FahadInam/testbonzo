import { getLearnerPaymentStatus } from "../../../data-actions/learner/learner.payments.da";

export const prerender = false;

export async function load() {
  const data = await getLearnerPaymentStatus();
}
