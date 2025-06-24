<script>
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { t } from "../../stores/language.store";
</script>

<div class="relative my-4 ms-8 me-6 strip-background flex items-center">
  <img src={IMAGES.RIBBON_BANNER} class="w-full" alt="Ribbon Banner" />

  <div class="absolute -left-4 xs:left-1 flex items-center">
    <img src={IMAGES.COINS} alt="Game-based learning" class="w-[48px] h-[50px] xs:w-[32px] xs:h-[32px]" />
  </div>

  <p class="absolute left-[38px] xs:left-[50px] text-white text-base font-semibold primary-font pb-1">
    {$t("three_x_reward_1")}
    <span class="font-bold text-amber-300 text-2xl">{$t("three_x_reward_2")}</span>
    {$t("three_x_reward_3")}
  </p>
</div>
