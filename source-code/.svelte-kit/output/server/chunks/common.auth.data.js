import { g as getText } from "./language.store.js";
import { P as PUBLIC_TURNSTILE_KEY, r as request, a as PUBLIC_GOOGLE_CLIENT_ID, b as PUBLIC_LMS_URL } from "./api.service.js";
import { w as writable, g as get } from "./index3.js";
import { g as goto } from "./client.js";
import "notyf";
import { u as userStore } from "./user.store.js";
import { A as API_DEFINITIONS, __tla as __tla_0 } from "./api.definitions.js";
import { e as getInstanceTextAsync } from "./utils.js";
import "./avatar2.js";
let authModalStore, otpStore, openCoachApp, loginFields, shupavuSignupFields, signUpFields, gclcSignUpFields, handleGoogleLogin, guestStore, forgotPasswordFields, logoutUser, otpVerificationField, shupavuLoginFields, userSelectionCardsPopup;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const initialState = {
    points: null,
    guest_mode: false
  };
  guestStore = writable({
    ...initialState
  });
  const resetGuestStore = () => {
    guestStore.set({
      ...initialState
    });
  };
  authModalStore = writable({
    page: "user-login",
    visible: false
  });
  const iframeStore = writable({
    isVisible: false,
    url: ""
  });
  function openIframe(url) {
    iframeStore.set({
      isVisible: true,
      url
    });
  }
  otpStore = writable({
    is_otp_verified: false,
    phone_number: null
  });
  signUpFields = {
    title: await getText("get_started"),
    fields: [
      {
        name: "email",
        type: "email",
        label: await getText("email"),
        placeholder: await getText("enter_your_email"),
        required: true
      },
      {
        name: "password",
        type: "password",
        label: await getText("password"),
        placeholder: await getText("enter_your_password"),
        required: true
      }
    ],
    buttons: [
      {
        label: await getText("signup"),
        customClass: "w-full",
        type: "submit"
      }
    ],
    enableTurnstile: true,
    turnstileSiteKey: PUBLIC_TURNSTILE_KEY
  };
  gclcSignUpFields = {
    title: await getText("get_started"),
    fields: [
      {
        name: "email",
        type: "email",
        label: await getText("email"),
        placeholder: await getText("enter_your_email"),
        required: true
      }
    ],
    buttons: [
      {
        label: await getText("signup"),
        customClass: "w-full",
        type: "submit"
      }
    ],
    enableTurnstile: true,
    turnstileSiteKey: PUBLIC_TURNSTILE_KEY
  };
  loginFields = {
    title: await getText("welcome"),
    fields: [
      {
        name: "email",
        type: "email",
        label: await getText("email"),
        placeholder: await getText("enter_your_email"),
        required: true
      },
      {
        name: "password",
        type: "password",
        label: await getText("password"),
        placeholder: await getText("enter_your_password"),
        required: true
      }
    ],
    buttons: [
      {
        label: await getText("login"),
        type: "submit",
        customClass: "w-full"
      }
    ],
    enableTurnstile: false,
    turnstileSiteKey: "site-key"
  };
  userSelectionCardsPopup = async () => [
    {
      image: "/images/learner-icon.svg",
      title: await getText("a_learner"),
      description: await getText("play_fun_games"),
      onClick: () => {
        authModalStore.set({
          visible: true,
          page: "user-signup"
        });
      }
    },
    {
      image: "/images/institute-icon.svg",
      title: await getInstanceTextAsync("an_institute"),
      description: await getInstanceTextAsync("empower"),
      onClick: () => {
        authModalStore.set({
          visible: true,
          page: "institution-signup"
        });
      }
    }
  ];
  forgotPasswordFields = {
    title: await getText("forgot_password"),
    fields: [
      {
        name: "email",
        type: "email",
        label: await getText("email"),
        placeholder: await getText("enter_your_email"),
        required: true
      }
    ],
    buttons: [
      {
        label: await getText("send_reset_link"),
        type: "submit",
        customClass: "w-full"
      }
    ],
    enableTurnstile: true,
    turnstileSiteKey: PUBLIC_TURNSTILE_KEY
  };
  ({
    title: await getText("reset_password"),
    fields: [
      {
        name: "password",
        type: "password",
        label: await getText("enter_new_password"),
        placeholder: await getText("enter_your_new_password"),
        required: true
      },
      {
        name: "confirmPassword",
        type: "password",
        label: await getText("confirm_new_password"),
        placeholder: await getText("re_enter_new_password"),
        required: true
      }
    ],
    buttons: [
      {
        label: await getText("reset_password"),
        type: "submit",
        customClass: "w-full"
      }
    ]
  });
  ({
    title: await getText("get_started"),
    fields: [
      {
        name: "password",
        type: "password",
        label: await getText("password"),
        placeholder: await getText("password"),
        required: true
      }
    ],
    buttons: [
      {
        label: await getText("signup"),
        type: "submit",
        customClass: "w-full"
      }
    ],
    footer: {
      text: await getText("already_account"),
      button: {
        label: await getText("login")
      }
    }
  });
  shupavuLoginFields = {
    title: await getText("welcome"),
    fields: [
      {
        name: "phone_number",
        type: "tel",
        label: await getText("phone_number"),
        prefix: "+254",
        required: true,
        placeholder: await getText("enter_phone_number")
      },
      {
        name: "password",
        type: "password",
        label: await getText("password"),
        placeholder: await getText("enter_your_password"),
        required: true
      }
    ],
    buttons: [
      {
        label: await getText("login"),
        type: "submit",
        customClass: "w-full"
      }
    ],
    enableTurnstile: false,
    turnstileSiteKey: "site-key"
  };
  shupavuSignupFields = {
    title: await getText("enter_phone_number_continue"),
    fields: [
      {
        name: "phone_number",
        type: "tel",
        label: await getText("phone_number"),
        prefix: "+254",
        required: true,
        placeholder: await getText("enter_phone_number")
      }
    ],
    buttons: [
      {
        label: await getText("signup"),
        type: "submit",
        customClass: "w-full"
      }
    ],
    enableTurnstile: true,
    turnstileSiteKey: PUBLIC_TURNSTILE_KEY
  };
  otpVerificationField = {
    title: await getText("confirm_your_number"),
    fields: [
      {
        name: "otp",
        type: "text",
        label: await getText("otp_code"),
        placeholder: await getText("enter_code"),
        required: true
      },
      {
        name: "password",
        type: "password",
        label: await getText("password"),
        placeholder: await getText("password"),
        required: true,
        isShow: false
      }
    ],
    buttons: [
      {
        label: await getText("verify"),
        type: "submit",
        customClass: "w-full"
      }
    ],
    footer: {
      text: await getText("already_account"),
      button: {
        label: await getText("login"),
        type: "secondary-outlined-inverted",
        link: "/account/user/login"
      }
    },
    handleSubmit: async (formData) => {
      const { is_otp_verified, phone_number } = get(otpStore);
      if (is_otp_verified) {
        const updatedFormData = {
          ...formData,
          phone_number,
          username: ""
        };
        const { signUpUserUsingFormData } = await import("./user.auth.da.js").then(async (m) => {
          await m.__tla;
          return m;
        }).then((n) => n.d);
        signUpUserUsingFormData(updatedFormData, "learner", true);
      } else {
        handleOtpVerification(formData);
      }
    },
    enableTurnstile: true,
    turnstileSiteKey: PUBLIC_TURNSTILE_KEY
  };
  logoutUser = async function(isToast) {
    if (localStorage) {
      userStore.set({});
      localStorage.clear();
      resetGuestStore();
    }
    if (sessionStorage) {
      sessionStorage.clear();
    }
    goto();
  };
  handleGoogleLogin = function(role) {
    const currentPage = window.location.href;
    const isGuestMode = get(userStore).is_guest_mode;
    const params = new URLSearchParams({
      client_id: PUBLIC_GOOGLE_CLIENT_ID,
      redirect_uri: `${window.location.origin}/auth/google`,
      response_type: "token",
      scope: "openid email profile",
      prompt: "select_account"
    });
    const stateData = {
      defaultUrl: currentPage,
      ...isGuestMode ? {
        returnUrl: currentPage,
        role
      } : {
        role
      }
    };
    params.append("state", encodeURIComponent(JSON.stringify(stateData)));
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  };
  openCoachApp = function() {
    const authModalState = get(authModalStore);
    if (authModalState.visible) {
      authModalStore.set({
        visible: false,
        page: ""
      });
    }
    window.dispatchEvent(new Event("loaderStart"));
    openIframe(PUBLIC_LMS_URL);
  };
  const handleOtpVerification = async (data) => {
    const otpData = get(otpStore);
    const { turnstileToken, ...filteredData } = data;
    const requestData = {
      ...filteredData,
      phone_number: otpData.phone_number,
      t_token: turnstileToken,
      otp: data.otp
    };
    const response = await request(API_DEFINITIONS.OTP_VERIFY, requestData, {});
    if (response.error_code == 0) {
      otpStore.update((store) => ({
        ...store,
        is_otp_verified: true
      }));
    }
  };
});
export {
  __tla,
  authModalStore as a,
  otpStore as b,
  openCoachApp as c,
  loginFields as d,
  shupavuSignupFields as e,
  signUpFields as f,
  gclcSignUpFields as g,
  handleGoogleLogin as h,
  guestStore as i,
  forgotPasswordFields as j,
  logoutUser as l,
  otpVerificationField as o,
  shupavuLoginFields as s,
  userSelectionCardsPopup as u
};
