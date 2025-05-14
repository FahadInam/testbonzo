<script>
    import { IMAGES } from "$lib/assets/images/images.constants";
    import { COLOR_CONFIG, DEFAULT_COLORS, GAMES_COUNT, texts } from "$lib/constants/payment.constants";

  export let bundle =[]
  export let isSelected = false;
  export let onClick = () => {};

  
  
  // Derived values
  $: bundleType = bundle.title?.toLowerCase() || 'daily';
  $: image = IMAGES[`${bundleType.toUpperCase()}_BUNDLE_IMAGE`] || IMAGES.DAILY_BUNDLE_IMAGE;
  $: colors = COLOR_CONFIG[bundleType] || DEFAULT_COLORS;
  $: [gamesCount] = bundle.description?.split(' ') || ['0'];
  $: gameCount = GAMES_COUNT[bundleType] || 10;
</script>

<style>
  /* Custom text shadow styles that can't be achieved with Tailwind alone */
  :global(.text-shadow-custom) {
    text-shadow: #000 2px 0 0, #000 1.75517px 0.958851px 0, #000 1.0806px 1.68294px 0, #000 0.141474px 1.99499px 0,
      #000 -0.832294px 1.81859px 0, #000 -1.60229px 1.19694px 0, #000 -1.97998px 0.28224px 0, #000 -1.87291px -0.701566px 0,
      #000 -1.30729px -1.5136px 0, #000 -0.421592px -1.95506px 0, #000 0.567324px -1.91785px 0, #000 1.41734px -1.41108px 0,
      #000 1.92034px -0.558831px 0, 1px 5px 0 #000, -1px 5px 0 #000, 0 5px 0 #000;
  }
  
  /* Polygon clip path for the ribbon shape */
  .bundle-shape-container {
    clip-path: polygon(0 0, 100% 0, 92% 50%, 100% 100%, 0 100%);
  }
</style>

<div 
  class="bundle-card cursor-pointer border-2 border-black rounded-2xl bg-white transition-all duration-300 ease-in-out text-center m-1 transform scale-100 min-w-[234px] {isSelected ? 'selected-card border-[#02bbfe] bg-[#f0f8ff]' : ''}"
  on:click={onClick}
  on:keydown={(e) => e.key === 'Enter' && onClick()}
  tabindex="0"
  role="button"
  on:mouseenter={(e) => e.currentTarget.classList.add('border-[#02bbfe]', 'bg-[#f0f8ff]', 'scale-[1.02]', 'z-[1]', 'shadow-lg')}
  on:mouseleave={(e) => !isSelected && e.currentTarget.classList.remove('border-[#02bbfe]', 'bg-[#f0f8ff]', 'scale-[1.02]', 'z-[1]', 'shadow-lg')}
>
  <div class="bundle-card-content p-0 relative">
    <!-- Discount badge if applicable -->
    {#if colors.discountText}
      <div 
        class=" bundle-discount absolute top-0 w-full text-center py-1 font-bold text-white text-base z-10"
        style="background-color: {colors.discountBgColor || '#0086FF'};"
      >
        {colors.discountText}
      </div>
    {/if}
    
    <div class="bundle-card-inner min-h-[320px] rounded-[14px] mb-[11px] p-[15px] pb-0 {isSelected ? 'shadow-[0px_12px_0px_-1px_#02bbfe]' : 'bundle-card-shadow shadow-[0px_12px_0px_-1px_#d5dbea]'}">
      <!-- Bundle header with ribbon-style design -->
      <div class="bundle-shape-box relative mt-[10px] mb-0">
        <!-- Icon box -->
        <div class="bundle-icon absolute w-[60px] left-[-22px] z-10 top-[-5px]">
          <img src={image} alt="{bundle.title} Bundle Icon" class="w-full" />
        </div>

        <!-- Ribbon-style header -->
        <div 
          class="bundle-shape-container w-[90%] h-[50px] relative rounded-lg"
          style="background-color: {colors.bgColor};"
        >
          <span class="bundle-title text-white text-[22px] font-medium flex justify-start items-center h-full pl-[60px]">
            {bundle.title}
          </span>
        </div>

        <!-- Bundle text -->
        <span class="bundle-fix-title font-semibold text-lg mt-[2px] block text-left pl-[60px]" style="color: {colors.textColor}">
          {texts.BUNDLE}
        </span>
      </div>
      
      <!-- Games count section with enhanced styling -->
      <div class="mt-2 relative">
        {#if colors.perdayText}
          <span 
            class="games_badge absolute text-xs w-fit-content top-1 right-8 rounded-[30px] p-[2px_8px] font-medium transform -rotate-7"
            style="color: {colors.bgColor}; background-color: {colors.perdayTextBg}"
          >
            {colors.perdayText}
          </span>
        {/if}
        
        <h4 class="bundle-games-count text-[47px] font-semibold my-1 mx-0 relative">
          <span 
            class="text-shadow-custom"
            style="color: {colors.gameNumberColor};"
          >
            {gamesCount}
          </span>
          
          <span class="games-count-title text-[28px] mx-2 text-black">
            {texts.GAMES}
          </span>
        </h4>
      </div>
      
      <!-- Price section with enhanced styling -->
      <div class="bundle-pricing flex justify-center items-center font-semibold text-[22px] uppercase leading-[90px]">
        <span class="currency-title text-black">KES</span>
        <span 
          class="bundle-amount text-[76px] text-[#ffff00] px-5 text-shadow-custom"
        >
          {bundle.amount}
        </span>
      </div>
      
      <!-- Description -->
      <div class="pb-4">
        <p class="bundle-description text-xs font-normal leading-normal py-0 px-5 w-[160px] mx-auto text-black">Up for {gameCount} Games For Form 2</p>
      </div>
    </div>
  </div>
</div>