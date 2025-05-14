<script>
    import { formatDate } from "../../data-actions/notifications/notifications.da";
    import { calculateExpiryDate, formatPaymentMethod } from "../../data-actions/payment/payment.da";
    import { t } from "../../stores/language.store"

    import { isShupavu } from "../../data-actions/system/system..da";

    export let successful = false;
    export let paymentData = {};
  const transactionDate = formatDate(new Date());

    $: console.log(paymentData, "paymentData");
</script>
 {#if (isShupavu && successful) || !isShupavu}

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
    {/if}