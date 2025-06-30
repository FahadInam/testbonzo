import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Grid, Button, Box, useTheme } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { ReadUserNotifications, DeleteUserNotification } from 'Actions/competitions.action';
import { SetInvitationStatus } from 'Actions/challenge.action';
import { SelectedCompetition } from 'Actions';
import { AvatarSwitcher, ALERT } from 'Constants';
import List from '@material-ui/core/List';
import { CompetitionNav, DefaultNav } from 'Navigation/Paths';
import ListItem from '@material-ui/core/ListItem';
import { PageSwitch } from 'Navigation';
import User from 'Actions/user.action';
import { Toast, Spinner } from 'Actions/app.control.action';
import { friendlyDateFormat, Cordova, formatText, getInstanceType } from 'Utils';
// import { gameDispatch } from 'Utils/ActionCreators';
import logo from 'Assets/images/pb-web-logo.png';
import webLogoGreenGuardians from 'Assets/home-img/gg-web-logo.svg';
import dailyBadge from 'Assets/images/dailybadge.png';
import weeklyBadge from 'Assets/images/weeklybadge.png';
import monthlyBadge from 'Assets/images/monthlybadge.png';
import eocBadge from 'Assets/images/eocbadge.png';
import ButtonBold from './Core/ButtonBold';
import InfoModal from './InfoModal/InfoModal';
import bellIcon from '../Assets/images/yellow-bell.png';
import { INSTANCES_ID } from 'Constants/instance.config';

// import Divider from '@material-ui/core/Divider';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';

window.timerSliderNotifications = null;
const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: 300,
    minWidth: '300px',
    // backgroundColor: 'white',
    color: '#415861',
    borderRadius: '20px',
  },
  root: {
    width: '100%',
    padding: '1rem 0.6rem',
    /* maxWidth: '36ch', */
    // backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  avatarNotification: {
    width: '42px',
    height: '42px',
  },
  EachListItem: {
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: '#EEEEEE',
      // Reset on touch devices, it doesn't add specificity
      // '@media (hover: none)': {
      //   backgroundColor: 'transparent',
      // },
    },
  },
  dummy: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  eachItem: {
    color: '#415861',
    cursor: 'pointer',
  },
  avatarIcon: {
    color: '#ffffff',
  },
  profilePic: { borderRadius: '250px', position: 'absolute', width: '24px', top: '46px', left: '46px' },
  button: {
    backgroundColor: '#00DBAA',
    color: '#FFFFFF',
    marginRight: '8px',
    marginTop: '8px',
    fontSize: '12px',
    padding: 'auto 8px',
    '&:hover': {
      backgroundColor: '#EEEEEE',
    },
  },
  buttonR: {
    backgroundColor: '#F04E79',
    color: '#FFFFFF',
    marginTop: '8px',
    fontSize: '12px',
    padding: 'auto 8px',
    '&:hover': {
      backgroundColor: '#EEEEEE',
    },
  },
  notificationCircle: {
    width: '8px',
    height: '8px',
    backgroundColor: 'red',
    borderRadius: '100px',
    position: 'absolute',
    top: '0px',
    left: '17px',
  },
});

const ACTION_TYPE = {
  RESULT: { name: 'RESULT', color: '#F04E79', icon: 'flag-success', id: 2 },
  MESSAGE: { name: 'MESSAGE', color: '#2693F1', icon: 'email', id: 0 },
  INVITATION: { name: 'INVITATION', color: '#00DBAA', icon: 'opponent-friend', id: 1 },
  REWARD: { name: 'REWARD', color: '#a94ec0', icon: 'rewards', id: 6 },
  REWARD_SCREEN: { name: 'REWARD_SCREEN', color: '#a94ec0', icon: 'rewards', id: 3 },
  NOTIFICATION: { name: 'NOTIFICATION', color: '#f0a84e', icon: 'email', id: 4 },
  PAYMENT: { name: 'PAYMENT', color: '#9f63ff', icon: 'credit-card', id: 5 },
};

const EachItem = ({
  dateTime,
  cMessage,
  isRead,
  index,
  localCallback,
  callback,
  itemObject,
  isSupportCenterVersion = false,
  isGlobalClimate,
}) => {
  //  console.log(cMessage, "cMessage")
  const { texts } = useTheme();
  const classes = useStyles();
  //  const options = {
  //    hour: 'numeric',
  //    minute: 'numeric',
  //    day: 'numeric',
  //    month: 'short',
  //    year: '2-digit',
  //  };
  // const CustomLink = React.useMemo(() => React.forwardRef((linkProps, ref) => <Link ref={ref} to={to} {...linkProps} />), [to]);
  const item = itemObject;
  let newMessage = formatText(cMessage, item.json_data);
  const user = User.Info();
  const isPopupExist = item.event_item === 5 || item.event_item === 4;
  const isShuErrNotif = item.event_item === 6 || item.event_item === 7;
  if (item.event_item !== ACTION_TYPE.MESSAGE.id && isSupportCenterVersion) return null;
  // const rewardType = 'daily'; //item.event_item === ACTION_TYPE.REWARD.id ? JSON.parse(item.json_data)[0].award_type : null;

  const isNoLinkNotification =
    item.event_item === ACTION_TYPE.NOTIFICATION.id &&
    // eslint-disable-next-line no-prototype-builtins
    !(item.json_data && JSON.parse(item.json_data)?.hasOwnProperty('link'));
  // console.log('isNoLinkNotification: ', isNoLinkNotification);
  const REWARD_IMG = { daily: dailyBadge, weekly: weeklyBadge, monthly: monthlyBadge, eoc: eocBadge, none: '' };

  /* QUICK DUPLICATE OF RETURN IN CASE OF SUPPORT CENTER ---- START */
  if (isSupportCenterVersion) {
    return (
      <List className={classes.root}>
        <ListItem
          alignItems="flex-start"
          button={item.event_item !== ACTION_TYPE.INVITATION.id}
          key={index}
          data-tag={`list_ ${index}`}
          name={`namelist_ ${index}`}
          // onClick={callback}
          onClick={() => callback(item)}
          style={{
            borderRadius: '12px',
            backgroundColor: !isRead ? '#F2F2F2' : '',
            width: isSupportCenterVersion ? '100%' : 'inherit',
          }}
          className={item.event_item !== ACTION_TYPE.INVITATION.id && !isNoLinkNotification ? classes.EachListItem : classes.dummy}
        >
          <Grid container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} className={classes.eachItem}>
            <Grid style={{ width: '52px', flexBasis: '18%' }} item xs={3}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '52px',
                  height: '52px',
                  borderRadius: '250px',
                  backgroundColor: ACTION_TYPE[item.event_item]?.color || '#FFCC00',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                {/* <div
                  style={{
                    display: isRead ? 'none' : 'block',
                    position: 'absolute',
                    borderRadius: '50px',
                    width: '12px',
                    height: '12px',
                    top: 10,
                    left: 20,
                    backgroundColor: '#CC0000',
                  }}
                /> */}
                <div className={classes.profilePic}>
                  <AvatarSwitcher t={item.profile_picture} s={52} u={52} shadowed />
                </div>
                {item.event_item === ACTION_TYPE.NOTIFICATION.id && (
                  <img
                    src={Cordova.Path(isGlobalClimate ? webLogoGreenGuardians : logo, true)}
                    style={{
                      width: '25px',
                      height: '25px',
                      position: 'absolute',
                      top: '40px',
                      left: '40px',
                      boxShadow: '1px 0px 4px rgba(0,0,0,0.35)',
                    }}
                    alt="1on1"
                  />
                )}
                {/* {console.log('item.json_data: ', item.json_data)} */}
                {item.event_item === ACTION_TYPE.REWARD.id && item.json_data && (
                  <img
                    src={Cordova.Path(REWARD_IMG[JSON.parse(item.json_data)?.award_type || 'none'] || '', true)}
                    style={{ width: '40px', height: '35px' }}
                    alt="Reward"
                  />
                )}
                {/* {console.log('ACTION_TYPE[item.event_item]?.icon: ', ACTION_TYPE[item.event_item]?.icon)} */}
                {item.event_item !== ACTION_TYPE.REWARD.id && (
                  <i
                    className={`i i-${ACTION_TYPE[item.event_item || 'NOTIFICATION']?.icon || 'email'}`}
                    style={{ color: '#FFFFFF', fontSize: '1.6rem' }}
                  />
                )}
                {/* {item.event_item === ACTION_TYPE.REWARD.id && (
                <i
                  className='i i-rewards'
                  style={{ color: '#FFFFFF', fontSize: '1.6rem' }}
                />
              )}  */}
                {/* {item.event_item === ACTION_TYPE.REWARD_SCREEN.id && (
                <i
                  className='i i-rewards'
                  style={{ color: '#FFFFFF', fontSize: '1.6rem' }}
                />
              )} */}
              </div>
            </Grid>
            <Grid item xs={9}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: isSupportCenterVersion ? '100%' : 'auto' }}>
                  <small
                    style={{
                      display: 'initial',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      backgroundColor: ACTION_TYPE[item.event_item]?.color || '#FFCC00',
                      color: '#FFFFFF',
                      flexGrow: 0,
                    }}
                  >
                    {/* {new Date(`${dateTime}Z`).toLocaleString()} */}

                    {friendlyDateFormat(new Date(`${dateTime}Z`).toString())}
                    {/* {new Date(`${dateTime}Z`).toLocaleDateString('en', options) } */}
                  </small>
                  <div style={{ marginTop: '8px' }}>
                    <small>{cMessage || 'Unknown message'}</small>
                    <div
                      style={{
                        textAlign: 'center',
                        display: item.event_item === ACTION_TYPE.INVITATION.id ? 'flex' : 'none',
                      }}
                    >
                      <Button tag="ACCEPT_BTN" mr={4} className={classes.button} onClick={() => callback(item, 'accept')}>
                        ACCEPT
                      </Button>
                      <Button className={classes.buttonR} mr={4} tag="REJECT_BTN" onClick={() => callback(item, 'reject')}>
                        REJECT
                      </Button>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    // display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    margin: '12px',
                    padding: '12px',
                    display: item.event_item === ACTION_TYPE.INVITATION.id || isNoLinkNotification ? 'none' : 'flex',
                  }}
                >
                  <i className="i i-right" style={{ color: '#ABBFC7' }} />
                </div>
              </div>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    );
  }

  /* QUICK DUPLICATE OF RETURN IN CASE OF SUPPORT CENTER ---- END */

  return (
    <List className={classes.root}>
      <ListItem
        alignItems="flex-start"
        button={item.event_item !== ACTION_TYPE.INVITATION.id}
        key={index}
        data-tag={`list_ ${index}`}
        name={`namelist_ ${index}`}
        // onClick={callback}
        onClick={() => {
          if (item.event_item === 5 || item.event_item === 4) {
            localCallback('openInfo', item);
          } else {
            !isShuErrNotif && callback(item);
          }
        }}
        style={{
          borderRadius: '12px',
          backgroundColor: isPopupExist && !isRead ? 'rgba(255, 229, 0, 0.14)' : !isRead ? '#F2F2F2' : '',
          width: isSupportCenterVersion ? '100%' : 'inherit',
          // border: '1px solid red',
        }}
        className={item.event_item !== ACTION_TYPE.INVITATION.id && !isNoLinkNotification ? classes.EachListItem : classes.dummy}
      >
        <Grid container display="flex" direction="row" className={classes.eachItem}>
          <Grid style={{ width: '52px', flexBasis: '18%' }} item xs={3}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '42px',
                height: '44px',
                borderRadius: '250px',
                // backgroundColor: ACTION_TYPE[item.event_item]?.color || '#FFCC00',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
            >
              {/* <Box
                style={{
                  display: isRead ? 'none' : 'block',
                  position: 'absolute',
                  borderRadius: '50px',
                  width: '12px',
                  height: '12px',
                  top: 10,
                  left: 20,
                  backgroundColor: '#CC0000',
                }}
              /> */}
              {/* <Box className={classes.profilePic}> */}
              {isPopupExist ? (
                <div style={{ position: 'relative' }}>
                  <img src={bellIcon} alt="bell" style={{ width: '28px' }} />
                  {!isRead && <Box className={classes.notificationCircle}></Box>}
                </div>
              ) : (
                <AvatarSwitcher
                  t={JSON.parse(item.json_data).opponent_profile_picture || user.profile_picture}
                  s={44}
                  u={42}
                  shadowed
                />
              )}

              {/* </Box> */}
              {/* {item.event_item === ACTION_TYPE.NOTIFICATION.id && (
                <img
                  src={Cordova.Path(logo, true)}
                  style={{
                    width: '25px',
                    height: '25px',
                    position: 'absolute',
                    top: '40px',
                    left: '40px',
                    boxShadow: '1px 0px 4px rgba(0,0,0,0.35)',
                  }}
                  alt="1on1"
                />
              )} */}
              {/* {console.log('item.json_data: ', item.json_data)} */}
              {/* {item.event_item === ACTION_TYPE.REWARD.id && item.json_data && (
                <img
                  src={Cordova.Path(REWARD_IMG[JSON.parse(item.json_data)?.award_type || 'none'] || '', true)}
                  style={{ width: '40px', height: '35px' }}
                  alt="Reward"
                />
              )} */}
              {/* {console.log('ACTION_TYPE[item.event_item]?.icon: ', ACTION_TYPE[item.event_item]?.icon)} */}
              {/* {item.event_item !== ACTION_TYPE.REWARD.id && (
                <i
                  className={`i i-${ACTION_TYPE[item.event_item || 'NOTIFICATION']?.icon || 'email'}`}
                  style={{ color: '#FFFFFF', fontSize: '1.6rem' }}
                />
              )} */}
              {/* {item.event_item === ACTION_TYPE.REWARD.id && (
                <i
                  className='i i-rewards'
                  style={{ color: '#FFFFFF', fontSize: '1.6rem' }}
                />
              )}  */}
              {/* {item.event_item === ACTION_TYPE.REWARD_SCREEN.id && (
                <i
                  className='i i-rewards'
                  style={{ color: '#FFFFFF', fontSize: '1.6rem' }}
                />
              )} */}
            </div>
          </Grid>
          <Grid item xs={9}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ width: isSupportCenterVersion ? '100%' : 'auto' }}>
                <div>
                  <small
                    style={{ color: isPopupExist ? '#313644' : '', fontWeight: isPopupExist ? '500' : '' }}
                    dangerouslySetInnerHTML={{ __html: newMessage || 'Unknown message' }}
                  />
                  <small
                    style={{
                      display: 'flex',
                      // padding: '2px 8px',
                      marginTop: '0.6rem',
                      borderRadius: '6px',
                      // backgroundColor: ACTION_TYPE[item.event_item]?.color || '#FFCC00',
                      color: '#777777',
                      flexGrow: 0,
                    }}
                  >
                    {/* {new Date(`${dateTime}Z`).toLocaleString()} */}

                    {friendlyDateFormat(new Date(`${dateTime}Z`).toString())}
                    {/* {new Date(`${dateTime}Z`).toLocaleDateString('en', options) } */}
                  </small>
                  <div
                    style={{
                      textAlign: 'center',
                      display: item.event_item === ACTION_TYPE.INVITATION.id || isShuErrNotif ? 'flex' : 'none',
                      gap: '2.5rem',
                    }}
                  >
                    <ButtonBold
                      bgBlue
                      yellowBubble
                      rejectButton
                      secondaryYellow
                      noShadow
                      notificationButton
                      className={classes.buttonR}
                      mr={4}
                      tag="REJECT_BTN"
                      onClick={() => {
                        if (isShuErrNotif) {
                          localCallback('cancel', item);
                        } else {
                          callback(item, 'reject');
                        }
                      }}
                    >
                      {isShuErrNotif ? texts.CANCEL : texts.REJECT}
                    </ButtonBold>
                    <ButtonBold
                      noShadow
                      secondaryYellow
                      yellowBubble
                      acceptButton
                      notificationButton
                      tag="ACCEPT_BTN"
                      mr={4}
                      className={classes.button}
                      onClick={() => {
                        if (isShuErrNotif) {
                          localCallback('continue', item);
                        } else {
                          callback(item, 'accept');
                        }
                      }}
                    >
                      {isShuErrNotif ? texts.CONTINUE : texts.ACCEPT}
                    </ButtonBold>
                  </div>
                </div>
              </div>
              {/* <Box
                m={2}
                spacing={6}
                style={{
                  // display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  margin: '0px',
                  display: item.event_item === ACTION_TYPE.INVITATION.id || isNoLinkNotification ? 'none' : 'flex',
                }}
              >
                <i className="i i-right" style={{  
                    color: '#414141',
      width: '40px', 
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid #DCDCDC', 
      borderRadius: '50%',
      fontWeight: 700,
      }} />
              </Box> */}
            </div>
          </Grid>
        </Grid>
        {/* <ListItemAvatar>
          <Avatar className={classes.avatarNotification} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <>
              <Typography component="span" variant="body2" className={classes.inline}>
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </>
          }
        /> */}
      </ListItem>
      {/* <Divider component="li" /> */}
      {/* <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className={classes.avatarNotification} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <>
              <Typography component="span" variant="body2" className={classes.inline}>
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className={classes.avatarNotification} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <>
              <Typography component="span" variant="body2" className={classes.inline}>
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </>
          }
        />
      </ListItem> */}
    </List>
  );
};

const SidePanel = React.memo(({ stateRef, setStateRef, setBadgeNumber, clearDataCallback, isSupportCenterVersion = false }) => {
  const history = useHistory();
  const [popupRef, setPopupRef] = useState({ rulesAnchor: false });
  const [eventId, setEventId] = useState('');

  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);

  const nLoader = (
    <>
      <svg
        style={{ width: '120px', height: '40px', margin: 'auto' }}
        version="1.1"
        id="L4"
        width="140"
        height="40"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 0 0"
        xmlSpace="preserve"
      >
        <circle fill="#dddddd" stroke="none" cx="6" cy="50" r="6">
          <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" />
        </circle>
        <circle fill="#dddddd" stroke="none" cx="26" cy="50" r="6">
          <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" />
        </circle>
        <circle fill="#dddddd" stroke="none" cx="46" cy="50" r="6">
          <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" />
        </circle>
      </svg>
    </>
  );
  const classes = useStyles();
  const { texts } = useTheme();
  // console.log('pageData Inside: ', pData);
  const [isPanelFree, setIsPanelFree] = useState(true);

  const pageData = { error_code: 0, data: useSelector((state) => state.GetUserNotifications, shallowEqual) };
  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  // console.log(pageData, "pageData")
  const dispatch = useDispatch();
  const user = User.Info();
  const currentComp = SelectedCompetition.Info();
  // eslint-disable-next-line
  const loadData = useCallback(
    () => {
      // console.log('currentComp.item.competition_id: ', currentComp.item?.competition_id);
      if (!isSupportCenterVersion)
        dispatch(
          ReadUserNotifications({ competition_id: currentComp.item?.competition_id }, () => {
            setBadgeNumber(0);
            if (clearDataCallback) clearDataCallback();
            // console.log('pageData after clearing: ', pageData);
            // console.log('Notification number cleared');
          })
        );
      // eslint-disable-next-line
    }, // eslint-disable-next-line
    [dispatch, currentComp.item?.competition_id]
  );
  // useEffect(() => {
  //   console.log('sending read notification request');
  //   if (stateRef) loadData();
  // }, [stateRef]);
  // console.log('pageData2 Inside: ', pageData2);
  // console.log('currentComp: ', currentComp);
  // JSON.parse("{\"error_code\":0,\"data\":[{\"sender_id\":708,\"profile_picture\":\"10\",\"is_read\":false,\"message\":\"Kingslayer2@kp.com has completed the challenge. Check the result!\",\"sent_on\":\"2020-08-13T04:24:05.7000000\",\"match_id\":89387},{\"sender_id\":708,\"profile_picture\":\"10\",\"is_read\":false,\"message\":\"Kingslayer2@kp.com has sent you a challenge request.\",\"sent_on\":\"2020-08-13T04:21:14.8733333\"}]}");
  // console.log('pageData Inside: ', pageData);
  /* useEffect(() => {
    if (pageData) {
     // console.log('Final PageData Inside: ', pageData);
    }
  }, [pageData]); */

  const handleDrawerToggle = () => {
    setStateRef({ ...stateRef, sideMenuState: !stateRef.sideMenuState });
    if (stateRef.sideMenuState) loadData();
    else {
      setBadgeNumber(0);
    }
  };

  const localCallback = (e, item) => {
    const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag');
    switch (t) {
      case 'openInfo':
        setEventId(item?.event_item);
        setPopupRef({ ...popupRef, rulesAnchor: true });
        handleDrawerToggle();

        break;
      case 'continue-rules':
      case 'close':
      case 'overlay':
        setPopupRef({ ...popupRef, rulesAnchor: false });
        setEventId('');
        break;
      case 'continue':
        PageSwitch(DefaultNav.PAYMENT);
        setEventId('');
        handleDrawerToggle();
        break;
      case 'cancel':
        handleDrawerToggle();
        setEventId('');
        break;
      default:
        break;
    }
  };

  const callback = (item, payload) => {
    //console.log('here noti', item);
    if (!isPanelFree) return;
    setIsPanelFree(false);

    const xT = setTimeout(() => {
      setIsPanelFree(true);
      clearTimeout(xT);
    }, 1000);

    // loadData();
    // const JsonData = JSON.parse(item.json_data);
    // console.log('JsonData: ', JsonData);

    /*
    competition_id: 19
match_id: 290420
row_id: 311181
session_id: "98863229CC974A9B812739A63C2E7342"
status: 1
timestamp: 1640269023332
user_id: 7525
    */
    // console.log('newInviteItem: ', newInviteItem);
    // const newCompItem = JSON.parse(JSON.stringify(currentComp.item));
    // newCompItem.row_id = JsonData[0]?.row_id;
    // console.log('newCompItem: ', newCompItem);
    // newCompItem.match_id = item.match_id;
    // const t = e.currentTarget.getAttribute('data-tag') || e.target.id;
    // console.log('t: ', item);
    // console.log('t: ', JSON.parse(item.json_data)[0].row_id);
    // if (!item.action_type) return;
    // if (item.event_item === ACTION_TYPE.INVITATION.id) return;
    // console.log(item.event_item);
    // console.log(ACTION_TYPE.MESSAGE);

    switch (item.event_item) {
      case ACTION_TYPE.PAYMENT.id:
        PageSwitch(CompetitionNav.MY_PURCHASES);
        handleDrawerToggle();
        break;
      case ACTION_TYPE.NOTIFICATION.id:
        if (!isSupportCenterVersion)
          dispatch(
            ReadUserNotifications({ competition_id: currentComp.item?.competition_id }, () => {
              setBadgeNumber(0);
              if (clearDataCallback) clearDataCallback();
              //  console.log('pageData after clearing: ', pageData);
              // console.log('Notification number cleared');
              // eslint-disable-next-line no-prototype-builtins
              if (item.json_data && JSON.parse(item.json_data)?.hasOwnProperty('link')) {
                const mylink = JSON.parse(item.json_data).link;
                if (mylink.indexOf('http') > -1) {
                  window.location.href = mylink;
                } else {
                  history.push(mylink);
                }
              }
            })
          );
        else if (item.json_data && JSON.parse(item.json_data)?.hasOwnProperty('link')) {
          const mylink = JSON.parse(item.json_data).link;
          if (mylink.indexOf('http') > -1) {
            window.location.href = mylink;
          } else {
            history.push(mylink);
          }
        }
        break;
      case ACTION_TYPE.INVITATION.id:
        // console.log(JSON.parse(item.json_data), "JSON.parse(item.json_data)")
        Spinner.Show();
        // console.log('its an invitation action!');
        // eslint-disable-next-line no-case-declarations
        const newInviteItem = {
          competition_id: currentComp.item?.competition_id,
          is_new_message: 1,
          is_same_grade: 1,
          profile_picture: item.profile_picture,
          tag: 'SET_OPPONENT',
          user_id: item.sender_id,
          row_id: JSON.parse(item.json_data).row_id,
          match_id: JSON.parse(item.json_data).match_id,
          // hold_navigation: true,
          current_grade: item.grade,
          content_id: JSON.parse(item.json_data).content_id,
          link: JSON.parse(item.json_data).link,
          opponent_profile_picture: JSON.parse(item.json_data).opponent_profile_picture,
          opponent_name: JSON.parse(item.json_data).opponent_name,
          opponent_username: JSON.parse(item.json_data).opponent_username,
          opponent_id: JSON.parse(item.json_data).opponent_id,
          content_type: JSON.parse(item.json_data).content_type,
          skill: JSON.parse(item.json_data).content_title,
          delete_notification: true,
          simulation_time_limit: JSON.parse(item.json_data)?.simulation_time_limit,
        };
        // console.log('newInviteItem: ', newInviteItem);
        if (payload === 'accept') {
          handleDrawerToggle();
          dispatch(
            SetInvitationStatus(
              newInviteItem,
              newInviteItem,
              'accept',
              texts,
              () => {
                dispatch(
                  DeleteUserNotification(
                    {
                      competition_id: currentComp.item?.competition_id,
                      notification_id: item.notification_id,
                    }
                    // () => {
                    //   SelectedCompetition.GotoCompetition(CompetitionNav.COMPETITION_HOME, {}, true, true);
                    //   Toast.Show('Challenge Accepted. Check "Your Turn" section to play.', ALERT.SUCCESS);
                    //   setTimeout(() => {
                    //     Spinner.Hide();
                    //     window.location.reload();
                    //   }, 1500);
                    // }
                  )
                );
              },
              IsMcdUser
            )
          );
        } else if (payload === 'reject') {
          handleDrawerToggle();
          dispatch(
            SetInvitationStatus(
              newInviteItem,
              newInviteItem,
              'reject',
              texts,
              () => {
                dispatch(
                  DeleteUserNotification(
                    {
                      user_id: user.user_id,
                      competition_id: currentComp.item?.competition_id,
                      grade: item.grade,
                      notification_id: item.notification_id,
                    },
                    () => {
                      Toast.Show('Challenge Rejected.', ALERT.ERROR);
                      setTimeout(() => {
                        Spinner.Hide();
                        window.location.reload();
                      }, 1500);
                    }
                  )
                );
              },
              IsMcdUser
            )
          );
        } else {
          Spinner.Hide();
        }
        // handleDrawerToggle();
        break;
      case ACTION_TYPE.MESSAGE.id:
        // eslint-disable-next-line no-case-declarations
        const newMessageItem = {
          is_new_message: 1,
          is_same_grade: 1,
          profile_picture: item.profile_picture,
          tag: 'SET_OPPONENT',
          user_id: item.sender_id,
          is_from_support: isSupportCenterVersion,
          notification_id: isSupportCenterVersion ? item.notification_id || null : null,
        };
        // console.log('newMessageItem: ', newMessageItem);
        setBadgeNumber(0);
        SelectedCompetition.GotoCompetition(CompetitionNav.CHAT, newMessageItem, false);

        handleDrawerToggle();
        break;
      case ACTION_TYPE.RESULT.id:
        setBadgeNumber(0);
        SelectedCompetition.GotoCompetition(CompetitionNav.COMPETITION_HOME, { scroll: true }, true, true);

        handleDrawerToggle();
        // console.log('its a result action!');
        break;
      case ACTION_TYPE.REWARD.id:
        PageSwitch(CompetitionNav.REWARDS);
        setBadgeNumber(0);
        handleDrawerToggle();
        // console.log('its a reward action!');
        break;
      case ACTION_TYPE.REWARD_SCREEN.id:
        PageSwitch(CompetitionNav.REWARDS);
        setBadgeNumber(0);
        handleDrawerToggle();
        // console.log('its a reward action!');
        break;
      default:
        //   console.log('ERROR: its a default action!');
        break;
    }
    // switch (t) {
    //   case 'overlay':
    //   case 'close':
    //   case 'retry-negative':
    //     setShowModalBox(false);
    //     break;
    //   case 'retry-positive':
    //     dispatch(RetryApiRequest());
    //     break;
    //   default:
    //     break;
    // }
    // console.log('Yes this is a drawer for sure.');
  };

  // const findNewNotificationsNumber = () => {
  //   let newNum = 0;
  //   if (pageData && pageData.data?.rows) {
  //     const pD = pageData.data?.rows;
  //     // console.log('pD: ', pD);
  //     if (!pD) return 0;
  //     if (pD instanceof Array) {
  //       pD.forEach((item) => {
  //         if (!item.is_read) newNum += 1;
  //       });

  //       return newNum;
  //     }
  //     return 0;
  //   }
  //   return -1;
  // };

  //  console.log(pageData, 'sidepanel');

  const usersInAction = [];
  const drawer = (
    <>
      <Box style={{ maxWidth: isSupportCenterVersion ? '100%' : '350px' }}>
        {!isSupportCenterVersion && (
          <Box
            spacing={3}
            display="flex"
            direction="row"
            style={{
              position: 'fixed',
              // borderBottom: '2px solid #EEEEEE',
              backgroundColor: 'white',
              width: '100%',
              maxWidth: isSupportCenterVersion ? '100%' : '350px',
              zIndex: 501,
              flexDirection: 'row-reverse',
              borderTopLeftRadius: '20px',
            }}
          >
            <Box>
              <Button tag="go-back" type="submit" onClick={handleDrawerToggle}>
                <i
                  className="i i-cross"
                  style={{
                    color: '#11142D',
                    backgroundColor: '#EEEEEE',
                    borderRadius: '250px',
                    fontSize: '12px',
                    fontWeight: 800,
                    padding: '12px',
                    cursor: 'pointer',
                  }}
                />
              </Button>
            </Box>
            <Box display="flex" style={{ width: '75%', justifyContent: 'center', alignItems: 'center' }} direction="row">
              <Box width="100%">
                <h3 style={{ color: '#415861', marginTop: '12px', zIndex: '500!important', fontSize: '18px' }}>Notifications</h3>
              </Box>
              {/* <b
              style={{
                display: findNewNotificationsNumber() > 0 ? 'flex' : 'none',
                color: 'white',
                backgroundColor: '#CC0000',
                fontWeight: 'bold',
                padding: '2px',
                borderRadius: '250px',
                margin: '12px',
                width: '24px',
                height: '24px',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {findNewNotificationsNumber()}
            </b> */}
            </Box>
          </Box>
        )}

        {!isSupportCenterVersion && <Box mt={3}>&nbsp;</Box>}
        {pageData?.data?.rows?.length < 1 && (
          <Box style={{ minWidth: '350px', padding: '18px 6px', color: '#415861', textAlign: 'center' }}>
            <p>No recent notifications.</p>
          </Box>
        )}
        {(!pageData || !pageData.data?.rows || pageData.error_code !== 0) && (
          <Box style={{ minWidth: '350px', padding: '18px 6px', color: '#415861', textAlign: 'center' }}>
            <p>
              {nLoader}
              {/* <img style={{ width: '120px', height: '40px', margin: 'auto', backgroundImage: nLoader }} src={nLoader} alt="Loading" /> */}
            </p>
          </Box>
        )}
        {pageData.data?.rows instanceof Array &&
          pageData.data?.rows?.map((item, index) => {
            window.wwwwww = index;
            // console.log('>', item);
            if (item.event_item === ACTION_TYPE.MESSAGE.id && !usersInAction.includes(item.sender_id)) {
              // console.log('new id: ', item.sender_id);
              usersInAction.push(item.sender_id);
              return (
                // eslint-disable-next-line react/no-array-index-key
                <EachItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  dateTime={item.on_date}
                  cMessage={item.message_inapp}
                  isRead={item.is_read}
                  callback={callback}
                  localCallback={localCallback}
                  itemObject={item}
                  isSupportCenterVersion
                  isGlobalClimate={isGlobalClimate}
                />
              );
            }
            if (item.event_item !== ACTION_TYPE.MESSAGE.id) {
              return (
                // eslint-disable-next-line react/no-array-index-key

                <EachItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  dateTime={item.on_date}
                  cMessage={item.message_inapp}
                  isRead={item.is_read}
                  callback={callback}
                  localCallback={localCallback}
                  itemObject={item}
                  isGlobalClimate={isGlobalClimate}
                />
              );
            }
            // eslint-disable-next-line react/no-array-index-key
            return <React.Fragment key={index} />;
          })}
      </Box>
      <InfoModal callback={localCallback} menuAnchor={popupRef.rulesAnchor} itemId={eventId} Header />
    </>
  );

  if (isSupportCenterVersion) {
    // console.log('yes its a drawer..');
    return <div style={{ width: '100%' }}>{drawer}</div>;
  }
  // console.log('no, its not a drawer..');
  return (
    <Drawer
      style={{ zIndex: '500!important' }}
      anchor="right"
      open={stateRef.sideMenuState}
      // className={classes.fullList}
      className={`${classes.fullList} customDrawer`}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      {drawer}
    </Drawer>
  );
});
export default SidePanel;
