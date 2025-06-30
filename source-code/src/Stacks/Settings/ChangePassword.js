import React, { useState } from 'react';
import { Box, useTheme } from '@material-ui/core';
import { Button, Input, Body1 } from 'Components';
import { OnInputChange } from 'Utils';
import Account from 'Actions/account.action';
import { useDispatch } from 'react-redux';
import User from 'Actions/user.action';
import PageStructure from './shared/PageStructure';

const ChangePassword = () => {
  const { texts } = useTheme();
  const [password, setPassword] = useState({ enterNewPassword: '', reenterNewPassword: '' });
  const dispatch = useDispatch();
  const callback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    switch (t) {
      case 'update':
        dispatch(Account.ChangePassword(password, texts));
        break;
      case 'enterNewPassword':
      case 'reenterNewPassword':
        OnInputChange({ name: t, value: e.target.value }, password, setPassword);
        break;
      default:
        break;
    }
  };
  return (
    <PageStructure name={texts.CHANGE_PASSWORD}>
      <Box mb={2}>
        <Body1>{`${texts.USERNAME}: ${User.NameResolver()}`}</Body1>
      </Box>
      <Input label={texts.ENTER_NEW_PASSWORD} tag="enterNewPassword" onChange={callback} />
      <Input label={texts.REENTER_NEW_PASSWORD} tag="reenterNewPassword" onChange={callback} />
      <Button tag="update" mt={4} onClick={callback} startIcon={<i className="i i-update" />}>
        {texts.UPDATE}
      </Button>
    </PageStructure>
  );
};

export default ChangePassword;
