import React, { useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';

import FaceBookStandalone from 'Actions/facebook.actions';
// import { Button } from '../Core';
import { OutlinedButton } from 'Components/Core/Button';
import { ButtonText } from 'Components/Core';
import { IMAGES } from 'Constants';

const LoginWithFacebookStandAlone = ({ text, callback }) => {
  const [loaded, setLoaded] = useState(typeof window.FB !== 'undefined');
  const { palette } = useTheme();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!loaded)
      FaceBookStandalone.load(() => {
        setLoaded(true);
      });
  }, [loaded]);

  // const gotResponse = (res) => {
  //   Account.LoginWithFacebook(res, true, texts);
  // };

  const handleFacebookLogin = () => {
    if (typeof callback === 'function') {
      callback();
    }
  };

  return (
    <>
      <OutlinedButton
        tag="facebook"
        disable={!loaded}
        background={palette.common.facebook}
        width="100%"
        borderRadius={15}
        startIcon={
          <img
            src={IMAGES.FACEBOOK_ICON}
            alt="Game-based learning"
            style={{
              width: '30px', // Adjust the width based on isMobile
              height: '30px', // Adjust the width based on isMobile
              marginRight: isMobile ? '10px' : '21px', // Adjust the margin based on isMobile
            }}
          />
        }
        onClick={handleFacebookLogin}
      >
        <ButtonText fontSize="18px" fontWeight="500">
          {isMobile ? text.FACEBOOK_TITLE : text.LOGIN_USING_FACEBOOK}
        </ButtonText>
      </OutlinedButton>
    </>
  );
};

export default LoginWithFacebookStandAlone;
