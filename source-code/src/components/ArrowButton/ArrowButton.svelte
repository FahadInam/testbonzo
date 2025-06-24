<script>
    import { onMount } from "svelte";
  import { gotoURL } from "../../stores/navigation.store";
    import { isMobile } from "$lib/utils";

  export let label = "";
  export let arrowType = "back";
  export let link = "";
  export let customClass = "";
  let mobile = false;

  onMount(() => {
    mobile = isMobile();
    
    const handleResize = () => {
      mobile = isMobile();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<div>
  <button
    class="{customClass || ''} font-semibold items-center text-lg flex"
    on:click={() => {
      gotoURL(link);
    }}
  >
    <span>
      {#if arrowType == "back"}
        <svg
          class=""
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m15 19-7-7 7-7"
          />
        </svg>
      {/if}
    </span>
    {#if label && label.length > 0 && !mobile}
      <span class="text-xl">{label}</span>
    {/if}
  </button>
</div>
