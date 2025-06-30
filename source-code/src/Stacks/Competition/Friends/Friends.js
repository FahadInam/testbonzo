import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Box, useTheme, IconButton } from '@material-ui/core';
import { API_CALLS, IMAGES, PAGE_STATE } from 'Constants';
import {
  GetCompetitionDetails,
  GetCompetitionsFriends,
  GetRecommendations,
  GoToVsScreen,
  SelectedCompetition,
  StartChallenge,
} from 'Actions';
import { Body2, FlexibleView, SlidableView, Header, NoDataFound, ModalBox, H4, Body1 } from 'Components';
import { PerPageLoader } from 'Components/Loader/PerPageLoader';
import PageTitle from 'Components/Core/PageTitle';
import competitions_icon from 'Assets/images/bonzoui/headings/friends.png';
import ResContainer from 'Components/Layouts/ResponsiveGrid';
import { gameDispatch } from 'Utils/ActionCreators';
import { CHALLENGE, CHALLENGE_TAGS } from 'Constants/challenge.constants';
// import { PageSwitch } from 'Navigation';
import { ChallengeNav, CompetitionNav } from 'Navigation/Paths';
import { UsernameResolver, encodeDecode } from 'Utils';
import InviteIcon from 'Assets/images/bonzoui/invite.svg';

import User from 'Actions/user.action';
import { FromNotification } from 'Actions/app.control.action';
import ShareDialogue from 'Components/ShareDialogue';
import { gradeStrResolver } from 'Components/Stats';
import { OneListItem, OneListItemLoader } from '../shared/ListBox';
import FriendsStructure from './FriendsStructure';
import TwoIcons from './LocalComponents';
import useStyles from './style';
import { PageSwitch } from 'Navigation';

import challengeIcon from 'Assets/images/bonzoui/tabicons/challenge.svg';
import ButtonBold from 'Components/Core/ButtonBold';

const Friends = React.memo(({ competition, isOnlyCompetition }) => {
  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI = null;
  let PreLoader = null;
  const [shareLink, setShareLink] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = User.Info();
  const number = encodeDecode('enc', `${user.user_id}`);
  const styled = useStyles();
  // const [callRef, setCallRef] = useState({ sent: false });
  const dispatch = useDispatch();
  const { texts, palette } = useTheme();
  const [scrollNode, setScrollNode] = useState(undefined);
  const [initial, setInitial] = useState(true);

  const pageData = useSelector((state) => state.GetCompetitionsFriends, shallowEqual);
  const competitionDetails = useSelector((state) => state.GetCompetitionDetails, shallowEqual);
  //Call 3
  const recData = useSelector((state) => state.GetRecommendations, shallowEqual);

  const FromNotify = useSelector((state) => state.AppControl.fromNotification, shallowEqual);
  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  const NotifyTo = useSelector((state) => state.AppControl.notifyTo, shallowEqual);
  const IsDirectLaunch = useSelector((state) => state.DirectLaunch.directLaunch_user, shallowEqual);
  const NotifyGoto = document.getElementById(NotifyTo);
  const currentComp = SelectedCompetition.Info();
  const competitionStr = useSelector((state) => state.Competition, shallowEqual);
  const selectedComp = SelectedCompetition.StrToObj(competitionStr);
  const [firstCall, setFirstCall] = useState(false);
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/');
  const currenetName = pathSegments[2];

  const MAX_LIST_ITEMS = 18;

  useEffect(() => {
    if (selectedComp && selectedComp?.item?.url !== currenetName && !firstCall) {
      gameDispatch(API_CALLS.GetCompetitionDetails.CLEAR);
      gameDispatch(API_CALLS.GetCompetitionsFriends.CLEAR);
      gameDispatch(API_CALLS.GetRecommendations.CLEAR);
      setFirstCall(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (FromNotify && NotifyGoto) {
      NotifyGoto.scrollIntoView({ x: 0, y: 0, block: 'start', behavior: 'smooth' });
      FromNotification.NotifyFalse();
    }
  }, [FromNotify, NotifyGoto]);

  const loadComDetailData = useCallback(() => {
    dispatch(GetCompetitionDetails(currentComp?.item?.enrolled, competition.competition_id));
  }, [dispatch, currentComp, competition]);

  useEffect(() => {
    if (!competitionDetails) {
      loadComDetailData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [competitionDetails]);

  const loadData = useCallback(() => {
    const competitionId = competition.competition_id;
    const currentGrade = competitionDetails?.current_grade;
    dispatch(GetCompetitionsFriends({ competition_id: competitionId, current_grade: currentGrade }));
  }, [dispatch, competition, competitionDetails]);

  useEffect(() => {
    if (pageData && initial) {
      setInitial(false);
      if (pageData.search) {
        delete pageData.search;
      }
    }
  }, [pageData, initial]);

  // Call 3

  const loadRecData = useCallback(() => {
    dispatch(
      GetRecommendations(
        { competition_id: competition?.competition_id, current_grade: competitionDetails?.current_grade },
        false,
        true
      )
    );
  }, [dispatch, competition, competitionDetails]);
  // load recommendations

  useEffect(() => {
    if (pageData && competitionDetails && !recData) {
      loadRecData();
    }
  }, [pageData, loadRecData, recData, competitionDetails]);

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

  const ShareLinkUrl = `account/sign-up?friends_id=${number}`;
  const ShareLinkUrlSh = `account/sign-up?friends_id=${number}&role=learner`;

  const callback = (e, item) => {
    // console.log('item', item);
    const t = e.currentTarget.getAttribute('data-tag');
    switch (t) {
      case 'message':
        SelectedCompetition.GotoCompetition(CompetitionNav.CHAT, item, false);
        break;
      case 'share-btn':
        setShareLink(true);
        break;
      default:
        // console.log(item);

        if (selectedComp?.item?.is_daily_learning && recData[0]?.is_locked) {
          console.log(selectedComp, recData[0]?.is_locked, 'tere here');
          setIsModalOpen(true);
          return;
        }
        if (recData.length > 1) {
          gameDispatch(CHALLENGE.SET_OPPONENT, item);
          PageSwitch(ChallengeNav.CHALLENGE_SELECTION, { from: CompetitionNav.FRIENDS });
        } else {
          // console.log('GO FROM HERE 355', competition, item, recData)
          dispatch(
            StartChallenge(
              competition,
              item,
              recData[0],
              () => {
                dispatch(
                  GoToVsScreen(
                    item,
                    {
                      ...recData[0],
                      subject: recData[0].subject,
                      is_game: true,
                      content_id: recData[0].content_id,
                    },
                    recData,
                    texts,
                    competition
                  )
                );
              },
              competitionDetails?.current_grade,
              IsMcdUser
            )
          );
        }
        // PageSwitch(ChallengeNav.CHALLENGE_SELECTION, { from: CompetitionNav.FRIENDS });
        break;
    }
  };

  if (!pageData) {
    PageState = PAGE_STATE.IS_LOADING;

    const existingUI = [0, 1, 2, 3, 4, 5].map((item) => {
      return <OneListItemLoader endIcon secondary key={item} />;
    });

    const recommendedUI = [0, 1, 2, 3, 4, 5].map((item) => {
      return <OneListItemLoader endIcon key={item} />;
    });

    PreLoader = <FriendsStructure recommended={recommendedUI} existing={existingUI} />;
    PageUI = <PerPageLoader PageState={PageState}>{PreLoader}</PerPageLoader>;
  } else if (pageData.shouldRetry) {
    PageState = PAGE_STATE.RETRY;
    PageUI = <PerPageLoader PageState={PageState} />;
  } else if (pageData.length === 0) {
    PageState = PAGE_STATE.NO_DATA_TO_SHOW;
    PageUI = <NoDataFound />;
  } else {
    PageState = PAGE_STATE.LOADED;
    const { users, recommendations, search } = pageData;
    let existingUI = null;
    let recommendedUI = null;
    let searchUI = null;
    let isSearch = false;
    // console.log('competition: ', competition);
    if (users.length > 0) {
      // console.log('USERS', users);
      existingUI = users.slice(0, MAX_LIST_ITEMS).map((item) => {
        return (
          <OneListItem
            key={item.user_id}
            noButton={!item.is_same_grade}
            item={{
              ...item,
              primary: (
                <Box textOverflow="ellipsis" overflow="hidden">
                  {UsernameResolver(item.name, item.username)}
                </Box>
              ),
              secondary: item.username,
              avatar: item.profile_picture,
              tag: CHALLENGE_TAGS.SET_OPPONENT,
            }}
            // TODO language review
            secondary={
              !item.is_same_grade ? (
                <Body2 color={palette.secondary.light}>
                  {gradeStrResolver('Different grade'.replace('grade', competition.grade_label || 'grade'), competition)}
                </Body2>
              ) : (
                item.username
              )
            }
            endIcon={!!item.is_same_grade && <TwoIcons item={item} callback={callback} />}
            towAction={!!item.is_same_grade}
            callback={!!item.is_same_grade && callback}
          />
        );
      });
    }

    if (recommendations.length > 0) {
      recommendedUI = recommendations.slice(0, MAX_LIST_ITEMS).map((item) => {
        return (
          <OneListItem
            key={item.user_id}
            item={{
              ...item,
              primary: (
                <Box textOverflow="ellipsis" overflow="hidden">
                  {UsernameResolver(item.name, item.username)}
                </Box>
              ),
              avatar: item.profile_picture,
              tag: CHALLENGE_TAGS.SET_OPPONENT,
            }}
            // secondary={<Body2 color={palette.common.blue}>{`Level ${item.rank}`}</Body2>} //  {item.username}
            //endIcon="play_button_invert"
            endIcon={
              <img
                src={challengeIcon}
                width="20"
                height="20"
                border="0"
                alt="reject"
                style={{ padding: '1px', marginRight: '10px' }}
              />
            }
            callback={callback}
            noButtonIcon
          />
        );
      });
    }

    if (search) {
      isSearch = true;
      recommendedUI = null;
      existingUI = null;
      let icon = null;
      if (search.users.length > 0) {
        searchUI = search.users.slice(0, MAX_LIST_ITEMS).map((item) => {
          icon = <TwoIcons item={item} callback={callback} />;
          if (!item.is_same_grade) icon = null;
          if (!!item.is_same_grade && !item.is_friend) icon = 'play_button_invert';
          return (
            <OneListItem
              key={item.user_id}
              noButton={!item.is_same_grade}
              item={{
                ...item,
                primary: (
                  <Box textOverflow="ellipsis" overflow="hidden">
                    {UsernameResolver(item.name, item.username)}
                  </Box>
                ),
                avatar: item.profile_picture,
                tag: CHALLENGE_TAGS.SET_OPPONENT,
              }}
              // TODO language review
              secondary={
                !item.is_same_grade ? (
                  <Body2 color={palette.secondary.light}>
                    {gradeStrResolver('Different grade'.replace('grade', competition.grade_label || 'grade'), competition)}
                  </Body2>
                ) : (
                  item.username
                )
              }
              endIcon={icon}
              towAction={!!item.is_same_grade}
              callback={!!item.is_same_grade && callback}
            />
          );
        });
      }
    }

    PageUI = (
      <FriendsStructure
        recommended={recommendedUI}
        existing={existingUI}
        competition={competition}
        competitionDetails={competitionDetails}
        search={searchUI}
        isSearch={isSearch}
        loaded
      />
    );
  }

  useEffect(() => {
    if (!pageData && competitionDetails) {
      loadData();
    }
    // setCallRef({ sent: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData, competitionDetails]);

  // TODO
  const SecondaryButtons = !IsMcdUser && (
    <Box ml={1}>
      <IconButton data-tag="share-btn" onClick={callback} className={`${styled.iconBtn} ${styled.inviteBtn}`}>
        {/* <i className="i i-invite" /> */}
        <img src={InviteIcon} alt={texts.INVITE_YOUR_FRIENDS} className="" style={{ width: '18px', height: '18px' }} />
      </IconButton>
    </Box>
  );

  // const backButtonCallback = () => {
  //   SelectedCompetition.GotoCompetition();
  // };

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
            {texts.FRIEND_LOCKED}
          </H4>
          <div>
            <Body1>{texts.FRIEND_LOCKED_DESCRIPTION}</Body1>
          </div>
          <div style={{ width: '320px', margin: '40px auto 0' }}>
            <ButtonBold bgBlue yellowBubble secondaryYellow tag={'play-again'} onClick={handleModal}>
              Play Again
            </ButtonBold>
          </div>
        </Box>
      </ModalBox>
      <ShareDialogue
        isVisible={shareLink}
        Callback={(v) => {
          setShareLink(v);
        }}
        title={texts.INVITE_YOUR_FRIENDS}
        subTitle={texts.COMPETE_FRIENDS}
        textToShare={ShareLinkUrl}
        textToShareSh={ShareLinkUrlSh}
      />

      <SlidableView showGradient>
        <Header
          isOnlyCompetition
          scrollNode={scrollNode}
          headerSet={{
            showRight: true,
            showLeft: IsMcdUser || IsDirectLaunch ? false : true,
            overrideLeftButton: true,
            notify: true,
            SecondaryButtons,
            showFloatingFAQ: true,
            //leftTitle: competition.name,
            //callback: backButtonCallback,
          }}
        />
        <FlexibleView
          ref={(node) => {
            if (node) {
              setScrollNode(node);
            }
          }}
        >
          {/* {name} */}
          <PageTitle logo={competitions_icon} name={texts.FRIENDS} />
          {/* <H1>{texts.FRIENDS}</H1> */}
          <ResContainer>{PageUI}</ResContainer>
        </FlexibleView>
      </SlidableView>
    </>
  );
});

export default Friends;
