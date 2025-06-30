import React from 'react';
import { Box, useTheme } from '@material-ui/core';
import { ModalBox, Button, ButtonText } from 'Components';
import useStyles from './style';
import { USER_TYPE } from 'Constants';
import { User } from 'Actions';
import { PageSwitch } from 'Navigation';
import { DefaultNav } from 'Navigation/Paths';

const MsgModal = ({ onClose, menuAnchor, reset }) => {
  const styled = useStyles();
  const { texts } = useTheme();
  const user = User.Info();
  const isSafaricomUser = user?.user_type === USER_TYPE.Safaricom;

  const PageUI = (
    <ModalBox
      ADD_CODE
      title={texts.RENEW_SUBSCRIPTION}
      className={styled.takeOverWhenSmall}
      allowClose={true}
      isVisible={menuAnchor}
      callback={onClose}
      hideCross
      // addCodeIcon={IMAGES.SYSTEM_ICON}
      fullWidth
      maxWidth={'700px'}
    >
      <Box className={styled.TextBox}>
        <div style={{ flex: '1', paddingBottom: '10px', marginTop: '0px' }}>
          <p className={styled.faq_question}>{isSafaricomUser ? texts.SAFARICOM_PAYMENT_ERROR_MSG : texts.DPO_PAYMENT_ERROR_MSG}</p>
          <div className={styled.btn_container}>
            <Button
              variant="contained"
              onClick={() => {
                reset();
                onClose();
                setTimeout(() => {
                  PageSwitch(DefaultNav.PAYMENT);
                }, 250);
              }}
              background="#02BBFE"
            >
              <ButtonText color="#FFF" fontSize="16px" fontWeight="600" letterSpacing="0.5px">
                {texts.CONTINUE_TO_PAYMENT}
              </ButtonText>
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                reset();
                onClose();
              }}
              background="#51545A"
            >
              <ButtonText color="#FFF" fontSize="16px" fontWeight="600" letterSpacing="0.5px">
                {texts.CANCEL}
              </ButtonText>
            </Button>
          </div>
        </div>
      </Box>
    </ModalBox>
  );

  return PageUI;
};

export default MsgModal;
