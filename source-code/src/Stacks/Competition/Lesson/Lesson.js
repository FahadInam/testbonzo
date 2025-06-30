/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTheme, Box, Grid } from '@material-ui/core';
import { FlexibleView, SlidableView, Header, NoDataFound, Paper, H3, WriteString } from 'Components';
import { API_CALLS, PAGE_STATE, STORAGE_KEYS } from 'Constants';
import TopicsIcon from 'Assets/images/bonzoui/tabicons/topics.svg';
import { GetCompetitionDetails, GetCompetitionsLessons, SelectedCompetition } from 'Actions';
import PageTitle from 'Components/Core/PageTitle';
import competitions_icon from 'Assets/images/bonzoui/headings/lessons.png';
import ResContainer from 'Components/Layouts/ResponsiveGrid';
import { LocalStorage, RemoveDuplicates } from 'Utils';
import { PerPageLoader } from 'Components/Loader/PerPageLoader';
import { PageSwitch } from 'Navigation';
import { CompetitionNav } from 'Navigation/Paths';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  OneListPrimaryTextLoader,
  OneAvatarWithPositionLoader,
  OneAvatarWithPosition,
  OneListLessonTitleText,
} from './LocalComponents';
import ListBox, { OneListItem, OneListItemLoader } from '../shared/ListBox';
import useStyles from './style';
import { gameDispatch } from 'Utils/ActionCreators';

const Lesson = React.memo(({ competition, isOnlyCompetition }) => {
  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI = null;
  let PreLoader = null;
  // const user = User.Info();
  let list = [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let fTopics = [];
  const styled = useStyles();
  const dispatch = useDispatch();
  const { texts } = useTheme();
  // const [callRef, setCallRef] = useState({ sent: false });
  const [topicOnly, setTopicOnly] = useState(false);
  const [scrollNode, setScrollNode] = useState(undefined);
  const pageData = useSelector((state) => state.GetCompetitionsLessons, shallowEqual);
  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  const IsAdLogin = useSelector((state) => state.AdLoginUser.adLogin_user, shallowEqual);
  const IsDirectLaunch = useSelector((state) => state.DirectLaunch.directLaunch_user, shallowEqual);
  const CompDetails = useSelector((state) => state.GetCompetitionDetails, shallowEqual);
  const currentComp = SelectedCompetition.Info();

  const competitionStr = useSelector((state) => state.Competition, shallowEqual);
  const selectedComp = SelectedCompetition.StrToObj(competitionStr);
  const [firstCall, setFirstCall] = useState(false);
  const [lessonCall, setLessonCall] = useState(false);
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
      setLessonCall(true);
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

  const callback = (e, item) => {
    const t = e.currentTarget.getAttribute('data-tag') || item.tag;
    const tag = item && item.tag;
    switch (tag || t) {
      case 'topic':
        LocalStorage.Set(STORAGE_KEYS.TOPIC_SELECTED, { Topic: item?.topic, TopicNo: item?.topicNo });
        // console.log('{ Topic: item?.topic, TopicNo: item?.topicNo }: ', { Topic: item?.topic, TopicNo: item?.topicNo });
        PageSwitch(CompetitionNav.LESSON_LISTING);
        break;
      default:
        break;
    }
  };

  if (!pageData) {
    PageState = PAGE_STATE.IS_LOADING;
    list = [0, 1, 2, 3, 4, 5].map((item) => {
      return <OneListItemLoader avatar={<OneAvatarWithPositionLoader />} primary={<OneListPrimaryTextLoader />} key={item} />;
    });
    PreLoader = (
      <>
        <Box pb={2} pl={1} mb={1}>
          <Skeleton variant="rect" width="65%" height="48px" className={styled.skeleton} />
        </Box>
        <Grid item xs={12}>
          <ListBox
            title={texts.TOPICS}
            icon={<img src={TopicsIcon} width="42" height="42" border="0" alt={texts.TOPICS} />}
            items={list}
            noResponsive
          />
        </Grid>
      </>
    );
    PageUI = <PerPageLoader PageState={PageState}>{PreLoader}</PerPageLoader>;
  } else if (pageData.shouldRetry) {
    PageState = PAGE_STATE.RETRY;
    PageUI = <PerPageLoader PageState={PageState} />;
  } else if (pageData.length === 0) {
    PageState = PAGE_STATE.NO_DATA_TO_SHOW;
    PageUI = <NoDataFound />;
  } else {
    PageState = PAGE_STATE.LOADED;
    fTopics = RemoveDuplicates(pageData, 'topic');
    const fetchedTopicData = fTopics.map((item, index) => {
      // console.log('item: ', item);
      for (let i = 0; i < pageData.length; i++) {
        if (pageData[i].topic === item.topic && pageData[i].is_passed !== 1) return [index + 1, false];
      }
      // console.log('item passed at  ', index);
      return [index + 1, true];
    });

    // setTopicOnly(fTopics.length);
    const title = pageData[0]?.subject;
    PageUI = '';
    // console.log(fetchedTopicData);
    const TopicsListing = fTopics.map((item, index) => {
      return (
        <OneListItem
          className={styled.container_each_lesson}
          endIcon={<i className="i i-play_button_invert" style={{ color: '#d5d4d4', fontSize: '1.2rem', lineHeight: '1.5rem' }} />}
          item={{
            ...item,
            listResultStatus: fetchedTopicData,
            primary: (
              <OneListLessonTitleText
                name={<Box className={styled.name}>{item.topic}</Box>}
                isCompleted={fetchedTopicData[index][1]}
              />
            ),
            avatar: <OneAvatarWithPosition position={index + 1} avatar={item.profile_picture || '17'} />,
            tag: 'topic',
            topicNo: index + 1,
          }}
          noButton
          noResponsive
          callback={callback}
          key={index + 1}
        />
      );
    });
    PageUI = (
      <>
        <Grid item xs={12}>
          <Paper maxWidth="100%" className="semi___title" m={0} mb={2} pt={1.5} pb={1.5} pl={6} pr={6} elevation={0}>
            <H3 textAlign="center" m={0}>
              <WriteString text={title} />
            </H3>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <ListBox
            noResponsive
            title={texts.SUBJECTS}
            icon={<img src={TopicsIcon} width="42" height="42" border="0" alt={texts.TOPICS} />}
            items={TopicsListing}
          />
        </Grid>
      </>
    );
  }

  useEffect(() => {
    if (!pageData && CompDetails) {
      loadData();
    }
    // setCallRef({ sent: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData, CompDetails]);

  useEffect(() => {
    if (fTopics.length === 1 && !topicOnly) {
      setTopicOnly(true);
      LocalStorage.Set(STORAGE_KEYS.TOPIC_SELECTED, { Topic: fTopics[0].topic, TopicNo: 1 });
      //  console.log('{ Topic: fTopics[0].topic, TopicNo: 1 }: ', { Topic: fTopics[0].topic, TopicNo: 1 });
      //   gameDispatch(API_CALLS.GetCompetitionsLessons.CLEAR);
      if (lessonCall || selectedComp?.item?.url === currenetName) {
        PageSwitch(CompetitionNav.LESSON_LISTING);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fTopics, topicOnly, lessonCall]);

  // const backButtonCallback = () => {
  //   SelectedCompetition.GotoCompetition();
  // }

  return (
    <SlidableView showGradient>
      <Header
        isOnlyCompetition
        scrollNode={scrollNode}
        headerSet={{
          showRight: true,
          showLeft: IsMcdUser || IsAdLogin || IsDirectLaunch ? false : true,
          overrideLeftButton: true,
          notify: true,
          showFloatingFAQ: true,
          // leftTitle: competition.name,
          // callback: backButtonCallback,
        }}
      />
      <FlexibleView
        ref={(node) => {
          if (node) {
            setScrollNode(node);
          }
        }}
      >
        <PageTitle logo={competitions_icon} name={texts.LESSON} />
        <ResContainer>{PageUI}</ResContainer>
      </FlexibleView>
    </SlidableView>
  );
});

export default Lesson;
