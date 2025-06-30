import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Grid, useTheme } from '@material-ui/core';

import { ReactComponent as LeaderboardIcon } from 'Assets/images/leaderboard.svg';
import { PerPageLoader } from 'Components/Loader/PerPageLoader';
import PageTitle from 'Components/Core/PageTitle';
import competitions_icon from 'Assets/images/bonzoui/headings/leaderboard.png';
import ResContainer from 'Components/Layouts/ResponsiveGrid';
import { PAGE_STATE, API_CALLS, AvatarSwitcher } from 'Constants';
import { GetCompetitionsLeaderboard, User, GetCompetitionDetails, GetSchoolsLeaderboard, SelectedCompetition } from 'Actions';
import { Paper, Select, NoDataFound, Header, SlidableView, FlexibleView } from 'Components';
import ToggleTab from 'Components/Core/ToggleTab';
import { gameDispatch } from 'Utils/ActionCreators';
import ListBox, { OneListItem, OneListItemLoader } from '../shared/ListBox';
import {
  OneAvatarWithPositionLoader,
  OneListPrimaryTextLoader,
  OneAvatarWithPosition,
  OneListPrimaryText,
  PositionsLoader,
} from './LocalComponents';
import useStyles from './style';
// import { GetPaymentStatus } from 'Actions/payment.action';
// import { makeStyles } from '@material-ui/core/styles';
import Stars1 from 'Assets/images/bonzoui/leaderboard/stars1.png';
import Stars2 from 'Assets/images/bonzoui/leaderboard/stars2.png';
import Stars3 from 'Assets/images/bonzoui/leaderboard/stars3.png';
import SunRays from 'Assets/images/bonzoui/leaderboard/raysbg.svg';
import Pos1 from 'Assets/images/bonzoui/pos1.png';
import Pos2 from 'Assets/images/bonzoui/pos2.png';
import Pos3 from 'Assets/images/bonzoui/pos3.png';
import { RemoveDuplicates } from 'Utils';

const Leaderboard = React.memo(({ competition, isOnlyCompetition, isInstituteBase, playersHeading }) => {
  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI = null;
  let PreLoader = null;
  let list = [];
  const user = User.Info();

  const styled = useStyles();
  const dispatch = useDispatch();
  const { texts } = useTheme();
  // const [subjectRef, setSubjectRef] = useState({ index: 0, name: '', anchor: null });
  const subjectRef = { index: 0, name: '', anchor: null };
  const time = [texts.ALL_TIME, texts.DAILY, texts.WEEKLY, texts.MONTHLY];
  const [timeRef, setTimeRef] = useState({ index: 0, anchor: null });
  const currentComp = SelectedCompetition.Info();
  //  console.log(isInstituteBase, '  console.log(isInstituteBase);');
  const CompetitionDetails = useSelector((state) => state.GetCompetitionDetails, shallowEqual);

  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  const IsAdLogin = useSelector((state) => state.AdLoginUser.adLogin_user, shallowEqual);

  const IsDirectLaunch = useSelector((state) => state.DirectLaunch.directLaunch_user, shallowEqual);
  const [scrollNode, setScrollNode] = useState(undefined);
  // const [paymentStatus, setPaymentStatus] = useState(null);
  const [apiCall, setApiCall] = useState(false);

  const fTime = [
    { name: time[0], index: 0 },
    { name: time[1], index: 1 },
    { name: time[2], index: 2 },
    { name: time[3], index: 3 },
  ];

  const [leaderBoardState, setLeaderBoardState] = useState(!!competition.is_school_based);
  const [gradeRef, setGradeRef] = useState({ index: null, name: '', anchor: null, grade: null });
  const [uniqueGrades, setUniqueGrades] = useState([]);
  const [currentGrade, setCurrentGrade] = useState(CompetitionDetails?.current_grade);

  useEffect(() => {
    if (user?.active_role === 'principal') {
      let gradesArray = [];
      for (let i = 0; i < CompetitionDetails?.grades?.length; i++) {
        gradesArray.push({
          name: CompetitionDetails.grades[i].grade_alias,
          index: CompetitionDetails.grades[i].grade,
          grade: CompetitionDetails.grades[i].grade,
        });
      }
      setUniqueGrades(RemoveDuplicates(gradesArray, 'grade'));
    }
  }, [CompetitionDetails, currentGrade, user.active_role]);

  useEffect(() => {
    if (user?.active_role === 'principal') {
      const selected = CompetitionDetails?.grades?.filter((item) => item.grade === CompetitionDetails.current_grade);
      if (selected) {
        setGradeRef({
          ...gradeRef,
          name: selected[0]?.grade_alias,
          index: CompetitionDetails.current_grade,
          grade: CompetitionDetails.current_grade,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CompetitionDetails]);

  const SchoolData = useSelector((state) => {
    return state.GetSchoolsLeaderboard;
  }, shallowEqual);

  const IndividualData = useSelector((state) => {
    return state.GetCompetitionsLeaderboard;
  }, shallowEqual);

  // const InstituteData = useSelector((state) => {
  //   return state.GetCompetitionsLeaderboard;
  // }, shallowEqual);

  // const CompetitionDetailsLoadData = useCallback(() => {
  //   dispatch(GetCompetitionDetails(user.user_id, competition?.competition_id));
  // }, [dispatch, user.user_id, competition.competition_id]);

  // useEffect(() => {
  //   if (!CompetitionDetails) CompetitionDetailsLoadData();
  // }, [CompetitionDetails, CompetitionDetailsLoadData]);

  const pageData = leaderBoardState ? SchoolData : IndividualData;

  // const pageData = leaderBoardState ? 'No Data' : isInstituteBase ? InstituteData : IndividualData;

  // console.log(competition, 'competitioncompetition', !!competition?.is_premium);

  if (!pageData) {
    PageState = PAGE_STATE.IS_LOADING;
    list = [0, 1, 2, 3, 4, 5].map((item) => {
      return <OneListItemLoader avatar={<OneAvatarWithPositionLoader />} primary={<OneListPrimaryTextLoader />} key={item} />;
    });
    PreLoader = (
      <>
        <PositionsLoader />
        <Grid item xs={12}>
          <ListBox title={time[timeRef.index]} icon={<LeaderboardIcon />} items={list} noResponsive noTitleBar />
        </Grid>
      </>
    );
    PageUI = <PerPageLoader PageState={PageState}>{PreLoader}</PerPageLoader>;
  } else if (pageData.shouldRetry) {
    PageState = PAGE_STATE.RETRY;
    PageUI = <PerPageLoader PageState={PageState} />;
  } else if (
    pageData === 'No Data' ||
    (Array.isArray(pageData.schools) && pageData.schools?.length === 0) ||
    (Array.isArray(pageData.users) && pageData.users.length === 0 && pageData.current_user === null)
  ) {
    PageState = PAGE_STATE.NO_DATA_TO_SHOW;
    PageUI = <NoDataFound />;
  } else {
    PageState = PAGE_STATE.LOADED;
    const users_to_show =
      Array.isArray(pageData.schools) && pageData.schools.length > 0
        ? [...pageData.schools]
        : Array.isArray(pageData.users) && pageData.users.length > 0
        ? [...pageData.users]
        : [pageData.current_user];

    list = users_to_show.map((item, index) => {
      return (
        <OneListItem
          key={index}
          noButton
          noResponsive
          item={{
            primary: (
              // leaderBoardState ? (
              //   <OneListPrimaryText name={item.school_name} points={item.total_points} points2={item.points_avg} />
              // ) : (
              <OneListPrimaryText
                name={User.NameResolver(item)}
                points={item.total_points ?? '-'}
                // points2={item.avg_score ?? '-'}
                schoolName={item.school_name}
              />
            ),
            // )
            avatar: (
              <OneAvatarWithPosition position={item.rank} avatar={item.profile_picture || '16'} schoolAvatar={leaderBoardState} />
            ),
          }}
        />
      );
    });

    const top3Data = [0, 1, 2].map((index) => ({
      name: list[index]?.props?.item?.primary?.props?.name || '',
      points: list[index]?.props?.item?.primary?.props?.points || -1,
      avatar: list[index]?.props?.item?.avatar?.props?.avatar || 16,
    }));
    // console.log('.......................', top3Data);

    const adjustCurrentUserInTop3 = () => {
      // console.log('im call.......');
      if (pageData?.current_user?.rank <= 3 && pageData?.current_user?.rank > 0) {
        const userRank = pageData.current_user.rank;
        const userData = {
          name: pageData.current_user.name,
          points: pageData.current_user.total_points,
          avatar: pageData.current_user.profile_picture,
        };

        // Create new top3Data
        const newTop3Data = top3Data.slice(0, userRank - 1).concat(userData, top3Data.slice(userRank - 1));

        // Filter out duplicate entries
        const uniqueTop3Data = newTop3Data?.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.name === value.name && t.points === value.points && t.avatar === value.avatar)
        );

        // Ensure newTop3Data has only 3 elements
        top3Data.splice(0, 3, ...uniqueTop3Data.slice(0, 3));
        // console.log('newTop3Data......', newTop3Data);
      } else {
        // console.log('User does not exist in top 3');
      }
    };
    adjustCurrentUserInTop3();

    // const LeaderboardShell = (top3Data[0]?.name || top3Data[1]?.name || top3Data[2]?.name) && (
    //   <div className="bonzo__leaderboard__shell">
    //     {top3Data.map((item, index) => {
    //       if (!item.name) return null;

    //       const positionClasses = [`bc__2`, `bc__1`, `bc__3`];
    //       const positionImages = [Pos2, Pos1, Pos3];
    //       const starImages = [Stars2, Stars3, Stars1];

    //       return (
    //         <div className="bonzo__leaderboard__step__mx" key={index}>
    //           <div className={`bonzo__leaderboard__step ${positionClasses[index]}`}>
    //             {index === 0 && <img src={SunRays} className="bonzo__leaderboard__rays" alt="Rays" />}
    //             <AvatarSwitcher schoolAvatar={leaderBoardState} className="bonzo__leaderboard__avatar" t={item.avatar} s={44} />
    //             <img src={positionImages[index]} className="bonzo__leaderboard__pos" alt={index + 1} />
    //             <img src={starImages[index]} className="bonzo__leaderboard__stars" alt={`${index + 1} Stars`} />
    //           </div>
    //           <div className="truncate_text bonzo__leaderboard__txt mw_280">{item.name}</div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // );

    PageUI = (
      <>
        {/* {LeaderboardShell || null} */}
        {(top3Data[0]?.name || top3Data[1]?.name || top3Data[2]?.name) && (
          <div className="bonzo__leaderboard__shell">
            <div className="bonzo__leaderboard__step__mx">
              {top3Data[1]?.name && (
                <div className="bonzo__leaderboard__step bc__2 ">
                  <AvatarSwitcher
                    schoolAvatar={leaderBoardState}
                    className="bonzo__leaderboard__avatar"
                    t={top3Data[1].avatar}
                    s={44}
                  />
                  <img src={Pos2} className="bonzo__leaderboard__pos" alt="2" />{' '}
                  <img src={Stars2} className="bonzo__leaderboard__stars" alt="2 Stars" />
                </div>
              )}
              <div className="truncate_text bonzo__leaderboard__txt mw_280">{top3Data[1].name}</div>
            </div>
            <div className="bonzo__leaderboard__step__mx">
              {top3Data[0]?.name && (
                <div className="bonzo__leaderboard__step bc__1">
                  <img src={SunRays} className="bonzo__leaderboard__rays" alt="Rays" />
                  <AvatarSwitcher
                    schoolAvatar={leaderBoardState}
                    className="bonzo__leaderboard__avatar"
                    t={top3Data[0].avatar}
                    s={44}
                  />
                  <img src={Pos1} className="bonzo__leaderboard__pos" alt="1" />{' '}
                  <img src={Stars3} className="bonzo__leaderboard__stars" alt="3 Stars" />
                </div>
              )}
              <div className="truncate_text bonzo__leaderboard__txt mw_280">{top3Data[0].name}</div>
            </div>
            <div className="bonzo__leaderboard__step__mx">
              {top3Data[2]?.name && (
                <div className="bonzo__leaderboard__step bc__3">
                  <AvatarSwitcher
                    schoolAvatar={leaderBoardState}
                    className="bonzo__leaderboard__avatar"
                    t={top3Data[2].avatar}
                    s={44}
                  />{' '}
                  <img src={Pos3} className="bonzo__leaderboard__pos" alt="3" />{' '}
                  <img src={Stars1} className="bonzo__leaderboard__stars" alt="1 Stars" />
                </div>
              )}
              <div className="truncate_text bonzo__leaderboard__txt mw_280">{top3Data[2]?.name}</div>
            </div>
          </div>
        )}
        <Grid item xs={12}>
          <ListBox
            noResponsive
            title={time[timeRef.index]}
            icon={<LeaderboardIcon />}
            overrideTitleWithHeadings={[
              texts.RANK,
              leaderBoardState ? texts.SCHOOLS : texts.PLAYERS,
              texts.POINTS_SCORED,
              // texts.AVG_SCORE,
            ]}
            items={list}
            playerRankData={
              !isInstituteBase && !User.IsGuest() && pageData?.users?.length > 0 ? (
                <OneListItem
                  key={0}
                  noButton
                  noResponsive
                  currentUser
                  item={{
                    primary: leaderBoardState ? (
                      <OneListPrimaryText
                        name={pageData?.current_user?.school_name || ''}
                        points={pageData?.current_user?.total_points ?? '-'}
                        position={pageData?.current_user?.rank || ''}
                        // points2={pageData?.current_user?.avg_score ?? '-'}
                      />
                    ) : (
                      <OneListPrimaryText
                        name={User.NameResolver(pageData?.current_user) || ''}
                        points={pageData?.current_user?.total_points ?? '-'}
                        // points2={pageData?.current_user?.avg_score ?? '-'}
                        schoolName={pageData?.current_user?.school_name || ''}
                        position={pageData?.current_user?.rank || ''}
                      />
                    ),
                    avatar: (
                      <OneAvatarWithPosition
                        schoolAvatar={leaderBoardState}
                        selfRank={true}
                        position={pageData?.current_user?.rank || ''}
                        avatar={pageData?.current_user?.profile_picture || '16'}
                      />
                    ),
                  }}
                />
              ) : undefined
            }
          />
        </Grid>
        {/* {pageData && user.active_role === 'learner' && (
          <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto', paddingBottom: '48px' }}>
            <PremiumBanner competition={competition} paymentData={paymentStatus} status={pageData !== null} />
          </div>
        )} */}
      </>
    );
  }

  // const gradesSubject1 = [{ name: 'Global', index: 0 }, ...GetSubjectsFromGrade(competition.grades, competition.current_grade, 1)];

  // const otherGrades = CompetitionDetails ? [...GetSubjectsFromGrade(CompetitionDetails.grades, competition.current_grade, 1)] : '';
  // const Temp = otherGrades.length > 1 ? otherGrades : [];

  // const gradesSubject = [{ name: 'Global', index: 0 }, ...Temp];

  // console.log(otherGrades);

  const timeCallback = (e, item) => {
    const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag');
    switch (t) {
      case 'selected-item':
        setTimeRef({ index: item.index, anchor: null });
        // if (isInstituteBase) {
        //   dispatch(
        //     GetCompetitionsLeaderboard({
        //       ...competition,
        //       is_global: subjectRef.index === 0 ? 1 : 0,
        //       subject: subjectRef.name,
        //       time_type: item.index,
        //       ...CompetitionDetails,
        //     })
        //   );
        // } else {
        dispatch(
          leaderBoardState
            ? GetSchoolsLeaderboard({
                competition_id: competition.competition_id,
                current_grade: currentGrade,
                is_global: subjectRef.index === 0 ? 1 : 0,
                subject: subjectRef.name,
                time_type: item.index,
                // ...CompetitionDetails,
              })
            : GetCompetitionsLeaderboard({
                competition_id: competition.competition_id,
                current_grade: currentGrade,
                is_global: subjectRef.index === 0 ? 1 : 0,
                subject: subjectRef.name,
                time_type: item.index,
                is_school_based: competition?.is_school_based,
                // ...CompetitionDetails,
              })
        );
        // }
        break;
      default:
        break;
    }
  };

  // const subjectCallback = (e, item) => {
  //   setSubjectRef({ index: item.index, name: item.name, anchor: null });
  //   // if (isInstituteBase) {
  //   //   dispatch(
  //   //     GetCompetitionsLeaderboard({
  //   //       ...competition,
  //   //       is_global: item.index === 0 ? 1 : 0,
  //   //       subject: item.name,
  //   //       time_type: timeRef.index,
  //   //       ...CompetitionDetails,
  //   //     })
  //   //   );
  //   // } else {

  //   dispatch(
  //     leaderBoardState
  //       ? GetSchoolsLeaderboard({
  //           ...competition,
  //           is_global: item.index === 0 ? 1 : 0,
  //           subject: item.name,
  //           time_type: timeRef.index,
  //           ...CompetitionDetails,
  //         })
  //       : GetCompetitionsLeaderboard({
  //           ...competition,
  //           is_global: item.index === 0 ? 1 : 0,
  //           subject: item.name,
  //           time_type: timeRef.index,
  //           ...CompetitionDetails,
  //         })
  //   );
  //   // }
  // };

  const LeaderboardCallback = (e, item) => {
    const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag');
    switch (t) {
      case 'Individual':
        setLeaderBoardState(false);
        // console.log(pageData);
        // setCallRef(false);
        setApiCall(false);
        break;
      case 'Institute':
        setLeaderBoardState(true);
        setApiCall(false);
        // setCallRef(false);
        break;
      default:
        break;
    }
  };

  const loadData = useCallback(() => {
    dispatch(
      leaderBoardState
        ? GetSchoolsLeaderboard({
            competition_id: competition.competition_id,
            current_grade: currentGrade,
            is_global: 1,
            subject: '',
            time_type: timeRef.index,
            // ...CompetitionDetails,
          })
        : GetCompetitionsLeaderboard({
            competition_id: competition.competition_id,
            current_grade: currentGrade,
            is_global: 1,
            subject: '',
            time_type: timeRef.index,
            is_school_based: competition?.is_school_based,
            // ...CompetitionDetails,
          })
    );
    //}
  }, [dispatch, competition, timeRef.index, leaderBoardState, currentGrade]);

  const loadComDetailData = useCallback(() => {
    dispatch(GetCompetitionDetails(currentComp?.item?.enrolled, competition.competition_id));
  }, [dispatch, currentComp, competition]);

  useEffect(() => {
    if (!CompetitionDetails) {
      loadComDetailData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CompetitionDetails]);

  useEffect(() => {
    if (pageData) {
      setApiCall(true);
    } else if (!pageData && CompetitionDetails && !apiCall) {
      loadData();
      setApiCall(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CompetitionDetails, pageData]);

  // useEffect(() => {
  //   // console.log(paymentStatus, 'paymentStatus');
  //   // console.log(pageData, competition, 'pageData && paymentStatus === null');
  //   if (pageData && paymentStatus === null && competition.is_premium === 1) {
  //     // console.log('check in');
  //     dispatch(
  //       GetPaymentStatus(competition, (data) => {
  //         setPaymentStatus(data);
  //       })
  //     );
  //     gameDispatch(PREMIUM_COMPETITION.SET_DATA, competition);
  //   }
  //   // setCallRef({ sent: true });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pageData]);

  useEffect(() => {
    const interval = setInterval(loadData, 30000); // 1-minute interval
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [loadData]); // Ensure `loadData` is stable or memoized

  useEffect(() => {
    window.myOnBeforeUnload = () => {
      if (subjectRef.index !== 0 || timeRef.index !== 0) {
        if (isInstituteBase) {
          gameDispatch(API_CALLS.GetCompetitionsLeaderboard.CLEAR);
        } else {
          !leaderBoardState &&
            // ? gameDispatch(API_CALLS.GetSchoolsLeaderboard.CLEAR) :
            gameDispatch(API_CALLS.GetCompetitionsLeaderboard.CLEAR);
        }
      }
    };
  }, [subjectRef.index, timeRef.index, leaderBoardState, isInstituteBase]);

  const name = (
    <Grid container style={{ marginTop: '24px' }}>
      <Grid item xs={12} md={3}>
        &nbsp;
      </Grid>
      <Grid item xs={12} md={6}>
        <PageTitle logo={competitions_icon} noMargins name={playersHeading ? texts.PLAYERS : texts.LEADERBOARD} />
        {/* <H2 className={`stroked-text ${classesH2.customH2}`}></H2> */}
      </Grid>
      <Grid item xs={12} md={3}>
        <Grid item container justifyContent="center" xs={12}>
          {user?.active_role === 'learner' && (
            <Paper className={`sLeaderBoardFilter ${styled.filterPaper}`} elevation={0} sx={{ marginTop: '8px' }}>
              <Select list={fTime} callback={timeCallback} value={timeRef.index} tag="selected-item" className={styled.select} />
            </Paper>
          )}
        </Grid>
      </Grid>

      <Grid container item display="flex" justifyContent="center" xs={12}>
        <div className="bonzoui__two__selects"></div>
      </Grid>
      <Grid container item display="flex  " justifyContent="center" xs={12}>
        {competition.is_school_based || isInstituteBase ? (
          <Grid item container justifyContent="center" xs={12}>
            <br />
            &nbsp;
            <br />
            <ToggleTab
              tagLeft="Individual"
              stateSelected={leaderBoardState ? 1 : 0}
              tagRight="Institute"
              labelLeft={texts.INDIVIDUAL}
              labelRight={texts.SCHOOLS}
              callbackLeft={LeaderboardCallback}
              callbackRight={LeaderboardCallback}
            />
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );

  const GradeCallback = (e, item) => {
    setApiCall(false);
    setTimeRef({ index: 0, anchor: null });
    setGradeRef({ ...gradeRef, index: item.grade, name: item.name, anchor: null, grade: item.grade });
    setCurrentGrade(item.grade);
    gameDispatch(API_CALLS.GetSchoolsLeaderboard.CLEAR);
    gameDispatch(API_CALLS.GetCompetitionsLeaderboard.CLEAR);
  };

  const SecondaryButtons =
    user?.active_role === 'principal' ? (
      <Grid item className={styled.dropdown_container}>
        <Grid item style={{ maxWidth: '120px', width: '100%' }}>
          {uniqueGrades.length > 1 && gradeRef.index ? (
            <Paper className={styled.filterPaper} style={{ width: '100%' }}>
              <Select
                list={uniqueGrades}
                callback={GradeCallback}
                value={gradeRef.index}
                tag="selected-item"
                className={styled.select}
              />
            </Paper>
          ) : null}
        </Grid>
        <Grid item style={{ maxWidth: '150px', width: '100%' }}>
          <Paper className={styled.filterPaper} elevation={0} sx={{ marginTop: '8px' }}>
            <Select list={fTime} callback={timeCallback} value={timeRef.index} tag="selected-item" className={styled.select} />
          </Paper>
        </Grid>
      </Grid>
    ) : null;

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
          SecondaryButtons: user.active_role === 'principal' ? SecondaryButtons : null,
        }}
      />
      <FlexibleView
        ref={(node) => {
          if (node) {
            setScrollNode(node);
          }
        }}
      >
        <ResContainer>
          {name}
          {PageUI}
        </ResContainer>
      </FlexibleView>
    </SlidableView>
  );
});

export default Leaderboard;
