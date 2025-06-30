import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Box, makeStyles, useTheme } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { Button, GameLogo } from 'Components';
import { InlineButton } from 'Components/Core/Button';
import { GoToLastPage, LinkToPath, PageSwitch } from 'Navigation';
import User from 'Actions/user.action';
import { AccountNav, ChallengeNav, DefaultNav } from 'Navigation/Paths';
import kpLogo from 'Assets/images/mcd/kp.png';
import { Body1 } from '../Core';
import RightMenu from './HeaderBarMenu';
import Notification from '../Notification/Notification';
import useStyles from './style';
import { Account, AccountPopUp, AppControl } from 'Actions';
import { USER } from 'Constants';
import FloatingFAQ from 'Components/FloatingFAQ';
import { getInstanceType } from 'Utils';
import { INSTANCES_ID } from 'Constants/instance.config';

const useStyles2 = makeStyles((theme) => ({
  backLinkColor: {
    [theme.breakpoints.down('md')]: {
      transform: 'scale(1.2)',
      color: '#083E72',
      marginRight: 'auto',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      background: '#fff',
      borderRadius: '100px',
      width: '32px',
      height: '32px',
      lineHeight: '32px',
      '&::before': {
        marginRight: '3px',
      },
    },
  },
  backLinkTextColor: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  menuButton: {
    [theme.breakpoints.down('md')]: {
      marginRight: '0',
    },
  },
  modelLogo: {
    marginRight: '0px',
    [theme.breakpoints.down('md')]: {
      marginRight: '90px',
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: '40px',
    },
    '& img': {
      objectFit: 'contain',
    },
  },
  isGuestModelLogo: {
    [theme.breakpoints.down('md')]: {
      marginRight: '0px !important',
    },
  },
}));

const Header = React.forwardRef(
  ({ headerSet, scrollNode, topRounded, singleTopicPlan, hideLogo, notificationData, invisibleScore = false }, ref) => {
    const classes = useStyles2();
    const { path } = useRouteMatch();
    const { texts } = useTheme();
    const {
      showRight,
      showLeft,
      showCenter,
      showLogo,
      callback,
      overrideLeftButton,
      leftTitle,
      hideLeftTitle,
      handlePopState,
      hideCoins,
      notify,
      isAccount,
      showFloatingFAQ,
      SecondaryButtons,
    } = headerSet;
    const styled = useStyles({ topRounded });
    const pathRef = LinkToPath(path);

    const history = useHistory();
    const dispatch = useDispatch();
    const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
    const IsAdLogin = useSelector((state) => state.AdLoginUser.adLogin_user, shallowEqual);
    const Login_CF = useSelector((state) => state.LoginType.comingFrom, shallowEqual);
    const Landing_CF = useSelector((state) => state.LoginType.comingFromLanding, shallowEqual);
    const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
    const user = User.Info();
    const isGuestMode = User.IsLoggedInUser();

    const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);
    const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);
    const isSGG = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SGG_ID);

    const [scrollTarget, setScrollTarget] = useState(undefined);
    const trigger = useScrollTrigger({ target: scrollTarget, threshold: 0, disableHysteresis: true });
    const ShowNotification = User.IsGuest() ? false : notify;

    const localCallback = (e) => {
      const t = e.currentTarget.getAttribute('data-tag');
      switch (t) {
        case 'settings':
          if (callback) callback(e);
          break;
        case 'handle_pop_state':
          //  console.log('Back button was pressed!');
          if (User.IsGuest() && User.IsLoggedInUser()) {
            User.Clear(false);
            dispatch(Account.Logout(user));
            dispatch({ type: USER.CLEAR });
            dispatch({ type: USER.IS_LOGGED_IN, payload: false });
          }

          break;
        case 'left-btn':
          if (isAccount) {
            if (window.location.pathname === AccountNav.FORGOT_PASSWORD.link) {
              PageSwitch(AccountNav.LOGIN); // Switch to the login page
            } else {
              if (backBtnTitle === 'Back') {
                // AppControl.SetLoginType(false);
                // AppControl.SetLoginComingFrom('login');

                // console.log('BACK');
                if (window.location.href.includes('cf=sitarey')) {
                  PageSwitch(DefaultNav.PROGRAM_LAUNCH);
                } else if (window.location.href.includes('cf=gclc')) {
                  PageSwitch(DefaultNav.PROGRAM_GLC);
                } else {
                  AppControl.SetLoginType(false);
                  AppControl.SetLoginComingFrom('login');
                }
              } else {
                if (isGlobalClimate) {
                  PageSwitch(DefaultNav.PROGRAM_GLC);
                } else {
                  callback('left-btn');
                }
              }
            }
          } else if (overrideLeftButton && callback) {
            callback('left-btn');
          } else if (pathRef) {
            if (pathRef.backLink.name === 'COMPETITIONS') {
              if (User.IsGuest()) {
                window.pageRouteKey = true;
              }
            }
            if (window.location.pathname === DefaultNav.PAYMENT.link) {
              callback();
            } else if (pathRef.backLink === 'goBack') {
              GoToLastPage(history);
            } else if (singleTopicPlan) {
              PageSwitch(DefaultNav.COMPETITIONS);
            } else {
              PageSwitch(pathRef.backLink);
            }
          } else {
            GoToLastPage(history);
          }
          if (window.location.pathname === AccountNav.VERIFY.link && isShupavu) {
            if (history.location.state?.isOtpVerified) {
              window.history.go(-2);
            } else {
              GoToLastPage(history);
            }
            AccountPopUp.Show({ isVisible: false });
          }
          break;
        default:
          break;
      }
    };

    let backBtnUI = null;
    let backBtnTitle = null;

    if (showLeft) {
      if (pathRef && pathRef.backLink && pathRef.backLink.name) {
        backBtnTitle =
          // eslint-disable-next-line no-nested-ternary
          texts[singleTopicPlan ? 'COMPETITIONS' : pathRef.backLink.name === 'LESSON' ? `${'TOPIC'}` : pathRef.backLink.name];
      } else if (isAccount) {
        if (window.location.pathname === AccountNav.FORGOT_PASSWORD.link) {
          backBtnTitle = texts.BACK_TO_LOGIN;
        } else if (window.location.pathname === AccountNav.SIGN_UP.link) {
          if (Login_CF !== 'signUp' && Login_CF !== 'login') {
            if (Landing_CF) {
              backBtnTitle = texts.HOME;
            } else backBtnTitle = texts.BACK;
          } else {
            backBtnTitle = texts.HOME;
            //backBtnTitle = 'Sitarey';
          }
        } else {
          backBtnTitle = texts.HOME;
        }
      }
      if (window.location.pathname === DefaultNav.PAYMENT.link) {
        backBtnTitle = texts.BACK;
      }
      if (window.location.pathname === AccountNav.VERIFY.link && isShupavu) {
        backBtnTitle = texts.BACK;
      }
      if (window.location.pathname === ChallengeNav.CHALLENGE_SELECTION.link) {
        backBtnTitle = texts.BACK;
      }
      if (leftTitle) {
        backBtnTitle = leftTitle;
      }

      backBtnUI = (
        <Box className={`${styled.menuButton} ${hideLeftTitle && styled.hide_left_title}`}>
          <Button
            mt={3}
            tag={!handlePopState ? 'left-btn' : 'handle_pop_state'}
            type="submit"
            onClick={localCallback}
            startIcon={<i className={`${classes.backLinkColor} i i-left icon-custom-color __nnnn`} />}
          >
            {backBtnTitle && (
              <Body1
                color="#ffffff"
                fontWeight="600"
                fontSize="20px"
                className={`${classes.backLinkColor} ${classes.backLinkTextColor}`}
              >
                {backBtnTitle}
              </Body1>
            )}
          </Button>
        </Box>
      );
    }

    useEffect(() => {
      setScrollTarget(scrollNode);
    }, [scrollNode]);
    const showIcon = IsMcdUser || IsAdLogin ? true : false;

    const logoSrc = Inst_config ? Inst_config.logo.web_dark : '';

    return (
      <>
        <AppBar elevation={0} position="static" ref={ref} className={`${styled.root} ${trigger ? styled.bordered : ''}`}>
          <Toolbar style={{ paddingTop: '5px', paddingBottom: '5px' }}>
            {backBtnUI}

            {showCenter && ( // Only render the center content if showCenter is true
              <>
                <Grid
                  container
                  justifyContent="center"
                  className={`${classes.modelLogo} ${isGuestMode ? classes.isGuestModelLogo : ''}`}
                >
                  {!hideLogo && (
                    <Grid item>
                      <GameLogo
                        srcLogo={logoSrc}
                        width={isGlobalClimate ? '200px' : isShupavu ? '207px' : isSGG ? '180px' : '130px'}
                        height="70px"
                      />
                    </Grid>
                  )}
                </Grid>
              </>
            )}

            {!showLeft && showIcon && (
              <>
                <InlineButton
                  tag="KP_LOGO_BTN"
                  onClick={() => {
                    window.open('http://www.knowledgeplatform.com/', '_blank');
                  }}
                >
                  <img width={96} alt="Knowledge Platform" src={kpLogo} className={styled.kpLogo} />
                </InlineButton>
              </>
            )}
            <Box className={`${showRight && styled.avatar_container}`}>
              {showRight ? (
                <>
                  {SecondaryButtons || null}

                  <RightMenu
                    showLogo={showLogo}
                    hideCoins={hideCoins}
                    notificationData={notificationData}
                    invisibleScore={invisibleScore}
                  />
                </>
              ) : null}
            </Box>
            {ShowNotification ? <Notification /> : null}
          </Toolbar>
          {showFloatingFAQ && <FloatingFAQ />}
        </AppBar>
      </>
    );
  }
);

export default Header;
