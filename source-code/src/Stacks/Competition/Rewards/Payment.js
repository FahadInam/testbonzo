/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTheme, Box, Grid, IconButton } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { PAGE_STATE, API_CALLS, ALERT, config } from 'Constants';
import { GetUserTransactions, Toast } from 'Actions';
import { InAppBrowser, Numbers } from 'Utils';
import { H1, Button, Header, SlidableView, FlexibleView, Paper, Body1, Body2, SupportBanner } from 'Components';
import { InlineButton } from 'Components/Core/Button';
import ResContainer from 'Components/Layouts/ResponsiveGrid';

import { gameDispatch } from 'Utils/ActionCreators';
import { PageSwitch } from 'Navigation';
import { CompetitionNav, DefaultNav } from 'Navigation/Paths';
import { PerPageLoader } from 'Components/Loader/PerPageLoader';

import OsProperties from 'Utils/OsProperties';
import User from '../../../Actions/user.action';

import useStyles from './style';
import { GetPaymentSubscription } from 'Actions/payment.action';

const Payment = React.memo(({ competition, isOnlyCompetition }) => {
  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI = null;
  let PreLoader = null;
  // TODO QA INSTANCE URL IS SET FOR TESTING
  // const JazzCashPaymentUrl = 'https://ubj10synchqaserver.knowledgeplatform.com/Subscription/MobileStudentSubscriptionCheckout';

  // jAZZ CASH PAYMENT LIVE INSTANCE
  // const JazzCashPaymentUrl = 'https://www.learnsmartpakistan.org/Subscription/MobileStudentSubscriptionCheckout';
  const JazzCashPaymentUrl = 'http://localhost:3000';

  const pageData = useSelector((state) => state.GetUserTransactions, shallowEqual);
  // console.log(pageData, 'pageData');
  // const UserTimeRewardsData = useSelector((state) => state.SetUserTimeReward, shallowEqual);

  const IsMcdUser = useSelector((state) => state.McdUser.mcd_user, shallowEqual);
  const [scrollNode, setScrollNode] = useState(undefined);
  const [subscriptionData, setSubscriptionData] = useState(null);

  const user = User.Info();
  const { texts } = useTheme();

  const styled = useStyles();
  const dispatch = useDispatch();

  // console.log(user, 'user');
  // console.log(competition, 'c');
  const [stateRef, setStateRef] = useState({
    userId: user?.user_id,
    // packageId: Math.floor(Math.random() * 100),
    paymentGateway: '', //   None = 0, JazzCash = 1, LSPVoucherCode = 2, EasyPaisa = 3
    paymentMode: '', //   Voucher = OTC, Debit/Credit = MIGS, Mobile Account = MWALLET, EasyPaisa Mobile Account = EASYPAISA
    amount: competition.ticket_cost,
    subscriptionDurationMonths: 1,
    fullName: user?.username,
    email: user?.email,
    // isOneOnOne: true,
    selectedPaymentOption: null,
    session_id: user.session_id,
    competition_id: competition.competition_id,
    grade: competition.current_grade,
  });

  const callback = (e, item) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    switch (t) {
      case 'PayNow':
        const {
          userId,
          packageId,
          paymentGateway,
          paymentMode,
          amount,
          subscriptionDurationMonths,
          fullName,
          email,
          isOneOnOne,
          grade,
          competition_id,
          session_id,
        } = stateRef;

        // if (
        //  false
        // ) {
        //   Toast.Show(texts.ERROR_PROCESSING_PAYMENT, ALERT.ERROR);
        //   return;
        // }
        let userData = {
          grade: stateRef?.grade.toString(),
          subscription_id: subscriptionData[0].id,
          duration_in_days: subscriptionData[0].duration_in_days,
          amount: subscriptionData[0].amount,
          authToken: user.auth_token,
          system_id: competition.competition_id,
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          vendor_id: 4,
        };
        const currentUrl = window.location.href;
        let jsonData = JSON.stringify(userData);

        // const PaymentUrl = `${JazzCashPaymentUrl}?openOutsideMcd=true&userId=${userId}&packageId=${`${packageId}`}&paymentGateway=${paymentGateway}&paymentMode=${paymentMode}&amount=${amount}&subscriptionDurationMonths=${subscriptionDurationMonths}&fullName=${fullName}&email=${email}&isOneOnOne=${isOneOnOne}&grade=${grade}&competitionId=${competition_id}&sessionId=${session_id}&callBackUrl=https://www.1on1quiz.com/mcd_payment/${grade}`;
        const PaymentUrl = `${config.paymentUrl}pay?type=${encodeURIComponent(paymentMode)}&redirectUrl=${encodeURIComponent(
          currentUrl
        )}&userDetails=${encodeURIComponent(jsonData)}`;

        //  console.log(PaymentUrl, 'PaymentUrl');

        //   if (IsMcdUser) {
        //    window.location.href = `gmalite://gmalite-smartweb?weburl=${PaymentUrl}`;
        //  } else {
        //  console.log('paymentMode: ', paymentMode);
        if (paymentMode?.trim().toUpperCase() === 'EASYPAISA') PageSwitch(CompetitionNav.EASYPAISA_PAYMENT);
        else window.location.href = PaymentUrl;
        //  }
        // if (OsProperties.IsAndroid()) {
        //   const x = new InAppBrowser(
        //     PaymentUrl,
        //     (a) => {
        //       if (a === 'loadstop') {
        //         //  dispatch(LoaderAction.Hide());
        //         console.log('x', x);
        //       } else if (a === 'nointernet' || a === 'loaderror') {
        //         // dispatch(LoaderAction.Hide());
        //       }
        //     },
        //     'Jazz Cash Payment',
        //     '_system'
        //   );
        // } else {
        //   window.open(PaymentUrl, '_system');
        // }
        break;
      default:
        break;
    }
  };

  if (pageData) {
    // console.log('paageData');
    PageState = PAGE_STATE.IS_LOADING;
    PreLoader = [0, 1].map((item, index) => {
      const secondary = (
        <Box
          m={2}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          display="flex"
          textAlign="center"
          justifyContent="center"
          sx={{ background: 'white', borderRadius: '1rem', width: '100%', height: '200px', margin: 'auto auto 4rem auto' }}
          alignItems="center"
        >
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
  } else if (pageData?.shouldRetry) {
    PageState = PAGE_STATE.RETRY;
    PageUI = <PerPageLoader PageState={PageState} />;
  } else {
    PageState = PAGE_STATE.LOADED;
    // PageUI = <Box>Hello</Box>;

    if (!competition.is_premium) PageSwitch(DefaultNav.COMPETITIONS);
    // console.log('else here');

    PageUI = (
      <>
        <Grid item xs={12}>
          <Paper flexDirection="column" justifyContent="center" alignItems="center">
            <Box sx={{ textAlign: 'end', margin: '6px 48px 8px 16px', width: '100%' }} />
            <Box sx={{ margin: '12px', display: 'flex', flexDirection: 'column' }}>
              <Body1 className={styled.purchaseTitle}>{texts.PREMIUM_ACCOUNT}</Body1>
              {/* <Body1 className={styled.purchaseHeading}>
                {competition?.name || ''}
              </Body1> */}
            </Box>
            <Box style={{ width: '100%', textAlign: 'end', flexDirection: 'row' }}>
              <Body1 className={styled.paymentDueLine}>
                {texts.PAYMENT_DUE}{' '}
                <span className={styled.amountShown}>
                  {texts.PAYMENT_CURRENCY_PREFIX}
                  &nbsp;
                  {Numbers.ToCommaSeparated(stateRef.amount)}
                  {texts.PAYMENT_CURRENCY_POSTFIX}
                </span>
              </Body1>
            </Box>
          </Paper>

          <SupportBanner competition={competition} showPaymentErrorMessage />
          <Paper flexDirection="column" mt={4} justifyContent="center" alignItems="center">
            <Box sx={{ margin: '24px 12px 48px 12px' }}>
              <Body1 className={styled.paymentModeTitle}>{texts.CHOOSE_PAYMENT_METHOD}</Body1>
            </Box>
            <Grid container justifyContent="center">
              <Grid xs={6} md={3} lg={2} item container justifyContent="center">
                <IconButton
                  className={styled.animation}
                  onClick={(e) => {
                    setStateRef({
                      ...stateRef,
                      paymentMode: 'MWALLET',
                      paymentName: 'Mobile Account',
                      selectedPaymentOption: 0,
                      paymentGateway: 1,
                    });
                  }}
                >
                  <Box className={`${styled.gridItem} ${stateRef.selectedPaymentOption === 0 ? 'selected' : ''} `}>
                    <Box
                      className={`${styled.singleIcon} ${styled.iconBlue} ${stateRef.selectedPaymentOption === 0 ? 'selected' : ''} `}
                    >
                      <i className="i i-phone" />
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                      <Body2 mt={1} className={styled.playerName}>
                        {texts.JAZZCASH_MOBILE_ACCOUNT}
                      </Body2>
                    </Box>
                  </Box>
                </IconButton>
              </Grid>
              <Grid xs={6} md={3} lg={2} item container justifyContent="center">
                <IconButton
                  className={styled.animation}
                  onClick={(e) => {
                    setStateRef({
                      ...stateRef,
                      paymentMode: 'OTC',
                      paymentName: 'Voucher',
                      selectedPaymentOption: 1,
                      paymentGateway: 1,
                    });
                  }}
                >
                  <Box className={`${styled.gridItem} ${stateRef.selectedPaymentOption === 1 ? 'selected' : ''} `}>
                    <Box
                      className={`${styled.singleIcon} ${styled.iconPurple} ${
                        stateRef.selectedPaymentOption === 1 ? 'selected' : ''
                      } `}
                    >
                      <i className="i i-ticket-perforated" />
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                      <Body2 mt={1} className={styled.playerName}>
                        {texts.VOUCHER}
                      </Body2>
                    </Box>
                  </Box>
                </IconButton>
              </Grid>
              <Grid xs={6} md={3} lg={2} item container justifyContent="center">
                <IconButton
                  className={styled.animation}
                  onClick={(e) => {
                    setStateRef({
                      ...stateRef,
                      paymentMode: 'MIGS',
                      paymentName: 'Debit/Credit Card',
                      selectedPaymentOption: 2,
                      paymentGateway: 1,
                    });
                  }}
                >
                  <Box className={`${styled.gridItem} ${stateRef.selectedPaymentOption === 2 ? 'selected' : ''} `}>
                    <Box
                      className={`${styled.singleIcon} ${styled.iconOrange} ${
                        stateRef.selectedPaymentOption === 2 ? 'selected' : ''
                      } `}
                    >
                      <i className="i i-credit-card" />
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                      <Body2 mt={1} className={styled.playerName}>
                        {texts.DEBIT_CREDIT_CARD}
                      </Body2>
                    </Box>
                  </Box>
                </IconButton>
              </Grid>

              {/* <Grid xs={6} md={3} lg={2} item container justifyContent="center">
                <IconButton
                  className={styled.animation}
                  onClick={(e) => {
                    setStateRef({
                      ...stateRef,
                      paymentMode: 'EASYPAISA',
                      paymentName: 'EasyPaisa Mobile Account',
                      selectedPaymentOption: 3,
                      paymentGateway: 1,
                    });
                  }}
                >
                  <Box className={`${styled.gridItem} ${stateRef.selectedPaymentOption === 3 ? 'selected' : ''} `}>
                    <Box
                      className={`${styled.singleIcon} ${styled.iconGreen} ${stateRef.selectedPaymentOption === 3 ? 'selected' : ''} `}
                    >
                      <i className="i i-easypaisa" />
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                      <Body2 mt={1} className={styled.playerName}>
                        {texts.EASY_PAISA}
                      </Body2>
                    </Box>
                  </Box>
                </IconButton>
              </Grid> */}
            </Grid>
            <Box>&nbsp;</Box>
            <Box className={styled.fab2}>
              <Button
                className={styled.PlayButton}
                endIcon={<i className="i i-tick" />}
                width="auto"
                pl={8}
                pr={8}
                onClick={(e) => {
                  callback(e);
                }}
                tag="PayNow"
              >
                {texts.PAY_NOW}
              </Button>
            </Box>
          </Paper>
        </Grid>
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
    dispatch(
      GetPaymentSubscription(competition, (data) => {
        setSubscriptionData(data);
        //  console.log(data, "data")
      })
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    //   console.log(subscriptionData, "subscriptionData")
  }, [subscriptionData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!pageData) {
      loadData();
    }
  }, [pageData, loadData]);

  //console.log(PageUI, "PageUI")
  return (
    <>
      <SlidableView showGradient>
        <Header
          isOnlyCompetition
          // trigger={trigger}
          scrollNode={scrollNode}
          headerSet={{
            showRight: true,
            showLeft: true,
            overrideLeftButton: false,
            notify: true,
          }}
        />
        <FlexibleView
          ref={(node) => {
            if (node) {
              setScrollNode(node);
            }
          }}
        >
          <H1>{texts.PAYMENT}</H1>
          <ResContainer>
            <Box sx={{ width: '90%', margin: 'auto', marginTop: '2rem', marginBottom: '4rem' }}>{PageUI}</Box>
          </ResContainer>
        </FlexibleView>
      </SlidableView>
    </>
  );
});

export default Payment;
