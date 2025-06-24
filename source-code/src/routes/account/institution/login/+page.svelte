<script>
  import { onMount } from "svelte";
  import { getInstitutionLoginForm } from "../../../../data-actions/authentication/institution.auth.da";
  import AuthenticationView from "../../../../views/AuthenticationView/AuthenticationView.svelte";

  /**
   * @type {{ footer: { text: any; button: { label: any; type: string; link: string; }; }; role: string; alternativeButtons?: { label: any; type: string; image: string; onClick: (role: string) => void; }[] | undefined; handleSubmit: (formData: any) => Promise<void>; title: any; fields: { name: string; type: string; label: any; placeholder: any; required: boolean; }[]; buttons: { label: any; customClass: string; type: string; }[]; enableTurnstile: boolean; turnstileSiteKey: string; } | null}
   */
  let form = null;

  onMount(async () => {
    form = await getInstitutionLoginForm();
  });
</script>

{#if form}
  <AuthenticationView {form} />
{/if}
