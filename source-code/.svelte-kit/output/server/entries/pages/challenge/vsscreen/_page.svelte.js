import { b as push, c as attr, e as escape_html, f as stringify, d as bind_props, p as pop, s as store_get, u as unsubscribe_stores, k as copy_payload, l as assign_payload } from "../../../../chunks/index.js";
import { u as userStore } from "../../../../chunks/user.store.js";
import { g as gameDataStore } from "../../../../chunks/useractivity.store.js";
import { o as onDestroy } from "../../../../chunks/index-server.js";
import { p as polkaDots, s as spikes, a as singlePlayerBanner, v as vsImage } from "../../../../chunks/images.constants.js";
import { f as fallback } from "../../../../chunks/utils2.js";
import { A as Avatar } from "../../../../chunks/Avatar.js";
import { t } from "../../../../chunks/language.store.js";
import { z as zeroPad } from "../../../../chunks/utils.js";
import "../../../../chunks/client.js";
import "../../../../chunks/client2.js";
import "lz-string";
import { a as isShupavu } from "../../../../chunks/system..da.js";
import "../../../../chunks/index2.js";
import { __tla as __tla_0 } from "../../../../chunks/api.definitions.js";
import "notyf";
import { p as paymentStore } from "../../../../chunks/payment.store.js";
let _page;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const startChallengeSound = "/_app/immutable/assets/start_challenge.B-lbAoXm.mp3";
  const drumrollSound = "/_app/immutable/assets/drumroll.DMT6Sqnq.mp3";
  const countdownSound = "/_app/immutable/assets/countdown.Cbs6QFWp.mp3";
  function CountdownTimer($$payload, $$props) {
    push();
    let start = fallback($$props["start"], false);
    let callback = $$props["callback"];
    let count = 3;
    let timer;
    let isCounting = false;
    let isAnimating = false;
    let showZero = false;
    function startCountdown() {
      isCounting = true;
      count = 3;
      showZero = false;
      triggerAnimation();
      timer = setInterval(() => {
        count--;
        if (count === 0) {
          showZero = true;
          triggerAnimation();
          setTimeout(() => {
            isCounting = false;
            showZero = false;
            if (callback) callback();
          }, 1e3);
          clearInterval(timer);
        } else {
          triggerAnimation();
        }
      }, 1e3);
    }
    function triggerAnimation() {
      isAnimating = false;
      setTimeout(() => {
        isAnimating = true;
      }, 50);
    }
    {
      if (start && !isCounting) {
        startCountdown();
      }
    }
    $$payload.out += `<div class="timer svelte-celqh7">`;
    if (start && (count > 0 || showZero)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr("class", `count ${stringify(isAnimating ? "animated" : "")} svelte-celqh7`)}>${escape_html(showZero ? 0 : count)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
    bind_props($$props, {
      start,
      callback
    });
    pop();
  }
  function SwordAnimation($$payload, $$props) {
    push();
    let isSinglePlayerMatch = fallback($$props["isSinglePlayerMatch"], false);
    $$payload.out += `<div class="relative w-full h-[84px]">`;
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
    bind_props($$props, {
      isSinglePlayerMatch
    });
    pop();
  }
  function GameLoader($$payload, $$props) {
    push();
    var $$store_subs;
    let percent = fallback($$props["percent"], 0);
    let callback = $$props["callback"];
    let userData = $$props["userData"];
    let gameData = $$props["gameData"];
    let isHundredReached = fallback($$props["isHundredReached"], false);
    let scale = 1;
    let track1;
    let track2;
    let track3;
    const user = {
      username: userData?.name
    };
    const isSinglePlayerMatch = gameData?.isSinglePlayer === 0;
    function formatUsername(username) {
      if (!username) return "";
      if (username.length > 12) {
        return username.substring(0, 10) + "...";
      }
      return username;
    }
    function pauseAudio(track) {
      if (track === "track1" && track1) track1.pause();
      if (track === "track2" && track2) track2.pause();
      if (track === "track3" && track3) track3.pause();
    }
    function handleTimerComplete() {
      callback("timeToStart");
    }
    onDestroy(() => {
      pauseAudio("track1");
      pauseAudio("track2");
      pauseAudio("track3");
    });
    if (percent >= 100 && !isHundredReached) {
      isHundredReached = true;
      setTimeout(() => {
      }, 500);
    }
    $$payload.out += `<div class="flex flex-col h-full w-full justify-center items-center text-red-500 absolute z-10 transition-width duration-300 svelte-j692io"><audio preload="auto" class="svelte-j692io"><source${attr("src", startChallengeSound)} type="audio/mp3" class="svelte-j692io"></audio> <audio preload="auto" class="svelte-j692io"><source${attr("src", drumrollSound)} type="audio/mp3" class="svelte-j692io"></audio> <audio preload="auto" class="svelte-j692io"><source${attr("src", countdownSound)} type="audio/mp3" class="svelte-j692io"></audio> <div class="h-full w-full fixed top-0 bg-black svelte-j692io"><div${attr("class", `${stringify(`justify-center items-center flex-col h-full m-0 flex ${isSinglePlayerMatch ? "twisted-ui-s" : "twisted-ui"}`)} svelte-j692io`)}><div${attr("class", `${stringify(`flex-1 ${isSinglePlayerMatch ? "h-full" : "h-1/2"} w-full bg-transparent ${isSinglePlayerMatch ? "" : "animated-left"}`)} svelte-j692io`)} style="background: radial-gradient(at bottom, #00F0FF 0%, #1C62CB 60%);"></div> `;
    if (!isSinglePlayerMatch) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="flex-1 h-1/2 w-full bg-transparent animated-right svelte-j692io" style="border: 12px solid black; background: radial-gradient(at top, #FF981E 0%, #CB1E47 60%);"></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="max-h-screen max-w-full overflow-hidden h-full w-full fixed left-0 top-0 bottom-0 right-0 svelte-j692io"><div class="svelte-j692io"><div class="absolute left-0 right-0 top-0 bottom-0 bg-cover bg-center svelte-j692io"${attr("style", `background-image: url("${polkaDots}")`)}></div> <div class="absolute left-0 right-0 top-0 bottom-0 bg-cover bg-center transition-transform duration-0 svelte-j692io"${attr("style", `background-image: url("${spikes}"); transform: scale(${scale}); transform-origin: 50% 50%;`)}></div></div></div> <div class="justify-center items-center flex-col h-full m-0 flex absolute top-0 bottom-0 right-0 left-0 overflow-hidden h-full max-h-full svelte-j692io"><div class="justify-center items-center flex-col h-full m-0 flex w-full max-w-5xl justify-between svelte-j692io"><div class="relative w-full flex justify-center mt-10 svelte-j692io"><div class="relative bg-contain bg-center bg-no-repeat h-[85px] w-[350px] md:w-[430px] svelte-j692io"${attr("style", `background-image: url("${singlePlayerBanner}")`)}>`;
    SwordAnimation($$payload, {
      isSinglePlayerMatch
    });
    $$payload.out += `<!----> <div class="absolute w-full h-full flex items-center justify-center top-0 svelte-j692io">`;
    if (percent >= 0 && !isHundredReached) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="flex items-center gap-4 svelte-j692io"><div class="text-white font-bold text-xl svelte-j692io">Loading...</div> <div class="text-white text-[60px] font-bold pb-[0.5rem] svelte-j692io">${escape_html(percent)}<span class="text-white font-bold text-xl svelte-j692io">%</span></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="mode-text flex gap-2 items-center svelte-j692io"><span${attr("class", `text-white font-bold ${stringify(isSinglePlayerMatch ? "text-base md:text-lg" : "text-base md:text-xl")} svelte-j692io`)}>${escape_html(isSinglePlayerMatch ? "Single Player Mode" : "Challenge Mode")} in</span> `;
      CountdownTimer($$payload, {
        start: true,
        callback: handleTimerComplete
      });
      $$payload.out += `<!----></div>`;
    }
    $$payload.out += `<!--]--></div></div></div> <div class="mt-6 mb-6 w-full max-w-4xl svelte-j692io"><div${attr("class", `${stringify(`flex ${isSinglePlayerMatch ? "flex-col items-center" : "flex-row items-center justify-center"} gap-8`)} svelte-j692io`)}><div class="flex flex-col items-center svelte-j692io"><div class="h-[120px] w-[120px] rounded-full overflow-hidden bg-[#e5e5e5] relative p-2 svelte-j692io">`;
    Avatar($$payload, {
      t: store_get($$store_subs ??= {}, "$userStore", userStore).profile_picture,
      fullSize: true,
      ml: "auto",
      mr: "auto"
    });
    $$payload.out += `<!----></div> <div class="text-center mt-2 font-bold text-white text-lg svelte-j692io">`;
    if (!store_get($$store_subs ??= {}, "$userStore", userStore)?.is_guest_mode) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(formatUsername(user.username))}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(store_get($$store_subs ??= {}, "$t", t)("guest_mode"))}`;
    }
    $$payload.out += `<!--]--></div></div> <div class="flex flex-col items-center justify-center svelte-j692io">`;
    if (!isSinglePlayerMatch) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="h-32 w-full flex justify-center items-center svelte-j692io"><img${attr("src", vsImage)} alt="VS" class="w-[165px] h-[165px] z-[120] svelte-j692io"></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> `;
    if (!isSinglePlayerMatch) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="flex flex-col items-center svelte-j692io"><div class="h-[120px] w-[120px] rounded-full overflow-hidden bg-[#e5e5e5] relative p-2 svelte-j692io">`;
      Avatar($$payload, {
        t: gameData?.opponent?.profile_picture,
        fullSize: true,
        ml: "auto",
        mr: "auto"
      });
      $$payload.out += `<!----></div> <div class="text-center mt-2 font-bold text-white text-lg svelte-j692io">${escape_html(formatUsername(gameData?.opponent?.name))}</div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div></div></div></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, {
      percent,
      callback,
      userData,
      gameData,
      isHundredReached
    });
    pop();
  }
  function Timer($$payload, $$props) {
    push();
    let min = fallback($$props["min"], 0);
    let sec = fallback($$props["sec"], 0);
    let start = fallback($$props["start"], false);
    let pause = fallback($$props["pause"], false);
    let totalTime = fallback($$props["totalTime"], 0);
    let count = 0;
    let timer;
    let currentMin = parseInt(min, 10);
    let currentSec = parseInt(sec, 10);
    let remainingTicks = 0;
    let minShow = 0;
    let secShow = 0;
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
      timer = setInterval(tick, 1e3);
    }
    function stopTimer() {
      clearInterval(timer);
      timer = null;
    }
    function timerCallbackUpdater(msg = "timer") {
      const ticks = currentMin * 60 + currentSec;
      const completed = ticks >= totalTime;
      if (completed) {
        clearInterval(timer);
        timer = null;
      }
    }
    onDestroy(() => {
      clearInterval(timer);
    });
    if (start && !timer) {
      startTimer();
    } else if (!start && timer) {
      stopTimer();
    }
    $$payload.out += `<span>${escape_html(zeroPad(minShow))}:${escape_html(zeroPad(secShow))}</span>`;
    bind_props($$props, {
      min,
      sec,
      start,
      pause,
      totalTime
    });
    pop();
  }
  function TimerBox($$payload, $$props) {
    push();
    let playTimer = fallback($$props["playTimer"], false);
    let allowPlaying = fallback($$props["allowPlaying"], true);
    let timerPause = fallback($$props["timerPause"], false);
    let timeLimit = fallback($$props["timeLimit"], 0);
    let isFullscreen = fallback($$props["isFullscreen"], false);
    let isMcdUser = fallback($$props["isMcdUser"], false);
    $$payload.out += `<div${attr("class", `timer-box absolute z-[2000] top-0 left-1/2 transform -translate-x-1/2 ${stringify(!(playTimer || !allowPlaying) ? "hidden" : "")}`)}><div class="relative cursor-pointer"><div${attr("class", `timer-container ${stringify("translate-y-0")} transition-transform duration-500 svelte-1vku81i`)}><div${attr("class", `timer-bubble px-5 py-2 flex items-center justify-center ${stringify("timer-closed")} svelte-1vku81i`)}><div class="timer-display absolute top-[15%] left-[35%] text-white text-xl font-bold">`;
    Timer($$payload, {
      min: 0,
      sec: 0,
      start: playTimer,
      pause: timerPause,
      totalTime: timeLimit
    });
    $$payload.out += `<!----></div></div></div></div></div>`;
    bind_props($$props, {
      playTimer,
      allowPlaying,
      timerPause,
      timeLimit,
      isFullscreen,
      isMcdUser
    });
    pop();
  }
  _page = function($$payload, $$props) {
    push();
    var $$store_subs;
    let launchUrl, isSubscribed;
    let userData = $$props["userData"];
    let gameData = $$props["gameData"];
    let isLoading = true;
    let timeLimit = 300;
    let playTimer = true;
    let timerPause = false;
    let percent = 0;
    let isFullscreen = false;
    function startGame(event) {
      if (event === "timeToStart") {
        isLoading = false;
      }
    }
    launchUrl = `${store_get($$store_subs ??= {}, "$gameDataStore", gameDataStore).link}&user_id=${store_get($$store_subs ??= {}, "$userStore", userStore).user_id}&isPlayBonzo=1`;
    isSubscribed = store_get($$store_subs ??= {}, "$paymentStore", paymentStore)?.payment_status?.is_subscribed === 1;
    isShupavu && !isSubscribed && !store_get($$store_subs ??= {}, "$userStore", userStore)?.is_guest_mode;
    console.log(store_get($$store_subs ??= {}, "$gameDataStore", gameDataStore), "gameDataStore");
    let $$settled = true;
    let $$inner_payload;
    function $$render_inner($$payload2) {
      $$payload2.out += `<div class="game-container svelte-1nczyez">`;
      if (isLoading) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div${attr("class", `loader-container svelte-1nczyez ${stringify([
          !isLoading ? "fade-out" : ""
        ].filter(Boolean).join(" "))}`)}>`;
        GameLoader($$payload2, {
          userData: store_get($$store_subs ??= {}, "$userStore", userStore),
          gameData: store_get($$store_subs ??= {}, "$gameDataStore", gameDataStore),
          callback: startGame,
          get percent() {
            return percent;
          },
          set percent($$value) {
            percent = $$value;
            $$settled = false;
          }
        });
        $$payload2.out += `<!----></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div class="timer-overlay svelte-1nczyez">`;
        TimerBox($$payload2, {
          playTimer,
          allowPlaying: true,
          timerPause,
          timeLimit,
          isFullscreen
        });
        $$payload2.out += `<!----></div>`;
      }
      $$payload2.out += `<!--]--> <iframe${attr("src", launchUrl)}${attr("class", `game-iframe svelte-1nczyez ${stringify([
        !isLoading ? "fade-in" : ""
      ].filter(Boolean).join(" "))}`)} allow="fullscreen" title="Game Player" scrolling="no" webkitallowfullscreen="true" allowFullScreen mozallowfullscreen="true"></iframe></div> <div${attr("class", `modal-container svelte-1nczyez ${stringify([
        ""
      ].filter(Boolean).join(" "))}`)}>`;
      {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div>`;
    }
    do {
      $$settled = true;
      $$inner_payload = copy_payload($$payload);
      $$render_inner($$inner_payload);
    } while (!$$settled);
    assign_payload($$payload, $$inner_payload);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, {
      userData,
      gameData
    });
    pop();
  };
});
export {
  __tla,
  _page as default
};
