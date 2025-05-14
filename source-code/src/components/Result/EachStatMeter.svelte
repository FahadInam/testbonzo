<script>
  export let l = '';
  export let v = '-';
  export let v2;

  let isMulti = typeof v2 === 'number' || typeof v2 === 'string';
</script>

<div
  class="flex min-w-[250px] max-h-[38px] items-center rounded-full bg-black/50 text-white text-center m-1"
  style="justify-content: {isMulti ? 'space-around' : 'space-between'};"
>
  {#if isMulti}
    <div class="w-20 px-2 font-poppins text-[16px] font-semibold leading-[34.91px] text-white whitespace-nowrap overflow-ellipsis">
      {v || '-'}
    </div>
  {/if}
  <div class="w-[135px] rounded-full bg-black px-2 text-center font-poppins text-[16px] font-semibold leading-[34.91px] text-white">
    {l || ''}
  </div>
  <div class="w-20 px-2 font-poppins text-[16px] font-semibold leading-[34.91px] text-white whitespace-nowrap overflow-ellipsis">
    {isMulti ? v2 || 0 : v || '-'}
  </div>
</div>
