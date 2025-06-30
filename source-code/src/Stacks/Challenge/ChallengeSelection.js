import React, { useCallback, useEffect, useState } from 'react';
import { Grid, makeStyles, Box, useTheme, IconButton } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CHALLENGE_TAGS } from 'Constants/challenge.constants';
import {
  GetSubjectsFromGrade,
  GetOpponents,
  GoToVsScreen,
  Toast,
  GetRecommendations,
  User,
  StartChallenge,
  SelectedCompetition,
} from 'Actions';
import { Select, Button, Body2, SelectionPaper, Body1, H1 } from 'Components';
import { IsEmptyObject, UsernameResolver, RemoveDuplicates } from 'Utils';
// import competitions_icon from 'Assets/images/competitions_icon.svg';
import { ALERT, AvatarSwitcher, IMAGES, AVATAR_SET } from 'Constants';
import { SingleDataRow } from 'Components/Stats';
import '../../Assets/css/slick.css';
// import { GoToLastPage } from 'Navigation';
// import User from '../../Actions/user.action';
import PageStructure from './shared/PageStructure';
import ButtonBold from 'Components/Core/ButtonBold';
import { InlineButton } from 'Components/Core/Button';

const useStyles = makeStyles((theme) => ({
  threeXLine: {
    display: 'flex',
    verticalAlign: 'middle',
    alignItems: 'center',
    color: theme.palette.grey['400'],
    flexDirection: 'row',
    textAlign: 'initial',
    '@media(max-width:480px)': {
      flexDirection: 'column',
      textAlign: 'center',
    },
  },
  threeXBold: {
    color: theme.palette.common.red,
    fontSize: '1.6rem',
    margin: '0 5px',
  },
  icon: {
    height: '22px',
    width: '22px',
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.grey['200'],
    border: `2px solid ${theme.palette.grey['200']}`,
  },
  selectedIcon: {
    background: theme.palette.secondary.main,
  },
  // singleIcon: {
  //   margin: '0 auto',
  //   height: '80px',
  //   width: '80px',
  //   borderRadius: '50%',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   background: theme.palette.grey['600'],
  //   color: theme.palette.common.white,
  //   '& i': {
  //     fontSize: '24px',
  //   },
  //   '&.selected': {
  //     background: theme.palette.secondary.main,
  //   },
  // },
  smallCircle: {
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    background: theme.palette.grey['300'],
    display: 'inline-block',
    margin: '0 5px',
    '&.selected': {
      background: theme.palette.secondary.main,
    },
  },
  leftIcon: {
    color: theme.palette.grey['300'],
    fontSize: '20px',
  },

  gridItem: {
    height: '100%',
    width: '120px',
    maxHeight: '147px',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    border: '1.5px solid transparent',
    overflow: 'hidden',
    position: 'relative',
    margin: '0 auto',
    textAlign: 'center',
    '&.selected': {
      border: `1.5px dashed ${theme.palette.secondary.main}`,
      background: 'rgb(235 246 255)',
    },
    [theme.breakpoints.down('sm')]: {
      width: '110px',
    },
  },
  animation: {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.25),
    backgroundColor: 'transparent',
    '& .MuiIconButton-label': {
      height: '100%',
    },
    '&:hover': {
      backgroundColor: 'rgb(235 246 255)',
    },
  },
  circleSkeleton: {
    margin: '0 auto',
    background: theme.palette.action.skeleton,
  },
  rectSkeleton: {
    borderRadius: '4px',
    margin: '0 auto',
    background: theme.palette.action.skeleton,
  },
  noShrink: {
    flexShrink: 0,
  },
  row: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
  opponentContainer: {
    height: '416px',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.up('sm')]: {
      height: '255px',
      overflow: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      maxHeight: '250px',
    },
  },
  opponentContainerLeft: {
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
  // opponentInnerContainer: {
  //   height: '416px',
  //   overflow: 'auto',
  // },
  playerName: {
    height: '40px',
    overflow: 'hidden',
    display: 'inline-block',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      fontSize: '13px',
    },
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(1),
    '& .MuiButton-root': {
      color: theme.palette.common.grey[500],
      background: 'unset',
      width: '100px',
      margin: 0,
      padding: '0px',
      display: 'flex',
      justifyContent: 'start',
      opacity: '1',
      '&:hover': {
        boxShadow: 'unset',
        background: 'unset',
      },
      '&:active': {
        boxShadow: 'unset',
        opacity: '0.5',
      },
      '&:focus': {
        boxShadow: 'unset',
        opacity: '0.5',
      },
      '& .MuiButton-iconSizeMedium > *:first-child': {
        fontSize: '1.5rem',
      },
      '& .MuiTouchRipple-root': {
        display: 'none',
      },
    },
  },
  fab: {
    margin: '0px',
    top: 'auto',
    right: '28px',
    bottom: '12px',
    left: 'auto',
    position: 'fixed',
    zIndex: 3,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
    [theme.breakpoints.up('xl')]: {
      display: 'none',
    },
  },
  iconBtn: {
    width: '50px',
    height: '50px',
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
    '&:hover': {
      background: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
  },
  startDisplay: {
    display: 'flex',
    maxWidth: '150px',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
    // [theme.breakpoints.up('xs')]: {
    //   display: 'none',
    // },
    // [theme.breakpoints.up('sm')]: {
    //   display: 'none',
    // },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
    [theme.breakpoints.up('xl')]: {
      display: 'flex',
    },
  },
  btn_container: {
    width: '100%',
    maxWidth: '145px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '80%',
    },
  },
  PlayButton: {
    width: '184px',
  },
  coinIcon: {
    width: '53px',
    height: '53px',
    [theme.breakpoints.down('xs')]: {
      width: '36px',
      height: '36px',
    },
  },
  coinIconBox: {
    marginLeft: '-60px',
    marginBottom: '-8px',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '-23px',
    },
  },
  stripBold: {
    color: '#FFE500',
    fontSize: 24,
  },
  stripText: {
    fontSize: '16px',
    paddingBottom: 7,
    paddingLeft: 14,
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '9px',
      paddingLeft: 3,
    },
  },
  challengeContainer: {
    width: '100%',
    maxWidth: '1060px',
    [theme.breakpoints.down('md')]: {
      maxWidth: '600px',
    },
  },
  stripBackground: {
    marginTop: '16px',
    marginBottom: '24px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
      marginBottom: '5px',
    },
  },
  no_opponents: {
    marginTop: '-40px',
    '& h1': {
      color: '#313644',
      fontSize: '24px',
      // backgroundColor: 'lightblue',
    },
    '& p': {
      color: '#5E5E5E',
      fontSize: '17px',
      // backgroundColor: 'lightblue',
      maxWidth: '420px',
      textAlign: 'center',
      fontFamily: 'Poppins',
      fontWeight: '500',
      marginTop: '-14px',
      marginBottom: '22px',
    },
    [theme.breakpoints.down('sm')]: {
      '& h1': {
        fontSize: '20px',
      },
      '& p': {
        fontSize: '16px',
      },
    },
  },
}));

const ChallengeSelection = React.memo(({ competition, challenge }) => {
  //const recommendations = useSelector((state) => state.GetRecommendations, shallowEqual);
  //const compDetail = useSelector((state) => state.GetCompetitionDetails, shallowEqual);

  //Call 1
  const compDetail = useSelector((state) => state.GetCompetitionDetails, shallowEqual);

  //Call 2
  const recommendations = useSelector((state) => state.GetRecommendations, shallowEqual);

  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const subject = challenge.subject || {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const opponent = challenge.opponent || { user_id: 0 };
  const dispatch = useDispatch();
  const styled = useStyles();
  const { texts } = useTheme();
  // const [stickyButton, setStickyButton] = useState(true);
  const { state } = useLocation();
  const [stateRef, setStateRef] = useState({ status: true, Subjects: null });
  const [selection, setSelection] = useState({
    step: 0,
    launched: false,
    subject,
    opponent,
    skill_id: 0,
    content_id: 0,

    is_game: subject.tag === CHALLENGE_TAGS.RECOMMENDED_GAME && subject.type !== 'MCQ' ? 1 : 0,
  });

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      window.removeEventListener('beforeunload', null);
      window.addEventListener('beforeunload', (e) => {
        if (window.location.pathname.indexOf('challenge') > -1) e.returnValue = 'Your custom message.';
      });
    }
  }, []);

  useEffect(() => {
    if (!selection.launched) {
      if (!recommendations) {
        //dispatch(GetRecommendations(competition, true));
        dispatch(GetRecommendations({ competition_id: competition?.competition_id, current_grade: compDetail?.current_grade }, true));
      }

      if (subject.tag === CHALLENGE_TAGS.RECOMMENDED_GAME) {
        setSelection({
          ...selection,
          launched: true,
          subject,
          skill_id: subject.skill_id,
          content_id: subject.content_id,
        });
      } else if (opponent.tag === CHALLENGE_TAGS.SET_OPPONENT) {
        setSelection({ ...selection, launched: true, opponent });
      } else {
        setSelection({ ...selection, launched: true });
      }
    }
  }, [challenge, selection, opponent, subject, competition, compDetail, recommendations, dispatch]);

  const SubjectGoHead = () => {
    if (opponent.tag === CHALLENGE_TAGS.SET_OPPONENT) {
      if (IsEmptyObject(selection.subject) && !subjectsToShow[0].name) Toast.Show(texts.SELECT_SUBJECT_TOAST, ALERT.INFO);
      else if (IsEmptyObject(selection.opponent)) Toast.Show(texts.SELECT_OPPONENT_TOAST, ALERT.INFO);
      else {
        let selectedSubject;
        for (let obj of recommendations) {
          if (obj.subject === (selection.subject.name || subjectsToShow[0].name)) {
            selectedSubject = obj;
          }
        }
        //  console.log('GO FROM HERE 355', competition, opponent, selectedSubject, selection);
        dispatch(
          StartChallenge(
            competition,
            opponent,
            selectedSubject,
            () => {
              dispatch(
                GoToVsScreen(
                  selection.opponent,
                  {
                    ...selectedSubject,
                    subject: selectedSubject.subject,
                    is_game: 1,
                    content_id: selectedSubject.content_id,
                  },
                  recommendations,
                  texts,
                  competition
                )
              );
            },
            compDetail.current_grade,
            IsMcdUser
          )
        );
      }
    } else {
      // console.log('IDHR');
      setSelection({ ...selection, step: 1 });
    }
  };

  const UpdateState = (subjectsToShow) => {
    setStateRef({ ...stateRef, status: false });
    setSelection({ ...selection, subject: { ...subjectsToShow[0], subject: subjectsToShow[0].name } });
    // const data = [{ ...subjectsToShow[0], subject: subjectsToShow[0].name }];

    let selectedSubject;
    for (let obj of recommendations) {
      if (obj.subject === subjectsToShow[0].name) {
        selectedSubject = obj;
      }
    }
    //console.log('GO FROM HERE 414', competition, opponent, selectedSubject);
    dispatch(
      StartChallenge(
        competition,
        opponent,
        selectedSubject,
        () => {
          dispatch(
            GoToVsScreen(
              selection.opponent,
              {
                ...selectedSubject,
                subject: selectedSubject.subject,
                is_game: 1,
                content_id: selectedSubject.content_id,
              },
              recommendations,
              texts
            )
          );
        },
        compDetail.current_grade,
        IsMcdUser
      )
    );
  };

  const handleOpponentVal = (val) => {
    setSelection({ ...selection, opponent: { user_id: 0 } });
  };

  const callback = (e, item) => {
    const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag');
    switch (t) {
      case 'update-opponent':
        setSelection({ ...selection, opponent: item });
        // console.log(selection.opponent, "opponent item")

        break;
      case 'start-challenge-friend':
      case 'start-challenge-solo':
        // console.log('in solo mode....');
        //return;
        if (IsEmptyObject(selection.subject)) Toast.Show(texts.SELECT_SUBJECT_TOAST, ALERT.INFO);
        else {
          // console.log('GO FROM HERE 418');
          //  console.log(selection.opponent,  "opponent item1")
          const opponent = item.user_id === 0 ? { user_id: 0, tag: 'SET_OPPONENT' } : selection.opponent;
          dispatch(
            StartChallenge(
              competition,
              opponent,
              subject,
              () => {
                dispatch(
                  GoToVsScreen(
                    opponent,
                    {
                      ...selection.subject,
                      subject: selection.subject.subject,
                      is_game: selection.is_game,
                      skill_id: selection.skill_id,
                      content_id: selection.content_id,
                    },
                    recommendations,
                    texts
                  )
                );
              },
              compDetail.current_grade,
              IsMcdUser
            )
          );
        }
        break;
      case 'subject-selector':
        setSelection({ ...selection, subject: { ...item, subject: item.name } });
        break;
      case 'subject-go-ahead':
        //  console.log('subject-go-ahead');
        SubjectGoHead();
        break;
      case 'go-back':
        setSelection({ ...selection, step: 0 });
        break;
      default:
        break;
    }
  };

  // console.log(compDetail, '*******');
  // console.log(selection.launched, '*******selection.launched');
  // console.log(recommendations, '******* recommendations');
  const selectedComp = SelectedCompetition.Info();
  // console.log(compDetail, "compDetail", selectedComp)
  const gradesSubject = GetSubjectsFromGrade(
    compDetail?.grades,
    compDetail?.current_grade === null || compDetail?.current_grade === undefined || compDetail?.current_grade === 0
      ? selectedComp.item.current_grade
      : compDetail.current_grade,
    0
  );
  // console.log(gradesSubject, 'gradesSubject');
  if (!recommendations) return null;
  if (!selection.launched) return null;

  const fRec = RemoveDuplicates(recommendations, 'subject');

  const subjectsToShow = [];
  for (let i = 0; i < fRec.length; i++) {
    for (let j = 0; j < gradesSubject.length; j++) {
      if (fRec[i].subject === gradesSubject[j].name) {
        subjectsToShow.push(gradesSubject[j]);
        break;
      }
    }
  }

  // const selectedValueIndex = !IsEmptyObject(selection.subject)
  //   ? GetObjFromArr(subjectsToShow, 'name', selection.subject.subject)
  //   : { index: '' };
  // console.log(subjectsToShow, 'subjectsToShow...')

  const subjectSelector = {
    title: texts.SELECT_SUBJECT,
    icon: IMAGES.CHOOSE_GRADE,
    mainTitle: texts.SELECT_SUBJECT,
    fullWidth: true,
    UI: (
      <SingleDataRow flexDirection="column" alignItems="center" justifyContent="center" pt={2} pb={0}>
        <Select
          list={subjectsToShow}
          callback={callback}
          value={subjectsToShow[0]?.index}
          tag="subject-selector"
          label={texts.SELECT_SUBJECT}
        />
        <Box width="100%" textAlign="center">
          <Button mt={3} pl={6} pr={6} onClick={callback} width="auto" tag="subject-go-ahead">
            {opponent.tag === CHALLENGE_TAGS.SET_OPPONENT ? texts.START : texts.SELECT_OPPONENT}
          </Button>
        </Box>
      </SingleDataRow>
    ),
  };

  const opponentSelector = {
    title: `${texts.CHALLENGE_MODE}`,
    icon: `${IMAGES.MULTI_PLAYER_ICON}`,
    mainTitle: 'Select Mode',
    fullWidth: true,
    UI: (
      <>
        <OpponentSelector
          competition={competition}
          compDetail={compDetail}
          subject={selection.subject}
          selectedOpponent={selection.opponent}
          callback={callback}
          Type="1"
          handleOpponentVal={handleOpponentVal}
        />
      </>
    ),
  };

  const singlePlayerSelector = {
    title: `${texts.SINGLE_MODE}`,
    mainTitle: 'Select Mode',
    icon: `${IMAGES.SINGLE_PLAYER_ICON}`,
    fullWidth: true,
    UI: (
      <>
        <OpponentSelector
          competition={competition}
          compDetail={compDetail}
          subject={selection.subject}
          selectedOpponent={selection.opponent}
          callback={callback}
          Type="0"
          handleOpponentVal={handleOpponentVal}
        />
      </>
    ),
  };

  const track = [];

  // console.log('subject.tag', subject.tag);
  // console.log('opponent.tag', opponent.tag);

  if (subject.tag === CHALLENGE_TAGS.RECOMMENDED_GAME) {
    if (!User.IsGuest()) {
      track.push(opponentSelector);
    }
    track.push(singlePlayerSelector);
  } else if (opponent.tag === CHALLENGE_TAGS.SET_OPPONENT) {
    //   console.log('stateRef.status', stateRef.status);
    if (subjectsToShow.length === 1 && stateRef.status) {
      UpdateState(subjectsToShow);
    } else {
      track.push(subjectSelector);
    }
  } else {
    // console.log('597');
    track.push(subjectSelector);
    track.push(opponentSelector);
    track.push(singlePlayerSelector);
  }

  let rightIcon = null;
  let leftIcon = null;
  // console.log(track, 'track')
  if (track[selection.step].mainTitle !== texts.SELECT_SUBJECT && track.length === 3) {
    rightIcon = (
      <Box mr={0.5} mt={0.5}>
        <Box className={`${styled.smallCircle} ${selection.step === 0 && 'selected'}`} />
        <Box className={`${styled.smallCircle} ${selection.step === 1 && 'selected'}`} />
      </Box>
    );
    if (selection.step === 1) {
      leftIcon = (
        <Box className={styled.menuButton}>
          <Button mt={3} tag="go-back" type="submit" onClick={callback} startIcon={<i className="i i-left" />}>
            <Box>{texts.SUBJECT}</Box>
          </Button>
        </Box>
      );
    }
  }

  if (selection.step >= track.length) return null;

  let headerSet = null;
  if (state && state.from) {
    headerSet = {
      showLeft: true,
      showRight: true,
      // leftTitle: texts[state.from.name],
      // overrideLeftButton: true,
      // callback: () => {
      //   GoToLastPage();
      // },
    };
  }
  // track[selection.step].mainTitle !== texts.SELECT_SUBJECT &&
  return (
    <PageStructure
      containerClass={styled.challengeContainer}
      title={track[selection.step].mainTitle}
      headerSet={headerSet}
      logo={track[selection.step].mainTitle !== texts.SELECT_SUBJECT && IMAGES.SELECT_OPPONENT_ICON}
      showTitle={true}
    >
      {track.length === 2 && (
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <SelectionPaper
            icon={track[selection.step + 1].icon}
            title={track[selection.step + 1].title}
            rightIcon={rightIcon}
            leftIcon={leftIcon}
            fullWidth={track[selection.step + 1].fullWidth}
          >
            {track[selection.step + 1].UI}
          </SelectionPaper>
        </Grid>
      )}
      <Grid item xs={12} sm={12} md={12} lg={6} style={{ margin: 'auto' }}>
        <SelectionPaper
          icon={track[selection.step].icon}
          title={track[selection.step].title}
          rightIcon={rightIcon}
          leftIcon={leftIcon}
          fullWidth={track[selection.step].fullWidth}
        >
          {track[selection.step].UI}
        </SelectionPaper>
      </Grid>
    </PageStructure>
  );
});

export default ChallengeSelection;

const OpponentSelector = React.memo(({ competition, compDetail, subject, callback, selectedOpponent, Type, handleOpponentVal }) => {
  const dispatch = useDispatch();
  const user = User.Info();
  const [stateRef, setStateRef] = useState({ launched: false, selected: selectedOpponent });
  const opponents = useSelector((state) => state.Opponents, shallowEqual);
  const styled = useStyles();
  const { texts } = useTheme();

  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const coinsImage = Inst_config ? Inst_config.images.coin_icon : '';

  const loadOpponentsData = useCallback(() => {
    dispatch(GetOpponents({ competition_id: competition.competition_id, current_grade: compDetail?.current_grade }, subject?.subject));
  }, [dispatch, competition, compDetail, subject]);

  useEffect(() => {
    if (!opponents && !stateRef.launched) {
      loadOpponentsData();
      setStateRef({ ...stateRef, launched: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateRef.launched, opponents]);

  let opponentFriends = [0, 1, 2, 3, 4, 5, 6, 7].map((item) => {
    return (
      <FriendGrid key={item}>
        <Box className={`${styled.gridItem} ${stateRef.selected.user_id === item.user_id ? 'selected' : ''}`}>
          <Skeleton variant="circle" width="80px" height="80px" className={styled.circleSkeleton} />
          <Box mt={1}>
            <Skeleton variant="rect" width="80px" height="20px" className={styled.rectSkeleton} />
          </Box>
        </Box>
      </FriendGrid>
    );
  });

  let recommendedFriends = null;
  let alreadyInvited = null;

  useEffect(() => {
    handleOpponentVal();
    setStateRef({ ...stateRef, selected: { user_id: 0 } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const localCallback = (e, item) => {
    let dataTag = e.currentTarget.getAttribute('data-tag');
    // return;
    // console.log(selectedOpponent, "selectedOpponent")
    if (dataTag === texts.START_CHALLENGE_FRIENDS) {
      if (selectedOpponent.user_id === 0) {
        Toast.Show('Select Opponent', ALERT.INFO);
        return;
      }
    }

    //return;
    const t = item && item.tag;
    switch (t) {
      case CHALLENGE_TAGS.SET_OPPONENT:
        //console.log('first case---');
        setStateRef({ ...stateRef, selected: item });
        handleOpponentVal();
        if (callback) callback('update-opponent', item);
        break;
      default:
        //console.log('default case---');
        //console.log('stateRef.selected', stateRef.selected);
        //return;
        if (stateRef.selected.user_id === -1) Toast.Show(texts.SELECT_OPPONENT_TOAST, ALERT.INFO);
        else if (callback) callback(e, stateRef.selected);
        break;
    }
  };

  if (opponents) {
    opponentFriends = opponents?.users?.map((item) => {
      if (!item.is_same_grade) return null;
      return (
        <FriendGrid key={item.user_id}>
          <IconButton
            className={styled.animation}
            onClick={(e) => {
              localCallback(e, { ...item, tag: CHALLENGE_TAGS.SET_OPPONENT });
            }}
          >
            <Box className={`${styled.gridItem} ${stateRef.selected.user_id === item.user_id ? 'selected' : ''}`}>
              <AvatarSwitcher t={item.profile_picture} s={80} />
              <Box display="flex" justifyContent="center" alignItems="center" className=".ellipsis">
                <Body2 mt={1} className={styled.playerName}>
                  {UsernameResolver(item.name, item.username)}
                </Body2>
              </Box>
            </Box>
          </IconButton>
        </FriendGrid>
      );
    });

    //console.log('opponents-->', opponents);
    recommendedFriends = opponents?.recommendations?.map((item) => {
      return (
        <FriendGrid key={item.user_id}>
          {/* <IconButton
            className={styled.animation}
            onClick={(e) => {
              localCallback(e, { ...item, tag: CHALLENGE_TAGS.SET_OPPONENT });
            }}
          >
            <Box position="absolute" zIndex="2" top={60} right={16}>
              <i className="i i-recommended" />
            </Box>
            <Box className={`${styled.gridItem} ${stateRef.selected.user_id === item.user_id ? 'selected' : ''}`}>
              <AvatarSwitcher t={item.profile_picture} s={80} />
              <Box display="flex" justifyContent="center" alignItems="center">
                <Body2 mt={1} className={styled.playerName}>
                  {UsernameResolver(item.name, item.username)}
                </Body2>
              </Box>
            </Box>
          </IconButton> */}
          <InlineButton
            className={styled.animation}
            onClick={(e) => {
              localCallback(e, { ...item, tag: CHALLENGE_TAGS.SET_OPPONENT });
            }}
          >
            <Box position="absolute" zIndex="2" top={60} right={16}>
              <i className="i i-recommended" />
            </Box>
            <Box className={`${styled.gridItem} ${stateRef.selected.user_id === item.user_id ? 'selected' : ''}`}>
              <AvatarSwitcher t={item.profile_picture} s={80} />
              <Box display="flex" justifyContent="center" alignItems="center">
                <Body2 mt={1} className={styled.playerName}>
                  {UsernameResolver(item.name, item.username)}
                </Body2>
              </Box>
            </Box>
          </InlineButton>
        </FriendGrid>
      );
    });

    alreadyInvited = opponents?.already_invited?.slice(0, 10).map((item) => {
      return (
        <FriendGrid key={item.user_id}>
          <Box style={{ opacity: '.6', background: '#f1f1f1', borderRadius: '16px' }}>
            <Box position="absolute" zIndex="2" top={60} right={16}>
              <i className="i i-recommended" />
            </Box>
            <Box className={`${styled.gridItem} ${stateRef.selected.user_id === item.user_id ? 'selected' : ''}`}>
              <AvatarSwitcher t={item.profile_picture} s={80} />
              <Box display="flex" justifyContent="center" alignItems="center">
                <Body2 mt={1} className={styled.playerName}>
                  {UsernameResolver(item.name, item.username)}
                </Body2>
              </Box>
            </Box>
          </Box>
        </FriendGrid>
      );
    });
  }

  return (
    <>
      {Type === '1' && (
        <Box className={`${styled.stripBackground} strip-background`}>
          <Box className={styled.coinIconBox}>
            <img src={coinsImage} alt="Game-based learning" className={styled.coinIcon} />
          </Box>
          <Body1 fontSize="16px" fontWeight="600" color="#fff" className={styled.stripText}>
            {texts.THREE_X_REWARD_1}
            <span className={styled.stripBold}>{texts.THREE_X_REWARD_2}</span>
            {texts.THREE_X_REWARD_3}
          </Body1>
        </Box>
      )}
      <Box className={`${styled.row} ${styled.opponentContainer} ${Type === '0' ? styled.opponentContainerLeft : ''}`} pt={2}>
        <Grid container justifyContent="center" className={styled.opponentInnerContainer}>
          {Type === '0' && (
            <>
              <FriendGrid>
                <IconButton
                  className={styled.animation}
                  onClick={(e) => {
                    localCallback(e, { user_id: 0, tag: CHALLENGE_TAGS.SET_OPPONENT });
                  }}
                >
                  <Box className={`${styled.gridItemNew} ${stateRef.selected.user_id === 0 ? 'selected' : ''}`}>
                    <Box
                      style={{
                        border: `8px solid ${AVATAR_SET[+user?.profile_picture]?.color}`,
                        borderRadius: '100px',
                      }}
                      className={`${styled.singleIcon} ${stateRef.selected === 0 && 'selected'}`}
                    >
                      <AvatarSwitcher t={`${user?.profile_picture}`} s={85} />
                    </Box>
                  </Box>
                </IconButton>
              </FriendGrid>
            </>
          )}

          {Type === '1' && (
            <>
              {recommendedFriends}
              {opponentFriends}

              {!recommendedFriends?.length > 0 && !opponentFriends?.length > 0 && (
                <div style={{ display: 'block', width: '100%' }} className={styled.no_opponents}>
                  {/* <H1>{'Already Invited'}</H1> */}
                  <H1>{texts.PLAYERS_CHALLENGED}</H1>
                  <p>{texts.PLAYERS_CHALLENGED_DESC}</p>
                </div>
              )}

              {!recommendedFriends?.length > 0 && !opponentFriends?.length > 0 && alreadyInvited}
              {/* {alreadyInvited} */}
            </>
          )}
        </Grid>
      </Box>

      {/* Start challenge button */}
      <Box className={styled.btn_container} pt={2}>
        <ButtonBold
          bgBlue={Type === '0' ? true : false}
          yellowBubble
          secondaryYellow
          className={styled.startDisplay}
          hideBtn={!recommendedFriends?.length > 0 && !opponentFriends?.length > 0 && Type !== '0' ? true : false}
          disabled={!recommendedFriends?.length > 0 && !opponentFriends?.length > 0 && Type !== '0' ? true : false}
          mt={4}
          width="auto"
          pl={8}
          pr={8}
          // tag={texts.START_CHALLENGE_FRIENDS}
          tag={Type === '0' ? texts.START_CHALLENGE_SOLO : texts.START_CHALLENGE_FRIENDS}
          data_sid={Type === '0' ? texts.START_CHALLENGE_SOLO : texts.START_CHALLENGE_FRIENDS}
          onClick={localCallback}
        >
          {texts.START}
        </ButtonBold>
      </Box>

      {/* <Button
        className={styled.startDisplay}
        mt={4}
        width="auto"
        pl={8}
        pr={8}
        onClick={localCallback}
        tag={texts.START_CHALLENGE_FRIENDS}
      >
        {texts.START}
      </Button> */}
      {/* <Box className={styled.fab}>
        <Button
          className={styled.PlayButton}
          endIcon={<i className="i i-right" />}
          mt={4}
          width="auto"
          pl={8}
          pr={8}
          onClick={localCallback}
          tag={texts.START_CHALLENGE_FRIENDS}
        >
          {texts.START_CHALLENGE}
        </Button>
      </Box> */}
    </>
  );
});

const FriendGrid = ({ children }) => {
  return (
    <Grid xs={4} md={3} lg={4} item container justifyContent="center">
      {children}
    </Grid>
  );
};
