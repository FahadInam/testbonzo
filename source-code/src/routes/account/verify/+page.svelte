<script>
    import Button from "../../../components/Button/Button.svelte";
import Modal from "../../../components/Modal/Modal.svelte";
    import PopupScreen from "../../../components/PopupScreen/PopupScreen.svelte";
    import { page } from '$app/stores';
    import Form from "../../../components/Form/Form.svelte";
    import { PUBLIC_TURNSTILE_KEY } from "$env/static/public";
    import { resendEmail, signUpUserUsingFormData } from "../../../data-actions/authentication/user.auth.da";
    import {t} from "../../../stores/language.store"
    import { afterNavigate } from "$app/navigation";
    import { navigationStore, setBackUrl } from "../../../stores/navigation.store";
  
    let email = $page.state?.data?.email; // This would typically come from your data store
  let logo = "/images/bonzo-logo.png";
  


        $: {
        if ($page.state && Object.keys($page.state).length === 0) {
            window.history.go(-1);
        }
    }

const handleSubmit = (data) => {
    const dto = {
      email: $page.state?.data?.email,
      t_token: data.turnstileToken,
      role : $page.state?.data?.role
    }
    resendEmail(dto)
  };
  afterNavigate(({ from }) => {
    const previousURL = from?.url?.pathname ?? "/";
    setBackUrl(previousURL)
});
  

</script>

<svelte:component
  this={PopupScreen}
  backButtonLabel="Back"
  backButtonLink={$navigationStore.back_url}
>
  <div slot="body">

<div class="w-full px-2">
      <img src={logo} alt="Bonzo Logo" class="mx-auto mb-4 w-32" />

  <h2 class="text-2xl font-medium text-gray-800">{$t("account_verification")}</h2>
  
  <div class="pt-5">
    <p class="text-md font-normal font-['Poppins']">
      {$t("email_verification")} <br />
      <span class="font-semibold">{email}</span>. <br />
      {$t("check_inbox")}
    </p>
  </div>
  
  <div class="pt-5">
    <p class="text-md font-normal font-['Poppins']">
      {$t("email_not_received")}
      <!-- <span 
        on:click={resendEmail} 
        class="font-semibold underline cursor-pointer">
        Resend Email
      </span> -->
      <br />
    </p>
  </div>
 <Form
          enableTurnstile={true}
          turnstileSiteKey={PUBLIC_TURNSTILE_KEY}
          handleSubmit={handleSubmit}
          fields={[]}
          buttons={[{ type: "submit", label: "Resend Email", customClass: "w-full", }]}
        />
    <!-- <div class="flex justify-center mt-6 mb-14">
  <Button
    onClick={closeWindow}
        type="primary"
        label={"Close This Window"}
        width="w-full"
    />
    </div> -->
</div>
  </div>
  <div slot="footer">
<div class="text-center mt-0 text-gray-600 bg-gray-100 p-2">
       {$t("already_account")}
        <span class="ms-3"></span>
        <Button width="w-[120px]" type="secondary-outlined-inverted"
         label="Login" />
      </div>
    </div>
</svelte:component>
