import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTheme, Box, Grid } from '@material-ui/core';
import { Button, ButtonText, IconPaper, TAutoComplete } from 'Components';
import { IMAGES, PAGE_STATE, config } from 'Constants';
import { PageSwitch } from 'Navigation';
import { SettingsNav } from 'Navigation/Paths';
import { SelectedCompetition, GetCompetitionDetails } from '../../../Actions';
import PageStructure from '../shared/PageStructure';
import useStyles from './style';
import SchoolLoader from './SchoolLoader';
import { sortArrayWithOther } from 'Utils';

const SelectSchool = React.memo(() => {
  const { texts } = useTheme();
  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI;
  let PreLoader = null;
  const [apiCall, setApiCall] = useState(false);
  const [schoolSelectRef, setSchoolSelectRef] = useState({ index: -1, name: '', anchor: null });
  const styled = useStyles();
  const dispatch = useDispatch();
  const pageData = useSelector((state) => state.GetCompetitionDetails, shallowEqual);
  // const user = User.Info();
  const currentComp = SelectedCompetition.Info();

  useEffect(() => {
    return () => setApiCall(false);
  }, []);

  const loadData = useCallback(() => {
    dispatch(GetCompetitionDetails(currentComp?.item?.enrolled, currentComp.item?.competition_id));
  }, [dispatch, currentComp]);

  useEffect(() => {
    if (!pageData && !apiCall) loadData();
    setApiCall(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData, loadData]);

  useEffect(() => {
    if (pageData?.schools && schoolSelectRef.index === -1) {
      setSchoolSelectRef({ index: pageData.schools[0]?.id, name: pageData.schools[0]?.name });
      //setSchoolSelectRef({ index: pageData.schools[0].id, name: pageData.schools[0].name });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData]);

  if (!pageData) {
    PageState = PAGE_STATE.IS_LOADING;
    PreLoader = [0].map((item) => {
      return <SchoolLoader key={item} />;
    });
  } else if (pageData.shouldRetry) {
    PageState = PAGE_STATE.RETRY;
  } else if (pageData.schools.length === 0) {
    PageState = PAGE_STATE.NO_DATA_TO_SHOW;
  } else {
    PageState = PAGE_STATE.LOADED;
    const SchoolList = [];
    const SchoolData = sortArrayWithOther(pageData.schools);

    for (let i = 0; i < SchoolData.length; i++) {
      SchoolList.push({
        index: SchoolData[i].id,
        name: SchoolData[i].name,
      });
    }

    // SchoolList = sortArrayWithOther(SchoolList);
    // console.log(SchoolList, 'SchoolList');
    const callback = (e, item) => {
      const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag') || e.target.name;
      switch (t) {
        case 'continue':
          if (schoolSelectRef.index !== -1) {
            config.school_id = schoolSelectRef.index;
            PageSwitch(SettingsNav.CHANGE_GRADE);
          }
          break;
        case 'selected-item':
          setSchoolSelectRef({ index: item.index, name: item.name, anchor: null });
          break;
        default:
          break;
      }
    };

    PageUI = (
      <Grid item xs={12} className={`sSelectSchool ${styled.row}`}>
        <IconPaper
          // icon="school"
          fixWidth
          addCodeIcon={IMAGES.SELECT_SCHOOL}
          ADD_CODE
          allowClose
          hideCross
          title_bg="#112D70"
          title={texts.SELECT_SCHOOL}
          className={styled.select_school_box}
        >
          {/* <Box mb={2} textAlign="center">
            <Body2>{texts.SELECT_SCHOOL}</Body2>
          </Box> */}
          <Box style={{ width: '100%', padding: '28px' }}>
            <TAutoComplete
              label="Please select your school"
              list={SchoolList}
              callback={callback}
              value={schoolSelectRef.index === -1 ? '' : { index: schoolSelectRef.index, name: schoolSelectRef.name }}
              tag="selected-item"
            />
          </Box>
          <Box textAlign="center" mb={3} mt={2}>
            <Button mb={0} mt={0} tag="continue" type="submit" onClick={callback}>
              <ButtonText color="#fff" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
                {texts.CONTINUE}
              </ButtonText>
            </Button>
          </Box>
          {/* <Box mb={2} /> */}
        </IconPaper>
      </Grid>
    );
  }

  return (
    <PageStructure
      headerSet={{
        showRight: false,
        showLeft: true,
        leftTitle: texts.BACK,
      }}
      // welcome
      name={currentComp.item.name}
      PageUI={PageUI}
      PageState={PageState}
      PreLoader={PreLoader}
    />
  );
});

export default SelectSchool;
