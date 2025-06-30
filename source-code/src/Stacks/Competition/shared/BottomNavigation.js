/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { CompetitionFooterLinks, PageSwitch } from 'Navigation';
import { GameLogo } from 'Components';
import User from 'Actions/user.action';
import { SelectedCompetition } from 'Actions';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import useCurrentPath from 'Utils/PathFinder';
// import { IsEmptyObject } from 'Utils';
import { shallowEqual, useSelector } from 'react-redux';
import { CompetitionNav } from 'Navigation/Paths';
import { ReactComponent as FriendsIcon } from 'Assets/images/bonzoui/sidenav/friends.svg';
import { ReactComponent as HomeIcon } from 'Assets/images/bonzoui/sidenav/home.svg';
import { ReactComponent as LeaderboardIcon } from 'Assets/images/bonzoui/sidenav/leaderboard.svg';
import { ReactComponent as LessonsIcon } from 'Assets/images/bonzoui/sidenav/lessons.svg';
import { ReactComponent as OverviewIcon } from 'Assets/images/bonzoui/sidenav/overview.svg';
import { ReactComponent as PlayersIcon } from 'Assets/images/bonzoui/sidenav/players.svg';
import { ReactComponent as RewardsIcon } from 'Assets/images/bonzoui/sidenav/rewards.svg';
import { ReactComponent as SupportChatIcon } from 'Assets/images/bonzoui/sidenav/support_chat.svg';
import { ReactComponent as Games } from 'Assets/images/bonzoui/sidenav/games.svg';
import { useHistory } from 'react-router-dom';
import { getInstanceType } from 'Utils';
import { INSTANCES_ID } from 'Constants/instance.config';

const useStyles = makeStyles((theme) => ({
  noPrint: {
    '@media print': {
      visibility: 'hidden',
    },
  },
  nav: {
    minHeight: '62px',
    flex: '0 0 62px',
    flexBasis: '62px',
    flexGrow: 0,
    flexShrink: 0,
    maxWidth: '100%',
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background.paper,
    [theme.breakpoints.up('lg')]: {
      flex: '0 0 84px',
      flexBasis: '84px',
      flexGrow: 0,
      flexShrink: 0,
      maxWidth: '84px',
      minHeight: 'inherit',
    },
    [theme.breakpoints.up('xl')]: {
      width: '248px',
      flex: '0 0 248px',
      flexBasis: '248px',
      flexGrow: 0,
      flexShrink: 0,
      maxWidth: '248px',
    },
  },
  root: {
    width: '100%',
    border: 0,
    paddingTop: 0,
    paddingLeft: 0,
    // paddingLeft: theme.spacing(1.5),
    //paddingRight: theme.spacing(1.5),
    flexDirection: 'row',
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
    maxWidth: '420px',
    margin: '50px auto',
    flex: '1 1 auto',
    [theme.breakpoints.down('md')]: {
      margin: '6px auto auto auto',
    },

    '& .MuiBottomNavigationAction-root': {
      fontSize: '2rem',
      maxWidth: '78px',
      minWidth: 'unset',
      height: '100%',
      paddingTop: 0,
      paddingBottom: 0,
      color: theme.palette.grey.A200,
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
      borderBottomRightRadius: '0px',
      borderBottomLeftRadius: '0px',
      overflow: 'hidden',
    },

    '& .MuiBottomNavigationAction-wrapper': {
      justifyContent: 'center',
      paddingLeft: theme.spacing(0),
      borderLeft: 0,
      display: 'inline-flex',
      alignItems: 'center',
      flexDirection: 'column',
    },

    '& .MuiBottomNavigationAction-wrapper i': {
      fontSize: theme.typography.pxToRem(28),
      color: theme.palette.grey['250'],
    },

    '& .MuiBottomNavigationAction-label': {
      //display: 'none',
      fontSize: '0.70rem',
      fontWeight: '500',
    },

    '& .MuiBottomNavigationAction-root.Mui-selected': {
      color: theme.palette.secondary.contrastText2,
      background: theme.palette.secondary.bonzoDarkBlue,
    },

    '& .MuiBottomNavigationAction-label.Mui-selected': {
      color: theme.palette.secondary.contrastText2,
      background: theme.palette.secondary.bonzoDarkBlue,
    },

    '& .MuiBottomNavigationAction-root.Mui-selected .MuiBottomNavigationAction-wrapper': {
      color: theme.palette.secondary.contrastText2,
      border: 0,
      //padding: theme.spacing(1),
      paddingLeft: 0,
      paddingRight: 0,
      //borderBottom: `4px dotted transparent`,
      // borderBottom: `4px dotted ${theme.palette.secondary.main}`,
    },

    '& .MuiBottomNavigationAction-root.Mui-selected .MuiBottomNavigationAction-wrapper i': {
      color: theme.palette.secondary.main,
    },

    [theme.breakpoints.up('lg')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: '0',
      height: '100%',
      '& .MuiBottomNavigationAction-root': {
        maxWidth: '84px',
        minWidth: '84px',
        padding: '0',
        // padding: theme.spacing(1),
        paddingTop: 0,
        paddingBottom: 0,
        height: '72px',
        flex: '0 0 72px',
        flexBasis: '72px',
        flexGrow: 0,
        flexShrink: 0,

        borderTopRightRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
        borderBottomLeftRadius: '0px',
        borderTopLeftRadius: '0px',
      },
      '& .MuiBottomNavigationAction-wrapper': {
        padding: 0,
        border: 0,
        borderLeft: `4px dotted transparent`,
        borderRight: `4px dotted transparent`,
      },
      '& .MuiBottomNavigationAction-root.Mui-selected .MuiBottomNavigationAction-wrapper': {
        padding: 0,
        border: 0,
        //borderLeft: `4px dotted transparent`,
        // borderLeft: `4px dotted ${theme.palette.secondary.main}`,
      },
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(2),
      '& .MuiBottomNavigationAction-root': {
        maxWidth: '100%',
        padding: 0,
        // margin: 0,
        margin: '10px 0',
        minWidth: '80px',
        width: '100%',
        // borderTopRightRadius: theme.shape.borderRadius,
        // borderBottomRightRadius: theme.shape.borderRadius,
        borderTopRightRadius: '100px', // as per figma design, selected menu should be full rounded rounded
        borderBottomRightRadius: '100px', // as per figma design, selected menu should be full rounded rounded
        borderBottomLeftRadius: '0px',
        borderTopLeftRadius: '0px',
      },
      '& .MuiBottomNavigationAction-wrapper': {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      '& .MuiBottomNavigationAction-label': {
        marginLeft: theme.spacing(2.5),
        marginTop: theme.spacing(0.5),
        fontSize: '1.125rem',
        color: theme.palette.text.bonzoLight,
        fontWeight: theme.typography.fontWeightSemiBold,
        display: 'block',
      },
      '& .MuiBottomNavigationAction-wrapper i': {
        fontSize: '1.75rem',
      },
      '& .MuiBottomNavigationAction-root.Mui-selected .MuiBottomNavigationAction-wrapper': {
        padding: 0,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        border: 0,
        //borderLeft: `4px dotted transparent`,
        // borderLeft: `4px dotted ${theme.palette.secondary.main}`,
      },
    },
  },
  mobileGameLogo: {
    display: 'none',
    width: '40px',
    margin: '0 auto',
    marginTop: '15px',
    '& img': {
      height: '40px',
      width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
  },
  mobileGameLogoPG: {
    width: '34px',
  },
  gameLogo: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'block',
      margin: theme.spacing(2.5, 1),
      '& svg': {
        height: 'unset',
        width: '100%',
      },
      '& img': {
        height: 'unset',
        width: '100%',
      },
    },
    [theme.breakpoints.up('xl')]: {
      // marginTop: theme.spacing(3),
      // marginBottom: theme.spacing(2),
      width: '100%',
      padding: '30px 0',
      margin: '0',
      paddingRight: '10px',
      '& svg': {
        //height: '82px',
        height: '35px', // new PLAYBONZO logo have 35px height.
      },
      '& img': {
        // height: '82px',
        // height: '48px', // new PLAYBONZO logo have 35px height.
        width: '178px',
        backgroundSize: 'contain',
      },
    },
  },
  gameLogoPG: {
    [theme.breakpoints.up('xl')]: {
      '& img': {
        width: '140px',
      },
    },
  },
  lspLogo: {
    margin: '8px auto 24px auto',
    cursor: 'pointer',
    '-webkit-tap-highlight-color': 'transparent',
    [theme.breakpoints.up('lg')]: {
      width: '54px',
      minHeight: '54px',
    },
    [theme.breakpoints.up('xl')]: {
      width: '112px',
      minHeight: '112px',
    },
    '& img': {
      height: '100%',
      width: '100%',
    },
  },
  lscLogo: {
    margin: '8px auto 0 auto',
    cursor: 'pointer',
    '-webkit-tap-highlight-color': 'transparent',
    [theme.breakpoints.up('lg')]: {
      width: '54px',
      minHeight: '35px',
    },
    [theme.breakpoints.up('xl')]: {
      width: '112px',
      minHeight: '71px',
    },
    '& img': {
      height: '100%',
      width: '100%',
    },
  },
  lspSpecial: {
    margin: '8px auto 8px auto',
  },

  statsNav: {
    display: 'none',
  },
}));

const BottomNavBar = React.memo(() => {
  const user = User.Info();
  const styled = useStyles();
  const theme = useTheme();
  const { texts } = useTheme();
  const currentPath = useCurrentPath();
  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const competition = SelectedCompetition.Info();
  // const pageData = useSelector((state) => state.GetCompetitionDetails, shallowEqual);
  const history = useHistory();
  const [playersCompetitionId, setPlayersCompetitionId] = useState(null);
  const isSmOrLess = useMediaQuery(theme.breakpoints.down('lg'));

  const ICONS_MAP = {
    leaderboard: LeaderboardIcon,
    rewards: RewardsIcon,
    support_chat: SupportChatIcon,
    overview: OverviewIcon,
    players: PlayersIcon,
    lesson: LessonsIcon,
    friends: FriendsIcon,
    mygames: Games,
  };

  useEffect(() => {
    setPlayersCompetitionId(history.location.state?.competition_id || history.location.state?.playersCompetitionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentPath?.showNavBar || !competition || !competition?.item) return null;
  // const hideGames = competition.item.is_no_repeat === true || competition.item.is_lesson_based === true;
  const hideGames = !competition?.item?.is_games_page || User.IsGuest();
  const hideFriends =
    competition.item.is_multiplayer_allowed === 0 ||
    User.IsGuest() ||
    (competition?.item?.is_multiplayer_allowed && competition?.item?.is_daily_learning);
  const hideLesson = competition.item.is_lesson_based === 1 && !User.IsGuest();
  const hideLessonPage = competition.item.is_lesson_page_hide === 1;

  const callback = (e) => {
    const directory = parseInt(e.currentTarget.getAttribute('data-index'), 10);
    if (currentPath.directory === directory) return;
    if (directory === 6) {
      PageSwitch(CompetitionNav.FREQUENTLY_ASK_QUESTIONS);
      // SelectedCompetition.GotoCompetition(
      //   CompetitionNav.CHAT,
      //   {
      //     is_new_message: 0,
      //     is_same_grade: 1,
      //     is_subject: 0,
      //     name: 'Support Team',
      //     profile_picture: '2',
      //     tag: 'SET_OPPONENT',
      //     user_id: parseInt(process.env.REACT_APP_SUPPORT_ID, 10),
      //     username: 'gamesupport@knowledgeplatform.com',
      //   },
      //   false
      // );
    } else {
      SelectedCompetition.GotoCompetition(CompetitionFooterLinks[directory], { playersCompetitionId }, false);
    }
  };

  const fetchIcon = (t) => {
    const Icon = ICONS_MAP[t] || HomeIcon; // Default to HomeIcon if `t` is not in the map
    return <Icon className="bonzoui__sidebar__icons" />;
  };

  //determine the logo source
  const webLogoSrc = Inst_config ? Inst_config.logo.web_dark : '';
  const mobileLogoSrc = Inst_config ? Inst_config.logo.mobile_dark : '';
  const isPocketGames = getInstanceType(Inst_config.instance_id, INSTANCES_ID.POCKET_GAMES_ID);

  return (
    <Grid item className={`${styled.nav} ${styled.noPrint} ${currentPath.name === 'STATS' && styled.statsNav}`}>
      {isSmOrLess ? (
        <GameLogo srcLogo={mobileLogoSrc} className={`${styled.mobileGameLogo} ${isPocketGames ? styled.mobileGameLogoPG : ''}`} />
      ) : (
        <GameLogo srcLogo={webLogoSrc} className={`${styled.gameLogo} ${isPocketGames ? styled.gameLogoPG : ''}`} />
      )}

      <BottomNavigation showLabels value={currentPath.directory === -1 ? 0 : currentPath.directory} className={styled.root}>
        {CompetitionFooterLinks.map((item) => {
          // console.log(user, user.active_role === 'principal', item.isInstBased);
          // console.log(user.active_role === 'principal', item.isInstBased);
          if (
            (hideFriends && item.icon === 'friends') ||
            (hideGames && item.icon === 'mygames') ||
            (!hideLesson && item.icon === 'lesson') ||
            (hideLessonPage && item.icon === 'lesson') ||
            (IsMcdUser && item.icon === 'lesson') ||
            item.icon === 'i i-support_chat' ||
            (user.active_role === 'principal' && !item.isInstBased) ||
            (user.active_role !== 'principal' && item.isInstBased)
          )
            return null;

          return (
            <BottomNavigationAction
              onClick={callback}
              data-index={item.directory}
              label={texts[item.name]}
              key={item.directory}
              // icon={<i className={`i i-${item.icon}`} />}
              // icon={<svg src={fetchIcon(item.icon)} alt={item.icon} className="bonzoui__sidebar__icons" />}
              icon={fetchIcon(item.icon)}
            />
          );
        })}
      </BottomNavigation>

      {/* {competitionRules === 'learn-smart-pakistan' && (
        <GameLogo
          type="lsc"
          srcLogo="https://www.learnsmartclassroom.com/content/images/Lsc/logo.png"
          className={`${styled.gameLogo} ${styled.lscLogo}`}
          callback={() => {
            window.open('https://www.learnsmartclassroom.com/lsc', '_blank');
          }}
        />
      )}

      {competition?.item?.logo_image && <GameLogo
        type="lsp"
        srcLogo={!IsEmptyObject(competition) && competition.item ? competition.item.logo_image : ''}
        className={`${styled.gameLogo} ${styled.lspLogo} ${competitionRules === 'learn-smart-pakistan' ? styled.lspSpecial : ''}`}
        callback={OpenLogoLink}
      />} */}
    </Grid>
  );
});

export default BottomNavBar;
