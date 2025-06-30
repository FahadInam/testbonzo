import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { DefaultNav, CompetitionNav } from 'Navigation/Paths';
import { SelectedCompetition, User } from 'Actions';
import { IsEmptyObject } from 'Utils';
import { CompetitionPathResolver } from 'Navigation';

const DefaultRoute = React.memo(({ component: Component, ...rest }) => {
  const competition = SelectedCompetition.Info();
  const isAuthUser = User.IsLoggedInUser();
  let redirectTo = DefaultNav.MAIN.link;
  if (isAuthUser) {
    if (!competition || IsEmptyObject(competition) || (competition && !competition.isOnlyCompetition))
      redirectTo = DefaultNav.COMPETITIONS.link;
    else {
      const eventPath = CompetitionPathResolver(CompetitionNav.COMPETITION_HOME, competition);
      if (eventPath) redirectTo = eventPath;
    }
  }

  return <Route {...rest} render={props => (!isAuthUser ? <Component {...props} /> : <Redirect to={redirectTo} />)} />;
});

export default DefaultRoute;
