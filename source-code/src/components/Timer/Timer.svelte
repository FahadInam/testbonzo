<!--
  Timer.svelte - A countdown timer component for the image-based timer UI
-->
<script>
  import { zeroPad } from '$lib/utils';
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
 
  // Props
  export let min = 0;
  export let sec = 0;
  export let start = false;
  export let pause = false;
  export let totalTime = 0;

  // Internal state
  let count = 0;
  let timer;
  let currentMin = parseInt(min, 10);
  let currentSec = parseInt(sec, 10);
  let remainingTicks = 0;
  let minShow = 0;
  let secShow = 0;
  
  const dispatch = createEventDispatcher();
  
  onMount(() => {
    let seconds = (min ? parseInt(min, 10) : 0) * 60;
    seconds += sec ? parseInt(sec, 10) : 0;
    count = seconds;
    updateDisplayTime();
  });
  
  $: if (start && !timer) {
    startTimer();
  } else if (!start && timer) {
    stopTimer();
  }
  
  $: if (pause) {
    // No action needed, the tick function checks for pause
  }
  
  function tick() {
    if (pause) return;
    count += 1;
    currentMin = parseInt(count / 60, 10);
    currentSec = parseInt(count % 60, 10);
    updateDisplayTime();
    timerCallbackUpdater();
  }
  
  function updateDisplayTime() {
    remainingTicks = totalTime - (currentMin * 60 + currentSec);
    minShow = parseInt(remainingTicks / 60, 10);
    secShow = remainingTicks % 60;
  }
  
  function startTimer() {
    clearInterval(timer);
    currentMin = parseInt(min, 10);
    currentSec = parseInt(sec, 10);
    count = currentMin * 60 + currentSec;
    updateDisplayTime();
    timer = setInterval(tick, 1000);
  }
  
  function stopTimer() {
    clearInterval(timer);
    timer = null;
  }
  
  function timerCallbackUpdater(msg = 'timer') {
    const ticks = currentMin * 60 + currentSec;
    const completed = ticks >= totalTime;
   
    if (completed) {
      clearInterval(timer);
      timer = null;
    }
   
    dispatch('timerUpdate', {
      status: completed ? 'completed' : msg,
      min: currentMin,
      sec: currentSec,
      ticks
    });
  }
  
  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<span>{zeroPad(minShow)}:{zeroPad(secShow)}</span>