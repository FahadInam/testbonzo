<script>
 import {t} from "../../stores/language.store"
</script>

<div class="flex flex-col items-center justify-center p-6 h-96">
  <!-- Circular spinner -->
  <div class="mb-6">
    <svg class="animate-spin h-16 w-16 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
  
  <p class="text-center text-gray-800 mb-2">
    {$t("payment_processing")}
  </p>
  
  <p class="text-center text-gray-500 text-sm">
    {$t("your_payment_is_being_processed_securely")}
  </p>
</div>