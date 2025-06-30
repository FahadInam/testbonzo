import React, { useState, useEffect } from 'react';
import { useTheme, Grid, IconButton, makeStyles, Typography, Box } from '@material-ui/core';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { OnInputChange } from 'Utils';
import { Input, Button, H5, Subtitle2, ButtonText } from 'Components';
import Account from 'Actions/account.action';
import { AccountPopUp, User } from 'Actions';
import { InlineButton } from 'Components/Core/Button';
import { AccountNav } from 'Navigation/Paths';
import { PageSwitch } from 'Navigation';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { GetInstanceConfig } from 'Actions/config.action';

const useStyles = makeStyles((theme) => ({
  paddingTopZero: {
    paddingTop: '0px !important',
  },
  paddingBottomZero: {
    paddingBottom: '0px !important',
  },
}));

const LoginCore = ({ ShowAccountPopUp, isGuestUserOnMobile }) => {
  const classes = useStyles();
  const { texts } = useTheme();
  const user = User.Info();
  const directLaunchData = useSelector((state) => state.AppControl.url, shallowEqual);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const config = useSelector((state) => state.GetInstanceConfig, shallowEqual);
  const [login, setLogin] = useState({
    email: user.conEmail || '',
    password: user.autoLogin ? user.conPassword : '',
    autoLogin: !!user.autoLogin,
  });

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const isMobileOTP = Inst_config.is_mobile_otp;

  useEffect(() => {
    if (!config) {
      dispatch(GetInstanceConfig({}, texts));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  const callback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    switch (t) {
      case 'login':
        e.preventDefault();

        const updatedLogin = isMobileOTP ? { ...login, email: `+254${login.email}` } : login;

        dispatch(Account.Login(updatedLogin, texts, directLaunchData, '', isMobileOTP));
        break;
      case 'auto-login':
        setLogin({ ...login, autoLogin: e.target.checked });
        break;
      case 'forgot-pass':
        if (ShowAccountPopUp?.type === 'signIn') {
          AccountPopUp.Show({ type: 'forgotPassword', isVisible: true, comingFrom: 'guest', path: window?.location?.pathname });
        } else {
          const element = document.getElementById('turnstile-container');
          if (element) {
            element.remove();
          }
          PageSwitch(AccountNav.FORGOT_PASSWORD);
        }
        break;
      case 'email':
        if (isMobileOTP) {
          const numericValue = e.target.value.replace(/[^0-9]/g, '');
          OnInputChange({ name: t, value: numericValue }, login, setLogin);
        } else {
          OnInputChange({ name: t, value: e.target.value }, login, setLogin);
        }
        break;
      case 'password':
        OnInputChange({ name: t, value: e.target.value }, login, setLogin);
        break;

      default:
        break;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const updatedLogin = isMobileOTP ? { ...login, email: `+254${login.email}` } : login;
      dispatch(Account.Login(updatedLogin, texts, directLaunchData, '', isMobileOTP));
    }
  };

  useEffect(() => {
    if (user.autoLogin) {
      const updatedLogin = isMobileOTP ? { ...login, email: `+254${login.email}` } : login;
      dispatch(Account.Login(updatedLogin, texts, directLaunchData, '', isMobileOTP));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directLaunchData, dispatch, login, texts, user.autoLogin]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Grid container direction="row" spacing={2} onKeyDown={handleKeyPress}>
        <Grid item xs={12}>
          <H5 fontWeight="500" fontSize="24px" color="#313644">
            {texts.WELCOME_BACK}
          </H5>
        </Grid>
        {isMobileOTP ? (
          <Grid item xs={12} className="position-relative">
            <Box
              sx={{
                position: 'absolute',
                left: '23px',
                display: 'flex',
                top: '57px',
                alignItems: 'center',
                zIndex: 1,
              }}
            >
              <Typography variant="body1" className="poppins-font-600 country_code_text" align="left">
                +254
              </Typography>
            </Box>
            <Input
              label={texts.PHONE_LABEL}
              labelFontSize="16px"
              value={login.email}
              placeholder={texts.ENTER_PHONE}
              type={'tel'}
              tag="email"
              key="1"
              className={'phone_input'}
              onChange={callback}
            />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Input
              label={texts.EMAIL}
              labelFontSize="16px"
              placeholder={texts.ENTER_EMAIL}
              tag="email"
              value={login.email}
              onChange={callback}
              autoComplete
            />
          </Grid>
        )}
        <Grid item xs={12} className={classes.paddingBottomZero}>
          <Input
            label={texts.PASSWORD}
            labelFontSize="16px"
            placeholder={texts.ENTER_PASSWORD}
            type={showPassword ? 'text' : 'password'}
            value={login.password}
            tag="password"
            onChange={callback}
            autoComplete
            end={
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end" color="secondary">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            }
          />
        </Grid>

        {isGuestUserOnMobile && (
          <Grid item container justifyContent="flex-end" className={classes.paddingTopZero}>
            <InlineButton tag="forgot-pass" onClick={callback}>
              <Subtitle2 fontSize="14px" fontWeight="500" color="#313644">
                {texts.LOGIN_FOOTER}
              </Subtitle2>
            </InlineButton>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            dataSid="login"
            m={0}
            width="100%"
            tag="login"
            type="submit"
            background="#02BBFE"
            borderRadius={15}
            onClick={callback}
          >
            <ButtonText color="#fff" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
              {texts.LOG_IN}
            </ButtonText>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginCore;
