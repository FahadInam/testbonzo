import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Grid, useTheme, Box } from '@material-ui/core';
import { IconPaper, Select } from 'Components';
import { GetAllGradesList, SelectedCompetition, ChangeGrade as CG, GetCompetitionDetails, GetFtpCompetitions } from 'Actions';
import { Cordova, getInstanceType } from 'Utils';
import ConfirmationBox from 'Components/ConfirmationBox';
import { GoToLastPage } from 'Navigation';
import { gradeStrResolver } from 'Components/Stats';
import { PageStructure } from '../shared';
import useStyles from './style';
// import { gameDispatch } from 'Utils/ActionCreators';
import { IMAGES, PREMIUM_COMPETITION } from 'Constants';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { INSTANCES_ID } from 'Constants/instance.config';
import { gameDispatch } from 'Utils/ActionCreators';

const ChangeGrade = () => {
  const { texts } = useTheme();
  const dispatch = useDispatch();
  const params = useSelector((state) => state.AppControl.url, shallowEqual);
  const [currentGrade, setCurrentGrade] = useState({ selected: false, selectedGrade: 0 });
  const styled = useStyles();
  const competitionStr = useSelector((state) => state.Competition, shallowEqual);
  const competition = SelectedCompetition.StrToObj(competitionStr);
  const AllCompetitions = useSelector((state) => state.AllCompetitions, shallowEqual);
  const compDetail = useSelector((state) => state.GetCompetitionDetails, shallowEqual);
  const CompetitionName = params ? params.CompetitionName : '';
  const user_data = useSelector((state) => state.GetCompetitionsActivities, shallowEqual);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const [view, setView] = useState('');

  //console.log('IDHR');

  // const user = User.Info();
  const currentComp = SelectedCompetition.Info();
  const loadData = useCallback(() => {
    dispatch(GetCompetitionDetails(currentComp?.item?.enrolled, currentComp.item?.competition_id));
  }, [dispatch, currentComp]);

  const GlobalCom = useCallback(() => {
    if (setCurrentGrade && currentGrade.selected) setCurrentGrade({ ...currentGrade, selected: false });
    else GoToLastPage();
  }, [currentGrade]);

  useEffect(() => {
    if (Cordova.IsCordova) {
      window.MyBackButton = GlobalCom;
      window.myOnBeforeUnload = () => {
        window.MyBackButton = null;
      };
    }
  }, [GlobalCom]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(
      GetFtpCompetitions(AllCompetitions, competition.item ? competition.item.url : CompetitionName, texts.EVENT_NOT_FOUND, user_data)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (!competition.item || !competition.item.grades) return null;
  if (!compDetail || !compDetail.grades) return null;

  // const gradeList = GetAllGradesList(competition.item, texts.GRADE);
  const gradeList = GetAllGradesList(compDetail, texts.GRADE);
  if (gradeList.length === 0) return null;
  //console.log('current_grade--->', compDetail.current_grade);

  const callback = (e, item) => {
    //console.log(e, item);

    const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag');
    // console.log(t);
    switch (t) {
      case 'grade-selector':
        if (competition.user_id !== 0 && compDetail.current_grade !== item.index) {
          setCurrentGrade({ selected: true, selectedGrade: item.index });
        } else if (compDetail.current_grade !== item.index) {
          setCurrentGrade({ selected: false, selectedGrade: item.index });
          dispatch(
            CG(
              competition,
              currentGrade.selectedGrade,
              AllCompetitions.competitions.length === 1,
              null,
              compDetail?.school_id,
              user_data,
              currentComp.item?.competition_id
            )
          );
        }

        break;
      case 'grade-change-positive':
        console.log('grade-change-positive');
        //return;
        dispatch(
          CG(
            competition,
            currentGrade.selectedGrade,
            competition.isOnlyCompetition,
            null,
            compDetail?.school_id,
            user_data,
            currentComp.item?.competition_id
          )
        );
        setCurrentGrade({ ...currentGrade, selected: false });
        gameDispatch(PREMIUM_COMPETITION.CLEAR_DATA, competition);
        // gameDispatch(API_CALLS.GetCompetitionsLeaderboard.CLEAR);
        break;
      case 'close':
      case 'overlay':
      case 'grade-change-negative':
        setCurrentGrade({ selected: false, selectedGrade: 0 });
        setView(0);
        //   setCurrentGrade({ ...currentGrade, selected: false });
        break;
      default:
        break;
    }
  };

  const handleToggleChange = (event, newView) => {
    // console.log(event, 'selected btn--->', newView);
    setView(newView);
    setCurrentGrade({ selected: true, selectedGrade: newView });
    // if (newView) {
    //   const selectedGrade = gradeList.find((grade) => grade.index === newView);
    //   if (selectedGrade) {
    //     callback(event, selectedGrade); // Trigger the callback with the selected grade
    //   }
    //   if (competition.user_id !== 0 && compDetail.current_grade !== newView) {
    //     setCurrentGrade({ selected: true, selectedGrade: newView });
    //   } else if (compDetail.current_grade !== newView) {
    //     setCurrentGrade({ selected: false, selectedGrade: newView });
    //     dispatch(
    //       CG(
    //         competition,
    //         // currentGrade.selectedGrade,
    //         newView,
    //         AllCompetitions.competitions.length === 1,
    //         null,
    //         compDetail?.school_id,
    //         user_data,
    //         currentComp.item?.competition_id
    //       )
    //     );
    //   }
    //   setView(newView); // Update the state with the selected view
    // }
  };

  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);
  // console.log(isShupavu);
  const PageUI = (
    <Grid item xs={12}>
      <IconPaper
        // icon="grade"
        title={gradeStrResolver(texts.CHANGE_GRADE, competition)}
        fixWidth
        addCodeIcon={isShupavu ? IMAGES.OTP_CHOOSE_GRADE : IMAGES.CHOOSE_GRADE}
        ADD_CODE
        title_bg="#112D70"
        className={styled.select_grade_box}
      >
        {/* <Box style={{ width: '100%', padding: '32px' }}>
          <Select
            list={gradeList}
            callback={callback}
            value={compDetail?.current_grade || ''}
            tag="grade-selector"
            label={gradeStrResolver(texts.SELECT_GRADE, competition)}
          />
        </Box> */}

        {isShupavu ? (
          <Box className={styled.container}>
            <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleToggleChange} style={{ width: '100%' }}>
              {gradeList.map((grade) => (
                <ToggleButton
                  key={grade.index}
                  value={grade.index}
                  aria-label={grade.name}
                  //className={styled.selectGradeBtn}
                  className={`${styled.selectGradeBtn} ${grade.index === compDetail.current_grade ? styled.current_grade : ''}`}
                  disabled={grade.index === compDetail.current_grade}
                >
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
              value={compDetail?.current_grade || ''}
              tag="grade-selector"
              label={gradeStrResolver(texts.SELECT_GRADE, competition)}
            />
          </Box>
        )}
      </IconPaper>
    </Grid>
  );

  const secondaryText = (
    <>
      <span className={styled.earningLost}>{texts.LOST_EARNING}</span>
    </>
  );
  return (
    <>
      <ConfirmationBox
        visible={currentGrade.selected}
        callback={callback}
        // icon="grade"
        allowClose
        hideCross
        primary={gradeStrResolver(texts.CHANGE_GRADE_SURE, competition)}
        secondary={secondaryText}
        positive={texts.CHANGE}
        negative={texts.CANCEL}
        tag="grade-change"
        title={gradeStrResolver(texts.SELECT_GRADE, competition)}
        addCodeIcon={IMAGES.WARNING}
        ADD_CODE
        className={styled.confirmation_box}
        buttonsContainer={styled.sign_out_buttons_container}
      />
      <PageStructure
        name={gradeStrResolver(isShupavu ? texts.SELECT_GRADE_KENYA_TITLE : texts.SELECT_GRADE, competition)}
        PageUI={PageUI}
      />
    </>
  );
};

export default ChangeGrade;
