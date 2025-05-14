<script>
  import { onMount } from 'svelte';
  
  // Props
  export let user;
  export let isSinglePlayerMatch = false;
  export let animated = false;
  export let isGuest = false;
  
  // Media query for responsive design
  let isSmallScreen = false;
  let avatarSize = 150; // default size

  onMount(() => {
    // Set up responsive behavior
    const mediaQuery = window.matchMedia('(max-width:599px)');
    isSmallScreen = mediaQuery.matches;
    
    const handleResize = (e) => {
      isSmallScreen = e.matches;
    };
    
    mediaQuery.addEventListener('change', handleResize);
    
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  });
  
  // Calculate avatar size based on screen size
  $: avatarSize = isSmallScreen ? 120 : 150;
  
  // Username resolver helper function
  function usernameResolver(name, username) {
    // Implement your username resolution logic here
    return username || name || '';
  }
</script>

<div 
  class="user-box {isSinglePlayerMatch ? 'col-span-12' : 'col-span-5'} h-full"
  class:hidden={animated}>
  
  <div class="z-0 {isSinglePlayerMatch ? 'flex justify-center items-center' : 'flex items-center justify-end'}">
    <div class="text-center">
      <!-- Hidden username for layout purposes -->
      <div class="invisible">
        <p class="mb-6 font-medium player-name">
          {isGuest ? 'Guest Mode' : usernameResolver(user.name, user.username || user.user_name)}
        </p>
      </div>
      
      <!-- Avatar -->
      <div class="avatar-wrapper shadow-lg">
        <!-- You would replace this with your AvatarSwitcher component -->
        <img 
          src={user.profile_picture} 
          alt="User avatar" 
          class="rounded-full" 
          style="width: {avatarSize}px; height: {avatarSize}px;"
        />
      </div>
      
      <!-- Visible username -->
      <p class="mt-6 font-medium player-name bg-white text-black">
        {isGuest ? 'Guest Mode' : usernameResolver(user.name, user.username || user.user_name)}
      </p>
    </div>
  </div>
</div>

<style lang="postcss">
  /* You can add component-specific styles here if needed */
  .player-name {
    @apply truncate max-w-full;
  }
  
  /* For any styles that can't be easily represented in Tailwind */
</style>