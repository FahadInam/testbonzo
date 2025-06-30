/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import ResContainer from 'Components/Layouts/ResponsiveGrid';
import { API_CALLS, PAGE_STATE } from 'Constants';
import { FlexibleView, SlidableView, Header, NoDataFound, Select } from 'Components';
import { GetCompetitionDetails, SelectedCompetition } from 'Actions';
import { IsEmptyObject, RemoveDuplicates } from 'Utils';
import { PerPageLoader } from 'Components/Loader/PerPageLoader';
import { MainReportLoader, MainReport } from './MainReport';
import { ListingLoader, StrugglingPerformance, TopPerformance, InstReport, InstGamesReport } from './LocalComponents';
import ReportDetails from './ReportDetails';
import {
  InstitutionalPerformers,
  InstitutionalSummary,
  InstitutionalReport,
  InstitutionalGamesReport,
} from 'Actions/institution.action';
import { Grid, Paper, makeStyles } from '@material-ui/core';
// import useStyles from './style';
// import { PageSwitch } from 'Navigation';
// import { DefaultNav } from 'Navigation/Paths';
import { useHistory } from 'react-router-dom';
import { gameDispatch } from 'Utils/ActionCreators';

window.GlobalActivityTimer = null;

const useStyles = makeStyles((theme) => ({
  overviewContainer: {
    width: '100%',
    maxWidth: '1280px',
    // [theme.breakpoints.down('md')]: {
    //   maxWidth: '600px',
    // },
  },
  filterPaper: {
    width: '150px',
    maxWidth: 'unset',
    background: theme.palette.primary.light,
    margin: theme.spacing(1, 0.5),
    padding: theme.spacing(1.125, 1, 1, 1.125),
    justifyContent: 'space-between',
    flexDirection: 'row',
    '& p': {
      paddingTop: theme.spacing(0.25),
      paddingLeft: theme.spacing(0.25),
    },
    '& .MuiIconButton-root': {
      marginLeft: theme.spacing(0.5),
    },
    '& .MuiIconButton-root i': {
      fontSize: '1rem',
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.up('xs')]: {
      maxWidth: '150px',
    },
    '& .MuiFormControl-root': {
      maxWidth: '100%',
    },
    '& .MuiOutlinedInput-input': {
      padding: ' 0px 22px 0px 2px !important',
      overflow: 'hidden',
    },
  },
  select: {
    width: '100%',
    margin: 0,
    '& .MuiOutlinedInput-input': {
      padding: 0,
      border: 'none',
      background: 'transparent',
      textAlign: 'left',
    },
    '& .MuiOutlinedInput-input.Mui-focused': {
      border: 'none',
    },
    '& .MuiInputBase-root': {
      color: theme.palette.common.white,
    },
    '& label.Mui-focused': {
      color: theme.palette.common.white,
    },
    '& .MuiSelect-icon': {
      color: theme.palette.common.white,
      right: 0,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  dropdown_container: {
    maxWidth: '300px',
    width: '100%',
    display: 'flex',
    gap: '20px',
    '@media (max-width: 638.88px)': {
      maxWidth: '280px',
      gap: '8px',
    },
  },
}));

const Report = React.memo(({ competition, games }) => {
  const styled = useStyles();
  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI = null;
  let mainReportUI = null;
  let topPerformanceUI = null;
  let strugglingPerformanceUI = null;
  let competitionProgressUI = null;
  let strengthsUI = null;
  let gamesReportUI = null;
  let PreLoader = null;
  const [competitionId, setCompetitionId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    setCompetitionId(history.location.state?.competition_id || history.location.state?.playersCompetitionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log('history...', history.location.state)

  const currentComp = SelectedCompetition.Info();
  // console.log('itme...', currentComp.item)

  const CompetitionDetails = useSelector((state) => state.GetCompetitionDetails, shallowEqual);
  const pageData = useSelector((state) => state.InstitutionalSummary, shallowEqual);
  const prefData = useSelector((state) => state.GetInstitutionalPerformance, shallowEqual);
  const reportData = useSelector((state) => state.GetInstitutionalReport, shallowEqual);
  const gamesReportData = useSelector((state) => state.GetInstitutionalGamesReport, shallowEqual);
  // const user = User.Info();

  const [callRef, setCallRef] = useState({ sent: false, recCallSent: false });
  const [gradeRef, setGradeRef] = useState({ index: null, name: '', anchor: null, grade: null });
  const [subjectRef, setSubjectRef] = useState({ name: '', cms_course_id: null, index: null, grade: null });
  const [otherGrades, setOtherGrades] = useState([]);
  const [otherSubjects, setOtherSubjects] = useState([]);

  // console.log('localGrades...', localGrades)
  const [scrollNode, setScrollNode] = useState(undefined);
  const [currentGrade, setCurrentGrade] = useState(currentComp?.item?.current_grade || CompetitionDetails?.current_grade);
  const [cms_course_id, setCms_course_id] = useState(null);
  const dispatch = useDispatch();
  // console.log('pageData', pageData, !callRef.recCallSent, competitionId, CompetitionDetails)

  // const gradeList = GetAllGradesList(CompetitionDetails, texts.GRADE);
  // console.log('currentGrade', currentGrade)
  // if (gradeList.length === 0) return null;
  useEffect(() => {
    return () => {
      gameDispatch(API_CALLS.InstitutionalSummary.CLEAR);
      gameDispatch(API_CALLS.InstitutionalPerformers.CLEAR);
      gameDispatch(API_CALLS.InstitutionalReport.CLEAR);
      gameDispatch(API_CALLS.InstitutionalGamesReport.CLEAR);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Call 0
  const loadComDetailData = useCallback(() => {
    dispatch(GetCompetitionDetails(currentComp?.item?.enrolled ?? 1, competitionId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, competitionId]);

  useEffect(() => {
    if (!CompetitionDetails && true && competitionId) {
      loadComDetailData();
      setCallRef({ recCallSent: false, sent: true });
    }
  }, [CompetitionDetails, loadComDetailData, callRef.sent, competitionId]);

  useEffect(() => {
    // setCms_course_id(CompetitionDetails?.grades[0].cms_course_id)
    const selected = CompetitionDetails?.grades.filter((item) => item.grade === CompetitionDetails.current_grade);
    if (selected) {
      setGradeRef({
        ...gradeRef,
        name: selected[0]?.grade_alias,
        index: CompetitionDetails.current_grade,
        grade: CompetitionDetails.current_grade,
      });
      // setSubjectRef({
      //   ...subjectRef,
      //   name: CompetitionDetails.grades[0].subject,
      //   cms_course_id: CompetitionDetails.grades[0].cms_course_id,
      //   index: CompetitionDetails.grades[0].cms_course_id,
      //   grade: CompetitionDetails.current_grade,
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CompetitionDetails]);
  // Call 1

  const loadPageData = useCallback(() => {
    dispatch(InstitutionalSummary({ competition_id: competitionId, current_grade: currentGrade, cms_course_id: cms_course_id }));
  }, [dispatch, competitionId, currentGrade, cms_course_id]);
  // load recommendations
  useEffect(() => {
    if (!pageData && true && competitionId && currentGrade && CompetitionDetails && cms_course_id) {
      loadPageData();
      setCallRef({ sent: true, recCallSent: true });
    }
  }, [loadPageData, callRef.recCallSent, pageData, competitionId, currentGrade, CompetitionDetails, cms_course_id]);

  // Call 2

  const loadPerfData = useCallback(() => {
    dispatch(InstitutionalPerformers({ competition_id: competitionId, current_grade: currentGrade, cms_course_id: cms_course_id }));
  }, [dispatch, currentGrade, competitionId, cms_course_id]);
  // load recommendations

  useEffect(() => {
    let gradesArray = [];
    let subjectsArray = [];

    for (let i = 0; i < CompetitionDetails?.grades?.length; i++) {
      gradesArray.push({
        name: CompetitionDetails.grades[i].grade_alias,
        index: CompetitionDetails.grades[i].grade,
        grade: CompetitionDetails.grades[i].grade,
      });
      subjectsArray.push({
        name: CompetitionDetails.grades[i].subject,
        cms_course_id: CompetitionDetails.grades[i].cms_course_id,
        index: CompetitionDetails.grades[i].cms_course_id,
        grade: CompetitionDetails.grades[i].grade,
      });
    }
    setOtherGrades(RemoveDuplicates(gradesArray, 'grade'));
    // subjectsArray = RemoveDuplicates(subjectsArray, 'name');
    subjectsArray = subjectsArray.filter((item) => item.grade === currentGrade);
    setOtherSubjects(subjectsArray);
  }, [CompetitionDetails, currentGrade]);

  useEffect(() => {
    setSubjectRef({
      name: otherSubjects[0]?.name,
      cms_course_id: otherSubjects[0]?.cms_course_id,
      index: otherSubjects[0]?.cms_course_id,
      grade: otherSubjects[0]?.grade,
    });
    setCms_course_id(otherSubjects[0]?.cms_course_id);
  }, [otherSubjects]);

  useEffect(() => {
    if (pageData && !prefData) {
      loadPerfData();
    }
  }, [loadPerfData, prefData, pageData]);

  // Call 3

  const loadReportData = useCallback(() => {
    dispatch(InstitutionalReport({ competition_id: competitionId, current_grade: currentGrade, cms_course_id: cms_course_id }));
  }, [dispatch, competitionId, currentGrade, cms_course_id]);
  // load recommendations

  useEffect(() => {
    if (pageData && prefData && !reportData) {
      loadReportData();
    }
  }, [loadReportData, prefData, pageData, reportData]);

  // Call 4

  const loadGamesReportData = useCallback(() => {
    dispatch(InstitutionalGamesReport({ competition_id: competitionId, current_grade: currentGrade, cms_course_id: cms_course_id }));
  }, [dispatch, competitionId, currentGrade, cms_course_id]);
  // load recommendations

  useEffect(() => {
    if (pageData && prefData && reportData && !gamesReportData) {
      loadGamesReportData();
    }
  }, [loadGamesReportData, prefData, pageData, reportData, gamesReportData]);

  if (!pageData || !prefData || IsEmptyObject(pageData)) {
    PageState = PAGE_STATE.IS_LOADING;

    mainReportUI = <MainReportLoader />;

    // strengthsUI = <ListingLoader />;

    topPerformanceUI = <ListingLoader />;

    strugglingPerformanceUI = <ListingLoader />;

    competitionProgressUI = <ListingLoader />;

    gamesReportUI = <ListingLoader />;

    PreLoader = (
      <ReportDetails
        mainReport={mainReportUI}
        top_performance={topPerformanceUI}
        struggling_performance={strugglingPerformanceUI}
        competition_progress={competitionProgressUI}
        strengths={strengthsUI}
        games_report={gamesReportUI}
      />
    );
    PageUI = <PerPageLoader PageState={PageState}>{PreLoader}</PerPageLoader>;
  } else if (pageData.shouldRetry) {
    PageState = PAGE_STATE.RETRY;
    PageUI = <PerPageLoader PageState={PageState} />;
  } else if (pageData.length === 0 && pageData.results.length === 0) {
    PageState = PAGE_STATE.NO_DATA_TO_SHOW;
    PageUI = <NoDataFound />;
  } else {
    PageState = PAGE_STATE.LOADED;
    const { report } = pageData;

    // console.log('gamesReportData', gamesReportData);

    if (pageData) {
      mainReportUI = <MainReport ReportData={report} />;
    }

    if (prefData) {
      if (prefData.top.length > 0) topPerformanceUI = <TopPerformance top_performance={prefData.top} />;
      if (prefData.struggling.length > 0)
        strugglingPerformanceUI = <StrugglingPerformance struggling_performance={prefData.struggling} />;
    }

    if (reportData) {
      if (reportData.lessons.length > 0) competitionProgressUI = <InstReport competition_progress={reportData} />;
    }

    if (gamesReportData) {
      if (gamesReportData.report.length > 0) gamesReportUI = <InstGamesReport games_report={gamesReportData} />;
    }

    PageUI = (
      <ReportDetails
        mainReport={mainReportUI}
        top_performance={topPerformanceUI}
        struggling_performance={strugglingPerformanceUI}
        competition_progress={competitionProgressUI}
        games_report={gamesReportUI}
        tableHeading={true}
      />
    );
  }

  // const backButtonCallback = () => {
  //   // SelectedCompetition.GotoCompetition();
  //   PageSwitch(DefaultNav.COMPETITIONS);
  // };

  const GradeCallback = (e, item) => {
    setGradeRef({ ...gradeRef, index: item.grade, name: item.name, anchor: null, grade: item.grade });
    setCurrentGrade(item.grade);
    setSubjectRef(null);
    if (subjectRef) {
      setCms_course_id(subjectRef.cms_course_id);
      setCallRef({ sent: true, recCallSent: true });
      gameDispatch(API_CALLS.InstitutionalSummary.CLEAR);
      gameDispatch(API_CALLS.InstitutionalPerformers.CLEAR);
      gameDispatch(API_CALLS.InstitutionalReport.CLEAR);
      gameDispatch(API_CALLS.InstitutionalGamesReport.CLEAR);
    }
  };

  const SubjectCallback = (e, item) => {
    setSubjectRef({ ...subjectRef, cms_course_id: item.cms_course_id, index: item.cms_course_id, name: item.name });
    setCms_course_id(item.cms_course_id);
    setCallRef({ sent: true, recCallSent: true });
    gameDispatch(API_CALLS.InstitutionalSummary.CLEAR);
    gameDispatch(API_CALLS.InstitutionalPerformers.CLEAR);
    gameDispatch(API_CALLS.InstitutionalReport.CLEAR);
    gameDispatch(API_CALLS.InstitutionalGamesReport.CLEAR);
  };

  const SecondaryButtons = (
    <Grid item className={styled.dropdown_container}>
      <Grid item style={{ maxWidth: '120px', width: '100%' }}>
        {otherGrades.length > 1 && gradeRef.index ? (
          <Paper className={styled.filterPaper} style={{ width: '100%' }}>
            <Select list={otherGrades} callback={GradeCallback} value={gradeRef.index} tag="selected-item" className={styled.select} />
          </Paper>
        ) : null}
      </Grid>
      <Grid item style={{ maxWidth: '160px', width: '100%' }}>
        {((otherGrades.length > 1 && otherSubjects.length >= 0) || otherSubjects.length > 1) && subjectRef?.cms_course_id ? (
          <Paper className={styled.filterPaper} style={{ width: '100%' }}>
            <Select
              list={otherSubjects}
              callback={SubjectCallback}
              value={subjectRef.cms_course_id}
              tag="selected-item"
              className={styled.select}
            />
          </Paper>
        ) : null}
      </Grid>
    </Grid>
  );

  return (
    <>
      <SlidableView showGradient>
        <Header
          isOnlyCompetition
          scrollNode={scrollNode}
          headerSet={{
            showRight: true,
            showLeft: true,
            overrideLeftButton: true,
            notify: true,
            // leftTitle: competition.name,
            // callback: backButtonCallback,
            SecondaryButtons,
          }}
        />
        <FlexibleView
          ref={(node) => {
            if (node) {
              setScrollNode(node);
            }
          }}
        >
          <ResContainer className={styled.overviewContainer}>{PageUI}</ResContainer>
        </FlexibleView>
      </SlidableView>
    </>
  );
});

export default Report;
