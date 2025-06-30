import { a as slot, c as bind_props } from "./index.js";
import { A as ArrowButton } from "./ArrowButton.js";
import { B as BackgroundImage } from "./BackgroundImage.js";
import { f as fallback } from "./utils2.js";
function PopupScreen($$payload, $$props) {
  let backButtonLabel = fallback($$props["backButtonLabel"], "");
  let backButtonLink = fallback($$props["backButtonLink"], "");
  let showBackButton = fallback($$props["showBackButton"], true);
  $$payload.out += `<div class="min-h-screen flex items-center justify-center relative px-4 bg-blue-500" style="background: var(--background-gradient);">`;
  BackgroundImage($$payload, {});
  $$payload.out += `<!----> `;
  if (showBackButton) {
    $$payload.out += "<!--[-->";
    ArrowButton($$payload, {
      label: backButtonLabel,
      arrowType: "back",
      link: backButtonLink,
      customClass: "hidden md:flex text-white hover:text-gray-300 fixed top-4 left-4"
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="bg-[#fbfbfb] w-full max-w-[600px] md:max-h-[90%] md:h-auto rounded-2xl shadow-lg overflow-y-auto relative" style="margin: 15px 0;">`;
  if (showBackButton) {
    $$payload.out += "<!--[-->";
    ArrowButton($$payload, {
      label: backButtonLabel,
      arrowType: "back",
      link: backButtonLink,
      customClass: "flex md:hidden text-gray-600 hover:text-gray-800 absolute top-10 left-2"
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="p-10"><div><!---->`;
  slot($$payload, $$props, "body", {});
  $$payload.out += `<!----></div></div> <div><!---->`;
  slot($$payload, $$props, "footer", {});
  $$payload.out += `<!----></div></div></div>`;
  bind_props($$props, {
    backButtonLabel,
    backButtonLink,
    showBackButton
  });
}
export {
  PopupScreen as P
};
