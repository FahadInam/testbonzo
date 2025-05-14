<script>
  import { onMount, onDestroy } from "svelte";
  import { goto } from "$app/navigation";
  import { showWarning } from "../../stores/toast.store";
  import { CHALLENGE_GLOBAL } from "../../data-actions/challenge/challenge.da";
  /**
   * @type {any[]}
   */
  // export let data;
  export let selectedGame;
  export let callback;
  export let allowPlaying = true;
  export let user;
  export let totalTime;
  export let gameMode;

  let frameNode;
  let gameLoadingTimer;

  // Create launch URL - optimize with a computed value
  $: launchURL = createLaunchUrl(selectedGame, user);

  // Extract iOS sizing logic for better separation of concerns
  // $: dimensions = getIOSDimensions();

  /**
   * @param {string} game
   * @param {{ user_id: any; }} user
   */
  function createLaunchUrl(game, user) {
    if (!game || !user) return "#";

    const baseUrl = game.link;

    return `${baseUrl}&user_id=${user.user_id}&isPlayBonzo=1`;
  }

  // function getIOSDimensions() {
  //   if (!browser || !OsProperties.IsIos() || parseInt(OsProperties.version, 10) >= 13) {
  //     return { width: null, height: null };
  //   }

  //   const isPortrait = window.innerWidth < window.innerHeight;
  //   return isPortrait
  //     ? { width: window.innerHeight, height: window.innerWidth }
  //     : { width: window.innerWidth, height: window.innerHeight };
  // }

  // Central message handler function
  /**
   * @param {{ data: string; source: { postMessage: (arg0: { message: any; data: string | { questionDelay: number; sound: boolean; width: number | null; height: number | null; gameTime: any; gameMode: any; }; }, arg1: string) => void; }; }} event
   */
  function handleGameMessage(event) {
    // Skip browser extension messages and other irrelevant messages
    if (event.data?.source || typeof event.data !== "string") {
      return;
    }

    try {
      const { message, data } = JSON.parse(event.data);
      if (!message) return;

      // Handle navigation case first for early return
      if (message === CHALLENGE_GLOBAL.NOT_FOUND) {
        goto("");
        return;
      }

      // Process game messages
      const response = processGameMessage(message, data);

      // Send response back to the game if needed
      if (response && event.source) {
        event.source.postMessage({ message, data: response }, "*");
      }
    } catch (error) {
      console.error("Error processing game message:", error);
    }
  }

  // Process different message types
  function processGameMessage(message, payload) {
    switch (message) {
      case CHALLENGE_GLOBAL.ON_LOAD:
        return {
          questionDelay: 60,
          sound: true,
          width: dimensions.width,
          height: dimensions.height,
          gameTime: totalTime,
          gameMode: gameMode,
        };

      case CHALLENGE_GLOBAL.START:
      case CHALLENGE_GLOBAL.STOP_TIMER:
        if (callback) callback(message, payload);
        clearTimeout(gameLoadingTimer);
        break;

      case CHALLENGE_GLOBAL.SUBMIT_QUESTION:
      case CHALLENGE_GLOBAL.STOP:
      case CHALLENGE_GLOBAL.RESIGN:
        if (callback) callback(message, payload);
        break;

      default:
        if (callback) callback(message, payload);
        startGameLoadWatchdog();
        break;
    }

    return `${message}_OK`;
  }

  // Game loading watchdog - restart if game load takes too long
  function startGameLoadWatchdog() {
    clearTimeout(gameLoadingTimer);
    gameLoadingTimer = setTimeout(() => {
      showWarning("Game is taking longer than expected to load. Refreshing...");
      //   Toast.Show('Game is taking longer than expected to load. Refreshing...', ALERT.INFO);
      if (frameNode) frameNode.src = launchURL;
    }, 40);
  }

  // Setup event listeners
  onMount(() => {
    // Add load event listener to iframe
    if (frameNode) {
      // frameNode.addEventListener('load', () => Spinner.Hide());

      // Start watchdog on initial load
      startGameLoadWatchdog();
    }

    // Add message event listener to window
    window.addEventListener("message", handleGameMessage, false);
  });

  onDestroy(() => {
    // Clean up all event listeners and timers
    if (frameNode) {
      // frameNode.removeEventListener('load', () => Spinner.Hide());
      frameNode.src = "#";
    }

    clearTimeout(gameLoadingTimer);
    window.removeEventListener("message", handleGameMessage, false);
  });
</script>

<!-- Blocker overlay when game is not playable -->
{#if !allowPlaying}
  <button
    class="absolute inset-0 h-full w-full bg-black/[0.000000025] z-10"
    on:click={() => false}
    on:keydown={(e) => {
      if (e.key === "Enter" || e.key === "Space") {
        // Do something on Enter or Space key press
      }
    }}
    aria-label="Close overlay"
  >
  </button>
{/if}

<!-- Game iframe -->
<iframe
  bind:this={frameNode}
  src={launchURL}
  title="Game Player"
  class="m-0 block border-0 outline-0 w-full h-full min-w-full min-h-full relative"
  scrolling="no"
  webkitallowfullscreen="true"
  allowfullscreen
  mozallowfullscreen="true"
></iframe>
