<script>
  import { PUBLIC_COMPETITION_URL } from '$env/static/public';
  import { showSuccess } from '../../stores/toast.store';
  import Button from '../Button/Button.svelte';
  
  export let paymentData;
  const competitionUrl =  window.location.origin;
  const formattedCompetitionUrl = competitionUrl?.startsWith('http')
    ? competitionUrl
    : `https://${competitionUrl}`;
  const displayCompetitionUrl = formattedCompetitionUrl.replace(/^https?:\/\//, '');
  
  function handleCopy() {
      navigator.clipboard.writeText(paymentData?.institution_voucher_code);
      showSuccess("Voucher copied successfully");
  }
  
  function handleLinkClick() {
    window.open(`https://${displayCompetitionUrl}`, '_blank');
  }
</script>
<div class="w-full mx-auto max-w-[400px] md:max-w-[2000px] md:w-[640px] lg:w-[912px] px-1 sm:px-0">
  <div class="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden card-button-shadow">
    <!-- CHANGED: Added max-width and width constraints to match the content below -->
    <div class="text-left p-4 text-[#313644] font-semibold text-xl sm:text-2xl w-full">
      <div class="max-w-full overflow-hidden">
        Welcome to Global Climate Literacy Competitions
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-0">
      <div class="px-4 pt-2 pb-4">
        <div class="text-sm font-semibold text-gray-600 mb-2">STEP 1</div>
        <div class="text-sm text-gray-500 mb-2 font-medium">Players go to:</div>
        <div
          class="border border-[#DCDCDC] rounded-[15px] px-3 py-2 h-[4.25rem] cursor-pointer hover:bg-gray-50 transition-colors flex items-center"
          on:click={handleLinkClick}
          on:keydown={(e) => (e.key === "Enter" || e.key === " ") && handleLinkClick()}
          role="button"
          tabindex="0"
        >
          <span class="text-sm sm:text-lg font-medium text-gray-800 truncate !font-poppins tracking-wider">
            {displayCompetitionUrl}/competitions
          </span>
        </div>
      </div>
      <div class="px-4 pt-2 pb-4">
        <div class="text-sm font-semibold text-gray-600 mb-2">STEP 2</div>
        <div class="text-sm font-medium text-gray-500 mb-2">Enter Voucher Code:</div>
        <div class="border border-[#DCDCDC] rounded-[15px] px-3 py-2 h-[4.25rem] flex items-center justify-between">
          <span class="font-semibold text-gray-800 truncate mr-2 text-lg sm:text-2xl font-poppins tracking-widest">
            {paymentData?.institution_voucher_code}
          </span>
          <Button
            label="Copy"
            size="small"
            type="primary"
            customClass="w-[80px] sm:w-[98px] bg-blue-500 text-white"
            onClick={handleCopy}
          />
        </div>
      </div>
    </div>
  </div>
</div>