import React from 'react';
import { Grid, makeStyles, useTheme, Container } from '@material-ui/core';
// import CompetitionNav from 'Navigation/Paths/competition.constants';
import User from 'Actions/user.action';
import { useSelector } from 'react-redux';
import { AccountPopUp, AppControl } from 'Actions';
// import { Button } from './Core';
import ButtonBold from 'Components/Core/ButtonBold';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.common.black,
    position: 'fixed',
    zIndex: 2,
    top: 0,
    fontFamily: 'Poppins',
    fontWeight: 600,
  },
  nowrap: {
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.common.white,
    height: '56px',
    [theme.breakpoints.only('xs')]: {
      fontSize: theme.typography.pxToRem(13),
    },
    [theme.breakpoints.down('xs')]: {
      transform: 'scale(0.9)',
    },
  },
  signUp: {
    marginLeft: theme.spacing(2),
    marginTop: 0,
    height: '40px',
  },
  signIn: {
    marginTop: 0,
    marginLeft: theme.spacing(3),
    // background: 'transparent',
    height: '40px',
    // border: `1.5px solid ${theme.palette.common.white}`,
    // '&:hover': {
    //   background: theme.palette.common.red,
    //   border: `1.5px solid ${theme.palette.common.red}`,
    //   color: theme.palette.dark,
    // },
    // '&:active': {
    //   background: theme.palette.common.red,
    //   border: `1.5px solid ${theme.palette.common.red}`,
    //   color: theme.palette.dark,
    // },
  },
  containerClass: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
    },
  },
}));

const TopLoginBar = () => {
  const styled = useStyles();
  useSelector((state) => state.User);
  const { texts } = useTheme();

  if (!User.IsGuest()) return null;

  return (
    <Grid container className={styled.root}>
      <Container className={styled.containerClass}>
        <Grid container className={styled.nowrap}>
          {/* <Grid item className={styled.text}> */}
          {texts.GUEST_LOGIN_BAR_MSG}
          {/* </Grid>
          <Grid item className={styled.btn}> */}
          <ButtonBold
            yellowBubble
            secondaryYellow
            smallContainer
            width="auto"
            mt={0.75}
            m={0}
            className={styled.signUp}
            onClick={() => {
              // User.Clear(false, CompetitionNav.SIGN_UP);
              AppControl.SetLoginType(false);
              AppControl.SetLoginComingFrom('signUp');
              AppControl.SetSignUpComingFrom(false);
              // console.log('SIGN UP KRWA LO');
              window.firstCompetitionCall = false;
              AccountPopUp.Show({ type: 'signUp', isVisible: true, comingFrom: 'guest', path: window?.location?.pathname });
            }}
          >
            {texts.SIGN_UP}
          </ButtonBold>
          <ButtonBold
            bgBlue
            yellowBubble
            secondaryYellow
            smallContainer
            width="auto"
            mt={0.75}
            m={0}
            ml={1}
            variant="outlined"
            className={styled.signIn}
            onClick={() => {
              // console.log('signIn KRWA LO');
              window.firstCompetitionCall = false;
              AppControl.SetLoginComingFrom('login');
              AccountPopUp.Show({ type: 'signIn', isVisible: true, comingFrom: 'guest', path: window?.location?.pathname });
              // User.Clear(false, CompetitionNav.LOGIN);
            }}
          >
            {texts.LOGIN}
          </ButtonBold>
        </Grid>
        {/* </Grid> */}
      </Container>
    </Grid>
  );
};

export default TopLoginBar;
