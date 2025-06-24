<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { get } from "svelte/store";
  import { addVoucherCode } from "../../data-actions/competitions/competitions.da";
  import { isGCLC } from "../../data-actions/system/system..da";
  import { appbarStore } from "../../stores/appbar.store";
  import { t } from "../../stores/language.store";
  import { systemSettingsStore } from "../../stores/systemsettings.store";
  import { userStore } from "../../stores/user.store";
  import Button from "../Button/Button.svelte";
  import Card from "../Card/Card.svelte";
  import VoucherModal from "../CustomModals/VoucherModal.svelte";
  import Progressbar from "../Progessbar/Progressbar.svelte";

  export let competition = {
    id: 1,
    title: "The Green Singapore Competition",
    image: "https://bonzo.knowledgeplatform.com/images/competitions/learning_playground_banner1.png",
    is_demo: false,
    banner_image_mobile: "",
    is_private_comp_enabled: 0, // Default value added
    is_public: 0, // Default value added
    is_voucher_added: 0, // Default value added
    end_date: "", // Added default end_date property
  };

  /**
   * @type {any}
   */
  let competition_id = 0;
  let showModal = false;

  /**
   * @type {(arg0: number) => void}
   */
  export let onItemClick;
  const config = get(systemSettingsStore);
  let isPrincipal = $userStore?.active_role === "principal";

  let isLocked =
    config?.comp_banner_locked &&
    !isPrincipal &&
    competition?.is_private_comp_enabled === 1 &&
    competition?.is_public === 0 &&
    competition?.is_voucher_added === 0;

  let isFinish = new Date(competition?.end_date) < new Date();
  let isDemo = competition?.is_demo;
  /**
   * @param {number} id
   */
  function handleClick(id) {
    onItemClick(id);
  }

  /**
   * @param {number} id
   */
  function openModal(id) {
    competition_id = id;
    showModal = true;
  }

  async function onVoucherSuccess() {
    showModal = false;
    handleClick(competition.id);
  }
</script>

<Card
  className={`${isLocked ? "lock-card-shadow" : "card-button-shadow"} `}
  btnClass={`${isLocked || isPrincipal ? "!cursor-default" : ""}`}
  onClick={!isLocked && !isPrincipal ? () => handleClick(competition.id) : undefined}
>
  <div>
    <div
      class="h-60 relative overflow-hidden p-2 w-full h-full max-w-[400px] md:max-w-[2000px] md:w-[640px] md:h-[170px] lg:w-[912px] lg:h-[240px]"
    >
      <picture>
        <source srcset={competition.banner_image_mobile} media="(max-width: 768px)" />
        <img src={competition.image} alt={competition.title} class="w-full h-full object-cover rounded-[15px]" />
      </picture>
      {#if isLocked}
        <div class="absolute top-0 left-0 right-0 w-full h-full p-2">
          <div class="bg-[#0c0c0ca4] flex items-center justify-center rounded-[15px] w-full h-full">
            <div class="flex flex-col items-center justify-center text-white">
              <img src={IMAGES.LOCK_ICON} alt="Lock" class="w-24 mb-2 translate-x-4" />
              <Button
                label={$t("unlock_the_competition")}
                size="large"
                type="3d-secondary"
                customClass="w-full"
                onClick={() => {
                  openModal(competition.id);
                }}
              />
            </div>
          </div>
        </div>
      {/if}
    </div>
    <!-- CHANGE: Modified layout to properly display title, player count, and view progress button -->
    <div class="p-3 pb-8 pt-0 relative">
      {#if competition?.enrolled && !isLocked}
        <Progressbar
          completed={competition?.lessons_completed}
          total={competition?.total_lessons}
          className="h-2.5 mt-1"
          outsideLabel
        />
      {/if}
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div class="flex-1 min-w-0 pr-2">
          <h3 class="text-lg sm:text-xl lg:text-2xl font-medium break-words" class:mb-2={!isPrincipal}>
            {competition.title}
          </h3>
          {#if isPrincipal}
            <span class="text-sm sm:text-base font-normal text-gray-500 block mb-4 sm:mb-0">
              Total Players: {competition?.total_players}
            </span>
          {/if}
        </div>

        {#if isPrincipal}
          <div class="mt-2 sm:mt-0">
            <Button
              label={$t("view_progress")}
              size="small"
              type="3d-secondary"
              customClass="w-full sm:w-[200px]"
              onClick={() => handleClick(competition.id)}
            />
          </div>
        {/if}
      </div>

      {#if !isPrincipal}
        <div class="absolute bottom-4 right-4 flex items-center space-x-[5px]">
          <div
            class={` w-3  h-3 rounded-full   ${isDemo ? "bg-[var(--badge-blue)]   " : isFinish ? "bg-[var(--badge-gray)]  " : "bg-[var(--badge-green)]  "}`}
          ></div>
          <span
            class={`text-sm sm:text-base leading-0 sm:leading-normal font-poppins font-semibold ${isDemo ? "text-[var(--badge-blue)]   " : isFinish ? "text-[var(--badge-gray)]  " : "text-[var(--badge-green)]  "}`}
          >
            {isDemo ? $t("demo") : isFinish ? $t("finished") : $t("live")}
          </span>
        </div>
      {/if}
    </div>
  </div>
  <!-- {#if competition_id} -->
  <VoucherModal
    bind:showModal
    id={competition_id}
    onSuccess={onVoucherSuccess}
    onSubmit={addVoucherCode}
    title={$t("add_voucher_code")}
    instructionText={$t("voucher_instruction")}
  />
  <!-- {/if} -->
</Card>
