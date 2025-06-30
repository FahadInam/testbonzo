/* eslint-disable camelcase */
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Grid, useTheme } from '@material-ui/core';

import Rail, { RailItem } from 'Components/Rail';
import { Body1, GameCard, H4, ModalBox, RecommendationCardLoader } from 'Components';
import { CHALLENGE_TAGS, CHALLENGE } from 'Constants/challenge.constants';
import { COMPETITION, config, getGameContentType, getSubjectStyle, IMAGES, STORAGE_KEYS } from 'Constants';
import { RemoveDuplicates, SortOnDate, validURL, LocalStorage, getInstanceType } from 'Utils';
import { ChallengeNav, CompetitionNav } from 'Navigation/Paths';
import { gameDispatch } from 'Utils/ActionCreators';
import { PageSwitch } from 'Navigation';
import { GoToVsScreen, SelectedCompetition, StartChallenge } from 'Actions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { INSTANCES_ID } from 'Constants/instance.config';
import ButtonBold from 'Components/Core/ButtonBold';

export const RecommendationLoader = () => {
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isPocketGames = getInstanceType(Inst_config.instance_id, INSTANCES_ID.POCKET_GAMES_ID);
  const UI = [0, 1, 2, 3].map((item) => {
    return (
      <RailItem key={item}>
        {/* <CardLoader item={{}} chip /> */}
        <RecommendationCardLoader item={{}} chip isPocketGames={isPocketGames} />
      </RailItem>
    );
  });

  return <Rail>{UI}</Rail>;
};

export const Recommendations = React.memo(
  ({ recommendations, results, their_turn, games, competition, IsMcdUser, userID, currentGrade }) => {
    const { texts } = useTheme();
    const CompetitionDetails = useSelector((state) => state.GetCompetitionDetails, shallowEqual);
    const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
    const dispatch = useDispatch();
    const [otherSubjects, setOtherSubjects] = useState([]);
    const isPocketGames = getInstanceType(Inst_config.instance_id, INSTANCES_ID.POCKET_GAMES_ID);
    const { is_lesson_based, is_multiplayer_allowed, is_hide_card, is_module_name_visible, is_mcd, is_one_module, competition_id } =
      competition;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);

    const locked_messages = competition?.locked_messages ? JSON.parse(competition?.locked_messages) : null;
    useEffect(() => {
      let subjectsArray = [];

      for (let i = 0; i < CompetitionDetails?.grades?.length; i++) {
        subjectsArray.push({
          name: CompetitionDetails.grades[i].subject,
          cms_course_id: CompetitionDetails.grades[i].cms_course_id,
          index: CompetitionDetails.grades[i].cms_course_id,
          grade: CompetitionDetails.grades[i].grade,
        });
      }
      // subjectsArray = RemoveDuplicates(subjectsArray, 'name');
      subjectsArray = subjectsArray.filter((item) => item.grade === currentGrade);
      setOtherSubjects(subjectsArray);
    }, [CompetitionDetails, currentGrade]);

    const preProcessRecommendations = (list, result, turn) => {
      if (!list) return [];
      if (is_lesson_based && !is_one_module) return list;
      const finalRec = [];
      const Temp_list = is_one_module
        ? list.filter((item) => {
            return item.is_passed !== 1;
          })
        : list;

      const resultData = result ? [...result] : [];
      const resultTurn = result ? [...turn] : [];

      const mergedSubjectOrder = [...resultData, ...resultTurn];
      // console.log(mergedSubjectOrder);
      const fFinalGameRec = RemoveDuplicates(Temp_list, 'subject');
      // console.log('fFinalGameRec', fFinalGameRec);
      const sortedSubjectOrder = SortOnDate(mergedSubjectOrder, 'completed_on');
      // console.log('sortedSubjectOrder', sortedSubjectOrder);
      const fSortedSubjectOrder = RemoveDuplicates(sortedSubjectOrder, 'subject');
      // console.log('fSortedSubjectOrder', fSortedSubjectOrder);

      for (let i = 0; i < fSortedSubjectOrder.length; i++) {
        for (let j = 0; j < fFinalGameRec.length; j++) {
          if (fSortedSubjectOrder[i].subject === fFinalGameRec[j].subject) {
            finalRec.push({ ...fFinalGameRec[j] });
            break;
          }
        }
      }
      return RemoveDuplicates([...finalRec, ...fFinalGameRec], 'subject');
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fRecommendations = useMemo(() => preProcessRecommendations([...recommendations], results, their_turn), [recommendations]);

    if (!recommendations || recommendations.length === 0) return null;

    const directSinglePlayerMode = is_multiplayer_allowed === 0;
    const callback = (e, item) => {
      const isGameLocked = competition?.is_daily_learning && item?.is_locked;
      if (isGameLocked) {
        setIsModalOpen(true);
        return;
      }
      LocalStorage.Delete(STORAGE_KEYS.MODULE_SELECTED);
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
        gameDispatch(COMPETITION.SET_VIDEO, { link: url });
        PageSwitch(CompetitionNav.VIDEO);
      }
    };

    const handleModal = (e) => {
      const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
      console.log(t, 't here');
      switch (t) {
        case 'play-again':
          SelectedCompetition.GotoCompetition(CompetitionNav.GAMES);
          break;
        case 'overlay':
          setIsModalOpen(false);
          break;

        default:
          break;
      }
    };

    // console.log('fRecommendations', fRecommendations);
    let gameObj = {};
    if (fRecommendations.length === 1) {
      const [item] = fRecommendations;
      if (is_hide_card && item?.is_passed) return null;
      // gameObj = GetObjFromArr(games, 'game_id', item.type);
      // console.log(gameObj);
      // console.log(item, 'item');

      const subjectStyle = getSubjectStyle(item, userID, competition_id, item.content_id, 1);
      const gameContentType = getGameContentType(item);
      let buttonText = item.type.toLowerCase().search('video') === -1 ? texts.PLAY : texts.WATCH;
      if (item.type.toLowerCase() === 'link') {
        buttonText = texts.OPEN;
      }
      // to show card image from competition data if passed
      const imageToShow =
        item.module_image && (item.module_image.indexOf('http') > -1 ? item.module_image : config.webUrl + item.module_image);
      // Decide whether to show subject, game or nothing in card - 19 Competition: McDonalds' KOTG 2021/22
      const firstPortion = is_mcd ? '' : item.subject;
      const secondPortion = is_module_name_visible ? gameObj?.alias : '';
      const joiningPortion = is_mcd || !is_module_name_visible ? '' : '|';
      const chipContent = `${firstPortion} ${joiningPortion} ${secondPortion}`;
      const thirdChip = { name: false };

      if (item.subcategory && item.subcategory?.toLowerCase().trim() === 'bonus') thirdChip.name = '2x Bonus';
      else if (item.subcategory && item.subcategory?.toLowerCase().trim() === 'beginner') thirdChip.name = 'Beginner';
      else if (item.subcategory && item.subcategory?.toLowerCase().trim() === 'intermediate') thirdChip.name = 'Intermediate';
      else if (item.subcategory && item.subcategory?.toLowerCase().trim() === 'advanced') thirdChip.name = 'Advanced';

      return (
        <>
          <ModalBox
            ADD_CODE
            hideCross
            isVisible={isModalOpen}
            allowClose={true}
            callback={handleModal}
            fullWidth
            maxWidth="920px"
            title_bg="#02BBFE"
            addCodeIcon={IMAGES.LOCK_MODAL_ICON}
            // className={styled.modal_container}
            title={texts.LOCKED_CONTENT}
          >
            <Box textAlign="center" paddingBottom={'19px'}>
              <H4
                styleCSS={{
                  fontSize: '24px',
                  padding: '10px',
                  fontWeight: '600',
                  color: '#313644',
                  textAlign: 'center',
                  marginTop: '33px',
                }}
              >
                {isShupavu ? texts.RESUBSCRIBE_AGAIN : texts.RECOMMENDATIONS_COMPLETED}
              </H4>

              <div
                style={{
                  maxWidth: isShupavu ? '550px' : '560px',
                  paddingLeft: '0.5rem',
                  paddingRight: '0.5rem',
                }}
              >
                <Body1>{isShupavu ? texts.COME_BACK_TOMMOROW : locked_messages?.daily?.eng || texts.COME_BACK_SOON}</Body1>
              </div>
              <div style={{ width: '320px', margin: '40px auto 0' }}>
                <ButtonBold bgBlue yellowBubble secondaryYellow tag={'play-again'} onClick={handleModal}>
                  Play Again
                </ButtonBold>
              </div>
            </Box>
          </ModalBox>
          <Grid container>
            <Box margin="auto">
              <GameCard
                item={{
                  ...item,
                  id: item.content_id,
                  buttonTitle: buttonText,
                  // to show card image from competition data if passed else show the one being passed from local data
                  image: item.module_image ? imageToShow : gameObj.image_url,
                  tag: CHALLENGE_TAGS.RECOMMENDED_GAME,
                }}
                thirdChip={thirdChip.name}
                chip={IsMcdUser ? chipContent : false}
                callback={callback}
                noButton
                subjectStyle={subjectStyle}
                gameContentType={gameContentType}
                isRecommendationCard={otherSubjects?.length > 1 ? true : false}
                isPocketGames={isPocketGames}
                competition={competition}
              />
            </Box>
          </Grid>
        </>
      );
    }
    let numberToReduceForLabel = 0;
    const UI = fRecommendations.map((item, index) => {
      if (is_hide_card && item?.is_passed) {
        numberToReduceForLabel += 1;
        return null;
      }
      // gameObj = GetObjFromArr(games, 'game_id', item.type);
      // if (!gameObj || IsEmptyObject(gameObj)) return null;

      // to show card image from competition data if passed
      // console.log(item, 'item');
      const subjectStyle = getSubjectStyle(item, userID, competition_id, item.content_id, index);
      const gameContentType = getGameContentType(item);
      // console.log('##################subjectStyle', subjectStyle);
      const imageToShow =
        item.module_image && (item.module_image.indexOf('http') > -1 ? item.module_image : config.webUrl + item.module_image);

      const secondChip = is_lesson_based && item?.is_passed === 1;
      const chip = is_lesson_based ? index + 1 - numberToReduceForLabel : item.subject;
      const secondPortion = is_module_name_visible ? gameObj?.alias : '';
      const joiningPortion = !is_module_name_visible ? '' : '|';
      const chipContent = `${chip} ${joiningPortion} ${secondPortion}`;
      let buttonText = item.type.toLowerCase().search('video') === -1 ? texts.PLAY : texts.WATCH;
      if (item.type.toLowerCase() === 'link') {
        buttonText = texts.OPEN;
      }
      const thirdChip = { name: false };
      if (item.subcategory && item.subcategory?.toLowerCase().trim() === 'bonus') thirdChip.name = '2x Bonus';
      else if (item.subcategory && item.subcategory?.toLowerCase().trim() === 'beginner') thirdChip.name = 'Beginner';
      else if (item.subcategory && item.subcategory?.toLowerCase().trim() === 'intermediate') thirdChip.name = 'Intermediate';
      else if (item.subcategory && item.subcategory?.toLowerCase().trim() === 'advanced') thirdChip.name = 'Advanced';

      // gameDispatch(CHALLENGE.SET_SUBJECT, recommendations[0]);

      return (
        <>
          <ModalBox
            ADD_CODE
            hideCross
            isVisible={isModalOpen}
            allowClose={true}
            callback={handleModal}
            fullWidth
            maxWidth="920px"
            title_bg="#02BBFE"
            addCodeIcon={IMAGES.LOCK_MODAL_ICON}
            // className={styled.modal_container}
            title={texts.LOCKED_CONTENT}
          >
            <Box textAlign="center" paddingBottom={'19px'}>
              <H4
                styleCSS={{
                  fontSize: '24px',
                  padding: '10px',
                  fontWeight: '600',
                  color: '#313644',
                  textAlign: 'center',
                  marginTop: '33px',
                }}
              >
                {isShupavu ? texts.RESUBSCRIBE_AGAIN : texts.RECOMMENDATIONS_COMPLETED}
              </H4>
              <div
                style={{
                  maxWidth: isShupavu ? '550px' : '560px',
                  paddingLeft: '0.5rem',
                  paddingRight: '0.5rem',
                }}
              >
                <Body1>{isShupavu ? texts.COME_BACK_TOMMOROW : locked_messages?.daily?.eng || texts.COME_BACK_SOON}</Body1>
              </div>
              <div style={{ width: '320px', margin: '40px auto 0' }}>
                <ButtonBold bgBlue yellowBubble secondaryYellow tag={'play-again'} onClick={handleModal}>
                  Play Again
                </ButtonBold>
              </div>
            </Box>
          </ModalBox>
          <RailItem key={item.content_id}>
            <GameCard
              item={{
                ...item,
                id: item.content_id,
                buttonTitle: buttonText,
                // to show card image from competition data if passed else show the one being passed from local data
                image: item.module_image ? imageToShow : gameObj.image_url,
                tag: CHALLENGE_TAGS.RECOMMENDED_GAME,
              }}
              chip={chipContent}
              secondChip={secondChip || false}
              thirdChip={thirdChip.name}
              callback={callback}
              noButton
              subjectStyle={subjectStyle}
              gameContentType={gameContentType}
              isRecommendationCard={otherSubjects?.length > 1 ? true : false}
              isPocketGames={isPocketGames}
              competition={competition}
            />
          </RailItem>
        </>
      );
    });

    return <Rail>{UI}</Rail>;
  }
);
