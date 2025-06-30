import React from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import { AccountModal, ConfirmationBox } from 'Components';
import { AccountNav, DefaultNav } from 'Navigation/Paths';
import AnimatedSwitcher from 'Hoc/AnimatedSwitcher';
import { Login, ForgotPassword, Signup } from '.';
import InstitutionDetail from './SignUp/InstitutionDetail';
import Verify from './verify/Verify';
import { getInstanceType } from 'Utils';
import { shallowEqual, useSelector } from 'react-redux';
import { INSTANCES_ID } from 'Constants/instance.config';

const useStyles = makeStyles((theme) => ({
  modal: {
    height: (props) => props.height || '510px',
    padding: 0,
    maxHeight: '100%',
    // [theme.breakpoints.down('md')]: {
    //   marginTop: '10%',
    // },
    // [theme.breakpoints.down('sm')]: {
    //   marginTop: '15%',
    // },
  },
  account: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
}));

const AccountSwitchType = ({ accountRef, callback, directLaunchData }) => {
  const { pathname, state } = useLocation();
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const Instance_config = useSelector((state) => state.GetInstanceConfig, shallowEqual);
  const isMdOrLess = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  // let height = 675;

  let height;
  if (isMdOrLess) {
    height = 740;
    if (pathname === AccountNav.LOGIN.link) height = 660;
  } else {
    height = 690;
    if (pathname === AccountNav.LOGIN.link) height = 625;
  }

  //const isMobileOTP = Inst_config.is_mobile_otp;
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);
  //console.log(isMobileOTP, isShupavu, 'Both Status');

  if (pathname === AccountNav.FORGOT_PASSWORD.link) height = 515;
  if (pathname === AccountNav.INSTITUTE_DETAIL.link) height = 665;
  // if (pathname === AccountNav.SIGN_UP.link) height = Instance_config.is_2fa_enabled ? 700 : 625;
  if (pathname === AccountNav.SIGN_UP.link) {
    if (isShupavu) {
      height = 600;
    } else {
      height = Instance_config?.is_2fa_enabled === 0 ? 700 : 625;
    }
  }

  if (pathname === AccountNav.VERIFY.link) {
    if (isShupavu) {
      height = 630;
    } else {
      height = 515;
    }
  }

  const styled = useStyles({ height: `${height}px` });

  return (
    <AccountModal callback={callback} isVisible={accountRef} isMandatory={directLaunchData ? true : false}>
      <ConfirmationBox isVisible={accountRef} callback={callback} className={styled.modal} allowClose={false}>
        <Grid item className={styled.account}>
          <AnimatedSwitcher state={state}>
            <Route path={AccountNav.FORGOT_PASSWORD.link} component={ForgotPassword} />
            <Route path={AccountNav.SIGN_UP.link} component={Signup} />
            <Route path={AccountNav.VERIFY.link} component={Verify} />
            <Route path={AccountNav.INSTITUTE_DETAIL.link} component={InstitutionDetail} />
            <Route path={AccountNav.LOGIN.link} component={Login} />

            <Route exact path={DefaultNav.MAIN.link} component={Signup} />
            {/* Default */}
            <Route exact path={DefaultNav.ACCOUNT.link} component={Signup} />
            <Route render={() => <Redirect to={DefaultNav.MAIN.link} />} />
          </AnimatedSwitcher>
        </Grid>
      </ConfirmationBox>
    </AccountModal>
  );
};

export default AccountSwitchType;
