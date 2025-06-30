import React from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';
import { Grid, makeStyles } from '@material-ui/core';
import { AccountNav, DefaultNav } from 'Navigation/Paths';
import AnimatedSwitcher from 'Hoc/AnimatedSwitcher';
import LoginMobile from './Login/LoginMobile';
import SignUpMobile from './SignUp/SignUpMobile';
import ForgotPasswordMobile from './ForgotPassword/ForgotPasswordMobile';

const useStyles = makeStyles(() => ({
  account: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
}));

const AccountSwitchMobileType = () => {
  const { state } = useLocation();
  const styled = useStyles();
  return (
    <Grid item className={styled.account}>
      <AnimatedSwitcher state={state}>
        <Route path={AccountNav.FORGOT_PASSWORD.link} component={ForgotPasswordMobile} />
        <Route path={AccountNav.LOGIN.link} component={LoginMobile} />
        <Route path={AccountNav.SIGN_UP.link} component={SignUpMobile} />
        <Route exact path={DefaultNav.MAIN.link} component={LoginMobile} />
        {/* Default */}
        <Route exact path={DefaultNav.ACCOUNT.link} component={LoginMobile} />
        <Route render={() => <Redirect to={DefaultNav.MAIN.link} />} />
      </AnimatedSwitcher>
    </Grid>
  );
};

export default AccountSwitchMobileType;
