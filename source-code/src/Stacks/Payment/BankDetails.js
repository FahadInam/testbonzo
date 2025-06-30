import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  useTheme,
  Typography,
  Divider,
  Paper,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Snackbar,
  useMediaQuery,
} from '@material-ui/core';
import useStyles from './style';
import { BANK_DETAILS } from 'Constants';
import StepIcon from './StepIcon';
import { useLocation } from 'react-router-dom';
import { bankTransferOrderRequest, getSubDate } from 'Actions/payment.action';
import User from 'Actions/user.action';
import { shallowEqual, useSelector } from 'react-redux';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import StarView from '../../Components/Layouts/StarView';
import { PageSwitch } from 'Navigation';
import { DefaultNav } from 'Navigation/Paths';
import { Button } from 'Components';

const steps = ['Choose Payment', 'Pending'];

const BankPage = () => {
  const styled = useStyles();
  const location = useLocation();
  const { state } = location;
  const user = User.Info();
  // console.log(state, "location")
  const { texts } = useTheme();
  const classes = useStyles();
  const activeStep = 1;
  const [transRef, setTransRef] = useState(null);
  const [dates, setDates] = useState({ currentDate: '', futureDate: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const premiumCompetition = useSelector((state) => state.PremiumCompetition.data, shallowEqual);
  const isMdOrLess = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const requestDataRef = useRef({
    amount: state?.data[0].amount,
    email: user?.email,
    payment_gateway: '2',
    payment_mode: 'BankTransfer',
    duration_in_days: state?.data[0].duration_in_days,
    subscription_id: state?.data[0].id,
    user_id: user?.user_id,
    username: user?.username,
    vendor_uid: state?.data[0]?.payment_vendor_guid,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user.active_role === 'principal') {
        requestDataRef.current = {
          ...requestDataRef.current,
          grade: '0',
          system_id: user?.school_id,
        };
      } else {
        requestDataRef.current = {
          ...requestDataRef.current,
          grade: premiumCompetition?.current_grade.toString(),
          system_id: premiumCompetition?.competition_id,
        };
      }
      const total_months = Math.round(parseInt(state?.data[0].duration_in_days) / 30);
      const { currentDate, futureDate } = getSubDate(total_months);
      setDates({ currentDate, futureDate });

      try {
        const result = await bankTransferOrderRequest(requestDataRef.current);
        // Loader.show();
        if (result) {
          setTransRef(result.data);
        }
        //  console.log(result, "result")
      } catch (err) {
        // setError(err);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const handleBack = (val) => {
    PageSwitch(DefaultNav.PAYMENT);
  };

  return (
    <StarView showRight={true} hideCoins={true} showGradient showHeader callback={handleBack} leftTitle={texts.BACK} isAccount={false}>
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
          padding: 3,
          overflowY: 'scroll',
          zIndex: '1',
          marginBottom: {
            xs: '2rem',
            sm: '2rem',
            md: '2rem',
            lg: 0,
          },
        }}
      >
        {/* <Box sx={{ height: '114px', backgroundColor: 'white', display: 'flex', alignItems: 'left', justifyContent: 'start', marginBottom: '24px', paddingLeft: "2rem" }}>
      <Box className={styled.menuButton}>
             <Button
            mt={3}
            tag="back"
            type="submit"
            background="#fff" 
            color="#215AEB"
            onClick={() => history.goBack()}
            startIcon={<i className="i i-left icon-custom-color" />}
          >
            <Body1 color="#112D70" >Back</Body1>
          </Button>
          </Box>
      </Box> */}
        <Box sx={{ backgroundColor: 'white', paddingLeft: { xs: '1rem', lg: '4rem' }, paddingRight: { xs: '1rem', lg: '4rem' } }}>
          {/* Stepper Component */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              flexDirection: { xs: 'column', sm: 'row' },
              paddingTop: { xs: '0.5rem', lg: '0rem' },
            }}
          >
            {isMdOrLess && (
              <Button
                mt={3}
                tag="left-btn"
                type="submit"
                className={classes.backLinkColor}
                onClick={handleBack}
                startIcon={<i className={`${classes.backLinkColor} i i-left `} />}
              ></Button>
            )}

            <Box
              sx={{
                width: '100%',
                marginBottom: '1rem',
                marginTop: {
                  xs: '0rem',
                  lg: '1rem',
                },
              }}
            >
              <Stepper activeStep={activeStep} alternativeLabel style={{ backgroundColor: '#FFFFFF' }}>
                {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel StepIconComponent={StepIcon} classes={{ label: styled.label_color }}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>

          <Typography variant="h3" style={{ color: '#1D2433', fontWeight: '700' }} className={styled.bank_card_text}>
            {texts.CONFIRM_PAYMENT}
          </Typography>
          <Typography
            variant="body1"
            paragraph
            className={`${styled.bank_card_text} ${styled.text_color}`}
            style={{ fontWeight: '500' }}
          >
            {texts.TRANSACTION_ID_NO} {transRef}. {texts.BANK_INSTRUCTION}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '1rem',
              mt: '2rem',
              flexDirection: { xs: 'column', md: 'column', lg: 'row' },
              gap: '2rem',
              alignItems: 'center',
              // Flex column on extra-small screens and flex row on medium screens and above
            }}
          >
            {/* Bank Instructions Card */}

            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" style={{ color: '#1D2433', fontWeight: '700' }}>
                {texts.BANK_INSTRUCTIONS}
              </Typography>

              <Box>
                <Box>
                  <Typography variant="body1" color="textSecondary" className={styled.bank_card_text}>
                    {texts.STEP_1}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="black"
                    style={{ fontWeight: 500 }}
                    className={`${styled.bank_card_text} ${styled.text_color}`}
                  >
                    {texts.SCREENSHOT_DETAIL}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" className={styled.bank_card_text}>
                    {texts.STEP_2}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="black"
                    style={{ fontWeight: 500 }}
                    className={`${styled.bank_card_text} ${styled.text_color}`}
                  >
                    Initiate a bank transfer of PKR {state?.data[0]?.amount}/= to the details mentioned.
                  </Typography>
                  <Typography variant="body1" color="textSecondary" className={styled.bank_card_text}>
                    {texts.STEP_3}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="black"
                    style={{ fontWeight: 500 }}
                    className={`${styled.bank_card_text} ${styled.text_color}`}
                  >
                    {texts.WHATSAPP_DETAIL}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Bank Details Card */}
            <Box sx={{ flex: 1, width: { xs: '98%', md: 'auto' } }}>
              <Typography variant="h6" style={{ color: '#1D2433', fontSize: '22px' }}>
                {texts.BANK_DETAILS}
              </Typography>
              <Paper style={{ marginTop: '1rem' }}>
                <Box className={classes.payment_card}>
                  <Box>
                    <Box
                      sx={{
                        display: { xs: 'block', md: 'flex' },
                        justifyContent: 'space-between',
                        marginBottom: 1,
                        gap: '2rem',
                        textAlign: { xs: 'center', md: 'inherit' },
                        paddingTop: { xs: '0.1rem', md: '0rem' },
                      }}
                    >
                      <Typography variant="body1" color="textSecondary" className={styled.bank_card_text}>
                        {texts.BANK_ACCOUNT_TITLE}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="black"
                        className={`${styled.bank_card_text} ${styled.text_color}`}
                        style={{ fontWeight: 500 }}
                      >
                        {BANK_DETAILS.ACCOUNT_TITLE}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: { xs: 'block', md: 'flex' },
                        justifyContent: 'space-between',
                        marginBottom: 1,
                        textAlign: { xs: 'center', md: 'inherit' },
                      }}
                    >
                      <Typography variant="body1" color="textSecondary" className={styled.bank_card_text}>
                        {texts.BANK_IBAN}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="black"
                        className={`${styled.bank_card_text} ${styled.text_color}`}
                        style={{ fontWeight: 500 }}
                      >
                        {BANK_DETAILS.IBAN}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: { xs: 'block', md: 'flex' },
                        justifyContent: 'space-between',
                        marginBottom: 1,
                        textAlign: { xs: 'center', md: 'inherit' },
                      }}
                    >
                      <Typography variant="body1" color="textSecondary" className={styled.bank_card_text}>
                        {texts.BANK_ACCOUNT_NUMBER}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center' } }}>
                        <Typography
                          variant="body1"
                          color="black"
                          className={`${styled.bank_card_text} ${styled.text_color}`}
                          style={{ fontWeight: 500 }}
                        >
                          {BANK_DETAILS.ACCOUNT_NUMBER}
                        </Typography>
                        <IconButton onClick={() => handleCopy(BANK_DETAILS.ACCOUNT_NUMBER)}>
                          <FileCopyIcon style={{ color: '#02BBFE' }} />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: { xs: 'block', md: 'flex' },
                        justifyContent: 'space-between',
                        marginBottom: 1,
                        textAlign: { xs: 'center', md: 'inherit' },
                      }}
                    >
                      <Typography variant="body1" color="textSecondary" className={styled.bank_card_text}>
                        {texts.BANK_NAME}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="black"
                        className={`${styled.bank_card_text} ${styled.text_color}`}
                        style={{ fontWeight: 500 }}
                      >
                        {BANK_DETAILS.BANK_NAME}
                      </Typography>
                    </Box>
                    <Divider sx={{ marginY: 2 }} />
                    <Box
                      sx={{
                        display: { xs: 'block', md: 'flex' },
                        textAlign: { xs: 'center', md: 'inherit' },
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography variant="body1" color="textSecondary" className={styled.bank_card_text}>
                        {texts.PENDING_AMOUNT}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="black"
                        className={`${styled.bank_card_text} ${styled.text_color}`}
                        style={{ fontWeight: 500 }}
                      >
                        PKR {state?.data[0]?.amount}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
                    {/* Your subscription will be active from the time of payment confirmation for {subscriptionDetails[0].duration_in_months} months */}
                  </Typography>
                </Box>
              </Paper>

              <Paper style={{ marginTop: '1rem' }}>
                <Box className={classes.payment_card}>
                  <Box
                    sx={{
                      display: { xs: 'block', md: 'flex' },
                      textAlign: { xs: 'center', md: 'inherit' },
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="body1" color="textSecondary" className={styled.bank_card_text}>
                      Subscription Expiry
                    </Typography>
                    <Typography
                      variant="body1"
                      color="black"
                      className={`${styled.bank_card_text} ${styled.text_color}`}
                      style={{ fontWeight: 500 }}
                    >
                      {dates.futureDate}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="Copied!"
          ContentProps={{
            style: {
              minWidth: '0px',
              background: '#000000',
              color: '#fff',
            },
          }}
        />
      </Box>
    </StarView>
  );
};

export default BankPage;
