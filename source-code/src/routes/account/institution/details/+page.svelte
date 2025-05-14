<script>
    import { institutionDetails } from "../../../../data-actions/authentication/institution.auth.da";
    import InstitutionDetailsView from "../../../../views/InstitutionDetailsView/InstitutionDetailsView.svelte";
console.log(institutionDetails, "institutionDetails")

</script>

<InstitutionDetailsView form={institutionDetails} />
