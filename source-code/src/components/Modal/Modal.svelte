<script>
  // @ts-nocheck
  import { onMount, onDestroy } from "svelte";
  import { fly } from "svelte/transition";
  import { browser } from "$app/environment";

  export let open = false;
  export let onClick = () => {}; // Callback function
  export let maxWidth = 600; // Default width
  export let customClass = ""; // custom class to modal

  let dialog;

  function closeModal() {
    open = false;
    onClick();
  }

  function handleKeydown(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  onMount(() => {
    if (browser) {
      document.addEventListener("keydown", handleKeydown);
    }
  });

  onDestroy(() => {
    if (browser) {
      document.removeEventListener("keydown", handleKeydown);
    }
  });

  // Focus trapping logic
  let focusableElements;
  function trapFocus() {
    focusableElements = dialog.querySelectorAll(' input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    dialog.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    });

    if (firstElement) firstElement.focus();
  }
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Overlay -->
    <button
      class="absolute inset-0 w-full h-full bg-black opacity-60 cursor-default"
      aria-label="Close modal by clicking outside"
      on:click={closeModal}
    ></button>

    <!-- Scrollable Dialog Box -->
    <section
      bind:this={dialog}
      class="relative bg-white rounded-[20px] shadow-xl w-full md:max-h-[100%] max-h-screen md:h-auto flex flex-col overflow-y-auto {customClass}"
      style="max-width: {maxWidth}px;"
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      on:focus={trapFocus}
      transition:fly={{ y: -100, duration: 400 }}
    >
      <button
        on:click={closeModal}
        class="absolute top-[10px] z-[1] right-3 p-2 rounded-full text-gray-900 bg-gray-100 hover:text-black hover:bg-gray-200 focus:outline-none"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path
            fill-rule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Scrollable Body -->
      <div class="overflow-y-auto flex-1">
        <slot name="header" />
      </div>

      <!-- Scrollable Body -->
      <div class="overflow-y-auto flex-1 p-6">
        <slot name="body" />
      </div>

      <!-- Sticky Footer -->
      <footer class="overflow-hidden">
        <slot name="footer" />
      </footer>
    </section>
  </div>
{/if}
