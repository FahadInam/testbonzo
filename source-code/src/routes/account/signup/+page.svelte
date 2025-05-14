<script>
  import {
    clearBackUrlIfPathMatches,
    storeBackUrlOnNavigationTo,
  } from "../../../stores/navigation.store";
  import { onMount } from "svelte";
  import {  emailVerificationFieldsSetup, userSelectionCards } from "../../../data-actions/authentication/common.auth.data";
  import AuthenticationView from "../../../views/AuthenticationView/AuthenticationView.svelte";
  import { t } from "../../../stores/language.store";
    import { page } from "$app/stores";

    let changeCode = "";
  let hasChangeCode = false;

  storeBackUrlOnNavigationTo("signup");


  
  onMount(() => {
    const urlParams = new URLSearchParams($page.url.search);
    changeCode = urlParams.get("change_code") || "";
    hasChangeCode = Boolean(changeCode);
    clearBackUrlIfPathMatches();
  });
</script>
{#if hasChangeCode}
  <AuthenticationView form={emailVerificationFieldsSetup} showBackButton={false} />
{:else}
<AuthenticationView
  useModal={false}
  cardTitle={$t("bonzo_as")}
  cards={userSelectionCards}
/>
{/if}
