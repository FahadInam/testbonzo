import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
// import { SUPPORTED_THEMES } from 'Theme';
import { parseSearchURL } from 'Utils';
// import { AppControl } from 'Actions';
import Account from 'Actions/account.action';
import { PageSwitch } from 'Navigation';
import { DefaultNav } from 'Navigation/Paths';
import PageStructure from '../shared/PageStructure';

const Sso = () => {
  const SsoData = parseSearchURL();
  const dispatch = useDispatch();
  if (SsoData.authToken && SsoData.pl && SsoData.user) {
    const { authToken, pl, user } = SsoData;
    // console.log(authToken, pl, user);
    dispatch(Account.SsoLogin({ authToken, pl, user }));
  }
  useEffect(() => {
    // AppControl.SetTheme(SUPPORTED_THEMES.BLUE);
    PageSwitch(DefaultNav.MAIN);
  }, []);

  const PageUI = <Grid item xs={12} />;
  return (
    <>
      <PageStructure welcome PageUI={PageUI} />
    </>
  );
};

export default Sso;
