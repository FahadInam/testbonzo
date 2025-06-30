import React, { useEffect, useState } from 'react';
import { Grid, useTheme, useMediaQuery, Box, Stepper, Step, StepLabel } from '@material-ui/core';
import { H1, Body1, Button, SlidableView, ButtonText } from 'Components';
import useStyles from './style';
import { CardButton } from 'Components/Core/Button';
import {
  GetInstitutionPaymentSubscription,
  GetPaymentStatus,
  GetPaymentSubscription,
  processDtoPayment,
  processSafariPayment,
} from 'Actions/payment.action';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import User from '../../Actions/user.action';
import { PageSwitch } from 'Navigation';
import { DefaultNav, PaymentNav } from 'Navigation/Paths';
import CustomStepIcon from './StepIcon';
import JazzCashIcon from '../../Assets/images/bonzoui/payment/Jazzcash.svg';
import BankTransferIcon from '../../Assets/images/bonzoui/payment/Bank.svg';
import CreditIcon from '../../Assets/images/bonzoui/payment/Card.svg';
import StarView from '../../Components/Layouts/StarView';
import { config, USER_TYPE } from 'Constants';
import { INSTANCES_ID } from 'Constants/instance.config';
import { getInstanceType } from 'Utils';
import ShupavuPaymentSelection from './ShupavuPaymentSelection';
import { Account, SelectedCompetition, Spinner } from 'Actions';

//const steps = ['Choose Payment', 'Confirm'];

const PaymentSelection = () => {
  const user = User.Info();
  const classes = useStyles();
  const isNormalUser = user?.user_type !== USER_TYPE.Safaricom;

  const premiumCompetition = useSelector((state) => state.PremiumCompetition.data, shallowEqual);
  const compDetail = useSelector((state) => state.GetCompetitionDetails, shallowEqual);
  const competitionStr = useSelector((state) => state.Competition, shallowEqual);
  const selectedComp = SelectedCompetition.StrToObj(competitionStr);
  const [paymentMode, setPaymentMode] = useState(null);
  const [emailVisible, setEmailVisible] = useState(false);
  const [email, setEmail] = useState('');

  // eslint-disable-next-line no-unused-vars
  const [shupavuPaymentMode, setShupavuPaymentMode] = useState(null);
  const [isSafaricomPaymentSelected, setIsSafaricomPaymentSelected] = useState(false);
  const [selectedPayment_Method, setSelectedPayment_Method] = useState(null);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedBundle, setSelectedBundle] = useState(null); // State to store selected bundle
  const [selectedShupavuCard, setSelectedShupavuCard] = useState(false); // State to store selected bundle
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const isMdOrLess = useMediaQuery((theme) => theme.breakpoints.down('md'));
  let userData = null;
  const selectedBg = 'linear-gradient(0deg, rgba(2,187,254,0.08846866383272056) 100%, rgba(2,187,254,1) 100%, rgba(2,187,254,1) 100%)';
  const { texts } = useTheme();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const styled = useStyles();
  const dispatch = useDispatch();
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);
  const baseUrl = window.location.origin;
  const isSafaricomUser = user?.user_type === USER_TYPE.Safaricom;

  // const steps = isShupavu ? ['Choose Bundle', 'Choose Payment', 'Payment Status'] : ['Choose Payment', 'Confirm'];

  const steps = isMdOrLess
    ? isShupavu
      ? ['Bundle', 'Payment', 'Status']
      : ['Payment', 'Confirm']
    : isShupavu
    ? ['Choose Bundle', 'Choose Payment', 'Payment Status']
    : ['Choose Payment', 'Confirm'];

  // console.log('selectedComp-->', selectedComp?.item?.competition_id);
  //console.log('shupavuPaymentMode', shupavuPaymentMode);

  // console.log(user, "user")
  const handlePaymentMode = (mode) => {
    //   console.log(mode, "mode")
    setPaymentMode(mode);
    setSelectedCard(mode);
    setActiveStep(1);
  };

  // const handleContinueClick = () => {
  //   if (paymentMode === 'Bank') {
  //     PageSwitch(PaymentNav.BANK_TRANSFER, { data: subscriptionData });
  //   } else {
  //     if (user.active_role === 'principal') {
  //       userData = {
  //         grade: '0',
  //         subscription_id: subscriptionData[0]?.id,
  //         subscription_duration_months: subscriptionData[0]?.duration_in_months,
  //         amount: subscriptionData[0]?.amount,
  //         authToken: user.auth_token,
  //         system_id: user?.school_id,
  //         user_id: user.user_id,
  //         username: user.username,
  //         email: user.email,
  //         vendor_id: subscriptionData[0]?.payment_vendor_guid,
  //       };
  //     } else {
  //       userData = {
  //         grade: premiumCompetition?.current_grade.toString(),
  //         subscription_id: subscriptionData[0]?.id,
  //         subscription_duration_months: subscriptionData[0]?.duration_in_months,
  //         amount: subscriptionData[0]?.amount,
  //         authToken: user.auth_token,
  //         system_id: premiumCompetition?.competition_id,
  //         user_id: user.user_id,
  //         username: user.username,
  //         email: user.email,
  //         vendor_id: subscriptionData[0]?.payment_vendor_guid,
  //       };
  //     }

  //     const currentUrl = window.location.href;
  //     let jsonData = JSON.stringify(userData);

  //     if (paymentMode) {
  //       const PaymentUrl = `${config.paymentUrl}pay?type=${encodeURIComponent(paymentMode)}&redirectUrl=${encodeURIComponent(
  //         currentUrl
  //       )}&userDetails=${encodeURIComponent(jsonData)}`;
  //       window.location.href = PaymentUrl;
  //     } else {
  //       alert('Please select a payment mode.');
  //     }
  //   }
  // };

  const handleContinueClick = () => {
    // debugger;
    if (selectedBundle) {
      console.log('Selected bundle:', selectedBundle);
      setActiveStep(1); // Move the Stepper to the next step
      setSelectedShupavuCard(true);
      if (selectedShupavuCard || isSafaricomUser) {
        // If user has selected a payment method then receive email and continue
        if (!emailVisible) {
          setEmailVisible(true);
          return;
        }
        if (isNormalUser ? Account.CheckEmail({ email }, texts) : true) {
          const dto = {
            amount: selectedBundle.amount,
            subscription_guid: selectedBundle.subscription_guid,
            vendor_uid: selectedBundle.payment_vendor_guid,
            phone_number: user.phone_number,
            grade: compDetail.current_grade.toString(),
            currency: 'KES',
            duration_in_days: selectedBundle.duration_in_days,
            competition_id: selectedComp?.item?.competition_id,
            timezone: user?.timezone,
            ...(isNormalUser && {
              redirect_url: `${baseUrl}/payment/status`,
              back_url: `${baseUrl}/payment`,
              email,
            }),
          };

          if (!isSafaricomUser && !isSafaricomPaymentSelected) {
            Spinner.Show();
          }

          if (isNormalUser) {
            // DPO
            dispatch(
              processDtoPayment(dto, (data) => {
                window.location.href = data.paymentRedirectUrl;
              })
            );
          } else {
            // Safaricom
            if (isSafaricomPaymentSelected) {
              Spinner.Show();
              dispatch(
                processSafariPayment(dto, (data) => {
                  window.location.href = data?.url;
                })
              );
            }
          }
        }
        // console.log('api data', dto);
      }
      // You can add additional logic here for payment method selection
    } else if (paymentMode === 'Bank') {
      PageSwitch(PaymentNav.BANK_TRANSFER, { data: subscriptionData });
    } else {
      if (user.active_role === 'principal') {
        userData = {
          grade: '0',
          subscription_id: subscriptionData[0]?.id,
          duration_in_days: subscriptionData[0]?.duration_in_days,
          amount: subscriptionData[0]?.amount,
          authToken: user.auth_token,
          system_id: user?.school_id,
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          vendor_id: subscriptionData[0]?.payment_vendor_guid,
        };
      } else {
        userData = {
          grade: premiumCompetition?.current_grade.toString(),
          subscription_id: subscriptionData[0]?.id,
          duration_in_days: subscriptionData[0]?.duration_in_days,
          amount: subscriptionData[0]?.amount,
          authToken: user.auth_token,
          system_id: premiumCompetition?.competition_id,
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          vendor_id: subscriptionData[0]?.payment_vendor_guid,
        };
      }

      const currentUrl = window.location.href;
      let jsonData = JSON.stringify(userData);

      if (paymentMode) {
        const PaymentUrl = `${config.paymentUrl}pay?type=${encodeURIComponent(paymentMode)}&redirectUrl=${encodeURIComponent(
          currentUrl
        )}&userDetails=${encodeURIComponent(jsonData)}`;
        window.location.href = PaymentUrl;
      } else {
        alert('Please select a payment mode.');
      }
    }
  };

  useEffect(() => {
    // console.log('user', user);
    if (user.active_role === 'principal') {
      dispatch(
        GetInstitutionPaymentSubscription(null, (data) => {
          setSubscriptionData(data);
          if (data) {
            dispatch(GetPaymentStatus({ competition_id: user.school_id, current_grade: '0', inquiry_type: 3 }));
          }
        })
      );
    } else {
      const isPremium = selectedComp?.item?.is_premium;
      const competition_id = selectedComp?.item?.competition_id;

      if (!isPremium || !competition_id) {
        PageSwitch(DefaultNav.COMPETITIONS);
        return;
      }

      console.log('selectedComp', selectedComp);
      dispatch(GetPaymentSubscription(competition_id, setSubscriptionData));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBundleSelect = (bundle) => {
    setSelectedBundle(bundle);
  };

  const handlePaymentCardSelect = (card) => {
    setShupavuPaymentMode(card);
    setSelectedPaymentMethod(card);
  };

  // const handleBack = () => {
  //   // on click back button, if shupavu and selectedShupavuCard is true, then set selectedShupavuCard to false and activeStep to 0
  //   if (isShupavu) {
  //     if (selectedShupavuCard) {
  //       setSelectedShupavuCard(false);
  //       setActiveStep(0);
  //     } else {
  //       SelectedCompetition.GotoCompetition();
  //     }
  //   } else {
  //     PageSwitch(DefaultNav.COMPETITIONS);
  //   }
  // };

  const handleBack = () => {
    if (!isShupavu) {
      return PageSwitch(DefaultNav.COMPETITIONS);
    }

    if (isNormalUser && emailVisible) {
      setEmailVisible(false);
      setActiveStep(1);
      return;
    }

    if (selectedShupavuCard) {
      setSelectedShupavuCard(false);
      setIsSafaricomPaymentSelected(false);
      setSelectedPayment_Method(null);
      setSelectedPaymentMethod(null);
      setActiveStep(0);
      return;
    }

    SelectedCompetition.GotoCompetition();
  };

  return (
    <StarView showRight={true} hideCoins={true} overflowY="scroll" showGradient showHeader callback={handleBack} isAccount={false}>
      {/* Payment page back btn on mobile view */}
      {isMdOrLess && (
        <Button
          mt={3}
          tag="left-btn"
          type="submit"
          className={`payment-back-link-mobile ${classes.backLinkColorNew}`}
          onClick={handleBack}
          startIcon={<i className={`${classes.backLinkColorNew} i i-left `} />}
        ></Button>
      )}
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          width: {
            xs: '95%',
            sm: '95%',
            md: '95%',
            lg: '80%',
          },
          borderRadius: '20px',
          overflowY: 'auto',
          zIndex: '1',
          marginBottom: {
            xs: '2rem',
            sm: '2rem',
            md: '2rem',
            lg: 0,
          },
        }}
      >
        {/* <Box sx={{ height: '114px', backgroundColor: 'white', display: 'flex', alignItems: 'left', justif</Grid>yContent: 'start', marginBottom: '24px', paddingLeft: "</Box>2rem" }}>
            <Box className={styled.menuButton}>
             <Button
            mt={3}
            tag="back"
            type="submit"
            background="#fff" 
            color="#215AEB"
            onClick={() => 
              user.active_role === 'principal'
                ? PageSwitch(DefaultNav.COMPETITIONS)
                : PageSwitch(CompetitionNav.COMPETITION_HOME)
            }
            startIcon={<i className="i i-left icon-custom-color" />}
          >
            <Body1 color="#112D70" >Back</Body1>
          </Button>
          </Box>
      </Box> */}
        <Box sx={{ width: '91%', margin: 'auto' }}>
          <SlidableView>
            {/* Stepper Component */}

            <Box
              sx={{
                width: '100%',
                marginBottom: { xs: '30px', md: '40px', lg: '40px' },
                marginTop: { xs: '1.2rem', md: '1rem', lg: '2.4rem' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  flexDirection: { xs: 'column', sm: 'row' },
                  paddingTop: { xs: '0.5rem', lg: '0rem' },
                }}
              >
                {/* {isMdOrLess && (
                  <Button
                    mt={3}
                    tag="left-btn"
                    type="submit"
                    className={`payment-back-link-mobile ${classes.backLinkColorNew}`}
                    onClick={handleBack}
                    startIcon={<i className={`${classes.backLinkColor} i i-left `} />}
                  ></Button>
                )} */}
                <Stepper
                  activeStep={activeStep}
                  alternativeLabel
                  style={{
                    backgroundColor: '#FFFFFF',
                    width: '100%',
                    ...(isShupavu && { padding: 0 }), // Conditionally add padding
                  }}
                >
                  {steps.map((label, index) => (
                    <Step key={index}>
                      <StepLabel StepIconComponent={CustomStepIcon} classes={{ label: styled.label_color }}>
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Box>

            {isShupavu ? (
              <ShupavuPaymentSelection
                onBundleSelect={handleBundleSelect}
                onPaymentCardSelect={handlePaymentCardSelect}
                isSafaricomPaymentSelected={isSafaricomPaymentSelected}
                setIsSafaricomPaymentSelected={setIsSafaricomPaymentSelected}
                selectedPayment_Method={selectedPayment_Method}
                setSelectedPayment_Method={setSelectedPayment_Method}
                bundleData={subscriptionData}
                selectedShupavuCard={selectedShupavuCard}
                isNormalUser={isNormalUser}
                emailVisible={emailVisible}
                setEmail={setEmail}
                email={email}
                handleEnter={handleContinueClick}
              />
            ) : (
              <Grid container direction="column" style={{ marginBottom: '0.1rem' }}>
                <H1 textAlign="left" ml="0" className={styled.payment_title}>
                  {texts.PAYMENT_TEXT}
                </H1>
                <Body1 mb={4} fontSize="18px" className="poppins-font-400">
                  {texts.PAYMENT_DESCRIPTION}
                </Body1>
                <Grid container spacing={3} direction={isSmallScreen ? 'column' : 'row'} style={{ marginBottom: '0.1rem' }}>
                  <Grid item xs={12} sm={12} md={12} lg={4}>
                    <CardButton
                      tag="jazzcash"
                      onClick={() => handlePaymentMode('MWALLET')}
                      title="Jazzcash"
                      imageUrl={JazzCashIcon}
                      imageWidth="80px"
                      width="500px"
                      shadowColor="#fffff"
                      disableShadow={true}
                      background={selectedCard === 'MWALLET' ? selectedBg : '#FFFFFF'}
                      borderColor={selectedCard === 'MWALLET' ? '#02BBFE' : '#DCDCDC'}
                      imageAlign="left"
                      height="169px"
                      pt="0px"
                      pb="60px"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={4}>
                    <CardButton
                      tag="banktransfer"
                      onClick={() => handlePaymentMode('Bank')}
                      title="Bank Transfer"
                      imageUrl={BankTransferIcon}
                      imageWidth="60px"
                      width="500px"
                      shadowColor="#fffff"
                      disableShadow={true}
                      background={selectedCard === 'Bank' ? selectedBg : '#FFFFFF'}
                      borderColor={selectedCard === 'Bank' ? '#02BBFE' : '#DCDCDC'}
                      imageAlign="left"
                      height="169px"
                      pt="0px"
                      pb="60px"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={4}>
                    <CardButton
                      tag="credit"
                      onClick={() => handlePaymentMode('MIGS')}
                      title="Debit/Credit Card"
                      imageUrl={CreditIcon}
                      imageWidth="60px"
                      width="500px"
                      shadowColor="#fffff"
                      disableShadow={true}
                      background={selectedCard === 'MIGS' ? selectedBg : '#FFFFFF'}
                      borderColor={selectedCard === 'MIGS' ? '#02BBFE' : '#DCDCDC'}
                      imageAlign="left"
                      height="169px"
                      pt="0px"
                      pb="60px"
                    />
                  </Grid>
                </Grid>
                {selectedCard === 'MWALLET' && (
                  <Body1 className="poppins-font-400" textAlign="left" ml="0" fontSize="14px" color="#6D727C">
                    {texts.PAYMENT_CONTINUING_JAZZ}
                  </Body1>
                )}

                {selectedCard === 'Bank' && (
                  <Body1 className="poppins-font-400" textAlign="left" ml="0" fontSize="14px" color="#6D727C">
                    {texts.PAYMENT_CONTINUING_BANK}
                  </Body1>
                )}

                {selectedCard === 'MIGS' && (
                  <Body1 className="poppins-font-400" textAlign="left" ml="0" fontSize="14px" color="#6D727C">
                    {texts.PAYMENT_CONTINUING_CARD}
                  </Body1>
                )}
              </Grid>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: isMdOrLess ? '10vh' : isShupavu ? '12vh' : '20vh',
              }}
            >
              <Button
                className={styled.payment_selection}
                background="#02BBFE"
                onClick={handleContinueClick}
                disabled={(!paymentMode && !selectedBundle) || (selectedShupavuCard && !selectedPaymentMethod)}
              >
                <ButtonText color="#FFF" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
                  {texts.CONTINUE}
                </ButtonText>
              </Button>
            </div>
          </SlidableView>
        </Box>
      </Box>
    </StarView>
  );
};

export default PaymentSelection;
