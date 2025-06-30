import { r as request } from "./api.service.js";
import { g as get } from "./index2.js";
import { A as API_DEFINITIONS, __tla as __tla_0 } from "./api.definitions.js";
import { h as handleGoogleLogin, g as gclcSignUpFields, s as signUpFields, c as loginFields, a as authModalStore, __tla as __tla_1 } from "./common.auth.data.js";
import { g as getText } from "./language.store.js";
import { b as refreshUserToken, l as loginUser, s as signUpUserUsingFormData, __tla as __tla_2 } from "./user.auth.da.js";
import { i as instanceStore } from "./instance.store.js";
import "./client.js";
import { i as isGCLC, s as systemSettingsStore } from "./system..da.js";
import { C as CountryListGCLC } from "./country.constant.js";
let institutionDetails, signUpInstitutionFormPopup, institutionLoginFormPopup, institutionLoginForm, signUpInstitutionForm;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })()
]).then(async () => {
  const cityList = get(systemSettingsStore)?.city_list || [];
  console.log(isGCLC, "isGclc");
  signUpInstitutionForm = {
    ...isGCLC ? gclcSignUpFields : signUpFields,
    handleSubmit: async (formData) => {
      await signUpUserUsingFormData(formData, "principal");
    },
    alternativeButtons: [
      {
        label: await getText("c_google"),
        type: "secondary-outlined-inverted",
        image: "/images/google-icon.png",
        onClick: (role) => handleGoogleLogin(role)
      }
    ],
    footer: {
      text: await getText("already_account"),
      button: {
        label: await getText("login"),
        type: "secondary-outlined-inverted",
        link: "/account/institution/login"
      }
    },
    role: "principal"
  };
  institutionLoginForm = {
    ...loginFields,
    handleSubmit: async (formData) => {
      await loginUser(formData.email, formData.password);
    },
    alternativeButtons: [
      {
        label: await getText("c_google"),
        type: "secondary-outlined-inverted",
        image: "/images/google-icon.png",
        onClick: (role) => handleGoogleLogin(role)
      }
    ],
    footer: {
      text: await getText("no_account"),
      button: {
        label: await getText("signup"),
        type: "secondary-outlined-inverted",
        link: "/account/institution/signup"
      }
    },
    forgotPassword: {
      label: await getText("forgot_password"),
      link: "/account/forgot-password"
    },
    role: "principal"
  };
  institutionLoginFormPopup = {
    ...institutionLoginForm,
    footer: {
      text: await getText("no_account"),
      button: {
        label: await getText("signup"),
        type: "secondary-outlined-inverted",
        onClick: () => {
          authModalStore.set({
            visible: true,
            page: "institution-signup"
          });
        }
      }
    }
  };
  signUpInstitutionFormPopup = {
    ...signUpInstitutionForm,
    footer: {
      text: await getText("already_account"),
      button: {
        label: await getText("login"),
        type: "secondary-outlined-inverted",
        onClick: () => {
          authModalStore.set({
            visible: true,
            page: "institution-login"
          });
        }
      }
    }
  };
  institutionDetails = {
    title: await getText("enter_your_details"),
    fields: [
      {
        name: "instituteName",
        label: await getText("institute_name"),
        type: "text",
        placeholder: await getText("enter_institute_name"),
        required: true,
        layout: "full",
        value: ""
      },
      ...!isGCLC ? [
        {
          name: "instituteCity",
          label: await getText("institute_city"),
          type: "select",
          placeholder: await getText("enter_institute_city"),
          required: true,
          layout: "full",
          options: [
            {
              value: "",
              label: "Select City"
            },
            ...cityList
          ],
          value: ""
        }
      ] : [
        {
          name: "country",
          type: "select",
          label: await getText("country_territory"),
          placeholder: await getText("select_country"),
          required: false,
          layout: "full",
          options: [
            {
              value: "",
              label: "Select Country"
            },
            ...CountryListGCLC
          ],
          value: ""
        },
        {
          name: "instituteCity",
          label: await getText("institute_city"),
          type: "text",
          placeholder: await getText("enter_institute_city"),
          required: true,
          layout: "half"
        }
      ],
      {
        name: "schoolNetwork",
        label: await getText("school_network"),
        type: "text",
        placeholder: await getText("enter_school_network"),
        required: false,
        layout: "half",
        value: ""
      },
      {
        name: "instituteAddress",
        label: await getText("institute_address"),
        type: "text",
        placeholder: await getText("enter_address"),
        required: true,
        layout: "half",
        value: ""
      },
      {
        name: "principal",
        label: await getText("principal_name"),
        type: "text",
        placeholder: await getText("enter_principal_name"),
        required: true,
        layout: isGCLC ? "half" : "full",
        value: ""
      },
      {
        name: "contact",
        label: await getText("contact"),
        type: "tel",
        placeholder: "0300 1234567",
        required: true,
        layout: "half",
        value: ""
      },
      ...isGCLC ? [
        {
          name: "heardFrom",
          label: await getText("heard_from"),
          type: "text",
          placeholder: await getText("heard_from"),
          required: false,
          layout: "full",
          value: ""
        }
      ] : []
    ],
    buttons: [
      {
        label: await getText("account"),
        type: "submit",
        action: "submit",
        customClass: "w-full"
      }
    ],
    handleSubmit: async (formData) => {
      console.log(formData, "formData");
      await saveInstitutionDetails(formData);
    },
    enableTurnstile: false
  };
  async function saveInstitutionDetails(formData) {
    const instance_id = get(instanceStore).instance_id;
    const { instituteName, instituteCity, schoolNetwork, instituteAddress, principal, contact } = formData;
    const data = await request(API_DEFINITIONS.INSTITUTION_DETAILS, {
      institution_name: instituteName,
      institution_city: instituteCity,
      institution_network: schoolNetwork,
      institution_address: instituteAddress,
      principal_name: principal,
      phone_number: contact
    }, {
      headers: {
        instance_id
      }
    });
    if (data.error_code == 0) {
      await refreshUserToken();
    }
  }
});
export {
  __tla,
  institutionDetails as a,
  signUpInstitutionFormPopup as b,
  institutionLoginFormPopup as c,
  institutionLoginForm as i,
  signUpInstitutionForm as s
};
