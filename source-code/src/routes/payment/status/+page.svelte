<script>
  import { onMount } from "svelte";
  import { appbarStore } from "../../../stores/appbar.store";
  import { getText } from "../../../stores/language.store";
  import {
    calculateExpiryDate,
    formatDate,
    formatPaymentMethod,
    getPaymentDescription,
    getPaymentTitle,
    isPaymentSuccessful,
    processPaymentData,
    verifyDpoPayment,
    verifySafaricomPayment,
  } from "../../../data-actions/payment/payment.da";
  import { IMAGES } from "../../../lib/assets/images/images.constants";
  import { goto } from "$app/navigation";
  import { competitionStore } from "../../../stores/competition.store";
  import { paymentStore } from "../../../stores/payment.store";
  import { getCompetitions } from "../../../data-actions/competitions/competitions.da";
  import { getItemByProperty } from "$lib/utils";
  import { t } from "../../../stores/language.store";
  import { isShupavu } from "../../../data-actions/system/system..da";
  import Stepper from "../../../components/Stepper/Stepper.svelte";
  import PaymentFooter from "../../../components/Footer/PaymentFooter.svelte";
  import TransactionReceipt from "../../../components/TransactionReceipt/TransactionReceipt.svelte";
  import PaymentLoader from "../../../components/Loader/PaymentLoader.svelte";
  // Initialize state
  let paymentData = {
    transactionStatus: null,
    transactionRef: "",
    amount: "",
    durationMonths: 0,
    payment_mode: "",
    subscription_end_date: "",
  };
  // Current datforme atted for display
  const transactionDate = formatDate(new Date());
  let activeStep = 3;
  let isPending = false;
  const steps = [
    { title: "Choose Payment" },
    { title: "Confirm" },
    { title: "Payment Status" },
  ];

  const pollSafaricomPayment = async (
    token,
    maxAttempts = 10,
    interval = 5000,
  ) => {
    let attempts = 0;

    const poll = async () => {
      if (attempts >= maxAttempts) {
        isPending = true;
        return;
      }

      attempts++;
      const result = await verifySafaricomPayment(token);

      if (result.response_status === "111") {
        // Payment successful
        paymentData = result.data;
        isPending = false;
        return;
      } else if (result.response_status === "222") {
        // Payment failed
        paymentData = result.data;
        isPending = false;
        return;
      } else if (result.response_status === "333") {
        // Still pending, continue polling
        isPending = true;
        setTimeout(poll, interval);
      }
    };

    await poll();
  };

  onMount(async () => {
    setTimeout(async () => {
      appbarStore.set({
        isProfileVisible: true,
        visible: true,
        backLabel: "",
        isLogoVisible: true,
        isCoinVisible: true,
        isBackButtonVisible: false,
        isVoucherButtonVisible: false,
        isVoucherModalVisible: false,
        isNotificationVisible: false,
        isShowPaymentBanner: false,
        isShowRules: false,
      });
    }, 50);
    // Process URL parameters
    const params = new URLSearchParams(window.location.search);
    const TransactionToken = params.get("TransactionToken");
    const SafaricomToken = params.get("epgw_payment_payload");

    if (isShupavu) {
      if (TransactionToken) {
        const result = await verifyDpoPayment(TransactionToken);
        paymentData = result.data;
      } else if (SafaricomToken) {
        const initialResult = await verifySafaricomPayment(SafaricomToken);
        if (initialResult.response_status === "333") {
          isPending = true;
          await pollSafaricomPayment(SafaricomToken);
        } else {
          paymentData = initialResult.data;
          isPending = false;
        }
      }
    } else {
      const result = processPaymentData(params);
      if (result?.data) {
        paymentData = result.data;
      }
    }
  });

  // Navigate to competitions page
  const goToCompetitions = async () => {
    const competitions = await getCompetitions();
    if (successful) {
      const compItem = getItemByProperty(
        $paymentStore.competition_id,
        competitions.data.competitions,
        "competition_id",
      );
      competitionStore.set(compItem);
      goto("/competitions/" + compItem.url + "/home");
    } else {
      goto("/payment");
    }
  };

  // Navigate back to payment page on error
  function retryPayment() {
    window.location.href = "/payment";
  }
  $: successful = isPaymentSuccessful(paymentData);
</script>

<div class="flex items-center justify-center">
  <div class="w-full mx-auto flex flex-col items-center">
    <Stepper {steps} {activeStep} />
    {#if isPending}
      <PaymentLoader />
    {:else}
      <div
        class="w-8 h-8 rounded-full flex items-center justify-center mb-4 mt-6"
      >
        <img
          src={successful
            ? IMAGES.PAYMENT_SUCCESS_ICON
            : IMAGES.PAYMENT_FAILED_ICON}
          alt="Success Icon"
          class="w-8 h-8"
        />
      </div>

      <h1 class="text-2xl font-bold text-center mb-2">
        {getPaymentTitle(successful, $t)}
      </h1>

      <p class="text-gray-600 text-center mb-6">
        {getPaymentDescription(successful, $t)}
      </p>
      {#if !isShupavu}
        <div class="w-full text-center mb-6">
          <p class="text-gray-800 font-semibold">
            Order ID: {paymentData.transactionRef || "Processing..."}
          </p>
        </div>
      {/if}
      <!-- {#if (isShupavu && successful) || !isShupavu}

    <div
      class="w-full max-w-md border border-gray-200 rounded-lg overflow-hidden mb-4"
    >
      <div class="flex justify-between py-3 px-4 border-gray-200">
        <span class="text-gray-600">{$t("transaction_date")}</span>
        <span class="font-medium">{transactionDate}</span>
      </div>
      <div class="flex justify-between py-3 px-4 border-gray-200">
        <span class="text-gray-600">{$t("payment_method")}</span>
        <span class="font-medium"
          >{formatPaymentMethod(paymentData.payment_mode)}</span
        >
      </div>
      <div class="flex justify-between py-3 px-4">
        <span class="text-gray-600">{$t("amount_paid")}</span>
        <span class="font-medium">{paymentData.amount || "0"}</span>
      </div>
    </div>
     {#if successful}
    <div
      class="w-full max-w-md border border-gray-200 rounded-lg overflow-hidden"
    >
      <div class="flex justify-between py-3 px-4">
        <span class="text-gray-600">{$t("subscription_expiry")}</span>
        <span class="font-medium">{calculateExpiryDate(paymentData?.subscription_end_date)}</span>
      </div>
    </div>
      {/if}
    {/if} -->
      <TransactionReceipt {successful} {paymentData} />
      <button
        class="mt-8 bg-[#02BBFE] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 w-full max-w-sm"
        on:click={goToCompetitions}
      >
        {#if successful}
          {$t("go_to_my_competitions")}
        {:else}
          {$t("try_again")}
        {/if}
      </button>
    {/if}

    <PaymentFooter />
  </div>
</div>
