/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useTheme, Box, Grid, IconButton } from '@material-ui/core';
// import Skeleton from '@material-ui/lab/Skeleton';
import { ALERT } from 'Constants';
import { SelectedCompetition } from 'Actions';
import { H1, IconPaper, Button, Header, SlidableView, FlexibleView, Body2 } from 'Components';
import ResContainer from 'Components/Layouts/ResponsiveGrid';

// import { friendlyDate } from 'Utils';
// import { gameDispatch } from 'Utils/ActionCreators';
import { PageSwitch } from 'Navigation';
import { CompetitionNav, DefaultNav } from 'Navigation/Paths';
import { Toast } from '../../../Actions/app.control.action';
// import { PerPageLoader } from 'Components/Loader/PerPageLoader';
// import moment from 'moment';
import useStyles from './style';

const EasypaisaPayment = React.memo(({ competition, isOnlyCompetition }) => {
  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  // let PageState = PAGE_STATE.IS_LOADING;
  let PageUI = null;
  // let PreLoader = null;
  const { texts } = useTheme();
  const styled = useStyles();
  const [scrollNode, setScrollNode] = useState(undefined);

  const callback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    //  console.log('t: ', t);
    switch (t) {
      case 'overlay':
        break;
      case 'copy':
        // eslint-disable-next-line no-case-declarations
        const inputText = document.getElementsByClassName('oidinputcopyelement')[0];
        inputText.value = '03455123432';
        inputText.select();
        try {
          document.execCommand('copy');
          Toast.Show('Copied', ALERT.SUCCESS);
        } catch (err) {
          //  console.log('err: ', err);
          Toast.Show('Unable to Copy ', ALERT.ERROR);
        }
        break;
      case 'Support':
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
        break;
      case 'continue':
        PageSwitch(CompetitionNav.COMPETITION_HOME);
        // console.log('Payment Continue');
        break;
      default:
        break;
    }
  };

  // TODO GET REWARDS DATA AND ASSIGN MONTHLY/DAILY FROM IT

  // PageUI = <Box>Hello</Box>;

  if (!competition.is_premium) PageSwitch(DefaultNav.COMPETITIONS);
  const easypaisaUI = (
    <>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box className={styled.TextBox} mb={4} mt={2} pr={4} pl={4} textAlign="center">
          <Body2 className={styled.error_text_paper}>
            {texts.EASYPAISA_DETAILS_1.split('Rs. 299').join(
              `${competition?.ticket_cost || '299'} ${competition?.ticket_currency || 'PKR'} `
            )}
          </Body2>
        </Box>
        <Box className={styled.TextBox} mb={4} pr={4} pl={4} textAlign="center">
          <Body2 className={styled.ep_text}>
            <b>{texts.MOBILE_ACCOUNT_NO_LABEL}</b>
            <input
              type="text"
              value="03455123432"
              style={{ border: 'none', width: '150px', fontSize: '1.2rem', color: 'rgb(112, 136, 145)', fontWeight: '500' }}
              className="oidinputcopyelement"
              readOnly
            />
            <IconButton onClick={callback} data-tag="copy">
              <i
                className="i"
                style={{ filter: 'invert(57%) sepia(21%) saturate(336%) hue-rotate(150deg) brightness(87%) contrast(85%)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 290 330" fill="#333333" width="24" height="24">
                  <path d="M15,270H60v45a15,15,0,0,0,15,15H275a15,15,0,0,0,15-15V75a15,15,0,0,0-15-15H230V15A15,15,0,0,0,215,0H15A15,15,0,0,0,0,15V255A15,15,0,0,0,15,270Zm245,30H90V90H260ZM30,30H200V60H75A15,15,0,0,0,60,75V240H30Z" />
                  <path d="M135,120a15,15,0,0,0,0,30h80a15,15,0,0,0,0-30Z" />
                  <path d="M215,180H135a15,15,0,0,0,0,30h80a15,15,0,0,0,0-30Z" />
                  <path d="M215,240H135a15,15,0,0,0,0,30h80a15,15,0,0,0,0-30Z" />
                </svg>
              </i>
            </IconButton>
          </Body2>
          <br />
          <Body2 className={styled.ep_text}>
            <b>{texts.NAME_LABEL}</b>
            {texts.EASYPAISA_ACCOUNT_NAME}
          </Body2>
        </Box>
        <Box className={styled.TextBox} mb={4} pr={4} pl={4} textAlign="center">
          <Body2 className={styled.error_text_paper}>{texts.CHAT_FOR_FURTHER_HELP_MESSAGE}</Body2>
        </Box>
      </Box>
    </>
  );
  PageUI = (
    <>
      <Box className={styled.takeOverWhenSmall}>
        <Grid item xs={12}>
          <IconPaper
            // eslint-disable-next-line no-nested-ternary
            icon="i i-easypaisa"
            // eslint-disable-next-line no-nested-ternary
            title="Pay through EasyPaisa"
            className={styled.error_text_content}
            fullWidth
          >
            {easypaisaUI}

            <Grid container spacing={2}>
              <Grid item lg={6} className={styled.m_auto}>
                <Box mt={2} textAlign="right" className={styled.m_auto}>
                  <Button tag="Support" className={styled.noPrint} onClick={callback}>
                    {texts.TALK_TO_SUPPORT}
                  </Button>
                </Box>
              </Grid>
              <Grid item lg={6} className={styled.m_auto}>
                <Box mt={2} textAlign="left" className={styled.m_auto}>
                  <Button tag="continue" className={styled.noPrint} onClick={callback}>
                    Back to Competition
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Box mt={2} textAlign="center">
              {/* <Button tag="Support" className={styled.noPrint} onClick={callback}>
                  Support
                </Button> */}
            </Box>
          </IconPaper>
        </Grid>
      </Box>
    </>
  );

  // console.log('transaction_status is , stateRef.transaction_status): ', ('transaction_status is ', stateRef.transaction_status));
  return (
    <>
      <SlidableView>
        <Header
          isOnlyCompetition
          // trigger={trigger}
          scrollNode={scrollNode}
          headerSet={{
            showRight: true,
            showLeft: IsMcdUser ? false : !isOnlyCompetition,
            overrideLeftButton: false,
            notify: true,
            // SecondaryButtons,
          }}
        />
        <FlexibleView
          ref={(node) => {
            if (node) {
              setScrollNode(node);
            }
          }}
        >
          <H1>{texts.PAYMENT_RESULT}</H1>
          <ResContainer>
            {/* {!is_certificate_enabled && (
              <Grid item xs={12}>
                <Paper flexDirection="row" justifyContent="center" alignItems="center">
                  <Box ml={2} mr={2} mt={1} mb={1}>
                    <img height="40px" width="45px" src={Cordova.Path(alert)} alt="t" />
                  </Box>
                  <Box ml={2} mr={2} mt={1} mb={1}>
                    <Body1>{texts.REWARD_WARNING}</Body1>
                  </Box>
                </Paper>
              </Grid>
            )} */}
            <Box className={styled.noPrint} sx={{ width: '90%', margin: 'auto', marginTop: '4rem', marginBottom: '4rem' }}>
              {PageUI}
              {/* {successScreen !== 2 && <SupportBanner competition={competition} />} */}
            </Box>
          </ResContainer>
        </FlexibleView>
      </SlidableView>
    </>
  );
});

export default EasypaisaPayment;
