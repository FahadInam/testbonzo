<script>
  /**
   * @type {{ name: string, avatar: string, avatarColor: string, position: string, content: string }}
   */
  export let data;
</script>

<div class="min-w-full w-full px-3">
  <div
    class="bg-white rounded-[20px] p-6 mx-auto max-w-md card-shadow min-w-full min-h-auto md:min-h-[300px] lg:min-h-[300px]"
    role="article"
    aria-label={`Testimonial from ${data.name}`}
  >
    <div class="flex items-center mb-4">
      <div
        class={`flex-shrink-0 w-12 h-12 ${data.avatarColor} rounded-full flex items-center justify-center font-bold text-xl`}
      >
        {data.avatar}
      </div>
      <div class="ml-4">
        <h3 class="font-bold text-lg">{data.name}</h3>
        <p class="text-sm text-gray-500">{data.position}</p>
      </div>
    </div>
    <div class="pt-3 md:pt-7">
      <p class="text-gray-500 font-normal text-sm md:text-base">
        {data.content}
      </p>
    </div>
  </div>
</div>

<style>
  .card-shadow {
    box-shadow: rgb(201 226 246) 0px 10px 0px -3px;
  }
</style>
