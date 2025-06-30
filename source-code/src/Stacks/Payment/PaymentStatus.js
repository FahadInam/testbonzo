import { H1, Body1, Button, ButtonText } from 'Components';
import React, { useEffect, useMemo, useState } from 'react';
import { Box, useTheme, Grid, Stepper, Step, StepLabel, useMediaQuery } from '@material-ui/core';
import useStyles from './style';
import { checkStatus, getErrorDescription, GetPaymentStatus, verifyDtoPayment, verifySafaricomPayment } from 'Actions/payment.action';
import { getSubDate } from 'Actions/payment.action';
import defaultNavConstants from 'Navigation/Paths/defaultNav.constants';
import { PageSwitch } from 'Navigation';
import SuccessIcon from '../../Assets/images/bonzoui/payment/Payment success.svg';
import FailIcon from '../../Assets/images/bonzoui/payment/Cancel.svg';
import MessageIcon from '../../Assets/images/bonzoui/payment/MessageIcon.svg';
import PhoneIcon from '../../Assets/images/bonzoui/payment/PhoneIcon.svg';
import PendingIcon from '../../Assets/images/bonzoui/payment/PendingIcon.png';

// import { Skeleton } from '@material-ui/lab';
import StarView from '../../Components/Layouts/StarView';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { formatDate, getInstanceType } from 'Utils';
import { INSTANCES_ID } from 'Constants/instance.config';
import CustomStepIcon from './StepIcon';
import PaymentSkeleton from './PaymentSkeleton';
import PaymentCard from './PaymentCard';
import { SelectedCompetition, User } from 'Actions';
import { gameDispatch } from 'Utils/ActionCreators';
import { PREMIUM_COMPETITION, USER_TYPE } from 'Constants';
import PaymentLoader from './PaymentLoader';

const PaymentStatus = () => {
  const styled = useStyles();
  const { texts } = useTheme();
  const dispatch = useDispatch();
  const user = User.Info();
  const isMdOrLess = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);

  const competition_data = useSelector((state) => state.Competition, shallowEqual);
  const selected_competition = SelectedCompetition.StrToObj(competition_data);
  const competition_detail = useSelector((state) => state.GetCompetitionDetails, shallowEqual);
  const isSafaricomUser = user?.user_type === USER_TYPE.Safaricom;

  //const steps = isShupavu ? ['Choose Bundle', 'Choose Payment', 'Payment Status'] : ['Choose Payment', 'Confirm'];

  const steps = isMdOrLess
    ? isShupavu
      ? ['Bundle', 'Payment', 'Status']
      : ['Payment', 'Confirm']
    : isShupavu
    ? ['Choose Bundle', 'Choose Payment', 'Payment Status']
    : ['Choose Payment', 'Confirm'];

  const [dates, setDates] = useState({ currentDate: '', futureDate: '' });
  const [paymentData, setPaymentData] = useState({
    userId: '',
    transactionStatus: '',
    transactionRef: '',
    amountPaid: '',
    durationMonths: '',
    paymentType: '',
  });

  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [isPaymentPending, setIsPaymentPending] = useState(false); // Add loading state
  const [isSubscriptionPending, setIsSubscriptionPending] = useState(false);
  const [isSubscriptionFailed, setIsSubscriptionFailed] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [paymentStatus, setPaymentStatus] = useState(null);

  const isPaymentSuccessful = useMemo(
    () => paymentData.transactionStatus === 2 || paymentData.transactionStatus === '000' || paymentData.response_status === '000',
    [paymentData.transactionStatus, paymentData.response_status]
  );

  const isShupavuPaymentFailed = !isPaymentSuccessful && isShupavu;
  let isSafaricomPaymentFailed = isShupavuPaymentFailed && isSafaricomUser;
  const isDpoPaymentFailed = isShupavuPaymentFailed && !isSafaricomUser;

  // const [activeStep, setActiveStep] = useState(2);
  const [activeStep] = useState(2);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (!params.has('TransactionToken')) {
      if (!isSafaricomUser) {
        let response = checkStatus(params);
        setPaymentData({
          userId: response?.get('userid'),
          transactionStatus: parseInt(response?.get('transtatus')),
          transactionRef: response?.get('tranref'),
          amountPaid: response?.get('amount'),
          durationMonths: response?.get('durdays'),
          paymentType: response?.get('paymode'),
        });
        const totalMonths = Math.round(parseInt(response?.get('durdays')) / 30);
        //  const monthsToAdd = Math.round(parseInt(durationMonths) / 30);

        const { currentDate, futureDate } = getSubDate(totalMonths);
        setDates({ currentDate, futureDate });
        setIsLoading(false); // Data loaded, stop loading
      } else if (isSafaricomUser) {
        const epgw_payment_payload = params?.get('epgw_payment_payload');
        let dto = {
          epgw_payment_payload,
          timezone: user?.timezone,
        };
        if (epgw_payment_payload) {
          dispatch(
            verifySafaricomPayment(dto, (data) => {
              processPaymentResponse(data);
              if (data?.response_status === '222' || data?.response_status === '333') {
                pollPaymentStatus(dto);
              } else {
                getPaymentStatus();
                setIsLoading(false);
              }
            })
          );
        } else {
          setIsSubscriptionFailed(true);
          setIsLoading(false);
        }
      }
    } else {
      const transactionToken = params.get('TransactionToken');
      let dto = {
        transaction_token: transactionToken,
        timezone: user?.timezone,
      };

      dispatch(
        verifyDtoPayment(dto, (data) => {
          const transactionSettlementDate = data?.data?.transactionSettlementDate;
          console.log('transactionSettlementDate', transactionSettlementDate);
          // const { currentDate, futureDate } = getSubDate(12, transactionSettlementDate);

          setDates({
            currentDate: formatDate(data?.data?.subscription_start_date),
            futureDate: formatDate(data?.data?.subscription_end_date),
          });
          setPaymentData((prevData) => ({
            ...prevData,
            transactionStatus: data?.data?.response_status,
            amountPaid: data?.data?.amount,
            paymentType: data?.data?.payment_mode?.toUpperCase(),
          }));
          setIsLoading(false); // Data loaded, stop loading
          // call the api to get the payment status
          getPaymentStatus();
        })
      );
    }
    // eslint-disable-next-line
  }, [dispatch]);

  function processPaymentResponse(responseData) {
    setDates({
      currentDate: formatDate(responseData?.data?.subscription_start_date),
      futureDate: formatDate(responseData?.data?.subscription_end_date),
    });

    setPaymentData((prevData) => ({
      ...prevData,
      transactionStatus: responseData?.data?.response_status,
      amountPaid: responseData?.data?.amount,
      paymentType: responseData?.data?.payment_mode?.toUpperCase(),
    }));
  }
  function pollPaymentStatus(dto) {
    const pollInterval = 5000;
    const maxAttempts = 10;
    let attempts = 0;

    const checkStatus = () => {
      attempts++;

      setTimeout(() => {
        dispatch(
          verifySafaricomPayment(dto, (pollData) => {
            processPaymentResponse(pollData);

            // Check status and decide whether to continue polling
            if ((pollData?.response_status === '222' || pollData?.response_status === '333') && attempts < maxAttempts) {
              checkStatus(); // Continue polling
            } else if (pollData?.response_status === '111') {
              isSafaricomPaymentFailed = true;
              setIsLoading(false);
              getPaymentStatus();
            } else if (pollData?.data?.response_status === '000') {
              getPaymentStatus();
              setIsLoading(false);
            } else if (pollData?.response_status === '222') {
              setIsLoading(false);
              getPaymentStatus();
              setIsSubscriptionPending(true);
            } else {
              setIsLoading(false);
              getPaymentStatus();
              setIsPaymentPending(true);
            }
          })
        );
      }, pollInterval);
    };

    // Start the polling
    checkStatus();
  }

  const getPaymentStatus = () => {
    const paymentStatusDTO = {
      competition_id: selected_competition?.item?.competition_id,
      current_grade: competition_detail?.current_grade,
    };
    dispatch(
      GetPaymentStatus(paymentStatusDTO, (data) => {
        gameDispatch(PREMIUM_COMPETITION.SET_DATA, data);
      })
    );
  };

  const handleContinueClick = () => {
    if (isPaymentSuccessful || isPaymentPending || isSubscriptionPending) {
      if (isShupavu) {
        SelectedCompetition.GotoCompetition();
      } else {
        PageSwitch(defaultNavConstants.COMPETITIONS);
      }
    } else {
      PageSwitch(defaultNavConstants.PAYMENT);
    }
  };

  const getPaymentTitle = () => {
    if (isPaymentSuccessful) return texts.PAYMENT_SUCCESS_TITLE;
    if (isSubscriptionFailed) return texts.SUBSCRIPTION_FAILED_TITLE;
    if (isShupavuPaymentFailed && !isPaymentPending && !isSubscriptionPending) return texts.YOUR_PAYMENT_FAILED;
    if (isPaymentPending) return texts.PAYMENT_PENDING_TITLE;
    if (isSubscriptionPending) return texts.SUBSCRIPTION_PENDING_TITLE;

    return texts.PAYMENT_FAILED_TITLE;
  };

  const getPaymentMessage = () => {
    if (isPaymentSuccessful) {
      return isShupavu ? texts.SHUPAVU_PAYMENT_SUCCESS : texts.PAYMENT_SUCCESS;
    }
    if (isSubscriptionFailed) return getErrorDescription(texts);
    if (!isShupavu) return texts.PAYMENT_FAILED;
    if (isSafaricomPaymentFailed && !isPaymentPending && !isSubscriptionPending) return texts.CHECK_AIRTIME_BALANCE;
    if (isPaymentPending) return texts.PAYMENT_PENDING_TEXT;
    if (isSubscriptionPending) return texts.SUBSCRIPTION_PENDING;
    if (isDpoPaymentFailed) return texts.UNABLE_TO_PROCESS_PAYMENT;

    return texts.SHUPAVU_PAYMENT_FAILED;
  };

  const getButtonMessage = () => {
    if (isPaymentSuccessful || isPaymentPending || isSubscriptionPending) return isShupavu ? texts.CONTINUE : texts.GO_TO_COMPETITIONS;
    return texts.TRY_AGAIN_TITLE;
  };

  // console.log('isShupavu', isShupavu);
  // Skeleton Loader
  if (isLoading && isShupavu && !isSafaricomUser) {
    return <PaymentSkeleton />;
  }
  return (
    <StarView showRight={true} hideCoins={true} showLeft={false} showGradient showHeader>
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          display: 'flex',
          width: {
            xs: '95%',
            sm: '95%',
            md: '95%',
            lg: '80%',
          },
          borderRadius: '20px',
          flexDirection: 'column',
          margin: 'auto',
          justifyContent: 'center',
          overflowY: 'scroll',
          alignItems: 'center',
          zIndex: '1',
          paddingTop: '1rem',
          marginBottom: {
            xs: '2rem',
            sm: '2rem',
            md: '2rem',
            lg: 0,
          },
          marginTop: {
            xs: '2rem',
            sm: '2rem',
            md: '2rem',
            lg: 0,
          },
          height: isShupavuPaymentFailed ? '' : '85vh',
        }}
      >
        <Box
          sx={{
            width: '90%',
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
          }}
        >
          {isShupavu && (
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              style={{ backgroundColor: '#FFFFFF', width: '100%', marginBottom: '0.5rem' }}
            >
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel StepIconComponent={CustomStepIcon} classes={{ label: styled.label_color }}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          )}
          {isSafaricomUser && isLoading ? (
            <PaymentLoader />
          ) : (
            <>
              <img
                src={isPaymentPending || isSubscriptionPending ? PendingIcon : isPaymentSuccessful ? SuccessIcon : FailIcon}
                alt="response"
                className={styled.payment_icon}
              />

              <H1
                textAlign="center"
                ml="0"
                mr="0"
                mt={isShupavuPaymentFailed ? '3' : '1'}
                mb={isShupavuPaymentFailed ? '3' : '2'}
                className={styled.payment_title}
              >
                {getPaymentTitle()}
              </H1>
              <Body1 mb={2} textAlign="center" fontSize="16px" className="poppins-font-500">
                {getPaymentMessage()}
              </Body1>
              {isShupavuPaymentFailed && !isPaymentPending && !isSubscriptionPending && !isSubscriptionFailed && (
                <Body1 mb={3} textAlign="center" fontSize="16px" className="poppins-font-500">
                  {isSafaricomUser ? texts.USING_SAFARICOM_DATA : texts.KEEP_SUBSCRIPTION_ACTIVE}
                </Body1>
              )}
              {!isShupavu && (
                <Box textAlign="center">
                  <Body1 textAlign="center" fontWeight="600" fontSize="24px" color="#1D2433">
                    {texts.ORDER_ID} {paymentData.transactionRef}
                  </Body1>
                </Box>
              )}
              {isShupavuPaymentFailed ? (
                <></>
              ) : (
                <PaymentCard
                  texts={texts}
                  paymentData={paymentData}
                  isPaymentSuccessful={isPaymentSuccessful}
                  isShupavu={isShupavu}
                  dates={dates}
                />
              )}
              <Button
                variant="contained"
                className={`${styled.payment_selection} ${styled.center} ${isShupavuPaymentFailed ? styled.btn_small_width : ''}`}
                onClick={handleContinueClick}
                background="#02BBFE"
              >
                <ButtonText color="#FFF" fontSize="16px" fontWeight="600" letterSpacing="0.5px">
                  {getButtonMessage()}
                </ButtonText>
              </Button>
              <Box display="flex" justifyContent="center" alignItems="center" mt="2rem" mb="2rem">
                <Grid container spacing={12} justifyContent="center" alignItems="center">
                  <Grid item xs={12} md={6} lg={6} xl={3}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems={{ xs: 'center', md: 'flex-start' }}
                      textAlign={{ xs: 'center', md: 'left' }}
                    >
                      <Body1 fontSize="16px" color="#02BBFE" fontWeight="600">
                        {texts.HELP_SUPPORT}
                      </Body1>
                      <Body1 fontSize="12px" color="#414141">
                        {texts.NEED_ASSISTANCE}
                      </Body1>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} xl={3}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems={{ xs: 'center', md: 'flex-end' }}
                      textAlign={{ xs: 'center', md: 'right' }}
                    >
                      <Box display="flex" alignItems="center" justifyContent="flex-end" mb={{ xs: 1, md: 0 }}>
                        <img src={PhoneIcon} alt="phone" style={{ marginRight: '8px' }} />
                        <Body1 fontSize="12px" color="#414141">
                          {isShupavu ? texts.SHUPAVU_NUMBER_SUPPORT : texts.NUMBER_SUPPORT}
                        </Body1>
                      </Box>
                      <Box display="flex" alignItems="center" justifyContent="flex-end">
                        <img src={MessageIcon} alt="message" style={{ marginRight: '8px' }} />
                        <Body1 fontSize="12px" color="#414141">
                          {isShupavu ? texts.SHUPAVU_EMAIL_SUPPORT : texts.EMAIL_SUPPORT}
                        </Body1>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </StarView>
  );
};

export default PaymentStatus;
