<script>
  import FullPageIframe from "../../components/FullPageIframe/FullPageIframe.svelte";
  import NavBar from "../../components/NavBar/NavBar.svelte";

  let url = "https://knowledgeplatform.com.pk/gclc-result/"; // URL passed from the load function
</script>

<!-- Navigation bar -->
<div class="w-full fixed top-0 z-50 shadow-md">
  <NavBar />
</div>

<!-- Full page iframe container -->
<div class="flex flex-col h-screen pt-[81px]">
  <FullPageIframe {url} title="Knowledge Platform" />
</div>
