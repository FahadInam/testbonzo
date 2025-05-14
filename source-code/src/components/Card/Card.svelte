<script>
  // Callback function triggered when the button is clicked
  export let onClick = () => {};

  // Additional custom classes for styling the card
  export let className = "";
  export let btnClass = "";
</script>

<div class={`card w-auto relative rounded-[20px] ${className}`}>
  <button
    class={`w-full bg-white text-left cursor-pointer overflow-hidden rounded-[20px] ${btnClass}`}
    on:click={onClick}
  >
    <slot />
    <!-- Slot for injecting custom content inside the card -->
  </button>
</div>
