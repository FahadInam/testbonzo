import React, { useState } from 'react';
import { Box, IconButton } from '@material-ui/core';
import { Input } from 'Components';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Account from 'Actions/account.action';
import { OnInputChange } from 'Utils';
import useStyles from './style';
import CustomOtpInput from './CustomOtpInput';

const SignUpForm = ({ callback, step, socialSignup, texts }) => {
  // when otpEnabled is true, then mobile OTP signup is working
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  // const { texts } = useTheme();
  const styled = useStyles();
  const directLaunchData = useSelector((state) => state.AppControl.url, shallowEqual);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const [signup, setSignup] = useState({
    email: socialSignup ? socialSignup.email : '',
    password: '',
    reenterPassword: '',
  });
  const isMobileOTP = Inst_config.is_mobile_otp;
  const dispatch = useDispatch();

  const handleOtpInputChange = (value) => {
    setOtpValue(value);
    setOtpEnabled(false);
  };

  const localCallback = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    switch (t) {
      case 'next-step':
        e.preventDefault();
        if (step === 1) {
          if (socialSignup) {
            dispatch(Account.SocialSignup(socialSignup));
          } else if (Account.CheckEmail(signup, texts)) {
            callback('subStep', 1, otpEnabled);
          }
        } else {
          if (otpEnabled) {
            dispatch(Account.OTPSignup(signup, texts, otpValue, directLaunchData, isMobileOTP));
          } else {
            dispatch(Account.Signup(signup, texts, directLaunchData));
          }
        }
        break;
      case 'otp-next-step':
        e.preventDefault();
        if (otpEnabled) {
          if (step === 2 && otpValue) {
            dispatch(
              Account.OTPVerify(signup, otpValue, texts, function (params) {
                callback('subStep', 3, otpEnabled);
              })
            );
          } else {
            dispatch(
              Account.OTPSend(signup, texts, function (params) {
                callback('subStep', 2, otpEnabled);
              })
            );
          }
        }
        break;
      case 'email':
      case 'password':
      case 'reenterPassword':
        // console.log('first-email-', signup);
        OnInputChange({ name: t, value: e.target.value }, signup, setSignup);
        break;
      default:
        break;
    }
  };

  let UI = (
    <Input
      label={texts.ENTER_EMAIL}
      value={signup.email}
      tag="email"
      key="1"
      onChange={localCallback}
      disabled={socialSignup || false}
      autoFocus
    />
  );
  if (step !== 1) {
    if (otpEnabled && step !== 3) {
      UI = (
        <>
          {/* <p>Please enter the verification code that we have just sent on {signup.email} </p> */}
          {texts.VERIFICATION_CODE_SENT_TEXT} {signup.email}
          <CustomOtpInput onInputChange={handleOtpInputChange} />
        </>
      );
    } else {
      UI = (
        <>
          <Input type="password" label={texts.ENTER_PASSWORD} tag="password" key="2" onChange={localCallback} autoFocus />
          <Input type="password" label={texts.REENTER_PASSWORD} tag="reenterPassword" key="3" onChange={localCallback} />
        </>
      );
    }
  }
  return (
    <>
      <form>
        <Box mb={4} textAlign="center" display="flex" alignItems="center" flexDirection="column">
          {UI}
        </Box>
        <Box textAlign="center">
          {otpEnabled && step !== 3 ? (
            <IconButton data-tag="otp-next-step" type="submit" className={styled.nextBtn} onClick={localCallback}>
              <i className="i i-right" />
            </IconButton>
          ) : (
            <IconButton data-tag="next-step" type="submit" className={styled.nextBtn} onClick={localCallback}>
              <i className="i i-right" />
            </IconButton>
          )}
        </Box>
      </form>
    </>
  );
};
export default SignUpForm;

export const SignUpFormCircles = ({ step, socialSignup }) => {
  const styled = useStyles();
  return (
    <Box textAlign="center" m={3}>
      {!socialSignup && (
        <>
          <Box className={`${styled.smallCircle} ${step === 1 && 'selected'} `} />
          <Box className={`${styled.smallCircle} ${step === 2 && 'selected'} `} />
        </>
      )}
    </Box>
  );
};
