import React from 'react';
// import { useTheme } from '@material-ui/core';

// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

// import { Button } from '../Core';
import { googleAuth } from 'Utils/GoogleAuth';
import { OutlinedButton } from 'Components/Core/Button';
import { ButtonText } from 'Components/Core';
import { IMAGES } from 'Constants';
import { useMediaQuery } from '@material-ui/core';
const LoginWithGoogle = React.memo(({ text, autoLoad, autoLogin }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <OutlinedButton
        borderRadius={15}
        tag="google"
        width="100%"
        startIcon={
          <img
            src={IMAGES.GOOGLE_ICON}
            alt="Game-based learning"
            style={{
              width: '28px', // Adjust the width based on isMobile
              height: '28px', // Adjust the width based on isMobile
              marginRight: isMobile ? '10px' : '15px', // Adjust the margin based on isMobile
            }}
          />
        }
        onClick={() => {
          googleAuth();
        }}
      >
        <ButtonText fontSize="18px" fontWeight="500">
          {/* {isMobile ? text.GOOGLE : text.CONTINUE_WITH_GOOGLE} */}
          {text.CONTINUE_WITH_GOOGLE}
        </ButtonText>
      </OutlinedButton>
    </>

    // <GoogleLogin
    //   clientId={config.googleWebClientId}
    //   render={(renderProps) => (
    //     <Button
    //       tag="google"
    //       background={palette.common.google}
    //       onClick={() => {
    //         Spinner.Show();
    //         renderProps.onClick();
    //       }}
    //       startIcon={<i className="i i-google" />}
    //     >
    //       {text}
    //     </Button>
    //   )}
    //   onSuccess={(res) => {
    //     console.log(res, "res here")
    //     googleAuth();
    //     Account.LoginWithGoogle(res, autoLogin, directLaunchData, texts);
    //   }}
    //   onFailure={(error) => {
    //     console.log(error, "res here")
    //     Account.LoginWithGoogle()

    //   }}
    //   cookiePolicy="single_host_origin"
    //   autoLoad={Boolean(autoLoad)}
    // />
  );
});

export default LoginWithGoogle;
