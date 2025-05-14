<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import Image from "../Image/Image.svelte";

  export let title = "Card Title";
  export let imageSrc = IMAGES.TOPICS_ICON;
  export let imageClass = "w-10 h-10";
  export let maxHeight = "400px"; // default max height should be 400px
</script>

<div
  class="max-w-full mx-auto bg-white rounded-[20px] shadow-lg overflow-hidden opacity-100"
>
  <div
    class="bg-blue-900 text-white py-2 flex justify-center items-center gap-4 h-16"
  >
    <div class="relative h-full">
      <Image
        src={imageSrc}
        alt="Section Icon"
        className="transition-opacity duration-500 ease-in-out {imageClass}"
      />
    </div>
    <h2 class="text-xl font-semibold">{title}</h2>
  </div>
  <div class="p-4 overflow-y-auto" style="max-height: {maxHeight}">
    <slot></slot>
    <!-- Slot for custom content inside the card -->
  </div>
</div>
