<script>
    import { onDestroy } from 'svelte';
    import { internetStore } from '../../stores/internet.store';
  
    let show = false;
    const unsubscribe = internetStore.subscribe(val => {
      show = val.showInternetBanner;
    });
  
    function closeBanner() {
      internetStore.update(state => ({ ...state, showInternetBanner: false }));
    }
  
    onDestroy(unsubscribe);

  </script>
  {#if show}
  <div
  class="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-orange-50 border border-orange-200 text-[rgb(102,60,0)] rounded-2xl px-6 py-4 shadow-lg flex items-center gap-4 max-w-[90vw] sm:max-w-xl z-50"
>
  <!-- Icon -->
  <svg class="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none"
    viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
  </svg>

  <!-- Text -->
  <div class="flex flex-col leading-snug">
    <span class="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">
      Your internet is unstable. Please check your connection.
    </span>
    <span class="text-xs whitespace-nowrap overflow-hidden text-ellipsis">
      An unstable connection may cause delays in games and activities.
    </span>
  </div>

  <!-- Close button -->
  <button on:click={closeBanner} class="ml-auto text-[rgb(102,60,0)] hover:text-orange-700 transition">
    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>
  {/if}
  