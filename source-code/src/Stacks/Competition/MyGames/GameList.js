import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { API_CALLS, PAGE_STATE } from 'Constants';
import { RemoveDuplicates } from 'Utils';
import { PerPageLoader } from 'Components/Loader/PerPageLoader';
import PageTitle from 'Components/Core/PageTitle';
import competitions_icon from 'Assets/images/bonzoui/headings/topics.png';
import { FlexibleView, SlidableView, Header, NoDataFound } from 'Components';
import { GetCompetitionDetails, GetCompetitionsGames, SelectedCompetition, User } from 'Actions';
import { LessonListingGames, SingleSubjectGamesLoader } from './LocalComponents';
import useStyles from './style';
import { useTheme } from '@material-ui/core';
import { gameDispatch } from 'Utils/ActionCreators';
import { BarLoader } from 'Components/Loader/dotLoader';
import ResContainer from 'Components/Layouts/ResponsiveGrid';

const GameList = React.memo(({ competition, isOnlyCompetition }) => {
  const styled = useStyles();

  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI = null;
  let PreLoader = null;
  const user = User.Info();
  const { texts } = useTheme();
  let AllTopics = [];
  const dispatch = useDispatch();
  const [scrollNode, setScrollNode] = useState(undefined);
  const pageData = useSelector((state) => state.GetCompetitionsGames, shallowEqual);
  const recData = useSelector((state) => state.GetRecommendations, shallowEqual);
  const CompDetails = useSelector((state) => state.GetCompetitionDetails, shallowEqual);
  const [gamesData, setGamesData] = useState([]);
  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  const IsDirectLaunch = useSelector((state) => state.DirectLaunch.directLaunch_user, shallowEqual);
  const currentComp = SelectedCompetition.Info();
  const competitionStr = useSelector((state) => state.Competition, shallowEqual);
  const selectedComp = SelectedCompetition.StrToObj(competitionStr);
  const [firstCall, setFirstCall] = useState(false);
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/');
  const currenetName = pathSegments[2];
  const loaderRef = useRef();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    if (scrollNode) {
      setIsVisible(scrollNode.scrollTop > 300); // Show button after scrolling 300px
    }
  }, [scrollNode]);

  useEffect(() => {
    if (!scrollNode) return;

    scrollNode.addEventListener('scroll', handleScroll);
    return () => scrollNode.removeEventListener('scroll', handleScroll);
  }, [scrollNode, handleScroll]);

  const scrollToTop = useCallback(() => {
    if (scrollNode) {
      scrollNode.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [scrollNode]);

  const setScrollNodeRef = useCallback((node) => {
    if (node) {
      setScrollNode(node);
    }
  }, []);

  useEffect(() => {
    if (selectedComp && selectedComp?.item?.url !== currenetName && !firstCall) {
      gameDispatch(API_CALLS.GetCompetitionDetails.CLEAR);
      gameDispatch(API_CALLS.GetRecommendations.CLEAR);
      setFirstCall(true);
    } else if (firstCall) {
      gameDispatch(API_CALLS.GetCompetitionsGames.CLEAR);
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
    setLoading(true);
    dispatch(
      GetCompetitionsGames(competition, CompDetails, { page }, (data) => {
        if (data?.data?.length > 0) setGamesData((prev) => [...prev, ...data?.data]);
        setLoading(false);
      })
    );
    setPage((prev) => prev + 1);
  }, [dispatch, competition, CompDetails, page]);

  useEffect(() => {
    const loaderNode = loaderRef.current;
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        // call next page
        if (pageData?.total_pages + 1 > page) {
          loadData();
        }
      }
    });
    if (loaderNode) {
      observer.observe(loaderNode);
    }
    return () => {
      if (loaderNode) {
        observer.unobserve(loaderNode);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamesData, pageData]);

  if (!pageData || ((pageData?.data?.length === 0 || pageData?.data?.length > 0) && gamesData.length === 0 && loading)) {
    PageState = PAGE_STATE.IS_LOADING;
    PreLoader = [
      { id: 0, list: [{ id: 0 }, { id: 1 }, { id: 2 }] },
      { id: 1, list: [{ id: 0 }, { id: 1 }, { id: 2 }] },
      { id: 2, list: [{ id: 0 }, { id: 1 }, { id: 2 }] },
    ].map((item) => {
      return <SingleSubjectGamesLoader item={item} key={item.id} />;
    });
    PageUI = <PerPageLoader PageState={PageState}>{PreLoader}</PerPageLoader>;
  } else if (gamesData.shouldRetry) {
    PageState = PAGE_STATE.RETRY;
    PageUI = <PerPageLoader PageState={PageState} />;
  } else if (gamesData.length === 0) {
    PageState = PAGE_STATE.NO_DATA_TO_SHOW;
    PageUI = (
      <ResContainer>
        <NoDataFound />
      </ResContainer>
    );
  } else {
    PageState = PAGE_STATE.LOADED;
    AllTopics = RemoveDuplicates(gamesData, 'topic');
    const newArray = AllTopics.map((item) => {
      return gamesData.filter((game) => game.topic === item.topic);
    });
    PageUI = (
      <>
        {newArray?.map((item, index) => {
          const isLast = index === newArray.length - 1;
          return (
            <div className={!isLast ? styled.topicSlider : ''} key={index}>
              <LessonListingGames
                list={item}
                recommendations={recData}
                currentGrade={CompDetails?.current_grade}
                competition={competition}
                // TopicNo={Topic?.TopicNo}
                IsMcdUser={IsMcdUser}
                userID={user.user_id}
              />
            </div>
          );
        })}
      </>
    );
  }

  useEffect(() => {
    if (!gamesData.length > 0 && CompDetails) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CompDetails]);

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
      <FlexibleView ref={setScrollNodeRef}>
        <div className={styled.LessonListingMainHeading}>
          <PageTitle logo={competitions_icon} name={texts.MY_GAMES} />
        </div>
        <div>
          {PageUI}
          <button onClick={scrollToTop} className={`${styled.upArrowBtn} ${!isVisible ? styled.invisible : ''} up_down_animate`}>
            <div className={styled.upArrow}>{UpArrow}</div>
          </button>
          <div ref={loaderRef} style={{ width: '100%', textAlign: 'center', paddingBottom: '42px' }}>
            <span style={{ opacity: '0' }}>Loading...</span>
            {loading && <BarLoader />}
          </div>
        </div>
      </FlexibleView>
    </SlidableView>
  );
});

export default GameList;

const UpArrow = (
  <svg style={{ rotate: '180deg' }} xmlns="http://www.w3.org/2000/svg" width="21" height="12" viewBox="0 0 21 12" fill="none">
    <path
      d="M10.5441 7.35914L17.6 0.558625C17.9735 0.200829 18.4786 -8.43462e-07 19.0052 -8.66479e-07C19.5318 -8.89497e-07 20.037 0.200829 20.4104 0.558625C20.5972 0.737212 20.7455 0.949682 20.8467 1.18378C20.9479 1.41788 21 1.66897 21 1.92257C21 2.17617 20.9479 2.42726 20.8467 2.66136C20.7455 2.89546 20.5972 3.10793 20.4104 3.28651L11.9592 11.4318C11.7739 11.6118 11.5535 11.7547 11.3106 11.8523C11.0677 11.9498 10.8072 12 10.5441 12C10.2809 12 10.0204 11.9498 9.77753 11.8523C9.53464 11.7547 9.31419 11.6118 9.1289 11.4318L0.578064 3.28652C0.393331 3.10701 0.247181 2.89413 0.147991 2.66007C0.0487991 2.42602 -0.00148244 2.17539 3.38918e-05 1.92257C-0.00148246 1.66975 0.0487991 1.41912 0.147991 1.18507C0.24718 0.951013 0.393331 0.73813 0.578063 0.558626C0.951515 0.200829 1.4567 -9.94093e-08 1.98327 -1.22427e-07C2.50985 -1.45444e-07 3.01503 0.200829 3.38848 0.558626L10.5441 7.35914Z"
      fill="white"
    />
  </svg>
);
