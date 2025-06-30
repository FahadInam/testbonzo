import { r as request } from "./api.service.js";
import "clsx";
import { A as API_DEFINITIONS, __tla as __tla_0 } from "./api.definitions.js";
import "./user.store.js";
import "lz-string";
import "./client.js";
import "./client2.js";
import { g as getText } from "./language.store.js";
import { a as isShupavu } from "./system..da.js";
import "./index2.js";
import "./payment.store.js";
import { i as isSafaricomUser, a as isNormalUser } from "./user.constants.js";
import { I as IMAGES } from "./images.constants.js";
let BANK_DETAILS, COLOR_CONFIG, DEFAULT_COLORS, GAMES_COUNT, PAYMENT_SUPPORT_DETAILS, formatDate, getPaymentDescription, calculateExpiryDate, filterBundlesByUserType, processSafaricomPayment, formatPaymentMethod, getPaymentTitle, processDpoPayment, isPaymentSuccessful, paymentOptions, paymentDataFields, texts;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const TIMEZONE_ENUM = [
    {
      id: 1,
      value: "Pacific/Niue",
      label: "UTC-11:00 - Niue"
    },
    {
      id: 2,
      value: "Pacific/Midway",
      label: "UTC-11:00 - Midway Island, Samoa"
    },
    {
      id: 3,
      value: "Pacific/Honolulu",
      label: "UTC-10:00 - Hawaii"
    },
    {
      id: 4,
      value: "America/Anchorage",
      label: "UTC-09:00 - Alaska"
    },
    {
      id: 5,
      value: "Pacific/Marquesas",
      label: "UTC-09:30 - Marquesas Islands"
    },
    {
      id: 6,
      value: "America/Los_Angeles",
      label: "UTC-08:00 - Pacific Time (US & Canada)"
    },
    {
      id: 7,
      value: "America/Tijuana",
      label: "UTC-08:00 - Tijuana, Baja California"
    },
    {
      id: 8,
      value: "America/Denver",
      label: "UTC-07:00 - Mountain Time (US & Canada)"
    },
    {
      id: 9,
      value: "America/Phoenix",
      label: "UTC-07:00 - Arizona"
    },
    {
      id: 10,
      value: "America/Mazatlan",
      label: "UTC-07:00 - Chihuahua, La Paz, Mazatlan"
    },
    {
      id: 11,
      value: "America/Chicago",
      label: "UTC-06:00 - Central Time (US & Canada)"
    },
    {
      id: 12,
      value: "America/Mexico_City",
      label: "UTC-06:00 - Mexico City"
    },
    {
      id: 13,
      value: "America/Regina",
      label: "UTC-06:00 - Saskatchewan"
    },
    {
      id: 14,
      value: "America/Bogota",
      label: "UTC-05:00 - Bogota, Lima, Quito"
    },
    {
      id: 15,
      value: "America/New_York",
      label: "UTC-05:00 - Eastern Time (US & Canada)"
    },
    {
      id: 16,
      value: "America/Caracas",
      label: "UTC-04:30 - Caracas"
    },
    {
      id: 17,
      value: "America/Halifax",
      label: "UTC-04:00 - Atlantic Time (Canada)"
    },
    {
      id: 18,
      value: "America/Manaus",
      label: "UTC-04:00 - Manaus, Santiago"
    },
    {
      id: 19,
      value: "America/La_Paz",
      label: "UTC-04:00 - La Paz"
    },
    {
      id: 20,
      value: "America/St_Johns",
      label: "UTC-03:30 - Newfoundland"
    },
    {
      id: 21,
      value: "America/Sao_Paulo",
      label: "UTC-03:00 - Brasilia"
    },
    {
      id: 22,
      value: "America/Argentina/Buenos_Aires",
      label: "UTC-03:00 - Buenos Aires, Georgetown"
    },
    {
      id: 23,
      value: "America/Godthab",
      label: "UTC-03:00 - Greenland"
    },
    {
      id: 24,
      value: "America/Montevideo",
      label: "UTC-03:00 - Montevideo"
    },
    {
      id: 25,
      value: "America/Noronha",
      label: "UTC-02:00 - Mid-Atlantic"
    },
    {
      id: 26,
      value: "Atlantic/South_Georgia",
      label: "UTC-02:00 - South Georgia Island"
    },
    {
      id: 27,
      value: "Atlantic/Azores",
      label: "UTC-01:00 - Azores"
    },
    {
      id: 28,
      value: "Atlantic/Cape_Verde",
      label: "UTC-01:00 - Cape Verde Islands"
    },
    {
      id: 29,
      value: "Europe/London",
      label: "UTC+00:00 - Dublin, Edinburgh, Lisbon, London"
    },
    {
      id: 30,
      value: "Africa/Casablanca",
      label: "UTC+00:00 - Casablanca, Monrovia"
    },
    {
      id: 31,
      value: "Africa/Monrovia",
      label: "UTC+00:00 - Monrovia"
    },
    {
      id: 32,
      value: "UTC",
      label: "UTC+00:00 - Coordinated Universal Time"
    },
    {
      id: 33,
      value: "Europe/Berlin",
      label: "UTC+01:00 - Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"
    },
    {
      id: 34,
      value: "Europe/Paris",
      label: "UTC+01:00 - Brussels, Copenhagen, Madrid, Paris"
    },
    {
      id: 35,
      value: "Africa/Lagos",
      label: "UTC+01:00 - West Central Africa"
    },
    {
      id: 36,
      value: "Europe/Kaliningrad",
      label: "UTC+02:00 - Kaliningrad"
    },
    {
      id: 37,
      value: "Europe/Kiev",
      label: "UTC+02:00 - Kyiv, Ukraine"
    },
    {
      id: 38,
      value: "Europe/Athens",
      label: "UTC+02:00 - Athens, Bucharest"
    },
    {
      id: 39,
      value: "Africa/Cairo",
      label: "UTC+02:00 - Cairo"
    },
    {
      id: 40,
      value: "Asia/Jerusalem",
      label: "UTC+02:00 - Jerusalem"
    },
    {
      id: 41,
      value: "Africa/Johannesburg",
      label: "UTC+02:00 - Harare, Pretoria"
    },
    {
      id: 42,
      value: "Europe/Moscow",
      label: "UTC+03:00 - Moscow, St. Petersburg, Volgograd"
    },
    {
      id: 43,
      value: "Asia/Baghdad",
      label: "UTC+03:00 - Baghdad"
    },
    {
      id: 44,
      value: "Asia/Kuwait",
      label: "UTC+03:00 - Kuwait, Riyadh"
    },
    {
      id: 45,
      value: "Africa/Nairobi",
      label: "UTC+03:00 - Nairobi"
    },
    {
      id: 46,
      value: "Asia/Tehran",
      label: "UTC+03:30 - Tehran"
    },
    {
      id: 47,
      value: "Asia/Dubai",
      label: "UTC+04:00 - Abu Dhabi, Muscat"
    },
    {
      id: 48,
      value: "Asia/Baku",
      label: "UTC+04:00 - Baku"
    },
    {
      id: 49,
      value: "Europe/Samara",
      label: "UTC+04:00 - Samara, Volgograd"
    },
    {
      id: 50,
      value: "Indian/Mauritius",
      label: "UTC+04:00 - Port Louis"
    },
    {
      id: 51,
      value: "Asia/Tbilisi",
      label: "UTC+04:00 - Tbilisi"
    },
    {
      id: 52,
      value: "Asia/Yerevan",
      label: "UTC+04:00 - Yerevan"
    },
    {
      id: 53,
      value: "Asia/Kabul",
      label: "UTC+04:30 - Kabul"
    },
    {
      id: 54,
      value: "Asia/Karachi",
      label: "UTC+05:00 - Islamabad, Karachi"
    },
    {
      id: 55,
      value: "Asia/Tashkent",
      label: "UTC+05:00 - Tashkent"
    },
    {
      id: 56,
      value: "Asia/Yekaterinburg",
      label: "UTC+05:00 - Ekaterinburg"
    },
    {
      id: 57,
      value: "Asia/Kolkata",
      label: "UTC+05:30 - Chennai, Kolkata, Mumbai, New Delhi"
    },
    {
      id: 58,
      value: "Asia/Colombo",
      label: "UTC+05:30 - Sri Jayawardenepura"
    },
    {
      id: 59,
      value: "Asia/Kathmandu",
      label: "UTC+05:45 - Kathmandu"
    },
    {
      id: 60,
      value: "Asia/Almaty",
      label: "UTC+06:00 - Almaty, Novosibirsk"
    },
    {
      id: 61,
      value: "Asia/Dhaka",
      label: "UTC+06:00 - Astana, Dhaka"
    },
    {
      id: 62,
      value: "Asia/Rangoon",
      label: "UTC+06:30 - Yangon"
    },
    {
      id: 63,
      value: "Asia/Bangkok",
      label: "UTC+07:00 - Bangkok, Hanoi, Jakarta"
    },
    {
      id: 64,
      value: "Asia/Krasnoyarsk",
      label: "UTC+07:00 - Krasnoyarsk"
    },
    {
      id: 65,
      value: "Asia/Shanghai",
      label: "UTC+08:00 - Beijing, Chongqing, Hong Kong, Urumqi"
    },
    {
      id: 66,
      value: "Asia/Kuala_Lumpur",
      label: "UTC+08:00 - Kuala Lumpur, Singapore"
    },
    {
      id: 67,
      value: "Asia/Taipei",
      label: "UTC+08:00 - Taipei"
    },
    {
      id: 68,
      value: "Asia/Irkutsk",
      label: "UTC+08:00 - Irkutsk, Ulaan Bataar"
    },
    {
      id: 69,
      value: "Australia/Perth",
      label: "UTC+08:00 - Perth"
    },
    {
      id: 70,
      value: "Australia/Eucla",
      label: "UTC+08:45 - Eucla"
    },
    {
      id: 71,
      value: "Asia/Tokyo",
      label: "UTC+09:00 - Osaka, Sapporo, Tokyo"
    },
    {
      id: 72,
      value: "Asia/Seoul",
      label: "UTC+09:00 - Seoul"
    },
    {
      id: 73,
      value: "Asia/Yakutsk",
      label: "UTC+09:00 - Yakutsk"
    },
    {
      id: 74,
      value: "Australia/Darwin",
      label: "UTC+09:30 - Darwin"
    },
    {
      id: 75,
      value: "Australia/Adelaide",
      label: "UTC+09:30 - Adelaide"
    },
    {
      id: 76,
      value: "Australia/Brisbane",
      label: "UTC+10:00 - Brisbane"
    },
    {
      id: 77,
      value: "Australia/Sydney",
      label: "UTC+10:00 - Canberra, Melbourne, Sydney"
    },
    {
      id: 78,
      value: "Australia/Hobart",
      label: "UTC+10:00 - Hobart"
    },
    {
      id: 79,
      value: "Asia/Vladivostok",
      label: "UTC+10:00 - Vladivostok"
    },
    {
      id: 80,
      value: "Australia/Lord_Howe",
      label: "UTC+10:30 - Lord Howe Island"
    },
    {
      id: 81,
      value: "Pacific/Noumea",
      label: "UTC+11:00 - Solomon Is., New Caledonia"
    },
    {
      id: 82,
      value: "Asia/Magadan",
      label: "UTC+11:00 - Magadan"
    },
    {
      id: 83,
      value: "Pacific/Norfolk",
      label: "UTC+11:30 - Norfolk Island"
    },
    {
      id: 84,
      value: "Pacific/Auckland",
      label: "UTC+12:00 - Auckland, Wellington"
    },
    {
      id: 85,
      value: "Pacific/Fiji",
      label: "UTC+12:00 - Fiji, Kamchatka, Marshall Is."
    },
    {
      id: 86,
      value: "Pacific/Chatham",
      label: "UTC+12:45 - Chatham Islands"
    },
    {
      id: 87,
      value: "Pacific/Tongatapu",
      label: "UTC+13:00 - Nuku'alofa"
    },
    {
      id: 88,
      value: "Pacific/Apia",
      label: "UTC+13:00 - Samoa"
    },
    {
      id: 89,
      value: "Pacific/Kiritimati",
      label: "UTC+14:00 - Kiritimati"
    }
  ];
  paymentOptions = [
    {
      label: "Jazzcash",
      value: "MWALLET",
      icon: IMAGES.JAZZ_ICON
    },
    {
      label: "Bank Transfer",
      value: "Bank",
      icon: IMAGES.BANK_ICON
    },
    {
      label: "Debit/Credit Card",
      value: "MIGS",
      icon: IMAGES.CARD_ICON
    }
  ];
  BANK_DETAILS = {
    ACCOUNT_TITLE: "Knowledge Platform Pvt. Ltd",
    IBAN: "PK15ASCM0007050200009699",
    ACCOUNT_NUMBER: "07050200009699",
    BANK_NAME: "Askari bank Ltd."
  };
  COLOR_CONFIG = {
    daily: {
      bgColor: "#79005A",
      textColor: "#79005A",
      gameNumberColor: "#EF5E99"
    },
    weekly: {
      bgColor: "#007400",
      textColor: "#007400",
      gameNumberColor: "#00FF00",
      perdayText: "6 Games / day",
      perdayTextBg: "#DEF9E6"
    },
    monthly: {
      discountBgColor: "#0086FF",
      bgColor: "#003C96",
      textColor: "#003C96",
      gameNumberColor: "#00C6FF",
      discountText: "Save 40%",
      perdayText: "6 Games / day",
      perdayTextBg: "#E5EDFB"
    }
  };
  GAMES_COUNT = {
    daily: 10,
    weekly: 70,
    monthly: 300
  };
  texts = {
    BUNDLE: "Bundle",
    GAMES: "Games"
  };
  DEFAULT_COLORS = {
    bgColor: "#006400",
    textColor: "#000000",
    gameNumberColor: "#FFFFFF"
  };
  const SUBSCRIPTION_BUNDLES = {
    DAILY: "35643364-3938-3637-2d65-3535362d3131",
    WEEKLY: "37356237-6234-6139-2d65-3535362d3131",
    MONTHLY: "38633764-6463-6166-2d65-3535362d3131"
  };
  PAYMENT_SUPPORT_DETAILS = {
    PHONE: "0800 720 291",
    EMAIL: "shupavugames@knowledgeplatform.com"
  };
  paymentDataFields = {
    fields: [
      {
        name: "email",
        type: "email",
        label: await getText("email"),
        placeholder: "Enter your email",
        required: true
      },
      {
        name: "instituteCity",
        label: "Timezone",
        type: "select",
        placeholder: "Select timezone",
        required: true,
        layout: "full",
        options: TIMEZONE_ENUM,
        value: ""
      }
    ],
    buttons: [
      {
        label: await getText("verify"),
        type: "submit",
        customClass: "w-full"
      }
    ],
    handleSubmit: async (formData) => {
    },
    enableTurnstile: false,
    turnstileSiteKey: ""
  };
  calculateExpiryDate = function(daysOrDate) {
    console.log(daysOrDate, "daysOrDate");
    let baseDate;
    if (typeof daysOrDate === "string" && daysOrDate.trim() !== "" && !isNaN(Date.parse(daysOrDate))) {
      baseDate = new Date(daysOrDate);
      baseDate.setDate(baseDate.getDate() + 1);
    } else if (typeof daysOrDate === "number") {
      baseDate = /* @__PURE__ */ new Date();
      baseDate.setDate(baseDate.getDate() + daysOrDate);
    } else {
      throw new Error("Invalid input: must be a number or a valid date string");
    }
    return formatDate(baseDate);
  };
  formatDate = function(date) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    return date.toLocaleDateString("en-US", options);
  };
  formatPaymentMethod = function(paymentType) {
    switch (paymentType) {
      case "MWALLET":
        return "Mobile Wallet";
      case "CARD":
      case "card":
        return "Credit/Debit Card";
      default:
        return paymentType || "Unknown";
    }
  };
  processDpoPayment = async (data) => {
    const res = await request(API_DEFINITIONS.PROCESS_DPO_PAYMENT, {
      ...data
    });
    if (!res.error_code) {
      window.location.href = res.paymentRedirectUrl;
    }
  };
  processSafaricomPayment = async (data) => {
    const res = await request(API_DEFINITIONS.SAFARICOM_PAYMENT, {
      ...data
    });
    if (res.error_code === 0) {
      window.location.href = res.data.url;
    }
  };
  isPaymentSuccessful = function(paymentData) {
    if (!paymentData) {
      return;
    }
    return isShupavu ? paymentData.response_status === "000" : paymentData.transactionStatus === 2;
  };
  getPaymentTitle = function(isSuccessful, t) {
    return isSuccessful ? t("payment_success") : t("payment_failed");
  };
  getPaymentDescription = function(isSuccessful, t) {
    if (!isSuccessful && isShupavu && isSafaricomUser()) {
      return getErrorDescription(t);
    }
    if (isShupavu) {
      return isSuccessful ? t("shupavu_success_description") : t("shupavu_failed_description");
    } else {
      return isSuccessful ? t("payment_success_description") : t("payment_failed_description");
    }
  };
  filterBundlesByUserType = function(bundles) {
    if (isSafaricomUser()) {
      return bundles?.filter((bundle) => bundle.subscription_guid === SUBSCRIPTION_BUNDLES.DAILY);
    }
    if (isNormalUser()) {
      return bundles?.filter((bundle) => bundle.subscription_guid === SUBSCRIPTION_BUNDLES.WEEKLY || bundle.subscription_guid === SUBSCRIPTION_BUNDLES.MONTHLY);
    }
    return bundles;
  };
  function getErrorDescription(t) {
    const errorCodes = {
      100: t("gateway_issue"),
      305: t("safari_api_error"),
      400: t("fraud_detected"),
      700: t("link_expired"),
      800: t("user_declined"),
      900: t("user_already_has_subscribed")
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
});
export {
  BANK_DETAILS as B,
  COLOR_CONFIG as C,
  DEFAULT_COLORS as D,
  GAMES_COUNT as G,
  PAYMENT_SUPPORT_DETAILS as P,
  __tla,
  formatDate as a,
  getPaymentDescription as b,
  calculateExpiryDate as c,
  filterBundlesByUserType as d,
  processSafaricomPayment as e,
  formatPaymentMethod as f,
  getPaymentTitle as g,
  processDpoPayment as h,
  isPaymentSuccessful as i,
  paymentOptions as j,
  paymentDataFields as p,
  texts as t
};
