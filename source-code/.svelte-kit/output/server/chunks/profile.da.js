import "./client.js";
import { g as get } from "./index2.js";
import "./user.store.js";
import "lz-string";
import "./client2.js";
import "clsx";
import { g as getText } from "./language.store.js";
import { a as isShupavu, i as isGCLC, b as isPocketGames, s as systemSettingsStore } from "./system..da.js";
import { C as CountryListGCLC } from "./country.constant.js";
import { T as TimeZoneList } from "./timezone.constants.js";
import { __tla as __tla_0 } from "./api.definitions.js";
import "notyf";
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const cityList = get(systemSettingsStore)?.city_list || [];
  ({
    fields: [
      ...!isShupavu ? [
        {
          name: "email",
          type: "email",
          label: await getText("email"),
          placeholder: await getText("enter_your_email"),
          required: true,
          readonly: true,
          layout: "half",
          value: ""
        }
      ] : [],
      {
        name: "name",
        type: "text",
        label: await getText("name"),
        placeholder: await getText("enter_your_name"),
        required: true,
        layout: "half",
        value: ""
      },
      {
        name: "contact_number",
        type: "number",
        label: await getText("contact_number"),
        placeholder: await getText("enter_contact_number"),
        required: true,
        layout: "half",
        value: "",
        readonly: isShupavu
      },
      {
        name: "date_of_birth",
        type: "date",
        label: await getText("date_of_birth"),
        placeholder: await getText("enter_your_dob"),
        required: false,
        layout: "half",
        value: ""
      },
      {
        name: "city",
        type: "select",
        label: await getText("city"),
        placeholder: await getText("enter_your_city"),
        required: true,
        layout: "half",
        options: [
          {
            value: "",
            label: "Select City"
          },
          ...cityList
        ],
        value: ""
      },
      ...isGCLC ? [
        {
          name: "country",
          type: "select",
          label: await getText("country_territory"),
          placeholder: await getText("select_country"),
          required: false,
          layout: "half",
          options: [
            {
              value: "",
              label: "Select Country"
            },
            ...CountryListGCLC
          ],
          value: ""
        }
      ] : [],
      ...!isPocketGames ? [
        {
          name: "school_name",
          type: "text",
          label: await getText("school"),
          placeholder: await getText("enter_school_name"),
          required: false,
          readonly: true,
          layout: "half",
          value: ""
        }
      ] : [],
      ...isShupavu ? [
        {
          name: "timezone",
          type: "select",
          label: await getText("time_zone"),
          placeholder: await getText("select_your_timezone"),
          required: false,
          layout: "half",
          options: TimeZoneList,
          value: ""
        }
      ] : []
    ],
    buttons: [
      {
        label: await getText("cancel"),
        type: "",
        action: "cancel",
        layout: "3d-primary",
        customClass: "w-full md:w-auto md:min-w-[240px]"
      },
      {
        label: await getText("save"),
        type: "submit",
        action: "",
        layout: "3d-secondary",
        customClass: "w-full md:w-auto md:min-w-[240px]"
      }
    ]
  });
});
export {
  __tla
};
