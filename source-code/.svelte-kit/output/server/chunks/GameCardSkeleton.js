import "clsx";
function GameCardSkeleton($$payload) {
  $$payload.out += `<div class="flex justify-center items-center"><div class="max-w-sm bg-white rounded-[20px] shadow-lg p-5 w-full sm:max-w-sm md:max-w-md lg:max-w-[450px] relative transition-transform duration-200 card-button-shadow h-[260px]"><div class="animate-pulse space-y-4"><div class="bg-white rounded-lg w-full max-w-md relative"><div class="bg-gray-200 h-48 w-full rounded-[15px]"></div> <div><div class="h-12 bg-gray-300 rounded-b-[15px] w-3/5 mb-4 absolute top-0 left-1/2 transform -translate-x-1/2"></div> <div class="h-12 bg-gray-300 rounded-tl-[30px] rounded-bl-[30px] w-1/2 absolute bottom-[-22px] right-0"></div></div></div></div></div></div>`;
}
export {
  GameCardSkeleton as G
};
