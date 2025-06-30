/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useTheme, Box, Grid } from '@material-ui/core';

import { CALL_PRIORITY } from 'Constants';
import { SelectedCompetition, GetCompetitionsActivities, GetUserTransactions, User } from 'Actions';
import { PageSwitch } from 'Navigation';
import { CompetitionNav } from 'Navigation/Paths';
import { Paper, Button, Body1 } from 'Components';
// import { Cordova } from 'Utils';
// import PremiumRewardsImage from 'Assets/images/premium_rewards.png';
import useStyles from './style';
import defaultNavConstants from 'Navigation/Paths/defaultNav.constants';
const PremiumBanner = ({ competition, status, paymentData }) => {
  // console.log(paymentData,competition,   "paymentData")
  const { texts } = useTheme();
  const dispatch = useDispatch();
  const styled = useStyles();
  // console.log(paymentData, "paymentData")
  const [mainStatus, setMainStatus] = useState();

  // console.log('status', status);
  /* ------------------------------ TO LOAD PREMIUM TAG IF PURCHASED BIT IS TRUE ------------------------------ */
  const pageDataActivities = useSelector((state) => state.GetCompetitionsActivities, shallowEqual);

  const [activityStatus, setActivityStatus] = useState(pageDataActivities);

  const loadDataActivities = useCallback(
    (priority = CALL_PRIORITY.HIGH) => {
      dispatch(GetCompetitionsActivities(competition, priority));
    },
    [dispatch, competition]
  );

  useEffect(() => {
    if (status) {
      setMainStatus(status);
    }
  }, [status]);

  useEffect(() => {
    if (pageDataActivities) {
      setActivityStatus(pageDataActivities);
    }
  }, [pageDataActivities]);

  useEffect(() => {
    if (!pageDataActivities && mainStatus) {
      loadDataActivities();
    }
  }, [pageDataActivities, loadDataActivities, competition, mainStatus]);

  const isPremiumPurchased = pageDataActivities?.is_premium_purchased || true;
  // console.log('pageDataActivities: ', pageDataActivities?.is_premium_purchased);
  /* ------------------------------ TO LOAD PREMIUM TAG IF PURCHASED BIT IS TRUE ------------------------------ */

  /* ------------------------------ TO LOAD USER TRANSACTION DATA  ------------------------------ */
  const userTransactionsData = useSelector((state) => state.GetUserTransactions, shallowEqual);
  const loadTransactionsData = useCallback(() => {
    dispatch(GetUserTransactions(competition));
  }, [dispatch, competition]);
  let isPendingPayment;

  useEffect(() => {
    if (!userTransactionsData && activityStatus) {
      if (!User.IsGuest()) loadTransactionsData();
    }
  }, [userTransactionsData, loadTransactionsData, competition, activityStatus]);

  // const transactionsData = userTransactionsData.length > 0 ? userTransactionsData[userTransactionsData.length - 1] : null;
  // console.log('transactionsData: ', userTransactionsData);
  const uTransaction = (userTransactionsData?.length && userTransactionsData[userTransactionsData.length - 1]) || null;
  if (
    uTransaction?.transaction_status === '1' &&
    (uTransaction?.transaction_mode.toLowerCase().trim() === 'mwallet' ||
      uTransaction?.transaction_mode.toLowerCase().trim() === 'otg')
  ) {
    isPendingPayment = true;
  } else {
    isPendingPayment = false;
  }
  // console.log('is Pending Payment?: ', isPendingPayment);
  /* ------------------------------ TTO LOAD USER TRANSACTION DATA ------------------------------ */
  // console.log('competition?:', competition);
  // console.log(paymentData, 'paymentData');
  const PageUI = !(isPremiumPurchased === 1) && competition?.is_mcd && !paymentData?.is_subscribed && competition?.is_premium && (
    <Grid item xs={12}>
      <Paper flexDirection="row" justifyContent="center" className="std__card__shadow small___card" alignItems="center">
        <Box className={`${styled.daily_rewards_banner} ${isPendingPayment ? styled.daily_rewards_banner_pending : ''}`} m={0}>
          <Box sx={{ zIndex: '1!important', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Body1 className={styled.rewards_banner_1on1_text_base}>
              <span className={styled.rewards_banner_1on1_text}>
                {!isPendingPayment ? texts.PREMIUM_TICKETS : texts.VERIFY_PAYMENT}
              </span>{' '}
              {!isPendingPayment ? texts.PREMIUM_TICKET_DETAILS : texts.VERY_PAYMENT_DETAILS}
            </Body1>
            <Body1 className={styled.rewards_banner_price_line}>
              {competition?.ticket_cost
                ? `For ${(competition?.ticket_cost).toLocaleString('en-US')} ${competition?.ticket_currency || 'PKR'} Only`
                : ''}
            </Body1>
            <Button
              tag="buy-button"
              type="submit"
              className={styled.BUY_BUTTON_PAYMENT}
              onClick={() => {
                PageSwitch(defaultNavConstants.PAYMENT);
              }}
            >
              {!isPendingPayment ? texts.BUY_NOW : texts.PURCHASE_AGAIN}
            </Button>
            <Button
              tag="get-support"
              type="submit"
              styleCSS={{ display: isPendingPayment ? 'flex' : 'none' }}
              className={styled.BUY_BUTTON_PAYMENT}
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
              {texts.TALK_TO_SUPPORT}
            </Button>{' '}
            <Body1 className={styled.rewards_banner_1on1_text_base}>
              <span style={{ marginBottom: '12px', fontSize: '0.8rem', textAlign: 'center' }}>
                Competition Period: {competition?.date_message || 'Undisclosed'}
              </span>
            </Body1>
          </Box>
          {/* <Box className={styled.rewards_banner_right}>
            <img
              className={styled.premium_rewards_image}
              height="250px"
              src={Cordova.Path(PremiumRewardsImage)}
              alt={texts.BUY_PREMIUM_ACCOUNT}
            />
          </Box> */}
        </Box>
      </Paper>
    </Grid>
  );

  return PageUI || <></>;
};

export default PremiumBanner;
