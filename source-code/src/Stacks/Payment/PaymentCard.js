import React from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import { Body1, Paper } from 'Components';
import useStyles from './style';

const PaymentCard = ({ texts, paymentData, dates, isPaymentSuccessful, isShupavu }) => {
  const styled = useStyles();

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" mt="1rem" mb="1rem">
        <Paper className={styled.card_width}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="space-between" className={styled.payment_card}>
                <Body1 className={`${styled.payment_card_text} poppins-font-500`} fontSize="16px" color="#6D727C">
                  {texts.TRANSACTION_DATE}
                </Body1>
                <Typography
                  variant="body1"
                  color="#1D2433"
                  className={`${styled.payment_card_text} poppins-font-600`}
                  style={{ fontSize: '16px' }}
                >
                  {dates.currentDate}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="space-between" className={styled.payment_card}>
                <Body1 className={`${styled.payment_card_text} poppins-font-500`} fontSize="16px" color="#6D727C">
                  {texts.PAYMENT_METHOD}
                </Body1>
                <Typography
                  variant="body1"
                  color="#1D2433"
                  className={`${styled.payment_card_text} poppins-font-600`}
                  style={{ fontSize: '16px' }}
                >
                  {/* {paymentData.paymentType === 'MWALLET' ? 'JazzCash' : 'Credit/Debit'} */}
                  {isShupavu && paymentData.paymentType === 'SAFARICOMAIRTIME'
                    ? 'SAFARICOM AIRTIME'
                    : isShupavu
                    ? paymentData.paymentType
                    : paymentData.paymentType === 'MWALLET'
                    ? 'JazzCash'
                    : 'Credit/Debit'}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="space-between" className={styled.payment_card}>
                <Body1 color="#6D727C" className={`${styled.payment_card_text} poppins-font-500`} fontSize="16px">
                  {isPaymentSuccessful ? 'Amount Paid' : 'Pending Amount'}
                </Body1>
                <Typography
                  variant="body1"
                  color="#1D2433"
                  className={`${styled.payment_card_text} poppins-font-600`}
                  style={{ fontSize: '16px' }}
                >
                  {isShupavu ? 'KES' : 'Rs'} {paymentData.amountPaid}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb="0.7rem">
        <Paper className={styled.card_width}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="space-between" className={styled.payment_card}>
                <Body1 color="#6D727C" className={`${styled.payment_card_text} poppins-font-500`} fontSize="16px">
                  {texts.SUBSCRIPTION_EXPIRY}
                </Body1>
                <Typography
                  variant="body1"
                  color="#1D2433"
                  className={`${styled.payment_card_text} poppins-font-600`}
                  style={{ fontSize: '16px' }}
                >
                  {dates.futureDate}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default PaymentCard;
