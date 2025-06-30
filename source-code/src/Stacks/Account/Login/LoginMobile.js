import React, { useState, useEffect } from 'react';
import { useTheme, Box, Button } from '@material-ui/core';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { OnInputChange } from 'Utils';
import { InlineButton, OutlinedButton } from 'Components/Core/Button';
import { PageSwitch } from 'Navigation';
import AccountNav from 'Navigation/Paths/account.constants';
import Account from 'Actions/account.action';
import { User } from 'Actions';
import MobileSocialLogin from 'Components/SocialLogin/MobileSocialLogin';
import OsProperties from 'Utils/OsProperties';
import LoginCore from './LoginCore';
import useStyles from '../shared/AnimatedBgStyle';
import MobilePageStructure from '../shared/MobilePageStructure';
import 'Assets/css/home_mobile.css';

const LoginMobile = () => {
  const { texts } = useTheme();
  const user = User.Info();
  const styled = useStyles();
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isMobileOTP = Inst_config.is_mobile_otp;
  const [login, setLogin] = useState({
    email: user.conEmail || '',
    password: user.autoLogin ? user.conPassword : '',
    autoLogin: !!user.autoLogin,
  });

  const dispatch = useDispatch();
  const callback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    switch (t) {
      case 'login':
        e.preventDefault();
        dispatch(Account.Login(login, texts, {}, '', isMobileOTP));
        break;
      case 'facebook':
        break;
      case 'google':
        PageSwitch(AccountNav.SIGN_UP);
        break;
      case 'forgot-pass':
        PageSwitch(AccountNav.FORGOT_PASSWORD);
        break;
      case 'auto-login':
        setLogin({ ...login, autoLogin: e.target.checked });
        break;
      case 'email':
      case 'password':
        OnInputChange({ name: t, value: e.target.value }, login, setLogin);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (user.autoLogin) {
      dispatch(Account.Login(login, texts, {}, '', isMobileOTP));
    }
  }, [dispatch, login, texts, user.autoLogin, isMobileOTP]);

  return (
    <>
      <Box className={styled.rootX2}>
        <Box className={styled.rootY2}>
          <MobilePageStructure hideHeader Top>
            <LoginCore />
            <Box className={styled.guestBtn}>
              <OutlinedButton
                tag="cont-guest"
                onClick={() => {
                  // dispatch(Account.GuestEntrance());
                }}
              >
                {texts.CONTINUE_AS_GUEST}
              </OutlinedButton>
            </Box>

            {!OsProperties.IsIos() && (
              <>
                <Box mb={2} />
                <MobileSocialLogin texts={texts} autoLogin />
              </>
            )}
            <Box mt={1} textAlign="center">
              <InlineButton tag="forgot-pass" onClick={callback}>
                {texts.LOGIN_FOOTER}
              </InlineButton>
            </Box>

            <Box mb={2} textAlign="center">
              {texts.SUPPORTED_CREDENTIALS}
            </Box>
            <Box mb={12} className={styled.gapToNotShowInLargeScreen} />

            <Box mt={2} className={styled.createNewAccountRow}>
              <Button
                className={styled.createNewAccountLink}
                tag="signUp"
                onClick={() => {
                  PageSwitch(AccountNav.SIGN_UP);
                }}
              >
                {texts.CREATE_NEW_ACCOUNT}
              </Button>
            </Box>
          </MobilePageStructure>
        </Box>
      </Box>
    </>
  );
};

export default LoginMobile;
