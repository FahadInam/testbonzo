<script>
  import { IMAGES } from '$lib/assets/images/images.constants';
  import { t } from '../../stores/language.store';
</script>

<div class="relative my-4 strip-background flex items-center">
  <img src={IMAGES.RIBBON_BANNER} class="w-full" alt="Ribbon Banner" />
  
  <div class="absolute left-4 xs:left-1 flex items-center">
    <img src={IMAGES.COINS} alt="Game-based learning" class="w-[53px] h-[53px] xs:w-[36px] xs:h-[36px]" />
  </div>

  <p class="absolute left-[80px] xs:left-[50px] text-white text-[16px] font-medium">
    {$t('three_x_reward_1')}
    <span class="font-bold">{$t('three_x_reward_2')}</span>
    {$t('three_x_reward_3')}
  </p>
</div>
