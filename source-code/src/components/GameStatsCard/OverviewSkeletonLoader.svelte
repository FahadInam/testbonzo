<script>
    export let isLoading = true;
</script>

{#if isLoading}
    <div class="animate-pulse">
        <!-- Skeleton for Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {#each Array(3) as _, i}
                <div class="bg-gray-200 rounded-lg p-6 flex flex-col">
                    <div class="flex items-center mb-4">
                        <div class="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                        <div class="h-5 bg-gray-300 rounded w-1/2"></div>
                    </div>
                    <div class="h-8 bg-gray-300 rounded w-1/3 mb-2"></div>
                </div>
            {/each}
        </div>
        
        <!-- Skeleton for Performance Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {#each Array(2) as _, i}
                <div class="bg-gray-200 rounded-lg p-6">
                    <div class="h-6 bg-gray-300 rounded w-1/3 mb-6"></div>
                    {#each Array(3) as _, j}
                        <div class="flex items-center justify-between py-3 border-b border-gray-300">
                            <div class="flex items-center">
                                <div class="w-8 h-8 rounded-full bg-gray-300 mr-3"></div>
                                <div class="h-4 bg-gray-300 rounded w-24"></div>
                            </div>
                            <div class="h-4 bg-gray-300 rounded w-12"></div>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
        
        <!-- Skeleton for Progress Cards -->
        <div class="flex flex-col gap-8 my-8">
            {#each Array(2) as _, i}
                <div class="bg-gray-200 rounded-lg p-6">
                    <div class="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
                    <div class="space-y-4">
                        {#each Array(3) as _, j}
                            <div class="flex flex-col">
                                <div class="flex justify-between mb-2">
                                    <div class="h-4 bg-gray-300 rounded w-1/3"></div>
                                    <div class="h-4 bg-gray-300 rounded w-16"></div>
                                </div>
                                <div class="h-4 bg-gray-300 rounded-full w-full"></div>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/if}