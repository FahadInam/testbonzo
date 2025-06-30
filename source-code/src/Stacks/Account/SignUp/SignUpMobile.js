import React, { useState, useEffect } from 'react';
// import { useTheme } from '@material-ui/core';
import { USER, config } from 'Constants';
import { useSelector, shallowEqual } from 'react-redux';
import { parseSearchURL, encodeDecode } from 'Utils';
import { gameDispatch } from 'Utils/ActionCreators';
import { Box } from '@material-ui/core';
import { SignupTypeUI, SignUpUI, SignUpSuccessUI } from './LocalComponent';
import MobilePageStructure from '../shared/MobilePageStructure';
import useStyles from '../shared/AnimatedBgStyle';

const SignUpMobile = () => {
  const socialSignup = useSelector((state) => state.AppControl.socialSignup, shallowEqual);
  const [typeSelected, setTypeSelected] = useState(0);
  const friendID = parseSearchURL();
  if (friendID.friends_id) {
    config.friend_id = parseInt(encodeDecode('dec', friendID.friends_id), 10);
  }
  const styled = useStyles();

  //! important do not make it small case Hook issue
  const callback = (e, v) => {
    let value = 1;
    if (e === 'subStep') {
      value = v;
    } else if (e === 'left-btn') {
      if (socialSignup) gameDispatch(USER.CLEAR_SOCIAL_SIGNUP);
      value = -1;
    }
    setTypeSelected(typeSelected + value);
  };

  useEffect(() => {
    setTypeSelected(socialSignup ? 1 : 0);
  }, [setTypeSelected, socialSignup]);

  let UI = null;
  let showLogo = true;
  if (typeSelected === 0) {
    UI = <SignupTypeUI callback={callback} />;
  } else if (typeSelected === 1 || typeSelected === 2) {
    UI = <SignUpUI callback={callback} step={typeSelected} socialSignup={socialSignup} />;
  } else {
    UI = <SignUpSuccessUI />;
    showLogo = false;
  }

  return (
    <Box className={styled.rootX2}>
      <Box className={styled.rootY2}>
        <MobilePageStructure hideHeader hideLogo={!showLogo} Top>
          {UI}
        </MobilePageStructure>
      </Box>
    </Box>
  );
};

export default SignUpMobile;
