<script>
  import { onDestroy, onMount } from "svelte";
  import { sideBarAndAppBarSettings } from "$lib/utils";
  import { t } from "../../../../stores/language.store";
  import { metaStore } from "../../../../stores/meta.store";
  import SinglePlayerResult from "../../../../components/Result/SinglePlayerResult.svelte";
  import { IMAGES } from "$lib/assets/images/images.constants";
  import { gotoURL } from "$lib/navigation.service";
  import Result from "../../../../components/Result/Result.svelte";

  /**
   * @type {string}
   */

  let metaData;
  let isLoading = false;

  onMount(async () => {
    sideBarAndAppBarSettings(false, "home", "{competitionHome}/home");
    metaStore.subscribe(value => {
      metaData = JSON.parse(value);
    });

    console.log(metaData);

  });

  // Reset sidebar and appbar when navigating away
   onDestroy(() => {
    sideBarAndAppBarSettings(false, "competitions", "/competitions");
  });

      /**
   * @param {any} data
   */
  function Back(data) {
    gotoURL('/competitions');
  }

</script>

<svelte:head>
  <title>{$t("lessons_listing")}</title>
</svelte:head>

<!-- <SinglePlayerResult 
 data={[metaData]}
          title={"single_mode"}
          icon={IMAGES.SINGLE_PLAYER_ICON}
          Mode={0}
          callback={Back} /> -->

<Result data={[metaData]} title={"single_mode"} icon={IMAGES.SINGLE_PLAYER_ICON} Mode={0} callback={Back} />

