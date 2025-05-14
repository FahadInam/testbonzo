<script>
  import { useInView } from "$lib/utils";
  import { t } from "../../../stores/language.store";

  let openIndex = 0; // First accordion is open by default

  function toggleAccordion(index) {
    openIndex = openIndex === index ? -1 : index;
  }

  const accordionItems = [
    {
      title: "How can my organisation get started?",
      content: `
          <div class="mb-4">
            <strong class="text-base md:text-lg font-semibold">Sign Up for Existing Competitions</strong>
            <p class="text-gray-700 text-base md:text-lg">Participate in Bonzo’s competitions – perfect for organizations looking to quickly launch interactive and impactful learning experiences.</p>
          </div>
          <div class="mb-4">
            <strong class="text-base md:text-lg font-semibold">Launch Your Own Competition</strong>
            <ul class='list-disc ml-5'>
                <li class="text-gray-700 text-base md:text-lg">Choose from our extensive library of interactive games.</li>
                <li class="text-gray-700 text-base md:text-lg">Host a competition using our ready-made competitions to engage your participants.</li>
                <li class="text-gray-700 text-base md:text-lg">Design and host your own games and competitions tailored to your specific needs.</li>
            </ul>
          </div>          
        `,
    },
    {
      title: "What is the learner’s journey?",
      content: `
          <div class="mb-4">
            <strong class="text-base md:text-lg font-semibold">Introduction and Sign-up</strong>
            <p class="text-gray-700 text-base md:text-lg">Learners sign up and create their profiles on Bonzo.</p>
          </div>
          <div class="mb-4">
            <strong class="text-base md:text-lg font-semibold">Participate in Competitions</strong>
            <p class="text-gray-700 text-base md:text-lg">They engage in interactive games and challenges.</p>
          </div>
          <div class="mb-4">
             <strong class="text-base md:text-lg font-semibold">Track Progress and Earn Rewards</strong>
            <p class="text-gray-700 text-base md:text-lg">They track their progress, see their rankings, and earn rewards and badges.</p>
          </div>
          <div class="mb-4">
            <strong class="text-base md:text-lg font-semibold">Receive Feedback and Improve </strong>
            <p class="text-gray-700 text-base md:text-lg">They receive feedback on their performance to identify areas for improvement.</p>
          </div>
          <div class="mb-4">
             <strong class="text-base md:text-lg font-semibold"> Complete the Competition  </strong>
             <p class="text-gray-700 text-base md:text-lg">Learners finish the competition, review their results, and reflect on their journey.</p>
          </div>
          <div class="mb-4">
            <strong class="text-base md:text-lg font-semibold">  Ongoing Learning and Engagement   </strong>
            <p class="text-gray-700 text-base md:text-lg"> They continue to engage with new games and competitions, promoting continuous learning and growth.</p>
          </div>
        `,
    },
    {
      title: "How can you partner and sponsor with us?",
      content: `
          <div class="mb-4">
            <strong class="text-base md:text-lg font-semibold">Co-Branding Opportunities</strong>
            <p class="text-gray-700 text-base md:text-lg">Partner with Bonzo to co-brand competitions and reach a broad audience of learners. Enhance your brand visibility with innovative, game-based learning. </p>
          </div>
          <div class="mb-4">
             <strong class="text-base md:text-lg font-semibold">Sponsor Prizes</strong>
            <p class="text-gray-700 text-base md:text-lg">Sponsor prizes for our competitions to motivate and reward participants. Your sponsorship can include branded merchandise, scholarships, or other valuable rewards.</p>
          </div>
          <div class="mb-4">
            <strong class="text-base md:text-lg font-semibold">Engage a Wide Network of Students</strong>
            <p class="text-gray-700 text-base md:text-lg">Use Bonzo to engage with a diverse network of students. Our proven success in driving engagement and learning outcomes ensures your partnership will have a meaningful impact. Our partnerships have consistently led to increased brand recognition and positive educational outcomes. Join us to contribute to and benefit from our success.</p>
          </div>
        `,
    },
  ];
</script>

<div class="bg-white pt-16">
  <div class="px-4 lg:px-20">
    <h2
      class="text-3xl md:text-5xl font-semibold text-blue-900 text-center max-w-lg md:max-w-full mx-auto leading-snug"
      use:useInView={{ animationClass: "animate__fadeIn" }}
    >
      {$t("your_journey_main_title")}
    </h2>
  </div>

  <!-- Accordion Section -->
  <div class="px-4 mt-10 lg:px-20 space-y-2 relative max-w-7xl mx-auto pb-20">
    {#each accordionItems as item, index}
      <div class="rounded-[20px] overflow-hidden">
        <button
          class="w-full flex justify-between items-center px-6 py-5 text-lg md:text-xl font-semibold bg-[var(--primary-color-light)] border-b-3 border-white"
          on:click={() => toggleAccordion(index)}
        >
          <span class="font-semibold text-lg md:text-2xl">{item.title}</span>
          <span
            class="text-white bg-blue-900 rounded-full w-5 h-5 min-w-5 md:w-7 md:h-7 md:min-w-7 text-center text-base md:text-xl font-medium leading-[18px] md:leading-[25px]"
            >{openIndex === index ? "−" : "+"}</span
          >
        </button>
        <div
          class="overflow-hidden transition-all duration-500 ease-in-out"
          style="max-height: {openIndex === index
            ? '500px'
            : '0px'}; opacity: {openIndex === index ? '1' : '0'}"
        >
          <div class="p-6 bg-[var(--primary-color-light)] text-gray-700">
            {@html item.content}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  button:focus {
    outline: none;
  }
</style>
