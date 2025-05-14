<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  
  // Props
  export let start = false;
  export let callback;
  
  // State
  let count = 3;
  let timer;
  let isCounting = false;
  let isAnimating = false;
 
  const dispatch = createEventDispatcher();
  
  // Watch for changes to `start`
  $: {
    if (start && !isCounting) {
      startCountdown();
    }
  }
  
  function startCountdown() {
    isCounting = true;
    count = 3;
    isAnimating = true;
   
    // Dispatch mount event when countdown starts
    dispatch('mount');
    
    timer = setInterval(() => {
      count--;
      
      // Trigger new animation on each count change
      isAnimating = false;
      setTimeout(() => {
        isAnimating = true;
      }, 10);
      
      if (count === 0) {
        clearInterval(timer);
        isCounting = false;
        if (callback) callback();
      }
    }, 1000);
  }
  
  // Clean up on unmount
  onMount(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  });
</script>

<div class="timer">
  {#if start && count > 0}
    <span class="count {isAnimating ? 'animated' : ''}">
      {count}
    </span>
  {/if}
</div>

<style>
  .timer {
    font-family: 'Fredoka', sans-serif;
    text-align: center;
    position: relative;
    width: 70px;
    height: 70px;
    max-height: 70px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .count {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: 700;
    font-size: 56px;
    transform-origin: calc(50% - 4px) calc(50% + 4px);
    text-shadow: -2px 0px 1px rgba(0, 0, 0, 1), 
                 2px 0px 1px rgba(0, 0, 0, 1), 
                 2px -2px 1px rgba(0, 0, 0, 1), 
                 -2px -2px 1px rgba(0, 0, 0, 1), 
                 -2px 4px 1px rgba(0, 0, 0, 1), 
                 2px 4px 1px rgba(0, 0, 0, 1);
    z-index: 1;
  }
  
  @keyframes zoomInCountdown {
    0% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  .animated {
    animation: zoomInCountdown 1s ease-in-out;
  }
</style>