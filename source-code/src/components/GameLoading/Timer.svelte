Timer.svelte

<script>
  import { numbers } from '$lib/numbers.formate';
  import { onMount, onDestroy } from 'svelte';

  // Props
  export let min = 0;
  export let sec = 0;
  export let totalTime = 0;
  export let start = false;
  export let pause = false;
  export let callback = undefined;

  // State
  let count = 0;
  let timer;
  let currentMin = parseInt(min, 10);
  let currentSec = parseInt(sec, 10);
  let totalMin = parseInt(totalTime / 60, 10);
  let totalSec = totalTime % 60;

  // Methods
  function tick() {
    if (pause) return;
    
    count += 1;
    currentMin = parseInt(count / 60, 10);
    currentSec = parseInt(count % 60, 10);
    
    timerCallbackUpdater();
  }

  function startTimer() {
    clearInterval(timer);
    currentMin = parseInt(min, 10);
    currentSec = parseInt(sec, 10);
    
    count = currentMin * 60 + currentSec;
    timer = setInterval(tick, 1000);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  function timerCallbackUpdater(msg = 'timer') {
    const ticks = currentMin * 60 + currentSec;
    const completed = ticks >= totalTime;
    
    if (completed) clearInterval(timer);
    if (callback) callback(completed ? 'completed' : msg, { min: currentMin, sec: currentSec, ticks });
  }

  // Computed value
  $: remainingTicks = totalTime - (currentMin * 60 + currentSec);
  $: minShow = parseInt(remainingTicks / 60, 10);
  $: secShow = remainingTicks % 60;

  // Lifecycle
  onMount(() => {
    count = (min ? parseInt(min, 10) : 0) * 60 + (sec ? parseInt(sec, 10) : 0);
  });

  onDestroy(() => {
    clearInterval(timer);
  });

  // Watch for start prop changes
  $: if (start) {
    startTimer();
  } else {
    stopTimer();
  }
</script>

<span class="font-mono text-lg">
  {numbers.ZeroPad(minShow)}:{numbers.ZeroPad(secShow)}
</span>