<script>
    import { onMount } from 'svelte';
    import Stepper from '../../../components/Stepper/Stepper.svelte';
    import { BANK_DETAILS } from '$lib/constants/payment.constants';
    import { getBankOrderId, GetSubscriptionDetails, getUserData } from '../../../data-actions/payment/payment.da';
    import { t } from '../../../stores/language.store';
    import { setBackUrl } from '../../../stores/navigation.store';
    
    const steps = [{ title: "Choose Payment" },{ title: "Pending" }];

    const activeStep = 1;
    let openSnackbar = false;
    let subscriptionData = {};
    let processingData;
    let data
    onMount(async() => {
     subscriptionData = await GetSubscriptionDetails();
      processingData =  getUserData(subscriptionData)
       data  =  await getBankOrderId(processingData)
    });
    
    function handleCopy(text) {
      navigator.clipboard.writeText(text);
      openSnackbar = true;
      setTimeout(() => {
        openSnackbar = false;
      }, 3000);
    }
    
  setBackUrl("/payment");
  
  </script>
  
  <div class="bg-white ">
    <div class="flex flex-col items-center py-6">
      <div class="bg-white rounded-3xl  overflow-y-auto z-10 mb-8 lg:mb-0 w-full">
        
        <div class="bg-white  ">
          <!-- Stepper Component -->
          <div class="flex flex-col sm:flex-row items-baseline pt-0.5 lg:pt-0">
            <div class="w-full mb-4 ">
            <Stepper {steps} {activeStep} />

                        
            </div>
          </div>
          
          <h1 class="text-2xl font-bold text-[#1D2433] mb-2">
            {$t("confirm_payment")}
          </h1>
          <p class="text-[#1D2433] font-medium mb-8">
            {$t("transaction_id_no")} {data}. {$t("bank_instruction")}
          </p>
          
          <div class="flex flex-col lg:flex-row justify-between mb-4 mt-8 gap-8 items-center">
            <!-- Bank Instructions Card -->
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-[#1D2433]">
                {$t("bank_instructions")}
              </h2>
              
              <div>
                <p class="text-gray-500 my-3">
                  {$t("step_1")}
                </p>
                <p class="text-[#1D2433] font-medium my-3">
                  {$t("screenshot_detail")}
                </p>
                <p class="text-gray-500 my-3">
                  {$t("step_2")}
                </p>
                <p class="text-[#1D2433] font-medium my-3">
                  Initiate a bank transfer of PKR {subscriptionData[0]?.amount}/= to the details mentioned.
                </p>
                <p class="text-gray-500 my-3">
                  {$t("step_3")}
                </p>
                <p class="text-[#1D2433] font-medium my-3">
                  {$t("whatsapp_detail")}
                </p>
              </div>
            </div>
            
            <!-- Bank Details Card -->
            <div class="flex-1 w-full md:w-auto">
              <h3 class="text-2xl font-bold text-[#1D2433]">
                {$t("bank_details")}
              </h3>
              
              <div class="bg-white shadow-md rounded-lg  mt-4 p-4">
                <div class="block md:flex justify-between mb-1 gap-8 text-center md:text-left">
                  <p class="text-gray-500 my-3">
                    {$t("bank_account_title")}
                  </p>
                  <p class="text-[#1D2433] font-medium my-3">
                    {BANK_DETAILS.ACCOUNT_TITLE}
                  </p>
                </div>
                
                <div class="block md:flex justify-between mb-1 text-center md:text-left">
                  <p class="text-gray-500 my-3">
                    {$t("bank_iban")}
                  </p>
                  <p class="text-[#1D2433] font-medium my-3">
                    {BANK_DETAILS.IBAN}
                  </p>
                </div>
                
                <div class="block md:flex justify-between mb-1 text-center md:text-left">
                  <p class="text-gray-500 my-3">
                    {$t("bank_account_number")}
                  </p>
                  <div class="flex items-center justify-center md:justify-start">
                    <p class="text-[#1D2433] font-medium my-3">
                      {BANK_DETAILS.ACCOUNT_NUMBER}
                    </p>
                    <button 
                      class="ml-2 text-[#02BBFE]" 
                      on:click={() => handleCopy(BANK_DETAILS.ACCOUNT_NUMBER)}
                      aria-label="Copy to clipboard"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div class="block md:flex justify-between mb-1 text-center md:text-left">
                  <p class="text-gray-500 my-3">
                    {$t("bank_name")}
                  </p>
                  <p class="text-[#1D2433] font-medium my-3">
                    {BANK_DETAILS.BANK_NAME}
                  </p>
                </div>
                
                <div class="border-t border-gray-300 my-4"></div>
                
                <div class="block md:flex text-center md:text-left justify-between">
                  <p class="text-gray-500 my-3">
                    {$t("pending_amount")}
                  </p>
                  <p class="text-[#1D2433] font-medium my-3">
                    PKR {subscriptionData[0]?.amount}
                  </p>
                </div>
              </div>
              
              <!-- <div class="bg-white  rounded-lg shadow-md mt-4 p-4">
                <div class="block md:flex text-center md:text-left justify-between">
                  <p class="text-gray-500 my-3">
                    Subscription Expiry
                  </p>
                  <p class="text-[#1D2433] font-medium my-3">
                    {dates.futureDate}
                  </p>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Snackbar for copy notification -->
  {#if openSnackbar}
    <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white py-2 px-4 rounded">
      Copied!
    </div>
  {/if}
  
  <style>
    /* Additional styles if needed */
  </style>