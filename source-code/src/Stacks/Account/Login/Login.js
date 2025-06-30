import React, { useState, useEffect } from 'react';
import { Box, Grid, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { getInstanceType, OnInputChange } from 'Utils';
import { Body1 } from 'Components';
// import { InlineButton } from 'Components/Core/Button';
import { PageSwitch } from 'Navigation';
import AccountNav from 'Navigation/Paths/account.constants';
import Account from 'Actions/account.action';
import { User, AccountPopUp, AppControl } from 'Actions';
import WebSocialLogin from 'Components/SocialLogin/WebSocialLogin';
import PageStructure from '../shared/PageStructure';
import LoginCore from './LoginCore';
import AccountFooter from '../shared/AccountFooter';
import { INSTANCES_ID } from 'Constants/instance.config';
import { initGoogleAdsTracking, trackConversion } from 'Utils/GoogleAdsTracker';
// import ContinueAsGuest from './ContinueAsGuest';

const useStyles = makeStyles((theme) => ({
  boxStyle: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    marginBottom: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
  },
}));

const Login = ({ mode, ShowAccountPopUp }) => {
  const classes = useStyles();
  const { texts } = useTheme();
  const user = User.Info();
  const directLaunchData = useSelector((state) => state.AppControl.url, shallowEqual);
  const Login_Type = useSelector((state) => state.LoginType.is_inst_based, shallowEqual);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);
  // const Login_CF = useSelector((state) => state.LoginType.comingFrom, shallowEqual);

  const [login, setLogin] = useState({
    email: user.conEmail || '',
    password: user.autoLogin ? user.conPassword : '',
    autoLogin: !!user.autoLogin,
  });

  const isLgOrGreater = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const isMobileOTP = Inst_config.is_mobile_otp;

  const dispatch = useDispatch();

  const callback = (e) => {
    const t = e?.currentTarget?.getAttribute('data-tag') || e?.target?.name || e;
    switch (t) {
      case 'login':
        e.preventDefault();
        //  console.log('login', directLaunchData);
        dispatch(Account.Login(login, texts, directLaunchData, '', isMobileOTP));
        break;
      case 'facebook':
        break;
      case 'google':
        PageSwitch(AccountNav.SIGN_UP);
        break;
      case 'forgot-pass':
        if (ShowAccountPopUp?.type === 'signIn') {
          AccountPopUp.Show({ type: 'forgotPassword', isVisible: true, comingFrom: 'guest', path: window?.location?.pathname });
        } else {
          PageSwitch(AccountNav.FORGOT_PASSWORD);
        }
        break;
      case 'auto-login':
        setLogin({ ...login, autoLogin: e.target.checked });
        break;
      case 'email':
      case 'password':
        OnInputChange({ name: t, value: e.target.value }, login, setLogin);
        break;
      case 'left-btn':
        if (ShowAccountPopUp?.type === 'signIn') {
          AccountPopUp.Show({ type: 'signUp', isVisible: true, comingFrom: 'guest', path: window?.location?.pathname });
        } else {
          //  console.log('left-btn');
          if (window.location.pathname === AccountNav.LOGIN.link) {
            if (Inst_config.navigate_to_public_route) {
              window.location.href = Inst_config.account_back_url;
            } else {
              PageSwitch(Inst_config.account_back_url);
            } // Switch to Landing
          }
          // PageSwitch(AccountNav.SIGN_UP);
        }
        break;
      case 'as-learner':
        PageSwitch(AccountNav.LOGIN);
        AppControl.SetLoginType(false);
        AppControl.SetLoginComingFrom('forLearners');
        break;
      case 'as-institute':
        PageSwitch(AccountNav.LOGIN);
        AppControl.SetLoginType(true);
        AppControl.SetLoginComingFrom('forInstitutions');
        break;
      default:
        break;
    }
  };

  // let PageUI = '';
  // if (!Login_Type && (Login_CF === 'signUp' || Login_CF === 'login')) {
  //   PageUI = (
  //     <>
  //       <UserTypeSelection texts={texts} callback={callback} />
  //     </>
  //   );
  // } else {
  //   PageUI = (
  //     <>
  //       <Box ml={5} mr={5} mt={2}>
  //         <LoginCore ShowAccountPopUp={ShowAccountPopUp} />
  //         <Box textAlign="center">
  //           <Body1>{texts.OR}</Body1>
  //         </Box>
  //         <Grid container direction="row" spacing={1}>
  //           <Grid item xs={12}>
  //             <WebSocialLogin texts={texts} autoLogin />
  //           </Grid>
  //           <Grid item xs={12}>
  //             {!Login_Type && <ContinueAsGuest texts={texts} />}
  //           </Grid>
  //         </Grid>
  //       </Box>
  //       <AccountFooter fromLogin={true} isFromLearners={!Login_Type} ShowAccountPopUp={ShowAccountPopUp} />
  //     </>
  //   );
  // }

  // Initialize Google Ads tracking
  useEffect(() => {
    if (isShupavu) {
      initGoogleAdsTracking();
      // Track page visit conversion
      trackConversion();
    }
  }, [isShupavu]);

  useEffect(() => {
    if (user.autoLogin) {
      dispatch(Account.Login(login, texts, directLaunchData, '', isMobileOTP));
    }
  }, [directLaunchData, dispatch, login, texts, user.autoLogin, isMobileOTP]);

  let leftTitle = texts.HOME;

  // Determine if the current user is a guest and the device is mobile
  const isGuestUserOnMobile = !User.IsLoggedInUser() && User.IsGuest();

  return (
    <PageStructure
      headerSet={{
        overrideLeftButton: true,
        callback,
        showRight: false,
        // showLeft: true,
        showLeft: !isLgOrGreater && isGuestUserOnMobile, // Show left button only on mobile screen
        showCenter: true,
        leftTitle,
      }}
      mode={mode}
      hideHeader={mode === 'MODAL'}
    >
      {/* {PageUI} */}
      <Box className={`sLoginPage ${classes.boxStyle}`}>
        <LoginCore ShowAccountPopUp={ShowAccountPopUp} isGuestUserOnMobile={isGuestUserOnMobile || isShupavu} />
        {!isMobileOTP && (
          <>
            <Box textAlign="center" mt={1} mb={1}>
              <Body1 fontSize="14px" className="poppins-font-600">
                {texts.OR}
              </Body1>
            </Box>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={12}>
                <WebSocialLogin texts={texts} autoLogin publicLogin />
              </Grid>
            </Grid>
          </>
        )}
      </Box>
      <AccountFooter fromLogin={true} isFromLearners={!Login_Type} ShowAccountPopUp={ShowAccountPopUp} />
    </PageStructure>
  );
};

export default Login;
