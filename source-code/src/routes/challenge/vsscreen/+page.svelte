<!--
  GameFrame.svelte - Game container with custom bubble timer and iframe
-->
<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { userStore } from "../../../stores/user.store";
  import { gameDataStore } from "../../../stores/gamedata.store";
  import GameLoader from "../../../components/Loader/GameLoader.svelte";
  import TimerBox from "../../../components/Timer/TimerBox.svelte";
  import ConfirmationModal from "../../../components/CustomModals/ConfirmationModal.svelte";
  import { t } from "../../../stores/language.store";
  import { PointsCalc, ResignChallenge, SaveChallenge } from "../../../data-actions/challenge/challenge.da";
  import { resultStore, updatePlayerData, updateOpponentData } from "../../../stores/result.store";
  import { AccuracyCalc } from "../../../data-actions/challenge/result.da";
  import { goto } from "$app/navigation";
  import { get } from "svelte/store";
  import { userActivityStore } from "../../../stores/useractivity.store";
  import { abbreviateNumber } from "$lib/utils";
  import { guestStore } from "../../../stores/guest.store";

  // Props
  export let userData;
  export let gameData;

  // Component state
  let iframeRef;
  let isLoading = true;
  let gameStarted = false;
  let timeLimit = 300; // Default: 5 minutes
  let playTimer = true;
  let timerPause = false;
  let percent = 0;
  let showResignModal = false;
  let isFullscreen = false;

  // Create event dispatcher
  const dispatch = createEventDispatcher();

  // Calculate launch URL
  $: launchUrl = `${$gameDataStore.link}&user_id=${$userStore.user_id}&isPlayBonzo=1`;

  // Game data tracking
  let gameStartTime = 0;
  let gameTrackingData = {
    answer: [],
    totalCorrect: 0,
    totalContinuousCorrect: 0,
    totalContinuousWrong: 0,
    totalAttempted: 0,
    totalQuestions: 0,
    timeInSec: 0,
    singleQuestionTime: 0,
    mistakes: 0,
    score: 0,
  };

  /**
   * Saves answer data after a question is submitted
   */
  function saveAnswer(item) {
    const tempA = [...gameTrackingData.answer];

    // Calculate time taken for this question
    const timeTaken = gameTrackingData.singleQuestionTime
      ? (Date.now() - gameTrackingData.singleQuestionTime) / 1000
      : (Date.now() - gameStartTime) / 1000;

    // Create answer object and push to array
    tempA.push({
      index: item.index,
      is_correct: item.correct,
      time_take: timeTaken,
    });

    // Update tracking data
    const totalCorrect = item.correct ? gameTrackingData.totalCorrect + 1 : gameTrackingData.totalCorrect;
    const totalContinuousCorrect = item.correct ? gameTrackingData.totalContinuousCorrect + 1 : 0;
    const totalContinuousWrong = item.correct ? 0 : gameTrackingData.totalContinuousWrong + 1;
    const totalAttempted = item.attempted || tempA.length;

    // Update the game tracking data
    gameTrackingData = {
      ...gameTrackingData,
      answer: tempA,
      totalCorrect,
      totalContinuousCorrect,
      totalContinuousWrong,
      totalAttempted,
      singleQuestionTime: Date.now(),
      mistakes: typeof item.mistakes === "undefined" ? gameTrackingData.mistakes : item.mistakes,
      score: totalCorrect * 100,
    };

    // Dispatch an event with the updated game data
    dispatch("gameDataUpdate", gameTrackingData);
  }

  /**
   * Calculates final result of the game
   */
  function calculateResult() {
    return {
      score: gameTrackingData.totalCorrect * 100,
      total_questions: gameTrackingData.totalQuestions,
      total_correct: gameTrackingData.totalCorrect,
      total_attempted: gameTrackingData.totalAttempted,
      total_time_spent: gameTrackingData.timeInSec + 1,
      question_data: [...gameTrackingData.answer],
      mistakes: gameTrackingData.mistakes,
    };
  }

  /**
   * Submits player data to the result store
   */
  function submitPlayerData(finalResult) {
    updatePlayerData({
      playerName: $userStore.name,
      accuracy: AccuracyCalc(finalResult.total_correct, finalResult.total_attempted, finalResult.total_questions),
      timeTaken: finalResult.total_time_spent,
      avatar: $userStore.profile_picture,
      total_correct: finalResult?.total_correct,
    });

    updateOpponentData({
      playerName: $gameDataStore?.opponent?.name,
      avatar: $gameDataStore?.opponent?.profile_picture,
      opponent_id: $gameDataStore?.opponent?.user_id,
    });
  }

  /**
   * Handles post game completion
   */
  function handleGameComplete() {
    const finalResult = calculateResult();
    submitPlayerData(finalResult);
    if (!$userStore?.is_guest_mode) {
      SaveChallenge($gameDataStore.subjectData, finalResult);
    } else {
      const pointsGained = PointsCalc(
        finalResult.total_correct,
        finalResult.total_attempted,
        finalResult.total_questions,
        $gameDataStore.subjectData.base_points,
      );
      const points_earned = get(userActivityStore)?.total_coins_earned;
      const total_points_earned = +points_earned + pointsGained;
      console.log(pointsGained, total_points_earned, finalResult, $userActivityStore, $gameDataStore, "pointsGained");

      userActivityStore.set({
        total_coins_earned: total_points_earned,
      });

      updatePlayerData({
        points: pointsGained,
      });

      guestStore.update((state) => ({
        ...state,
        points: total_points_earned + $guestStore.points,
      }));
      goto("/challenge/result");
    }
  }

  /**
   * Handles messages from the iframe
   */
  function handleMessage(event) {
    try {
      // Check if event.data is already an object or needs parsing
      let messageData;
      if (typeof event.data === "string") {
        messageData = JSON.parse(event.data);
      } else {
        messageData = event.data;
      }

      const { message, data } = messageData;

      // Handle different message types
      switch (message) {
        case "LOADING":
          percent = data;
          break;

        case "START":
          gameStarted = true;
          gameTrackingData.totalQuestions = data;
          playTimer = true;
          gameStartTime = Date.now();
          gameTrackingData.singleQuestionTime = Date.now();
          percent = 100;
          if (iframeRef) {
            iframeRef.style.display = "block";
          }

          dispatch("gameEvent", { type: "START", data });
          break;

        case "SUBMIT_QUESTION":
          saveAnswer({
            index: data.index,
            correct: data.correct,
            attempted: data.attempted,
            mistakes: data.mistakes,
          });

          dispatch("gameEvent", { type: "SUBMIT_QUESTION", data: gameTrackingData });
          break;

        case "STOP":
          handleGameComplete();
          break;

        case "RESIGN":
          showResignModal = true;
          break;

        case "gameError":
          playTimer = false;
          if (iframeRef) {
            iframeRef.style.display = "none";
          }
          dispatch("gameEvent", { type: "gameError", data });
          break;

        case "PAUSE":
          timerPause = true;
          dispatch("gameEvent", { type: "PAUSE", data });
          break;

        case "RESUME":
          timerPause = false;
          dispatch("gameEvent", { type: "RESUME", data });
          break;

        default:
          dispatch("gameEvent", { type: message, data });
          break;
      }
    } catch (error) {
      console.error("Error processing message:", error);
      console.error("Event data type:", typeof event.data);
      console.error("Event data:", event.data);
    }
  }

  /**
   * Handles timer completion
   */
  function handleTimerUpdate(event) {
    const { status, data } = event.detail;
    console.log(status, "status");
    if (status === "completed") {
      // gameTrackingData.timeInSec = timeLimit;
      // const finalResult = calculateResult();
      handleGameComplete();
      // dispatch('gameEvent', { type: 'timerCompleted', data: finalResult });
    }
  }

  /**
   * Handles fullscreen changes
   */
  function handleScreen(event) {
    const { value, orientation } = event.detail;
    isFullscreen = value;
    dispatch("screenChange", { fullscreen: value, orientation });
  }

  /**
   * Tracks time spent in the game
   */
  function startTimeTracking() {
    const timerId = setInterval(() => {
      if (!timerPause && gameStarted) {
        gameTrackingData.timeInSec = Math.floor((Date.now() - gameStartTime) / 1000);
      }
    }, 1000);

    return timerId;
  }

  /**
   * Initiates game resign
   */
  function initiateResign() {
    const finalResult = calculateResult();
    if (!$userStore?.is_guest_mode) {
      submitPlayerData(finalResult);
      ResignChallenge($gameDataStore.subjectData, finalResult);
    } else {
      updatePlayerData({
        score: null,
        playerName: $userStore.name,
        accuracy: 0,
        timeTaken: null,
        avatar: $userStore.profile_picture,
        total_correct: finalResult?.total_correct,
      });
      goto("/challenge/result");
    }
  }

  /**
   * Handles game start from loader
   */
  function startGame(event) {
    if (event === "timeToStart") {
      isLoading = false;
    }
  }

  onMount(() => {
    // Add message event listener
    window.addEventListener("message", handleMessage);

    // Get time limit from game data if available
    if ($gameDataStore?.time_limit) {
      timeLimit = $gameDataStore.time_limit;
    }

    // Start tracking time
    const timerId = startTimeTracking();

    return () => {
      window.removeEventListener("message", handleMessage);
      clearInterval(timerId);
    };
  });

  $: console.log($gameDataStore, "gameDataStore");
</script>

<div class="game-container">
  {#if isLoading}
    <div class="loader-container" class:fade-out={!isLoading}>
      <GameLoader userData={$userStore} gameData={$gameDataStore} bind:percent callback={startGame} />
    </div>

    <!-- Timer Box component -->
  {:else}
    <div class="timer-overlay">
      <TimerBox
        {playTimer}
        allowPlaying={true}
        {timerPause}
        {timeLimit}
        {isFullscreen}
        on:timerUpdate={handleTimerUpdate}
        on:handleScreen={handleScreen}
      />
    </div>
  {/if}

  <!-- Game iframe -->
  <iframe
    bind:this={iframeRef}
    src={launchUrl}
    class="game-iframe"
    class:fade-in={!isLoading}
    allow="fullscreen"
    title="Game Player"
    scrolling="no"
    webkitallowfullscreen="true"
    allowFullScreen
    mozallowfullscreen="true"
  ></iframe>
</div>

<!-- Modal container -->
<div class="modal-container" class:pointer-events-auto={showResignModal}>
  {#if showResignModal}
    <ConfirmationModal
      bind:showModal={showResignModal}
      title={$t("resign_title")}
      message={$t("resign_message")}
      cancelText={$t("cancel")}
      successText={$t("resign_text")}
      onConfirm={initiateResign}
    />
  {/if}
</div>

<style>
  .game-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    overflow: hidden;
  }

  .loader-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    transition: opacity 0.2s ease-out;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fade-out {
    opacity: 0;
  }

  .game-iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    opacity: 0;
    transition: opacity 0.2s ease-in;
    transform-origin: center;
  }

  .fade-in {
    opacity: 1;
  }

  .timer-overlay {
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;
    z-index: 1000;
    pointer-events: none;
    padding: 0 16px;
  }

  .timer-overlay :global(.timer-box) {
    pointer-events: auto;
    max-width: 100%;
    margin: 0 auto;
  }

  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    padding: 16px;
  }

  .pointer-events-auto {
    pointer-events: auto;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    .timer-overlay {
      top: 16px;
    }
  }

  @media (max-width: 480px) {
    .timer-overlay {
      top: 8px;
    }
  }

  /* Handle landscape orientation */
  @media (max-height: 500px) and (orientation: landscape) {
    .timer-overlay {
      top: 8px;
    }
  }
</style>
