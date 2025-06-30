import React from 'react';
import LoginWithGoogle from './LoginWithGoogle';
import { Grid } from '@material-ui/core';
import LoginWithLMS from './LoginWithLMS';
import { shallowEqual, useSelector } from 'react-redux';

const WebSocialLogin = React.memo(({ texts, autoLogin, checkDirectLaunch, publicLogin }) => {
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);

  return (
    <>
      <Grid container direction="row" spacing={1}>
        {publicLogin && Inst_config?.lms_login_enabled && (
          <Grid item xs={12} md={6}>
            <LoginWithLMS text={texts} autoLoad={false} autoLogin={autoLogin} />
          </Grid>
        )}
        <Grid item xs={12} md={publicLogin && Inst_config?.lms_login_enabled ? 6 : 12}>
          <LoginWithGoogle text={texts} autoLoad={false} autoLogin={autoLogin} />
        </Grid>
        {/* <Grid item xs={6} md={12}>
          <LoginWithFacebookStandAlone text={texts} callback={handleFacebookLogin} />
        </Grid> */}
      </Grid>

      {/* {checkDirectLaunch && <LoginWithFacebookStandAlone text={texts.LOGIN_USING_FACEBOOK} autoLogin={autoLogin} />} */}
    </>
  );
});

export default WebSocialLogin;
