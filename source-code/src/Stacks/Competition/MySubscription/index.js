import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Grid, useTheme } from '@material-ui/core';
import { IconPaper } from 'Components';
import { SelectedCompetition } from 'Actions';
import { PageStructure } from '../shared';
import useStyles from './style';
import { IMAGES } from 'Constants';
import PaymentCard from 'Stacks/Payment/PaymentCard';
import { formatDate, getInstanceType } from 'Utils';
import { INSTANCES_ID } from 'Constants/instance.config';
import ButtonBold from 'Components/Core/ButtonBold';
import { CancelUserSubscription, GetSubscriptionDetails } from 'Actions/payment.action';
import ConfirmationBox from 'Components/ConfirmationBox';

const MySubscription = () => {
  const { texts } = useTheme();
  const styled = useStyles();

  const dispatch = useDispatch();

  const [subscriptionDetailsData, setSubscriptionDetailsData] = useState(null);
  const [dates, setDates] = useState({ currentDate: '', futureDate: '' });
  const [isSubscriptionCancel, setIsSubscriptionCancel] = useState(false);
  // Get competition details
  const competitionStr = useSelector((state) => state.Competition, shallowEqual);
  const selectedComp = SelectedCompetition.StrToObj(competitionStr);
  const competition_id = selectedComp?.item?.competition_id;
  const competitionDetails = useSelector((state) => state.GetCompetitionDetails, shallowEqual);

  // Get instance type
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);

  const premiumCompetition = useSelector((state) => state.PremiumCompetition.data, shallowEqual);
  const isNotSubscribed = premiumCompetition?.is_subscribed === 0;
  const isPremium = selectedComp?.item?.is_premium;

  // Redirect if not subscribed
  useEffect(() => {
    if (isNotSubscribed || !isPremium) {
      SelectedCompetition.GotoCompetition();
    }
  }, [isNotSubscribed, isPremium]);

  // Fetch subscription details
  useEffect(() => {
    if (competition_id && isPremium && !isNotSubscribed) {
      let dto = {
        grade: competitionDetails?.current_grade,
        competition_id: competition_id,
      };
      dispatch(
        GetSubscriptionDetails(dto, (data) => {
          if (data) {
            setSubscriptionDetailsData(data);
            setDates({
              currentDate: formatDate(data.subscriptionStartDate),
              futureDate: formatDate(data.subscriptionEndDate),
            });
          }
        })
      );
    }
  }, [dispatch, competition_id, isNotSubscribed, isPremium, competitionDetails.current_grade]);

  // Payment data
  const paymentData = {
    paymentType: subscriptionDetailsData?.paymentMode?.toUpperCase() || 'UNKNOWN',
    amountPaid: subscriptionDetailsData?.amount || 0,
  };

  // Navigate to payment
  // const handleContinueClick = useCallback(() => {
  //   PageSwitch(defaultNavConstants.PAYMENT);
  // }, []);

  const callback = (e, item) => {
    const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag');

    switch (t) {
      case 'cancel-subscription':
        setIsSubscriptionCancel(true);

        break;
      case 'cancel-subscription-positive':
        dispatch(
          CancelUserSubscription(subscriptionDetailsData?.transactionToken, (data) => {
            if (data) {
              let dto = {
                grade: competitionDetails?.current_grade,
                competition_id: competition_id,
              };
              dispatch(
                GetSubscriptionDetails(dto, (data) => {
                  if (data) {
                    setSubscriptionDetailsData(data);
                  }
                })
              );
            }
          })
        );
        setIsSubscriptionCancel(false);
        break;
      default:
        setIsSubscriptionCancel(false);
        break;
    }
  };

  // Page UI
  const PageUI = (
    <Grid item xs={12}>
      <IconPaper
        title={texts.MY_SUBSCRIPTION}
        addCodeIcon={IMAGES.MY_SUBSCRIPTION_ICON}
        ADD_CODE
        title_bg="#112D70"
        className={styled.select_grade_box}
        fullWidth
      >
        <Grid container direction="column" spacing={2} className="subscription-card">
          <Grid item>
            <PaymentCard texts={texts} paymentData={paymentData} isPaymentSuccessful isShupavu={isShupavu} dates={dates} />
          </Grid>
          <Grid
            item
            justifyContent="center"
            className={styled.btn_div}
            style={{ margin: '0 auto', display: 'flex', flexDirection: 'row', gap: '10px' }}
          >
            {/* <ButtonBold bgBlue yellowBubble secondaryYellow tag="subscribe" onClick={handleContinueClick} styleCSS={{ width: '100%' }}>
              {texts.UPGRADE}
            </ButtonBold> */}
            {subscriptionDetailsData?.paymentMode === 'card' && subscriptionDetailsData.isSubscriptionCancel === 0 && (
              <ButtonBold
                noTextWrap
                yellowBubble
                secondaryYellow
                tag="cancel-subscription"
                onClick={callback}
                styleCSS={{ width: '100%' }}
              >
                {texts.CANCEL}
              </ButtonBold>
            )}
          </Grid>
        </Grid>
      </IconPaper>
    </Grid>
  );

  return (
    <>
      <ConfirmationBox
        visible={isSubscriptionCancel}
        callback={callback}
        addCodeIcon={IMAGES.SIGN_OUT}
        ADD_CODE
        allowClose
        hideCross
        className={styled.confirmation_box}
        buttonsContainer={styled.sign_out_buttons_container}
        title={texts.CANCEL_SUBSCRIPTION}
        primary={texts.CONFIRM_CANCEL}
        positive={texts.YES}
        negative={texts.NO}
        tag="cancel-subscription"
      />
      <PageStructure PageUI={PageUI} />
    </>
  );
};

export default MySubscription;
