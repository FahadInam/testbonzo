
<script>
    import { isSafaricomUser } from "$lib/constants/user.constants";
    import ShupavuPaymentCard from "../../components/Card/ShupavuPaymentCard.svelte";
    import Form from "../../components/Form/Form.svelte";
    import { filterBundlesByUserType, paymentDataFields, processDpoPayment, processSafaricomPayment } from "../../data-actions/payment/payment.da";
    import { paymentStore } from "../../stores/payment.store";
    import { userStore } from "../../stores/user.store";
   
    let selectedBundle = null;
        export let selectedOption = "";
        export let paymentInitiated = false
        const baseUrl = window.location.origin
 export let bundles = []
       function handleBundleSelect(bundle) {
        selectedBundle = bundle;
        selectedOption = bundle
    }   

    const initiatePayment = async (data) => {
        const dto = {
            amount: selectedBundle.amount,
            subscription_guid: selectedBundle.subscription_guid,
            vendor_uid: selectedBundle.payment_vendor_guid,
            phone_number: $userStore.phone_number,
            grade: $paymentStore.current_grade.toString(),
            currency: 'KES',
            duration_in_days: selectedBundle.duration_in_days,
            competition_id: $paymentStore?.competition_id,
            timezone: $userStore?.timezone,
              redirect_url: `${baseUrl}/payment/status`,
              back_url: `${baseUrl}/payment`,
              email: data.email,
            }
            if(isSafaricomUser){
                await processSafaricomPayment(dto)
            } else{
                await processDpoPayment(dto)
            }

          };
          $: filteredBundle = filterBundlesByUserType(bundles);
           $: formFields = isSafaricomUser
  ? paymentDataFields.fields.filter(field => field.name !== 'email')
  : paymentDataFields.fields;

        $: console.log(paymentDataFields, "isSafaricomUser")
</script>
<div class="flex justify-center">
    {#if !paymentInitiated && filteredBundle.length}
{#each filteredBundle as bundle (bundle.id)}
		<ShupavuPaymentCard 
       bundle = {bundle}
        isSelected={selectedBundle?.id === bundle.id}
        onClick={() => handleBundleSelect(bundle)}
             />
	{/each}
    {:else}
          <Form
          enableTurnstile={false}
          turnstileSiteKey=""
          handleSubmit={initiatePayment}
          fields={formFields}
          buttons={[{ type: "submit", label: "Continue", customClass: "w-[500px]", }]}
        />
    {/if}
</div>