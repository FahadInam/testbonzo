import React, { useEffect } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { DefaultNav, ChallengeNav } from 'Navigation/Paths';
import PrivateRoute from 'Hoc/PrivateRoute';
import { SelectedCompetition, Toast } from 'Actions';
import AuthorizationCheckRoute from 'Hoc/AuthorizationCheckRoute';
import { ALERT } from 'Constants';
import { useTheme } from '@material-ui/core';
import DefaultRoute from 'Hoc/DefaultRoute';

import CompetitionStack from 'Stacks/Competition/CompetitionStack';
import AccountStack from 'Stacks/Account/AccountStack';
import ChallengeStack from 'Stacks/Challenge/ChallengeStack';
import SettingsStack from 'Stacks/Settings/SettingsStack';
import CodePushLoader from 'Stacks/Settings/CodePushLoader/CodePushLoader';

import { history } from '../Navigation';

const DefaultMobileStack = React.memo(() => {
  const queryString = window.location.search;

  // Parse query parameters
  const urlParams = new URLSearchParams(queryString);
  const paramValue = urlParams.get('debug');
  const { texts } = useTheme();

  useEffect(() => {
    return history.listen((location) => {
      if (history.action !== 'REPLACE') {
        switch (location.pathname) {
          case ChallengeNav.CHALLENGE_START.link:
          case ChallengeNav.CHALLENGE_PLAYER.link:
            // should clear all pages and challenge data from redux
            SelectedCompetition.GotoCompetition();
            break;
          default:
            break;
        }
      }
      if (history.action === 'POP') {
        switch (location.pathname) {
          case ChallengeNav.CHALLENGE_RESULT.link:
            // should clear all pages and challenge data from redux
            SelectedCompetition.GotoCompetition();
            Toast.Show(texts.SELECT_FIRST_MATCH, ALERT.INFO, true);
            break;
          case ChallengeNav.CHALLENGE_SELECTION.link:
            // should clear all pages and challenge data from redux
            SelectedCompetition.GotoCompetition();
            Toast.Show(texts.SELECT_CHALLENGE_TYPE, ALERT.INFO, true);
            break;
          default:
            break;
        }
      }
    });
  }, [texts]);

  useEffect(() => {
    //  console.log(paramValue, 'params');
    // Ensure vConsole is available
    if (window.VConsole && paramValue) {
      // eslint-disable-next-line
      const vConsole = new window.VConsole();
      console.log('vConsole initialized');
    } else {
      console.error('vConsole not found');
    }
  }, [paramValue]);

  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute path={DefaultNav.CHALLENGE.link} component={ChallengeStack} />
        <PrivateRoute path={DefaultNav.SETTINGS.link} component={SettingsStack} />
        <PrivateRoute path={DefaultNav.COMPETITIONS.link} component={CompetitionStack} />
        <Route path={DefaultNav.CODE_PUSH_LOADER.link} component={CodePushLoader} />
        <AuthorizationCheckRoute path={[DefaultNav.MAIN.link, DefaultNav.ACCOUNT.link]} component={AccountStack} />
        <Route path={DefaultNav.CHALLENGE.link} component={ChallengeStack} />
        <Route render={() => <DefaultRoute />} />
      </Switch>
    </Router>
  );
});

export default DefaultMobileStack;
