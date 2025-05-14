<script>
  export let src = "";
  export let alt = "Image";
  export let className = "";
  export let width = "auto";
  export let height = "auto";
</script>

<div class="relative h-full">
  <img
    {src}
    {alt}
    {width}
    {height}
    class={` h-auto transition-opacity duration-500 ease-in-out ${className}`}
  />
</div>
