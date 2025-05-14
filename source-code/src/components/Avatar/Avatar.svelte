<script>
  import { avatar } from "$lib/avatar";
  import { onMount } from "svelte";

  export let t;
  export let s = 50;
  export let u = 50;
  export let ml;
  export let mr;
  export const shadowed = false;
  export let schoolAvatar = false;
  export let fullSize = false;
  let borderColor = "#FFCC00";

  /**
   * @type {string}
   */
  let imagePath;

  // Update imagePath whenever t changes
  $: if (t) {
    imagePath = updateImagePath();
  }

  function updateImagePath() {
    return schoolAvatar ? `/images/profiles/a67.png` : avatar(t);
  }

  // Initialize imagePath (runs on component creation)
  onMount(() => {
    imagePath = updateImagePath();
  });
</script>

<div
  class="relative overflow-hidden flex items-center justify-center rounded-full"
  style="{fullSize
    ? `height: 100%; width: 100%;`
    : `height: ${s}px; width: ${u}px; min-width: ${u}px;`} margin-left: ${ml}; margin-right: ${mr};"
>
  <div
    class="absolute inset-0 w-full h-full rounded-full border-4"
    style="border-color: {borderColor};"
  ></div>
  <img class="w-full h-full" src={imagePath} alt={t} />
</div>
