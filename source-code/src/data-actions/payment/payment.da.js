import { request } from "$lib/api.service";
import { get } from "svelte/store";
import { API_DEFINITIONS } from "../../apis/api.definitions";
import { decompressLZString, waitForCompetitionGradeData } from "$lib/utils";
import { paymentStore } from "../../stores/payment.store";
import { userStore } from "../../stores/user.store";
import { instanceStore } from "../../stores/instance.store";
import { getText } from "../../stores/language.store";
import { TIMEZONE_ENUM as TimeZoneList } from "$lib/constants/timezone.constants";
import { isShupavu } from "../system/system..da";
import { isNormalUser, isSafaricomUser, USER_TYPE } from "$lib/constants/user.constants";
import { SUBSCRIPTION_BUNDLES } from "$lib/constants/payment.constants";
import { competitionStore } from "../../stores/competition.store";

/**
 * OTP VERIFICATION SETUP
 */
export const paymentDataFields = {
  fields: [
    {
      name: "email",
      type: "email",
      label: await getText("email"),
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "instituteCity",
      label: "Timezone",
      type: "select",
      placeholder: "Select timezone",
      required: true,
      layout: "full",
      options: TimeZoneList,
      value: "",
    },
  ],
  buttons: [
    {
      label: await getText("verify"),
      type: "submit",
      customClass: "w-full",
    },
  ],
  handleSubmit: async (/** @type {any} */ formData) => {},
  enableTurnstile: false,
  turnstileSiteKey: "",
};

export const GetSubscriptionDetails = async () => {
  const user = get(userStore);
  const id = user.active_role === "principal" ? user.school_id : get(paymentStore).competition_id;
  const apiEndpoint =
    user.active_role === "principal"
      ? API_DEFINITIONS.PRINCIPAL_PAYMENT_SUBSCRIPTIONS
      : API_DEFINITIONS.PAYMENT_SUBSCRIPTIONS;
  const data = await request(apiEndpoint, {
    competition_id: id,
  });
  return data.data;
};

/**
 * @param {URLSearchParams} urlParams - The URL search parameters
 */
// Process and validate payment data from URL
export function processPaymentData(urlParams) {
  const code = urlParams.get("paycode");

  const decompressedData = decompressLZString(code);

  const dataParams = new URLSearchParams(decompressedData.replace(/@/g, "&"));
  const status = dataParams.get("transtatus");

  // Valid transaction statuses
  if (status === "2" || status === "3") {
    const durationMonths = parseInt(dataParams.get("durdays"), 10);

    return {
      success: true,
      data: {
        transactionStatus: parseInt(status),
        transactionRef: dataParams.get("tranref"),
        amount: dataParams.get("amount"),
        durationMonths: durationMonths,
        payment_mode: dataParams.get("paymode"),
        subscription_end_date: durationMonths,
      },
    };
  }
}

export function calculateExpiryDate(daysOrDate) {
  console.log(daysOrDate, "daysOrDate");
  let baseDate;
  if (typeof daysOrDate === "string" && daysOrDate.trim() !== "" && !isNaN(Date.parse(daysOrDate))) {
    // Handle valid date string
    baseDate = new Date(daysOrDate);
    baseDate.setDate(baseDate.getDate() + 1); // Default to adding 1 day
  } else if (typeof daysOrDate === "number") {
    // Handle number of days from today
    baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + daysOrDate);
  } else {
    throw new Error("Invalid input: must be a number or a valid date string");
  }
  return formatDate(baseDate);
}

// Format date as Month DD, YYYY
export function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

// Format payment method for display
export function formatPaymentMethod(paymentType) {
  switch (paymentType) {
    case "MWALLET":
      return "Mobile Wallet";
    case "CARD":
    case "card":
      return "Credit/Debit Card";
    default:
      return paymentType || "Unknown";
  }
}

export function getUserData(subscriptionData) {
  const compData = get(paymentStore);
  const userData = get(userStore);

  return {
    grade: compData?.current_grade?.toString() || "0",
    subscription_id: subscriptionData[0].id,
    duration_in_days: subscriptionData[0].duration_in_days,
    amount: subscriptionData[0].amount,
    authToken: userData.auth_token,
    system_id: userData.active_role === "principal" ? +userData.school_id : compData?.competition_id,
    user_id: userData.user_id,
    username: userData.username,
    email: userData.email,
    vendor_id: subscriptionData[0].payment_vendor_guid,
  };
}

export const getBankOrderId = async (data) => {
  let cleanedData;
  if (typeof data === "object" && data !== null) {
    cleanedData = { ...data };
    delete cleanedData.authToken;
    delete cleanedData.vendor_id;
  }

  const res = await request(API_DEFINITIONS.BANK_TRANSFER, {
    ...cleanedData,
    payment_gateway: "2",
    payment_mode: "BankTransfer",
    vendor_uid: data.vendor_id,
  });

  return res.data;
};

export const processDpoPayment = async (data) => {
  const res = await request(API_DEFINITIONS.PROCESS_DPO_PAYMENT, {
    ...data,
  });

  if (!res.error_code) {
    window.location.href = res.paymentRedirectUrl;
  }
};
export const processSafaricomPayment = async (data) => {
  const res = await request(API_DEFINITIONS.SAFARICOM_PAYMENT, {
    ...data,
  });

  if (res.error_code === 0) {
    window.location.href = res.data.url;
  }
};
export const verifyDpoPayment = async (data) => {
  const res = await request(API_DEFINITIONS.VERIFY_DPO_PAYMENT, {
    transaction_token: data,
  });

  return res;
};

export const verifySafaricomPayment = async (data) => {
  const res = await request(API_DEFINITIONS.VERIFY_SAFARICOM_PAYMENT, {
    epgw_payment_payload: data,
  });

  return res;
};

/**
 * @param {Object} paymentData - The payment data object
 * @param {boolean} isShupavu - Whether the platform is Shupavu
 * @returns {boolean} Whether the payment was successful
 */
export function isPaymentSuccessful(paymentData) {
  if (!paymentData) {
    return;
  }
  return isShupavu ? paymentData.response_status === "000" : paymentData.transactionStatus === 2;
}

/**
 * @param {boolean} isSuccessful - Whether the payment was successful
 * @param {Function} t - Translation function
 * @returns {string} The appropriate title text
 */
export function getPaymentTitle(isSuccessful, t) {
  return isSuccessful ? t("payment_success") : t("payment_failed");
}

/**
 * @param {boolean} isSuccessful - Whether the payment was successful
 * @param {Function} t - Translation function
 * @returns {string} The appropriate description text
 */
export function getPaymentDescription(isSuccessful, t) {
  if (!isSuccessful && isShupavu && isSafaricomUser()) {
    return getErrorDescription(t);
  }
  if (isShupavu) {
    return isSuccessful ? t("shupavu_success_description") : t("shupavu_failed_description");
  } else {
    return isSuccessful ? t("payment_success_description") : t("payment_failed_description");
  }
}

/**
 * @param {Array} bundles - Array of all available bundles
 * @param {boolean} isNormalUser - Whether the user is a normal user
 * @param {boolean} isSafaricom - Whether the user is a Safaricom user
 * @param {Object} SUBSCRIPTION_BUNDLES - Object containing bundle IDs
 * @returns {Array} Filtered array of bundles
 */
export function filterBundlesByUserType(bundles) {
  // If the user is a Safaricom user, only show daily bundle
  if (isSafaricomUser()) {
    return bundles?.filter((bundle) => bundle.subscription_guid === SUBSCRIPTION_BUNDLES.DAILY);
  }

  // If the user is a normal user, show monthly and weekly packages only
  if (isNormalUser()) {
    return bundles?.filter(
      (bundle) =>
        bundle.subscription_guid === SUBSCRIPTION_BUNDLES.WEEKLY ||
        bundle.subscription_guid === SUBSCRIPTION_BUNDLES.MONTHLY,
    );
  }
  // Default: return all bundles
  return bundles;
}

export function getErrorDescription(t) {
  const errorCodes = {
    100: t("gateway_issue"),
    305: t("safari_api_error"),
    400: t("fraud_detected"),
    700: t("link_expired"),
    800: t("user_declined"),
    900: t("user_already_has_subscribed"),
  };

  const url = window.location.href;
  const urlParams = new URL(url);
  const errorCode = urlParams.searchParams.get("epgw_status");

  if (errorCode && errorCodes[errorCode]) {
    return errorCodes[errorCode];
  } else {
    return "";
  }
}

export const getSubscriptionDetails = async () => {
  await waitForCompetitionGradeData();
  let dto = {
    grade: get(competitionStore).current_grade,
    competition_id: get(competitionStore).competition_id,
  };
  const res = await request(API_DEFINITIONS.SUBSCRIPTION_DETAILS, {
    ...dto,
  });

  const transformedData = {
    payment_mode: res.data.paymentMode,
    amount: res.data.amount,
    subscription_end_date: res.data.subscriptionEndDate,
    transactionDate: res.data.subscriptionStartDate,
    transactionToken: res.data.transactionToken,
    isSubscriptionCancel: res.data.isSubscriptionCancel,
  };
  return transformedData;
};

export const subscriptionCancellation = async (data) => {
  const res = await request(API_DEFINITIONS.CANCEL_SUBSCRIPTION, {
    transaction_token: data,
  });
  return res;
};
