<script>
  import { onMount } from "svelte";
  import { getInstitutionDetails } from "../../../../data-actions/authentication/institution.auth.da";
  import InstitutionDetailsView from "../../../../views/InstitutionDetailsView/InstitutionDetailsView.svelte";

  let institutionDetails = {};

  async function loadFields() {
    institutionDetails = await getInstitutionDetails();
  }

  onMount(async () => {
    await loadFields();
  });
</script>

<InstitutionDetailsView form={institutionDetails} />
