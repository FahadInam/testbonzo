import { goto } from "$app/navigation";
import { request } from "$lib/api.service";
import { CountryListGCLC } from "$lib/constants/country.constant";
import { TimeZoneList } from "$lib/constants/timezone.constants";
import { get } from "svelte/store";
import { API_DEFINITIONS } from "../../apis/api.definitions";
import { getText } from "../../stores/language.store";
import { showError, showSuccess } from "../../stores/toast.store";
import { isGCLC, isPocketGames, isShupavu } from "../system/system..da";
import { systemSettingsStore } from "../../stores/systemsettings.store";
import { userStore } from "../../stores/user.store";
import { updateStoreVariable } from "$lib/utils";
import { competitionStore } from "../../stores/competition.store";

/**
 * @param {boolean | undefined} [cameFromChangeGrade]
 */
export async function getUserProfileFields(cameFromChangeGrade) {
  /**
   * @type {never[]}
   */
  const cityList = get(systemSettingsStore)?.city_list || [];
  return {
    title: "",
    fields: [
      ...(!isShupavu
        ? [
            {
              name: "email",
              type: "email",
              label: await getText("email"),
              placeholder: await getText("enter_your_email"),
              required: true,
              readonly: true,
              layout: "half",
              value: "",
            },
          ]
        : []),
      {
        name: "name",
        type: "text",
        label: await getText(isShupavu ? "name_label_sh" : "name"),
        placeholder: await getText("enter_your_name"),
        required: true,
        layout: "half",
        value: "",
      },
      {
        name: "contact_number",
        type: "text",
        label: await getText("contact_number"),
        placeholder: await getText("enter_contact_number"),
        required: true,
        layout: "half",
        value: "",
        readonly: isShupavu,
      },
      {
        name: "date_of_birth",
        type: "date",
        label: await getText("date_of_birth"),
        placeholder: await getText("enter_your_dob"),
        required: false,
        layout: "half",
        value: "",
      },
      ...(isGCLC
        ? [
            {
              name: "country",
              type: "select",
              label: await getText("country_territory"),
              placeholder: await getText("select_country"),
              required: false,
              layout: "half",
              options: [{ value: "", label: "Select Country" }, ...CountryListGCLC],
              value: "",
            },
            {
              name: "city",
              label: await getText("city"),
              type: "text",
              placeholder: await getText("enter_your_city"),
              required: true,
              layout: "half",
              value: "",
            },
          ]
        : [
            {
              name: "city",
              type: "select",
              label: await getText("city"),
              placeholder: await getText("enter_your_city"),
              required: false,
              layout: "half",
              options: [{ value: "", label: "Select City" }, ...cityList],
              value: "",
            },
          ]),
      ...(!isPocketGames
        ? [
            {
              name: "school_name",
              type: "text",
              label: await getText("school"),
              placeholder: await getText("enter_school_name"),
              required: false,
              readonly: true,
              layout: "half",
              value: "",
            },
          ]
        : []),
      ...(isShupavu
        ? [
            {
              name: "timezone",
              type: "select",
              label: await getText("time_zone"),
              placeholder: await getText("select_your_timezone"),
              required: false,
              layout: "half",
              options: TimeZoneList,
              value: "",
            },
          ]
        : []),
    ],
    buttons: [
      {
        label: await getText("cancel"),
        type: "",
        action: "cancel",
        layout: "3d-primary",
        customClass: "w-full sm:w-[160px] text-lg md:text-[22px]",
      },
      {
        label: await getText("save"),
        type: "submit",
        action: "",
        layout: "3d-secondary",
        customClass: "w-full sm:w-[160px] text-lg md:text-[22px]",
      },
    ],
    enableTurnstile: false,
    handleSubmit: (/** @type {any} */ formData) => {
      saveProfileData(formData, cameFromChangeGrade);
    },
  };
}

// get profile data
export async function getProfileData() {
  return await request(API_DEFINITIONS.USER_PROFILE, {});
}

// save profile data
/**
 * @param {{ city: any; date_of_birth: any; dob: any; name: any; school_name: any; gender: any; country: any; contact_number: any; phone_number: any; profile_picture: any; timezone: any; }} profileData
 * @param {boolean | undefined} cameFromChangeGrade
 */
export async function saveProfileData(profileData, cameFromChangeGrade) {
  // Ensure all required parameters are included
  const DTO = {
    competition_id: 0, // You might need to get this from somewhere
    city: profileData.city || "",
    dob: profileData.date_of_birth || profileData.dob || "", // Handle both field names
    name: profileData.name || "",
    school: profileData.school_name || "",
    gender: profileData.gender || "", // Default value if not provided
    country: profileData.country || "",
    phone_number: profileData.contact_number || profileData.phone_number || "", // Handle both field names
    profile_picture: profileData.profile_picture || "41", // Default value
    timezone: profileData.timezone || "",
    school_id: 0, // You might need to derive this from school_name
  };

  if (!(await validName(DTO.name))) {
    return; // Exit if name validation fails
  }

  const data = await request(API_DEFINITIONS.SAVE_PROFILE, DTO);
  if (data.error_code == 0) {
    showSuccess("Profile updated successfully!");

    //update the store here
    userStore.update((u) => ({
      ...u,
      profile_picture: DTO.profile_picture,
    }));
    updateStoreVariable(userStore, "name", DTO.name);
    if (cameFromChangeGrade) {
      goto("/competitions/" + get(competitionStore).url + "/home");
    } else {
      history.back();
    }
  }
}

const validName = async (/** @type {string | number} */ name) => {
  const texts = {
    NAME_REQUIRED: await getText("name_required"),
    INVALID_NAME: await getText("invalid_name"),
    NAME_REQUIRED_SH: await getText("name_required_sh"),
  };

  if (!name || !String(name).trim()) {
    showError(texts.NAME_REQUIRED);
    return false;
  }

  if (!isNaN(Number(name))) {
    showError(isShupavu ? texts.NAME_REQUIRED_SH : texts.INVALID_NAME);
    return false;
  }

  if (!/^[a-zA-Z0-9@.\s]+$/.test(String(name).trim())) {
    showError(texts.INVALID_NAME);
    return false;
  }

  return true;
};
