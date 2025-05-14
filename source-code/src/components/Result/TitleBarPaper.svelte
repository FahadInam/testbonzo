<script>
  export let title = "";
  export let icon = "";
  export let showButtons = false;
  export let yesButtonLabel = "";
  export let noButtonLabel = "";
  export let callbackYes = () => {};
  export let callbackNo = () => {};
</script>

<div class="max-w-[920px] w-full mx-auto pb-3">
  {#if title}
    <div class="bg-blue-900 w-full flex justify-center items-center h-14 gap-3">
      {#if icon}
        <div class="w-12 pt-1">
          <img class="w-full" src={icon} alt="icon" />
        </div>
      {/if}
      <h3 class="text-white text-lg font-semibold text-center">{title}</h3>
    </div>
  {/if}
  <slot></slot>
  {#if showButtons}
    <div class="flex w-full max-w-[240px] gap-5 mt-4 mx-auto">
      {#if noButtonLabel}
        <button 
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" 
          on:click={callbackNo}
        >
          {noButtonLabel}
        </button>
      {/if}
      {#if yesButtonLabel}
        <button 
          class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600" 
          on:click={callbackYes}
        >
          {yesButtonLabel}
        </button>
      {/if}
    </div>
  {/if}
</div>
