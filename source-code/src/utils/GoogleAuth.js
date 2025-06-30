import { Spinner, User } from 'Actions';
import { config } from 'Constants';
import { isGreenGuardiansInstance } from './Helpers';

// console.log(config.googleWebClientId, "googleWebClientId")

export async function googleAuth() {
  let redirectUri;

  if (User.IsLoggedInUser()) {
    redirectUri = `https://${window.location.host}/competitions`;
  } else {
    if (isGreenGuardiansInstance()) {
      redirectUri = `https://${window.location.host}/program/glc`;
    } else {
      redirectUri = `https://${window.location.host}`;
    }
  }

  // console.log(redirectUri, 'window.redirect');
  sessionStorage.setItem('isGoogleLoggingIn', 'true');
  let params = {
    client_id: config.googleWebClientId,
    scope: `${config.googleWebProfileURL} ${config.googleWebEmailURL}`,
    redirect_uri: redirectUri,
    include_granted_scopes: 'true',
    state: 'pass-through-value',
    response_type: 'token',
  };
  // console.log('Google Login API Params: ', params);

  let form = document.createElement('form');
  form.setAttribute('method', 'GET');
  form.setAttribute('action', `${config.googleWeb0AuthURL}`);

  for (let p in params) {
    let input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}

export const parseHash = async (hash) => {
  //  console.log('in hash');

  const params = new URLSearchParams(hash.substring(1));
  // console.log(params, 'paramsObject');

  //  API endpoint
  try {
    const response = await fetch(config.googleWeb0AuthUser, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.get('access_token')}`,
      },
    });

    Spinner.Show();

    if (response.status === 200) {
      const data = await response.json();
      Spinner.Hide();

      const result = {
        accessToken: params.get('access_token'),
        data: data,
      };
      return result;
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};
