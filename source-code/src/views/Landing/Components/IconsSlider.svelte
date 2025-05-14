<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { useInView } from "$lib/utils";
  import Carousel from "../../../components/Carousel/Carousel.svelte";
  import Image from "../../../components/Image/Image.svelte";

  // Icon data (this can be fetched or passed as a prop if needed)
  const icons = [
    IMAGES.SKILL_ICON_1,
    IMAGES.SKILL_ICON_2,
    IMAGES.SKILL_ICON_3,
    IMAGES.SKILL_ICON_4,
    IMAGES.SKILL_ICON_5,
    IMAGES.SKILL_ICON_6,
    IMAGES.SKILL_ICON_7,
    IMAGES.SKILL_ICON_8,
    IMAGES.SKILL_ICON_9,
    IMAGES.SKILL_ICON_10,
    IMAGES.SKILL_ICON_11,
    IMAGES.SKILL_ICON_12,
    IMAGES.SKILL_ICON_13,
    IMAGES.SKILL_ICON_14,
  ];

  const carouselSettings = {
    autoplayInterval: 4000,
    loop: true,
    showNav: false,
    showDots: false,
  };
</script>

<div class="bg-gray-100 px-5 md:px-8 py-2">
  <Carousel settings={carouselSettings}>
    {#each icons as icon}
      <div class="icon-slide ms-11 me-11 animate__animated animate__delay-0-7s">
        <div use:useInView={{ animationClass: "animate__fadeInRight" }}>
          <Image src={icon} alt="Skill Icon" className="w-full" />
        </div>
      </div>
    {/each}
  </Carousel>
</div>

<style>
  .icon-slide {
    flex: 0 0 auto; /* Prevent shrinking and ensure even spacing */
    width: 38px; /* Adjust to fit better */
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
