<script>
    import { isShupavu } from "../../data-actions/system/system..da";

  export let steps = [
    { title: "Step 1"},
    { title: "Step 2"},
    { title: "Step 3"}
  ];

  export let activeStep = 1; // Active step number (1-based index)

  // Determine the state of each step
  $: stepStates = steps.map((step, index) => {
    const stepNumber = index + 1;
    return {
      ...step,
      completed: stepNumber < activeStep, // Previous steps are completed
      active: stepNumber === activeStep, // Current step is active
      pending: stepNumber > activeStep // Next steps are pending
    };
  });
</script>

<div class={`max-w-[1000px] w-full mx-auto  px-4 ${isShupavu ? 'mt-3' : 'mt-8'}`}>
  <ol class="flex">
    {#each stepStates as step, index}
      <li class="flex flex-col items-center flex-1 text-center relative">
        <!-- Circle with border and tick -->
        <div class="w-7 h-7 rounded-full bg-white border border-[#112D70] mb-2 flex items-center justify-center">
          <!-- Tick (checkmark) SVG -->
          <svg
            class="w-4 h-4 ${
              step.completed || step.active
                ? 'text-[#112D70]' 
                : 'text-[#A3A8B5]'
            }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <!-- Step title -->
        <h3
          class={`mb-2 ${
            step.active
              ? "font-semibold text-[#112D70]" // Active step
              : step.completed
              ? "font-medium text-[#112D70]" // Completed step
              : "font-medium text-[#A3A8B5]" // Pending step
          }`}
        >
          {step.title}
        </h3>

        <!-- Connecting line (between circles) -->
        {#if index < steps.length - 1}
          <div class="absolute top-3.5 left-[calc(50%+1.75rem)] w-[calc(100%-3.5rem)] h-0.5 bg-gray-300"></div>
        {/if}

        <!-- Step description -->
        <p class="text-gray-500 text-sm px-2">{step.description}</p>
      </li>
    {/each}
  </ol>
</div>