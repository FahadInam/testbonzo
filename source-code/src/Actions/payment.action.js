import { API_CALLS, USER_SUBSCRIPTION, config } from 'Constants';
import ExecApiRequest from './api.action';
import LZString from 'lz-string';
import { gameDispatch } from 'Utils/ActionCreators';
import { DefaultNav } from 'Navigation/Paths';
import { PageSwitch } from 'Navigation';

export const GetPaymentStatus = ({ competition_id, current_grade, auth_token = null, inquiry_type = 1 }, callback) => {
  // console.log('in call', current_grade.toString(), competition_id);
  const dto = {
    grade: current_grade.toString(),
    competition_id,
    inquiry_type, // TODO: Need to update this
    // vendor_uid: `${config.vendorUID}`, // TODO: Need to update this
  };
  // console.log(auth_token, 'auth_tokenauth_token');
  const header = auth_token ? { auth_token: auth_token } : null;
  // console.log(dto, 'dto');
  // Loader.show()
  return (dispatch) => {
    dispatch(
      ExecApiRequest(
        API_CALLS.PaymentStatus,
        dto,
        (data) => {
          gameDispatch(USER_SUBSCRIPTION.SET_DATA, data);
          if (inquiry_type === 3 && data?.is_subscribed === 1) {
            PageSwitch(DefaultNav.COMPETITIONS);
          }
          if (callback) {
            callback(data);
          }
        },
        header
      )
    );
  };
};

export const ResetFailedAlert = ({ competition_id, current_grade }, callback) => {
  const dto = {
    grade: current_grade.toString(),
    competition_id,
  };
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.ResetAlert, dto, (data) => {
        if (callback) {
          callback(data);
        }
      })
    );
  };
};

export const GetPaymentSubscription = (competition_id, callback) => {
  const dto = {
    competition_id,
  };
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.PaymentSubscription, dto, (data) => {
        //console.log('data', data);
        if (callback) {
          callback(data);
        }
      })
    );
  };
};

export const GetInstitutionPaymentSubscription = (params, callback) => {
  const dto = params || {};
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.InstitutionSubscription, dto, (data) => {
        if (callback) {
          callback(data);
        }
      })
    );
  };
};

export function checkStatus(params) {
  const code = params.get('paycode');
  // console.log(code, "**********");
  if (code) {
    const decompressedData = LZString.decompressFromEncodedURIComponent(code);

    // console.log(decompressedData);
    const dataParams = new URLSearchParams(decompressedData.replace(/@/g, '&'));
    //console.log(dataParams);
    const status = dataParams.get('transtatus');
    if (status === '2' || status === '3') {
      return dataParams;
    }
  }
}

export const getSubDate = (durationMonths, specificDate = null) => {
  const currentDate = specificDate ? new Date(specificDate) : new Date();
  const futureDate = new Date(currentDate);
  futureDate.setMonth(futureDate.getMonth() + durationMonths);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const formattedCurrentDate = `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
  const formattedFutureDate = `${monthNames[futureDate.getMonth()]} ${futureDate.getDate()}, ${futureDate.getFullYear()}`;
  // console.log(formattedCurrentDate, formattedFutureDate, "ddd")
  return {
    currentDate: formattedCurrentDate,
    futureDate: formattedFutureDate,
  };
};

// api.js

export async function bankTransferOrderRequest(data) {
  const url = `${config.apiLMS}api/payment/banktransfer/orderrequest`;

  try {
    // Loader.show();
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add other headers here if needed, for example:
        // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// export const initiatePayment = ({ competition_id }, callback) => {
//   const dto = {
//     competition_id,
//   };
//   return (dispatch) => {
//     dispatch(ExecApiRequest(API_CALLS.PaymentProcess,
//        dto,
//         (data) => {
//           if(callback) {
//               callback(data)

//           }
//     }
//   ));
//   };
// };
export const processDtoPayment = (dto, callback) => {
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.DpoPayment, dto, (data) => {
        //console.log('data', data);
        if (callback) {
          callback(data);
        }
      })
    );
  };
};

export const processSafariPayment = (dto, callback) => {
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.SafaricomPayment, dto, (data) => {
        if (callback) {
          callback(data);
        }
      })
    );
  };
};

export const verifyDtoPayment = (dto, callback) => {
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.DpoPaymentVerification, dto, (data) => {
        if (callback) {
          callback(data);
        }
      })
    );
  };
};

export const verifySafaricomPayment = (dto, callback) => {
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.SafaricomPaymentVerification, dto, (data) => {
        if (callback) {
          callback(data);
        }
      })
    );
  };
};

export const GetSubscriptionDetails = (dto, callback) => {
  // const dto = {
  //   competition_id,
  // };
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.SubscriptionDetails, dto, (data) => {
        //console.log('data', data);
        if (callback) {
          callback(data);
        }
      })
    );
  };
};
export const CancelUserSubscription = (transaction_token, callback) => {
  const dto = {
    transaction_token,
  };
  return (dispatch) => {
    dispatch(
      ExecApiRequest(API_CALLS.CancelSubscription, dto, (data) => {
        if (callback) {
          callback(data);
        }
      })
    );
  };
};

export function getErrorDescription(texts) {
  const errorCodes = {
    100: texts.GATEWAY_ISSUE,
    305: texts.SAFARI_API_ERROR,
    400: texts.FRAUD_DETECTED,
    700: texts.LINK_EXPIRED,
    800: texts.USER_DECLINED,
    900: texts.USER_ALREADY_HAS_SUBSCRIBED,
  };

  // Extract error code from URL
  const url = window.location.href;
  const urlParams = new URL(url);
  const errorCode = urlParams.searchParams.get('epgw_status');

  // Check if the error code exists in our mapping
  if (errorCode && errorCode in errorCodes) {
    return errorCodes[errorCode];
  } else {
    return '';
  }
}
