<script>
  import AuthenticationView from "../../../../views/AuthenticationView/AuthenticationView.svelte";
  import { getUserLoginForm } from "../../../../data-actions/authentication/user.auth.da";
  import { onMount } from "svelte";

  /** @type {{
    title: string;
    fields: { name: string; type: string; label: string; placeholder: string; required: boolean; }[];
    buttons: { label: string; type: string; customClass: string; }[];
    turnstileSiteKey: string;
    enableTurnstile: boolean;
    handleSubmit: (formData: any) => Promise<void>;
    forgotPassword: { label: string; link: string; };
    alternativeButtons: { label: string; type: string; image: string; onClick: () => void; }[];
    footer: { text: string; button: { label: string; type: string; link: string; }; };
    role: string;
  } | null} */
  let form = null;

  onMount(async () => {
    form = await getUserLoginForm();
  });
</script>

{#if form}
  <AuthenticationView {form} />
{/if}
