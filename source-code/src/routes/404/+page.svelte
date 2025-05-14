<script>
  import { goto } from "$app/navigation";

  let seconds = 2;
  const countdown = setInterval(() => {
    seconds--;
    if (seconds === 0) {
      clearInterval(countdown);
      goto("/");
    }
  }, 1000);
</script>

<h1>Oops! This page doesn't exist.</h1>
<p>Redirecting to the home page in {seconds} seconds...</p>
