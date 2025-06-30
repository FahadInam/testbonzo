import React, { useState } from 'react';
import { Grid, IconButton, useTheme } from '@material-ui/core';
import { Input, Button, ButtonText } from 'Components';
import { useDispatch } from 'react-redux';
import { Account } from 'Actions';
import { OnInputChange } from 'Utils';
import { Visibility, VisibilityOff } from '@material-ui/icons';

function ResetPassword({ Callback, userId, changeCode }) {
  const dispatch = useDispatch();
  const { texts } = useTheme();

  const [resetPassword, setResetPassword] = useState({
    password: '',
    reenterPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    password1: false,
    password2: false,
  });

  const localCallback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    switch (t) {
      case 'reset-password':
        e.preventDefault();
        dispatch(Account.ResetPassword(resetPassword, texts, userId, changeCode, Callback));
        break;
      case 'password':
      case 'reenterPassword':
        // console.log('resetPassword', resetPassword);
        OnInputChange({ name: t, value: e.target.value }, resetPassword, setResetPassword);
        break;
      default:
        break;
    }
  };

  const handleClickShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <form>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12}>
          <Input
            type={showPassword.password1 ? 'text' : 'password'}
            label={texts.TYPE_NEW_PASSWORD}
            placeholder={texts.TYPE_NEW_PASSWORD}
            tag="password"
            key="1"
            onChange={localCallback}
            end={
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword('password1')}
                edge="end"
                color="secondary"
              >
                {showPassword.password1 ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type={showPassword.password2 ? 'text' : 'password'}
            label={texts.RE_ENTER_NEW_PASSWORD}
            placeholder={texts.RE_ENTER_NEW_PASSWORD}
            tag="reenterPassword"
            key="2"
            onChange={localCallback}
            end={
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword('password2')}
                edge="end"
                color="secondary"
              >
                {showPassword.password2 ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button tag="reset-password" borderRadius={15} background="#02BBFE" width="100%" m={0} type="submit" onClick={localCallback}>
            <ButtonText color="#fff" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
              {texts.CONFIRM}
            </ButtonText>
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default ResetPassword;
