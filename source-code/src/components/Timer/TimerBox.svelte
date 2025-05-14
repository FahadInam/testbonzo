<!--
  TimerBox.svelte - A timer UI component with custom image backgrounds
-->
<script>
  import { createEventDispatcher } from 'svelte';
  import Timer from './Timer.svelte';
  import { IMAGES } from '$lib/assets/images/images.constants';

  // Props
  export let playTimer = false;
  export let allowPlaying = true;
  export let timerPause = false;
  export let timeLimit = 0;
  export let isFullscreen = false;
  export let isMcdUser = false;

  // State
  let timerUp = false;
  const dispatch = createEventDispatcher();

  function timerCallback(status, data) {
    dispatch('timerUpdate', { status, data });
  }

  function toggleTimerPosition() {
    timerUp = !timerUp;
  }

  function handleScreen(value, orientation, isMcdUser) {
    dispatch('handleScreen', { value, orientation, isMcdUser });
  }
</script>

<div
  class="timer-box absolute z-[2000] top-0 left-1/2 transform -translate-x-1/2
         {!(playTimer || !allowPlaying) ? 'hidden' : ''}"
>
  <!-- Timer container with background image -->
  <div
    class="relative cursor-pointer"
    on:click={toggleTimerPosition}
  >
    <!-- Timer container -->
    <div class="timer-container {timerUp ? 'translate-y-0' : '-translate-y-6'} transition-transform duration-500">
      <!-- Main bubble with background image -->
      <div class="timer-bubble px-5 py-2 flex items-center justify-center {timerUp ? 'timer-open' : 'timer-closed'}">
        <!-- Timer display -->
        <div class="timer-display  absolute top-[15%] left-[35%] text-white text-xl font-bold">
          <Timer
            min={0}
            sec={0}
            start={playTimer}
            pause={timerPause}
            totalTime={timeLimit}
            on:timerUpdate={event => timerCallback(event.detail.status, event.detail)}
          />
        </div>
      </div>
     
      <!-- Arrow indicator - removed as it will be part of the images -->
    </div>
  </div>
</div>

<style>
  /* Custom styles for the timer bubble */
  .timer-bubble {
   
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.2)); 
    width: 100%;
  }
  
  .timer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
     width: 120px;
    height: 90px;
  }
  .timer-open {
  background-image: url('../../lib/assets/images/bonzoui/timer_open_bg.png');
  background-size: contain;
  background-repeat: no-repeat;
  height: 100%;
}

.timer-closed {
  background-image: url('../../lib/assets/images/bonzoui/timer_close_bg.png');
  background-size: contain;
  background-repeat: no-repeat;
  height: 100%;
}
</style>