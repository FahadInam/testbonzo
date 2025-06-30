import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Grid, useTheme, Box } from '@material-ui/core';
import { IconPaper, Select } from 'Components';
import {
  GetAllGradesList,
  SelectedCompetition,
  ChangeGrade as ChangeGradeAction,
  GetFtpCompetitions,
  GetCompetitionDetails,
  User,
  // User,
} from 'Actions';
// import { IsEmptyObject } from 'Utils';
import { IMAGES, config } from 'Constants';
import { gradeStrResolver } from 'Components/Stats';
import PageStructure from '../shared/PageStructure';
import useStyles from './style';
import { useHistory } from 'react-router-dom';
import { PageSwitch } from 'Navigation';
import { CompetitionNav, DefaultNav } from 'Navigation/Paths';
import { getInstanceType, IsEmptyObject } from 'Utils';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { INSTANCES_ID } from 'Constants/instance.config';

const ChangeGrade = () => {
  // console.log('IDHR');
  const { texts } = useTheme();
  const dispatch = useDispatch();
  const styled = useStyles();
  const params = useSelector((state) => state.AppControl.url, shallowEqual);
  const competitionStr = useSelector((state) => state.Competition, shallowEqual);
  const competition = SelectedCompetition.StrToObj(competitionStr);
  // console.log(params, 'params');
  const CompetitionName = params ? params.CompetitionName : '';
  const AllCompetitions = useSelector((state) => state.AllCompetitions, shallowEqual);
  const pageData = useSelector((state) => state.GetCompetitionDetails, shallowEqual);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const user = User.Info();
  const currentComp = SelectedCompetition.Info();
  const history = useHistory();
  const [competitionId, setCompetitionId] = useState('');
  const [view, setView] = useState('');
  const [routeEnable, setRouteEnable] = useState(true);
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);
  // console.log('user....', user);
  useEffect(() => {
    // console.log(competitionId, currentComp, history.location.state?.competition_id, 'currentComp1');
    if (user?.active_role !== 'principal') {
      setCompetitionId(history.location.state?.competition_id || currentComp?.item?.competition_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentComp]);

  useEffect(() => {
    if (user?.active_role === 'principal') {
      setCompetitionId(history.location.state?.competition_id || currentComp?.item?.competition_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = useCallback(() => {
    dispatch(GetCompetitionDetails(currentComp?.item?.enrolled ?? 1, competitionId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, competitionId, pageData]);

  const callback = (e, item) => {
    const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag');
    switch (t) {
      case 'grade-selector':
        if (pageData)
          dispatch(
            ChangeGradeAction(
              competition,
              item.index,
              AllCompetitions.competitions.length === 1,
              config.friend_id,
              config.school_id,
              null,
              competitionId
            )
          );
        break;
      default:
        break;
    }
  };

  const [isDataSave, setIsDataSave] = useState(false);
  const [apiCall, setApiCall] = useState(false);

  useEffect(() => {
    // console.log(pageData, AllCompetitions, competitionId, competition, 'competition');
    if (!pageData && AllCompetitions && competitionId) loadData();

    if (pageData && AllCompetitions && !isDataSave) {
      // dispatch(
      //   ChangeGradeAction(competition, pageData.current_grade, AllCompetitions.competitions.length === 1, config.friend_id, config.school_id)
      // );
      SelectedCompetition.Set({
        item: { ...competition.item, current_grade: pageData.current_grade },
        // games: competition.games,
        // user_data: user_data?.user_data,
        isOnlyCompetition: AllCompetitions.competitions.length === 1,
      });
      setIsDataSave(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData, AllCompetitions, competitionId]);

  useEffect(() => {
    //  console.log(AllCompetitions, CompetitionName, 'inside grade12');

    dispatch(GetFtpCompetitions(AllCompetitions, competition.item ? competition.item.url : CompetitionName, texts.EVENT_NOT_FOUND));

    return () => setApiCall(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //console.log(competition, 'inside grade13');
    //console.log('history...', history.location.state.competition_id);
    if (pageData?.current_grade) {
      if (history.location.state?.from === 'view_progress') {
        PageSwitch(CompetitionNav.OVERVIEW, { competition_id: history.location.state.competition_id });
      } else {
        // console.log('here..............');
        SelectedCompetition.GotoCompetition();
      }
    }
    if (user?.active_role !== 'principal') {
      if (!IsEmptyObject(competition) && competition.item) {
        if (competition.item.current_grade) {
          if (isShupavu && routeEnable && (typeof user?.name === 'number' || !isNaN(user?.name)) ? true : false) {
            PageSwitch(DefaultNav.SETTINGS);
            setRouteEnable(false);
          } else {
            // console.log('here..............');
            // SelectedCompetition.GotoCompetition();
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location, competition, user]);

  useEffect(() => {
    if (pageData?.grades && pageData && competition) {
      const allGrades = pageData?.grades.map((item) => {
        return item.grade;
      });

      const uniqueGrades = [...new Set(allGrades)];
      if (user?.active_role === 'principal' && competitionId && !pageData.current_grade) {
        dispatch(
          ChangeGradeAction(
            competition,
            pageData.grades[0].grade,
            AllCompetitions.competitions.length === 1,
            config.friend_id,
            config.school_id,
            null,
            competitionId
          )
        );
      } else {
        if (uniqueGrades.length === 1 && competitionId && !pageData.current_grade && !apiCall) {
          dispatch(
            ChangeGradeAction(
              competition,
              pageData.grades[0].grade,
              AllCompetitions.competitions.length === 1,
              config.friend_id,
              config.school_id,
              null,
              competitionId
            )
          );
          setApiCall(true);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AllCompetitions, competition, competitionId]);

  if (!pageData || !pageData.grades) return null;

  const allGrades = pageData?.grades.map((item) => {
    return item.grade;
  });

  const uniqueGrades = [...new Set(allGrades)];

  if (uniqueGrades.length === 1) return null;

  const gradeList = GetAllGradesList(pageData, texts.GRADE);
  //console.log(gradeList, 'gradeList');
  if (gradeList.length === 0) return null;

  const handleToggleChange = (event, newView) => {
    // setCurrentGrade({ selected: true, selectedGrade: newView });
    if (newView) {
      const selectedGrade = gradeList.find((grade) => grade.index === newView);
      if (selectedGrade) {
        callback(event, selectedGrade); // Trigger the callback with the selected grade
      }
      if (pageData)
        dispatch(
          ChangeGradeAction(
            competition,
            newView,
            AllCompetitions.competitions.length === 1,
            config.friend_id,
            config.school_id,
            null,
            competitionId
          )
        );
      setView(newView); // Update the state with the selected view
    }
  };

  const isMobileOTP = Inst_config.is_mobile_otp;
  // console.log('isMobileOTP-->', isMobileOTP);

  const PageUI = (
    <Grid item xs={12} className={`sSelectGrade ${styled.row}`}>
      <IconPaper
        // icon="grade"
        title={gradeStrResolver(texts.SELECT_GRADE, competition)}
        fixWidth
        addCodeIcon={isMobileOTP ? IMAGES.OTP_CHOOSE_GRADE : IMAGES.CHOOSE_GRADE}
        ADD_CODE
        title_bg="#112D70"
        className={styled.select_grade_box}
      >
        {isMobileOTP ? (
          <Box className={styled.container}>
            <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleToggleChange} style={{ width: '100%' }}>
              {gradeList.map((grade) => (
                <ToggleButton key={grade.index} value={grade.index} aria-label={grade.name} className={styled.selectGradeBtn}>
                  {grade.name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        ) : (
          <Box style={{ width: '100%', padding: '32px' }}>
            <Select
              list={gradeList}
              callback={callback}
              // value={(competition.item && competition.item.current_grade) || ''}
              value={pageData?.current_grade || ''}
              tag="grade-selector"
              label={gradeStrResolver(texts.SELECT_GRADE, competition)}
            />
          </Box>
        )}
      </IconPaper>
    </Grid>
  );
  return (
    <>
      <PageStructure
        welcome
        name={gradeStrResolver(isMobileOTP ? texts.SELECT_GRADE_KENYA_TITLE : texts.SELECT_GRADE, competition)}
        PageUI={PageUI}
      />
    </>
  );
};

export default ChangeGrade;
