import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Account, User } from 'Actions';
import { DefaultNav } from 'Navigation/Paths';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { DEMO_USER } from 'Constants';
import { useTheme } from '@material-ui/core';
import { getInstanceType } from 'Utils';
import { INSTANCES_ID } from 'Constants/instance.config';
// import { PageSwitch } from 'Navigation';

const PrivateRoute = ({ component: Component, isGuestModeAllowed, ...rest }) => {
  // const isAuthUser = User.IsLoggedInUser() || User.IsGuest();
  const isAuthUser = User.IsLoggedInUser() ? true : false;
  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  const dispatch = useDispatch();
  const { texts } = useTheme();

  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);
  const config = useSelector((state) => state.GetInstanceConfig, shallowEqual);

  window.isCompLauch = false;
  if (isGuestModeAllowed && !isAuthUser && !IsMcdUser) {
    window.isCompLauch = true;
    const currentUrl = window.location.href;
    const lastPart = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    window.compUrl = lastPart;
    if (config) {
      dispatch(
        Account.GuestLogin({ email: DEMO_USER.email, password: DEMO_USER.password, mode: DEMO_USER.mode, url: lastPart }, texts)
      );
    }
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: isGlobalClimate ? DefaultNav.PROGRAM_GLC.link : DefaultNav.MAIN.link,
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
