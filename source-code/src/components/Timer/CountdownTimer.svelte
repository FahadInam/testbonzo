<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  // Props
  export let start = false;
  export let callback;

  // State
  let count = 3;
  let timer;
  let isCounting = false;
  let isAnimating = false;
  let showZero = false;

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
    showZero = false;
    triggerAnimation();

    // Dispatch mount event when countdown starts
    dispatch("mount");

    timer = setInterval(() => {
      count--;

      if (count === 0) {
        // Show 0 for final count
        showZero = true;
        triggerAnimation();

        // End countdown after showing 0
        setTimeout(() => {
          isCounting = false;
          showZero = false;
          if (callback) callback();
        }, 1000);

        clearInterval(timer);
      } else {
        triggerAnimation();
      }
    }, 1000);
  }

  function triggerAnimation() {
    isAnimating = false;
    setTimeout(() => {
      isAnimating = true;
    }, 50);
  }

  // Clean up on unmount
  onMount(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  });
</script>

<div class="timer">
  {#if start && (count > 0 || showZero)}
    <span class="count {isAnimating ? 'animated' : ''}">
      {showZero ? 0 : count}
    </span>
  {/if}
</div>

<style>
  .timer {
    font-family: "Fredoka", sans-serif;
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    vertical-align: middle;
    margin-left: 8px;
  }

  .count {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: 700;
    font-size: 48px;
    line-height: 1;
    text-shadow:
      -3px 0px 2px rgba(0, 0, 0, 1),
      3px 0px 2px rgba(0, 0, 0, 1),
      3px -3px 2px rgba(0, 0, 0, 1),
      -3px -3px 2px rgba(0, 0, 0, 1),
      -3px 6px 2px rgba(0, 0, 0, 1),
      3px 6px 2px rgba(0, 0, 0, 1);
    z-index: 1;
    white-space: nowrap;
  }

  @keyframes zoomOutCountdown {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
    20% {
      transform: translate(-50%, -50%) scale(0.9);
      opacity: 1;
    }
    40% {
      transform: translate(-50%, -50%) scale(3);
    }
    60% {
      transform: translate(-50%, -50%) scale(0.9);
    }
    80% {
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }

  .animated {
    animation: zoomOutCountdown 1s ease-out forwards;
  }
</style>
