<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { onMount } from "svelte";
  import Image from "../../../components/Image/Image.svelte";
  let activeTab = "personalised";
  import { getText, t } from "../../../stores/language.store";
  import { getInstanceText, useInView } from "$lib/utils";

  function setActiveTab(tab) {
    activeTab = tab;
  }

  let scrollContainer;

  function scrollLeft() {
    scrollContainer.scrollBy({ left: -150, behavior: "smooth" });
  }

  function scrollRight() {
    scrollContainer.scrollBy({ left: 150, behavior: "smooth" });
  }

  onMount(() => {
    scrollContainer = document.querySelector("#tab-scroll");
  });

  const tabsData = [
    {
      id: "personalised",
      title: $t("personalised"),
      description: $t("personalised_desc"),
      img: IMAGES.LEARNING_BANNER_ONE,
    },
    {
      id: "measurable",
      title: $t("measurable"),
      description: $t("measurable_desc"),
      img: IMAGES.LEARNING_BANNER_TWO,
    },
    {
      id: "gamified",
      title: $t("gamified"),
      description: $t("gamified_desc"),
      img: IMAGES.LEARNING_BANNER_THREE,
    },
    {
      id: "adaptive",
      title: $t("adaptive"),
      description: $t("adaptive_desc"),
      img: IMAGES.LEARNING_BANNER_FOUR,
    },
    {
      id: "social",
      title: $t("social"),
      description: $t("social_desc"),
      img: IMAGES.LEARNING_BANNER_FIVE,
    },
    {
      id: "bitesized",
      title: $t("bitesized"),
      description: $t("bitesized_desc"),
      img: IMAGES.LEARNING_BANNER_SIX,
    },
  ];
</script>

<div class="bg-white pt-16">
  <div class="px-4 lg:px-20">
    <h2
      class="text-3xl md:text-5xl font-semibold text-blue-900 text-center max-w-lg md:max-w-[400px] mx-auto leading-snug"
      use:useInView={{ animationClass: "animate__fadeIn" }}
    >
      {getInstanceText($t, "enhance_learning_main_title")}
    </h2>
    <p
      class="mt-4 text-gray-600 text-lg md:text-[22px] max-w-full md:max-w-4xl mx-auto text-center leading-snug"
      use:useInView={{ animationClass: "animate__fadeIn" }}
    >
      {getInstanceText($t, "enhance_learning_main_description")}
    </p>
  </div>

  <!-- Tabs section -->
  <div class="px-4 mt-10 lg:px-20 space-y-16 relative">
    <!-- Tabs Navigation with Arrows -->
    <div class="relative flex items-center justify-center mb-10 md:mb-20">
      <!-- Left Arrow (Moved to Top) -->
      <button
        class="absolute -left-3 shadow-md w-8 h-8 min-w-8 text-center bg-gray-200 text-gray-600 rounded-full md:hidden z-10"
        on:click={scrollLeft}
      >
        ◀
      </button>

      <!-- Tab Buttons -->
      <div class="w-full relative">
        <div
          id="tab-scroll"
          class="flex w-full overflow-x-auto no-scrollbar justify-between md:justify-center"
        >
          {#each tabsData as tab}
            <button
              class="flex-1 text-center px-6 py-6 border-b-3 whitespace-nowrap focus:outline-none font-semibold text-base md:text-xl
                {tab.id === activeTab
                ? 'text-[var(--primary-color)] border-[var(--primary-color)]'
                : 'text-gray-600 hover:text-[var(--primary-color)] border-b border-gray-300'}"
              on:click={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          {/each}
        </div>
      </div>

      <!-- Right Arrow (Moved to Top) -->
      <button
        class="absolute -right-3 w-8 h-8 min-w-8 text-center bg-gray-200 text-gray-600 shadow-md rounded-full md:hidden z-10"
        on:click={scrollRight}
      >
        ▶
      </button>
    </div>

    <!-- Tabs Content -->
    <div class="w-full">
      {#each tabsData as tabContent}
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center overflow-hidden {tabContent.id ===
          activeTab
            ? 'block'
            : 'hidden'}"
        >
          <div
            class="max-w-[250px] md:max-w-[450px] m-auto"
            use:useInView={{ animationClass: "animate__fadeInLeft" }}
          >
            <Image
              src={tabContent.img}
              alt={tabContent.title}
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div
            class="ml-0 md:ml-20 animate__delay"
            use:useInView={{ animationClass: "animate__fadeInRight" }}
          >
            <h3
              class="text-xl md:text-3xl lg:text-4xl font-semibold text-gray-700 mb-2 md:mb-4 text-center md:text-left"
            >
              {tabContent.title}
            </h3>
            <p
              class="text-gray-700 text-base md:text-xl max-w-full md:max-w-[390px] text-center md:text-left"
            >
              {tabContent.description}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>
