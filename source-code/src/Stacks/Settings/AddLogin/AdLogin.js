import React, { useEffect } from 'react';
import { DotLoader } from 'Components/Loader/dotLoader';
import kp from 'Assets/images/mcd/kp.png';
import { Account } from 'Actions';
import { actionDispatch, gameDispatch } from 'Utils/ActionCreators';
import { AD_LOGIN_USER } from 'Constants';
import AddLoginAction from './adlogin_action';

const AdLogin = () => {
  useEffect(() => {
    // console.log('A GAE HAAN YAHA');
    AddLoginAction.loadScript('https://alcdn.msauth.net/browser/2.5.2/js/msal-browser.min.js', () => {
      // const clientID = 'ca0e0ce9-84ee-4758-963e-49293c6682f4';
      // const authorityID = 'https://login.microsoftonline.com/27e2299c-0457-4673-bf8e-089c95e79960';

      const clientID = '4a87b03d-bcb1-4d8a-bc88-b3bd714eca7a';
      const authorityID = 'https://login.microsoftonline.com/4f081b06-f15e-4582-b489-98855ecfbfe0';
      // var clientID = "06675d78-cb8e-4921-82fb-59074f781072";
      let msalInstance;
      const msalConfig = {
        auth: {
          clientId: clientID,
          // authority:
          // "https://login.microsoftonline.com/4f081b06-f15e-4582-b489-98855ecfbfe0",
          authority: authorityID,
        },
        cache: {
          cacheLocation: 'localStorage', // This configures where your cache will be stored
          storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
        },
      };

      // eslint-disable-next-line no-undef
      msalInstance = new msal.PublicClientApplication(msalConfig);
      // console.log('msalInstance', msalInstance);
      gameDispatch(AD_LOGIN_USER.AD_LOGIN_DATA, msalInstance);
      //  console.log('msalInstance');
      msalInstance
        .handleRedirectPromise()
        .then((tokenResponse) => {
          // Handle redirect response
          console.log('tokenResponse', tokenResponse);
          const accounts = msalInstance.getAllAccounts();
          //  console.log('accounts', accounts);
          // alert('account details', accounts);

          // Account.ExternalLoginAD({ email: 'bsiddiqui@knowledgeplatform.com', name: 'Basit Siddiqui' });
          if (accounts.length > 0) {
            // console.log(accounts);
            const { username, name } = accounts[0];
            // console.log('username, name', username, name);
            actionDispatch(Account.ExternalLoginAD({ email: username, name }));
            // alert('account found');

            //  console.log(accounts[0]);
            /* Login API and then redirect to a competition */
          } else {
            try {
              msalInstance.loginRedirect({
                // redirectUri: "http://localhost:5500/redirect.html",
                redirectUri: 'https://bonzo.knowledgeplatform.com/account/adlogin/',
              });
            } catch (err) {
              // handle error
              console.log('err', err);
            }
          }
        })
        .catch((error) => {
          console.log('error', error);
          // Handle redirect error
        });
    });
  }, []);

  return <DotLoader kp={kp} />;
};

export default AdLogin;
