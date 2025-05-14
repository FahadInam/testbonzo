<script>
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  if (browser) {
    goto(page.url.pathname + '/selection');
  }
</script>
