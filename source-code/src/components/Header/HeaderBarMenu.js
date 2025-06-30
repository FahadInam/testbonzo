import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';

import { Box, Grid, useTheme, IconButton, useMediaQuery } from '@material-ui/core';
// import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import { AvatarSwitcher, CALL_PRIORITY, COMING_FROM, IMAGES, API_CALLS, USER } from 'Constants';
// import { PAGE_STATE, API_CALLS, config, CALL_PRIORITY } from 'Constants';
import { SelectedCompetition, Account, AccountPopUp, AppControl } from 'Actions';
import { GetCompetitionsActivities, GetUserNotifications } from 'Actions/competitions.action';
import ProfileMenu from 'Components/ProfileMenu';
import SidePanel from 'Components/SidePanel';
import { SettingsNav, DefaultNav, CompetitionNav } from 'Navigation/Paths';
import User from 'Actions/user.action';
import { PageSwitch } from 'Navigation';
// eslint-disable-next-line camelcase
import crown_image from 'Assets/images/crown.png';
import { useLocation } from 'react-router-dom';
import { actionDispatch, gameDispatch } from 'Utils/ActionCreators';
import { Numbers, IsEmptyObject, Cordova, getInstanceType } from 'Utils';
import Rules from 'Components/Rules/Rules';
import { H3 } from '../Core';
import ConfirmationBox from '../ConfirmationBox';
import CoinIcon from '../CoinIcon';
import useStyles from './style';
import Bell from 'Assets/images/bonzoui/bell.png';
import { INSTANCES_ID } from 'Constants/instance.config';

window.GlobalNotificationsTimer = null;
window.shouldNotificationBeCalled = null;
window.NotificationsOpenTimer = null;
const RightMenu = React.memo(({ hideCoins, grade, showLogo, notificationData, invisibleScore = false }) => {
  // console.log(notificationData, 'notificationData');
  const [stateRef, setStateRef] = useState({
    menuAnchor: null,
    logoutAnchor: false,
    rulesAnchor: false,
    selectedGrade: 0,
    blockFriendAnchor: false,
    sideMenuState: false,
    badgeNumber: 0,
    toBlockFriend: {},
    areNotificationsSeen: false,
  });
  const [badgeNumber, setBadgeNumber] = useState(0);
  const dispatch = useDispatch();
  const user = User.Info();

  const theme = useTheme();
  // console.log('user: ', user);
  const currentComp = SelectedCompetition.Info();

  const location = useLocation();
  const pageData = useSelector((state) => state.GetUserNotifications, shallowEqual);
  // console.log(pageData, "shallowEqual")
  const comingfrom = useSelector((state) => state.AppControl.comingFrom, shallowEqual);
  const competitionDetails = useSelector((state) => state.GetCompetitionDetails, shallowEqual);
  const isUserNotSupportTeam = User.Info()?.user_id !== parseInt(process.env.REACT_APP_SUPPORT_ID, 10);

  const competitionDetailsRef = useRef(competitionDetails);

  useEffect(() => {
    competitionDetailsRef.current = competitionDetails;
  }, [competitionDetails]);

  const findNewNotificationsNumber = (data) => {
    //  console.log(data, 'data');
    // console.log(data, "here data", currentComp.item?.competition_id)
    if (!currentComp.item?.competition_id) return 0;

    let newNum = 0;
    const lastStatusOfEachConvo = [];
    //  console.log('total new notifications PAGEDATA: ', pageData);
    // console.log(pageData, "pageData")
    if (pageData || data) {
      const pD = data;
      // console.log('pD: ', pD);
      // console.log(pD, "pD here")
      if (!pD) {
        setBadgeNumber(0);
        return 0;
      }

      if (pD instanceof Array) {
        if (isUserNotSupportTeam) {
          // console.log(pD, "isUserNotSupportTeam")
          pD.forEach((item) => {
            if (!item.is_read) newNum += 1;
          });
        } else {
          // *** LOGIC TO REMOVE DUPLICATE MESSAGES BY A SINGLE USER FOR SUPPORT ONLY
          pD.forEach((item) => {
            // console.log(item, "item here")
            if (item.action_type.trim().toLowerCase() === 'message') {
              if (!lastStatusOfEachConvo[item.sender_id]) {
                lastStatusOfEachConvo[item.sender_id] = true;
                if (!item.is_read) newNum += 1;
              }
            } else if (!item.is_read) newNum += 1;
          });

          // *** LOGIC TO REMOVE DUPLICATE MESSAGES BY A SINGLE USER FOR SUPPORT ONLY
        }
        // console.log('total new notifications: ', newNum);
        // console.log(newNum, "setBadgeNumber")
        // setBadgeNumber(newNum);
        //  console.log('new Count is: ', newNum);
        return newNum;
      }
      // console.log(newNum, "setBadgeNumber")
      setBadgeNumber(newNum);
      return 0;
    }
    // console.log(newNum, "setBadgeNumber")
    setBadgeNumber(0);
    return 0;
  };

  // eslint-disable-next-line
  const loadData = useCallback(
    (cb) => {
      // console.log('currentComp.item.competition_id: ', currentComp.item?.competition_id);
      // gameDispatch(API_CALLS.GetUserNotifications.CLEAR);
      // console.log('Pre Data pageData Data: ', pageData);
      if (user.active_role !== 'principal') {
        dispatch(
          GetUserNotifications(
            { grade: competitionDetailsRef?.current?.current_grade, competition_id: currentComp.item?.competition_id },
            (data) => {
              // console.log('New Data: ', data);
              // console.log("new data", data)
              // console.log('findNewNotificationsNumber', data);
              setBadgeNumber(findNewNotificationsNumber(data));
              if (cb) cb();
              // setStateRef({ ...stateRef, badgeNumber: findNewNotificationsNumber() });
            }
          )
        );
      }
    }, // eslint-disable-next-line
    [dispatch, currentComp.item?.competition_id]
  );
  // eslint-disable-next-line
  // useEffect(
  //   () => {
  //     clearInterval(window.GlobalNotificationsTimer);
  //     if (currentComp.item?.competition_id && !User.IsGuest()) {
  //       // console.log('SETTING INTERVAL 1');
  //       window.GlobalNotificationsTimer = setInterval(() => {
  //         // console.log('SETTING INTERVAL 1D');
  //         // if (window.MyWinFocused) {
  //         if (currentComp.item?.competition_id) loadData();
  //         // }
  //       }, config.NotificationsRefreshTimer);
  //     }
  //     // return () => clearInterval(window.GlobalNotificationsTimer);
  //   }, // eslint-disable-next-line
  //   [loadData, findNewNotificationsNumber]
  // );
  // useEffect(() => {
  //   console.log('*****A');
  //    loadData();
  //   setTimeout(() => {
  //     console.log('*****B');
  //     findNewNotificationsNumber();
  //   }, 25000);
  // }, []);
  // console.log('currentComp.item.competition_id: ', currentComp.item?.competition_id);
  // console.log('loadData: ', loadData());
  // console.log('pageData: ', pageData);

  const competitionStr = useSelector((state) => state.Competition, shallowEqual);
  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  const IsAdLogin = useSelector((state) => state.AdLoginUser, shallowEqual);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const competition = SelectedCompetition.StrToObj(competitionStr);
  const isSmOrLess = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(
    () => {
      // console.log('comingfrom', comingfrom);
      if (
        comingfrom &&
        comingfrom.indexOf('/chat') &&
        location?.pathname &&
        location?.pathname.indexOf('/chat') === -1 &&
        location?.pathname.indexOf('/support_center') === -1 &&
        competition?.item?.is_mcd
      ) {
        // console.log('yes, this is a chat');
        setTimeout(() => {
          // console.log('executing clearance.');
          gameDispatch(COMING_FROM.CLEAR);
          loadDataActivities();
        }, 1000);
      }
      // console.log('pageData: ', pageData);
      // console.log('currentComp.item?.competition_id: ', currentComp.item?.competition_id);
      // console.log('!pageData && currentComp.item?.competition_id: ', !pageData && !!currentComp.item?.competition_id);
      if (!pageData && !!currentComp.item?.competition_id) {
        // console.log('window.shouldNotificationBeCalled:', window.shouldNotificationBeCalled);
        //  if (window.shouldNotificationBeCalled)
        // loadData();
      }
      // console.log('*****');
      if (pageData) {
        // loadData();
        // setBadgeNumber(findNewNotificationsNumber());
      }
      //  console.log(loadData, pageData);
    }, // eslint-disable-next-line
    [pageData, window.shouldNotificationBeCalled]
  );

  /* ------------------------------ TO LOAD PREMIUM TAG IF PURCHASED BIT IS TRUE ------------------------------ */
  const pageDataActivities = useSelector((state) => state.GetCompetitionsActivities, shallowEqual);

  useEffect(() => {
    setBadgeNumber(findNewNotificationsNumber(notificationData || pageData?.rows));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationData, pageData]);

  const loadDataActivities = useCallback(
    (priority = CALL_PRIORITY.HIGH) => {
      if (competition && Object.keys(competition).length > 0)
        if (competitionDetails) {
          dispatch(
            GetCompetitionsActivities(
              { competition_id: competition?.item?.competition_id, current_grade: competitionDetails?.current_grade },
              priority
            )
          );
        }
    },
    [dispatch, competition, competitionDetails]
  );
  // console.log('competition::: ', competition);
  // console.log('competition is_mcd::: ', competition?.item?.is_mcd);

  // useEffect(() => {
  //   if (!pageDataActivities) {
  //     loadDataActivities();
  //   }
  // }, [pageDataActivities, loadDataActivities, competition]);
  const isPremiumPurchased = pageDataActivities?.is_premium_purchased || null;
  // console.log('pageDataActivities: ', pageDataActivities?.is_premium_purchased);
  /* ------------------------------ TO LOAD PREMIUM TAG IF PURCHASED BIT IS TRUE ------------------------------ */

  const styled = useStyles();
  const { texts } = useTheme();
  const { adLogin_user, adLogin_data } = IsAdLogin;
  const callback = (e, item) => {
    const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag');
    switch (t) {
      case 'notifications':
        // if (window.NotificationsOpenTimer === null) {
        //  window.NotificationsOpenTimer = setTimeout(() => {
        if (isUserNotSupportTeam) {
          setStateRef({ ...stateRef, sideMenuState: true });
          if (currentComp.item?.competition_id && !User.IsGuest()) {
            loadData();
          }
          clearTimeout(window.NotificationsOpenTimer);
          window.NotificationsOpenTimer = null;
          // }, 300);
          // }
        } else {
          loadData(PageSwitch(CompetitionNav.SUPPORT_CENTER));
        }
        break;
      case 'settings':
        setStateRef({ ...stateRef, menuAnchor: e.currentTarget });
        break;
      case 'edit-profile':
        setStateRef({ ...stateRef, menuAnchor: null });
        if (window.location.pathname.indexOf('settings') < 0) PageSwitch(DefaultNav.SETTINGS);
        setStateRef({ ...stateRef, menuAnchor: null });
        break;
      case 'my-subscription':
        setStateRef({ ...stateRef, menuAnchor: null });
        PageSwitch(CompetitionNav.MY_SUBSCRIPTION);
        break;
      case 'rewards':
        setStateRef({ ...stateRef, menuAnchor: null });
        PageSwitch(CompetitionNav.REWARDS);
        break;
      case 'faqs':
        setStateRef({ ...stateRef, menuAnchor: null });
        PageSwitch(CompetitionNav.FREQUENTLY_ASK_QUESTIONS);
        break;
      case 'update-password':
        setStateRef({ ...stateRef, menuAnchor: null });
        PageSwitch(SettingsNav.CHANGE_PASSWORD);
        break;
      case 'show-my-purchases':
        setStateRef({ ...stateRef, menuAnchor: null });
        PageSwitch(CompetitionNav.MY_PURCHASES);
        break;
      case 'support':
        setStateRef({ ...stateRef, menuAnchor: null });
        SelectedCompetition.GotoCompetition(
          CompetitionNav.CHAT,
          {
            is_new_message: 0,
            is_same_grade: 1,
            is_subject: 0,
            name: 'Support Team',
            profile_picture: '2',
            tag: 'SET_OPPONENT',
            user_id: parseInt(process.env.REACT_APP_SUPPORT_ID, 10),
            username: 'gamesupport@knowledgeplatform.com',
          },
          false
        );
        //  console.log('Starting Chat...');
        break;
      case 'logout':
        setStateRef({ ...stateRef, menuAnchor: null, logoutAnchor: true });
        break;
      case 'signup':
        window.firstCompetitionCall = false;
        AppControl.SetLoginType(false);
        AppControl.SetLoginComingFrom('signUp');
        AppControl.SetSignUpComingFrom(false);
        setStateRef({ ...stateRef, menuAnchor: null });
        AccountPopUp.Show({ type: 'signUp', isVisible: true, comingFrom: 'guest', path: window?.location?.pathname });
        // User.Clear(false, AccountNav.SIGN_UP);
        break;
      case 'rules':
        setStateRef({ ...stateRef, menuAnchor: null, rulesAnchor: true });
        break;
      case 'continue-rules':
        setStateRef({ ...stateRef, menuAnchor: null, rulesAnchor: false });
        break;
      case 'close':
      case 'overlay':
      case 'logout-negative':
      case 'grade-change-negative':
        setStateRef({
          ...stateRef,
          logoutAnchor: false,
          blockFriendAnchor: false,
          rulesAnchor: false,
          toBlockFriend: {},
        });
        break;
      case 'logo':
        if (User.IsGuest() && User.IsLoggedInUser()) {
          User.Clear(false);
          dispatch({ type: USER.CLEAR });
          dispatch({ type: USER.IS_LOGGED_IN, payload: false });
        }

        break;
      case 'logout-positive':
        setStateRef({ ...stateRef, logoutAnchor: false });
        //  console.log(IsAdLogin);
        // eslint-disable-next-line camelcase
        if (adLogin_user) {
          actionDispatch(adLogin_data.logout());
        } else {
          dispatch(Account.Logout(user));
        }
        // console.log(adLogin_user, adLogin_data);

        break;
      case 'show-grade-selector':
        // console.log('checking.......')
        PageSwitch(CompetitionNav.CHANGE_GRADE);
        setStateRef({ ...stateRef, menuAnchor: null });
        break;
      case 'stats':
        SelectedCompetition.GotoCompetition(CompetitionNav.STATS, null, false);
        setStateRef({ ...stateRef, menuAnchor: null });
        break;
      default:
        setStateRef({ ...stateRef, menuAnchor: null });
        break;
    }
  };

  // useEffect(() => {
  //   if (pageData?.length) setStateRef({ ...stateRef, badgeNumber: findNewNotificationsNumber(), });
  // });
  // useEffect(() => {
  //   console.log('stateRef: ', stateRef);
  //      if (pageData?.length) setStateRef({ ...stateRef, badgeNumber: pageData?.length > 0 ? pageData?.length : 0 });;
  //      console.log('*****');
  //      console.log(pageData);
  //    }, [pageData]);

  // determine the logo source
  const isPocketGames = getInstanceType(Inst_config.instance_id, INSTANCES_ID.POCKET_GAMES_ID);
  const isQuotient = getInstanceType(Inst_config.instance_id, INSTANCES_ID.QUOTIENT_ID);

  const webLogoSrc = Inst_config ? (isPocketGames || isQuotient ? Inst_config.logo.web_light : Inst_config.logo.web_dark) : '';
  const mobileLogoSrc = Inst_config
    ? isPocketGames || isQuotient
      ? Inst_config.logo.mobile_light
      : Inst_config.logo.mobile_dark
    : '';

  const isMobileOTP = Inst_config.is_mobile_otp;
  const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);

  const premium_competition = useSelector((state) => state.PremiumCompetition.data, shallowEqual);
  const isSubscribed = premium_competition?.is_subscribed === 1; // Ensure safe access

  return (
    <>
      {/*  Logout modal */}
      <ConfirmationBox
        visible={stateRef.logoutAnchor}
        callback={callback}
        // icon="logout"
        addCodeIcon={IMAGES.SIGN_OUT}
        ADD_CODE
        allowClose
        hideCross
        // title_bg="#112d70"
        className={styled.confirmation_box}
        buttonsContainer={styled.sign_out_buttons_container}
        title={texts.LOGOUT}
        primary={texts.CONFIRM_LOGOUT}
        positive={texts.LOGOUT}
        negative={texts.CANCEL}
        tag="logout"
      />

      <Rules
        callback={callback}
        menuAnchor={stateRef.rulesAnchor}
        competitionRules={!IsEmptyObject(competition) && competition.item ? competition.item.rules : 'No Rules.'}
        Header
      />

      <ProfileMenu
        hideCompetition={hideCoins}
        menuAnchor={stateRef.menuAnchor}
        callback={callback}
        username={User.NameResolver()}
        competition={competition}
        competitionDetails={competitionDetails}
        IsMcdUser={IsMcdUser}
        IsPremiumPurchased={isPremiumPurchased}
        isShupavu={isShupavu}
        isSubscribed={isSubscribed}
      />
      {!User.IsGuest() && competition.item && isUserNotSupportTeam && (
        <SidePanel
          stateRef={stateRef}
          setStateRef={setStateRef}
          setBadgeNumber={setBadgeNumber}
          clearDataCallback={() => {
            gameDispatch(API_CALLS.GetUserNotifications.CLEAR);
            setStateRef({ ...stateRef, areNotificationsSeen: true });
          }}
        />
      )}
      <Grid
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          visibility: invisibleScore ? 'hidden' : 'visible',
        }}
      >
        <Grid container className={`${styled.coinContainer} ${isPremiumPurchased === 1 && styled.premium_coin_container}`}>
          <IconButton data-tag="settings" onMouseUp={callback} className={styled.avatarImgContainer}>
            {isPremiumPurchased === 1 && currentComp && currentComp.item?.is_premium && (
              // <Tooltip disableFocusListener title="Premium User">
              <Box className={styled.premium_tag}>
                <img src={Cordova.Path(crown_image, true)} className={styled.PremiumIcon} alt="Premium User" />
                <span className={styled.PremiumText}>{texts.PREMIUM}</span>
              </Box>
              // </Tooltip>
            )}
            {/* herehere */}
          </IconButton>
          <div
            style={{ position: 'relative', display: 'flex', alignItems: 'center', visibility: invisibleScore ? 'hidden' : 'visible' }}
          >
            {!hideCoins && <Coins competition={competition} invisibleScore={invisibleScore} />}
          </div>
        </Grid>
        <IconButton data-tag="settings" onMouseUp={callback} className={styled.avatarImgContainer} style={{ marginLeft: '12px' }}>
          <AvatarSwitcher t={user.profile_picture || '1'} s={45} className={styled.topAvatar} />
        </IconButton>
      </Grid>

      {showLogo && (
        <Grid className={styled.logoContainer}>
          {isSmOrLess ? (
            <Box className={`${styled.mobileLogoBox} ${isMobileOTP ? styled.mobileLogoBoxShupavu : ''}`}>
              <img
                src={mobileLogoSrc}
                className={isPocketGames ? 'filter_none' : isMobileOTP ? 'filter_none' : 'image_filter'}
                alt="logo"
              />
            </Box>
          ) : (
            <Box
              onClick={callback}
              data-tag="logo"
              className={`
                ${styled.webLogoBox} 
                ${isGlobalClimate ? styled.webLogoBoxGG : ''} 
                ${isPocketGames ? styled.webLogoBoxPG : ''}
              `}
            >
              <img
                src={webLogoSrc}
                className={isPocketGames ? 'filter_none' : isMobileOTP ? 'filter_none' : 'image_filter'}
                alt="logo"
              />
            </Box>
          )}
        </Grid>
      )}

      {/* <Box style={{ borderRadius: '100px', backgroundColor: 'white', width: '46px', height: '46px' marginLeft: '12px', }}>
    <AvatarSwitcher t={user.profile_picture || '1'} s={48} className={styled.topAvatar} />
    </Box> */}

      {currentComp.item?.competition_id && !User.IsGuest() && user?.active_role !== 'principal' && (
        <Box className={styled.hoverHeaderBtn} style={{ borderRadius: '100px', width: '46px', height: '46px', marginLeft: '12px' }}>
          <IconButton data-tag="notifications" onClick={callback} className={styled.avatarImgContainer}>
            <Badge badgeContent={badgeNumber} color="secondary" overlap="rectangular">
              <img
                src={Bell}
                alt="Notifications"
                className="i i-notification_bell icon-button"
                style={{ width: '26px', height: '26px' }}
              />
            </Badge>
          </IconButton>
        </Box>
      )}
    </>
  );
});

const Coins = React.memo(({ competition, invisibleScore = false }) => {
  const user = User.Info();
  const styled = useStyles();
  let coinsToShow = <Skeleton variant="rect" width="32px" height="24px" className={styled.skeleton} />;
  if ((competition && competition.user_data) || User.IsGuest()) {
    let coins = competition?.user_data?.points || 0;
    if (User.IsGuest()) {
      coins = User.GuestSavedData().points;
    }
    coinsToShow = (
      <H3 pt={0.25} className={styled.coins}>
        {Numbers.AbbreviatedNumber(coins, 2)}
      </H3>
    );
  }

  // console.log(competition, "competitioncompetition", User.GuestSavedData("get"), coinsToShow)
  return (
    <>
      {user.active_role !== 'principal' && (User.IsGuest() || competition.user_data !== undefined) && (
        <Box className={`${styled.coinsWrapper} coins__container`} style={{ visibility: invisibleScore ? 'hidden' : 'visible' }}>
          <CoinIcon position="absolute" left="-3px" top="-3px" width="46px" height="46px" />
          {coinsToShow}
        </Box>
      )}
    </>
  );
});

export default RightMenu;
