import React from 'react';
import { RoundedIconButton } from 'Components/Core/Button';
import { Grid, useTheme } from '@material-ui/core';
import ThirdPartyLogin from 'Actions/third.party.logins.actions';
import { useDispatch } from 'react-redux';

const MobileSocialLogin = React.memo(({ texts, autoLogin }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const callback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag');
    switch (t) {
      case 'google':
        dispatch(ThirdPartyLogin.LoginGoogle(texts, autoLogin));
        break;
      case 'facebook':
        dispatch(ThirdPartyLogin.LoginFacebook(texts, autoLogin));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid container item xs={12} justifyContent="center">
          {texts.OR_LOGIN_USING}
        </Grid>
        <Grid container item xs={6} justifyContent="flex-end">
          <RoundedIconButton tag="google" background={palette.common.google} onClick={callback} iconName="i i-google" />
        </Grid>
        <Grid container item xs={6} justifyContent="flex-start">
          <RoundedIconButton
            tag="facebook"
            background={palette.common.facebook}
            onClick={callback}
            iconName="i i-facebook"
          />
        </Grid>
      </Grid>
    </>
  );
});

export default MobileSocialLogin;
