<script>
    import { IMAGES } from "$lib/assets/images/images.constants";
    import Avatar from "../Avatar/Avatar.svelte";
 
    export let performers = [];
    export let title = "Struggling Performers";
</script>

<div class="bg-blue-900 rounded-[20px] pt-4 w-full shadow-lg flex flex-col">
    <h2 class="text-white font-bold text-xl mb-4 text-center">{title}</h2>
 
    {#if performers && performers.length > 0}
        <!-- Data is available -->
        <div class="space-y-3 bg-white rounded-b-[20px] px-4 py-3 flex-grow">
            {#each performers as performer, index}
                <div class="flex items-center justify-between p-2 rounded-[15px] {index % 2 === 1 ? 'bg-[#F5F6F7]' : 'bg-white'}">
                    <div class="flex items-center gap-3">
                        <div class="relative">
                            <Avatar t={performer.profile_picture} s={30} u={30} ml="auto" mr="auto" />
                        </div>
                       
                        <span class="text-gray-500 font-medium truncate max-w-xs">{performer.name}</span>
                    </div>
                   
                    <span class="text-gray-500 font-medium">{performer.avg_score.toFixed(2)}%</span>
                </div>
            {/each}
        </div>
    {:else}
        <!-- No data state -->
        <div class="bg-white rounded-b-[20px] p-6 flex flex-col items-center justify-center flex-grow">
            <img src={IMAGES.NO_DATA_FOUND_IMAGE} alt="No data" class="w-40 h-40 mb-4" />
            <p class="text-gray-500 text-center">No data to display</p>
        </div>
    {/if}
</div>