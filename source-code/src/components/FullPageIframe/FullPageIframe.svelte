<script>
  import { onMount } from 'svelte';

  export let url;
  export let title = "Embedded Content";
  export let additionalClasses = "";

  onMount(() => {
    function handleMessage(event) {
      if (event.data && event.data.redirect_href) {
        window.location.href = event.data.redirect_href;
      }
    }
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  });
</script>

<!-- iframe -->
<div class="w-full h-full overflow-hidden bg-white {additionalClasses}">
  <iframe
    {title}
    src={url}
    class="w-full h-full border-none"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>