import "clsx";
import { F as Form } from "../../../chunks/Form.js";
function _page($$payload) {
  const loginFields = [
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      required: true
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      required: true
    }
  ];
  const buttons = [
    {
      label: "Cancel",
      type: "button",
      action: "cancel"
    },
    { label: "Login", type: "submit" }
  ];
  const handleSubmit = (formData) => {
    console.log("Form submitted with data:", formData);
  };
  const handleError = (errors) => {
    console.error("Form errors:", errors);
  };
  const handleCancel = () => {
    console.log("Cancel button clicked");
  };
  const handleOtherAction = (formData) => {
    console.log("Custom action triggered with data:", formData);
  };
  $$payload.out += `<main class="p-4"><h1 class="text-2xl font-bold mb-4">Login Form</h1> `;
  Form($$payload, {
    fields: loginFields,
    buttons,
    turnstileSiteKey: "your-site-key-here",
    enableTurnstile: true,
    handleSubmit,
    handleError,
    handleCancel,
    handleOtherAction
  });
  $$payload.out += `<!----></main>`;
}
export {
  _page as default
};
