import { Typography, makeStyles, useTheme } from '@material-ui/core';
import { AccountPopUp } from 'Actions';
import { Button, ButtonText } from 'Components';
import { PageSwitch } from 'Navigation';
import { AccountNav } from 'Navigation/Paths';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    width: '100%',
    bottom: '0',
    right: '0',
    backgroundColor: '#EBEFF6', // gray background color
    padding: theme.spacing(0),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0px 0px 20px 20px',
  },
  text: {
    marginRight: theme.spacing(2),
    fontSize: '14px',
    color: '#313644',
    [theme.breakpoints.down('sm')]: {
      fontSize: '13px',
      marginRight: theme.spacing(0),
    },
  },
}));

function AccountFooter({ fromLogin, state, isFromLearners, ShowAccountPopUp }) {
  // const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);

  // console.log('ShowAccountPopUp', ShowAccountPopUp);
  const classes = useStyles();
  const { texts } = useTheme();
  let footerText = '';
  let buttonText = '';
  if (fromLogin) {
    footerText = texts.DO_NOT_HAVE_ACCOUNT;
    buttonText = texts.SIGN_UP;
  } else {
    footerText = texts.ALREADY_HAVE_ACCOUNT;
    buttonText = texts.LOGIN;
    //switchNav = AccountNav.LOGIN;
  }

  const handleButtonClick = () => {
    if (fromLogin) {
      // console.log('clicked....if');
      //return;
      if (ShowAccountPopUp?.type === 'signIn' || ShowAccountPopUp?.type === 'forgotPassword') {
        AccountPopUp.Show({ type: 'signUp', isVisible: true, comingFrom: 'guest', path: window?.location?.pathname });
      } else {
        const element = document.getElementById('turnstile-container');
        if (element) {
          element.remove();
        }
        PageSwitch(AccountNav.SIGN_UP);
      }
    } else {
      // console.log('clicked....else');
      //return;

      if (ShowAccountPopUp?.type === 'signUp' || ShowAccountPopUp?.type === 'forgotPassword') {
        AccountPopUp.Show({ type: 'signIn', isVisible: true, comingFrom: 'guest', path: window?.location?.pathname });
      } else {
        PageSwitch(AccountNav.LOGIN);
      }

      // PageSwitch(AccountNav.LOGIN);
    }
  };

  return (
    <div className={classes.container}>
      <Typography className={`${classes.text} poppins-font-500`}>{footerText}</Typography>
      <Button
        className="fadeInRight animated"
        data-wow-delay="0.85s"
        border="2px solid #02BBFE"
        onClick={handleButtonClick}
        background="#fff"
        width="120px"
        borderRadius={20}
      >
        <ButtonText color="#02BBFE" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
          {buttonText}
        </ButtonText>
      </Button>
    </div>
  );
}

export default AccountFooter;
