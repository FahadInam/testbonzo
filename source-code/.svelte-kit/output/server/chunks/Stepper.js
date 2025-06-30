import { j as ensure_array_like, c as attr, e as escape_html, f as stringify, d as bind_props, p as pop, b as push } from "./index.js";
import { a as isShupavu } from "./system..da.js";
import { f as fallback } from "./utils2.js";
function Stepper($$payload, $$props) {
  push();
  let stepStates;
  let steps = fallback(
    $$props["steps"],
    () => [
      { title: "Step 1" },
      { title: "Step 2" },
      { title: "Step 3" }
    ],
    true
  );
  let activeStep = fallback($$props["activeStep"], 1);
  stepStates = steps.map((step, index) => {
    const stepNumber = index + 1;
    return {
      ...step,
      completed: stepNumber < activeStep,
      // Previous steps are completed
      active: stepNumber === activeStep,
      // Current step is active
      pending: stepNumber > activeStep
      // Next steps are pending
    };
  });
  const each_array = ensure_array_like(stepStates);
  $$payload.out += `<div${attr("class", `max-w-[1000px] w-full mx-auto  px-4 ${isShupavu ? "mt-3" : "mt-8"}`)}><ol class="flex"><!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let step = each_array[index];
    $$payload.out += `<li class="flex flex-col items-center flex-1 text-center relative"><div class="w-7 h-7 rounded-full bg-white border border-[#112D70] mb-2 flex items-center justify-center"><svg${attr("class", `w-4 h-4 $${stringify(step.completed || step.active ? "text-[#112D70]" : "text-[#A3A8B5]")}`)} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div> <h3${attr("class", `mb-2 ${step.active ? "font-semibold text-[#112D70]" : step.completed ? "font-medium text-[#112D70]" : "font-medium text-[#A3A8B5]"}`)}>${escape_html(step.title)}</h3> `;
    if (index < steps.length - 1) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="absolute top-3.5 left-[calc(50%+1.75rem)] w-[calc(100%-3.5rem)] h-0.5 bg-gray-300"></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <p class="text-gray-500 text-sm px-2">${escape_html(step.description)}</p></li>`;
  }
  $$payload.out += `<!--]--></ol></div>`;
  bind_props($$props, { steps, activeStep });
  pop();
}
export {
  Stepper as S
};
