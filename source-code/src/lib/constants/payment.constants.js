import { IMAGES } from "$lib/assets/images/images.constants";

export const paymentOptions = [
  { label: "Jazzcash", value: "MWALLET", icon: IMAGES.JAZZ_ICON },
  { label: "Bank Transfer", value: "Bank", icon: IMAGES.BANK_ICON },
  { label: "Debit/Credit Card", value: "MIGS", icon: IMAGES.CARD_ICON },
];

export const BANK_DETAILS = {
  ACCOUNT_TITLE: "Knowledge Platform Pvt. Ltd",
  IBAN: "PK15ASCM0007050200009699",
  ACCOUNT_NUMBER: "07050200009699",
  BANK_NAME: "Askari bank Ltd.",
};
export const COLOR_CONFIG = {
  daily: {
    bgColor: "#79005A",
    textColor: "#79005A",
    gameNumberColor: "#EF5E99",
  },
  weekly: {
    bgColor: "#007400",
    textColor: "#007400",
    gameNumberColor: "#00FF00",
    perdayText: "6 Games / day",
    perdayTextBg: "#DEF9E6",
  },
  monthly: {
    discountBgColor: "#0086FF",
    bgColor: "#003C96",
    textColor: "#003C96",
    gameNumberColor: "#00C6FF",
    discountText: "Save 40%",
    perdayText: "6 Games / day",
    perdayTextBg: "#E5EDFB",
  },
};

export const GAMES_COUNT = {
  daily: 10,
  weekly: 70,
  monthly: 300,
};
export const texts = {
  BUNDLE: "Bundle",
  GAMES: "Games",
};
export const DEFAULT_COLORS = {
  bgColor: "#006400",
  textColor: "#000000",
  gameNumberColor: "#FFFFFF",
};

export const SUBSCRIPTION_BUNDLES = {
  DAILY: "35643364-3938-3637-2d65-3535362d3131",
  WEEKLY: "37356237-6234-6139-2d65-3535362d3131",
  MONTHLY: "38633764-6463-6166-2d65-3535362d3131",
};

export const PAYMENT_SUPPORT_DETAILS = {
  PHONE: "0800 720 291",
  EMAIL: "shupavugames@knowledgeplatform.com",
};
