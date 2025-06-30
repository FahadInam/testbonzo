/* eslint-disable no-nested-ternary */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core';

import { Modal, ConfirmationBox } from 'Components';
import { CompetitionNav } from 'Navigation/Paths';

import { Login, ForgotPassword, Signup } from '../Account';

const useStyles = makeStyles(() => ({
  modal: {
    height: (props) => props.height || '510px',
    padding: 0,
    maxHeight: '100%',
  },
  account: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
}));

const CompAccountSwitchType = ({ ShowAccountPopUp, accountRef, callback }) => {
  const { pathname } = useLocation();

  const isMdOrLess = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  // let height = 675;
  let height;
  if (isMdOrLess) {
    height = 740;
  } else {
    height = 690;
  }

  if (pathname === CompetitionNav.LOGIN.link) height = 720;
  if (pathname === CompetitionNav.FORGOT_PASSWORD.link) height = 470;
  const styled = useStyles({ height: `${height}px` });
  return (
    <Modal callback={callback} isVisible={accountRef}>
      <ConfirmationBox isVisible={accountRef} allowClose callback={callback} className={styled.modal}>
        <Grid item className={styled.account}>
          {ShowAccountPopUp?.type === 'signUp' ? (
            <Signup ShowAccountPopUp={ShowAccountPopUp} />
          ) : ShowAccountPopUp?.type === 'signIn' ? (
            <Login ShowAccountPopUp={ShowAccountPopUp} />
          ) : (
            <ForgotPassword />
          )}
        </Grid>
      </ConfirmationBox>
    </Modal>
  );
};

export default CompAccountSwitchType;
