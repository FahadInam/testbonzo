import { request } from "$lib/api.service";
import { updateStoreVariable } from "$lib/utils";
import { get } from "svelte/store";
import { API_DEFINITIONS } from "../../apis/api.definitions";
import { instanceStore } from "../../stores/instance.store";
import { showError } from "../../stores/toast.store";
import { userStore } from "../../stores/user.store";
import { guestStore } from "../../stores/guest.store";

let demoUser = "demouserguestmode@kp.com";
let demoPwd =
  "7b27d885967fb69b6cf101dffbe76f1df1147cae26d3f17bad8db1b9cc9b8896";

export async function loginAsGuest() {
  const instance_id = get(instanceStore).instance_id;
  const data = await request(
    API_DEFINITIONS.LOGIN_USER,
    { username: demoUser, password: demoPwd },
    {
      definitionOverrides: { loader: true },
      headers: {
        instance_id: instance_id,
      },
    },
  );

  if (data?.error_code == 0) {
    // login succesful
    userStore.set(data.data[0]);
    updateStoreVariable(guestStore, "guest_mode", true);
    updateStoreVariable(userStore, "is_guest_mode", true);
  } else if (data?.error_code < 0) {
    showError(data?.error_message);
  }
}
