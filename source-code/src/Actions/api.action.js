/* eslint-disable camelcase */
import { actionCreator } from 'Utils/ActionCreators';
import { API_ERRORS, ALERT, API_CALLS, endRefreshToken, USER } from 'Constants';
import { InternetConnection } from 'Utils';
import { Spinner, Toast } from './app.control.action';
import User from './user.action';
import Account from './account.action';

window.GlobalApiWatcher = false;

let request = {};
const friendlyCauseTranslator = (error) => {
  let shouldRetry = true;
  let friendlyCause = API_ERRORS.UNKNOWN;
  if (error.error_code === -9) {
    if (error.error_message && error.error_message.toLowerCase().indexOf('timeout') > -1) {
      shouldRetry = true;
      friendlyCause = API_ERRORS.TIME_OUT;
    }
  } else if (!InternetConnection.GetConnection()) {
    shouldRetry = true;
    friendlyCause = API_ERRORS.NO_INTERNET;
  } else if (error.response) {
    if (error.response.status >= 500) {
      shouldRetry = true;
      friendlyCause = API_ERRORS.SYSTEM_ERROR;
    }
    if (error.response.status >= 401) {
      shouldRetry = false;
      friendlyCause = API_ERRORS.UNAUTHORIZED;
    }
  } else if (error.message) {
    if (error.message.indexOf('timeout') > -1) {
      friendlyCause = API_ERRORS.TIME_OUT;
      shouldRetry = true;
    } else if (error.message === API_ERRORS.CANCELLED) {
      friendlyCause = API_ERRORS.CANCELLED;
      shouldRetry = false;
    } else if (error.message === API_ERRORS.NO_INTERNET) {
      shouldRetry = true;
      friendlyCause = API_ERRORS.NO_INTERNET;
    } else if (error.message === 'Network Error') {
      shouldRetry = true;
      friendlyCause = API_ERRORS.NETWORK_ERROR;
    }
  } else if (error.request) {
    if (error.request.timeout) {
      friendlyCause = API_ERRORS.TIME_OUT;
      shouldRetry = true;
    }
  }
  return { shouldRetry, friendlyCause };
};

let requestQueue = [];

const ExecApiRequest = (apiSet, dto, callback, header, isMobileOTP) => {
  request = { apiSet, dto, callback };
  if (apiSet.setSpinner) {
    Spinner.Show();
  }
  return (dispatch, getState, api) => {
    const { isRefreshingToken } = getState().RefreshStatus;

    if (isRefreshingToken && apiSet.api !== 'token/refresh') {
      return new Promise((resolve, reject) => {
        requestQueue.push(() => dispatch(ExecApiRequest(apiSet, dto, callback, header)).then(resolve).catch(reject));
      });
    }

    let user = User.Info();

    user = header ? { ...user, ...header } : user;
    dispatch(actionCreator(apiSet.LOADING, {}));
    window.GlobalApiWatcher = true;
    return api
      .ExecuteAxiosRequest(apiSet, dto, user, false)
      .then(({ data }) => {
        Spinner.Hide();
        let nData = data;
        if (typeof data === 'string') {
          nData = data;
        }
        if (apiSet.api === 'token/refresh' && data && data.error_code === 0) {
          if (user.auth_token !== nData?.data[0]?.auth_token) {
            User.Set(nData?.data[0]);
            user = User.Info();
          }
          dispatch(endRefreshToken());
          processRequestQueue(dispatch, getState, api);
        }
        if (apiSet.api === 'token/refresh' && data.error_code === -1) {
          localStorage.clear();
          User.Clear(true);
          dispatch({ type: USER.CLEAR });
          dispatch({ type: USER.IS_LOGGED_IN, payload: false });
          dispatch(endRefreshToken());
        }

        //for shupavu
        //  console.log(dto, 'dto');
        if (isMobileOTP) {
          if (apiSet.api === API_CALLS.Login.api) {
            if (nData.error_code === -1) {
              Toast.Show('Invalid phone number/password.', ALERT.ERROR);
              return;
            }
          }
        }

        // console.log('nData', nData);
        if (apiSet.api === API_CALLS.ForgotPassword.api) {
          if (nData.error_code === -1) {
            Toast.Show(nData.error_message, ALERT.ERROR);
          } else {
            if (callback) {
              callback(nData);
            }
          }
          return;
        }
        // if (apiSet.api === API_CALLS.GetUserCertificateDetails.api) {
        //   if (nData.error_code === -1) {
        //     Toast.Show(nData.error_message, ALERT.ERROR);
        //   } else {
        //     if (callback) {
        //       console.log('nData: ', nData);
        //       callback(nData);
        //     }
        //   }
        //   return;
        // }

        if (apiSet.api === API_CALLS.InstitutionalInfo.api) {
          if (nData.error_code === -2) {
            Toast.Show(nData.message, ALERT.ERROR);
            return;
          }
        }

        if (
          apiSet.api === API_CALLS.SignUp.api ||
          apiSet.api === API_CALLS.OTPSend.api ||
          apiSet.api === API_CALLS.OTPMobileSend.api ||
          apiSet.api === API_CALLS.SignUpRequest.api
        ) {
          if (nData.error_code === -10) {
            Toast.Show(nData.error_message, ALERT.ERROR);
            return;
          }
        }

        if (nData.error_code === -10) {
          User.Clear(API_CALLS.Logout.api !== apiSet.api);
          Spinner.Hide();
          return;
        }

        let nError = {};
        if (nData.error_code !== 0) {
          nError = friendlyCauseTranslator(nData);
          if (
            ((apiSet.api === API_CALLS.AddSecretCode.api || apiSet.api === API_CALLS.AddSecretCodeForGCLC.api) &&
              nData.error_code === -2) ||
            nData.error_code === -3 ||
            nData.error_code === -4 ||
            nData.error_code === -5
          ) {
            Toast.Show(nData.error_message, ALERT.ERROR);
            return;
          }
          if (apiSet.setSpinner) {
            if (apiSet.api === API_CALLS.SaveChallenge.api && nData.error_code === 1) {
              if (callback) {
                callback(nData);
              }
              return;
            }

            if (nError.shouldRetry && nError.friendlyCause === API_ERRORS.TIME_OUT) {
              Spinner.ShowRetry(apiSet.setCancelBtn);
            } else {
              Toast.Show(nData.error_message, ALERT.ERROR);
            }
            return;
          }

          dispatch(actionCreator(apiSet.ERROR, API_ERRORS.SYSTEM_ERROR));
          window.GlobalApiWatcher = false;
          if (callback) {
            callback(nData);
          }
          return;
        }

        dispatch(actionCreator(apiSet.SUCCESS, nData.data));
        if (callback) {
          callback(nData.data);
        }
        window.GlobalApiWatcher = false;
      })
      .catch((error) => {
        const { shouldRetry, friendlyCause } = friendlyCauseTranslator(error);
        if (friendlyCause === API_ERRORS.UNAUTHORIZED) {
          if (apiSet.api === 'token/refresh' && !User.IsGuest()) {
            dispatch(endRefreshToken());
            Spinner.Hide();
            localStorage.clear();
            User.Clear(true);
            // dispatch(Account.Logout());
            dispatch({ type: USER.CLEAR });
            dispatch({ type: USER.IS_LOGGED_IN, payload: false });
            dispatch(endRefreshToken());

            return;
          } else {
            if (user?.refresh_token && !User.IsGuest()) {
              dispatch(Account.GetRefreshToken(user));
            } else if (User.IsGuest()) {
              localStorage.clear();
              User.Clear(true);
              dispatch({ type: USER.CLEAR });
              dispatch({ type: USER.IS_LOGGED_IN, payload: false });
            }
            Spinner.Hide();
            return;
          }
        }

        if (shouldRetry && apiSet.setSpinner) {
          Spinner.ShowRetry(apiSet.setCancelBtn);
        } else if (shouldRetry && !apiSet.setSpinner) {
          Spinner.Hide();
          dispatch(actionCreator(apiSet.ERROR, friendlyCause));
        } else {
          Spinner.Hide();
        }
        window.GlobalApiWatcher = false;
      });
  };
};

const processRequestQueue = (dispatch, getState, api) => {
  while (requestQueue.length > 0) {
    const request = requestQueue.shift();
    request();
  }
};

const RetryApiRequest = () => {
  return (dispatch) => {
    return dispatch(ExecApiRequest(request.apiSet, request.dto, request.callback));
  };
};

const CancelApiRequest = () => {
  return (dispatch, getState, api) => {
    api.CancelAxiosRequest();
    // dispatch(LoaderAction.Hide());
  };
};

export default ExecApiRequest;

export { ExecApiRequest, RetryApiRequest, CancelApiRequest };
