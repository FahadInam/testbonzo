import React from 'react';
import { Grid } from '@material-ui/core';
import { Account } from 'Actions';
import { ButtonText } from 'Components';
import { useDispatch } from 'react-redux';
import { OutlinedButton } from 'Components/Core/Button';

function ContinueAsGuest({ texts }) {
  const dispatch = useDispatch();
  return (
    <>
      <Grid container direction="row" spacing={0}>
        <Grid item xs={12}>
          <OutlinedButton
            borderRadius={15}
            m={0}
            type="submit"
            tag="playAsGuest"
            width="100%"
            startIcon={<i className="i i-user" />}
            onClick={() => {
              // dispatch(Account.GuestEntrance());
            }}
          >
            <ButtonText fontSize="18px" fontWeight="500">
              {texts.CONTINUE_AS_GUEST}
            </ButtonText>
          </OutlinedButton>
        </Grid>
      </Grid>
    </>
  );
}

export default ContinueAsGuest;
