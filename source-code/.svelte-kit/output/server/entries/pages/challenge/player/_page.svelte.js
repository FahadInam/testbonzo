import { e as escape_html, d as bind_props, p as pop, b as push, c as attr, f as stringify, n as clsx, h as head, s as store_get, u as unsubscribe_stores } from "../../../../chunks/index.js";
import { o as onDestroy } from "../../../../chunks/index-server.js";
import { f as fallback } from "../../../../chunks/utils2.js";
import { I as IMAGES } from "../../../../chunks/images.constants.js";
import "../../../../chunks/client.js";
import "notyf";
import "clsx";
import "../../../../chunks/user.store.js";
import "lz-string";
import "../../../../chunks/client2.js";
import { t } from "../../../../chunks/language.store.js";
import "../../../../chunks/system..da.js";
import "../../../../chunks/index2.js";
import "../../../../chunks/useractivity.store.js";
import { __tla as __tla_0 } from "../../../../chunks/api.definitions.js";
let _page;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const numbers = {
    FloatFix(n, isPercentage = false) {
      if (isNaN(n) || n === "") return 0;
      let newN = parseFloat(n);
      if (newN < 0 && isPercentage) newN = 0;
      if (newN > 100 && isPercentage) newN = 100;
      return this.SetZeroError(newN);
    },
    ZeroPad(n) {
      return n < 10 ? `0${n}` : n;
    },
    SetZeroError(n) {
      const num = `${parseFloat(n).toFixed(2)}`;
      if (num.split(".").length === 1 || parseInt(num.split(".")[1], 10) === 0) return `${num.split(".")[0]}`;
      return num;
    },
    AbbreviatedNumber(num, digits) {
      const si = [
        {
          value: 1,
          symbol: ""
        },
        {
          value: 1e3,
          symbol: "k"
        },
        {
          value: 1e6,
          symbol: "M"
        },
        {
          value: 1e9,
          symbol: "B"
        },
        {
          value: 1e12,
          symbol: "T"
        },
        {
          value: 1e15,
          symbol: "P"
        },
        {
          value: 1e18,
          symbol: "E"
        }
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      let i;
      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break;
        }
      }
      return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    },
    ToCommaSeparated(str, l) {
      if (l === "urdu") return str.toLocaleString("en-IN");
      const fStr = str.toLocaleString();
      return fStr.length === 1 ? `0${fStr}` : fStr;
    },
    ToCommaSeparatedWithoutZero(str, l) {
      if (l === "urdu") return str.toLocaleString("en-IN");
      const fStr = str.toLocaleString();
      return fStr.length === 1 ? `${fStr}` || 0 : fStr || 0;
    },
    AtLeastZero(n) {
      if (typeof n === "undefined") return 0;
      return n;
    }
  };
  function Timer($$payload, $$props) {
    push();
    let remainingTicks, minShow, secShow;
    let min = fallback($$props["min"], 0);
    let sec = fallback($$props["sec"], 0);
    let totalTime = fallback($$props["totalTime"], 0);
    let start = fallback($$props["start"], false);
    let pause = fallback($$props["pause"], false);
    let callback = fallback($$props["callback"], void 0);
    let count = 0;
    let timer;
    let currentMin = parseInt(min, 10);
    let currentSec = parseInt(sec, 10);
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
      timer = setInterval(tick, 1e3);
    }
    function stopTimer() {
      clearInterval(timer);
    }
    function timerCallbackUpdater(msg = "timer") {
      const ticks = currentMin * 60 + currentSec;
      const completed = ticks >= totalTime;
      if (completed) clearInterval(timer);
      if (callback) callback(completed ? "completed" : msg, {
        min: currentMin,
        sec: currentSec,
        ticks
      });
    }
    onDestroy(() => {
      clearInterval(timer);
    });
    remainingTicks = totalTime - (currentMin * 60 + currentSec);
    minShow = parseInt(remainingTicks / 60, 10);
    secShow = remainingTicks % 60;
    if (start) {
      startTimer();
    } else {
      stopTimer();
    }
    $$payload.out += `<!---->Timer.svelte <span class="font-mono text-lg">${escape_html(numbers.ZeroPad(minShow))}:${escape_html(numbers.ZeroPad(secShow))}</span>`;
    bind_props($$props, {
      min,
      sec,
      totalTime,
      start,
      pause,
      callback
    });
    pop();
  }
  function UserBox($$payload, $$props) {
    push();
    let user = $$props["user"];
    let isSinglePlayerMatch = fallback($$props["isSinglePlayerMatch"], false);
    let animated = fallback($$props["animated"], false);
    let isGuest = fallback($$props["isGuest"], false);
    let avatarSize = 150;
    function usernameResolver(name, username) {
      return username || name || "";
    }
    avatarSize = 150;
    $$payload.out += `<div${attr("class", `user-box ${stringify(isSinglePlayerMatch ? "col-span-12" : "col-span-5")} h-full ${stringify([
      animated ? "hidden" : ""
    ].filter(Boolean).join(" "))}`)}><div${attr("class", `z-0 ${stringify(isSinglePlayerMatch ? "flex justify-center items-center" : "flex items-center justify-end")}`)}><div class="text-center"><div class="invisible"><p class="mb-6 font-medium player-name svelte-8gb118">${escape_html(isGuest ? "Guest Mode" : usernameResolver(user.name, user.username || user.user_name))}</p></div> <div class="avatar-wrapper shadow-lg"><img${attr("src", user.profile_picture)} alt="User avatar" class="rounded-full"${attr("style", `width: ${stringify(avatarSize)}px; height: ${stringify(avatarSize)}px;`)}></div> <p class="mt-6 font-medium player-name bg-white text-black svelte-8gb118">${escape_html(isGuest ? "Guest Mode" : usernameResolver(user.name, user.username || user.user_name))}</p></div></div></div>`;
    bind_props($$props, {
      user,
      isSinglePlayerMatch,
      animated,
      isGuest
    });
    pop();
  }
  function GameLoading($$payload, $$props) {
    push();
    let percent = fallback($$props["percent"], 0);
    let timerTick = fallback($$props["timerTick"], false);
    let callback = $$props["callback"];
    let opponent = $$props["opponent"];
    let challenge = $$props["challenge"];
    let isCompleted = fallback($$props["isCompleted"], false);
    let isHunderdReached = false;
    let time = 4;
    let scale = 1;
    let track1;
    let track2;
    let track3;
    const user = {
      Info: () => ({
        name: "Player",
        avatar: ""
      }),
      IsGuest: () => false,
      CombinedOpponent: (opp) => opp || {
        name: "Opponent",
        avatar: ""
      }
    };
    const isSinglePlayerMatch = opponent && opponent.isSinglePlayer === true;
    const subject = challenge?.subject || {};
    !!subject.isStart;
    const calcOpponent = user.CombinedOpponent(opponent);
    const pauseAudio = (track) => {
      if (track === "track1" && track1) track1.pause();
      if (track === "track2" && track2) track2.pause();
      if (track === "track3" && track3) track3.pause();
    };
    onDestroy(() => {
      pauseAudio("track1");
      pauseAudio("track2");
      pauseAudio("track3");
    });
    if (percent >= 100 && !isHunderdReached) isHunderdReached = true;
    $$payload.out += `<div class="preloader svelte-bsdij1"><div class="boxClassName coreChallengeBgBox h-full svelte-bsdij1"><div${attr("class", `containerClass ${stringify(isSinglePlayerMatch ? "twistedUIS" : "twistedUI")} svelte-bsdij1`)}><div${attr("class", `${stringify(isSinglePlayerMatch ? "halfFull" : "half")} blackBg ${stringify(isSinglePlayerMatch ? "" : "animatedLeft")} svelte-bsdij1`)}></div> `;
    if (!isSinglePlayerMatch) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div${attr("class", `half whiteBg ${stringify(isSinglePlayerMatch ? "" : "animatedRight")} svelte-bsdij1`)}></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="coreChallengeBoxBgAnims svelte-bsdij1"><div class="coreChallengeBoxBgAnimsInner svelte-bsdij1"><div class="polkaDots svelte-bsdij1"${attr("style", `background-image: url(${stringify(IMAGES.POLKA_DOTS)})`)}></div> <div class="spikes svelte-bsdij1"${attr("style", `background-image: url(${stringify(IMAGES.SPIKES)}); transform: scale(${stringify(scale)})`)}></div></div></div> <div class="containerClass upperLayer svelte-bsdij1"><div class="containerClass innerBox w-full max-w-4xl svelte-bsdij1"><div class="h-12 mt-4 hidden items-end svelte-bsdij1"><h4 class="text-center text-white svelte-bsdij1">${escape_html(challenge?.subject?.subject || "")}</h4></div> <div class="mt-6 mb-6 w-full max-w-4xl playersCirclesContainer svelte-bsdij1"><div${attr("class", `grid grid-cols-12 items-center ${stringify(isSinglePlayerMatch ? "innerPlayerCirclesSP" : "innerPlayerCircles")} svelte-bsdij1`)}><div${attr("class", `${stringify(isSinglePlayerMatch ? "modeTextSP" : "modeText")} ${stringify("invisible")} svelte-bsdij1`)}><span${attr("class", clsx(isSinglePlayerMatch ? "modeTextLabelSP" : "modeTextLabelMP") + " svelte-bsdij1")}>`;
    if (percent >= 0 && !isHunderdReached) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span style="font-size: 18px; margin-left: 10px;" class="svelte-bsdij1">Loading...</span>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(isSinglePlayerMatch ? "SINGLE PLAYER MODE IN" : "MULTIPLAYER CHALLENGE IN")}`;
    }
    $$payload.out += `<!--]--> `;
    if (percent >= 0 && !isHunderdReached && true) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="percentTimerContainer svelte-bsdij1"><span class="text-[60px] font-bold text-white svelte-bsdij1">${escape_html(percent)} <span class="text-xl ml-1 svelte-bsdij1">%</span></span></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="timerContainer svelte-bsdij1"${attr("style", `visibility: ${stringify("hidden")}`)}><span class="countdown_digits svelte-bsdij1"><span${attr("class", `timerContainer1 ${stringify("")} text-white font-bold text-7xl svelte-bsdij1`)}>${escape_html(time)}</span></span></div></span> <img${attr("src", isSinglePlayerMatch ? IMAGES.SINGLE_PLAYER_BANNER : IMAGES.MULTI_PLAYER_BANNER)}${attr("alt", isSinglePlayerMatch ? "SINGLE PLAYER" : "MULTIPLAYER CHALLENGE")}${attr("height", isSinglePlayerMatch ? 85 : 85)} style="margin: auto;" class="svelte-bsdij1"> <div${attr("class", `bonzoui__swords__container ${stringify("invisible")} svelte-bsdij1`)}><img${attr("src", IMAGES.SWORD1)} alt=""${attr("class", `bonzoui__sword1__overlay ${stringify("invisible")} svelte-bsdij1`)} height="70"> `;
    if (!isSinglePlayerMatch) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<img${attr("src", IMAGES.SWORD2)} alt="Multiplayer Mode"${attr("class", `bonzoui__sword2__overlay ${stringify("invisible")} svelte-bsdij1`)} height="70">`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div> <div class="hidden svelte-bsdij1">`;
    Timer($$payload, {
      min: 0,
      sec: 0,
      start: timerTick,
      callback,
      totalTime: 4
    });
    $$payload.out += `<!----></div> <div class="col-span-5 svelte-bsdij1">`;
    UserBox($$payload, {
      user: user.Info(),
      isLeft: true,
      isSinglePlayerMatch,
      animated: true,
      isGuest: user.IsGuest()
    });
    $$payload.out += `<!----></div> `;
    if (!isSinglePlayerMatch) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="col-span-2 svelte-bsdij1" style="z-index: 123;"><div class="vs svelte-bsdij1" style="display: none;"><img${attr("src", IMAGES.VS_IMAGE)} alt="VS" class="vsImg svelte-bsdij1"></div></div> <div class="col-span-5 svelte-bsdij1">`;
      UserBox($$payload, {
        user: calcOpponent,
        isSinglePlayerMatch,
        animated: true
      });
      $$payload.out += `<!----></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div></div></div></div></div>`;
    bind_props($$props, {
      percent,
      timerTick,
      callback,
      opponent,
      challenge,
      isCompleted
    });
    pop();
  }
  _page = function($$payload, $$props) {
    push();
    var $$store_subs;
    head($$payload, ($$payload2) => {
      $$payload2.title = `<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("select_mode"))}</title>`;
    });
    $$payload.out += `<div class="flex justify-center w-full px-4 sm:px-6 md:px-8 lg:px-10"><div class="w-full max-w-screen-xl space-y-6"><div class="flex flex-wrap justify-center w-full gap-9 px-4 sm:px-6 md:px-8 lg:px-10">`;
    {
      $$payload.out += "<!--[-->";
      GameLoading($$payload, {});
    }
    $$payload.out += `<!--]--></div></div></div>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  };
});
export {
  __tla,
  _page as default
};
