<script>
    import { onMount } from "svelte";
    import SubscriptionCard from "../../../../components/Card/SubscriptionCard.svelte";
    import TransactionReceipt from "../../../../components/TransactionReceipt/TransactionReceipt.svelte";
    import { getSubscriptionDetails, subscriptionCancellation } from "../../../../data-actions/payment/payment.da";
    import Button from "../../../../components/Button/Button.svelte";
    import { t } from "../../../../stores/language.store"
    import { IMAGES } from "$lib/assets/images/images.constants";
    import { showSuccess } from "../../../../stores/toast.store";
    let data   
    onMount(async () => {
         data = await getSubscriptionDetails();
        console.log(data);
    });

    const cancelSubscription = async () => {
        const res = await subscriptionCancellation(data.transactionToken);
        if(res.error_code === 0){
           data = getSubscriptionDetails();
            showSuccess($t("subscription_cancelled"));
        }
    }
    $: console.log(data, "data")
</script>

<SubscriptionCard icon={IMAGES.SUBSCRIPTION_ICON} width="w-[80%]" >
    {#if data}
          <div class="flex flex-col items-center justify-center my-22">

    <TransactionReceipt paymentData={data} successful={true} />
        {#if data.payment_mode === 'card' && data?.isSubscriptionCancel == 0}
      <Button
        label={$t("cancel")}
        size="small"
        type="3d-secondary"
        customClass="w-[446px] mt-8"
        onClick={() => {
            cancelSubscription();
        }}  
      />
      {/if}
    </div>
    {/if}

</SubscriptionCard>
