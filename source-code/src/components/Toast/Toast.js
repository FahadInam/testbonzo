import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Snackbar, useTheme } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { Toast as ToastAction } from 'Actions';
import { ALERT, APP_INTERNAL_MESSAGES } from 'Constants';
import { WriteString } from '../Core';
import useStyles from './style';

const Toast = () => {
  const { type, toastMessage } = useSelector((state) => state.AppControl.toast, shallowEqual);
  const styled = useStyles();
  const { texts } = useTheme();

  const isBottomPosition = toastMessage === APP_INTERNAL_MESSAGES.UNSTABLE_INTERNET;


  if (window.location.href.indexOf('challenge/player') > -1 && !isBottomPosition) {
    return null;
  }

  let message = '';

  switch (toastMessage) {
    case APP_INTERNAL_MESSAGES.GOOGLE_INVALID:
    case APP_INTERNAL_MESSAGES.FACEBOOK_INVALID:
    case APP_INTERNAL_MESSAGES.UNAUTHORIZED_USER_ACCESS:
    case APP_INTERNAL_MESSAGES.DATA_ANOMALY_FOUND:
    case APP_INTERNAL_MESSAGES.CHALLENGE_RESULT_ALREADY_SUBMITTED:
    case APP_INTERNAL_MESSAGES.UNSTABLE_INTERNET:
      message = texts[toastMessage];
      break;
    default:
      message = toastMessage;
      break;
  }

  return (
    <Snackbar
    className={`${styled.root} ${isBottomPosition ? styled.internetToast : ''}`} 
      anchorOrigin={{
        vertical: isBottomPosition ? 'bottom' : 'top',
        horizontal: 'right',
      }}
      open={!!message}
      autoHideDuration={isBottomPosition ? 20000 : (type === ALERT.ERROR ? 10000 : 6000)}
      onClose={ToastAction.Hide}
    >
      <Alert onClose={ToastAction.Hide} className={styled.alert} severity={type && type.toLowerCase()}>
        {isBottomPosition && 
      <p style={{margin: "0px", fontWeight: "600"}}>{texts.UNSTABLE_INTERNET_TITLE}</p>
        }
        <WriteString text={message} />
      </Alert>
    </Snackbar>
  );
};

export default Toast;
