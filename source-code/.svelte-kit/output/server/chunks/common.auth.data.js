import { g as getText } from "./language.store.js";
import { P as PUBLIC_TURNSTILE_KEY, b as PUBLIC_GOOGLE_CLIENT_ID, c as PUBLIC_LMS_URL } from "./public.js";
import { w as writable, g as get } from "./index3.js";
import { g as goto } from "./client.js";
import "notyf";
import { u as userStore } from "./user.store.js";
import { e as getInstanceTextAsync } from "./utils.js";
import { __tla as __tla_0 } from "./api.definitions.js";
import "./avatar2.js";
let authModalStore, shupavuLoginFields, loginFields, shupavuSignupFields, signUpFields, guestStore, gclcSignUpFields, handleGoogleLogin, forgotPasswordFields, logoutUser, openCoachApp, shupavuForgotPasswordFields, userSelectionCardsPopup;
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
        required: true,
        showPasswordStrength: true
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
        required: true,
        showPasswordStrength: true
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
        required: true,
        showPasswordStrength: true
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
  shupavuForgotPasswordFields = {
    title: await getText("reset_your_password"),
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
        label: await getText("next"),
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
});
export {
  __tla,
  authModalStore as a,
  shupavuLoginFields as b,
  loginFields as c,
  shupavuSignupFields as d,
  signUpFields as e,
  guestStore as f,
  gclcSignUpFields as g,
  handleGoogleLogin as h,
  forgotPasswordFields as i,
  logoutUser as l,
  openCoachApp as o,
  shupavuForgotPasswordFields as s,
  userSelectionCardsPopup as u
};
