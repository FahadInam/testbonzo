<script>
  import { t } from "../../../../stores/language.store";
  import PageHeading from "../../../../components/PageHeading/PageHeading.svelte";
  import { onMount } from "svelte";
  import {
    getCertificateData,
    getUserRewards,
    InstructionsData,
    RewardsType,
    updateCertificateUserName,
  } from "../../../../data-actions/rewards/rewards.da";
  import CustomModal from "../../../../components/CustomModals/CustomModal.svelte";
  import SelectBox from "../../../../components/SelectBox/SelectBox.svelte";
  import RewardSection from "../../../../components/RewardCard/RewardSection.svelte";
  import { goto } from "$app/navigation";
  import { showSuccess } from "../../../../stores/toast.store";
  import DownloadCertificateIframe from "../../../../components/CertificateDownload/DownloadCertificateIframe.svelte";
  import { userStore } from "../../../../stores/user.store";
  import { get } from "svelte/store";
  import { IMAGES } from "$lib/assets/images/images.constants";
  import RewardsSkeleton from "../../../../components/Skeleton/RewardsSkeleton.svelte";

  /**
   * @type { any[]}
   */
  let rewards = [],
    /**
     * @type { any[]}
     */
    time_rewards = [];

  let isLoading = true,
    showCertificateModal = false,
    certIframeOpened = false;
  let selectedRewardsType = 0,
    certificate_status = 0;
  let certificate_data = {
    title: "",
    image: "",
    primary_text: "",
    cost: 0,
    quantity: 0,
  };
  let PageSubTitleText = "";
  let certificate_path = "";
  let certificate_IframeSrc = "";
  let InstructionDetails = {
    title: "",
    instructionTitle: "",
    detailsText: "",
    type: 0,
  };
  let iframeData = {};

  const user_name = get(userStore).name;

  onMount(async () => {
    const data = await getUserRewards();
    if (data?.data) {
      ({ rewards = [], time_rewards = [], certificate_status } = data.data);
      const certificateDataResult = getCertificateData(
        data.data.certificate_json,
        certificate_status,
      );
      certificate_data =
        certificateDataResult && Object.keys(certificateDataResult).length > 0
          ? certificateDataResult
          : [];
      certificate_path = certificate_data?.file_name || "gclc";
    }
    isLoading = false;
  });

  /**
   * @param {string} username
   * @param {Boolean} showToast
   */
  async function CertificateData(username, showToast) {
    const update = await updateCertificateUserName(username);
    if (update.error_code === 0 && showToast) {
      showSuccess("Full name updated successfully");
    } else {
      if (update?.data) {
        iframeData = JSON.stringify({
          cData: JSON.stringify(certificate_data),
          data2: update?.data,
        });
        certificate_IframeSrc = `/certificate-generator/certificates/${certificate_path}.html`;
      }
    }
  }

  /**
   * @param {string} label
   * @param {any} data
   */
  function handleActionButton(label, data) {
    InstructionDetails = InstructionsData(label, data);
    showCertificateModal = true;
  }

  /**
   * @param {string} action
   */

  function ModalAction(action) {
    if (action === "play") {
      goto("/competitions");
    } else if (action === "download") {
      certIframeOpened = true;
      CertificateData(user_name, false);
    }
    showCertificateModal = false;
  }

  /**
   * @param {number} value
   */
  function handleRewardsTypeChange(value) {
    selectedRewardsType = value;
    PageSubTitleText = RewardsType[value]?.label || "";
  }

  /**
   * @param {string} UserName
   */
  function SaveUserName(UserName) {
    if (!UserName || UserName.trim().length < 3) {
      console.error("Invalid username. It must be at least 3 characters long.");
      return;
    }
    CertificateData(UserName, true);
  }

  let url = "";
  let showIframe = false;

  function closeIframe() {
    certificate_IframeSrc = "";
    certIframeOpened = false;
  }
</script>

<svelte:head>
  <title>{$t("rewards")}</title>
</svelte:head>

<!-- Responsive Container -->
<div class="flex justify-center w-full px-4 sm:px-6 md:px-8 lg:px-10">
  <div class="w-full max-w-screen-lg space-y-6">
    <!--heading section (with dropdown)-->
    <div class="w-full relative">
      <div
        class="flex flex-col sm:flex-row sm:justify-between items-center w-full gap-4"
      >
        <!-- Centered Title & Image Wrapper -->
        <div
          class="flex items-center gap-3 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2"
        >
          <PageHeading
            icon={IMAGES.REWARDS_ICON}
            title="rewards"
            imageClass="w-9 h-11 sm:w-10 sm:h-11"
          />
        </div>

        <!-- Dropdown Positioned Responsively -->
        <div class="w-full sm:w-auto flex justify-center sm:ml-auto">
          <SelectBox
            customClass="w-56"
            options={RewardsType.map((type) => ({
              ...type,
              value: type.value,
            }))}
            bind:value={selectedRewardsType}
            onSelect={(value) => handleRewardsTypeChange(Number(value))}
          />
        </div>
      </div>
    </div>
    {#if isLoading}
      <RewardsSkeleton />
    {:else}
      <!-- Reward Section -->
      <div class="w-full mb-20 md:mb-10">
        <RewardSection
          {selectedRewardsType}
          {rewards}
          {time_rewards}
          {certificate_data}
          {certificate_status}
          ActionButton={handleActionButton}
        />
      </div>

      <!-- Custom Modal -->
      <CustomModal
        showModal={showCertificateModal}
        {user_name}
        data={InstructionDetails}
        onButtonClick={ModalAction}
        {certificate_status}
        handleSave={SaveUserName}
      />

      <!-- Download Certificate Iframe -->
      {#if certIframeOpened}
        <DownloadCertificateIframe
          url={certificate_IframeSrc}
          showIframe={certIframeOpened}
          onClose={closeIframe}
          messageContent={iframeData}
        />
      {/if}
    {/if}
  </div>
</div>
