import { useMediaQuery, useTheme } from '@material-ui/core';
import { AccountPopUp } from 'Actions';
import { PageSwitch } from 'Navigation';
import { AccountNav } from 'Navigation/Paths';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import PageStructure from '../shared/PageStructure';
import { ForgotPasswordUI, ForgotPasswordSuccessUI } from './LocalComponent';
import { OTPSendForgotPasswordUI } from './FormStructure';

const ForgotPassword = () => {
  const [requestSubmitted, useRequestSubmitted] = useState(false);
  const [otpEnabled, setOtpEnabled] = useState(false);
  const ShowAccountPopUp = useSelector((state) => state.AppControl.accountPopup, shallowEqual);
  const { texts } = useTheme();
  const isLgOrGreater = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  useEffect(() => {
    // forgot password email
  }, [forgotPasswordEmail]);

  const Callback = () => {
    useRequestSubmitted(true);
    setOtpEnabled(false); // for time being
  };
  const callback = (e) => {
    if (e === 'left-btn') {
      if (ShowAccountPopUp?.type === 'forgotPassword') {
        AccountPopUp.Show({ type: 'signIn', isVisible: true, comingFrom: 'guest', path: window?.location?.pathname });
      } else {
        PageSwitch(AccountNav.LOGIN);
      }
    }
  };
  const leftTitle = texts.BACK_TO_SIGN_IN;
  const forgotPasswordComponent = (
    <ForgotPasswordUI callback={Callback} ShowAccountPopUp={ShowAccountPopUp} setForgotPasswordEmail={setForgotPasswordEmail} />
  );
  return (
    <PageStructure
      headerSet={{
        overrideLeftButton: true,
        callback,
        showRight: false,
        // showLeft: false,
        showLeft: !isLgOrGreater, // Show left button only on mobile screen
        leftTitle,
      }}
      hideLogo={requestSubmitted}
      hideHeader={requestSubmitted}
      Top
    >
      {/* {requestSubmitted ? <ForgotPasswordSuccessUI /> : <ForgotPasswordUI callback={Callback} ShowAccountPopUp={ShowAccountPopUp} />} */}
      {otpEnabled ? (
        requestSubmitted ? (
          <OTPSendForgotPasswordUI callback={Callback} forgotPasswordEmail={forgotPasswordEmail} />
        ) : (
          forgotPasswordComponent
        )
      ) : requestSubmitted ? (
        <ForgotPasswordSuccessUI />
      ) : (
        forgotPasswordComponent
      )}
    </PageStructure>
  );
};

export default ForgotPassword;
