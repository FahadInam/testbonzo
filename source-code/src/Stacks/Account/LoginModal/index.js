import React, { useEffect, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Modal, ConfirmationBox } from 'Components';
import { config } from 'Constants';
import { User } from 'Actions';
import Login from '../Login/Login';

const useStyles = makeStyles(() => ({
  modal: {
    padding: 0,
    maxHeight: '100%',
  },
  account: {
    overflow: 'hidden',
    overflowY: 'auto',
    width: '100%',
    height: '100%',
  },
}));

const LoginModal = () => {
  const styled = useStyles();
  const [stateRef, setStateRef] = useState({ isOpen: false });

  const callback = () => {
    setStateRef({ ...stateRef, isOpen: false });
  };

  useEffect(() => {
    if (config.private_comp && User.IsGuest()) {
      setStateRef({ isOpen: true });
    } else {
      setStateRef({ isOpen: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User.IsGuest()]);

  return (
    <Modal callback={callback} isVisible={stateRef.isOpen}>
      <ConfirmationBox isVisible={stateRef.isOpen} allowClose callback={callback} className={styled.modal}>
        <Grid item className={styled.account}>
          <Login mode="MODAL" />
        </Grid>
      </ConfirmationBox>
    </Modal>
  );
};

export default LoginModal;
