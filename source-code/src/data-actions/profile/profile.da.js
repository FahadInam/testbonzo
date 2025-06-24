import { goto } from "$app/navigation";
import { request } from "$lib/api.service";
import { CountryListGCLC } from "$lib/constants/country.constant";
import { TimeZoneList } from "$lib/constants/timezone.constants";
import { get } from "svelte/store";
import { API_DEFINITIONS } from "../../apis/api.definitions";
import { getText } from "../../stores/language.store";
import { showSuccess } from "../../stores/toast.store";
import { isGCLC, isPocketGames, isShupavu } from "../system/system..da";
import { systemSettingsStore } from "../../stores/systemsettings.store";
import { userStore } from "../../stores/user.store";

export async function getUserProfileFields() {
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
        label: await getText("name"),
        placeholder: await getText("enter_your_name"),
        required: true,
        layout: "half",
        value: "",
      },
      {
        name: "contact_number",
        type: "number",
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
              required: true,
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
      saveProfileData(formData);
    },
  };
}

// get profile data
export async function getProfileData() {
  return await request(API_DEFINITIONS.USER_PROFILE, {});
}

// save profile data
export async function saveProfileData(profileData) {
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

  const data = await request(API_DEFINITIONS.SAVE_PROFILE, DTO);
  if (data.error_code == 0) {
    showSuccess("Profile updated successfully!");

    //update the store here
    userStore.update((u) => ({
      ...u,
      profile_picture: DTO.profile_picture,
    }));
    history.back();
  }
}
