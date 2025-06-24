<script lang="ts">
  import { onMount } from "svelte";
  import sword1 from "$lib/assets/images/bonzoui/sword1.png"; // Import first sword image
  import sword2 from "$lib/assets/images/bonzoui/sword2.png"; // Import second sword image

  // Prop to determine if the match is single player or not
  export let isSinglePlayerMatch = false;

  // Local state variables controlling visibility and animation
  let showSword = false; // Controls whether swords are rendered
  let animateSword1 = false; // Controls animation state for sword1
  let animateSword2 = false; // Controls animation state for sword2

  // Run when component is mounted on the DOM
  onMount(() => {
    // Delay showing swords by 3 seconds
    setTimeout(() => {
      showSword = true;

      // Shortly after showing, trigger animation for both swords
      setTimeout(() => {
        animateSword1 = true;
        animateSword2 = true;
      }, 50); // Small delay ensures DOM update before animation starts
    }, 3000);
  });
</script>

<!-- Container div set to relative for absolute positioning of swords -->
<div class="relative w-full h-[84px]">
  {#if showSword}
    <!-- First sword image -->
    <img
      src={sword1}
      alt="Sword 1"
      class="absolute -left-1 top-4.5 md:top-0 h-[58px] w-[64px] md:h-[84px] md:w-[90px] z-20 sword-rotate {animateSword1
        ? 'animate'
        : ''}"
    />
    {#if !isSinglePlayerMatch}
      <!-- Second sword image, shown only in multiplayer mode -->
      <img
        src={sword2}
        alt="Sword 2"
        class="absolute left-[10px] top-4.5 md:-top-[1px] h-[58px] w-[64px] md:h-[84px] md:w-[90px] transform rotate-8 z-20 sword2-rotate {animateSword2
          ? 'animate'
          : ''}"
      />
    {/if}
  {/if}
</div>

<style>
  /* Initial rotation and smooth transform transition for sword 1 */
  .sword-rotate {
    transform: rotate(-40deg);
    transition: transform 0.5s ease-in-out;
  }
  /* When 'animate' class is added, rotate back to 0 degrees */
  .sword-rotate.animate {
    transform: rotate(0deg);
  }

  /* Initial rotation and smooth transform transition for sword 2 */
  .sword2-rotate {
    transform: rotate(40deg);
    transition: transform 0.5s ease-in-out;
  }
  /* When 'animate' class is added, rotate back to 0 degrees */
  .sword2-rotate.animate {
    transform: rotate(0deg);
  }
</style>
