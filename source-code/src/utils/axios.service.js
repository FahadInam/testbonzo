import axios from 'axios';
import { API_ERRORS, config } from 'Constants';
import configurations from 'Constants/instance.config';
import { InternetConnection } from 'Utils';

let source;
let parallelCallSources = [];
let axiosConfig;
let failureActionDispatchTimer = null;

const axiosInstance = axios.create({ timeout: config.ApiTimeout });

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      axiosConfig = {};
      source = null;
    }
    return response;
  },
  (error) => {
    axiosConfig = error.config;
    return new Promise((resolve, reject) => {
      clearTimeout(failureActionDispatchTimer);
      failureActionDispatchTimer = setTimeout(() => {
        reject(error);
      }, 350);
    });
  }
);

const RetryAxiosRequest = () => {
  return axiosInstance.request(axiosConfig);
};

const CancelAxiosRequest = () => {
  if (!source) return;
  source.cancel(API_ERRORS.CANCELLED);
  source = null;
};

const ClearParallelCallSources = () => {
  parallelCallSources = [];
};

const CancelAllPendingRequests = () => {
  for (let i = 0; i < parallelCallSources.length; i++) {
    parallelCallSources[i].CancelAxiosRequest(API_ERRORS.CANCELLED);
  }
  ClearParallelCallSources();
};

const ExecuteAxiosRequest = (apiSet, dto, publicHeaders, isParallelRequestAllowed = false) => {
  // console.log(publicHeaders, "publicHeaders", apiSet)
  const { isGet, isAuthenticationReq, api, from } = apiSet;
  if (!InternetConnection.GetConnection()) {
    InternetConnection.ShowStatus();
    return new Promise((success, reject) => {
      reject(new Error({ request: API_ERRORS.NO_INTERNET }));
    });
  }

  if (apiSet.api === 'token/refresh' || apiSet.api === 'user/payment/status' || apiSet.api === 'instance/config') {
    isParallelRequestAllowed = true;
  }

  let headers = {};
  let AxiosConfig = {};
  // const url = config.ApiUrl[from] + config.ApiDirectory + api; for multiple sources
  const url = config.ApiUrl[from] + config.ApiDirectory + api;
  const updatedDto = { ...dto };

  // Retrieve the stored configuration from localStorage
  const configData = JSON.parse(localStorage.getItem('config', config));

  let platform_instance_id = configData && configData?.instance_id;
  // console.log(platform_instance_id);

  if (!platform_instance_id) {
    const domain = window.location.hostname;

    // Find the matching platform_instance_id
    for (const { domain_name, instance_id } of Object.values(configurations)) {
      if (domain.includes(domain_name)) {
        platform_instance_id = instance_id;
        break;
      }
    }
  }

  // platform_instance_id = 3;
  if (isAuthenticationReq) {
    // updatedDto.session_id = publicHeaders.session_id;

    // if (apiSet !== API_CALLS.GetUserPremiumStatus && apiSet !== API_CALLS.SetUserPayment) updatedDto.user_id = publicHeaders.user_id;
    if (apiSet.api === 'token/refresh') {
      let authorizationHeader = ' ';
      if (publicHeaders?.header?.Authorization) {
        authorizationHeader = `${publicHeaders?.header?.Authorization}`;
      } else {
        authorizationHeader = `Bearer ${publicHeaders.refresh_token}`;
      }
      headers = {
        // ApiAuthenticationToken: publicHeaders.ApiAuthenticationToken,
        Authorization: authorizationHeader,
        // userId: publicHeaders.UserId,
        'Cache-Control': 'no-cache',
      };
    } else {
      headers = {
        // ApiAuthenticationToken: publicHeaders.ApiAuthenticationToken,
        Authorization: `Bearer ${publicHeaders.auth_token}`,
        instance_id: platform_instance_id,
        // userId: publicHeaders.UserId,
        'Cache-Control': 'no-cache',
      };
    }
  } else {
    headers = {
      instance_id: platform_instance_id,
    };
  }

  if (isParallelRequestAllowed) {
    parallelCallSources.push(axios.CancelToken.source());
  } else {
    CancelAxiosRequest();
    source = axios.CancelToken.source();
  }

  // if(API_ERRORS.UNAUTHORIZED){
  //   console.log('unauthorized...')
  // }

  const cancelToken = isParallelRequestAllowed ? parallelCallSources[parallelCallSources.length - 1].token : source.token;

  AxiosConfig = {
    method: isGet ? 'GET' : 'POST',
    params: isGet ? { ...dto } : {},
    data: isGet ? {} : { ...updatedDto },
    url,
    headers,
    cancelToken,
  };
  return axiosInstance(AxiosConfig);
};

const apiService = {
  ExecuteAxiosRequest,
  CancelAxiosRequest,
  RetryAxiosRequest,
  CancelAllPendingRequests,
  ClearParallelCallSources,
};

export default apiService;
