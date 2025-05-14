<script>
  export let title = "";
  export let icon = "";
  export let showButtons = false;
  export let yesButtonLabel = "";
  export let noButtonLabel = "";
  export let callbackYes = () => {};
  export let callbackNo = () => {};
</script>

<div class="max-w-[920px] w-full mx-auto pb-3 bg-white rounded-lg shadow-md overflow-hidden">
  {#if title}
    <div class="bg-blue-800 w-full h-14 flex justify-center items-center gap-3">
      {#if icon}
        <img src={icon} alt="icon" class="w-11 pt-1" />
      {/if}
      <h3 class="text-white text-lg font-semibold text-center">
        {title}
      </h3>
    </div>
  {/if}

  <slot></slot>

  {#if showButtons}
    <div class="flex gap-5 max-w-[240px] w-full mx-auto mt-4">
      {#if noButtonLabel}
        <button 
          class="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
          on:click={callbackNo}>
          {noButtonLabel}
        </button>
      {/if}
      {#if yesButtonLabel}
        <button 
          class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          on:click={callbackYes}>
          {yesButtonLabel}
        </button>
      {/if}
    </div>
  {/if}
</div>
