<script>
  import { onMount } from "svelte";
  import { getText, t } from "../../stores/language.store";
  import { IMAGES } from "$lib/assets/images/images.constants";
  import PageHeading from "../../components/PageHeading/PageHeading.svelte";
  import { get, writable } from "svelte/store";
  import DataCard from "../../components/DataCard/DataCard.svelte";
  import Avatar from "../../components/Avatar/Avatar.svelte";
  import CertificateCard from "../../components/CertificateCard/CertificateCard.svelte";
  import Button from "../../components/Button/Button.svelte";
  import { goto } from "$app/navigation";
  import { sideBarAndAppBarSettings } from "$lib/utils";
  import NoDataFound from "../../components/NoDataFound/NoDataFound.svelte";
  import { getProfileData } from "../../data-actions/profile/profile.da";
  import ProfileSkeleton from "../../components/Skeleton/ProfileSkeleton.svelte";
  import ProfileStatsCard from "../../components/Card/ProfileStatsCard.svelte";
  import {
    filterCertificates,
    getCertificates,
    getProfileStats,
  } from "../../data-actions/certificates/certifiicates.da";
  import { tabs } from "$lib/constants/profile.constants";
  import { competitionStore } from "../../stores/competition.store";
  import CertificateModal from "../../components/CustomModals/CertificateModal.svelte";
  import CertificateDownloadModal from "../../components/CustomModals/CertificateDownloadModal.svelte";

  const activeTab = writable("certificates");

  // State
  let name = "";
  let profile_picture = "";
  let isLoading = true;
  let completions = [];
  let achievements = [];
  let stats = [];
  let profileStats = [];
  let showConfirm = false;
  let showDownload = false;
  let downloadFunction = () => {};
  let currentCertificate = {};
  let result = {};

  function onConfirmChange() {
    showConfirm = false;
    goto("/competitions/" + currentCertificate?.url + "/home");
  }

  function confirmDownload() {
    downloadFunction();
  }

  /**
   * @param {any} certificate
   */
  function openPopup(certificate) {
    currentCertificate = {
      ...certificate,
    };
    showConfirm = true;
  }

  /**
   * @param {any} certificate
   * @param {string} type
   */
  function openDownloadPopup(certificate, type) {
    currentCertificate = {
      ...certificate,
      type: type,
    };

    showDownload = true;
  }

  // Fetch user data from the API
  async function fetchUserProfile() {
    const userData = await getProfileData();

    // Safely extract the first user from the response (if available)
    const user = userData?.data?.users?.[0];

    // If a user exists, update the global variables
    if (user) {
      ({ name, profile_picture } = user);
    }
  }

  /**
   * @param {string} tabId - The identifier of the tab to be set as active.
   */
  function setActiveTab(tabId) {
    activeTab.set(tabId);
  }

  // Profile stats data
  $: if (stats && Object.keys(stats).length) {
    profileStats = [
      {
        icon: IMAGES.TOTAL_COINS_ICON,
        value: stats.total_coins,
        label: "total_coins",
        alt: "Coins",
      },
      {
        icon: IMAGES.MEDAL_ICON,
        value: stats.total_competitions,
        label: "total_competitions",
        alt: "Medal",
      },
      {
        icon: IMAGES.ONGOING_ICON,
        value: stats.ongoing_competitions,
        label: "ongoing",
        alt: "Ongoing",
      },
      {
        icon: IMAGES.FLAG_ICON,
        value: stats.competitions_completed,
        label: "completed",
        alt: "Completed",
      },
    ];
  }

  onMount(async () => {
    sideBarAndAppBarSettings(false, "competitions", "/competitions");
    const [certificates, profileStats] = await Promise.all([
      getCertificates(),
      getProfileStats(),
    ]);
    stats = profileStats;
    result = filterCertificates(certificates);
    completions = result.completions;
    achievements = result.achievements;
    // console.log(completions, achievements, "certificates");
    // fetch user profile data on component mount
    await fetchUserProfile();
    isLoading = false;
  });

  // States for toggling views
  let showAllAchievements = false;
  let showAllCompletions = false;

  // Computed properties
  $: displayedAchievements = showAllAchievements
    ? achievements
    : achievements.slice(0, 3);

  $: displayedCompletions = showAllCompletions
    ? completions
    : completions.slice(0, 3);

  // $: console.log(displayedAchievements, "displayedAchievements");
  // Toggle functions
  function toggleAchievements() {
    showAllAchievements = !showAllAchievements;
  }

  function toggleCompletions() {
    showAllCompletions = !showAllCompletions;
  }
</script>

<svelte:head>
  <title>{$t("profile")}</title>
</svelte:head>

<div class="flex justify-center w-full">
  <div class="w-full max-w-screen-xl space-y-6">
    <!--heading section-->
    <div class="w-full mb-8">
      <PageHeading
        icon={IMAGES.REWARDS_ICON}
        title={"profile"}
        imageClass="w-9 h-11 sm:w-10 sm:h-11"
      />
    </div>
  </div>
</div>

{#if isLoading}
  <ProfileSkeleton />
{:else}
  <div class="flex justify-center w-full">
    <div class="w-full max-w-screen-xl space-y-6">
      <!-- profile card -->
      <div class="bg-white rounded-[20px] px-0 md:px-4 lg:px-15 py-15 mb-10">
        <!-- Two column layout for desktop, stacked for mobile -->
        <div class="flex flex-col md:flex-row md:gap-8">
          <!-- Left column: Profile information -->
          <div
            class="mb-6 md:mb-0 flex justify-center flex-col items-center md:items-center md:w-1/4"
          >
            <div class="relative mb-4">
              <Avatar t={profile_picture} s={110} u={110} ml="auto" mr="auto" />
              <!-- <Avatar t={42} s={110} u={110} ml="auto" mr="auto" /> -->
            </div>
            <h2
              class="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 truncate w-full text-center"
            >
              {name}
            </h2>
            <Button
              label={$t("edit_profile")}
              type="secondary-outlined-inverted"
              customClass="border-none text-blue-400 text-sm md:text-base font-normal hover:bg-transparent p-0"
              onClick={() => goto("/profile/edit")}
            />
          </div>

          <!-- Right column: Stats cards using #each loop -->
          <div class="md:w-3/4">
            <div class="grid grid-cols-2 gap-2 md:gap-6 px-4 md:px-0">
              {#each profileStats as stat}
                <ProfileStatsCard
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  alt={stat.alt}
                />
              {/each}
            </div>
          </div>
        </div>

        <!--Tabs nav and content-->
        <div class="w-full">
          <!-- Tabs navigation -->
          <div class="mt-12 mx-0 sm:mx-5 md:mx-0">
            <div
              class="flex justify-around sm:justify-start space-x-4 overflow-x-auto bg-gray-100 rounded-none sm:rounded-[20px] py-3"
            >
              {#each tabs as tab}
                <button
                  class="flex items-center md:flex-row flex-col rounded-[12px] w-28 md:w-auto mx-0 sm:mx-3 px-3 py-2 transition-colors duration-200 whitespace-nowrap
      {$activeTab === tab.id
                    ? ' bg-blue-900 text-white'
                    : 'border-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-700 hover:border-gray-300'}"
                  on:click={() => setActiveTab(tab.id)}
                >
                  <!-- Icon should be centered on mobile (column layout) -->
                  <i
                    class="i {tab.icon} {tab.iconClass} md:mr-2 pt-0.5 mb-1 md:mb-0"
                  ></i>

                  <!-- Label text centered below icon on mobile -->
                  <span
                    class="font-medium text-sm md:text-base text-center md:text-left"
                  >
                    {$t(tab.label)}
                  </span>
                </button>
              {/each}
            </div>
          </div>

          <!-- Tabs content -->
          <div class="mt-8 mx-0 sm:mx-5 md:mx-0">
            {#if $activeTab === "certificates"}
              <!-- Certificates of achievement card -->
              <div class="w-full mt-10 px-4 md:px-0">
                <DataCard
                  title={$t("certificates_of_achievement")}
                  imageSrc={IMAGES.CERTIFICATE_ICON}
                  imageClass="w-13 h-13"
                  maxHeight="500px"
                >
                  {#if showAllAchievements}
                    <div class="go-back-container sm:px-4">
                      <Button
                        label="Go Back"
                        image="i-left"
                        imageClass="text-sm"
                        imagePosition="before"
                        customClass="text-blue-500"
                        onClick={toggleAchievements}
                      />
                    </div>
                  {/if}
                  <div class="sm:px-4 pt-3">
                    {#each displayedAchievements as certificate}
                      <CertificateCard
                        bind:downloadFunction
                        certificateTitle={"Certificate of Achievement"}
                        organizationName={certificate.competition_name}
                        primaryColor={"#FCB401"}
                        certificate_json={certificate.achievement_json}
                        disableClick={() => openPopup(certificate)}
                        downloadClick={() =>
                          openDownloadPopup(certificate, "achievement")}
                        isDisabled={certificate.achievement_json &&
                          !certificate.is_achieved}
                        grade={certificate.grade}
                      />
                    {/each}
                    {#if displayedAchievements.length === 0}
                      <div class="pb-3">
                        <NoDataFound
                          backgroundColor="bg-white"
                          customClass="shadow-none"
                          textColor="text-black"
                          noDataMsg="At present, no certificates of achievement are available."
                        />
                      </div>
                    {/if}
                  </div>
                  <!-- View All Button -->
                  {#if !showAllAchievements && result.achievements.length > 3}
                    <div class="flex justify-center mb-3">
                      <Button
                        label="View all"
                        image="i-right"
                        imageClass="text-sm"
                        imagePosition="after"
                        customClass="w-[130px]"
                        onClick={toggleAchievements}
                      />
                    </div>
                  {/if}
                </DataCard>
              </div>

              <!-- Certificates of completion card -->
              <div class="w-full mt-10 px-4 md:px-0">
                <DataCard
                  title={$t("certificates_of_completion")}
                  imageSrc={IMAGES.CERTIFICATE_ICON}
                  imageClass="w-13 h-13"
                  maxHeight="500px"
                >
                  {#if showAllCompletions}
                    <div class="go-back-container sm:px-4">
                      <Button
                        label="Go Back"
                        image="i-left"
                        imageClass="text-sm"
                        imagePosition="before"
                        customClass="text-blue-500"
                        onClick={toggleCompletions}
                      />
                    </div>
                  {/if}
                  <div class="sm:px-4 pt-3">
                    {#each displayedCompletions as certificate}
                      <CertificateCard
                        bind:downloadFunction
                        certificateTitle={"Certificate of Completion"}
                        organizationName={certificate.competition_name}
                        primaryColor={"#3BB44D"}
                        certificate_json={certificate.participation_json}
                        disableClick={() => openPopup(certificate)}
                        downloadClick={() =>
                          openDownloadPopup(certificate, "completion")}
                        isDisabled={certificate.participation_json &&
                          !certificate.is_participated}
                        grade={certificate.grade}
                      />
                    {/each}
                    {#if displayedCompletions.length === 0}
                      <div class="pb-3">
                        <NoDataFound
                          backgroundColor="bg-white"
                          customClass="shadow-none"
                          textColor="text-black"
                          noDataMsg="At present, no certificates of completion are available."
                        />
                      </div>
                    {/if}
                  </div>
                  <!-- View All Button-->
                  {#if !showAllCompletions && result.completions.length > 3}
                    <div class="flex justify-center mb-3">
                      <Button
                        label="View all"
                        image="i-right"
                        imageClass="text-sm"
                        imagePosition="after"
                        customClass="w-[130px]"
                        onClick={toggleCompletions}
                      />
                    </div>
                  {/if}
                </DataCard>
              </div>
            {:else if $activeTab === "badges"}
              <div class="w-full">
                <NoDataFound
                  backgroundColor="bg-gray-100"
                  textColor="text-black"
                  noDataMsg="At present, there are no badges displayed on the profile."
                />
              </div>
            {:else if $activeTab === "streaks"}
              <div class="w-full">
                <NoDataFound
                  backgroundColor="bg-gray-100"
                  textColor="text-black"
                  noDataMsg="At present, there are no streaks displayed on the profile."
                />
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
<CertificateModal
  bind:showModal={showConfirm}
  title={$t("certificate_locked")}
  message={$t("certificate_locked_message")}
  buttonText={$t("start_playing")}
  onConfirm={onConfirmChange}
  iconSrc={IMAGES.CERT_LOCK}
/>
<CertificateDownloadModal
  bind:showModal={showDownload}
  title={$t("congratulations")}
  data={currentCertificate}
  buttonText={$t("download")}
  onConfirm={confirmDownload}
  iconSrc={IMAGES.CONFETTI_ICON}
/>

<!-- Responsive Container -->
