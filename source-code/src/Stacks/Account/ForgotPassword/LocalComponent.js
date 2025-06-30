import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTheme, Box, Grid } from '@material-ui/core';

import { Button, Body1, H2, H5, ButtonText } from 'Components';
import { PageSwitch } from 'Navigation';
import AccountNav from 'Navigation/Paths/account.constants';

// import { InlineButton } from 'Components/Core/Button';
// import { AccountPopUp } from 'Actions';
import useStyles from './style';
import FormStructure from './FormStructure';
import ResetPassword from './ResetPassword';
import AccountFooter from '../shared/AccountFooter';
import { shallowEqual, useSelector } from 'react-redux';
// import { InlineButton } from 'Components/Core/Button';
// ShowAccountPopUp --> commented

export const ForgotPasswordUI = ({ callback, setForgotPasswordEmail }) => {
  const classes = useStyles();
  const ShowAccountPopUp = useSelector((state) => state.AppControl.accountPopup, shallowEqual);
  const Login_Type = useSelector((state) => state.LoginType.is_inst_based, shallowEqual);
  // console.log('ShowAccountPopUp', ShowAccountPopUp);

  const { texts } = useTheme();

  const [showForgotStep1, setShowForgotStep1] = useState(false);
  const [showForgotStep2, setShowForgotStep2] = useState(false);
  const [userId, setUserId] = useState('');
  const [changeCode, setChangeCode] = useState('');

  // const localCallback = (e) => {
  //   const t = e.currentTarget.getAttribute('data-tag') || e.target.name;

  //   switch (t) {
  //     case 'create-new-account':
  //       if (ShowAccountPopUp?.type === 'forgotPassword') {
  //         AccountPopUp.Show({ type: 'signUp', isVisible: true, comingFrom: 'guest', path: window?.location?.pathname });
  //       } else {
  //         PageSwitch(AccountNav.SIGN_UP);
  //       }
  //       break;
  //     case 'login':
  //       if (ShowAccountPopUp?.type === 'forgotPassword') {
  //         AccountPopUp.Show({ type: 'signIn', isVisible: true, comingFrom: 'guest', path: window?.location?.pathname });
  //       } else {
  //         PageSwitch(AccountNav.LOGIN);
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userIdParam = urlParams.get('id');
    const changeCodeParam = urlParams.get('change_code');

    if (userIdParam !== null && userIdParam !== '' && changeCodeParam !== null && changeCodeParam !== '') {
      setShowForgotStep2(true);
      setUserId(userIdParam);
      setChangeCode(changeCodeParam);
    } else {
      setShowForgotStep1(true);
    }
  }, []);

  return (
    <>
      <Grid container direction="row" spacing={2} className={classes.mainGrid}>
        <Grid item xs={12}>
          {showForgotStep1 && (
            <H5 fontWeight="500" fontSize="24px" color="#313644">
              {texts.FORGOT_PASSWORD_TEXT1}
            </H5>
          )}
          {showForgotStep2 && (
            <H5 fontWeight="500" fontSize="24px" color="#313644">
              {texts.FORGOT_PASSWORD_TEXT2}
            </H5>
          )}
        </Grid>
        <Grid item xs={12}>
          {showForgotStep1 && <FormStructure Callback={callback} setForgotPasswordEmail={setForgotPasswordEmail} />}
          {showForgotStep2 && <ResetPassword Callback={callback} userId={userId} changeCode={changeCode} />}
        </Grid>
        <Grid item xs={12}>
          {showForgotStep1 && <AccountFooter fromLogin={true} isFromLearners={!Login_Type} ShowAccountPopUp={ShowAccountPopUp} />}
        </Grid>
      </Grid>

      {/* <H5 m={2} textAlign="center">
        {showForgotStep1 && texts.FORGOT_PASSWORD_TEXT1}
        {showForgotStep2 && texts.FORGOT_PASSWORD_TEXT2}
      </H5>
      {showForgotStep1 && <FormStructure Callback={callback} setForgotPasswordEmail={setForgotPasswordEmail} />}
      {showForgotStep2 && <ResetPassword Callback={callback} userId={userId} changeCode={changeCode} />}
      {showForgotStep1 && (
        <Box m={2} textAlign="center">
          <Body1>
            {texts.REMEMBER_LOGIN}
            <InlineButton tag="login" onClick={localCallback}>
              {texts.LOGIN_NOW}
            </InlineButton>
            <br />
            {texts.OR}
            <InlineButton tag="create-new-account" onClick={localCallback}>
              {texts.CREATE_NEW_ACCOUNT}
            </InlineButton>
          </Body1>
        </Box>
      )} */}
    </>
  );
};

export const ForgotPasswordSuccessUI = () => {
  const { texts } = useTheme();
  const styled = useStyles();
  const [successText, setSuccessText] = useState(texts.PASSWORD_SUCCESS_TEXT);
  const callback = () => {
    PageSwitch(AccountNav.LOGIN);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.size > 0) {
      setSuccessText(texts.RESET_PASSWORD_SUCCESS_TEXT);
    } else {
      setSuccessText(texts.PASSWORD_SUCCESS_TEXT);
    }
  }, [texts.PASSWORD_SUCCESS_TEXT, texts.RESET_PASSWORD_SUCCESS_TEXT]);
  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ paddingTop: '65px', paddingBottom: '50px' }}
        spacing={2}
      >
        <Grid item>
          <Box mb={4} mx="auto" className={styled.successCircle}>
            <i className="i i-flag-success" />
          </Box>
        </Grid>

        <Grid item>
          <H2 mb={0}>{texts.DONE}</H2>
        </Grid>

        <Grid item>
          <Body1 mb={8} textAlign="center" className={`${styled.successText} poppins-font-500`}>
            {successText}
          </Body1>
        </Grid>

        <Grid item>
          <Button startIcon={<i className="i i-thumbsup" />} onClick={callback}>
            <ButtonText color="#fff" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
              {texts.GREAT}
            </ButtonText>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
