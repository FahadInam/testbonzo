import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { COMPETITION } from 'Constants';
import { gameDispatch } from 'Utils/ActionCreators';
import { SelectedCompetition, AppControl, User } from 'Actions';
// import { LocalStorage } from 'Utils';

const ChallengeRoute = React.memo(({ component: Component, ...rest }) => {
  const competition = SelectedCompetition.Info();
  const user = User.Info();

  const challenge = useSelector((rState) => rState.Challenge, shallowEqual);
  // // TODO remove all of it
  // if (process.env.NODE_ENV === 'development') {
  //   if (challenge) {
  //     delete challenge.endIcon;
  //     LocalStorage.Set('tempVal', challenge);
  //   } else {
  //     challenge = JSON.parse(LocalStorage.Get('tempVal'));
  //   }
  // } else {
  //   LocalStorage.Delete('tempVal');
  // }
  // // TODO remove all of it

  useEffect(() => {
    if (competition.item && competition.item.theme) AppControl.SetTheme(competition.item.theme);
  }, [competition]);

  useEffect(() => {
    if (!challenge) {
      // It's anomaly, should clear all pages and challenge data from redux
      SelectedCompetition.GotoCompetition();

      //console.log('CLEAR PAGES');

      gameDispatch(COMPETITION.CLEAR_PAGES);
    }
  }, [challenge]);
  return !challenge ? null : (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={(props) => (
        <Component
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          competition={{ ...competition.item }}
          // games={{ ...competition.games }}
          challenge={challenge}
          me={user}
        />
      )}
    />
  );
});

export default ChallengeRoute;
