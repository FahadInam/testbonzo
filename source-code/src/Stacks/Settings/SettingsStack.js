import React, { useEffect } from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';
import { Grid, makeStyles } from '@material-ui/core';
import { useSelector, shallowEqual } from 'react-redux';

import { SettingsNav, DefaultNav } from 'Navigation/Paths';
import AnimatedSwitcher from 'Hoc/AnimatedSwitcher';
import { AppControl, SelectedCompetition } from 'Actions';

import { ChangePassword, Profile, JoinCompetition, SelectSchool, ChangeGrade, Congrats } from '.';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'inherit',
    overflow: 'hidden',
    background: theme.palette.background.default,
    flexDirection: 'row',
  },
  view: {
    minHeight: 'inherit',
    overflow: 'hidden',
    flex: '1 1 auto',
    background: theme.palette.common.green,
  },
}));

const SettingsStack = () => {
  const { state1 } = useLocation();
  const styled = useStyles();
  const competitionStr = useSelector((state) => state.Competition, shallowEqual);
  const competition = SelectedCompetition.StrToObj(competitionStr);
  useEffect(() => {
    if (competition.item && competition.item.theme) {
      AppControl.SetTheme(competition.item.theme);
    }
  }, [competition]);
  return (
    <>
      <Grid container className={styled.root}>
        <Grid item className={styled.view}>
          <AnimatedSwitcher state={state1} Animate={true}>
            <Route exact path={SettingsNav.ACCOUNT_MIGRATED.link} component={Congrats} />
            <Route exact path={SettingsNav.JOIN_COMPETITION.link} component={JoinCompetition} />
            <Route exact path={SettingsNav.SELECT_SCHOOL.link} component={SelectSchool} />
            <Route exact path={SettingsNav.CHANGE_GRADE.link} component={ChangeGrade} />
            <Route path={SettingsNav.CHANGE_PASSWORD.link} component={ChangePassword} />

            <Route exact path={DefaultNav.SETTINGS.link} component={Profile} />

            <Route exact render={() => <Redirect to={DefaultNav.MAIN.link} />} />
          </AnimatedSwitcher>
        </Grid>
      </Grid>
    </>
  );
};

export default SettingsStack;
