<script>
  import { fly } from "svelte/transition";
  import ArrowButton from "../ArrowButton/ArrowButton.svelte";
  import BackgroundImage from "../BackgroundImage/BackgroundImage.svelte";

  export let backButtonLabel = "";
  export let backButtonLink = "";
  export let showBackButton = true;

</script>

<div
  class="min-h-screen flex items-center justify-center relative px-4 bg-blue-500"
  style="background: var(--background-gradient);"
>
  <BackgroundImage />
  <!-- Back Button for Larger Screens -->
   {#if showBackButton}
  <ArrowButton
    label={backButtonLabel}
    arrowType="back"
    link={backButtonLink}
    customClass="hidden md:flex text-white hover:text-gray-300 fixed top-4 left-4"
  />
  {/if}
  <!-- Popup Content -->
  <div
    class="bg-[#fbfbfb] w-full max-w-[600px] md:max-h-[90%] md:h-auto rounded-2xl shadow-lg overflow-y-auto relative"
    style="margin: 20px 0;"
  >
    <!-- Back Button for Smaller Screens -->
   {#if showBackButton}
    <ArrowButton
      label={backButtonLabel}
      arrowType="back"
      link={backButtonLink}
      customClass="flex md:hidden text-gray-600 hover:text-gray-800 absolute top-10 left-2"
    />
  {/if}
    <div class="p-10">
      <div in:fly={{ x: -200, duration: 500 }}>
        <slot name="body" />
      </div>
    </div>
    <div in:fly={{ x: -200, duration: 500 }}>
      <slot name="footer" />
    </div>
  </div>
</div>
