import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useTheme, CircularProgress } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { SPINNER, DOTTED, IMAGES } from 'Constants';
import Blocker from '../Blocker';
import { RetryApiRequest } from '../../Actions/api.action';
import ConfirmationBox from '../ConfirmationBox';
import { DotLoader } from './dotLoader';
import useStyles from './style';

export const BlockingLoader = React.memo(({ callback }) => {
  const spinner = useSelector((state) => state.AppControl.spinner, shallowEqual);
  let UI = null;
  if (!spinner) {
    UI = null;
  } else if (spinner.type === SPINNER.SHOW) {
    UI = (
      <Blocker>
        <CircularProgress color="secondary" />
      </Blocker>
    );
  } else if (spinner.type === SPINNER.SHOW_RETRY) {
    UI = <LoaderRetryUI isCancelAllow={spinner.canCancel} callback={callback} />;
  }
  return ReactDOM.createPortal(UI, document.getElementById('root'));
});

export const DottedLoader = React.memo(() => {
  const dotted = useSelector((state) => state.AppControl.dotted, shallowEqual);
  let UI = null;
  if (!dotted) {
    UI = null;
  } else if (dotted.type === DOTTED.SHOW) {
    UI = <DotLoader />;
  }
  return ReactDOM.createPortal(UI, document.getElementById('root'));
});

export const LoaderRetryUI = React.memo(({ isCancelAllow }) => {
  const { texts } = useTheme();
  const styled = useStyles();
  const dispatch = useDispatch();
  const [showModalBox, setShowModalBox] = useState(true);
  const callback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    switch (t) {
      case 'overlay':
      case 'close':
      case 'retry-negative':
        setShowModalBox(false);
        break;
      case 'retry-positive':
        dispatch(RetryApiRequest());
        break;
      default:
        break;
    }
  };
  return (
    <ConfirmationBox
      visible={showModalBox}
      callback={callback}
      // icon="alert"
      addCodeIcon={IMAGES.ERROR}
      ADD_CODE
      hideCross
      allowClose={isCancelAllow}
      title={texts.SOMETHING_WENT_WRONG}
      className={styled.confirmation_box}
      buttonsContainer={styled.sign_out_buttons_container}
      primary={texts.SERVER_FAIL}
      positive={texts.RETRY}
      // negative={isCancelAllow ? texts.CANCEL : null}
      negative={texts.CANCEL}
      tag="retry"
    />
  );
});
