<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { onMount } from "svelte";
  import PaymentCard from "../../components/Card/PaymentCard.svelte";
  import Stepper from "../../components/Stepper/Stepper.svelte";
  import {
    GetSubscriptionDetails,
    getUserData,
  } from "../../data-actions/payment/payment.da";
  import { userStore } from "../../stores/user.store";
  import { PUBLIC_PAYMENT_URL } from "$env/static/public";
  import { t } from "../../stores/language.store";
  import { paymentStore } from "../../stores/payment.store";
  import { paymentOptions } from "$lib/constants/payment.constants";
  import { goto } from "$app/navigation";
    import { isShupavu } from "../../data-actions/system/system..da";
    import ShupavuPaymentCard from "../../components/Card/ShupavuPaymentCard.svelte";
    import ShupavuPayment from "../../views/ShupavuPayment/ShupavuPayment.svelte";
    import { isSafaricomUser } from "$lib/constants/user.constants";

  let selectedCard = "";
  let paymentMode = "";
  let activeStep = 1;
  let subscriptionData = [];
  let paymentInitiated = false
  const steps = [{ title: "Choose Payment" }, { title: "Confirm" }];

  let selectedOption = "";

  onMount(async () => {
    subscriptionData = await GetSubscriptionDetails();
    console.log("Subscription Details:", subscriptionData);
  });

  function handlePaymentSelect(event) {
    selectedOption = event.detail.selected;
    paymentMode = selectedOption;
  }

  function handleContinueClick() {
    if(isShupavu) {
      paymentInitiated = true
    } 
    else {
  if (selectedOption === "Bank") {
      goto("/payment/bank");
    } else {
      const userData = getUserData(subscriptionData);
      const currentUrl = window.location.href;
      let jsonData = JSON.stringify(userData);
      const PaymentUrl = `${PUBLIC_PAYMENT_URL}pay?type=${encodeURIComponent(paymentMode)}&redirectUrl=${encodeURIComponent(
        currentUrl
      )}&userDetails=${encodeURIComponent(jsonData)}`;
      window.location.href = PaymentUrl;
    }
    }
  
  }
</script>

<Stepper {steps} {activeStep} />
<div class="text-left">
  {#if !isShupavu}
  <h1 class="text-3xl font-bold mb-6 mt-12">{$t("payment")}</h1>
  {/if}
  {#if !paymentInitiated}
 <p class={`text-lg text-gray-600  ${isShupavu ? 'text-center mt-3 mb-3' : 'mb-8'}`}>
  {#if isShupavu}
    {$t("shupavu_payment_method")}
  {:else}
    {$t("preferred_payment_method")}
  {/if}
  
</p>
{:else} 
  {#if isSafaricomUser}
  <p class="text-lg text-center mt-4 mb-8">{$t("confirm_timezone")}</p>
  {:else}
  <p class="text-lg text-center mt-4 mb-8">{$t("enter_email")}</p>
  {/if}
  {/if}
{#if isShupavu && !paymentInitiated}
<p class="text-center text-sm text-gray-600 mb-6">{$t("total_games")}</p>
{/if}

 {#if isShupavu && subscriptionData.length}
    <ShupavuPayment bundles={subscriptionData} bind:selectedOption bind:paymentInitiated />
  {:else }

  <PaymentCard
    {paymentOptions}
    bind:selectedOption
    on:select={handlePaymentSelect}
  />
  {/if}

  {#if selectedOption && !paymentInitiated && !isShupavu}
    <p class="text-gray-600 text-sm mt-4">
      You selected {selectedOption} as your payment method.
    </p>
  {/if}
</div>
{#if !paymentInitiated}
<div class="flex justify-center items-center min-h-18 sm:mt-18 lg:mt-8">
  <button
    class="bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold text-lg disabled:bg-gray-600/25 w-[32rem]"
    on:click={handleContinueClick}
    disabled={!selectedOption}
  >
    {$t("continue")}
  </button>
</div>
{/if}
