import React, { useEffect } from 'react';
import { parseSearchURL } from 'Utils';
import { PageSwitch } from 'Navigation';
import { AccountNav, DefaultNav } from 'Navigation/Paths';
import { AppControl } from 'Actions';

const DirectLaunch = () => {
  const UrlParams = parseSearchURL();
  useEffect(() => {
    // console.log(UrlParams);
    if (UrlParams.id) {
      AppControl.Params(UrlParams);
      PageSwitch(AccountNav.SIGN_UP);
    } else {
      PageSwitch(DefaultNav.MAIN);
    }
  }, [UrlParams]);

  return <div />;
};

export default DirectLaunch;
