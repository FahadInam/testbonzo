import React, { useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { USER, config } from 'Constants';
import { AccountPopUp, AppControl, User } from 'Actions';
import { useSelector, shallowEqual } from 'react-redux';
import { parseSearchURL, encodeDecode, getInstanceType } from 'Utils';
import { gameDispatch } from 'Utils/ActionCreators';
import { PageSwitch } from 'Navigation';
import AccountNav from 'Navigation/Paths/account.constants';
import DefaultNav from 'Navigation/Paths/defaultNav.constants';
import { useLocation } from 'react-router-dom';
import { SignupTypeUI, SignUpUI, SignUpSuccessUI } from './LocalComponent';
import PageStructure from '../shared/PageStructure';
import AccountFooter from '../shared/AccountFooter';
import { INSTANCES_ID } from 'Constants/instance.config';

const Signup = () => {
  const socialSignup = useSelector((state) => state.AppControl.socialSignup, shallowEqual);
  const ShowAccountPopUp = useSelector((state) => state.AppControl.accountPopup, shallowEqual);
  const Login_CF = useSelector((state) => state.LoginType.comingFrom, shallowEqual);
  const Landing_CF = useSelector((state) => state.LoginType.comingFromLanding, shallowEqual);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const searchParams = new URLSearchParams(window.location.search);
  const params = searchParams.get('change_code');
  const [typeSelected, setTypeSelected] = useState(0);
  const comingFrom = parseSearchURL();
  const { texts } = useTheme();
  const { pathname } = useLocation();
  const friendID = parseSearchURL();

  if (friendID.friends_id) {
    config.friend_id = parseInt(encodeDecode('dec', friendID.friends_id), 10);
  }

  if (comingFrom.cf === 'sitarey') {
    config.cf_sitarey = 1;
  }
  if (comingFrom.cf === 'gclc') {
    config.cf_gclc = 1;
  }

  const isLgOrGreater = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  //! important do not make it small case Hook issue
  const callback = (e, v, isOtpEnabled) => {
    let nTypeSelected = 0;
    if (isOtpEnabled) {
      nTypeSelected = v;
    } else {
      let value = 1;
      if (e === 'subStep') {
        value = v;
      } else if (e === 'left-btn') {
        if (socialSignup) gameDispatch(USER.CLEAR_SOCIAL_SIGNUP);
        value = -1;
      }
      nTypeSelected = typeSelected + value;

      if (nTypeSelected < 0) {
        if (pathname !== AccountNav.SIGN_UP.link) {
          AccountPopUp.Hide();
        } else {
          PageSwitch(DefaultNav.MAIN);
        }
        return;
      }
      if (nTypeSelected > 2) nTypeSelected = 2;
    }

    setTypeSelected(nTypeSelected);
  };

  useEffect(() => {
    setTypeSelected(socialSignup ? 1 : 0);
  }, [setTypeSelected, socialSignup]);

  let UI = null;
  let showLogo = true;
  if (typeSelected === 0) {
    UI = <SignupTypeUI callback={callback} step={typeSelected} socialSignup={socialSignup} ShowAccountPopUp={ShowAccountPopUp} />;
  } else if (typeSelected === 1 || typeSelected === 2 || typeSelected === 3) {
    UI = <SignUpUI callback={callback} step={typeSelected} socialSignup={socialSignup} />;
  } else {
    UI = <SignUpSuccessUI />;
    showLogo = false;
  }

  let leftTitle;
  // let leftTitle = texts.HOME;
  if (typeSelected === 1) {
    leftTitle = texts.SIGN_UP;
  }
  if (typeSelected === 2) {
    leftTitle = texts.EMAIL;
  }

  if (Login_CF !== 'signUp' && Login_CF !== 'login') {
    if (Landing_CF) {
      leftTitle = texts.HOME;
    } else leftTitle = texts.BACK;
  } else {
    leftTitle = texts.HOME;
  }

  const backButtonCallback = () => {
    // console.log('backButtonCallback');

    if (leftTitle === 'Back') {
      if (window.location.href.includes('cf=sitarey')) {
        PageSwitch(DefaultNav.PROGRAM_LAUNCH);
      } else if (window.location.href.includes('cf=gclc')) {
        PageSwitch(DefaultNav.PROGRAM_GLC);
      } else {
        AppControl.SetLoginType(false);
        AppControl.SetLoginComingFrom('login');
      }
    } else {
      if (Inst_config.navigate_to_public_route) {
        window.location.href = Inst_config.account_back_url;
      } else {
        PageSwitch(Inst_config.account_back_url);
      }
    }
  };

  // Determine if the current user is a guest and the device is mobile
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);
  const isGuestUserOnMobile = (!User.IsLoggedInUser() && User.IsGuest()) || (isShupavu && !ShowAccountPopUp.isVisible);

  //console.log('isShupavu-->', isShupavu);

  return (
    <PageStructure
      headerSet={{
        overrideLeftButton: true,
        //callback,
        showRight: false,
        // showLeft: false,
        showLeft: !isLgOrGreater && isGuestUserOnMobile, // Show left button only on mobile screen
        showCenter: true,
        leftTitle,
        callback: backButtonCallback,
      }}
      // hideHeader={!showHeader}
      hideLogo={!showLogo}
    >
      {UI}

      {!Inst_config?.principal_enabled && <AccountFooter fromLogin={false} ShowAccountPopUp={ShowAccountPopUp} />}

      {((Login_CF !== 'signUp' && Login_CF !== 'login') || params) && (
        <AccountFooter fromLogin={false} ShowAccountPopUp={ShowAccountPopUp} />
      )}
    </PageStructure>
  );
};

export default Signup;
