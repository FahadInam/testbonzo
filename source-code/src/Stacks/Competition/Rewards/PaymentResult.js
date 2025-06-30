/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTheme, Box, Grid, IconButton } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { PAGE_STATE, API_CALLS } from 'Constants';
import { GetUserTransactions, SelectedCompetition } from 'Actions';
import { H1, IconPaper, Button, Header, SlidableView, FlexibleView, WriteString, Body2, SupportBanner } from 'Components';
import ResContainer from 'Components/Layouts/ResponsiveGrid';

import { friendlyDate } from 'Utils';
import { gameDispatch } from 'Utils/ActionCreators';
import { PageSwitch } from 'Navigation';
import { CompetitionNav, DefaultNav } from 'Navigation/Paths';
import { PerPageLoader } from 'Components/Loader/PerPageLoader';
// import moment from 'moment';
import useStyles from './style';

const PaymentResult = React.memo(({ competition, isOnlyCompetition }) => {
  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI = null;
  let PreLoader = null;

  const pageData = useSelector((state) => state.GetUserTransactions, shallowEqual);

  //     None = 0,
  //     Pending = 1,
  //     Approved = 2,
  //     Failed = 3,
  //     WaitingForPayment = 4,
  //     PAID = 5

  //     Jazz Cash Voucher = OTC,
  //     Credit/Debit Card = MIGS,
  //     Jazz Cash Mobile Account = MWALLET,

  const TransactionStatus = (sn) => {
    let St = 0;
    const s = parseInt(sn, 10);
    if (s === 0) {
      St = 0;
    } else if (s === 1) {
      St = 2;
    } else if (s === 2) {
      St = 3;
    } else if (s === 3) {
      St = 1;
    } else if (s === 4) {
      St = 2;
    } else if (s === 5) {
      St = 3;
    }
    return St;
  };
  // const [popUpInfoVisible, setPopUpInfoVisible] = useState(false);
  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  const [scrollNode, setScrollNode] = useState(undefined);
  // const queryParams = new URLSearchParams(window.location.search);
  const [stateRef, setStateRef] = useState({
    transactionId: '',
    competition: '',
    grade: '',
    paymentAmount: '',
    date: '',
    transaction_status: 1,
  });
  const [successScreen, setSuccessScreen] = useState(stateRef.transaction_status || 1); // 0/1 fail, 2 pending, 3 success

  // console.log('queryParams', queryParams);
  const { texts } = useTheme();
  // console.log('USER: ', user);
  const styled = useStyles();
  const dispatch = useDispatch();
  const [callRef, setCallRef] = useState({ sent: false });
  // const [stateRef, setStateRef] = useState({ status: true, Subjects: null });

  const callback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    //  console.log('t: ', t);
    switch (t) {
      case 'overlay':
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
        PageSwitch(CompetitionNav.MY_PURCHASES);
        //  console.log('Payment Continue');
        break;
      case 'claim':
        // setSuccessScreen();
        break;
      default:
        break;
    }
  };

  const TransactionMode = (modeN) => {
    let Mode = '';
    const mode = modeN.trim().toUpperCase();
    if (mode === 'OTC') {
      Mode = 'Jazz Cash Voucher';
    } else if (mode === 'MIGS') {
      Mode = 'Debit/Credit Card';
    } else if (mode === 'MWALLET') {
      Mode = 'Jazz Cash Mobile Account';
    }
    return Mode;
  };

  // TODO GET REWARDS DATA AND ASSIGN MONTHLY/DAILY FROM IT
  if (!pageData) {
    PageState = PAGE_STATE.IS_LOADING;
    PreLoader = [0].map((item, index) => {
      const secondary = (
        <Box
          m={2}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          display="flex"
          textAlign="center"
          justifyContent="center"
          sx={{ background: 'white', borderRadius: '1rem', width: '100%', height: '400px', margin: 'auto auto 4rem auto' }}
          alignItems="center"
          className={!successScreen === 3 ? styled.error_text_content : ''}
        >
          <Box>
            <Skeleton variant="rect" width="90%" height="40px" className={styled.skeleton} />
          </Box>
          <Box>
            <Skeleton variant="rect" width="90%" height="40px" className={styled.skeleton} />
          </Box>
          <Box>
            <Skeleton variant="rect" width="90%" height="40px" className={styled.skeleton} />
          </Box>
          <Box>
            <Skeleton variant="rect" width="90%" height="40px" className={styled.skeleton} />
          </Box>
          <Box>
            <Skeleton variant="rect" width="90%" height="40px" className={styled.skeleton} />
          </Box>
          <Box>
            <Skeleton variant="rect" width="90%" height="40px" className={styled.skeleton} />
          </Box>
        </Box>
      );
      return <>{secondary}</>;
    });
    PageUI = <PerPageLoader PageState={PageState}>{PreLoader}</PerPageLoader>;
  } else if (pageData.shouldRetry) {
    PageState = PAGE_STATE.RETRY;
    PageUI = <PerPageLoader PageState={PageState} />;
  } else {
    PageState = PAGE_STATE.LOADED;
    // PageUI = <Box>Hello</Box>;

    if (!competition.is_premium) PageSwitch(DefaultNav.COMPETITIONS);

    const pageContent = texts.FOLLOWING_PAYMENT_DETAILS;
    const pageContentRequest = texts.FOLLOWING_REQUEST_DETAILS;
    const failedUI = (
      <>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Box className={styled.TextBox} mb={4} mt={2} pr={4} pl={4} textAlign="center">
            <Body2 className={styled.error_text_paper}>Unable to complete the purchase.</Body2>
          </Box>
          <Box className={styled.TextBox} mb={4} pr={4} pl={4} textAlign="center">
            <Body2 className={styled.error_text_paper}>Make sure you have correctly entered your payment details.</Body2>
          </Box>
          <Box className={styled.TextBox} mb={4} pr={4} pl={4} textAlign="center">
            <Body2 className={styled.error_text_paper}>Contact us for further assistance.</Body2>
          </Box>
        </Box>
      </>
    );
    const pendingUI = (
      <>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Box className={styled.TextBox} mb={4} mt={2} pr={4} pl={4} textAlign="center">
            <Body2 className={styled.error_text_paper}>Your purchase request has been received.</Body2>
          </Box>

          <Box>
            <Body2>
              <WriteString text={pageContentRequest} />
            </Body2>
          </Box>
          <Box sx={{ width: '90%', margin: '1rem 2rem', maxWidth: '560px' }}>
            <Grid container className={styled.tableRow}>
              <Grid item className={styled.table_col_left}>
                Request ID
              </Grid>
              <Grid item className={styled.table_col_right}>
                {stateRef.transactionId}
              </Grid>
            </Grid>
            <Grid container className={styled.tableRow}>
              <Grid item className={styled.table_col_left}>
                Competition
              </Grid>
              <Grid item className={styled.table_col_right}>
                {stateRef.competition}
              </Grid>
            </Grid>
            <Grid container className={styled.tableRow}>
              <Grid item className={styled.table_col_left}>
                Grade/Level
              </Grid>
              <Grid item className={styled.table_col_right}>
                {stateRef.grade}
              </Grid>
            </Grid>
            <Grid container className={styled.tableRow}>
              <Grid item className={styled.table_col_left}>
                Expected Payment Amount
              </Grid>
              <Grid item className={styled.table_col_right}>
                {`Rs ${stateRef.paymentAmount}`}
              </Grid>
            </Grid>
            <Grid container className={styled.tableRow}>
              <Grid item className={styled.table_col_left}>
                Expected Transaction Mode
              </Grid>
              <Grid item className={styled.table_col_right}>
                {stateRef.transactionMode}
              </Grid>
            </Grid>
            <Grid container className={styled.tableRow}>
              <Grid item className={styled.table_col_left}>
                Request Date/Time
              </Grid>
              <Grid item className={styled.table_col_right}>
                {friendlyDate(new Date(`${stateRef.date}Z`).toString())}
              </Grid>
            </Grid>
          </Box>
          <Box className={styled.TextBox} mb={4} pr={4} pl={4} textAlign="center">
            <Body2 className={styled.error_text_paper}>
              However, your proof of payment is still pending. Please take <b>a screen snapshot of your payment receipt</b> and share
              it with our support team to get your premium account activated.
            </Body2>
          </Box>
          <Box className={styled.TextBox} mb={4} pr={4} pl={4} textAlign="center">
            <Body2 className={styled.error_text_paper}>
              You can email the support team at <b>gamesupport@knowledgeplatform.com</b> or message them through the support chat.
            </Body2>
          </Box>
        </Box>
      </>
    );
    const successUI = (
      <>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          className={`${styled.printBtn} ${styled.gridItem} ${styled.noPrint}`}
        >
          <IconButton
            data-tag="Support"
            // onClick={() => {
            // window.print();
            // }}
            className={styled.print_icon_btn}
          >
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Box sx={{ width: '100%' }}>
                <i className="i i-support_chat" style={{ padding: '12px!important' }} />
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Body2 mt={1} className={styled.print_ico_label}>
                  Get Support
                </Body2>
              </Box>
            </Box>
          </IconButton>
        </Box>
        <Box className={styled.TextBox} mb={4} pr={4} pl={4} textAlign="center">
          <Body2 className={styled.sub_heading_icon_paper}>{texts.PURCHASE_MADE}</Body2>
        </Box>
        <Box>
          <Body2>
            <WriteString text={pageContent} />
          </Body2>
        </Box>
        <Box sx={{ width: '90%', margin: '1rem 2rem', maxWidth: '560px' }}>
          <Grid container className={styled.tableRow}>
            <Grid item className={styled.table_col_left}>
              Transaction Id
            </Grid>
            <Grid item className={styled.table_col_right}>
              {stateRef.transactionId}
            </Grid>
          </Grid>
          <Grid container className={styled.tableRow}>
            <Grid item className={styled.table_col_left}>
              Competition
            </Grid>
            <Grid item className={styled.table_col_right}>
              {stateRef.competition}
            </Grid>
          </Grid>
          <Grid container className={styled.tableRow}>
            <Grid item className={styled.table_col_left}>
              Grade/Level
            </Grid>
            <Grid item className={styled.table_col_right}>
              {stateRef.grade}
            </Grid>
          </Grid>
          <Grid container className={styled.tableRow}>
            <Grid item className={styled.table_col_left}>
              Payment Amount
            </Grid>
            <Grid item className={styled.table_col_right}>
              {`Rs ${stateRef.paymentAmount}`}
            </Grid>
          </Grid>
          <Grid container className={styled.tableRow}>
            <Grid item className={styled.table_col_left}>
              Transaction Mode
            </Grid>
            <Grid item className={styled.table_col_right}>
              {stateRef.transactionMode}
            </Grid>
          </Grid>
          <Grid container className={styled.tableRow}>
            <Grid item className={styled.table_col_left}>
              Transaction Date/Time
            </Grid>
            <Grid item className={styled.table_col_right}>
              {friendlyDate(new Date(`${stateRef.date}Z`).toString())}
            </Grid>
          </Grid>
        </Box>
      </>
    );
    // console.log('sScreen->>>', successScreen);
    PageUI = (
      <>
        <Box className={styled.takeOverWhenSmall}>
          <Grid item xs={12}>
            <IconPaper
              // eslint-disable-next-line no-nested-ternary
              icon={successScreen === 3 ? 'i i-thumbsup' : successScreen === 2 ? 'i i-waiting' : ' i i-sadcircle'}
              // eslint-disable-next-line no-nested-ternary
              title={successScreen === 3 ? 'Congratulations!' : successScreen === 2 ? 'Step 2' : 'Oops!'}
              className={!successScreen === 3 && styled.error_text_content}
              fullWidth
            >
              {successScreen === 3 && successUI}
              {successScreen === 2 && pendingUI}
              {successScreen === 1 && failedUI}

              {successScreen === 2 ? ( // TO ADD RETRY BUTTON CASE
                <Grid container spacing={2}>
                  <Grid item lg={6} className={styled.m_auto}>
                    <Box mt={2} textAlign="right" className={styled.m_auto}>
                      <Button tag="continue" className={styled.noPrint} onClick={callback}>
                        {texts.CONTINUE}
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item lg={6} className={styled.m_auto}>
                    <Box mt={2} textAlign="left" className={styled.m_auto}>
                      <Button tag="Support" className={styled.noPrint} onClick={callback}>
                        {texts.TALK_TO_SUPPORT}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <Box mt={2} textAlign="center">
                  <Button tag="continue" className={styled.noPrint} onClick={callback}>
                    {successScreen === 3 ? texts.CONTINUE : 'OK'}
                  </Button>
                </Box>
              )}

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
  }

  const loadData = useCallback(() => {
    dispatch(GetUserTransactions(competition));
  }, [dispatch, competition]);

  const ClearData = () => {
    gameDispatch(API_CALLS.GetUserTransactions.CLEAR);
    loadData();
  };

  useEffect(() => {
    ClearData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!pageData && !callRef.sent) {
      loadData();
    }
    setCallRef({ sent: true });
  }, [pageData, loadData, callRef.sent]);

  useEffect(() => {
    if (pageData) {
      const { transaction_id, grade, last_updated, transaction_mode, transaction_status } = pageData[pageData.length - 1];
      // console.log(' transaction_status---> ', transaction_status);
      // console.log('transaction_status filtered is ', TransactionStatus(transaction_status));
      setStateRef({
        transactionId: transaction_id,
        competition: competition.name,
        grade,
        paymentAmount: competition.ticket_cost,
        transaction_status: TransactionStatus(transaction_status) || 1,
        transactionMode: TransactionMode(transaction_mode),
        date: last_updated,
      });
      // alert('transaction_status is ', stateRef.transaction_status);
      setSuccessScreen(TransactionStatus(transaction_status));
      // console.log('transaction_status is ', TransactionStatus(transaction_status));
    }
  }, [competition, pageData]);
  // console.log('transaction_status is , stateRef.transaction_status): ', ('transaction_status is ', stateRef.transaction_status));
  return (
    <>
      <SlidableView showGradient>
        <Header
          isOnlyCompetition
          // trigger={trigger}
          scrollNode={scrollNode}
          headerSet={{
            showRight: true,
            showLeft: IsMcdUser ? false : true,
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
              {successScreen !== 2 && <SupportBanner competition={competition} />}
            </Box>
          </ResContainer>
        </FlexibleView>
      </SlidableView>
    </>
  );
});

export default PaymentResult;
