import { getText } from "../../stores/language.store";

export const mainSectionButtons = [
  {
    name: "learner",
    type: "primary",
    label: await getText("learner"),
    size: "large",
    link: "/account/user/signup",
  },
  {
    name: "institution",
    type: "secondary",
    label: await getText("institution"),
    size: "large",
    link: "/account/institution/signup",
  },
  {
    name: "guest",
    type: "secondary-outlined",
    label: await getText("guests"),
    size: "large",
    link: "/competitions",
  },
];
