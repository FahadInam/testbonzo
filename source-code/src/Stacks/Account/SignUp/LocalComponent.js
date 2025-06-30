import React, { useEffect, useState } from 'react';
import { useTheme, Box, Grid, IconButton, makeStyles, Tooltip, Typography, styled } from '@material-ui/core';
import { Button, Body1, H2, H5, Input, ButtonText } from 'Components';
import { InlineButton } from 'Components/Core/Button';
import { PageSwitch } from 'Navigation';
import AccountNav from 'Navigation/Paths/account.constants';
import Account from 'Actions/account.action';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import WebSocialLogin from 'Components/SocialLogin/WebSocialLogin';
import MobileSocialLogin from 'Components/SocialLogin/MobileSocialLogin';
import OsProperties from 'Utils/OsProperties';
import SignUpForm, { SignUpFormCircles } from './SignUpForm';
import { getInstanceType, OnInputChange, validatePassword } from 'Utils';
import UserTypeSelection from '../UserTypeSelection';
import { AppControl, SelectedCompetition, Toast, User } from 'Actions';
import { ALERT, SIGN_UP_USER } from 'Constants';
import CloudflareCaptcha from '../shared/CloudflareCaptcha';
import { CheckCircle, Visibility, VisibilityOff, WarningSharp } from '@material-ui/icons';
import LZString from 'lz-string';
import { GetInstanceConfig } from 'Actions/config.action';
import { DefaultNav } from 'Navigation/Paths';
import { INSTANCES_ID } from 'Constants/instance.config';
import { initGoogleAdsTracking, trackConversion } from 'Utils/GoogleAdsTracker';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  orStyle: {
    padding: 0,
  },
  boxStyle: {},
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
  privacyText: {
    color: theme.palette.common.gray,
    fontSize: '13px',
    fontWeight: '500 !important',
    marginTop: '10px',
    textAlign: 'center',
    '& a': {
      color: theme.palette.common.bonzoLightButton,
      textDecoration: 'none',
    },
  },
  linkStyle: {
    background: 'transparent',
    color: '#02B5F5',
    textDecoration: 'none',
    border: '0',
    padding: '0',
  },
  linkTextStyle: {
    textDecoration: 'none',
    cursor: 'pointer',
  },
}));

export const SignupTypeUI = ({ callback, ShowAccountPopUp, socialSignup, step }) => {
  const classes = useStyles();
  const { texts } = useTheme();
  const dispatch = useDispatch();
  const directLaunchData = useSelector((state) => state.AppControl.url, shallowEqual);
  const Login_Type = useSelector((state) => state.LoginType.is_inst_based, shallowEqual);
  const Login_CF = useSelector((state) => state.LoginType.comingFrom, shallowEqual);
  const competitionStr = useSelector((state) => state.Competition, shallowEqual);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const Instance_config = useSelector((state) => state.GetInstanceConfig, shallowEqual);
  const selectedComp = SelectedCompetition.StrToObj(competitionStr);
  const [paramName, setParamName] = useState('');
  const [paramIndex, setParamIndex] = useState('');
  const isAuthUser = User.IsLoggedInUser();
  const isGuest = User.IsGuest();
  const [compressName, setCompressName] = useState('');
  const [user_role, setUser_Role] = useState('');
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);
  const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);
  const competition_name = isAuthUser && isGuest && selectedComp?.item?.url ? selectedComp?.item?.url : '';
  const searchParams = new URLSearchParams(window.location.search);
  const change_code = searchParams.get('change_code');
  const index = searchParams.get('index');
  const role = !Inst_config?.principal_enabled ? 'learner' : searchParams.get('role');
  const c_name = searchParams.get('c_name');

  const isMobileOTP = Inst_config.is_mobile_otp;

  useEffect(() => {
    if (!Instance_config) {
      dispatch(GetInstanceConfig({}, texts));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Instance_config]);

  useEffect(() => {
    // Parse URL query parameters

    if (role) {
      setUser_Role(role);
    }
    if (c_name) {
      const decompressedData = LZString.decompressFromEncodedURIComponent(c_name);
      setCompressName(decompressedData);
    }

    setParamName(change_code);
    setParamIndex(index);

    // Update AppControl based on 'type' parameter
    const type = searchParams.get('type');
    if (type) {
      AppControl.SetLoginType(false);
      AppControl.SetLoginComingFrom(type === 'learner' ? 'forLearners' : 'forInstitutions');
      AppControl.SetSignUpComingFrom(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Runs once on component mount

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

  useEffect(() => {
    if (isShupavu) {
      initGoogleAdsTracking();
      // Track page visit conversion
      trackConversion();
    }
  }, [isShupavu]);

  const checkDirectLaunch = directLaunchData?.id ? false : true;

  const [signup, setSignup] = useState({
    email: socialSignup ? socialSignup.email : '',
    password: '',
    phone: '',
  });

  const [turnstileToken, setTurnstileToken] = useState(null);
  const handleTurnstileToken = (token) => {
    setTurnstileToken(token);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [captchaKey, setCaptchaKey] = useState(0);
  const [signupButtonDisabled, setSignupButtonDisabled] = useState(false); // Initially disabled

  const message = signup.password.length > 0 && validatePassword(signup.password);

  const webSocialLoginProps = {
    texts: texts,
    autoLogin: false,
    checkDirectLaunch: checkDirectLaunch,
    directLaunchData: directLaunchData,
    ...((Login_CF === 'forLearners' || (role === 'learner' && !Inst_config?.principal_enabled)) && { publicLogin: true }),
  };

  const localCallback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    switch (t) {
      case 'next-step':
        e.preventDefault();
        if (Instance_config?.is_2fa_enabled === 0) {
          dispatch(
            Account.Signup(signup, texts, directLaunchData, user_role, turnstileToken, isMobileOTP, () => {
              setSignupButtonDisabled(true);
            })
          );
          setCaptchaKey((prevKey) => prevKey + 1);
        } else {
          if (paramName) {
            dispatch(
              Account.SignupVerify(
                signup,
                texts,
                directLaunchData,
                user_role,
                turnstileToken,
                paramName,
                paramIndex,
                compressName,
                isMobileOTP,
                () => {
                  setSignupButtonDisabled(true);
                }
              )
            );
            setCaptchaKey((prevKey) => prevKey + 1);
          } else {
            dispatch(Account.SignupRequest(signup, texts, directLaunchData, user_role, turnstileToken, null, competition_name));
            setCaptchaKey((prevKey) => prevKey + 1);
          }
        }
        break;
      case 'number-send':
        dispatch(
          Account.OTPSmsSend(
            signup,
            texts,
            (data) => {
              Toast.Show(`OTP sent successfully`, ALERT.SUCCESS);
              PageSwitch(AccountNav.VERIFY, { phone_number: signup.phone, t_token: turnstileToken });
            },
            user_role,
            turnstileToken,
            1
          )
        );
        setCaptchaKey((prevKey) => prevKey + 1);
        break;
      case 'email':
      case 'password':
        OnInputChange({ name: t, value: e.target.value }, signup, setSignup);
        break;
      case 'phone':
        // allow numbers only
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        OnInputChange({ name: t, value: numericValue }, signup, setSignup);
        break;
      case 'facebook':
        break;
      case 'google':
        PageSwitch(AccountNav.SIGN_UP);
        break;
      case 'withEmail':
        callback('withEmail');
        break;
      case 'guest-entry':
        break;
      case 'as-learner':
        if (User.IsGuest() && !User.IsLoggedInUser()) {
          PageSwitch(AccountNav.SIGN_UP);
        }
        AppControl.SetLoginType(false);
        AppControl.SetLoginComingFrom('forLearners');
        break;
      case 'as-institute':
        if (User.IsGuest() && !User.IsLoggedInUser()) {
          PageSwitch(AccountNav.SIGN_UP);
        }
        AppControl.SetLoginType(true);
        AppControl.SetLoginComingFrom('forInstitutions');
        break;
      default:
        break;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isMobileOTP) {
        dispatch(
          Account.OTPSmsSend(
            signup,
            texts,
            (data) => {
              Toast.Show(`OTP sent successfully`, ALERT.SUCCESS);
              PageSwitch(AccountNav.VERIFY, { phone_number: signup.phone, t_token: turnstileToken });
            },
            user_role,
            turnstileToken,
            1
          )
        );
        setCaptchaKey((prevKey) => prevKey + 1);
      } else {
        if (Instance_config?.is_2fa_enabled === 0) {
          dispatch(
            Account.Signup(signup, texts, directLaunchData, user_role, turnstileToken, isMobileOTP, () => {
              setSignupButtonDisabled(true);
            })
          );
          setCaptchaKey((prevKey) => prevKey + 1);
        } else {
          if (paramName) {
            dispatch(
              Account.SignupVerify(
                signup,
                texts,
                directLaunchData,
                user_role,
                turnstileToken,
                paramName,
                paramIndex,
                compressName,
                isMobileOTP,
                () => {
                  setSignupButtonDisabled(true);
                }
              )
            );
            setCaptchaKey((prevKey) => prevKey + 1);
          } else {
            dispatch(Account.SignupRequest(signup, texts, directLaunchData, user_role, turnstileToken, null, competition_name));
            setCaptchaKey((prevKey) => prevKey + 1);
          }
        }
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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

  const tooltipText = (
    <>
      <Typography variant="subtitle2" component="div">
        Strong Password Criteria:
      </Typography>
      <Typography variant="body2" component="div">
        Password length must be minimum 8 characters long.
      </Typography>
      <Typography variant="body2" component="div">
        Contains at least one uppercase letter.
      </Typography>
      <Typography variant="body2" component="div">
        Contains at least one lowercase letter.
      </Typography>
      <Typography variant="body2" component="div">
        Contains at least one digit.
      </Typography>
      <Typography variant="body2" component="div">
        Contains at least one special character.
      </Typography>
    </>
  );
  let PageUI = '';
  if (((!Login_Type && Login_CF === 'signUp') || Login_CF === 'login') && !role) {
    PageUI = (
      <>
        <UserTypeSelection texts={texts} callback={localCallback} />
      </>
    );
  } else {
    PageUI = (
      <>
        <Grid container direction="row" spacing={2} onKeyDown={handleKeyPress} className={`sSignUpPage ${classes.mainGrid}`}>
          <Grid item xs={12} style={{ marginBottom: Instance_config?.is_2fa_enabled === 0 ? '0px' : '20px' }}>
            <H5 fontWeight="500" fontSize="24px" color="#313644" className={isMobileOTP ? 'shupavu_phone_no_text' : ''}>
              {isMobileOTP ? texts.SHUPAVU_STARTED_TEXT : texts.GET_STARTED_TEXT}
            </H5>
          </Grid>
          {isMobileOTP ? (
            <Grid item xs={12} className="position-relative">
              <Box
                sx={{
                  position: 'absolute',
                  left: '23px',
                  display: 'flex',
                  top: '57px',
                  alignItems: 'center',
                  zIndex: 1,
                }}
              >
                <Typography variant="body1" className="poppins-font-600 country_code_text" align="left">
                  +254
                </Typography>
              </Box>
              <Input
                label={texts.PHONE_LABEL}
                labelFontSize="16px"
                value={signup.phone}
                placeholder={texts.ENTER_PHONE}
                type={'tel'} // allows numeric input only
                tag="phone"
                key="1"
                className={'phone_input'}
                onChange={localCallback}
                disabled={socialSignup || false}
              />
            </Grid>
          ) : (
            <>
              {!paramName ? (
                <>
                  <Grid item xs={12}>
                    <Input
                      label={texts.EMAIL}
                      labelFontSize="16px"
                      value={signup.email}
                      placeholder={texts.EMAIL}
                      tag="email"
                      key="1"
                      onChange={localCallback}
                      disabled={socialSignup || false}
                    />
                  </Grid>
                  {Instance_config?.is_2fa_enabled === 0 && (
                    <Grid item xs={12}>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        label={texts.PASSWORD}
                        placeholder={texts.PASSWORD}
                        labelFontSize="16px"
                        tag="password"
                        key="2"
                        onChange={localCallback}
                        end={
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                            color="secondary"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        }
                      />
                      <Body1
                        styleCSS={{
                          color:
                            message === 'Weak password' ? '#f57c00' : message === 'Medium strength password' ? '#f57c00' : '#388e3c',
                        }}
                        className={classes.password_msg}
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
                  )}
                </>
              ) : (
                <Grid item xs={12}>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    label={texts.PASSWORD}
                    placeholder={texts.PASSWORD}
                    labelFontSize="16px"
                    tag="password"
                    key="2"
                    onChange={localCallback}
                    end={
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    }
                  />
                  <Body1
                    styleCSS={{
                      color: message === 'Weak password' ? '#f57c00' : message === 'Medium strength password' ? '#f57c00' : '#388e3c',
                    }}
                    className={classes.password_msg}
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
              )}
            </>
          )}
          <Grid item xs={12}>
            <CloudflareCaptcha getTurnstileToken={handleTurnstileToken} className="custom-width" captchaKey={captchaKey} />
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={signupButtonDisabled}
              className={turnstileToken ? 'signupBtn' : 'disabledStyle'}
              m={0}
              width="100%"
              tag={isMobileOTP ? 'number-send' : 'next-step'}
              type="submit"
              background="#02BBFE"
              fontWeight="700"
              borderRadius={15}
              onClick={localCallback}
            >
              <ButtonText color="#FFF" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
                {isMobileOTP ? texts.NEXT : texts.SIGN_UP}
              </ButtonText>
            </Button>
          </Grid>
          {(!role || !Inst_config?.principal_enabled) && !isMobileOTP && (
            <Grid item xs={12} style={{ margin: '0px 40px', padding: '0' }} className={classes.orStyle}>
              <Box textAlign="center">
                <Body1 fontSize="14px" className="poppins-font-600">
                  {texts.OR}
                </Body1>
              </Box>
            </Grid>
          )}
          <Grid item xs={12}>
            {!OsProperties.IsIos() &&
              (!role || !Inst_config?.principal_enabled) &&
              process.env.REACT_APP_IS_IOS === '0' &&
              !isMobileOTP && (
                <>
                  <Body1 mb={2} />

                  {process.env.REACT_APP_IS_APP === '0' ? (
                    <>
                      <Grid container direction="row" spacing={1}>
                        <Grid item xs={12}>
                          <WebSocialLogin {...webSocialLoginProps} />
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <MobileSocialLogin texts={texts} autoLogin={false} />
                  )}
                </>
              )}
            {isGlobalClimate && !change_code && (
              <Typography variant="body1" className={`${classes.privacyText} poppins-font-600`} align="left">
                {texts.CONFIRM_YOUR_AGREEMENT}{' '}
                <span
                  data-sid={texts.FRONT_FOOTER_PRIVACY_LABEL.toLowerCase()}
                  variant="body2"
                  onClick={() => {
                    PageSwitch(DefaultNav.PRIVACY_POLICY);
                  }}
                  className={classes.linkStyle}
                >
                  <ButtonText className={`${classes.linkTextStyle} poppins-font-500`} color="#02B5F5" fontSize="13px" fontWeight="400">
                    {texts.FRONT_FOOTER_PRIVACY_LABEL}
                  </ButtonText>
                </span>
              </Typography>
            )}
          </Grid>
        </Grid>
      </>
    );
  }

  return <>{PageUI}</>;
};

export const SignUpUI = ({ callback, step, socialSignup }) => {
  const { texts } = useTheme();
  const localCallback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    switch (t) {
      case 'login':
        PageSwitch(AccountNav.LOGIN);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <H5 mt={2} mb={2} textAlign="center">
        {step === 1 ? texts.ENTER_YOUR_EMAIL : texts.SET_ACCOUNTS_PASSWORD}
      </H5>
      <SignUpForm socialSignup={socialSignup} step={step} callback={callback} texts={texts} />
      <Box textAlign="center">
        <SignUpFormCircles socialSignup={socialSignup} step={step} />
        <Body1 mb={3}>
          {texts.ALREADY_SIGNED_UP}
          <InlineButton tag="login" onClick={localCallback}>
            {texts.LOGIN_NOW}
          </InlineButton>
        </Body1>
      </Box>
    </>
  );
};

export const SignUpSuccessUI = () => {
  const { texts } = useTheme();
  const styled = useStyles();
  const callback = () => {
    PageSwitch(AccountNav.LOGIN);
  };
  return (
    <>
      <Box mb={4} mx="auto" className={styled.successCircle}>
        <i className="i i-flag-success" />
      </Box>
      <H2>{texts.ACCOUNT_CREATED}</H2>
      <Box mb={10} textAlign="center">
        <H5>{texts.SIGNUP_SUCCESS_TEXT1}</H5>
      </Box>
      <Box mb={10} mt={2} textAlign="center">
        <H5>{texts.WELCOME_TO}</H5>
      </Box>
      <Button startIcon={<i className="i i-thumbsup" />} onClick={callback}>
        {texts.GREAT}
      </Button>
    </>
  );
};
