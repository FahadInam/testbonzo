/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useTheme, Box, makeStyles, Grid, useMediaQuery } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { GetObjFromArr, Numbers, UsernameResolver, LocalStorage, Cordova, getInstanceType } from 'Utils';
import { H4, Body1, GenericConfirmationBox } from 'Components';

import TitleBarPaper from 'Components/Core/TitleBarPaper';

import { AvatarSwitcher, STORAGE_KEYS } from 'Constants';
import { AccountPopUp, AppControl, SelectedCompetition, User } from 'Actions';
import { CompetitionNav } from 'Navigation/Paths';
import { PageSwitch } from 'Navigation';
import { shallowEqual, useSelector } from 'react-redux';
import { IconPaper } from './Modal';
import { H6, H3, H5, Button, H1 } from './Core';
import CoinIcon from './CoinIcon';
import ShareDialogue from './ShareDialogue';
import { INSTANCES_ID } from 'Constants/instance.config';

import vsImage from 'Assets/images/vs.svg';
import playerMultiple from 'Assets/images/bonzoui/tabicons/playermultiple.svg';
import playerSingle from 'Assets/images/bonzoui/tabicons/playersingle.svg';
// import playerWaiting from 'Assets/images/bonzoui/tabicons/turnlast.svg';
import playerWaiting from 'Assets/images/bonzoui/tabicons/turntheir.svg';

import ribbonWinner from 'Assets/images/ribbon_winner.png';
import ribbonDraw from 'Assets/images/bonzoui/draw_ribbon.png';
import ribbonWinnerCongrats from 'Assets/images/ribbon_winner_congrats.png';
import ribbonWinnerLose from 'Assets/images/bonzoui/ribbon_lose.png';

import moreCoins from 'Assets/images/bonzoui/more_coins.png';
import lessCoins from 'Assets/images/bonzoui/less_coins.png';
import moreCoinsPG from 'Assets/images/pocket-games/more_coins_pg.png';
import lessCoinsPG from 'Assets/images/pocket-games/less_coins_pg.png';
import defaultNavConstants from 'Navigation/Paths/defaultNav.constants';

const useStyles = makeStyles((theme) => ({
  row: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
  },
  skeleton: {
    background: theme.palette.action.skeleton,
    borderRadius: '4px',
  },
  center: {
    margin: '4px auto',
  },
  numberCircle: {
    height: '85px',
    width: '85px',
    borderRadius: '50%',
    background: theme.palette.grey['100'],
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '95px',
      width: '95px',
    },
    [theme.breakpoints.up('md')]: {
      height: '105px',
      width: '105px',
    },
  },
  skeletonNumberCircle: {
    height: '95px',
    width: '95px',
    background: theme.palette.action.skeleton,
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  baselineAlignment: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  trophyLogo: {
    height: '105px',
    width: '105px',
    background: theme.palette.grey['200'],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    '& svg': {
      height: '56px',
      width: '56px',
    },
  },
  scoreContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(0.5, 2),
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.grey['200'],
    width: '180px',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '100%',
  },
  points: {
    marginTop: 0,
    marginBottom: theme.spacing(1),
    background: 'transparent',
    '& i': {
      fontSize: '20px',
      color: theme.palette.common.orange,
    },
  },
  leftPlayer: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end',
    },
  },
  rightPlayer: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
    },
  },
  playerName: {
    [theme.breakpoints.up('sm')]: {
      width: '140px',
    },
    [theme.breakpoints.up('xs')]: {
      width: '140px',
      fontSize: '16px',
    },
    [theme.breakpoints.up('md')]: {
      width: '200px',
      fontSize: '18px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '200px',
      fontSize: '18px',
    },
    height: '50px',
    overflow: 'hidden',
    display: 'inline-block',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: '10px',
    color: 'white',
  },
  vsFont: {
    fontSize: '2rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '2rem',
    },
    [theme.breakpoints.up('xs')]: {
      fontSize: '2rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '3rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '3rem',
    },
  },
  stats_bg_gradient: {
    width: '100%',
    // border: "1px solid red",
  },
  stats_content_box: {
    padding: '44px 0px',
    display: 'flex',
    // border: "2px solid yellow",
    background: `linear-gradient(to top, #277DFF, #00FFE0)`,
    margin: '0px 14px 16px 14px',
    borderRadius: '0px 0px 14px 14px',
    justifyContent: 'space-evenly',
    gap: '10px',
    '@media (max-width: 638.88px)': {
      flexDirection: 'column',
      alignItems: 'center',
      gap: '28px',
      padding: '34px 0px',
    },
    '& img': {
      marginTop: '6px',
    },
    '& h1': {
      margin: '-40px 0 0 0',
      textShadow:
        '-3px -3px 0 black, 3px -3px 0 black, -3px 3px 0 black, 3px 3px 0 black, 0px 6px 2px rgba(0, 0, 0), 0px 6px 2px rgba(0, 0, 0), 0px 6px 2px rgba(0, 0, 0)',
      fontSize: '60px',
    },
  },
  stats_desc: {
    fontFamily: 'Poppins',
    color: 'white',
    background: '#000',
    padding: '6px 24px',
    fontSize: '16px',
    borderRadius: '30px',
    minWidth: '230px',
    textAlign: 'center',
    '@media (max-width: 730px)': {
      fontSize: '15px',
      minWidth: '220px',
    },
    '@media (max-width: 390px)': {
      fontSize: '14px',
      padding: '6px 20px',
      minWidth: '200px',
    },
    '@media (max-width: 349px)': {
      minWidth: '195px',
    },
  },
  stats_desc_ans: {
    // background: "rgba(0, 0, 0, .5)",
    color: 'white',
    fontSize: '16px',
    borderRadius: '30px',
    fontFamily: 'Poppins',
    padding: '6px 20px',
    textAlign: 'center',
    // border: "2px solid pink",
    flexGrow: 1,
    '@media (max-width: 730px)': {
      fontSize: '15px',
    },
    '@media (max-width: 390px)': {
      fontSize: '14px',
      padding: '6px 14px',
    },
  },
  stats_desc_box: {
    background: 'rgba(0, 0, 0, .5)',
    borderRadius: '30px',
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '12px',
    maxWidth: '320px',
    '@media (max-width: 730px)': {
      width: '100%',
      maxWidth: '310px',
    },
    '@media (max-width: 390px)': {
      maxWidth: '270px',
    },
    '@media (max-width: 349px)': {
      maxWidth: '260px',
    },
  },
  stats_desc_box_item: {
    borderRadius: '30px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  stats_column: {
    width: '100%',
    maxWidth: '340px',
    // border: "1px solid red",
    '@media (max-width: 638.88px)': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
  },
  vsImg: {
    width: 100,
    height: 100,
    '@media (max-width: 638.88px)': {
      width: 50,
      height: 50,
    },
  },

  avatarClassAlignment: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  // avatarCircleClass: {
  //   '@media (max-width: 375.88px)': {
  //     paddingTop: '24px !important',
  //   },
  //   '@media (max-width: 638.88px)': {
  //     paddingTop: '70px',
  //   },
  // },
}));

export const SingleDataCol = React.memo(({ name, data, color, xs, sub, sm }) => {
  const styled = useStyles();
  const { typography } = useTheme();

  return (
    <Grid xs={xs || 6} sm={sm} md={3} lg={2} item container justifyContent="center">
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box className={styled.numberCircle}>
          <H3 pt={0.75} fontWeight={typography.fontWeightLight} color={color}>
            {data}
            {sub && <small>{sub}</small>}
          </H3>
        </Box>
        <Body1 color={color} textAlign="center" mb={3} mt={1}>
          {name}
        </Body1>
      </Box>
    </Grid>
  );
});

const EachStatMeter = React.memo(({ l, v, v2 }) => {
  const isMulti = typeof v2 === 'number' || typeof v2 === 'string';
  return (
    <div className="bonzoui__esm___base" style={{ justifyContent: isMulti ? 'space-around' : 'space-between' }}>
      {isMulti ? (
        <div
          className="bonzoui__esm___l"
          style={{ paddingLeft: !isMulti ? '10px' : 'inherit', paddingRight: !isMulti ? '10px' : 'inherit' }}
        >
          {v || '-'}
        </div>
      ) : (
        <></>
      )}
      <div className="bonzoui__esm___m">{l || ''}</div>
      <div
        className="bonzoui__esm___r"
        style={{ paddingLeft: !isMulti ? '10px' : 'inherit', paddingRight: !isMulti ? '20px' : 'inherit' }}
      >
        {isMulti ? v2 || 0 : v || '-'}
      </div>
    </div>
  );
});

export const SingleDataColLoader = React.memo(() => {
  const styled = useStyles();
  return (
    <Grid xs={6} md={3} lg={2} item container justifyContent="center">
      <Box>
        <Skeleton variant="circle" className={styled.skeletonNumberCircle} height="95px" width="95px" />
        <Box mb={1} mt={1} className={styled.flexCenter}>
          <Skeleton variant="rect" className={styled.skeleton} height="20px" width="75%" />
        </Box>
      </Box>
    </Grid>
  );
});

export const WinLostData = React.memo(
  ({
    total_coins,
    overall_accuracy,
    total_multiplayer_matches,
    total_single_player_matches,
    total_multiplayer_ties,
    total_multiplayer_wins,
    total_multiplayer_others,
    total_single_player_wins,
  }) => {
    const styled = useStyles();
    const { texts } = useTheme();

    const totalWins = total_multiplayer_wins || 0;
    // const total_matches_accuracy = total_multiplayer_matches + total_single_player_matches || 0;
    // const total_wins_accuracy = totalWins + total_single_player_wins;
    const gamesLost = total_multiplayer_matches - total_multiplayer_wins - total_multiplayer_ties;

    const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
    const isPocketGames = getInstanceType(Inst_config.instance_id, INSTANCES_ID.POCKET_GAMES_ID);

    return (
      <Box className={styled.stats_bg_gradient}>
        <Box className={styled.stats_content_box}>
          <Box className={styled.stats_column}>
            <Box className={styled.stats_desc_box_item}>
              <Body1 className={styled.stats_desc}>{texts.TOTAL_COINS_EARNED}</Body1>
            </Box>
            <Box className={`text-center ${isPocketGames ? '' : 'margin-top-bottom'}`}>
              <img width={180} src={Cordova.Path(isPocketGames ? moreCoinsPG : moreCoins)} alt="icon" />
            </Box>
            <H1>{total_coins}</H1>
          </Box>
          <Box className={styled.stats_column}>
            <Box className={styled.stats_desc_box}>
              <Body1 className={styled.stats_desc}>{texts.ACCURACY}</Body1>
              <Body1 className={styled.stats_desc_ans}>
                {overall_accuracy % 1 === 0
                  ? `${Math.min(100, Math.round(overall_accuracy))}%`
                  : `${Math.min(100, Math.round(overall_accuracy * 10) / 10).toFixed(1)}%`}
              </Body1>
            </Box>
            <Box className={styled.stats_desc_box}>
              <Body1 className={styled.stats_desc}>{texts.GAMES_WON}</Body1>
              <Body1 className={styled.stats_desc_ans}>{Numbers.ZeroPad(Numbers.AtLeastZero(totalWins))}</Body1>
            </Box>
            <Box className={styled.stats_desc_box}>
              <Body1 className={styled.stats_desc}>{texts.GAMES_LOST}</Body1>
              <Body1 className={styled.stats_desc_ans}>{gamesLost < 0 ? 0 : Numbers.ZeroPad(Numbers.AtLeastZero(gamesLost))}</Body1>
            </Box>
            <Box className={styled.stats_desc_box}>
              <Body1 className={styled.stats_desc}>{texts.GAMES_TIED}</Body1>
              <Body1 className={styled.stats_desc_ans}>{Numbers.ZeroPad(Numbers.AtLeastZero(total_multiplayer_ties))}</Body1>
            </Box>
            <Box className={styled.stats_desc_box}>
              <Body1 className={styled.stats_desc}>{texts.SINGLE_PLAYER_MATCH}</Body1>
              <Body1 className={styled.stats_desc_ans}>{Numbers.ZeroPad(Numbers.AtLeastZero(total_single_player_matches))}</Body1>
            </Box>
            <Box className={styled.stats_desc_box}>
              <Body1 className={styled.stats_desc}>{texts.MULTIPLAYER_MATCH}</Body1>
              <Body1 className={styled.stats_desc_ans}>{Numbers.ZeroPad(Numbers.AtLeastZero(total_multiplayer_matches))}</Body1>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
);

export const WinLost = React.memo(
  ({
    total_multiplayer_matches,
    total_single_player_matches,
    total_multiplayer_ties,
    total_multiplayer_wins,
    total_multiplayer_others,
    secondary1,
    secondary2,
  }) => {
    const styled = useStyles();
    const { palette } = useTheme();
    return (
      <>
        <SingleDataRow>
          <SingleDataCol
            justifyContent="flex-end"
            name="Won"
            data={Numbers.ZeroPad(Numbers.AtLeastZero(total_multiplayer_wins))}
            color={palette.common.green}
          />
          <SingleDataCol
            justifyContent="center"
            name="Ties"
            data={Numbers.ZeroPad(Numbers.AtLeastZero(total_multiplayer_wins))}
            color={palette.grey['500']}
          />
          <SingleDataCol
            justifyContent="center"
            name="Losses"
            data={Numbers.ZeroPad(
              Numbers.AtLeastZero(
                total_multiplayer_matches - total_multiplayer_wins - total_multiplayer_ties - total_multiplayer_others
              )
            )}
            color={palette.common.red}
          />
          <SingleDataCol
            justifyContent="flex-start"
            name="Resigned"
            data={Numbers.ZeroPad(Numbers.AtLeastZero(total_multiplayer_others))}
            color={palette.common.blue}
          />
        </SingleDataRow>

        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} lg={4}>
            <Body1 color={palette.grey['300']} textAlign="center" className={styled.baselineAlignment}>
              <H4 component="span" color="inherit" mr={1}>
                {Numbers.ZeroPad(Numbers.AtLeastZero(total_multiplayer_matches))}
              </H4>
              {` ${secondary1}`}
            </Body1>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Body1 mb={2} color={palette.grey['300']} textAlign="center" className={styled.baselineAlignment}>
              <H4 component="span" color="inherit" mr={1}>
                {Numbers.ZeroPad(Numbers.AtLeastZero(total_single_player_matches))}
              </H4>
              {` ${secondary2}`}
            </Body1>
          </Grid>
        </Grid>
      </>
    );
  }
);

export const WinLostLoader = React.memo(() => {
  const styled = useStyles();
  return (
    <>
      <SingleDataRow>
        <SingleDataColLoader justifyContent="flex-end" />
        <SingleDataColLoader justifyContent="flex-end" />
        <SingleDataColLoader justifyContent="flex-end" />
        <SingleDataColLoader justifyContent="flex-end" />
      </SingleDataRow>

      <Grid container spacing={1}>
        <Grid item xs={12} lg={2} />
        <Grid item xs={12} lg={4}>
          <Box className={styled.flexCenter}>
            <Skeleton variant="rect" className={styled.skeleton} height="24px" width="80%" />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box className={styled.flexCenter}>
            <Skeleton variant="rect" className={styled.skeleton} height="24px" width="80%" />
          </Box>
        </Grid>
        <Grid item xs={12} lg={2} />
      </Grid>
    </>
  );
});

export const SingleDataRow = ({ children, flexDirection, alignItems, pb, pt, className }) => {
  const styled = useStyles();
  return (
    <Box
      className={`${styled.row} ${className ?? ''}`}
      pb={typeof pb === 'undefined' ? 2 : pb}
      pt={typeof pb === 'undefined' ? 3 : pt}
    >
      <Grid container justifyContent="center" direction={flexDirection || null} alignItems={alignItems}>
        {children}
      </Grid>
    </Box>
  );
};

export const SinglePlayResult = ({
  winnerCalc,
  finalResult,
  grade,
  isGuest,
  replayData,
  ShareLinkUrl,
  grades,
  noRepeat = false,
  winPercentage,
  // isFromLocalResultLists,
  // competition,
  // subject,
  // games,
}) => {
  const styled = useStyles();
  const { typography, palette, texts } = useTheme();
  const [shareLink, setShareLink] = useState(false);
  const { serverResult } = useSelector((rState) => rState.Challenge || {}, shallowEqual);

  const [confBoxVisible, setConfBoxVisible] = useState(serverResult?.got_certificate);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isPocketGames = getInstanceType(Inst_config.instance_id, INSTANCES_ID.POCKET_GAMES_ID);
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);
  const premiumCompetition = useSelector((state) => state.PremiumCompetition.data, shallowEqual);

  const callback = (e, item) => {
    const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag');
    switch (t) {
      case 'reward-positive':
        PageSwitch(CompetitionNav.REWARDS);
        break;
      case 'reward-negative':
        SelectedCompetition.GotoCompetition();
        break;
      case 'subscribe':
        //console.log('Payment page');
        PageSwitch(defaultNavConstants.PAYMENT);
        break;
      default:
        setConfBoxVisible(false);
        break;
    }
  };

  // const { result } = challenge;

  // console.log('result', result);
  // const opponent = {
  //   opponent_id: result?.opponent_id,
  //   opponent_name: result?.opponent_name,
  //   opponent_profile_picture: result?.opponent_profile_picture,
  //   opponent_username: result?.opponent_username,
  //   tag: 'SET_OPPONENT',
  // };
  // console.log('opponent', opponent);
  // const dispatch = useDispatch();
  const calculation = { ...finalResult };

  // console.log('finalResult:- ', finalResult);

  const guestMode = isGuest;
  //  console.log('winnerCalc:- ', winnerCalc);

  useEffect(() => {
    return () => {
      window.isDemoResult = false;
    };
  }, []);
  // let titleColor = palette.common.red;
  // if (winnerCalc.winner === 0) titleColor = palette.common.red;
  // else if (winnerCalc.winner === 2) titleColor = palette.common.green;
  // else if (winnerCalc.winner === 1) titleColor = palette.common.grey['300'];
  // else if (winnerCalc.winner === -1) titleColor = palette.common.orange;
  return (
    <>
      <GenericConfirmationBox
        callback={callback}
        visible={confBoxVisible}
        icon="migration"
        tag="cert"
        title="Congratulations!"
        primary="You earned a certificate."
        positive={texts.GO_TO_REWARDS}
        negative={texts.SKIP}
        allowClose
      />
      <ShareDialogue
        isVisible={shareLink}
        Callback={(v) => {
          setShareLink(v);
        }}
        title="Challenge friends"
        subTitle="Share challenge with friends"
        textToShare={ShareLinkUrl}
      />

      <TitleBarPaper
        title={texts.SP_RESULT}
        icon={playerSingle}
        yesButtonLabel={User.IsGuest() ? texts.SIGN_UP : texts.CONTINUE}
        // noButtonLabel={User.IsGuest() ? texts.CONTINUE : null}
        showButtons
        callbackNo={(e) => {
          const moduleData = JSON.parse(LocalStorage.Get(STORAGE_KEYS.MODULE_SELECTED, null));
          if (moduleData?.data?.isCalledFromLessons) {
            //  console.log('HHH');
            SelectedCompetition.GotoCompetition(CompetitionNav.LESSON_LISTING);
          } else if (moduleData?.data?.isCalledFromGames) {
            SelectedCompetition.GotoCompetition(CompetitionNav.GAMES);
          } else {
            LocalStorage.Delete(STORAGE_KEYS.MODULE_SELECTED);
            SelectedCompetition.GotoCompetition();
          }
        }}
        callbackYes={(e) => {
          if (!User.IsGuest()) {
            // should clear all pages and challenge data from redux
            const moduleData = JSON.parse(LocalStorage.Get(STORAGE_KEYS.MODULE_SELECTED, null));
            if (moduleData?.data?.isCalledFromLessons) {
              //  console.log('HHH');
              SelectedCompetition.GotoCompetition(CompetitionNav.LESSON_LISTING);
            } else if (moduleData?.data?.isCalledFromGames) {
              SelectedCompetition.GotoCompetition(CompetitionNav.GAMES);
            } else {
              LocalStorage.Delete(STORAGE_KEYS.MODULE_SELECTED);
              SelectedCompetition.GotoCompetition();
            }
            // SelectedCompetition.GotoCompetition();
          } else {
            //  console.log('YAHAN');
            window.isDemoResult = true;
            AppControl.SetLoginType(false);
            AppControl.SetLoginComingFrom('signUp');
            AppControl.SetSignUpComingFrom(false);
            AccountPopUp.Show({ type: 'signUp', isVisible: true, comingFrom: 'guest', path: window?.location?.pathname });
          }
        }}
        isShupavu={isShupavu} // Pass the prop here
        isGuest={User.IsGuest()} // Pass isGuest as a prop here
        callback={callback}
        premiumCompetition={premiumCompetition}
      >
        <>
          <div
            style={{
              display: 'flex',
              position: 'relative',
              flexDirection: 'column',
              width: '96%',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(180deg, #01EEFD 0%, #0189FF 100%)',
              padding: '12px',
              margin: '0px',
              borderRadius: '0px 0px 12px 12px',
            }}
          >
            <div
              style={{
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '12px',
                margin: '0px',
                borderRadius: '0px 0px 12px 12px',
              }}
            >
              <div className="bonzoui__winner__ribbon" style={{ position: 'relative!important' }}>
                <img src={winnerCalc.winner === 2 ? ribbonWinnerCongrats : ribbonWinnerLose} alt={texts.CONGRATS} />
                <div className="bonzoui__single__result__ribbon__sp pb-title-shadow">
                  {winnerCalc.winner === 2 ? texts.CONGRATS : texts.TRY_AGAIN}
                </div>
              </div>
              {/* <SingleUserResult2 player={me} isLeft />
              <Grid xs={2} item>
                <Box className={`${styled.flexCenter} ${styled.vsFont}`} pt={0} color={palette.grey['600']}>
                  <img src={vsImage} alt="VS" className={styled.vsImg} />
                </Box>
              </Grid> */}
            </div>
            <div
              style={{
                zIndex: 1,
                display: 'flex',
                width: '92%',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '8px',
                margin: '0px',
                borderRadius: '0px 0px 12px 12px',
              }}
            >
              {/* <SingleUserResult2 player={me} isLeft secondSection />
              <Grid xs={2} item>
                <Box className={`${styled.flexCenter} ${styled.vsFont}`} pt={0} color={palette.grey['600']}>
                  <img src={vsImage} alt="VS" className={styled.vsImg} style={{ visibility: 'hidden' }}/>
                </Box>
              </Grid>
              <SingleUserResult2 player={opponent} secondSection /> */}
            </div>
            {guestMode && (
              <div className="bonzoui__message__negative">
                <div className="bonzoui__box__title">{texts.SIGN_UP_NOW}</div>
                <div>{texts.SAVE_PROGRESS_UNLOCK_REWARDS}</div>
              </div>
            )}
            {!guestMode &&
              calculation?.my_accuracy * 100 <
                (calculation.min_completion_percentage >= 0 ? calculation.min_completion_percentage : winPercentage) && (
                <div className="bonzoui__message__negative">
                  <div className="bonzoui__box__note">
                    <div className="bonzoui__hint__bulb"></div> {texts.NOTE_RESULT_TITLE}
                  </div>

                  <div className="bonzoui__box__inner__ml">
                    {texts.ACHIEVE}{' '}
                    <div className="bonzoui__box__inner__title">
                      <span className="bonzoui__win__percentage">
                        {calculation.min_completion_percentage >= 0 ? calculation.min_completion_percentage : winPercentage}%
                      </span>{' '}
                      <span style={{ fontFamily: 'Poppins', fontWeight: '400' }}> {texts.OR_MORE_RESULT_BOX}</span>
                    </div>{' '}
                    {texts.TO_UNLOCK_RESULT_BOX}
                  </div>
                </div>
              )}
            <div
              style={{
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                width: '96%',
                alignItems: 'center',
                justifyContent: 'space-around',
                margin: '0px',
                borderRadius: '0px 0px 12px 12px',
              }}
            >
              <div
                className="bonzoui__coins__stats__container"
                style={{
                  marginTop: '76px',
                  flexDirection: 'column',
                  position: 'relative',
                  display: 'flex',
                }}
              >
                {calculation?.my_points || calculation?.points ? (
                  <div
                    className="bonzoui__coins__amount__sp"
                    style={{
                      display: guestMode || winnerCalc.winner !== 2 ? 'none' : 'flex',
                      position: 'relative',
                      margin: 'auto',
                    }}
                  >
                    <div className="bonzoui__coins__amount_cell_sp">
                      <img src={isPocketGames ? moreCoinsPG : moreCoins} alt="Your coins" width="100" />
                      <div className="bonzoui__coins__amount_text__sp">
                        + {Math.ceil(calculation?.my_points || calculation?.points)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="bonzoui__stats__list">
                  <EachStatMeter l={texts.SCORE} v={winnerCalc.score || '-'} />
                  <EachStatMeter
                    l={texts.ACCURACY}
                    v={`${Numbers.FloatFix(calculation?.my_accuracy * 100, true) || '0'} ${calculation?.my_accuracy ? '%' : ''}`}
                  />
                  <EachStatMeter
                    l={texts.TIME_TAKEN}
                    v={`${calculation?.my_time_spent || '-'}${calculation?.my_time_spent ? 's' : ''}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </TitleBarPaper>
      {false && (
        <IconPaper iconBg="transparent" fullWidth icon={<Box className={styled.trophyLogo}>{winnerCalc.icon}</Box>}>
          <H6 mb={3}>
            {' '}
            {/*color={titleColor}*/}
            {winnerCalc.final}
          </H6>

          <SubjectGradeName subject={calculation.subject} grade={grade} grades={grades} />

          <Box pt={1} pb={2} className={`${styled.row} ${styled.flexCenter}`}>
            <H5 fontWeight={typography.fontWeightRegular} color={palette.common.grey['300']} className={styled.flexCenter}>
              {winnerCalc.title}
            </H5>
          </Box>

          <SingleDataRow>
            <SingleDataCol name="Score" data={winnerCalc.score} color={palette.common.blue} xs={12} sm={4} />
            <SingleDataCol
              sm={4}
              name={texts.ACCURACY}
              data={Numbers.FloatFix(calculation.my_accuracy * 100, true)}
              color={palette.common.orange}
              sub="%"
            />
            <SingleDataCol sm={4} name={texts.TIME_TAKEN} data={calculation.my_time_spent} color={palette.grey['400']} sub="s" />
          </SingleDataRow>

          {calculation.points && (
            <Box className={styled.points} display="flex" justifyContent="center" alignItems="center">
              <H5 mr={1} color={palette.common.orange}>
                {texts.YOU_EARNED}
              </H5>
              <CoinIcon />
              <H5 ml={0.6} color={palette.common.orange}>
                {`${Math.ceil(calculation.points)} ${texts.COINS}`}
              </H5>
            </Box>
          )}

          {/* { {winnerCalc.winner === 0 && !noRepeat ? (
          <SingleDataRow>
            <Body1 color={palette.grey['400']} textAlign="center" mb={2}>
              {texts.WIN_50}
            </Body1>
          </SingleDataRow>
        ) : (
          ''
        )} } */}

          <SingleDataRow>
            <Body1 color={palette.grey['300']} textAlign="center" mb={2}>
              <SkillName skill={calculation.skill} virtualSkill={calculation.virtual_skill} />
            </Body1>
          </SingleDataRow>
          {/* {isFromLocalResultLists && (
          <Box pt={1} textAlign="center">
            <Button
              onClick={() => {
                // should clear all pages and challenge data from redux
              }}
            >
              Replay
            </Button>
          </Box>
        )} */}
          {replayData && !User.IsGuest() && (
            <Box pt={1} textAlign="center">
              <Button
                onClick={() => {
                  // should clear all pages and challenge data from redux
                  const moduleData = JSON.parse(LocalStorage.Get(STORAGE_KEYS.MODULE_SELECTED, null));
                  if (moduleData?.data?.isCalledFromLessons) {
                    //  console.log('HHH');
                    SelectedCompetition.GotoCompetition(CompetitionNav.LESSON_LISTING);
                  } else if (moduleData?.data?.isCalledFromGames) {
                    SelectedCompetition.GotoCompetition(CompetitionNav.GAMES);
                  } else {
                    LocalStorage.Delete(STORAGE_KEYS.MODULE_SELECTED);
                    SelectedCompetition.GotoCompetition();
                  }
                  // SelectedCompetition.GotoCompetition();
                }}
              >
                {texts.CONTINUE}
              </Button>
              {/* {!isGuest && (
              <div>
                <Button
                  onClick={() => {
                    setShareLink(true);
                  }}
                >
                  Challenge friends
                </Button>
              </div>)} */}
            </Box>
          )}

          {User.IsGuest() && (
            <Box pb={2} textAlign="center">
              <Button
                onClick={() => {
                  // SelectedCompetition.GotoCompetition();
                  AppControl.SetLoginComingFrom('signUp');
                  // console.log('YAHAN');
                  AccountPopUp.Show({ type: 'signUp', isVisible: true, comingFrom: 'guest', path: window?.location?.pathname });
                }}
              >
                {texts.SIGN_UP}
              </Button>
            </Box>
          )}
        </IconPaper>
      )}
    </>
  );
};

export const TwoPlayersResult = ({
  winnerCalc,
  subjectData,
  grade,
  opponent,
  me,
  replayData,
  ShareLinkUrl,
  grades,
  isFromLocalResultLists,
  isGuest,
  winPercentage,
}) => {
  const styled = useStyles();
  const { palette, texts } = useTheme();
  // let titleColor = palette.common.red;
  const [shareLink, setShareLink] = useState(false);
  const serverResult = useSelector((rState) => rState.Challenge, shallowEqual);
  const [confBoxVisible, setConfBoxVisible] = useState(serverResult?.got_certificate);

  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isPocketGames = getInstanceType(Inst_config.instance_id, INSTANCES_ID.POCKET_GAMES_ID);

  // if (winnerCalc.winner === 0) titleColor = palette.common.red;
  // else if (winnerCalc.winner === 2) titleColor = palette.common.green;
  // else if (winnerCalc.winner === 1) titleColor = palette.common.grey['300'];
  // else if (winnerCalc.winner === -1) titleColor = palette.common.orange;
  // console.log('opponent: ', opponent);
  // console.log('me: ', me);
  // console.log('winnerCalc: ', winnerCalc);
  // console.log('serverResult: ', serverResult);
  // const opponentName = UsernameResolver(opponent.name, opponent.username);

  const callback = (e, item) => {
    const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag');
    switch (t) {
      case 'reward-positive':
        PageSwitch(CompetitionNav.REWARDS);
        break;
      case 'reward-negative':
        SelectedCompetition.GotoCompetition();
        break;
      default:
        setConfBoxVisible(false);
        break;
    }
  };

  const isSelfWinner = winnerCalc.final === 'Challenge completed' || winnerCalc.final === `${texts.YOU_WON}!`;
  const isOppWinner =
    winnerCalc.final === `${texts.YOU_LOST}!` ||
    winnerCalc.final === texts.YOU_RESIGNED ||
    winnerCalc.final === texts.CHALLENGE_FAILED ||
    winnerCalc.final === 'Challenge completed';
  const isDraw = winnerCalc.final === `${texts.MATCH_TIED}!`;
  const inProgress = winnerCalc.final === 'Waiting' || opponent?.opponent_total_questions === -1;
  const guestMode = isGuest;
  // const winPercentage = 50;
  // const isSelfWinner =
  //   (opponent?.score <= me?.my_score ||
  //     opponent?.score <= me?.score ||
  //     serverResult?.result?.opponent_score <= serverResult?.result?.my_score) &&
  //   (opponent?.score >= 0 || serverResult?.result?.opponent_score >= 0);
  // const isOppWinner =
  //   (opponent?.score >= me?.my_score ||
  //     opponent?.score >= me?.score ||
  //     serverResult?.result?.opponent_score >= serverResult?.result?.my_score) &&
  //   (opponent?.score >= 0 || serverResult?.result?.opponent_score >= 0);
  //  console.log('isSelfWinner: ', isSelfWinner);
  //  console.log('isOppWinner: ', isOppWinner);
  // console.log('me: ', me);
  // console.log('opponent: ', opponent);
  return (
    <>
      <GenericConfirmationBox
        callback={callback}
        visible={confBoxVisible}
        tag="reward"
        icon="cert"
        title="Congratulations!"
        primary="You earned a certificate."
        positive={texts.GO_TO_REWARDS}
        negative={texts.SKIP}
        allowClose
      />
      <ShareDialogue
        isVisible={shareLink}
        Callback={(v) => {
          setShareLink(v);
        }}
        title="Challenge friends"
        subTitle="Share challenge with friends"
        textToShare={ShareLinkUrl}
      />
      <TitleBarPaper
        title={!inProgress ? texts.MP_RESULT : texts.OPPONENTS_TURN}
        icon={!inProgress ? playerMultiple : playerWaiting}
        showButtons
        noButtonLabel={guestMode ? texts.SIGN_UP : ''}
        yesButtonLabel={texts.CONTINUE}
        callbackYes={(e) => {
          if (!User.IsGuest()) {
            // should clear all pages and challenge data from redux
            const moduleData = JSON.parse(LocalStorage.Get(STORAGE_KEYS.MODULE_SELECTED, null));
            if (moduleData?.data?.isCalledFromLessons) {
              //  console.log('HHH');
              SelectedCompetition.GotoCompetition(CompetitionNav.LESSON_LISTING);
            } else if (moduleData?.data?.isCalledFromGames) {
              SelectedCompetition.GotoCompetition(CompetitionNav.GAMES);
            } else {
              LocalStorage.Delete(STORAGE_KEYS.MODULE_SELECTED);
              SelectedCompetition.GotoCompetition();
            }
            // SelectedCompetition.GotoCompetition();
          } else {
            //  console.log('YAHAN');
            // AppControl.SetLoginType(false);
            AppControl.SetLoginComingFrom('signUp');
            AccountPopUp.Show({ type: 'signUp', isVisible: true, comingFrom: 'guest', path: window?.location?.pathname });
          }
        }}
      >
        <>
          <div
            style={{
              display: 'flex',
              position: 'relative',
              flexDirection: 'column',
              width: '96%',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(180deg, #01EEFD 0%, #0189FF 100%)',
              padding: '12px',
              margin: '0px',
              borderRadius: '0px 0px 12px 12px',
            }}
          >
            <div className="bonzoui__semi__orange"></div>
            {isDraw && (
              <div className="bonzoui__winner__ribbon" style={{ position: 'relative', left: '0px', right: '0px', top: '0px' }}>
                <img src={ribbonDraw} alt="Draw" style={{ width: '170px' }} />
                <span className="bonzoui__draw__ribbon__text" style={{ position: 'absolute', left: 0, right: 0 }}>
                  {texts.DRAW}
                </span>
              </div>
            )}
            <div
              style={{
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '12px',
                margin: '0px',
                marginTop: '18px',
                width: '96%',
                borderRadius: '0px 0px 12px 12px',
                paddingBottom: '0',
              }}
            >
              <SingleUserResult2 player={me} isLeft texts={texts} isWinner={isSelfWinner && !inProgress} />
              <Grid xs={2} item>
                <Box className={`${styled.flexCenter} ${styled.vsFont}`} pt={0} color={palette.grey['600']}>
                  <img src={vsImage} alt="VS" className={styled.vsImg} />
                </Box>
              </Grid>
              <SingleUserResult2 player={opponent} texts={texts} isWinner={isOppWinner && !inProgress} />
            </div>

            {guestMode && isSelfWinner && !isDraw && !inProgress && (
              <div className="bonzoui__message__negative bonzoui__message__negative__mp">
                <div className="bonzoui__box__title">{texts.SIGN_UP_NOW}</div>
                <div>{texts.SAVE_PROGRESS_UNLOCK_REWARDS}</div>
              </div>
            )}
            {!guestMode &&
              Numbers.FloatFix((me.my_total_correct / me.my_total_questions) * 100, true) <
                (me.min_completion_percentage || winPercentage) &&
              !inProgress && (
                <div className="bonzoui__message__negative bonzoui__message__negative__mp">
                  <div className="bonzoui__box__note">
                    <div className="bonzoui__hint__bulb"></div> {texts.NOTE_RESULT_TITLE}
                  </div>

                  <div className="bonzoui__box__inner__ml">
                    {texts.ACHIEVE}{' '}
                    <div className="bonzoui__box__inner__title">
                      <span className="bonzoui__win__percentage">{me.min_completion_percentage || winPercentage}%</span>{' '}
                      <span style={{ fontFamily: 'Poppins', fontWeight: '400' }}> {texts.OR_MORE_RESULT_BOX}</span>
                    </div>{' '}
                    {texts.TO_UNLOCK_RESULT_BOX}
                  </div>
                </div>
              )}

            {/*
              <div
                style={{
                  zIndex: 1,
                  display: 'flex',
                  width: '96%',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: '12px',
                  margin: '0px',
                  borderRadius: '0px 0px 12px 12px',
                }}
              >
                <SingleUserResult2 player={me} isLeft secondSection />
                <Grid xs={2} item>
                  <Box className={`${styled.flexCenter} ${styled.vsFont}`} pt={0} color={palette.grey['600']}>
                    <img src={vsImage} alt="VS" className={styled.vsImg} style={{ visibility: 'hidden' }}/>
                  </Box>
                </Grid>
                <SingleUserResult2 player={opponent} secondSection /> 
              </div>
            */}

            <div
              style={{
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                width: '96%',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '12px',
                margin: '0px',
                borderRadius: '0px 0px 12px 12px',
                paddingTop: '0',
              }}
            >
              <div className="bonzoui__coins__stats__container">
                {me?.points ||
                serverResult?.points_earned ||
                serverResult?.result?.my_points ||
                serverResult?.result?.opponent_points ||
                opponent?.points ||
                me?.my_points ? (
                  <div
                    className="bonzoui__coins__amount"
                    style={{
                      display: guestMode || winnerCalc.winner !== 2 ? 'none' : 'flex',
                      position: 'relative',
                      margin: 'auto',
                    }}
                  >
                    <div className={`bonzoui__coins__amount_cell ${(isSelfWinner || isDraw) && !inProgress ? '' : 'invisible'}`}>
                      <img
                        className="cImg"
                        src={
                          (me?.my_score || me?.score) > opponent?.score
                            ? isPocketGames
                              ? moreCoinsPG
                              : moreCoins
                            : isPocketGames
                            ? lessCoinsPG
                            : lessCoins
                        }
                        alt="Your coins"
                      />
                      <div className="bonzoui__coins__amount_text">
                        +{Numbers.AtLeastZero(me?.points || serverResult?.points_earned || serverResult?.result?.my_points || '0')}
                      </div>
                    </div>
                    <div className={`bonzoui__coins__amount_cell ${(isOppWinner || isDraw) && !inProgress ? '' : 'invisible'}`}>
                      <img
                        className="cImg"
                        src={
                          (me?.my_score || me?.score) <= opponent?.score || opponent.score === '-'
                            ? isPocketGames
                              ? lessCoinsPG
                              : lessCoins
                            : isPocketGames
                            ? moreCoinsPG
                            : moreCoins
                        }
                        alt="Opponent's coins"
                      />
                      <div className="bonzoui__coins__amount_text">
                        +
                        {isDraw
                          ? Numbers.AtLeastZero(
                              me?.my_points ||
                                opponent?.points ||
                                me?.points ||
                                serverResult.points_earned ||
                                serverResult?.result?.opponent_points ||
                                '0'
                            )
                          : Numbers.AtLeastZero(
                              opponent?.points ||
                                me?.points ||
                                serverResult.points_earned ||
                                serverResult?.result?.opponent_points ||
                                '0'
                            )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="bonzoui__stats__list">
                  <EachStatMeter
                    l={texts.SCORE}
                    v={me?.my_score || me?.score || '0'}
                    v2={opponent?.score >= 0 ? opponent?.score : 0}
                  />
                  <EachStatMeter
                    l={texts.ACCURACY}
                    v={`${Numbers.FloatFix((me.my_total_correct / me.my_total_questions) * 100, true) || '0'}${
                      me.my_total_correct >= 0 ? '%' : ''
                    }`}
                    v2={
                      opponent?.opponent_total_correct >= 0
                        ? `${
                            Numbers.FloatFix((opponent.opponent_total_correct / opponent.opponent_total_questions) * 100, true) || '-'
                          }%`
                        : '-'
                    }
                  />
                  <EachStatMeter
                    l={texts.TIME_TAKEN || '-'}
                    v={`${me?.my_time_spent || 0}${me?.my_time_spent ? 's' : ''}`}
                    v2={
                      opponent?.opponent_time_spent
                        ? `${opponent?.opponent_time_spent || '-'}${opponent?.opponent_time_spent ? 's' : ''}`
                        : '-'
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </TitleBarPaper>
    </>
  );
};
/*
const SingleUserResult = ({ player }) => {
  const styled = useStyles();
  const { typography } = useTheme();
  return (
    <Grid xs={5} item>
      <Box className={styled.flexCenter} flexDirection="column">
        <AvatarSwitcher t={player.avatar} s={72} />
        <Body1 textAlign="center" mt={2} className={styled.playerName}>
          {UsernameResolver(player.name, player.username)}
        </Body1>
      </Box>
      <Box className={styled.scoreContainer}>
        <H4 fontWeight={typography.fontWeightBold} pt={0.25}>
          {Numbers.AtLeastZero(player.score)}
        </H4>
      </Box>
    </Grid>
  );
};*/
const SingleUserResult2 = ({ player, secondSection, isWinner = true, texts }) => {
  const styled = useStyles();
  // console.log('isWinner...', isWinner)
  const { typography } = useTheme();
  return (
    <Grid xs={5} style={{ position: 'relative' }} item>
      {isWinner && (
        <div className="bonzoui__winner__ribbon bonzoui__winner__ribbon_MP win2x" style={{ left: 0, right: 0 }}>
          <img src={ribbonWinner} alt="Winner" />
          <span className="pb-title-shadow" style={{ position: 'absolute', left: 0 }}>
            {texts.WINNER}
          </span>
        </div>
      )}
      {!secondSection && (
        <Box className={styled.flexCenter} flexDirection="column">
          <AvatarSwitcher t={player.avatar} s={72} />
          <Body1 textAlign="center" mt={2} className={styled.playerName}>
            {UsernameResolver(player.name, player.username)}
          </Body1>
        </Box>
      )}

      {secondSection && (
        <Box className={styled.scoreContainer}>
          <H4 fontWeight={typography.fontWeightBold} pt={0.25}>
            {Numbers.AtLeastZero(player.score)}
          </H4>
        </Box>
      )}
    </Grid>
  );
};

export const SkillName = ({ skill, virtualSkill }) => {
  const { texts } = useTheme();
  if (!skill) return null;
  if (virtualSkill && virtualSkill.toLowerCase().indexOf('vocabulary') > -1) return <>{`${texts.SKILL}: ${virtualSkill}`}</>;
  return <>{`${texts.SKILL}: ${skill}`}</>;
};

export const UserBox = React.forwardRef(({ u, isSinglePlayerMatch, animated, isGuest = false }, ref) => {
  const { palette, texts } = useTheme();
  const styled = useStyles();
  const calClass = isSinglePlayerMatch ? styled.flexCenter : styled.avatarClassAlignment;

  const isSmallScreen = useMediaQuery('(max-width:599px)');
  let avatarSize = 150; // default size for small screens
  if (isSmallScreen) {
    avatarSize = 120;
  }

  return (
    <Grid ref={ref} item xs={isSinglePlayerMatch ? 12 : 5} style={{ height: '100%', display: animated ? 'none' : null }}>
      <Box style={{ zIndex: '0' }} className={calClass}>
        <Box textAlign="center">
          <Box style={{ visibility: 'hidden' }}>
            <Body1 mb={1.5} className={styled.playerName}>
              {isGuest ? texts.GUEST_MODE : UsernameResolver(u.name, u.username || u.user_name)}
            </Body1>
          </Box>
          <AvatarSwitcher t={u.profile_picture} s={avatarSize} shadowed />
          <Body1 mt={1.5} color={palette.background.default} className={styled.playerName}>
            {isGuest ? texts.GUEST_MODE : UsernameResolver(u.name, u.username || u.user_name)}
          </Body1>
        </Box>
      </Box>
    </Grid>
  );
});
// eslint-disable-next-line
const gradeResolver = (grades, current_grade, texts) => {
  if (!grades || (grades && grades.length === 1)) return '';
  const obj = GetObjFromArr(grades, 'grade', current_grade);

  if (!obj.grade_alias) {
    return `${texts.GRADE_TEXT} ${current_grade}`;
  }

  return `${obj.grade_alias}`;
};

export const gradeStrResolver = (str, competition) => {
  if (!competition) return str;
  if (!competition.item) return str;
  if (!competition.item?.grade_label) return str;
  const { item } = competition;

  if (str.indexOf('grade') > 0) {
    return str.replace('grade', item?.grade_label);
  }
  if (str.indexOf('Grade') > 0) {
    return str.replace('Grade', item?.grade_label);
  }
};

export const SubjectGradeName = ({ subject, grade, grades }) => {
  const { palette } = useTheme();
  // const { texts } = useTheme();
  return (
    <H3 textAlign="center" mb={1} color={palette.text.secondary}>
      {`${subject} `}
      {/* {gradeResolver(grades, grade, texts)} */}
    </H3>
  );
};
