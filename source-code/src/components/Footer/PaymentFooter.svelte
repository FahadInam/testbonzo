<script>

    import { IMAGES } from "$lib/assets/images/images.constants";
    import { PAYMENT_SUPPORT_DETAILS } from "$lib/constants/payment.constants";
    import { t } from "../../stores/language.store";
</script>
<footer class="bg-white py-8 px-4 w-full">
  <div class="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-center">
    <div class="mb-6 md:mb-0">
      <h2 class="text-[#02BBFE] font-bold text-base mb-2">{$t("help_support")}</h2>
      <p class="text-gray-700 text-xs">
        Need our help? Our support team is available for<br />
        24/7 assistance for you.
      </p>
    </div>
    
    <div class="flex flex-col space-y-4">
      <div class="flex items-center gap-2">
          <img src={IMAGES.PHONE_ICON} alt="Phone" class="h-4 w-4" />
        <span class="text-gray-700 text-xs">{PAYMENT_SUPPORT_DETAILS.PHONE}</span>
      </div>
      
      <div class="flex items-center gap-2">
          <img src={IMAGES.MESSAGE_ICON} alt="Email" class="h-4 w-4" />
        <span class="text-gray-700 text-xs ">{PAYMENT_SUPPORT_DETAILS.EMAIL}</span>
      </div>
    </div>
  </div>
</footer>