/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo } from 'react';
import { Grid, Box, useTheme } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { H3, Card, CardLoader, Paper, GameCard } from 'Components';
import LessonListRail, { LessonListRailItem } from 'Components/LessonListRail';
import Rail, { RailItem } from 'Components/Rail';
import { IsEmptyObject, RemoveDuplicates, validURL, LocalStorage, getInstanceType } from 'Utils';
import { PageSwitch } from 'Navigation';
import { ChallengeNav, CompetitionNav } from 'Navigation/Paths';
import { CHALLENGE_TAGS, CHALLENGE } from 'Constants/challenge.constants';
import { gameDispatch } from 'Utils/ActionCreators';
import { COMPETITION, STORAGE_KEYS, config, getGameContentType, getSubjectStyle } from 'Constants';
import tickImage from 'Assets/images/tick.png';
// import { LessonListCard } from 'Components/LessonListCard';
import useStyles from './style';
import { GoToVsScreen, StartChallenge } from 'Actions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { INSTANCES_ID } from 'Constants/instance.config';

const preProcessGames = (title, list) => {
  const filteredBySubject = [];
  let singleMcq = {};
  for (let i = 0; i < list.length; i++) {
    if (list[i].subject === title) {
      filteredBySubject.push({ ...list[i] });
    }
  }

  if (filteredBySubject.length === 1) return filteredBySubject;

  for (let i = 0; i < filteredBySubject.length; i++) {
    if (filteredBySubject[i].type.toLowerCase() === 'mcq') {
      singleMcq = { ...filteredBySubject[i] };
      filteredBySubject.splice(i, 1);
      i--;
    }
  }
  if (!IsEmptyObject(singleMcq)) {
    filteredBySubject.push(singleMcq);
  }

  return filteredBySubject;
};

const preProcessLessonGames = (title, list) => {
  const filteredByskill = [];
  let singleMcq = {};
  for (let i = 0; i < list.length; i++) {
    if (list[i].skill === title) {
      filteredByskill.push({ ...list[i] });
    }
  }

  if (filteredByskill.length === 1) return filteredByskill;

  for (let i = 0; i < filteredByskill.length; i++) {
    if (filteredByskill[i].type.toLowerCase() === 'mcq') {
      singleMcq = { ...filteredByskill[i] };
      filteredByskill.splice(i, 1);
      i--;
    }
  }
  if (!IsEmptyObject(singleMcq)) {
    filteredByskill.push(singleMcq);
  }

  return filteredByskill;
};

export const SingleSubjectGames = React.memo(({ title, list }) => {
  const { texts, palette } = useTheme();
  const callback = (e, item) => {
    gameDispatch(CHALLENGE.SET_SUBJECT, item);
    PageSwitch(ChallengeNav.CHALLENGE_SELECTION);
  };
  let gameObj = {};

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const listToShow = useMemo(() => preProcessGames(title, list), [title]);

  return (
    <Grid item xs={12}>
      <Paper
        maxWidth="100%"
        background={palette.primary.light}
        m={0}
        mb={2}
        pt={1.5}
        pb={1.5}
        pl={6}
        pr={6}
        elevation={0}
        display="inline-block"
      >
        <H3 m={0}>{title}</H3>
      </Paper>

      <Rail>
        {listToShow.map((game) => {
          // gameObj = GetObjFromArr(games, 'game_id', game.type);
          if (!gameObj || IsEmptyObject(gameObj)) return null;
          return (
            <RailItem key={game.content_id}>
              <Card
                item={{
                  ...game,
                  id: game.content_id,
                  buttonTitle: texts.PLAY,
                  image: gameObj.image_url,
                  tag: CHALLENGE_TAGS.RECOMMENDED_GAME,
                  isCalledFromLessons: true,
                }}
                callback={callback}
              />
            </RailItem>
          );
        })}
      </Rail>
    </Grid>
  );
});

export const OneAvatarWithPosition = React.memo((props) => {
  const styled = useStyles();
  const { position } = props;
  return (
    <Box className={styled.root}>
      <Box className={styled.position}>{position}</Box>
    </Box>
  );
});

export const SingleSubjectGamesLoader = React.memo(({ item: { list } }) => {
  const styled = useStyles();
  return (
    <Grid item xs={12}>
      <div style={{ width: '100%', margin: '18px 0px', borderRadius: '24px' }}>
        <Skeleton variant="rect" width="100%" height="48px" className={styled.skeleton} />
      </div>
      <Rail>
        {/* {list.map((game) => {
          return ( */}
        <RailItem key={0}>
          <CardLoader item={list[0].id} />
        </RailItem>
        {/* );
        })} */}
      </Rail>
    </Grid>
  );
});

export const LessonListingGames = React.memo(({ list, TopicNo, competition, IsMcdUser, userID, recommendations, currentGrade }) => {
  // console.log(list, 'list');
  const styled = useStyles();
  const fSkills = RemoveDuplicates(list, 'skill');
  const { texts } = useTheme();
  const dispatch = useDispatch();
  const directSinglePlayerMode = competition?.is_multiplayer_allowed === 0;
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isPocketGames = getInstanceType(Inst_config.instance_id, INSTANCES_ID.POCKET_GAMES_ID);

  // console.log('opening ITEM: ', fSkills);
  const callback = (e, item, index) => {
    //  console.log('opening ITEM: ', item);
    LocalStorage.Set(STORAGE_KEYS.MODULE_SELECTED, { data: item || undefined });
    if (item.type.toLowerCase() === 'link') {
      window.open(item.link, '_blank');
    } else if (item.type.toLowerCase().search('video') === -1) {
      gameDispatch(CHALLENGE.SET_SUBJECT, item);

      if (directSinglePlayerMode) {
        // console.log('in solo mode....');
        const opponent = { user_id: 0 };
        dispatch(
          StartChallenge(
            competition,
            opponent,
            item,
            () => {
              dispatch(
                GoToVsScreen(
                  opponent,
                  {
                    ...item,
                    is_game: item.type !== 'MCQ' ? 1 : 0,
                  },
                  recommendations,
                  texts
                )
              );
            },
            currentGrade,
            IsMcdUser
          )
        );
      } else {
        PageSwitch(ChallengeNav.CHALLENGE_SELECTION);
      }
    } else {
      const Parse = validURL(item.link) ? '' : JSON.parse(item.link);
      const url = Parse.video_path ? Parse.video_path : item.link;
      gameDispatch(COMPETITION.SET_VIDEO, { link: url, videoIndex: index });
      PageSwitch(CompetitionNav.VIDEO);
    }
  };
  const PageUI = fSkills.map((item, index) => {
    let gameObj = {};

    const listToShow = preProcessLessonGames(item.skill, list);
    //  console.log(listToShow);
    // to show card image from competition data if passed
    const imageToShow =
      item.game_image_url && (item.game_image_url.indexOf('http') > -1 ? item.game_image_url : config.webUrl + item.game_image_url);
    return (
      // eslint-disable-next-line react/no-array-index-key

      <div key={index} className={styled.LessonListHeadingMainDiv}>
        <div className={styled.LessonListHeading}>
          <div className={styled.LessonListHeadingFont}>{`${TopicNo}.${index + 1} ${item.skill}`}</div>
        </div>
        <div className="silkSliderParent">
          <LessonListRail>
            {listToShow.map((game, indexX) => {
              const secondChip = game?.is_passed === 1;
              const gameContentType = getGameContentType(game);
              const subjectStyle = getSubjectStyle(game, userID, competition.competition_id, item.content_id, index);

              // gameObj = GetObjFromArr(games, 'game_id', game.type);
              // gameObj.new_image_url = item.module_image || null;

              //if (!gameObj || IsEmptyObject(gameObj)) return null;
              let buttonText = game.type.toLowerCase().search('video') === -1 ? texts.PLAY : texts.WATCH;
              if (item.type.toLowerCase() === 'link') {
                buttonText = texts.OPEN;
              }
              const firstPortion = competition.is_mcd || listToShow.length < 2 ? '' : item.subject;
              const secondPortion = competition.is_module_name_visible ? gameObj?.alias : '';
              const joiningPortion = competition.is_mcd || !competition.is_module_name_visible || listToShow.length < 2 ? '' : '|';
              const chipContent = `${firstPortion} ${joiningPortion} ${secondPortion}`;
              const thirdChip = { name: false };
              const fourthChip = indexX;
              if (item.subcategory && item.subcategory?.toLowerCase().trim() === 'bonus') thirdChip.name = '2x Bonus';
              else if (item.subcategory && item.subcategory?.toLowerCase().trim() === 'beginner') thirdChip.name = 'Beginner';
              else if (item.subcategory && item.subcategory?.toLowerCase().trim() === 'intermediate') thirdChip.name = 'Intermediate';
              else if (item.subcategory && item.subcategory?.toLowerCase().trim() === 'advanced') thirdChip.name = 'Advanced';
              // console.log(competition);
              return (
                <LessonListRailItem key={game.content_id} className={styled.listItemNew}>
                  {/* LessonListCard switch to GameCard */}
                  <GameCard
                    item={{
                      ...game,
                      id: game.content_id,
                      buttonTitle: buttonText,
                      // to show card image from competition data if passed else show the one being passed from local data
                      image: item.game_image_url ? imageToShow : gameObj.image_url,
                      tag: CHALLENGE_TAGS.RECOMMENDED_GAME,
                      indexX,
                      isCalledFromLessons: true,
                    }}
                    secondChip={secondChip}
                    // chip={game?.subject.toLowerCase().indexOf('mcdonald') > -1 && listToShow.length < 2 ? false : indexX + 1}
                    thirdChip={thirdChip.name}
                    fourthChip={fourthChip + 1}
                    chip={IsMcdUser ? chipContent : false}
                    callback={callback}
                    noButton
                    subjectStyle={subjectStyle}
                    gameContentType={gameContentType}
                    isPocketGames={isPocketGames}
                  />
                </LessonListRailItem>
              );
            })}
          </LessonListRail>
        </div>
      </div>
    );
  });

  return <div className={styled.ListingMainContainer}>{PageUI}</div>;
});

export const OneListPrimaryTextLoader = React.memo(() => {
  const styled = useStyles();
  return (
    <Grid container>
      <Grid item xs={10} pr={1}>
        <Box pr={2}>
          <Skeleton variant="rect" width="90%" height={16} className={styled.skeleton} />
        </Box>
      </Grid>
      <Grid item xs={2} container alignItems="center" justifyContent="flex-end">
        <Box pt={0.25}>
          <Skeleton variant="rect" width="50px" height={16} className={styled.skeleton} />
        </Box>
      </Grid>
    </Grid>
  );
});

export const OneAvatarWithPositionLoader = React.memo(() => {
  const styled = useStyles();
  return (
    <Box className={styled.root} mr={2}>
      <Skeleton variant="circle" width={40} height={40} className={styled.skeletonCircle} />
    </Box>
  );
});

export const OneListLessonTitleText = React.memo((props) => {
  const { name, isCompleted } = props;
  // const styled = useStyles();
  return (
    <Grid container>
      <Grid item xs={10}>
        <Box pr={2.5} pt={0.5} textOverflow="ellipsis" overflow="hidden">
          {name}
        </Box>
      </Grid>
      <Grid item xs={2} pt={0.5} container alignItems="center" justifyContent="flex-end">
        <Box pt={0.25}>{isCompleted && <img src={tickImage} alt="Completed!" style={{ height: '24px', width: '24px' }} />}</Box>
      </Grid>
    </Grid>
  );
});
