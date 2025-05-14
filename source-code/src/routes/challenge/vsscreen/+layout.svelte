<script>

    import AppBar from "../../../components/AppBar/AppBar.svelte";
    import BackgroundImage from "../../../components/BackgroundImage/BackgroundImage.svelte";

</script>


<BackgroundImage></BackgroundImage>

   <div class="flex flex-col h-screen">
 

  <div class="flex flex-1 overflow-hidden">

    <div class="flex flex-col flex-1">
            <AppBar
        />
      <div class="flex-1 overflow-y-auto save-scroll">
        <slot />
      </div>
    </div>
  </div>

</div>