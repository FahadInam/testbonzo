import React, { useState, useEffect } from 'react';
import { OutlinedButton } from 'Components/Core/Button';
import { ButtonText } from 'Components/Core';
import { IMAGES } from 'Constants';
import { useMediaQuery } from '@material-ui/core';
import { Account } from 'Actions';
import ReactDOM from 'react-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getInstanceType } from 'Utils';
import { INSTANCES_ID } from 'Constants/instance.config';

const LoginWithLMS = React.memo(({ text, callback }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const Login_CF = useSelector((state) => state.LoginType.comingFrom, shallowEqual);
  const [isVisible, setIsVisible] = useState(false);
  const [iframeSrc, setIframeSrc] = useState('');
  let timer = null;

  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);

  const handleLoad = () => {
    const storedAccount = localStorage.getItem('lms:account');
    if (storedAccount) {
      const { email, password } = JSON.parse(storedAccount);
      const iframe = document.getElementById('myIframe');
      if (iframe) {
        iframe.contentWindow.postMessage({ type: 'lmsAccount', email, password }, '*');
      }
    }
  };

  useEffect(() => {
    const iframe = document.getElementById('myIframe');

    if (iframe && isVisible) {
      iframe.style.display = isVisible ? 'block' : 'none';
    }
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
    }

    // Remove event listener on cleanup
    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleLoad);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const handleShow = () => {
    document.getElementById('preloader').style.display = 'block';

    timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    handleLoad();
    setIframeSrc(`${process.env.REACT_APP_LMS_URL}public-login?isBonzo=1&isGlobalGreenGuardians=${isGlobalClimate ? '1' : '0'}`);
  };

  const hideIframe = () => {
    setIsVisible(false);
    const iframe = document.getElementById('myIframe');
    if (iframe) {
      iframe.style.display = 'none';
    }
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.success) {
        const { email, password } = event.data.data;
        const account = { email, password };
        localStorage.setItem('lms:account', JSON.stringify(account));
        const dto = {
          type: 7,
          email: event.data.data.email,
          accessToken: event.data.data.auth_token,
          userRole: Login_CF,
        };
        dispatch(Account.SocialLogin(dto));

        hideIframe();
      }
      if (event.data === 'closeIframe') {
        hideIframe();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
      setIframeSrc('');
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const iframeElement = isVisible && (
    <iframe
      id="myIframe"
      title="Login With LMS"
      src={iframeSrc}
      style={{
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        zIndex: 9999,
      }}
      onLoad={() => (document.getElementById('preloader').style.display = 'none')}
    ></iframe>
  );

  // const handleClose = () => {
  //   setIsVisible(false);
  // };

  return (
    <>
      <OutlinedButton
        borderRadius={15}
        tag="login-with-lms"
        width="100%"
        startIcon={
          <img
            src={IMAGES.COACH_ICON}
            alt="Game-based learning"
            style={{
              width: '22px',
              height: '22px',
              marginRight: isMobile ? '10px' : '15px',
            }}
          />
        }
        onClick={handleShow}
      >
        <ButtonText fontSize="18px" fontWeight="500">
          {text.CONTINUE_WITH_LMS}
        </ButtonText>
      </OutlinedButton>
      {ReactDOM.createPortal(iframeElement, document.body)}
    </>
  );
});

export default LoginWithLMS;
