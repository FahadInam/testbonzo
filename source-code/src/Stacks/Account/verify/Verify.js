import React, { useState, useEffect } from 'react';
import { Box, Grid, IconButton, makeStyles, styled, Tooltip, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { ALERT, IMAGES, SIGN_UP_USER, USER_TYPE, config } from 'Constants';
import { Account, AppControl, Toast, User } from 'Actions';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { parseSearchURL, encodeDecode, validatePassword, OnInputChange, getInstanceType } from 'Utils';
import { PageSwitch } from 'Navigation';
import DefaultNav from 'Navigation/Paths/defaultNav.constants';
import { useHistory } from 'react-router-dom';
import PageStructure from '../shared/PageStructure';
import AccountFooter from '../shared/AccountFooter';
import { Body1, Button, ButtonText, H5, Input, Subtitle2 } from 'Components';
import CloudflareCaptcha from '../shared/CloudflareCaptcha';
import { InlineButton } from 'Components/Core/Button';
import { AccountNav } from 'Navigation/Paths';
import { CheckCircle, Visibility, VisibilityOff, WarningSharp } from '@material-ui/icons';
import { INSTANCES_ID } from 'Constants/instance.config';

const useStyles = makeStyles((theme) => ({
  password_msg: {
    fontSize: '13px',
    color: theme.palette.common.bonzoLight,
    fontFamily: 'poppins',
    fontWeight: '400',
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    marginTop: '-2px',
  },
  password_input: {
    marginTop: '12px',
    height: '112px',
    opacity: '100',
    overflow: 'hidden',
    transition: `all 550ms cubic-bezier(0.44, 0, 0.43, 1)`,
  },
  password_hide: {
    height: '1px',
    overflow: 'hidden',
    opacity: '0',
    transition: `all 550ms cubic-bezier(0.44, 0, 0.43, 1)`,
  },
}));

const PasswordCriteriaTooltip = () => {
  const { texts } = useTheme();
  return (
    <>
      <Typography variant="subtitle2" component="div">
        {texts.PASSWORD_CRITERIA_RULE_TITLE}
      </Typography>
      <Typography variant="body2" component="div">
        {texts.PASSWORD_CRITERIA_RULE_ONE}
      </Typography>
      <Typography variant="body2" component="div">
        {texts.PASSWORD_CRITERIA_RULE_TWO}
      </Typography>
      <Typography variant="body2" component="div">
        {texts.PASSWORD_CRITERIA_RULE_THREE}
      </Typography>
      <Typography variant="body2" component="div">
        {texts.PASSWORD_CRITERIA_RULE_FOUR}
      </Typography>
      <Typography variant="body2" component="div">
        {texts.PASSWORD_CRITERIA_RULE_FIVE}
      </Typography>
    </>
  );
};

const Verify = () => {
  const socialSignup = useSelector((state) => state.AppControl.socialSignup, shallowEqual);
  const ShowAccountPopUp = useSelector((state) => state.AppControl.accountPopup, shallowEqual);
  const Landing_CF = useSelector((state) => state.LoginType.comingFromLanding, shallowEqual);
  const { texts } = useTheme();
  const Login_CF = useSelector((state) => state.LoginType.comingFrom, shallowEqual);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isMobileOTP = Inst_config.is_mobile_otp;
  const [typeSelected, setTypeSelected] = useState(0);
  const comingFrom = parseSearchURL();
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);

  const friendID = parseSearchURL();

  if (friendID.friends_id) {
    config.friend_id = parseInt(encodeDecode('dec', friendID.friends_id), 10);
  }

  if (comingFrom.cf === 'sitarey') {
    config.cf_sitarey = 1;
  }

  const isLgOrGreater = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  useEffect(() => {
    setTypeSelected(socialSignup ? 1 : 0);
  }, [setTypeSelected, socialSignup]);

  let showLogo = true;
  if (typeSelected === 0) {
    // UI = <SignupTypeUI callback={callback} step={typeSelected} socialSignup={socialSignup} ShowAccountPopUp={ShowAccountPopUp} />;
  } else if (typeSelected === 1 || typeSelected === 2 || typeSelected === 3) {
    // UI = <SignUpUI callback={callback} step={typeSelected} socialSignup={socialSignup} />;
  } else {
    // UI = <SignUpSuccessUI />;
    showLogo = false;
  }

  let leftTitle;
  if (typeSelected === 1) {
    leftTitle = texts.SIGN_UP;
  }
  if (typeSelected === 2) {
    leftTitle = texts.EMAIL;
  }

  if (Login_CF !== 'signUp' && Login_CF !== 'login') {
    if (Landing_CF) {
      leftTitle = texts.HOME;
    } else leftTitle = texts.BACK;
  } else {
    leftTitle = texts.HOME;
  }

  const backButtonCallback = () => {
    //  console.log('BACK');
    if (leftTitle === 'Back') {
      if (window.location.href.includes('cf=sitarey')) {
        PageSwitch(DefaultNav.PROGRAM_LAUNCH);
      } else {
        AppControl.SetLoginType(false);
        AppControl.SetLoginComingFrom('login');
      }
    } else {
      if (Inst_config.navigate_to_public_route) {
        window.location.href = Inst_config.account_back_url;
      } else {
        PageSwitch(Inst_config.account_back_url);
      }
    }
  };

  // Determine if the current user is a guest and the device is mobile
  const isGuestUserOnMobile = (!User.IsLoggedInUser() && User.IsGuest()) || isShupavu;

  return (
    <PageStructure
      headerSet={{
        overrideLeftButton: true,
        showRight: false,
        showLeft: !isLgOrGreater && isGuestUserOnMobile, // Show left button only on mobile screen
        showCenter: true,
        leftTitle,
        callback: backButtonCallback,
      }}
      // hideHeader={!showHeader}
      hideLogo={!showLogo}
    >
      {isMobileOTP ? <VerifyMobileOtp /> : <VerifyEmail />}
      {Login_CF !== 'signUp' && Login_CF !== 'login' && <AccountFooter fromLogin={false} ShowAccountPopUp={ShowAccountPopUp} />}
    </PageStructure>
  );
};

export default Verify;

export const VerifyEmail = () => {
  const [captchaKey, setCaptchaKey] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState({});
  const [isResend, setIsResend] = useState(false);
  const { texts } = useTheme();
  const directLaunchData = useSelector((state) => state.AppControl.url, shallowEqual);
  const Login_CF = useSelector((state) => state.LoginType.comingFrom, shallowEqual);

  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);

  useEffect(() => {
    setData({ email: history.location.state?.email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let userRole = '';
  if (Login_CF === 'forLearners') {
    userRole = SIGN_UP_USER.LEARNER;
  } else if (Login_CF === 'forInstitutions') {
    userRole = SIGN_UP_USER.PRINCIPAL;
  }

  const handleTurnstileToken = (token) => {
    dispatch(Account.SignupRequest(data, texts, directLaunchData, userRole, token, true));
    setIsResend(false);
    setCaptchaKey((prevKey) => prevKey + 1);
  };

  const resendEmail = () => {
    setIsResend(true);
  };

  const CloseWindow = () => {
    if (isGlobalClimate) {
      PageSwitch(DefaultNav.PROGRAM_GLC);
    } else {
      PageSwitch(DefaultNav.MAIN);
    }
  };

  return (
    <div style={{ width: '100%', padding: '0px 40px' }}>
      <H5 fontWeight="500" fontSize="24px" color="#313644">
        {texts.VERIFY_YOU_ACCOUNT}
      </H5>

      <Box>
        <div style={{ paddingTop: '20px' }}>
          <Body1 fontSize="15px" styleCSS={{ fontWeight: '400', fontFamily: 'Poppins' }}>
            {texts.EMAIL_SENT_MESSAGE} <br />
            <span style={{ fontWeight: '600' }}>{data?.email}.</span> <br />
            {texts.CHECK_INBOX_FOR_SETUP}
          </Body1>
        </div>
        <div style={{ paddingTop: '20px' }}>
          <Body1 fontSize="15px" styleCSS={{ fontWeight: '400', fontFamily: 'Poppins' }}>
            {texts.EMAIL_NOT_FOUND}
            <span onClick={resendEmail} style={{ fontWeight: '600', textDecoration: 'underline', cursor: 'pointer' }}>
              {' '}
              {texts.EMAIL_RESEND}
            </span>{' '}
            <br />
          </Body1>
        </div>
        {isResend && (
          <div style={{ paddingTop: '16px' }}>
            <Grid item xs={12}>
              <CloudflareCaptcha getTurnstileToken={handleTurnstileToken} className="custom-width" captchaKey={captchaKey} />
            </Grid>
          </div>
        )}
      </Box>

      <Button
        //disabled={turnstileToken == null}
        className={'signupBtn'}
        styleCSS={{ marginTop: isResend ? '18px' : '24px' }}
        m={0}
        width="100%"
        tag="next-step"
        type="submit"
        background="#02BBFE"
        fontWeight="700"
        borderRadius={15}
        onClick={() => {
          CloseWindow();
        }}
      >
        <ButtonText color="#FFF" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
          {texts.CLOSE_THIS_WINDOW}
        </ButtonText>
      </Button>
    </div>
  );
};

export const VerifyMobileOtp = () => {
  const [captchaKey, setCaptchaKey] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const { texts } = useTheme();
  const directLaunchData = useSelector((state) => state.AppControl.url, shallowEqual);
  const Login_CF = useSelector((state) => state.LoginType.comingFrom, shallowEqual);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const [signup, setSignup] = useState({
    password: '',
    otp: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [timer, setTimer] = useState(30); // Initial timer set to 30 seconds
  const [isDisabled, setIsDisabled] = useState(true); // Initially disabled
  const [createButtonDisabled, setCreateButtonDisabled] = useState(false); // Initially disabled
  const [clickCount, setClickCount] = useState(0); // Track user clicks
  const state = history.location.state;
  const phone_number = state?.phone_number;
  const comp_url = state?.comp_url;
  const user_id = state?.user_id;
  const forgotPassword = state?.forgotPassword;
  const message = signup.password.length > 0 && validatePassword(signup.password);

  const isMobileOTP = Inst_config.is_mobile_otp;
  const style = useStyles();
  const [otpToken, setOtpToken] = useState('');

  useEffect(() => {
    if (state?.otp) {
      OnInputChange({ name: 'otp', value: state?.otp }, signup, setSignup);
      setIsOtpVerified(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Utility function to format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  // Timer countdown logic
  useEffect(() => {
    if (!isOtpVerified) {
      if (timer > 0) {
        const countdown = setTimeout(() => setTimer(timer - 1), 1000);
        return () => clearTimeout(countdown);
      } else {
        setIsDisabled(false); // Enable button when timer ends
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  let userRole = '';
  if (Login_CF === 'forLearners') {
    userRole = SIGN_UP_USER.LEARNER;
  } else if (Login_CF === 'forInstitutions') {
    userRole = SIGN_UP_USER.PRINCIPAL;
  }

  const handleOTPTurnstileToken = (token) => {
    setOtpToken(token);
  };

  if (isMobileOTP) {
  }

  const localCallback = (e) => {
    const t = e?.currentTarget?.getAttribute('data-tag') || e?.target?.name || e;
    // console.log('t...', t);
    switch (t) {
      case 'password':
      case 'otp':
        OnInputChange({ name: t, value: e.target.value }, signup, setSignup);
        break;
      case 'create-account':
        let userType = USER_TYPE.Normal;
        const domain = window.location.hostname;
        if (isMobileOTP) {
          userRole = SIGN_UP_USER.LEARNER;
          console.log(domain, Inst_config.safaricom_domain, 'DOMAIN');
          if (domain.includes(Inst_config.safaricom_domain)) {
            userType = USER_TYPE.Safaricom;
          }
        }
        const compName = localStorage.getItem('compName');
        dispatch(
          Account.SignupOTP(
            { password: signup.password, phone_number },
            texts,
            directLaunchData,
            userRole,
            otpToken,
            compName,
            isMobileOTP,
            userType,
            () => {
              setCreateButtonDisabled(true);
            }
          )
        );
        break;
      case 'forgot-password':
        let DTO = {
          user_id: user_id,
          password: signup.password,
          otpValue: signup.otp,
          phone_number,
        };
        dispatch(
          Account.RecoverPassword(
            DTO,
            texts,
            function (data) {
              if (data) {
                Toast.Show(texts.PASSWORD_CHANGED_SUCCESS, ALERT.SUCCESS);
              }
            },
            directLaunchData,
            isMobileOTP,
            comp_url
          )
        );
        break;
      default:
        break;
    }
  };

  const verifyAccount = () => {
    if (isOtpVerified) {
      if (forgotPassword) {
        localCallback('forgot-password');
      } else {
        localCallback('create-account');
      }
    } else {
      dispatch(
        Account.VerifyOTP(phone_number, signup.otp, texts, function (data) {
          if (data) {
            setIsOtpVerified(true);
            PageSwitch(AccountNav.VERIFY, {
              phone_number,
              otp: signup.otp,
              forgotPassword: forgotPassword ?? false,
              user_id: data?.user_id,
              comp_url: comp_url,
              isOtpVerified: true,
            });
            setIsOtpVerified(true);
          }
        })
      );
    }
  };

  const resendOtp = () => {
    if (otpToken) {
      dispatch(
        Account.OTPSmsSend(
          { phone: phone_number },
          texts,
          (data) => {
            setOtpToken('');
            Toast.Show(`OTP sent successfully`, ALERT.SUCCESS);
          },
          null,
          otpToken,
          forgotPassword ? 2 : 1
        )
      );
    }
  };

  // Handle button click
  const handleResendOtp = () => {
    if (!isDisabled) {
      setCaptchaKey((prevKey) => prevKey + 1);
      resendOtp(); // Call the resend OTP function
      setClickCount(clickCount + 1);
      setIsDisabled(true); // Disable button after click

      // Set timer based on click count
      if (clickCount === 0) {
        setTimer(120); // 2 minutes
      } else if (clickCount === 1) {
        setTimer(300); // 5 minutes
      } else {
        setTimer(300); // Repeat 5 minutes
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const tooltipText = <PasswordCriteriaTooltip />;

  const CustomTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
    [`& .MuiTooltip-tooltip`]: {
      backgroundColor: '#eaedf8',
      color: 'black',
      boxShadow: theme.shadows[1],
      fontSize: 10,
      padding: theme.spacing(1),
      border: '1px solid #dadde9',
      maxWidth: 270,
    },
  }));

  return (
    <div style={{ width: '100%', padding: '0px 40px' }}>
      <H5 fontWeight="500" fontSize="24px" color="#313644" className={isMobileOTP ? 'shupavu_confirm_text' : ''}>
        {texts.CONFIRM_YOUR_NUMBER}
      </H5>

      <Box>
        <Grid item xs={12}>
          <Input
            label={texts.OTP_CODE}
            labelFontSize="16px"
            placeholder={texts.ENTER_CODE_SENT_TEXT}
            type="number"
            className={'otp_input'}
            disabled={isOtpVerified ? true : false}
            value={signup.otp}
            end={isOtpVerified ? <img src={IMAGES.GREEN_CHECK} alt="Uploaded" /> : ''}
            tag="otp"
            onChange={localCallback}
            autoComplete
          />
        </Grid>

        {!isOtpVerified && (
          <Grid item container justifyContent="flex-end">
            <InlineButton
              styleCSS={{
                opacity: isDisabled || otpToken === '' ? 0.5 : 1,
                pointerEvents: isDisabled || otpToken === '' ? 'none' : 'auto',
                cursor: isDisabled ? 'default' : '',
              }}
              onClick={handleResendOtp}
              disabled={isDisabled}
            >
              <Subtitle2 fontSize="14px" fontWeight="500" color="#313644">
                {isDisabled ? `Resend in ${formatTime(timer)}` : texts.RESEND_CODE}
              </Subtitle2>
            </InlineButton>
          </Grid>
        )}
        <Grid item xs={12} className={isOtpVerified ? style.password_input : style.password_hide}>
          <Input
            type={showPassword ? 'text' : 'password'}
            label={forgotPassword ? texts.NEW_PASSWORD : texts.PASSWORD}
            placeholder={forgotPassword ? texts.ENTER_NEW_PASSWORD : texts.PASSWORD}
            labelFontSize="16px"
            tag="password"
            key="2"
            onChange={localCallback}
            end={
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end" color="secondary">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            }
          />
          <Body1
            styleCSS={{
              color: message === 'Weak password' ? '#f57c00' : message === 'Medium strength password' ? '#f57c00' : '#388e3c',
            }}
            className={style.password_msg}
          >
            {message && (
              <>
                {message === 'Strong password' ? (
                  <CheckCircle fontSize="small" style={{ fontSize: '16px' }} />
                ) : (
                  <CustomTooltip title={tooltipText}>
                    <WarningSharp fontSize="small" style={{ fontSize: '16px' }} />
                  </CustomTooltip>
                )}
                {message}
              </>
            )}
          </Body1>
        </Grid>
        {isOtpVerified || !isDisabled ? (
          <Grid item xs={12}>
            <CloudflareCaptcha getTurnstileToken={handleOTPTurnstileToken} className="custom-width" captchaKey={captchaKey} />
          </Grid>
        ) : (
          ''
        )}
      </Box>

      <Button
        disabled={createButtonDisabled}
        className={'signupBtn'}
        styleCSS={{ marginTop: '24px' }}
        m={0}
        width="100%"
        tag="next-step"
        type="submit"
        background="#02BBFE"
        fontWeight="700"
        borderRadius={15}
        onClick={() => {
          verifyAccount();
        }}
      >
        <ButtonText color="#FFF" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
          {!isOtpVerified
            ? texts.VERIFY
            : isOtpVerified && !forgotPassword
            ? texts.CREATE_ACCOUNT
            : forgotPassword
            ? texts.CONTINUE
            : texts.CLOSE_THIS_WINDOW}
        </ButtonText>
      </Button>
    </div>
  );
};
