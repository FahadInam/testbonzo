import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { API_CALLS, PAGE_STATE, STORAGE_KEYS } from 'Constants';
import { SimpleResContainer } from 'Components/Layouts/ResponsiveGrid';
import { LocalStorage, RemoveDuplicates } from 'Utils';
import { PerPageLoader } from 'Components/Loader/PerPageLoader';
import PageTitle from 'Components/Core/PageTitle';
import competitions_icon from 'Assets/images/bonzoui/headings/topics.png';
import { FlexibleView, SlidableView, Header, NoDataFound } from 'Components';
import { GetCompetitionDetails, GetCompetitionsLessons, SelectedCompetition, User } from 'Actions';
import { LessonListingGames, SingleSubjectGamesLoader } from './LocalComponents';
import useStyles from './style';
import { useTheme } from '@material-ui/core';
import { gameDispatch } from 'Utils/ActionCreators';

const LessonListing = React.memo(({ competition, isOnlyCompetition }) => {
  const styled = useStyles();

  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI = null;
  let PreLoader = null;
  const user = User.Info();
  const { texts } = useTheme();
  const Topic = JSON.parse(LocalStorage.Get(STORAGE_KEYS.TOPIC_SELECTED));
  let AllTopics = [];
  const dispatch = useDispatch();
  // const [callRef, setCallRef] = useState({ sent: false });
  const [scrollNode, setScrollNode] = useState(undefined);
  const pageData = useSelector((state) => state.GetCompetitionsLessons, shallowEqual);
  const recData = useSelector((state) => state.GetRecommendations, shallowEqual);
  const CompDetails = useSelector((state) => state.GetCompetitionDetails, shallowEqual);

  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  const IsDirectLaunch = useSelector((state) => state.DirectLaunch.directLaunch_user, shallowEqual);
  const currentComp = SelectedCompetition.Info();
  const competitionStr = useSelector((state) => state.Competition, shallowEqual);
  const selectedComp = SelectedCompetition.StrToObj(competitionStr);
  const [firstCall, setFirstCall] = useState(false);
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/');
  const currenetName = pathSegments[2];

  useEffect(() => {
    if (selectedComp && selectedComp?.item?.url !== currenetName && !firstCall) {
      gameDispatch(API_CALLS.GetCompetitionDetails.CLEAR);
      gameDispatch(API_CALLS.GetRecommendations.CLEAR);
      setFirstCall(true);
    } else if (firstCall) {
      gameDispatch(API_CALLS.GetCompetitionsLessons.CLEAR);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstCall]);

  const loadComDetailData = useCallback(() => {
    dispatch(GetCompetitionDetails(currentComp?.item?.enrolled, competition.competition_id));
  }, [dispatch, currentComp, competition]);

  useEffect(() => {
    if (!CompDetails) {
      loadComDetailData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CompDetails]);

  const loadData = useCallback(() => {
    dispatch(GetCompetitionsLessons(competition, CompDetails));
  }, [dispatch, competition, CompDetails]);

  // console.log('pageData', pageData);
  if (!pageData) {
    PageState = PAGE_STATE.IS_LOADING;
    PreLoader = [
      { id: 0, list: [{ id: 0 }, { id: 1 }, { id: 2 }] },
      { id: 1, list: [{ id: 0 }, { id: 1 }, { id: 2 }] },
      { id: 2, list: [{ id: 0 }, { id: 1 }, { id: 2 }] },
    ].map((item) => {
      return <SingleSubjectGamesLoader item={item} key={item.id} />;
    });
    PageUI = <PerPageLoader PageState={PageState}>{PreLoader}</PerPageLoader>;
  } else if (pageData.shouldRetry) {
    PageState = PAGE_STATE.RETRY;
    PageUI = <PerPageLoader PageState={PageState} />;
  } else if (pageData.length === 0) {
    PageState = PAGE_STATE.NO_DATA_TO_SHOW;
    PageUI = <NoDataFound />;
  } else {
    PageState = PAGE_STATE.LOADED;
    AllTopics = RemoveDuplicates(pageData, 'topic');
    const fTopics = pageData.filter((obj) => {
      //console.log('pageData', obj.topic, Topic.Topic);
      return obj.topic === Topic.Topic;
    });

    PageUI = (
      <LessonListingGames
        list={fTopics}
        recommendations={recData}
        currentGrade={CompDetails?.current_grade}
        competition={competition}
        TopicNo={Topic?.TopicNo}
        IsMcdUser={IsMcdUser}
        userID={user.user_id}
      />
    );
  }

  useEffect(() => {
    if (!pageData && CompDetails) {
      loadData();
      // setCallRef({ sent: true });
    } else {
      const moduleData = JSON.parse(LocalStorage.Get(STORAGE_KEYS.MODULE_SELECTED, null));
      if (moduleData?.data?.isCalledFromLessons) {
        const cId = moduleData?.data?.content_id;
        // console.log('focusing over cid: ', cId);
        // eslint-disable-next-line no-unused-expressions
        document.getElementsByClassName(`cid-${cId}`)[0]?.focus({ preventScroll: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData, CompDetails]);

  return (
    <SlidableView showGradient>
      <Header
        isOnlyCompetition
        scrollNode={scrollNode}
        singleTopicPlan={AllTopics.length === 1}
        headerSet={{
          showRight: true,
          showLeft: (AllTopics.length === 1 && IsMcdUser) || IsDirectLaunch ? false : true,
          overrideLeftButton: false,
          notify: true,
          showFloatingFAQ: true,
        }}
      />
      <FlexibleView
        ref={(node) => {
          if (node) {
            setScrollNode(node);
          }
        }}
      >
        <div className={styled.LessonListingMainHeading}>
          <PageTitle logo={competitions_icon} name={texts.LESSON} />
        </div>
        <SimpleResContainer>{PageUI}</SimpleResContainer>
      </FlexibleView>
    </SlidableView>
  );
});

export default LessonListing;
