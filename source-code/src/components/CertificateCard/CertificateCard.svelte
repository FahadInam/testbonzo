<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { getCertificateData } from "../../data-actions/rewards/rewards.da";
  import { appbarStore } from "../../stores/appbar.store";
  import { showSuccess } from "../../stores/toast.store";
  import { userStore } from "../../stores/user.store";
  import DownloadCertificateIframe from "../CertificateDownload/DownloadCertificateIframe.svelte";
  import Image from "../Image/Image.svelte";

  export let certificateTitle = "";
  export let organizationName = "";
  export let primaryColor = "#4CAF50"; // Green by default
  // export let downloadLabel = "Download Certificate";
  // export let downloadLabelMobile = "Download";
  // export let downloadUrl = "#";
  export let certificate_json = "";
  export let isDisabled = false;
  export let disableClick = () => {};
  export let downloadClick = () => {};
  export let downloadFunction = () => {};
  export let grade = "";
  let certIframeOpened = false;
  let certificate_data = {
    title: "",
    image: "",
    primary_text: "",
    cost: 0,
    quantity: 0,
  };
  let certificate_path = "";
  let certificate_IframeSrc = "";
  let iframeData = {};

  // $: console.log(certificate_json, "organizationName");
  async function CertificateData(username, showToast) {
    iframeData = JSON.stringify({
      cData: JSON.stringify(certificate_data),
      data2: {
        full_name: $userStore.name,
        competition_title: certificateTitle,
        awarded_on: new Date().toISOString(),
      },
    });
    console.log(iframeData, "iframeData");
    certificate_IframeSrc = `/certificate-generator/certificates/${certificate_path}.html`;
    certIframeOpened = true;
  }

  function handleDownload() {
    const certificateDataResult = getCertificateData(certificate_json, 1);
    certificate_data =
      certificateDataResult && Object.keys(certificateDataResult).length > 0 ? certificateDataResult : [];
    certificate_path = certificate_data?.file_name || "gclc";
    CertificateData();
  }
  function closeIframe() {
    certificate_IframeSrc = "";
    certIframeOpened = false;
    appbarStore.set({
      visible: true,
      isLogoVisible: true,
      isProfileVisible: true,
      isCoinVisible: true,
    });
  }
  function handleClick() {
    if (isDisabled) {
      disableClick();
    } else {
      downloadClick();
      // handleDownload();
    }
  }
  downloadFunction = handleDownload;
</script>

<div
  role="button"
  tabindex="0"
  on:click={handleClick}
  on:keydown={(event) => (event.key === "Enter" || event.key === " ") && handleDownload()}
  class={`w-full ${isDisabled ? "opacity-60" : "hover:bg-gray-100"} cursor-pointer rounded-[20px] border border-gray-200 bg-white overflow-hidden px-4 pt-4 pb-6 relative mb-6`}
>
  <div class="flex flex-col sm:flex-row gap-4">
    <!-- Badge section -->
    <div class="shrink-0 absolute left-0 -top-0.5 rotate-[343deg]" style="--badge-color: {primaryColor}">
      <div
        class="w-9 h-15 md:w-12 md:h-18 relative"
        style="background-color: var(--badge-color); clip-path: polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%);"
      >
        <div class="absolute inset-0 flex items-center justify-center">
          <Image
            src={IMAGES.WHITE_BADGE_ICON}
            className="w-7 h-7 min-w-7 md:w-9 md:h-13 md:min-w-9 pt-3 pl-1 rotate-[12deg]"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row w-full justify-between gap-2">
      <!-- Text content -->
      <div class="pl-9 sm:pl-12 pr-0 md:pr-2">
        <h2 class="text-base md:text-lg font-semibold text-gray-800 mb-1 truncate">
          {certificateTitle}
        </h2>
        <div class="borde flex items-center gap-x-4 gap-y-2 flex-wrap">
          <p class="text-xs text-gray-600">{organizationName}</p>
          <p class="text-xs text-gray-600">
            <span class="w-1.5 h-1.5 mr-1 -translate-y-[.5px] bg-gray-500 rounded-full inline-block"></span>
            Grade {grade}
          </p>
        </div>
      </div>

      <!-- Download link - on next line for mobile, same line for tablets and up -->
      <!-- <div class="sm:self-center pl-9 sm:pl-12 md:pl-0 min-w-auto sm:min-w-40">
        <a
          href={downloadUrl}
          on:click={handleDownload}
          class="text-[var(--primary-color)] hover:opacity-70 text-sm md:text-base font-medium transition-colors duration-200 underline sm:text-end"
        >
          <span class="block sm:hidden">{downloadLabelMobile}</span>
          <span class="hidden sm:block">{downloadLabel}</span>
        </a>
      </div> -->
      {#if isDisabled}
        <div class="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 md:relative">
          <Image src={IMAGES.CERT_LOCK_ICON} className="w-9 h-9 md:w-11 md:h-11 lg:w-12 lg:h-12" />
        </div>
      {/if}
    </div>
  </div>
</div>
{#if certIframeOpened}
  <DownloadCertificateIframe
    url={certificate_IframeSrc}
    showIframe={certIframeOpened}
    onClose={closeIframe}
    messageContent={iframeData}
  />
{/if}
