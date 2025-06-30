<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { t } from "../../stores/language.store";
  import { isGCLC } from "../../data-actions/system/system..da";
  import { derived } from "svelte/store";
  import { page } from "$app/stores";
  export let password: string = "";
  export let visible: boolean = false;
  export let inputEl: HTMLInputElement | null = null; // parent passes input element ref

  // Password requirements
  const requirements = [
    {
      label: "Include 8 characters",
      test: (pw: string) => pw.length >= 8,
    },
    {
      label: "Add 1 uppercase letter",
      test: (pw: string) => /[A-Z]/.test(pw),
    },
    {
      label: "Add 1 lowercase letter",
      test: (pw: string) => /[a-z]/.test(pw),
    },
    {
      label: "Include at least 1 digit",
      test: (pw: string) => /\d/.test(pw),
    },
    {
      label: "Include at least 1 special character",
      test: (pw: string) => /[^A-Za-z0-9]/.test(pw),
    },
  ];

  $: metCount = requirements.filter((r) => r.test(password)).length;
  const isForgotPassword = derived(page, ($page) => $page.url.pathname === "/account/forgot-password");

  // Strength bar colors and label
  $: strength =
    metCount < 2
      ? { label: $t("weak_password"), color: "text-black", bar: "bg-gray-300" }
      : metCount === 2
        ? { label: $t("average_password"), color: "text-black", bar: "bg-yellow-400" }
        : metCount === 3 || metCount === 4
          ? { label: $t("good_password"), color: "text-black", bar: "bg-green-400" }
          : { label: $t("strong_password"), color: "text-black", bar: "bg-green-600" };

  // Popover positioning
  let popoverEl: HTMLDivElement | null = null;
  let position: "top" | "bottom" = "bottom";

  function updatePosition() {
    if (!inputEl || !popoverEl) return;
    const inputRect = inputEl.getBoundingClientRect();
    const popoverRect = popoverEl.getBoundingClientRect();
    const spaceAbove = inputRect.top;
    // 16px margin
    let shouldBeBottom = false;
    $isForgotPassword && (shouldBeBottom = true);
    if (spaceAbove > popoverRect.height + 16) {
      position = isGCLC || shouldBeBottom ? "bottom" : "top";
    } else {
      position = "bottom";
    }
  }

  onMount(() => {
    if (visible) updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
  });
  onDestroy(() => {
    window.removeEventListener("resize", updatePosition);
    window.removeEventListener("scroll", updatePosition, true);
  });
  $: if (visible) setTimeout(updatePosition, 0);

  $: barColors = (() => {
    if (metCount < 2) return ["#ef4444", "#d1d5db", "#d1d5db", "#d1d5db"];
    if (metCount === 2) return ["#fbbf24", "#fbbf24", "#d1d5db", "#d1d5db"];
    if (metCount === 3 || metCount === 4) return ["#34d399", "#34d399", "#34d399", "#d1d5db"];
    if (metCount === 5) return ["#10b981", "#10b981", "#10b981", "#10b981"];
    return ["#d1d5db", "#d1d5db", "#d1d5db", "#d1d5db"];
  })();
</script>

{#if visible}
  <div
    bind:this={popoverEl}
    class="absolute left-0 z-50 min-w-[270px] max-w-xs bg-white border rounded-xl p-0 font-poppins animate-fade-in shadow-[0_4px_10px_rgba(0,0,0,0.1),0_0px_10px_rgba(0,0,0,0.1)]"
    style="
      {position === 'top' ? 'bottom: calc(100% + 12px); ' : 'top: calc(100% + 12px);'}
      border-color: {metCount === 5 ? '#d1d5db' : '#d1d5db'};
    "
  >
    <!-- Arrow -->
    <div class="absolute left-6 w-4 h-4 overflow-hidden" style={position === "top" ? "bottom: -16px;" : "top: -16px;"}>
      <div class={`w-4 h-4 mx-auto rotate-45 shadow-md bg-white ${position === "bottom" ? "mt-2.5" : "-mt-2.5"}`}></div>
    </div>
    <div class="px-4 pt-3 pb-2">
      <div class="flex items-center gap-2 mb-2">
        <span class="font-semibold text-base {strength.color}">{strength.label}</span>
      </div>
      <!-- Strength lines -->
      <div class="flex gap-1 mb-3 mt-1">
        {#each barColors as color, i}
          <div class="h-1 rounded w-1/4 transition-all duration-200" style="background-color: {color}"></div>
        {/each}
      </div>
      <div class="text-sm text-gray-600 mb-1">To make your password stronger:</div>
      <ul class="space-y-1 mb-1">
        {#each requirements as req}
          <li class="flex items-center gap-1 text-sm">
            {#if req.test(password)}
              <svg
                class="text-[var(--primary-color)] w-4 h-4 -ml-1"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg
              >
              <span class="text-[var(--primary-color)] font-medium">{req.label}</span>
            {:else}
              <span class="text-gray-400 mr-1.5 text-lg leading-none">•</span>
              <span class="text-gray-600">{req.label}</span>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  </div>
{/if}

<style>
  .animate-fade-in {
    animation: fadeIn 0.18s;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .font-poppins {
    font-family: "Poppins", sans-serif;
  }
</style>
