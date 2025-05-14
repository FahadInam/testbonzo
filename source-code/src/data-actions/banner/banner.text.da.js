export const getTextForRole = (
  /** @type {any} */ role,
  /** @type {number} */ subscriptionStatus,
  /** @type {any} */ textObject,
  /** @type {string} */ lang = "eng",
) => {
  const defaultTexts = { text: "" };
  if (!textObject || !role) {
    return defaultTexts;
  }

  // Default to "eng" if lang is missing or empty
  lang = lang?.trim() || "eng";

  // Safely destructure the role-specific properties
  const { principal = {}, paid_principal = {}, learner = {} } = textObject;

  if (subscriptionStatus === 1) {
    return {
      text: paid_principal?.[lang] || paid_principal?.eng || defaultTexts.text,
    };
  }

  switch (role) {
    case "principal":
      return {
        text: principal?.[lang] || principal?.eng || defaultTexts.text,
      };
    case "learner":
    default:
      return {
        text: learner?.[lang] || learner?.eng || defaultTexts.text,
      };
  }
};
