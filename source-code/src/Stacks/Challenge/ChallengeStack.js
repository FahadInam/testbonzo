import React, { useEffect } from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';
import { Grid, makeStyles } from '@material-ui/core';
import { ChallengeNav, DefaultNav } from 'Navigation/Paths';
import AnimatedSwitcher from 'Hoc/AnimatedSwitcher';
import ChallengeRoute from 'Hoc/ChallengeRoute';
import Cordova from 'Utils/Cordova';
import McdUser from 'Utils/McdUser';
import { AccountPopUp } from 'Actions';
import { shallowEqual, useSelector } from 'react-redux';
import CompAccountSwitchType from '../Competition/CompAccountSwitchType';
import { TutorialPlayer, ChallengeResult, ChallengePlayer, ChallengeStart, ChallengeSelection } from '.';

const useStyles = makeStyles(() => ({
  root: {
    height: 'inherit',
    overflow: 'hidden',
    flexDirection: 'row',
  },
}));

const ChallengeStack = () => {
  const { state } = useLocation();
  const ShowAccountPopUp = useSelector((state) => state.AppControl.accountPopup, shallowEqual);
  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  const styled = useStyles();

  useEffect(() => {
    return function cleanup() {
      if (IsMcdUser) {
        McdUser.SetPortrait();
        McdUser.ToggleFullScreen(false);
      }
      Cordova.SetPortrait();
      Cordova.ShowStatusbar();
    };
  }, [IsMcdUser]);

  const callback = () => {
    AccountPopUp.Hide({ isVisible: false });
  };

  return (
    <Grid container className={styled.root}>
      <CompAccountSwitchType
        ShowAccountPopUp={ShowAccountPopUp}
        callback={callback}
        accountRef={Boolean(ShowAccountPopUp?.isVisible)}
      />
      <AnimatedSwitcher state={state} Animate={true}>
        <ChallengeRoute path={ChallengeNav.TUTORIAL_PLAYER.link} component={TutorialPlayer} />
        <ChallengeRoute path={ChallengeNav.CHALLENGE_RESULT.link} component={ChallengeResult} />
        <ChallengeRoute path={ChallengeNav.CHALLENGE_PLAYER.link} component={ChallengePlayer} />
        <ChallengeRoute exact path={ChallengeNav.CHALLENGE_START.link} component={ChallengeStart} />
        <ChallengeRoute exact path={ChallengeNav.CHALLENGE_SELECTION.link} component={ChallengeSelection} />
        <Route render={() => <Redirect to={DefaultNav.MAIN.link} />} />
      </AnimatedSwitcher>
    </Grid>
  );
};

export default ChallengeStack;
