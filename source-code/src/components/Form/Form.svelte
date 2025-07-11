<script>
  // @ts-nocheck

  import { onMount, onDestroy } from "svelte";
  import Button from "../Button/Button.svelte";
  import { onEnter } from "$lib/utils";
  import { sha256 } from "js-sha256";
  import { turnstile } from "@svelte-put/cloudflare-turnstile";
  import { t, getText } from "../../stores/language.store";
  import { isShupavu } from "../../data-actions/system/system..da";
  import ResendOtp from "../ResendOTP/ResendOTP.svelte";
  import { IMAGES } from "$lib/assets/images/images.constants";
  import Select from "svelte-select";
  import PasswordStrengthPopover from "./PasswordStrengthPopover.svelte";

  // Props
  export let fields = []; // Array of field objects
  export let buttons = []; // Array of button objects
  export let turnstileSiteKey = ""; // Cloudflare Turnstile site key
  export let enableTurnstile = false; // Enable/disable Turnstile
  export let forgotPassword = {}; // Holds forgot password link and label
  export let formData = {}; // Add this prop to accept pre-filled values

  // Callback props
  export let handleSubmit = (formData) => {}; // Callback for form submission
  export let handleError = (errors) => {}; // Callback for form errors
  export let handleCancel = () => {}; // Callback for cancel action
  export let handleOtherAction = (formData) => {}; // Callback for other custom actions

  // State
  //let formData = {};
  let errors = {};
  let turnstileToken = ""; // Stores the Turnstile token
  let turnstileScript = null; // Reference to the dynamically added script
  let submitted = false; // Track if the form has been submitted
  let showPassword = false; //for password reveal
  let showPasswords = {}; // Store visibility state for each password field
  let passwordPopoverVisible = false;
  let passwordPopoverField = null;
  // Add a map to store input refs for each password field
  let passwordInputRefs = {};

  // Initialize form data with values from fields or provided formData
  onMount(() => {
    // Initialize with provided formData values if available
    if (formData) {
      fields.forEach((field) => {
        if (formData[field.name] !== undefined) {
          field.value = formData[field.name];
        } else if (!field.value) {
          field.value = "";
        }
      });
    }
  });

  // Initialize form data
  // $: {
  //   fields.forEach((field) => {
  //     if (!formData[field.name]) {
  //       formData[field.name] = "";
  //     }
  //   });
  // }

  // Load Cloudflare Turnstile script
  onMount(() => {});

  // Clean up the Turnstile script when the component is destroyed
  onDestroy(() => {});

  const resetTurnstile = () => {
    return new Promise((accept, reject) => {
      if (enableTurnstile) {
        turnstileToken = null;
        enableTurnstile = false;
        setTimeout(() => {
          enableTurnstile = true;
          accept(true);
        }, 100);
      } else {
        accept(true);
      }
    });
  };

  // Validation functions
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const shupavuRegex = /^\+254\d{9}$/;
    const normalRegex = /^(?:\+92|0)3\d{9}$/;
    const regex = isShupavu ? shupavuRegex : normalRegex;
    return regex.test(phone);
  };

  const validatePassword = (password) => {
    return password.length >= 8; // Example: Minimum 8 characters
  };

  // Validate a single field
  const validateField = (field) => {
    const { name, value, type, required } = field;
    if (required && !value) {
      errors[name] = $t("field_required");
      return false;
    }

    switch (type) {
      case "email":
        if (!validateEmail(value)) {
          errors[name] = $t("invalid_email");
          return false;
        }
        break;
      case "tel":
        if (!validatePhone(value)) {
          errors[name] = $t("invalid_phone");
          return false;
        }
        break;
      case "password":
        if (!validatePassword(value)) {
          errors[name] = $t("invalid_password");
          return false;
        }
        break;
      default:
        break;
    }

    delete errors[name];
    return true;
  };

  // Validate the entire form
  const validateForm = () => {
    let isValid = true;
    fields.forEach((field) => {
      if (!validateField({ ...field, value: formData[field.name] })) {
        isValid = false;
      }
    });

    // Validate Turnstile if enabled
    if (enableTurnstile && !turnstileToken) {
      errors.turnstile = $t("complete_captcha");
      isValid = false;
    }

    return isValid;
  };

  const refreshErrors = () => {
    let errorsTemp = JSON.stringify(errors);
    errors = [];
    errors = JSON.parse(errorsTemp);
  };

  // Handle input change
  const handleInput = (event, field) => {
    const { name, value } = event.target;
    if (field.prefix && field.type === "tel") {
      const cleanValue = value.replace(/\D/g, "");
      formData[name] = `${field.prefix}${cleanValue}`;
    } else {
      formData[name] = value;
    }
    if (submitted && false) {
      validateField({ ...field, value });
    } else {
      delete errors[name]; // Clear the error as soon as the user starts typing
      refreshErrors();
    }
  };

  // Handle Turnstile callback
  const handleTurnstileCallback = (e) => {
    turnstileToken = e.detail.token;
    delete errors.turnstile; // Clear Turnstile error if any
  };

  // Handle button click
  const handleButtonClick = async (button) => {
    if (button.type === "submit") {
      if (!turnstileToken && enableTurnstile) {
        await resetTurnstile();
      }
      submitted = true; // Set submitted to true when the form is submitted

      if (validateForm()) {
        // Check if password and confirmPassword match
        const passwordField = fields.find((field) => field.type === "password");
        const confirmPasswordField = fields.find((field) => field.name === "confirmPassword");

        if (
          passwordField &&
          confirmPasswordField &&
          formData[passwordField.name] !== formData[confirmPasswordField.name]
        ) {
          errors.confirmPassword = $t("password_not_match");
          handleError(errors);
          return;
        }
        // Hash the password before submitting
        const hashedFormData = { ...formData };
        // const passwordField = fields.find((field) => field.type === "password");
        if (passwordField) {
          hashedFormData[passwordField.name] = sha256(formData[passwordField.name]).toString();
        }
        handleSubmit({ ...hashedFormData, turnstileToken }); // Call the submit callback
        resetTurnstile();
      } else {
        handleError(errors); // Call the error callback
      }
    } else if (button.action === "cancel") {
      handleCancel(); // Call the cancel callback
    } else {
      handleOtherAction(formData); // Call the custom action callback
    }
  };

  function togglePasswordVisibility(fieldName) {
    showPasswords = {
      ...showPasswords,
      [fieldName]: !showPasswords[fieldName],
    };
  }

  function handlePasswordFocus(field) {
    if (field.showPasswordStrength) {
      passwordPopoverVisible = true;
      passwordPopoverField = field.name;
    }
  }
  function handlePasswordBlur(field) {
    if (field.showPasswordStrength) {
      // Delay hiding to allow click on popover if needed
      setTimeout(() => {
        passwordPopoverVisible = false;
        passwordPopoverField = null;
      }, 150);
    }
  }

  // In the script section, add:
  $: Object.keys(passwordInputRefs).forEach((name) => {
    if (!fields.find((f) => f.name === name && f.showPasswordStrength)) {
      delete passwordInputRefs[name];
    }
  });

  function getPasswordInputRef(field) {
    if (field.showPasswordStrength) {
      return (el) => (passwordInputRefs[field.name] = el);
    }
    return undefined;
  }
</script>

<form on:submit|preventDefault={() => handleButtonClick({ type: "submit" })} class="space-y-4">
  {#each fields as field, index}
    {#if field.layout === "half"}
      {#if index === 0 || fields[index - 1].layout !== "half" || index % 2 === 0}
        <!-- Open a new flex container -->
        <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <!-- Render the first field in the row -->
          <div class="w-full md:flex-1">
            <label for={field.name} class="block text-base font-semibold text-gray-700">
              {field.label}
            </label>

            {#if field.type === "select"}
              <Select
                items={field.options}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                on:change={(e) => (formData[field.name] = e.detail.value)}
                class="!mt-1 dropdown focus:ring block w-full !pl-3 !p-1 border-[1px] border-[#DEDEDE] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                required={field.required}
                itemId="value"
                label="label"
                clearable={false}
                searchable={false}
                showChevron={true}
                --chevron-icon-size="20px"
                --chevron-icon-colour="#6B7280"
              />

              <!-- {#if submitted && errors[field.name]}
                <p class="error text-start">{errors[field.name]}</p>
              {/if} -->
            {:else}
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                bind:value={formData[field.name]}
                on:input={(e) => handleInput(e, field)}
                class="mt-1 block w-full p-3 border-[1px] border-[#DEDEDE] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-poppins placeholder:text-[#AEAEAE] bg-white read-only:bg-gray-100/50"
                placeholder={field.placeholder}
                required={field.required}
                readonly={field.readonly}
                disabled={field.readonly}
              />
            {/if}

            {#if submitted && errors[field.name]}
              <p class="error">{errors[field.name]}</p>
            {/if}
          </div>

          <!-- Render the second field in the row if it exists -->
          {#if index + 1 < fields.length && fields[index + 1].layout === "half"}
            <div class="w-full md:flex-1">
              <label for={fields[index + 1].name} class="block text-base font-semibold text-gray-700">
                {fields[index + 1].label}
              </label>
              {#if fields[index + 1].type === "select"}
                <Select
                  items={fields[index + 1].options}
                  id={fields[index + 1].name}
                  clearable={false}
                  name={fields[index + 1].name}
                  value={fields[index + 1].options.find((opt) => opt.value === formData[fields[index + 1].name])}
                  on:change={(e) => (formData[fields[index + 1].name] = e.detail.value)}
                  class="!mt-1 dropdown focus:ring block !w-full !p-1 !pl-3 border-[1px] border-[#DEDEDE] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                  required={fields[index + 1].required}
                  itemId="value"
                  label="label"
                  searchable={false}
                  placement="auto"
                  showChevron={true}
                  --chevron-icon-size="20px"
                  --chevron-icon-colour="#6B7280"
                />
                {#if submitted && errors[fields[index + 1].name]}
                  <p class="error text-start">{errors[fields[index + 1].name]}</p>
                {/if}
              {:else}
                <input
                  type={fields[index + 1].type}
                  id={fields[index + 1].name}
                  name={fields[index + 1].name}
                  bind:value={formData[fields[index + 1].name]}
                  on:input={(e) => handleInput(e, fields[index + 1])}
                  class="mt-1 block w-full p-3 border-[1px] border-[#DEDEDE] rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] font-poppins placeholder:text-[#AEAEAE] bg-white read-only:bg-gray-100/50"
                  placeholder={fields[index + 1].placeholder}
                  required={fields[index + 1].required}
                  readonly={fields[index + 1].readonly}
                  disabled={fields[index + 1].readonly}
                />
              {/if}
              <!-- <input
                type={fields[index + 1].type}
                id={fields[index + 1].name}
                name={fields[index + 1].name}
                bind:value={formData[fields[index + 1].name]}
                on:input={(e) => handleInput(e, fields[index + 1])}
                class="mt-1 block w-full p-3 border-[1px] border-[#DEDEDE] rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] font-poppins placeholder:text-[#AEAEAE] bg-white"
                placeholder={fields[index + 1].placeholder}
                required={fields[index + 1].required}
              /> -->
              {#if submitted && errors[fields[index + 1].name]}
                <p class="error">{errors[fields[index + 1].name]}</p>
              {/if}
            </div>
          {/if}
        </div>
      {/if}
    {:else}
      <!-- Render full-width fields -->
      <div>
        <label for={field.name} class="block text-base font-semibold text-gray-700">
          {field.label}
        </label>
        <div class="relative">
          {#if field.type === "select"}
            <Select
              items={field.options}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              on:change={(e) => (formData[field.name] = e.detail.value)}
              class="mt-1 block dropdown focus:ring w-full p-3 border-[1px] border-[#DEDEDE] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              required={field.required}
              itemId="value"
              label="label"
              clearable={false}
              searchable={false}
              showChevron={true}
              --chevron-icon-size="20px"
              --chevron-icon-colour="#6B7280"
            />

            {#if submitted && errors[field.name]}
              <p class="error text-start">{errors[field.name]}</p>
            {/if}
          {:else if field.type === "tel"}
            <div class="relative">
              <span
                class="absolute tracking-wider left-3 top-1/2 transform -translate-y-1/2 text-[#B9B9B9] font-semibold pointer-events-none z-10"
              >
                {field.prefix}
              </span>
              <input
                type="tel"
                id={field.name}
                name={field.name}
                value={formData[field.name] ? formData[field.name].replace(field.prefix, "").trim() : ""}
                on:input={(e) => handleInput(e, field)}
                class="block w-full p-3 pl-[calc(0.7rem*4+theme(spacing.3))] border-[1px] border-[#DEDEDE] rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] font-poppins placeholder:text-[#AEAEAE] bg-white"
                placeholder={field.placeholder}
                required={field.required}
              />
            </div>
            {#if submitted && errors[field.name]}
              <p class="error text-start">{errors[field.name]}</p>
            {/if}
          {:else}
            <input
              type={field.type === "password" ? (showPasswords[field.name] ? "text" : "password") : field.type}
              id={field.name}
              name={field.name}
              bind:value={formData[field.name]}
              on:input={(e) => handleInput(e, field)}
              class="mt-1 block w-full p-3 border-[1px] border-[#DEDEDE] rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] pr-10 font-poppins placeholder:text-[#AEAEAE] bg-white read-only:bg-gray-100/50"
              placeholder={field.placeholder}
              required={field.required}
              readonly={field.readonly}
              disabled={field.readonly}
              use:onEnter={(e) => handleButtonClick({ type: "submit" })}
              on:focus={() => handlePasswordFocus(field)}
              on:blur={() => handlePasswordBlur(field)}
              bind:this={passwordInputRefs[field.name]}
            />

            <div class="w-full">
              <div>
                {#if submitted && errors[field.name]}
                  <p class="error text-start">{errors[field.name]}</p>
                {/if}
              </div>
              <!-- Forgot Password Link -->
              {#if forgotPassword && field.type === "password"}
                <div class=" mt-2 flex justify-end">
                  <a
                    href={forgotPassword.link}
                    class=" text-gray-900 font-medium text-sm hover:underline hover:text-gray-600"
                  >
                    {forgotPassword.label}
                  </a>
                </div>
              {/if}
            </div>
            {#if field.name == "otp"}
              <div class="mt-2 text-end">
                <ResendOtp token={turnstileToken} {resetTurnstile} />
              </div>
            {/if}
            {#if field.showPasswordStrength}
              <PasswordStrengthPopover
                password={formData[field.name] || ""}
                visible={passwordPopoverVisible && passwordPopoverField === field.name}
                inputEl={passwordInputRefs[field.name]}
              />
            {/if}
          {/if}
          {#if field.type === "password"}
            <button
              type="button"
              on:click={() => togglePasswordVisibility(field.name)}
              class="absolute right-0 pr-3 flex items-center text-sm leading-5 top-[12.7px]"
            >
              {#if showPasswords[field.name]}
                <!-- Eye icon for visible password -->
                <svg
                  class="w-6 h-6 text-[var(--primary-color)]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    clip-rule="evenodd"
                  />
                </svg>
              {:else}
                <!-- Eye slash icon for hidden password -->
                <svg
                  class="w-6 h-6 text-[var(--primary-color)]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="m4 15.6 3.055-3.056A4.913 4.913 0 0 1 7 12.012a5.006 5.006 0 0 1 5-5c.178.009.356.027.532.054l1.744-1.744A8.973 8.973 0 0 0 12 5.012c-5.388 0-10 5.336-10 7A6.49 6.49 0 0 0 4 15.6Z"
                  />
                  <path
                    d="m14.7 10.726 4.995-5.007A.998.998 0 0 0 18.99 4a1 1 0 0 0-.71.305l-4.995 5.007a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.402.211.59l-4.995 4.983a1 1 0 1 0 1.414 1.414l4.995-4.983c.189.091.386.162.59.211.011 0 .021.007.033.01a2.982 2.982 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z"
                  />
                  <path
                    d="m19.821 8.605-2.857 2.857a4.952 4.952 0 0 1-5.514 5.514l-1.785 1.785c.767.166 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z"
                  />
                </svg>
              {/if}
            </button>
          {/if}
          {#if field.name === "otp" && field.readonly}
            <div class="absolute right-0 pr-3 flex items-center text-sm leading-5 top-[10px]">
              <img src={IMAGES.CHECK_ICON} alt="check icon" class="" />
            </div>
          {/if}
        </div>
        <!-- {#if submitted && errors[field.name]}
          <p class="error">{errors[field.name]}</p>
        {/if} -->
      </div>
    {/if}
  {/each}

  {#if enableTurnstile}
    <div class="turnstile-container w-full">
      <div
        use:turnstile
        turnstile-sitekey={turnstileSiteKey}
        turnstile-theme="light"
        turnstile-size="flexible"
        turnstile-language="en"
        turnstile-response-field-name="turnstile"
        turnstile-response-field
        on:turnstile={handleTurnstileCallback}
      ></div>
      {#if submitted && errors.turnstile}
        <p class="error">{errors.turnstile}</p>
      {/if}
    </div>
  {/if}

  <div class="button-container pt-2">
    {#each buttons as button}
      <Button
        label={button.label}
        type={button.layout}
        customClass={button.customClass}
        onClick={() => handleButtonClick(button)}
      />
    {/each}
  </div>
</form>

<style>
  .error {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
  .button-container {
    display: flex;
    gap: 1rem;
    /* justify-content: flex-end; */
    justify-content: center;
  }
  .turnstile-container {
    margin: 1rem 0;
  }
</style>
