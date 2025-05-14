<!-- Card.svelte -->
<script>
  export let text = "My Subscription";
  export let icon = null;
  export let bgColor = "bg-indigo-900";
  export let textColor = "text-white";
  export let width = "w-full";
  export let padding = "p-6";
</script>

<div class={` max-w-4xl mx-auto overflow-hidden rounded-3xl shadow-lg ${width}`}>
  <!-- Header section with text and icon -->
  <div class={`flex items-center justify-center px-6 py-4 ${bgColor} ${textColor}`}>
    {#if icon}
      <div class="mr-3">
        <img src={icon} alt="Icon" class="w-8 h-8" />
      </div>
    {/if}
    <h2 class="text-xl font-bold text-center">{text}</h2>
  </div>
  
  <!-- Content area -->
  <div class={`bg-white ${padding}`}>
    <slot></slot>
  </div>
</div>