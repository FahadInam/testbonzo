<script>
  import { onMount } from "svelte";
  import ListBox from "../ListBox/ListBox.svelte";
  import { structureListingsData } from "./Listings";

    /**
   * @type { any[]}
   */
  export let listings = [];
      /**
   * @type { any[]}
   */
  let structuredData= [];
  export let isLoading = false;
  export let title = "";
  export let type = "";
  export let icon = ""; // Add this line

  /**
 * @param {any} data
 * @param {string} type
 */
  export let onItemClick = (data , type) => {
    console.log("Item clicked", data, type);
  };

  onMount(() => {
    structuredData = structureListingsData(listings, type);
  });
</script>

<ListBox
  data={structuredData}
  {title}
  {isLoading}
  callback={onItemClick}
  {icon}
/>
