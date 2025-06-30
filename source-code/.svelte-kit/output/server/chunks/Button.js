import { c as bind_props, p as pop, b as push, d as stringify } from "./index.js";
import "./client.js";
import { f as fallback } from "./utils2.js";
import { a as attr } from "./attributes.js";
import "./client2.js";
import { e as escape_html } from "./escaping.js";
function Button($$payload, $$props) {
  push();
  let label = fallback($$props["label"], "");
  let type = fallback($$props["type"], "primary");
  let size = fallback($$props["size"], "medium");
  let responsive = fallback($$props["responsive"], false);
  let width = fallback($$props["width"], "auto");
  let image = fallback($$props["image"], "");
  let imagePosition = fallback($$props["imagePosition"], "before");
  let imageClass = fallback($$props["imageClass"], "");
  let onClick = fallback($$props["onClick"], () => {
  });
  let link = fallback($$props["link"], "");
  let customClass = fallback($$props["customClass"], "");
  const textSize = {
    small: "text-md",
    medium: "text-lg",
    large: "text-xl",
    xlarge: "text-2xl"
  }[size];
  const buttonClasses = {
    primary: `text-white bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] rounded-xl font-semibold text-lg`,
    secondary: `text-[var(--primary-color)] bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-hover)] rounded-xl font-semibold text-lg`,
    "secondary-outlined": `bg-transparent border-2 border-white text-white hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] rounded-xl font-semibold text-lg`,
    "secondary-outlined-inverted": `bg-transparent border-2 border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--secondary-color-hover)] hover:text-[var(--primary-color)] rounded-xl font-semibold text-lg`,
    "3d-primary": `button3d origin-center cursor-pointer font-semibold text-lg rounded-lg text-black button3d-text-shadow`,
    "3d-secondary": `button3d secondary origin-center cursor-pointer font-semibold text-lg text-center rounded-lg text-black button3d-text-shadow`
  }[type];
  const isIconClass = (img) => typeof img === "string" && img.startsWith("i-");
  $$payload.out += `<button type="button"${attr("class", `${stringify(`${textSize} px-3 md:px-4 font-bold py-2.5 text-center inline-block ${customClass} ${buttonClasses} ${width === "full" ? "w-full" : width} ${responsive ? "w-full md:w-40" : ""}`)} svelte-1rqbruh`)}><div class="flex flex-row items-center justify-center">`;
  if (image?.length > 0 && imagePosition === "before") {
    $$payload.out += "<!--[-->";
    if (isIconClass(image)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<i${attr("class", `${stringify(`i ${image} ${imageClass} mr-2`)} svelte-1rqbruh`)}></i>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<img${attr("src", image)}${attr("class", `${stringify(`${imageClass} mr-2`)} svelte-1rqbruh`)} alt="Button icon">`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (type.startsWith("3d-")) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="bg-white rounded-xl w-5 h-1 absolute top-0.5 right-3.5"></span> <span class="bg-white rounded-xl w-1 h-1 absolute top-0.5 right-1.5"></span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> ${escape_html(label)} `;
  if (image?.length > 0 && imagePosition === "after") {
    $$payload.out += "<!--[-->";
    if (isIconClass(image)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<i${attr("class", `${stringify(`i ${image} ${imageClass} ml-2`)} svelte-1rqbruh`)}></i>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<img${attr("src", image)}${attr("class", `${stringify(`${imageClass} ml-2`)} svelte-1rqbruh`)} alt="Button icon">`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></button>`;
  bind_props($$props, {
    label,
    type,
    size,
    responsive,
    width,
    image,
    imagePosition,
    imageClass,
    onClick,
    link,
    customClass
  });
  pop();
}
export {
  Button as B
};
