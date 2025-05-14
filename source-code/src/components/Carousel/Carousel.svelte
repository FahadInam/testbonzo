<script>
  import { onMount, onDestroy } from "svelte";
  import emblaCarouselSvelte from "embla-carousel-svelte";

  /**
   * @typedef {Object} Settings
   * @property {boolean} keyboardDisabled - Whether keyboard navigation is disabled.
   * @property {number|null} autoplayInterval - Interval for autoplay in milliseconds, null if disabled.
   * @property {boolean} loop - Whether the carousel should loop.
   * @property {string} align - Alignment of slides, can be "start", "center", or "end".
   * @property {boolean} showNav - Whether navigation buttons should be shown.
   * @property {boolean} showDots - Whether pagination dots should be shown.
   * @property {string} navBgColor - Background color of navigation buttons.
   * @property {string} navIconColor - Color of navigation icons.
   */

  /** @type {Settings} */
  const defaultSettings = {
    keyboardDisabled: false,
    autoplayInterval: null,
    loop: false,
    align: "start",
    showNav: true,
    showDots: true,
    navBgColor: "bg-gray-100",
    navIconColor: "text-black",
  };

  /**
   * Settings object that allows customization by merging with default settings.
   * @type {settings}
   */
  export let settings = {}; // Allow settings to be passed as a prop

  // Merge default settings with provided settings
  settings = { ...defaultSettings, ...settings };

  let options = {
    loop: settings.loop,
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    align: settings.align,
  };

  let emblaApi;
  let prevLocked = false;
  let nextLocked = false;
  let selectedIndex = 0;
  let totalSlides = 0;
  let autoplayTimer;

  function onInit(event) {
    emblaApi = event.detail;
    emblaApi.on("select", onSlideChanged);
    totalSlides = emblaApi.slideNodes().length;
    onSlideChanged();
    if (settings.autoplayInterval) startAutoplay(); // Start autoplay only if provided
  }

  function scrollPrev() {
    if (prevLocked) return;
    emblaApi.scrollPrev();
    restartAutoplay(); // Restart autoplay when user interacts
  }

  function scrollNext() {
    if (nextLocked) return;
    emblaApi.scrollNext();
    restartAutoplay(); // Restart autoplay when user interacts
  }

  function handleKeydown(event) {
    if (!emblaApi) return;
    if (event.key === "ArrowLeft") scrollPrev();
    if (event.key === "ArrowRight") scrollNext();
  }

  function onSlideChanged() {
    prevLocked = !emblaApi.canScrollPrev();
    nextLocked = !emblaApi.canScrollNext();
    selectedIndex = emblaApi.selectedScrollSnap();
  }

  function scrollToIndex(index) {
    emblaApi.scrollTo(index);
    restartAutoplay(); // Restart autoplay when user selects a dot
  }

  function startAutoplay() {
    if (!settings.autoplayInterval) return;
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, settings.autoplayInterval);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  function restartAutoplay() {
    if (settings.autoplayInterval) {
      stopAutoplay();
      startAutoplay();
    }
  }

  onMount(() => {
    if (!settings.keyboardDisabled) {
      window.addEventListener("keydown", handleKeydown);
      return () => window.removeEventListener("keydown", handleKeydown);
    }
  });

  onDestroy(() => {
    stopAutoplay(); // Ensure autoplay stops when the component unmounts
  });
</script>

<!-- Embla Carousel Wrapper -->
<div
  class="embla max-w-full mx-auto relative py-3 overflow-hidden"
  use:emblaCarouselSvelte={{ options }}
  on:emblaInit={onInit}
>
  <div class="embla__container flex items-center">
    <slot />
  </div>

  <!-- Navigation Buttons -->
  {#if settings.showNav}
    <!-- Previous Button -->
    <button
      class="embla__prev hidden sm:flex w-8 h-8 object-contain absolute left-2 top-1/2 transform -translate-y-1/2 {prevLocked
        ? 'opacity-40 cursor-none'
        : ''}"
      aria-label="Previous"
      on:click={scrollPrev}
    >
      <span
        class="flex items-center justify-center w-10 h-10 min-w-10 rounded-full {settings.navBgColor}"
      >
        <i class="i i-left {settings.navIconColor}"></i>
      </span>
    </button>

    <!-- Next Button -->
    <button
      class="embla__next hidden sm:flex w-8 h-8 object-contain absolute right-2 top-1/2 transform -translate-y-1/2 {nextLocked
        ? 'opacity-40'
        : ''}"
      aria-label="Next"
      on:click={scrollNext}
    >
      <span
        class="flex items-center justify-center w-10 h-10 min-w-10 rounded-full {settings.navBgColor}"
      >
        <i class="i i-right pl-1 {settings.navIconColor}"></i>
      </span>
    </button>
  {/if}

  <!-- Dots Navigation -->
  {#if settings.showDots}
    <div class="embla__dots flex sm:hidden justify-center space-x-2 mt-8">
      {#each Array(totalSlides) as _, index}
        <button
          class="w-3 h-3 rounded-full {index === selectedIndex
            ? 'bg-white'
            : 'bg-gray-900 opacity-50'}"
          on:click={() => scrollToIndex(index)}
          aria-label={`Go to slide ${index + 1}`}
        ></button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .embla {
    width: 100%;
    overflow: hidden;
  }
  .embla__container {
    display: flex;
    gap: 1rem;
  }
  .embla__dots button {
    transition:
      background 0.3s,
      opacity 0.3s;
  }
</style>
