import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { DefaultNav, ChallengeNav } from 'Navigation/Paths';
import PrivateRoute from 'Hoc/PrivateRoute';
import AdminCheckRoute from 'Hoc/AdminRoute';
import { SelectedCompetition } from 'Actions';
import AuthorizationCheckRoute from 'Hoc/AuthorizationCheckRoute';
// import { ALERT } from 'Constants';
import { useTheme } from '@material-ui/core';
import DefaultRoute from 'Hoc/DefaultRoute';
import { SuspenseWrapper } from 'Components/Loader/dotLoader';
// import { Button } from 'Components'
import MobileAppPopup from 'Components/MobileAppPopup';
// import { ModalBox } from 'Components/Modal';
// import { Body1 } from 'Components/Core';
// import mobileDownload from 'Assets/home-img/mobile_download.png';
// import googlePlayIconLarge from 'Assets/home-img/google_play_large.png';
import { shallowEqual, useSelector } from 'react-redux';
import { history } from '../Navigation';
import RefreshToken from './Account/RefreshToken';
import { ProgramLaunch } from './Settings';
import { checkInternetStability } from 'Utils/internetStability';

const CompetitionStack = lazy(() => import('Stacks/Competition/CompetitionStack'));
const AccountStack = lazy(() => import('Stacks/Account/AccountStack'));
const ChallengeStack = lazy(() => import('Stacks/Challenge/ChallengeStack'));
const SettingsStack = lazy(() => import('Stacks/Settings/SettingsStack'));

const PrivacyPolicy = lazy(() => import('Stacks/Account/PrivacyPolicy'));
const AdLogin = lazy(() => import('Stacks/Settings/AddLogin/AdLogin'));
const Admin = lazy(() => import('Stacks/Settings/Admin/Admin'));
const SSO = lazy(() => import('Stacks/Settings/SSO/Sso'));
const MCD = lazy(() => import('Stacks/Settings/McdScreen/McdScreen'));
const MCDError = lazy(() => import('Stacks/Settings/McdScreen/McdErrorScreen'));
const MCDSuccess = lazy(() => import('Stacks/Settings/McdScreen/McdPaymentSuccess'));
const CodePushLoader = lazy(() => import('Stacks/Settings/CodePushLoader/CodePushLoader'));
const DirectLaunch = lazy(() => import('Stacks/Settings/DirectLaunch/DirectLaunch'));
const PaymentStack = lazy(() => import('Stacks/Payment/PaymentStack'));

// const LoginModal = lazy(() => import('Stacks/Account/LoginModal'));

const DefaultStack = React.memo(() => {
  const queryString = window.location.search;

  // Parse query parameters
  const urlParams = new URLSearchParams(queryString);
  const paramValue = urlParams.get('debug');

  const { texts } = useTheme();
  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);

  useEffect(() => {
    return history.listen((location) => {
      if (history.action !== 'REPLACE') {
        switch (location.pathname) {
          case ChallengeNav.CHALLENGE_START.link:
          case ChallengeNav.CHALLENGE_PLAYER.link:
            // should clear all pages and challenge data from redux
            SelectedCompetition.GotoCompetition();
            break;
          default:
            break;
        }
      }
      if (history.action === 'POP') {
        switch (location.pathname) {
          case ChallengeNav.CHALLENGE_RESULT.link:
            // should clear all pages and challenge data from redux
            SelectedCompetition.GotoCompetition();
            // Toast.Show(texts.SELECT_FIRST_MATCH, ALERT.INFO, true);
            break;
          case ChallengeNav.CHALLENGE_SELECTION.link:
            // should clear all pages and challenge data from redux
            SelectedCompetition.GotoCompetition();
            // Toast.Show(texts.SELECT_CHALLENGE_TYPE, ALERT.INFO, true);
            break;
          default:
            break;
        }
      }
    });
  }, [texts]);

  useEffect(() => {
    // console.log('inside loggedIn');
    let internetCheckInterval;
    let isTabFocused = document.visibilityState === 'visible';

    // Function to start the internet check
    const startInternetCheck = () => {
      internetCheckInterval = setInterval(() => {
        checkInternetStability();
      }, 120000); // 120 seconds in milliseconds
    };
    // Listen for visibility change events
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (!isTabFocused) {
          isTabFocused = true;
          startInternetCheck(); // Start checking when the tab is focused
        }
      } else {
        if (isTabFocused) {
          isTabFocused = false;
          clearInterval(internetCheckInterval); // Stop checking when the tab is not focused
        }
      }
    };

    // Add event listener to detect when the tab is focused or blurred
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Start the check when the component mounts
    if (isTabFocused) {
      startInternetCheck();
    }

    // Cleanup on component unmount or when visibility changes
    return () => {
      clearInterval(internetCheckInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    // Ensure vConsole is available
    if (window.VConsole && paramValue) {
      // eslint-disable-next-line
      const vConsole = new window.VConsole();
      console.log('vConsole initialized');
    } else {
      console.error('vConsole not found');
    }
  }, [paramValue]);

  return (
    <Suspense fallback={null}>
      <SuspenseWrapper>
        {/* <LoginModal /> */}
        {!IsMcdUser && <MobileAppPopup mcd={IsMcdUser} />}
        {/* <ModalBox
        isVisible={isVisible}
        callback={() => {
          setIsVisible(false);
        }}
        icon="games"
        allowClose
        fixWidth
        title="Download 1on1 Quiz App!"
      >
        <Box>
          <img
            loading="lazy"
            className="image_mobile_stores wow animated fadeInRight"
            src={mobileDownload}
            style={{ borderBottom: '2px solid #59a4eb' }}
            alt="Download 1on1 Mobile App"
          />
        </Box>
        <Body1 mb={2} ml={1} mr={1} mt={3} textAlign="center">
          Download 1on1 Quiz app for the best mobile experience.
        </Body1>

        <Box mt={4} mb={1} display="flex" justifyContent="center" alignItems="center">
          <a
            data-scroll
            className="wow fadeIn animated"
            data-wow-delay="0.67s"
            href="!#"
            style={{ maxHeight: '150px', textAlign: 'center' }}
            onClick={() => {
              window.open('https://play.google.com/store/apps/details?id=com.knowledgeplatform.oneonone_quiz');
            }}
          >
            <img
              loading="lazy"
              className="google-play-btn"
              style={{ maxWidth: '60%', margin: 'auto' }}
              // style={{ transform: 'scale(1.3)' }}
              src={googlePlayIconLarge}
              alt="Google Play Icon"
            />
          </a>
        </Box>
      </ModalBox> */}
        <Router history={history}>
          <RefreshToken />
          <Switch>
            <PrivateRoute path={DefaultNav.CHALLENGE.link} component={ChallengeStack} />
            <PrivateRoute path={DefaultNav.SETTINGS.link} component={SettingsStack} />
            <PrivateRoute path={DefaultNav.PAYMENT.link} component={PaymentStack} />
            <PrivateRoute path={DefaultNav.COMPETITIONS.link} component={CompetitionStack} isGuestModeAllowed />

            <AdminCheckRoute path={DefaultNav.ADMIN.link} component={Admin} />
            <Route path={DefaultNav.SSO.link} component={SSO} />
            <Route path={DefaultNav.MCD.link} component={MCD} />
            <Route path={DefaultNav.DIRECT_LAUNCH.link} component={DirectLaunch} />
            <Route path={DefaultNav.AD_LOGIN.link} component={AdLogin} />
            <Route path={DefaultNav.MCDError.link} component={MCDError} />
            <Route path={DefaultNav.MCDPaymentSuccess.link} component={MCDSuccess} />
            <Route path={DefaultNav.CODE_PUSH_LOADER.link} component={CodePushLoader} />
            <Route path={DefaultNav.PRIVACY_POLICY.link} component={PrivacyPolicy} />
            <Route exact path={DefaultNav.PROGRAM_LAUNCH.link} component={ProgramLaunch} />
            <Route exact path={DefaultNav.PROGRAM_GLC.link} component={ProgramLaunch} />
            <Route exact path={DefaultNav.CONTACT_US.link} component={ProgramLaunch} />
            <Route exact path={DefaultNav.GCLC_RESULT.link} component={ProgramLaunch} />
            <Route exact path={DefaultNav.GREEN_STAR_SCHOOL.link} component={ProgramLaunch} />
            <AuthorizationCheckRoute path={[DefaultNav.MAIN.link, DefaultNav.ACCOUNT.link]} component={AccountStack} />
            <Route path={DefaultNav.CHALLENGE.link} component={ChallengeStack} />
            <Route render={() => <DefaultRoute />} />
          </Switch>
        </Router>
      </SuspenseWrapper>
    </Suspense>
  );
});

export default DefaultStack;
