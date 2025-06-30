import { g as getText } from "./language.store.js";
let API_DEFINITIONS;
let __tla = (async () => {
  API_DEFINITIONS = {
    LOGIN_USER: {
      method: "POST",
      endpoint: "login",
      requiredParams: [
        "username",
        "password"
      ],
      cache: false,
      secure: false,
      loader: true,
      errorCodes: {
        "-1": await getText("invalid_username")
      }
    },
    SIGNUP_USER: {
      method: "POST",
      endpoint: "signup",
      requiredParams: [
        "username",
        "password",
        "profile_picture",
        "role",
        "t_token"
      ],
      cache: false,
      secure: false,
      loader: true,
      errorCodes: {
        "-1": await getText("username_exists"),
        "-10": await getText("email_exists")
      }
    },
    COMPETITIONS: {
      method: "POST",
      endpoint: "competitions",
      requiredParams: [],
      cache: false,
      secure: true,
      loader: false
    },
    INSTANCE_CONFIG: {
      method: "POST",
      endpoint: "instance/config",
      requiredParams: [
        "domain_name"
      ],
      cache: true,
      secure: false,
      loader: true
    },
    COMPETITION_DETAILS: {
      method: "POST",
      endpoint: "competition/details",
      requiredParams: [
        "competition_id"
      ],
      cache: false,
      secure: true,
      loader: true
    },
    UPDATE_TIMEZONE: {
      method: "POST",
      endpoint: "users/timezone/update",
      requiredParams: [
        "timezone"
      ],
      cache: false,
      secure: true,
      loader: false
    },
    LESSON_RECOMMENDATION: {
      method: "POST",
      endpoint: "user/lesson/recommendation",
      requiredParams: [
        "competition_id",
        "grade"
      ],
      cache: false,
      secure: true,
      loader: false
    },
    SETTINGS_UPDATE: {
      method: "POST",
      endpoint: "user/settings/update",
      requiredParams: [
        "competition_id",
        "grade",
        "school_id",
        "friend_id",
        "points"
      ],
      cache: false,
      secure: true,
      loader: false
    },
    LEARNER_LEADERBOARD: {
      method: "POST",
      endpoint: "competition/users/ranking",
      requiredParams: [
        "competition_id",
        "grade",
        "time_type",
        "is_school_based"
      ],
      cache: false,
      secure: true,
      loader: false
    },
    SEARCH_FRIENDS: {
      method: "POST",
      endpoint: "friends/search",
      requiredParams: [
        "competition_id",
        "grade",
        "username"
      ],
      cache: false,
      secure: true,
      loader: false
    },
    SOCIAL_LOGIN: {
      errorCodes: {
        "-1": await getText("username_not_found")
      }
    },
    PAYMENT_STATUS: {
      method: "POST",
      endpoint: "user/payment/status",
      requiredParams: [
        "competition_id",
        "grade",
        "inquiry_type"
      ],
      cache: false,
      secure: true,
      loader: false
    },
    CHALLENGE_START: {
      method: "POST",
      endpoint: "challenge/start",
      requiredParams: [
        "competition_id",
        "grade",
        "subject"
      ],
      cache: false,
      secure: true,
      loader: false,
      errorCodes: {
        "-2": await getText("invitation_already_sent")
      }
    },
    ADD_VOUCHER: {
      method: "POST",
      endpoint: "users/secretcode",
      requiredParams: [
        "secret_code"
      ],
      cache: false,
      secure: true,
      loader: false,
      errorCodes: {
        "-2": await getText("invalid_voucher"),
        "-3": await getText("voucher_already_used")
      }
    },
    ADD_GCLC_VOUCHER: {
      method: "POST",
      endpoint: "add/competition/secretcode",
      requiredParams: [
        "secret_code",
        "competition_id"
      ],
      cache: false,
      secure: true,
      loader: false,
      errorCodes: {
        "-2": await getText("invalid_voucher"),
        "-3": await getText("voucher_already_used"),
        "-4": await getText("already_enrolled_with_school")
      }
    },
    FORGOT_PASSWORD: {
      method: "POST",
      endpoint: "password/forgot",
      requiredParams: [
        "email"
      ],
      cache: false,
      secure: false,
      loader: true,
      errorCodes: {
        "-1": await getText("email_not_found")
      }
    },
    RESET_PASSWORD: {
      errorCodes: {
        "-2": await getText("invalid_or_expire_code")
      }
    },
    INSTITUTION_COMPETITIONS: {
      method: "POST",
      endpoint: "institution/competitions",
      requiredParams: [],
      cache: false,
      secure: true,
      loader: false,
      errorCodes: {
        "-1": await getText("institution_not_subscribed")
      }
    },
    INSTITUTION_DETAILS: {
      errorCodes: {
        "-2": await getText("institute_already_exists")
      }
    },
    INSTITUTION_COMPETITION_SUMMARY: {
      method: "POST",
      endpoint: "competition/summary",
      requiredParams: [],
      cache: false,
      secure: true,
      loader: false
    },
    INSTITUTION_COMPETITION_PERFORMANCE: {
      method: "POST",
      endpoint: "competition/performance/summary",
      requiredParams: [],
      cache: false,
      secure: true,
      loader: false
    },
    INSTITUTION_GAMES_REPORT: {
      method: "POST",
      endpoint: "competition/games/report",
      requiredParams: [],
      cache: false,
      secure: true,
      loader: false
    },
    INSTITUTION_USERS_RANKING: {
      method: "POST",
      endpoint: "competition/users/ranking",
      requiredParams: [
        "competition_id",
        "grade",
        "time_type",
        "is_school_based"
      ],
      cache: false,
      secure: true,
      loader: false
    },
    INSTITUTION_SCHOOLS_RANKING: {
      method: "POST",
      endpoint: "competition/schools/ranking",
      requiredParams: [
        "competition_id",
        "grade",
        "time_type",
        "is_school_based"
      ],
      cache: false,
      secure: true,
      loader: false
    },
    INSTITUTION_LESSONS_REPORT: {
      method: "POST",
      endpoint: "competition/lessons/report",
      requiredParams: [],
      cache: false,
      secure: true,
      loader: false
    },
    EMAIL_SIGNUP: {
      method: "POST",
      endpoint: "user/signup/request/add",
      requiredParams: [
        "email"
      ],
      cache: false,
      secure: false,
      loader: true,
      errorCodes: {
        "-10": await getText("email_already_exists")
      }
    },
    EMAIL_SIGNUP_VERIFICATION: {
      errorCodes: {
        "-2": await getText("verification_link_expired")
      }
    },
    OTP_SIGNUP: {
      method: "POST",
      endpoint: "user/otp/sms/send",
      requiredParams: [],
      cache: false,
      secure: false,
      loader: true,
      errorCodes: {
        "-10": await getText("number_already_exists")
      }
    },
    OTP_VERIFY: {
      method: "POST",
      endpoint: "user/otp/verify",
      requiredParams: [],
      cache: false,
      secure: false,
      loader: true,
      errorCodes: {
        "-2": await getText("invalid_otp")
      }
    },
    PROCESS_DPO_PAYMENT: {
      method: "POST",
      endpoint: "payment/dpo/transaction/create",
      requiredParams: [],
      cache: false,
      secure: true,
      loader: true,
      errorCodes: {
        1: await getText("invalid_payment_link")
      }
    },
    VERIFY_DPO_PAYMENT: {
      errorCodes: {
        1: await getText("invalid_payment_link")
      }
    },
    SAFARICOM_PAYMENT: {
      method: "POST",
      endpoint: "payment/safaricom/transaction/create",
      requiredParams: [],
      cache: false,
      secure: true,
      loader: true
    },
    SET_GRADE_POINTS: {
      method: "POST",
      endpoint: "grade/point/set",
      requiredParams: [],
      cache: false,
      secure: true,
      loader: true
    }
  };
})();
export {
  API_DEFINITIONS as A,
  __tla
};
