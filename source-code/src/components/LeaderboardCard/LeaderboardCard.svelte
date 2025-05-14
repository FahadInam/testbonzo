<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import Avatar from "../Avatar/Avatar.svelte";
  import Image from "../Image/Image.svelte";

  export let username = "";
  export let profile_picture = "";
  export let rank = 1;
  export let stars = 3;
  export let size = "medium"; // 'small' | 'medium' | 'large'
  export let isLoading = false;
  export let name = "";

</script>

<div
  class={`relative flex flex-col items-center ${size === "large" ? "scale-125" : ""}`}
>
  {#if isLoading}
    <!-- Preloader -->
    <div class="animate-pulse flex flex-col items-center">
      <!-- Profile avatar skeleton -->
      <div class="w-20 h-20 md:w-24 md:h-24 bg-gray-700 rounded-full"></div>

      <!-- Stars skeleton -->
      <div class="flex space-x-1 mt-2">
        {#each Array(stars).fill(0) as _, i}
          <div class="w-4 h-4 bg-gray-600 rounded"></div>
        {/each}
      </div>

      <!-- Rank Badge skeleton -->
      <div class="w-6 h-6 bg-gray-600 rounded-full mt-2"></div>

      <!-- Username skeleton -->
      <div class="w-24 h-4 bg-gray-700 rounded mt-2"></div>
    </div>
  {:else}
    <!-- Background glow -->
    <div
      class="absolute w-32 h-32 bg-blue-500 rounded-full blur-2xl opacity-50"
    ></div>

    <!-- Profile Avatar (Make sure this is above the background) -->
    <div class="relative z-10">
    <Avatar t={profile_picture || IMAGES.SCHOOL_AVATAR} s={100} u={100} ml="auto" mr="auto" />
      <!-- Container for First Place Background -->
      {#if rank === 1}
        <div
          class="absolute inset-0 flex justify-center items-center w-[350px] -left-32 -z-1 -top-20"
        >
          <Image src={IMAGES.RAYS_ICON} className="w-full" />
        </div>
      {/if}
    </div>

    <!-- Stars (Kept Above Avatar) -->
    <div class="absolute -top-7 flex space-x-1 -mt-2 z-20">
      {#if rank === 1}
        <Image src={IMAGES.STARS_THREE} className="w-18" />
      {:else if rank === 2}
        <Image src={IMAGES.STARS_TWO} className="w-16" />
      {:else if rank === 3}
        <Image src={IMAGES.STARS_ONE} className="w-10" />
      {/if}
    </div>

    <!-- Rank Badge -->
    <div class="absolute bottom-12 left-4 w-9 h-10 z-20">
      {#if rank === 1}
        <Image src={IMAGES.POSITION_1_ICON} />
      {:else if rank === 2}
        <Image src={IMAGES.POSITION_2_ICON} />
      {:else if rank === 3}
        <Image src={IMAGES.POSITION_3_ICON} />
      {/if}
    </div>

    <!-- Username -->
    <div class="w-[150px]">
      <p
        class="pt-4 text-white text-md font-semibold truncate overflow-hidden text-lg font-poppins"
      >
        {username || name}
      </p>
    </div>
  {/if}
</div>
