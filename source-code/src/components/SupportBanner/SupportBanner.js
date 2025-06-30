/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useTheme, Box, Grid } from '@material-ui/core';

// import { PageSwitch } from 'Navigation';
// import { CompetitionNav } from 'Navigation/Paths';
import { Paper, Body1 } from 'Components';
// import { SelectedCompetition } from 'Actions';
import useStyles from './style';

const SupportBanner = ({ competition, showActivationMessage = false, noBottomMargin = false, showPaymentErrorMessage = false }) => {
  const { texts } = useTheme();
  // console.log(showPaymentErrorMessage, "showPaymentErrorMessage")
  const styled = useStyles();
  const PageUI = competition?.is_mcd && competition?.is_premium && (
    <Grid item xs={12}>
      <Paper
        flexDirection="row"
        justifyContent="center"
        className={noBottomMargin ? styled.SupportPaperTop : styled.SupportPaper}
        alignItems="center"
      >
        <Box className={styled.support_banner} m={0}>
          {!showPaymentErrorMessage && (
            <Box className={styled.support_banner_text_area} style={{ flexDirection: showActivationMessage ? 'column' : 'inherit' }}>
              <Body1 className={styled.support_chat_banner_1on1_text_base}>
                {!showActivationMessage && <span className={styled.support_chat_banner_1on1_text}>{texts.NEED_HELP}</span>}{' '}
                {showActivationMessage ? texts.GOT_QUERIES_1 : texts.GOT_QUERIES}
              </Body1>
              {showActivationMessage && <Body1 className={styled.support_chat_banner_1on1_text_base}>{texts.GOT_QUERIES_2}</Body1>}
            </Box>
          )}
          {showPaymentErrorMessage && (
            <Box className={styled.support_banner_text_area} style={{ flexDirection: 'inherit' }}>
              <Body1 className={styled.support_chat_banner_1on1_text_base_payment} style={{ textAlign: 'left!important' }}>
                If you have already made the payment, please share screenshot of payment SMS receive against payment or receipt with us
                for verification.{' '}
              </Body1>
            </Box>
          )}
          {/* <Box className={styled.support_chat_banner_right}>
            <Button
              tag="support-button"
              type="submit"
              className={styled.BUY_BUTTON_SUPPORT}
              onClick={() => {
                SelectedCompetition.GotoCompetition(
                  CompetitionNav.CHAT,
                  {
                    is_new_message: 0,
                    is_same_grade: 1,
                    is_subject: 0,
                    name: 'Support Team',
                    profile_picture: '2',
                    tag: 'SET_OPPONENT',
                    user_id: parseInt(process.env.REACT_APP_SUPPORT_ID, 10),
                    username: 'gamesupport@knowledgeplatform.com',
                  },
                  false
                );
              }}
            >
              
              {!showPaymentErrorMessage && (showActivationMessage ? texts.ACTIVATE_VIA_CHAT : texts.TALK_TO_SUPPORT)}
              {showPaymentErrorMessage && 'Contact Support'}
            </Button>
          </Box> */}
        </Box>
      </Paper>
    </Grid>
  );

  return PageUI || <></>;
};

export default SupportBanner;
