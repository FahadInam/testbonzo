import React from 'react';
import { Box, Typography, CircularProgress, useTheme } from '@material-ui/core';

const MUIPaymentLoader = () => {
  const { texts } = useTheme();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={3} sx={{ height: '400px' }}>
      {/* Circular spinner */}
      <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} color="secondary" />

      <Typography variant="body1" align="center" color="text.primary" sx={{ mb: 2 }}>
        {texts.PAYMENT_PROCESSING}
      </Typography>

      <Typography variant="body2" align="center" color="text.secondary">
        {texts.SECURE_PAYMENT}
      </Typography>
    </Box>
  );
};

export default MUIPaymentLoader;
