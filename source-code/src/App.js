import React, { useEffect, useState } from 'react';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Themes from 'Theme';

import { PrepareApis, DocumentTitleSetter, config, SIGN_UP_USER } from 'Constants';
import Toast from 'Components/Toast/Toast';
import { BlockingLoader, DottedLoader } from 'Components/Loader/Loader';
import 'Assets/css/bonzoui.css';
import 'Assets/css/home-style.css';
import { Account, Analytics, AppControl, SelectedCompetition, User } from 'Actions';
import ErrorBoundary from 'Stacks/ErrorBoundary/ErrorBoundary';
import { history } from 'Navigation';
import DefaultStack from 'Stacks/DefaultStack';

import DefaultMobileStack from 'Stacks/DefaultMobileStack';
import { parseHash } from 'Utils/GoogleAuth';
import CustomToast from 'Components/Toast/CustomToast';
import { getInstanceType, getSiteConfig } from 'Utils';
import configurations, { CURRENT_VERSION, INSTANCES_ID } from 'Constants/instance.config';
import GoogleTagManager from 'Utils/GoogleTagManager';
import { GetInstanceConfig } from 'Actions/config.action';
import { useTheme } from '@material-ui/core';

// Init test
PrepareApis();
SelectedCompetition.Init();

const App = () => {
  const dispatch = useDispatch();
  const gtmId = config.gtm_id;
  const { texts } = useTheme();
  const Inst_config = window.instanceConfig;
  const Instance_config = useSelector((state) => state.GetInstanceConfig, shallowEqual);
  const [configCall, setConfigCall] = useState(false);
  const Login_CF = useSelector((state) => state.LoginType.comingFrom, shallowEqual);
  const { currentLanguage, theme } = useSelector((state) => {
    return {
      language: state.AppControl.language,
      theme: state.AppControl.theme,
    };
  }, shallowEqual);
  const isPocketGames = getInstanceType(Inst_config.instance_id, INSTANCES_ID.POCKET_GAMES_ID);
  Analytics.Init(history.location, Inst_config);
  const siteKey = getSiteConfig();
  const siteConfig = configurations[siteKey];
  AppControl.SetInstituteConfig(siteConfig);

  history.listen((location) => {
    DocumentTitleSetter(location?.pathname, siteConfig);
    Analytics.Update(location);
  });

  const checkStableVersion = () => {
    let stable_version = CURRENT_VERSION.VERSION;
    let current_version = Instance_config?.app_version;
    if (stable_version !== current_version && !configCall && Instance_config) {
      dispatch(GetInstanceConfig({}, texts));
      setConfigCall(true);
    }
  };

  useEffect(() => {
    checkStableVersion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes('error')) {
      return;
    }
    const fetchData = async () => {
      let demoMode = false;
      if (hash) {
        //console.log(Login_CF, 'Login_CF');

        const authParams = await parseHash(hash);
        //  console.log(authParams, 'paramsObject');
        const dto = {
          email: authParams.data.email,
          login_type: 3,
          accessToken: authParams.accessToken,
          //userRole: Login_CF,
          userRole: !Inst_config?.principal_enabled ? SIGN_UP_USER.LEARNER : Login_CF,
          type: 3,
        };
        if (User.IsGuest()) {
          demoMode = true;
        }
        dispatch(Account.SocialLogin(dto, null, demoMode));
      }
    };

    // const isGoogleLoggingIn = sessionStorage.getItem('isGoogleLoggingIn') === 'true';
    setTimeout(() => {
      if (!window.isCompLauch) {
        document.getElementById('preloader').style.display = 'none';
      }
      // document.getElementById('mPreloader').style.display = 'none';
    }, 700);

    window.onbeforeunload = null;
    window.exportMode = false;

    // if (!isGoogleLoggingIn && User.IsGuest() && User.IsLoggedInUser()) {
    //   User.Clear(false);
    //   dispatch({ type: USER.CLEAR });
    //   dispatch({ type: USER.IS_LOGGED_IN, payload: false });
    // }
    if (!hash) {
      sessionStorage.removeItem('isGoogleLoggingIn');
    }
    fetchData();

    // if (User.IsLoggedInUser()) {
    //   // checkInternetStability();
    //   const internetCheckInterval = setInterval(() => {
    //     checkInternetStability();
    //   }, 120000); // 2 minutes in milliseconds

    //   // Cleanup interval on component unmount
    //   return () => {
    //     clearInterval(internetCheckInterval);
    //   };
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={Themes.getTheme(theme, currentLanguage)}>
      <CssBaseline />

      {isPocketGames && <GoogleTagManager gtmId={gtmId} enabled={true} />}

      <DottedLoader key="dotted" />
      <ErrorBoundary>
        <BlockingLoader key="spinner" />
        <CustomToast key="custom_toast" />
        <Toast key="toast" />
        {process.env.REACT_APP_IS_APP === '0' ? <DefaultStack /> : <DefaultMobileStack />}
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
