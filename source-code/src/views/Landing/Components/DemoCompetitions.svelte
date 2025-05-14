<script>
  import { useInView } from "$lib/utils";
  import Carousel from "../../../components/Carousel/Carousel.svelte";
  import DemoCompetitionCards from "../../../components/DemoCompetitionCards/DemoCompetitionCards.svelte";
  import { t } from "../../../stores/language.store";

  /**
   * @type {never[]}
   */
  export let competitions = [];

  /**
   * @type {(arg0: string) => void}
   */
  export let onItemClick;

  /**
   * @param {string} name
   */
  function handleClick(name) {
    onItemClick(name);
  }

  const carouselSettings = {
    autoplayInterval: 7000,
    //autoplayInterval: 700000,
    loop: true,
    align: "center",
    navBgColor: "bg-[var(--primary-color)]",
    navIconColor: "text-white",
  };
</script>

<div class="bg-white pt-16">
  <div class="px-4 lg:px-20">
    <h2
      class="text-3xl md:text-5xl font-semibold text-blue-900 text-center max-w-lg md:max-w-2xl mx-auto leading-snug"
      use:useInView={{ animationClass: "animate__fadeIn" }}
    >
      {$t("demo_competitions_title")}
    </h2>
  </div>

  <!-- competitions slider-->
  <div class="px-0 mt-10 lg:px-2 space-y-16">
    <Carousel settings={carouselSettings}>
      {#each competitions as competition}
        <div
          class="mx-3 w-full flex-[0_0_calc(100%/1)] md:flex-[0_0_calc(100%/3)] px-5 md:px-0"
        >
          <DemoCompetitionCards {competition} onItemClick={handleClick} />
        </div>
      {/each}
    </Carousel>
  </div>
</div>
