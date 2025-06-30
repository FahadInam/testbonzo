import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Box, Button, makeStyles, Snackbar, useMediaQuery, useTheme } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { CustomToast as ToastAction } from 'Actions';
import { APP_INTERNAL_MESSAGES, IMAGES } from 'Constants';
import { Body1, H2 } from '../Core';
// import useStyles from './style';
import bellIcon from '../../Assets/images/yellow-bell.png';
import InfoModal from 'Components/InfoModal/InfoModal';
import { PageSwitch } from 'Navigation';
import { CompetitionNav } from 'Navigation/Paths';
import { Cordova } from 'Utils';
// import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '20px',
    '& .MuiAlert-standardSuccess': {
      background: `#fff`,
    },
    '& .MuiAlert-action': {
      display: 'block',
      paddingLeft: '0px',
    },
  },
  toastTitle: {
    fontSize: '12px',
    marginTop: '3px',
    fontWeight: '600',
    color: '#848484',
    textAlign: 'left',
    fontFamily: 'Poppins',
  },
  toastMessage: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#000',
    display: 'block',
    marginTop: '10px',
    marginBottom: '6px',
    maxWidth: '250px',
    '@media (max-width: 468px)': {
      maxWidth: '400px',
    },
  },
  downloadBtn: {
    fontSize: '15px',
    marginLeft: '10px',
    color: '#ACACAC',
    padding: '0px',
    fontWeight: '600',
  },
  detailBtn: { fontSize: '15px', fontWeight: '600', marginLeft: '10px', color: '#02BBFE', padding: '0px' },
  notificationCircle: {
    width: '8px',
    height: '8px',
    backgroundColor: 'red',
    borderRadius: '100px',
    position: 'absolute',
    top: '0px',
    left: '14px',
  },
  cross_img: {
    position: 'absolute',
    top: '-6px',
    zIndex: '10',
    right: '-25px',
    backgroundColor: 'white',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '100%',
  },
}));

const CustomToast = () => {
  const [stateRef, setStateRef] = useState({ rulesAnchor: false });
  const { type, toastMessage } = useSelector((state) => state.AppControl.custom_toast, shallowEqual);
  const pageData = useSelector((state) => state.GetCompetitionsActivities, shallowEqual);
  const isMobile = useMediaQuery('(max-width:468px)'); // Adjust the width as needed for mobile

  const styled = useStyles();
  const { texts } = useTheme();

  const callback = (e, item) => {
    const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag');
    switch (t) {
      case 'rules':
        setStateRef({ ...stateRef, menuAnchor: null, rulesAnchor: true });
        break;
      case 'continue-rules':
      case 'close':
      case 'overlay':
        setStateRef({ ...stateRef, menuAnchor: null, rulesAnchor: false });
        break;
      default:
        break;
    }
  };
  const isBottomPosition = toastMessage === APP_INTERNAL_MESSAGES.UNSTABLE_INTERNET;

  if (window.location.href.indexOf('challenge/player') > -1 && !isBottomPosition) {
    return null;
  }

  let message = '';

  switch (toastMessage) {
    case APP_INTERNAL_MESSAGES.GOOGLE_INVALID:
    case APP_INTERNAL_MESSAGES.FACEBOOK_INVALID:
    case APP_INTERNAL_MESSAGES.UNAUTHORIZED_USER_ACCESS:
    case APP_INTERNAL_MESSAGES.DATA_ANOMALY_FOUND:
    case APP_INTERNAL_MESSAGES.CHALLENGE_RESULT_ALREADY_SUBMITTED:
    case APP_INTERNAL_MESSAGES.UNSTABLE_INTERNET:
      message = texts[toastMessage];
      break;
    default:
      message = toastMessage;
      break;
  }

  return (
    <>
      <Snackbar
        className={`${styled.root}`}
        anchorOrigin={{
          vertical: 'top',
          horizontal: isMobile ? 'center' : 'right',
        }}
        open={!!message}
        autoHideDuration={5000}
        onClose={ToastAction.Close}
      >
        <Alert onClose={ToastAction.Close} className={styled.alert} severity={type && type.toLowerCase()} icon={false}>
          <Box display="flex" style={{ position: 'relative' }}>
            <img
              onClick={ToastAction.Close}
              width={24}
              height={24}
              src={Cordova.Path(IMAGES.CROSS_GRAY)}
              alt="icon"
              className={styled.cross_img}
            />

            <Box style={{ position: 'relative' }}>
              <img src={bellIcon} alt="bell" style={{ width: '20px' }} />
              <Box className={styled.notificationCircle}></Box>
            </Box>
            <Box ml={1.5}>
              <H2 ml="0" className={styled.toastTitle}>
                New Message
              </H2>
              <Body1 className={styled.toastMessage}>{message}</Body1>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            {pageData?.user_data?.is_show_certified === '1' && (
              <Button
                onClick={() => {
                  PageSwitch(CompetitionNav.REWARDS);
                }}
                width="auto"
                mt={0}
                m={0}
                className={styled.downloadBtn}
              >
                Rewards
              </Button>
            )}
            <Button onClick={callback} data-tag="rules" width="auto" mt={0} m={0} className={styled.detailBtn}>
              Details
            </Button>
          </Box>

          {/* {isBottomPosition && <p style={{ margin: '0px', fontWeight: '600' }}>{texts.UNSTABLE_INTERNET_TITLE}</p>}
        <WriteString text={`${message}`} /> */}
        </Alert>
      </Snackbar>
      <InfoModal callback={callback} menuAnchor={stateRef.rulesAnchor} Header />
    </>
  );
};

export default CustomToast;
