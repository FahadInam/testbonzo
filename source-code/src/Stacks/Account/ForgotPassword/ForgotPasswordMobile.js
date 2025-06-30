import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import MobilePageStructure from '../shared/MobilePageStructure';
import { ForgotPasswordUI, ForgotPasswordSuccessUI } from './LocalComponent';
import useStyles from '../shared/AnimatedBgStyle';

const ForgotPasswordMobile = () => {
  const [requestSubmitted, useRequestSubmitted] = useState(false);
  const Callback = () => {
    useRequestSubmitted(true);
  };
  const styled = useStyles();
  return (
    <Box className={styled.rootX2}>
      <Box className={styled.rootY2}>
        <MobilePageStructure hideLogo={requestSubmitted} hideHeader Top>
          {requestSubmitted ? <ForgotPasswordSuccessUI /> : <ForgotPasswordUI callback={Callback} />}
        </MobilePageStructure>
      </Box>
    </Box>
  );
};

export default ForgotPasswordMobile;
