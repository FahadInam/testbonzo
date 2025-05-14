<script>
  import { get } from "svelte/store";
  import FullPageIframe from "../../components/FullPageIframe/FullPageIframe.svelte";
  import NavBar from "../../components/NavBar/NavBar.svelte";
  import { systemSettingsStore } from "../../stores/systemsettings.store";

  // Get instance config from store
  const config = get(systemSettingsStore);
  console.log("config-->", config);

  // Find the Contact Us item in the landing_navigation array
  const contactItem = config.landing_navigation?.find(
    (item) => item.name === "Contact Us" || item.id === "CONTACT_US",
  );
  // Get the URL from its ref property, or fall back to default
  let url = contactItem?.ref;

  //   let url = "https://knowledgeplatform.com.pk/contact/?embedded"; // URL passed from the load function
</script>

<!-- Navigation bar -->
<div class="w-full fixed top-0 z-50 shadow-md">
  <NavBar />
</div>

<!-- Full page iframe container -->
<div class="flex flex-col h-screen pt-[84px]">
  <FullPageIframe {url} title="Knowledge Platform" />
</div>
