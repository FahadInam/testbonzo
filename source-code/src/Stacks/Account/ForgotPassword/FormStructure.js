import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, useTheme } from '@material-ui/core';
import { Input, Button, H5, ButtonText } from 'Components';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { OnInputChange } from 'Utils';
import Account from 'Actions/account.action';
import CloudflareCaptcha from '../shared/CloudflareCaptcha';
import CustomOtpInput from '../SignUp/CustomOtpInput';
import PageStructure from '../shared/PageStructure';
//import useStyles from './style';
import { ForgotPasswordSuccessUI } from './LocalComponent';
import { PageSwitch } from 'Navigation';
import { AccountNav } from 'Navigation/Paths';
import { SelectedCompetition, Toast } from 'Actions';
import { ALERT, SIGN_UP_USER } from 'Constants';

const FormStructure = ({ Callback, setForgotPasswordEmail }) => {
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [captchaKey, setCaptchaKey] = useState(0);
  const { texts } = useTheme();
  const [user_role, setUser_Role] = useState('');
  const Login_CF = useSelector((state) => state.LoginType.comingFrom, shallowEqual);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const currentComp = SelectedCompetition.Info();
  const [email, setEmail] = useState({
    email: '',
  });
  const dispatch = useDispatch();
  const [turnstileToken, setTurnstileToken] = useState(null);
  const handleTurnstileToken = (token) => {
    setTurnstileToken(token);
    setOtpEnabled(''); // for time being
  };

  const [forgotPassword, setForgotPassword] = useState({
    phone: '',
  });

  useEffect(() => {
    let userRole = '';
    if (Login_CF === 'forLearners') {
      userRole = SIGN_UP_USER.LEARNER;
    } else if (Login_CF === 'forInstitutions') {
      userRole = SIGN_UP_USER.PRINCIPAL;
    }
    if (userRole) {
      setUser_Role(userRole);
    }
  }, [Login_CF]);

  const LocalCallback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    switch (t) {
      case 'recover':
        e.preventDefault();
        if (!turnstileToken) {
          // if turnstileToken is not available/null, show error message
          Toast.Show(`Please complete the CAPTCHA to proceed.`, ALERT.WARNING);
          return;
        }
        if (otpEnabled) {
          setForgotPasswordEmail(email);
          dispatch(Account.OTPSendForgotPassword(email, texts, Callback));
        } else {
          dispatch(Account.ForgotPassword(email, texts, turnstileToken, Callback));
          setCaptchaKey((prevKey) => prevKey + 1);
        }
        break;

      case 'number-send':
        e.preventDefault();
        dispatch(
          Account.OTPSmsSend(
            forgotPassword,
            texts,
            (data) => {
              Toast.Show(`OTP sent successfully`, ALERT.SUCCESS);
              //PageSwitch(AccountNav.VERIFY);
              PageSwitch(AccountNav.VERIFY, {
                phone_number: forgotPassword.phone,
                forgotPassword: true,
                comp_url: currentComp?.item?.url,
              });
            },
            user_role,
            turnstileToken,
            2
          )
        );
        setCaptchaKey((prevKey) => prevKey + 1);
        break;

      case 'email':
        OnInputChange({ name: t, value: e.target.value }, email, setEmail);
        break;
      case 'phone':
        // allow numbers only
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        OnInputChange({ name: t, value: numericValue }, forgotPassword, setForgotPassword);
        break;
      default:
        break;
    }
  };

  const isMobileOTP = Inst_config.is_mobile_otp;

  return (
    <form>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12}>
          {isMobileOTP ? (
            <Grid item xs={12} className="position-relative">
              {/* flag image */}
              <Box
                sx={{
                  position: 'absolute',
                  left: '15px',
                  display: 'flex',
                  top: '50px',
                  alignItems: 'center',
                  zIndex: 1,
                }}
              >
                <Typography variant="body1" className="poppins-font-600 country_code_text" align="left">
                  +254
                </Typography>
              </Box>
              {/* flag image */}
              <Input
                label={texts.PHONE_LABEL}
                labelFontSize="16px"
                value={forgotPassword.phone}
                placeholder={texts.ENTER_PHONE}
                type={'tel'} // allows numeric input only
                tag="phone"
                key="1"
                className={'phone_input'}
                onChange={LocalCallback}
                disabled={false}
              />
            </Grid>
          ) : (
            <Input label={texts.EMAIL} placeholder={texts.ENTER_EMAIL} tag="email" onChange={LocalCallback} />
          )}
        </Grid>
        <Grid item xs={12}>
          {/* shouldCleanUp={false} */}
          {!otpEnabled && (
            <CloudflareCaptcha
              getTurnstileToken={handleTurnstileToken}
              captchaKey={captchaKey}
              className="forgot-password-captcha custom-width"
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            //disabled={turnstileToken == null && !otpEnabled}
            className={turnstileToken == null && !otpEnabled ? 'disabledStyle' : 'signupBtn'}
            background="#02BBFE"
            borderRadius={15}
            width="100%"
            m={0}
            //tag="recover"
            tag={isMobileOTP ? 'number-send' : 'recover'}
            type="submit"
            onClick={LocalCallback}
          >
            <ButtonText color="#fff" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
              {/* {texts.SEND_RESET_LINK} */}
              {isMobileOTP ? texts.NEXT : texts.SEND_RESET_LINK}
            </ButtonText>
          </Button>
        </Grid>
      </Grid>

      {/* <Box textAlign="center">
        <Input label={texts.EMAIL} tag="email" onChange={LocalCallback} autoFocus />
      </Box>
      {!otpEnabled && (
        <Box m={2} textAlign="center">
          <CloudflareCaptcha getTurnstileToken={handleTurnstileToken} className="forgot-password-captcha" />
        </Box>
      )}
      <Box m={2} textAlign="center">
        <Button
          disabled={turnstileToken == null && !otpEnabled}
          tag="recover"
          type="submit"
          onClick={LocalCallback}
          startIcon={<i className="i i-enter" />}
        >
          {texts.RECOVER_PASSWORD}
        </Button>
      </Box> */}
    </form>
  );
};
export default FormStructure;

export const OTPSendForgotPasswordUI = ({ Callback, forgotPasswordEmail }) => {
  const dispatch = useDispatch();
  const { texts } = useTheme();
  //const styled = useStyles();
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [otpValueSubmit, setOtpValueSubmit] = useState(false);
  const [userId, setUserId] = useState('');
  const [successUI, setSuccessUI] = useState(false);
  const [resetPassword, setResetPassword] = useState({
    password: '',
    reenterPassword: '',
  });

  const handleOtpInputChange = (value) => {
    setOtpValue(value);
    setOtpEnabled(false);
  };
  const localCallback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    switch (t) {
      case 'recover':
        e.preventDefault();
        if (otpEnabled) {
          dispatch(
            Account.OTPVerify(forgotPasswordEmail, otpValue, texts, function (data) {
              if (data) {
                setUserId(data.user_id);
                setOtpValueSubmit(true);
              }
            })
          );
        }
        break;
      case 'password':
      case 'reenterPassword':
        OnInputChange({ name: t, value: e.target.value }, resetPassword, setResetPassword);
        break;
      case 'reset':
        dispatch(
          Account.OTPRecoverPassword(resetPassword, userId, otpValue, texts, function (data) {
            if (data) {
              setSuccessUI(true);
            }
          })
        );

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // console.log('user-ID', userId);
  }, [userId]);

  return (
    <>
      <PageStructure
        headerSet={{
          showRight: false,
          showLeft: false,
        }}
        hideLogo={successUI}
      >
        {otpValueSubmit ? (
          <>
            {successUI ? (
              <>
                <ForgotPasswordSuccessUI />
              </>
            ) : (
              <>
                <H5 m={2} textAlign="center">
                  {texts.RESET_PASSWORD}
                </H5>
                <Input type="password" label={texts.ENTER_PASSWORD} tag="password" key="2" onChange={localCallback} />
                <Input type="password" label={texts.REENTER_PASSWORD} tag="reenterPassword" key="3" onChange={localCallback} />
                <Box m={2} textAlign="center">
                  <Button tag="reset" type="submit" onClick={localCallback} startIcon={<i className="i i-enter" />}>
                    {texts.RESET_PASSWORD}
                  </Button>
                </Box>
              </>
            )}
          </>
        ) : (
          <>
            <H5 m={2} textAlign="center">
              {texts.VERIFICATION_CODE_SENT_TEXT}
            </H5>
            <CustomOtpInput onInputChange={handleOtpInputChange} />
            <Box m={2} textAlign="center">
              <Button tag="recover" type="submit" onClick={localCallback} startIcon={<i className="i i-enter" />}>
                {texts.RECOVER_PASSWORD}
              </Button>
            </Box>
          </>
        )}
      </PageStructure>
    </>
  );
};
