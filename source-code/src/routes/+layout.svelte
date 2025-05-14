<script>
  import { browser } from "$app/environment";
  import { beforeNavigate, onNavigate } from "$app/navigation";
  import { onMount } from "svelte";
  import "../app.css";
  import "../styles/theme-icons.css"; // add theme icons
  import { t } from "../stores/language.store";
  import { firstLoadStore } from "../stores/firstload.store";
  import { checkPathRedirection } from "../data-actions/pathRedirections/path.redirections";
  import { page } from "$app/state";
  let loaderInterval = -1;
  /**
   * @type {__sveltets_2_IsomorphicComponent<{ [x: string]: never; }, { [evt: string]: CustomEvent<any>; }, {}, {}, string>}
   */
  let Toast;
  /**
   * @type {__sveltets_2_IsomorphicComponent<{ retryLabel?: string | undefined; }, { [evt: string]: CustomEvent<any>; }, {}, {}, string>}
   */
  let RetryBox;
  /**
   * @type {__sveltets_2_IsomorphicComponent<{ isLoading?: boolean | undefined; }, { [evt: string]: CustomEvent<any>; }, {}, {}, string>}
   */
  let Loader;

   /**
   * @type {__sveltets_2_IsomorphicComponent<{ [x: string]: never; }, { [evt: string]: CustomEvent<any>; }, {}, {}, string>}
   */
  let LmsAuthentication;

  function hideMainLoader() {
    clearInterval(loaderInterval);
    loaderInterval = setTimeout(() => {
      if (browser && document) {
        // @ts-ignore
        document.getElementById("fullloader").style.display = "none";
      }
    }, 1000);
  }

  onNavigate(() => {
    hideMainLoader();
  });

  hideMainLoader();

  beforeNavigate(({ to }) => {
    if (to && to.url) {
      checkPathRedirection(to.url.pathname);
    }
  });

  checkPathRedirection(page.url.pathname);

  // Dynamically load components on mount
  onMount(async () => {
    const [
      { default: ToastComponent },
      { default: RetryBoxComponent },
      { default: LoaderComponent },
      { default: LmsAuthenticationComponent },
    ] = await Promise.all([
      import("../components/Toast/Toast.svelte"),
      import("../components/RetryBox/RetryBox.svelte"),
      import("../components/Loader/Loader.svelte"),
       import("../views/LmsAuthentication/LmsAuthentication.svelte")
    ]);

    Toast = ToastComponent;
    RetryBox = RetryBoxComponent;
    Loader = LoaderComponent;
    LmsAuthentication = LmsAuthenticationComponent;
    firstLoadStore.set({ isUILoaded: true });
  });

</script>

<slot />

{#if Toast}
  <svelte:component this={Toast} />
{/if}

{#if RetryBox}
  <svelte:component this={RetryBox} retryLabel={$t("retry")} />
{/if}

{#if Loader}
  <svelte:component this={Loader} isLoading={false} />
{/if}

{#if LmsAuthentication}
  <svelte:component this={LmsAuthentication} />
{/if}