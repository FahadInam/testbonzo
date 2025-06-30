import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { SUPPORTED_THEMES } from 'Theme';
import { DefaultNav } from 'Navigation/Paths';
import { PageSwitch } from 'Navigation';

import { AppControl, SelectedCompetition } from 'Actions';
import { Cordova } from 'Utils';
import { Home } from '.';
import AccountSwitchType from './AccountSwitchType';
import AccountSwitchMobileType from './AccountSwitchMobileType';
import { shallowEqual, useSelector } from 'react-redux';

const AccountStack = () => {
  const [accountRef, setAccountRef] = useState(false);
  const [launched, setLaunched] = useState(false);
  const directLaunchData = useSelector((state) => state.AppControl.url, shallowEqual);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const { pathname } = useLocation();

  useEffect(() => {
    Cordova.ShowWhiteStatusbar();
  }, []);

  useEffect(() => {
    if (!launched) {
      SelectedCompetition.Clear();
      AppControl.SetTheme(SUPPORTED_THEMES.LIGHT);
      setLaunched(true);
    }
    if (pathname !== DefaultNav.MAIN.link) {
      setAccountRef(true);
    } else {
      setAccountRef(false);
    }
  }, [launched, pathname]);

  const callback = () => {
    if (Inst_config.navigate_to_public_route) {
      window.location.href = Inst_config.account_back_url;
    } else {
      setAccountRef(false);
      PageSwitch(Inst_config.account_back_url);
    }
  };

  return (
    <>
      {process.env.REACT_APP_IS_APP === '0' ? (
        <>
          <AccountSwitchType callback={callback} accountRef={accountRef} directLaunchData={directLaunchData} />
          {/* <Home /> */}
          <Home />
        </>
      ) : (
        <AccountSwitchMobileType callback={callback} accountRef={accountRef} />
      )}
    </>
  );
};

export default AccountStack;
