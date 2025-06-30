import React from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { Account, AppControl } from 'Actions';
import { Body1, Button, ButtonText, H1 } from 'Components';
import { DEMO_USER, IMAGES } from 'Constants';
import { PageSwitch } from 'Navigation';
import { AccountNav } from 'Navigation/Paths';
import { OutlinedButton } from 'Components/Core/Button';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getInstanceText } from 'Utils';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#0D72F6',
    color: 'white',
    textAlign: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: '180px',
    paddingBottom: '100px',
    // marginTop: 88,
    [theme.breakpoints.down('md')]: {
      // marginTop: 75,
      paddingTop: '120px',
    },
    [theme.breakpoints.down('sm')]: {
      // marginTop: 30,
      paddingBottom: 45,
    },
  },
  imageContainer: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  image: {
    width: '100%',
    height: 'auto',
    [theme.breakpoints.down('md')]: {
      maxWidth: '300px',
      margin: '0 auto',
      marginTop: '0px',
      marginBottom: '30px',
    },
  },
  content: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'start',
    flexDirection: 'column',
    margin: 0,
  },
  buttonGroup: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  mainBtn: {
    margin: 0,
    marginRight: 10,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin: 3,
    },
    '@media (min-width: 1024px) and (max-width: 1287px)': {
      width: '136px',
    },
    '@media (min-width: 469px) and (max-width: 620px)': {
      width: '130px',
    },
  },
  mainTitle: {
    margin: 0,
    fontSize: 50,
  },
  h1Style: {
    fontWeight: '700',
    fontSize: '52px',
    textAlign: 'left',
    lineHeight: '80px',
    [theme.breakpoints.up('xl')]: {
      paddingRight: '0px',
    },
    [theme.breakpoints.down('md')]: {
      fontWeight: '600',
      width: '100%',
      fontSize: '40px',
      textAlign: 'center',
      lineHeight: '60px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '30px',
      textAlign: 'center',
      lineHeight: '42px',
    },
  },
  heroContent: {
    fontSize: '22px',
    marginBottom: '60px',
    marginTop: '0px',
    [theme.breakpoints.up('xl')]: {
      paddingRight: '35px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
      marginTop: '0px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
      marginBottom: '20px',
    },
  },
  gestTitle: {
    fontSize: '18px',
    width: '100%',
  },
  container: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1600px',
    },
  },
  containerInner: {
    paddingLeft: '70px',
    paddingRight: '70px',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  },
  orderImageFirst: {
    [theme.breakpoints.down('md')]: {
      order: -1,
    },
  },
  orderContentFirst: {
    [theme.breakpoints.down('md')]: {
      order: 1,
    },
  },
}));

function HeroSection({ texts, isTabletOrMobile }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);

  const handleDemo = () => {
    dispatch(Account.GuestLogin(DEMO_USER, texts));
  };

  return (
    <Box className={`sHeroSection ${classes.root} hero-section`}>
      <Container maxWidth={false} disableGutters className={classes.container}>
        <Grid container alignItems="center" justifyContent="space-between" className={classes.containerInner}>
          <Grid
            item
            md={12}
            lg={6}
            className={`${classes.content} ${classes.orderContentFirst} animated fadeIn wow`}
            data-wow-delay="0.4s"
          >
            <H1 m={0} color="#fff" className={classes.h1Style}>
              {getInstanceText(texts, 'HERO_SECTION_TITLE', Inst_config.instance_id)}
            </H1>
            <Body1 className={`${classes.heroContent} poppins-font-400`} textAlign={isTabletOrMobile ? 'center' : 'left'} color="#fff">
              {getInstanceText(texts, 'HERO_SECTION_TEXT', Inst_config.instance_id)}
            </Body1>
            <Body1 className={`${classes.gestTitle} poppins-font-600`} textAlign={isTabletOrMobile ? 'center' : 'left'} color="#fff">
              {texts.GET_STARTED_AS}
            </Body1>
            <Box className={classes.buttonGroup} spacing={3}>
              <Button
                className={`${classes.mainBtn} fadeInLeft animated`}
                data-wow-delay="0.85s"
                tag="forLearners"
                borderRadius={15}
                width="180px"
                height="56px"
                background="#00BBFF"
                onClick={() => {
                  PageSwitch(AccountNav.SIGN_UP);
                  AppControl.SetLoginType(false);
                  AppControl.SetLoginComingFrom('forLearners');
                  AppControl.SetSignUpComingFrom(true);
                }}
              >
                <ButtonText fontWeight="600" color="#fff" fontSize="18px" letterSpacing="0.5px">
                  {texts.LEARNER}
                </ButtonText>
              </Button>
              <Button
                className={`${classes.mainBtn} fadeInLeft animated`}
                data-wow-delay="0.85s"
                tag="forInstitutions"
                width="180px"
                height="56px"
                borderRadius={15}
                background="#fff"
                onClick={() => {
                  PageSwitch(AccountNav.SIGN_UP);
                  AppControl.SetLoginType(true);
                  AppControl.SetLoginComingFrom('forInstitutions');
                  AppControl.SetSignUpComingFrom(true);
                }}
              >
                <ButtonText fontWeight="600" color="#00BBFF" fontSize="18px" letterSpacing="0.5px">
                  {texts.INSTITUTION}
                </ButtonText>
              </Button>

              <OutlinedButton
                className={`${classes.mainBtn} ${classes.playAsGuest} fadeInLeft animated playAsGuest`}
                data-wow-delay="0.85s"
                data_sid={texts.GUESTS}
                tag="forInstitutions"
                width="180px"
                height="56px"
                borderRadius={15}
                onClick={handleDemo}
              >
                {texts.GUESTS}
              </OutlinedButton>
            </Box>
          </Grid>
          <Grid
            item
            md={12}
            lg={6}
            className={`${classes.imageContainer} ${classes.orderImageFirst} animated fadeInRight wow`}
            data-wow-delay="0.4s"
          >
            <img src={IMAGES.HERO_SECTION_BANNER} alt="Game-based learning" className={classes.image} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroSection;
