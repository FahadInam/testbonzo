<script>
  import { t } from "../../stores/language.store";
  export let name = "John Doe"; // Default value
  export let onSave = (newName) => console.log("Saved name:", newName);

  let isEditing = false;
  let tempName = name;

  function toggleEdit() {
    if (isEditing) {
      // Save and call the callback
      name = tempName;
      onSave(name);
    }
    isEditing = !isEditing;
  }
</script>

<div class="flex flex-col w-full max-w-xl">
  <label for="nameInput" class="mb-1 font-medium text-gray-700">
    {$t("edit_your_name")}
  </label>
  <div class="flex items-center border border-gray-300 rounded-lg p-2">
    <input
      id="nameInput"
      type="text"
      class="flex-1 bg-transparent outline-none p-1 truncate"
      bind:value={tempName}
      disabled={!isEditing}
    />
    <button
      on:click={toggleEdit}
      class="ml-2 px-3 py-1 text-white font-medium rounded-md transition-colors
        {isEditing
        ? 'bg-green-500 hover:bg-green-600'
        : 'bg-blue-500 hover:bg-blue-600'}"
    >
      {isEditing ? "Save" : "Edit"}
    </button>
  </div>
</div>
