import { request } from "$lib/api.service";
import { get } from "svelte/store";
import { API_DEFINITIONS } from "../../apis/api.definitions";
import { authModalStore } from "../../stores/auth.modal.store";
import { getText } from "../../stores/language.store";
import {
  gclcSignUpFields,
  handleGoogleLogin,
  loginFields,
  signUpFields,
} from "./common.auth.data";
import {
  loginUser,
  refreshUserToken,
  signUpUserUsingFormData,
} from "./user.auth.da";
import { instanceStore } from "../../stores/instance.store";
import { goto } from "$app/navigation";
import { isGCLC } from "../system/system..da";
import { systemSettingsStore } from "../../stores/systemsettings.store";
import { CountryListGCLC } from "$lib/constants/country.constant";
/**
 * @type {never[]}
 */
const cityList = get(systemSettingsStore)?.city_list || [];

console.log(isGCLC, "isGclc");
export const signUpInstitutionForm = {
  ...(isGCLC ? gclcSignUpFields : signUpFields),
  handleSubmit: async (/** @type {any} */ formData) => {
    await signUpUserUsingFormData(formData, "principal");
  },
  alternativeButtons: [
    {
      label: await getText("c_google"),
      type: "secondary-outlined-inverted",
      image: "/images/google-icon.png",
      /** @param {string} role */
      onClick: (role) => handleGoogleLogin(role),
    },
  ],
  footer: {
    text: await getText("already_account"),
    button: {
      label: await getText("login"),
      type: "secondary-outlined-inverted",
      link: "/account/institution/login",
    },
  },
  role: "principal",
};

export const institutionLoginForm = {
  ...loginFields,
  handleSubmit: async (/** @type {any} */ formData) => {
    await loginUser(formData.email, formData.password);
  },
  alternativeButtons: [
    {
      label: await getText("c_google"),
      type: "secondary-outlined-inverted",
      image: "/images/google-icon.png",
      /** @param {string} role */
      onClick: (role) => handleGoogleLogin(role),
    },
  ],
  footer: {
    text: await getText("no_account"),
    button: {
      label: await getText("signup"),
      type: "secondary-outlined-inverted",
      link: "/account/institution/signup",
    },
  },
  forgotPassword: {
    label: await getText("forgot_password"),
    link: "/account/forgot-password",
  },
  role: "principal",
};

export const institutionLoginFormPopup = {
  ...institutionLoginForm,
  footer: {
    text: await getText("no_account"),
    button: {
      label: await getText("signup"),
      type: "secondary-outlined-inverted",
      onClick: () => {
        authModalStore.set({ visible: true, page: "institution-signup" });
      },
    },
  },
};

export const signUpInstitutionFormPopup = {
  ...signUpInstitutionForm,
  footer: {
    text: await getText("already_account"),
    button: {
      label: await getText("login"),
      type: "secondary-outlined-inverted",
      onClick: () => {
        authModalStore.set({ visible: true, page: "institution-login" });
      },
    },
  },
};

export const institutionDetails = {
  title: await getText("enter_your_details"),
  fields: [
    {
      name: "instituteName",
      label: await getText("institute_name"),
      type: "text",
      placeholder: await getText("enter_institute_name"),
      required: true,
      layout: "full",
      value: "", // Add default empty value
    },
    ...(!isGCLC
      ? [
          {
            name: "instituteCity",
            label: await getText("institute_city"),
            type: "select",
            placeholder: await getText("enter_institute_city"),
            required: true,
            layout: "full",
            options: [{ value: "", label: "Select City" }, ...cityList],
            value: "", // Add default empty value
          },
        ]
      : [
          {
            name: "country",
            type: "select",
            label: await getText("country_territory"),
            placeholder: await getText("select_country"),
            required: false,
            layout: "full",
            options: [
              { value: "", label: "Select Country" },
              ...CountryListGCLC,
            ],
            value: "",
          },
          {
            name: "instituteCity",
            label: await getText("institute_city"),
            type: "text",
            placeholder: await getText("enter_institute_city"),
            required: true,
            layout: "half",
          },
        ]),
    {
      name: "schoolNetwork",
      label: await getText("school_network"),
      type: "text",
      placeholder: await getText("enter_school_network"),
      required: false,
      layout: "half",
      value: "", // Add default empty value
    },
    {
      name: "instituteAddress",
      label: await getText("institute_address"),
      type: "text",
      placeholder: await getText("enter_address"),
      required: true,
      layout: "half",
      value: "", // Add default empty value
    },
    {
      name: "principal",
      label: await getText("principal_name"),
      type: "text",
      placeholder: await getText("enter_principal_name"),
      required: true,
      layout: isGCLC ? "half" : "full",
      value: "",
    },
    {
      name: "contact",
      label: await getText("contact"),
      type: "tel",
      placeholder: "0300 1234567",
      required: true,
      layout: "half",
      value: "",
    },
    ...(isGCLC
      ? [
          {
            name: "heardFrom",
            label: await getText("heard_from"),
            type: "text",
            placeholder: await getText("heard_from"),
            required: false,
            layout: "full",
            value: "",
          },
        ]
      : []),
  ],
  buttons: [
    {
      label: await getText("account"),
      type: "submit",
      action: "submit",
      customClass: "w-full",
    },
  ],
  handleSubmit: async (/** @type {any} */ formData) => {
    console.log(formData, "formData");
    await saveInstitutionDetails(formData);
  },
  enableTurnstile: false,
};

export async function saveInstitutionDetails(formData) {
  const instance_id = get(instanceStore).instance_id;
  const {
    instituteName,
    instituteCity,
    schoolNetwork,
    instituteAddress,
    principal,
    contact,
  } = formData;
  const data = await request(
    API_DEFINITIONS.INSTITUTION_DETAILS,
    {
      institution_name: instituteName,
      institution_city: instituteCity,
      institution_network: schoolNetwork,
      institution_address: instituteAddress,
      principal_name: principal,
      phone_number: contact,
    },
    {
      headers: {
        instance_id: instance_id,
      },
    },
  );
  if (data.error_code == 0) {
    await refreshUserToken(async () => {
      goto("/admin/competitions");
    });
  }
}
