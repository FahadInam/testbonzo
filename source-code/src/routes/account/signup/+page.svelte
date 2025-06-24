<script>
  import { clearBackUrlIfPathMatches, storeBackUrlOnNavigationTo } from "../../../stores/navigation.store";
  import { onMount } from "svelte";
  import {
    emailVerificationFieldsSetup,
    userSelectionCards,
  } from "../../../data-actions/authentication/common.auth.data";
  import AuthenticationView from "../../../views/AuthenticationView/AuthenticationView.svelte";
  import { t } from "../../../stores/language.store";
  import { page } from "$app/stores";
  import { getInstanceText } from "$lib/utils";

  let changeCode = "";
  let hasChangeCode = false;
  /**
   * @type {{ image: string; title: any; description: any; link: string; }[]}
   */
  let cards = [];

  storeBackUrlOnNavigationTo("signup");
  const cardTitle = getInstanceText($t, "bonzo_as");

  onMount(async () => {
    const urlParams = new URLSearchParams($page.url.search);
    changeCode = urlParams.get("change_code") || "";
    hasChangeCode = Boolean(changeCode);
    clearBackUrlIfPathMatches();
    cards = await userSelectionCards();
  });
</script>

{#if hasChangeCode}
  <AuthenticationView form={emailVerificationFieldsSetup} showBackButton={false} />
{:else}
  <AuthenticationView useModal={false} {cardTitle} {cards} />
{/if}
