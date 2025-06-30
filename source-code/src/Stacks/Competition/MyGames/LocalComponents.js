/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Grid, useTheme } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { GameCard, RecommendationCardLoader } from 'Components';
import { RailItem } from 'Components/Rail';
import { IsEmptyObject, validURL, LocalStorage, getInstanceType } from 'Utils';
import { PageSwitch } from 'Navigation';
import { ChallengeNav, CompetitionNav } from 'Navigation/Paths';
import { CHALLENGE_TAGS, CHALLENGE } from 'Constants/challenge.constants';
import { gameDispatch } from 'Utils/ActionCreators';
import { COMPETITION, STORAGE_KEYS, config, getGameContentType, getSubjectStyle } from 'Constants';
import useStyles from './style';
import { GoToVsScreen, StartChallenge } from 'Actions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { INSTANCES_ID } from 'Constants/instance.config';
import MyGamesRail from './MyGamesRail';

const preProcessLessonGames = (title, list) => {
  const filteredByskill = [];
  let singleMcq = {};
  for (let i = 0; i < list.length; i++) {
    // if (list[i].skill === title) {
    filteredByskill.push({ ...list[i] });
    // }
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

export const SingleSubjectGamesLoader = React.memo(({ item: { list } }) => {
  const styled = useStyles();
  return (
    <Grid item xs={12}>
      <div style={{ width: '100%', margin: '18px 32px', borderRadius: '24px' }}>
        <Skeleton variant="rect" width="100%" height="48px" className={styled.skeleton} />
      </div>
      <div className={styled.myGamesRail}>
        <MyGamesRail>
          <RailItem key={0}>
            <RecommendationCardLoader isCalledFromGames item={list[0].id} />
          </RailItem>
          <RailItem key={0}>
            <RecommendationCardLoader isCalledFromGames item={list[0].id} />
          </RailItem>
          <RailItem key={0}>
            <RecommendationCardLoader isCalledFromGames item={list[0].id} />
          </RailItem>
        </MyGamesRail>
      </div>
    </Grid>
  );
});

export const LessonListingGames = React.memo(({ list, TopicNo, competition, IsMcdUser, userID, recommendations, currentGrade }) => {
  // console.log(list, 'list');
  const styled = useStyles();
  // const fSkills = RemoveDuplicates(list, 'skill');
  const fSkills = list;
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

    const secondChip = item?.is_passed === 1;
    const gameContentType = getGameContentType(item);
    const subjectStyle = getSubjectStyle(item, userID, competition.competition_id, item.content_id, index);

    // gameObj = GetObjFromArr(games, 'game_id', item.type);
    // gameObj.new_image_url = item.module_image || null;

    //if (!gameObj || IsEmptyObject(gameObj)) return null;
    let buttonText = item.type.toLowerCase().search('video') === -1 ? texts.PLAY : texts.WATCH;
    if (item.type.toLowerCase() === 'link') {
      buttonText = texts.OPEN;
    }
    const firstPortion = competition.is_mcd || listToShow.length < 2 ? '' : item.subject;
    const secondPortion = competition.is_module_name_visible ? gameObj?.alias : '';
    const joiningPortion = competition.is_mcd || !competition.is_module_name_visible || listToShow.length < 2 ? '' : '|';
    const chipContent = `${firstPortion} ${joiningPortion} ${secondPortion}`;
    const thirdChip = { name: false };
    const fourthChip = index;
    if (item.subcategory && item.subcategory?.toLowerCase().trim() === 'bonus') thirdChip.name = '2x Bonus';
    else if (item.subcategory && item.subcategory?.toLowerCase().trim() === 'beginner') thirdChip.name = 'Beginner';
    else if (item.subcategory && item.subcategory?.toLowerCase().trim() === 'intermediate') thirdChip.name = 'Intermediate';
    else if (item.subcategory && item.subcategory?.toLowerCase().trim() === 'advanced') thirdChip.name = 'Advanced';
    return (
      <RailItem key={item.content_id}>
        <GameCard
          item={{
            ...item,
            id: item.content_id,
            buttonTitle: buttonText,
            image: item.game_image_url ? imageToShow : gameObj.image_url,
            tag: CHALLENGE_TAGS.RECOMMENDED_GAME,
            index,
            isCalledFromLessons: false,
            isCalledFromGames: true,
          }}
          secondChip={secondChip}
          thirdChip={thirdChip.name}
          fourthChip={fourthChip + 1}
          chip={IsMcdUser ? chipContent : false}
          callback={callback}
          noButton
          subjectStyle={subjectStyle}
          gameContentType={gameContentType}
          isPocketGames={isPocketGames}
        />
      </RailItem>
    );
  });

  return (
    <div className={styled.myGamesRail}>
      <h2>{fSkills[0]?.topic}</h2>
      <MyGamesRail list={fSkills}>{PageUI}</MyGamesRail>
    </div>
  );
});
