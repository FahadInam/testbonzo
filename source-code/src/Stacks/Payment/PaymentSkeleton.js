import React, { useState } from 'react';
import { Box, Grid, Stepper, Step, StepLabel, Paper, useMediaQuery } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { StarView } from 'Components';
import CustomStepIcon from './StepIcon';
import useStyles from './style';

const PaymentSkeleton = () => {
  // const [activeStep, setActiveStep] = useState(0);
  const [activeStep] = useState(2);
  const isMdOrLess = useMediaQuery((theme) => theme.breakpoints.down('md'));

  // const steps = ['Choose Bundle', 'Choose Payment', 'Payment Status'];

  const steps = isMdOrLess ? ['Bundle', 'Payment', 'Status'] : ['Choose Bundle', 'Choose Payment', 'Payment Status'];

  const styled = useStyles();

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
          height: '85vh',
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
          {/* Skeleton for Stepper */}
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            style={{ backgroundColor: '#FFFFFF', width: '100%', marginBottom: '1.5rem' }}
          >
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel StepIconComponent={CustomStepIcon} classes={{ label: styled.label_color }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Skeleton for Icon */}
          <Skeleton variant="circular" width={80} height={80} style={{ margin: 'auto' }} />

          {/* Skeleton for Title */}
          <Skeleton variant="text" width={200} height={40} style={{ margin: '16px auto' }} />

          {/* Skeleton for Message */}
          <Skeleton variant="text" width={300} height={24} style={{ margin: '16px auto' }} />

          {/* Skeleton for Order ID */}
          <Skeleton variant="text" width={250} height={32} style={{ margin: '16px auto' }} />

          {/* Skeleton for Payment Details Card */}
          <Box display="flex" justifyContent="center" alignItems="center" mt="2rem" mb="1rem">
            <Paper className={styled.card_width}>
              <Grid container spacing={2}>
                {[1, 2, 3].map((index) => (
                  <Grid item xs={12} key={index}>
                    <Grid container justifyContent="space-between" className={styled.payment_card}>
                      <Skeleton variant="text" width={120} height={24} />
                      <Skeleton variant="text" width={80} height={24} />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>

          {/* Skeleton for Subscription Expiry Card */}
          <Box display="flex" justifyContent="center" alignItems="center" mb="2rem">
            <Paper className={styled.card_width}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container justifyContent="space-between" className={styled.payment_card}>
                    <Skeleton variant="text" width={120} height={24} />
                    <Skeleton variant="text" width={80} height={24} />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Box>

          {/* Skeleton for Button */}
          <Skeleton variant="rectangular" width={200} height={40} style={{ margin: '16px auto' }} />

          {/* Skeleton for Help and Support Section */}
          <Box display="flex" justifyContent="center" alignItems="center" mt="2rem" mb="2rem">
            <Grid container spacing={12} justifyContent="center" alignItems="center">
              <Grid item xs={12} md={6} lg={6} xl={3}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems={{ xs: 'center', md: 'flex-start' }}
                  textAlign={{ xs: 'center', md: 'left' }}
                >
                  <Skeleton variant="text" width={120} height={24} />
                  <Skeleton variant="text" width={200} height={16} />
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
                    <Skeleton variant="circular" width={24} height={24} />
                    <Skeleton variant="text" width={100} height={16} style={{ marginLeft: '8px' }} />
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="flex-end">
                    <Skeleton variant="circular" width={24} height={24} />
                    <Skeleton variant="text" width={150} height={16} style={{ marginLeft: '8px' }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </StarView>
  );
};

export default PaymentSkeleton;
