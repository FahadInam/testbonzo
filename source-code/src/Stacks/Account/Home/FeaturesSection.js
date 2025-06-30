import React from 'react';
import { Grid, Box, makeStyles, Container, List, ListItem, ListItemText } from '@material-ui/core';
import Fade from 'react-reveal/Fade';
import { Body1, Button, ButtonText, H2, H4 } from 'Components';
import { DEMO_USER, IMAGES } from 'Constants';
import { AccountNav, DefaultNav } from 'Navigation/Paths';
import { Account, AppControl } from 'Actions';
import { PageSwitch } from 'Navigation';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getInstanceText } from 'Utils';
// import SkillsIconSlider from './SkillsIconSlider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: '100px',
    paddingBottom: '100px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '100px',
      paddingBottom: '50px',
    },
  },
  content: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'start',
    flexDirection: 'column',
    marginBottom: 20,
    [theme.breakpoints.down('md')]: {
      marginBottom: 0,
    },
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  // marginZero: {
  //   margin: 0,
  // },
  marginAuto: {
    margin: '0 auto',
    width: '46%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  marginBottom2: {
    marginBottom: 16,
  },
  itemCentered: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      width: '100%',
    },
  },
  mainTextBox: {
    width: '80%',
    margin: '0 auto',
    textAlign: 'center',
    marginTop: '25px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: '10px',
    },
  },
  cardTitleBox: {
    width: '80%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  cardTitleBoxTwo: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  cardTitleBoxThree: {
    width: '75%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  cardTextBox: {
    width: '95%',
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: theme.spacing(0),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(0),
    },
  },
  mainTitle: {
    fontSize: '48px',
    [theme.breakpoints.up('xl')]: {
      paddingRight: '35px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '36px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '28px',
    },
  },
  mainText: {
    fontSize: '22px',
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
    },
  },
  cardTitle: {
    fontSize: '36px',
    [theme.breakpoints.down('md')]: {
      fontSize: '28px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
  cardText: {
    fontSize: '20px',
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  container: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1600px',
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  orderImageFirst: {
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      order: -1,
      maxWidth: '400px',
      margin: '0 auto',
    },
  },
  orderContentFirst: {
    [theme.breakpoints.down('md')]: {
      order: 1,
    },
  },
  imageVector1: {
    position: 'absolute',
    bottom: '-101px',
    width: '311px',
    zIndex: '10',
    right: '79%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  imageVector2: {
    position: 'absolute',
    bottom: '-222px',
    width: '412px',
    zIndex: '10',
    right: '-135px',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  fadeContent: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  gridTop: {
    paddingLeft: '70px',
    paddingRight: '70px',
    paddingTop: '100px',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '0px',
      paddingRight: '0px',
      paddingTop: '50px',
    },
  },
  gridBottom: {
    paddingLeft: '70px',
    paddingRight: '70px',
    paddingTop: '50px',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '0px',
      paddingRight: '0px',
      paddingTop: '30px',
    },
  },
  smallTag: {
    letterSpacing: '2px',
    color: '#5E5E5E',
  },
  listItem: {
    display: 'list-item',
    listStyleType: 'disc',
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1),
  },
  firstButton: {
    margin: '0',
  },
}));

function FeaturesSection({ texts, greenGuardiansInstance }) {
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const classes = useStyles();
  const dispatch = useDispatch();

  const firstCardItemText = greenGuardiansInstance
    ? [texts.GG_FEATURES_FIRST_CARD_TEXT_ONE]
    : [texts.FEATURES_FIRST_CARD_TEXT_ONE, texts.FEATURES_FIRST_CARD_TEXT_TWO];

  const secondCardItemText = greenGuardiansInstance
    ? [texts.GG_FEATURES_SECOND_CARD_TEXT_ONE]
    : [texts.FEATURES_SECOND_CARD_TEXT_ONE, texts.FEATURES_SECOND_CARD_TEXT_TWO];

  const thirdCardItemText = greenGuardiansInstance
    ? [texts.GG_FEATURES_THIRD_CARD_TEXT_ONE, texts.GG_FEATURES_THIRD_CARD_TEXT_TWO]
    : [texts.FEATURES_THIRD_CARD_TEXT_ONE, texts.FEATURES_THIRD_CARD_TEXT_TWO];

  const handleDemo = () => {
    dispatch(Account.GuestLogin(DEMO_USER, texts));
  };

  return (
    <Box className={classes.root}>
      <Container maxWidth={false} disableGutters className={classes.container}>
        <Fade>
          <Box className={`${classes.header}`} data-wow-delay="0.4s">
            <Box className={classes.marginAuto}>
              <H2 fontWeight="600" className={classes.mainTitle} color="#112D70">
                {/* {texts.FEATURES_MAIN_TITLE} */}
                {getInstanceText(texts, 'FEATURES_MAIN_TITLE', Inst_config.instance_id)}
              </H2>
            </Box>
            <Box className={classes.mainTextBox}>
              <Body1 className={`${classes.mainText} poppins-font-400`} textAlign="left" color="#5E5E5E">
                {texts.FEATURES_MAIN_TEXT}
              </Body1>
            </Box>
          </Box>
        </Fade>

        {/* features first content */}
        <Grid container spacing={3} alignItems="center" justifyContent="space-between" className={classes.gridTop}>
          <Grid
            item
            xs={12}
            md={12}
            lg={6}
            className={`${classes.content} ${classes.orderContentFirst} fadeInLeft animated`}
            data-wow-delay="0.85s"
          >
            <Box className={classes.fadeContent}>
              <Fade left>
                {/* <Box className={classes.itemCentered}>
                  <TextCapitalize className={`${classes.itemCentered} poppins-font-400`} fontSize="18px">
                    <span className={classes.smallTag}>{texts.FEATURES_FIRST_CARD_TAG}</span>
                  </TextCapitalize>
                </Box> */}

                <Box className={`${classes.itemCentered} ${classes.cardTitleBox}`}>
                  <H4
                    fontWeight="600"
                    color="#112D70"
                    className={`${classes.marginBottom2} ${classes.itemCentered} ${classes.cardTitle}`}
                  >
                    {/* {texts.FEATURES_FIRST_CARD_TITLE} */}
                    {getInstanceText(texts, 'FEATURES_FIRST_CARD_TITLE', Inst_config.instance_id)}
                  </H4>
                </Box>
                <Box className={`${classes.itemCentered} ${classes.cardTextBox}`}>
                  <List>
                    {firstCardItemText.map((text, index) => (
                      <ListItem key={index} className={classes.listItem}>
                        <ListItemText>
                          <Body1
                            className={`${classes.itemCentered} ${classes.cardText} poppins-font-400`}
                            textAlign="left"
                            color="#5E5E5E"
                          >
                            {text}
                          </Body1>
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box mt={3} className={classes.itemCentered}>
                  <Button
                    className={`fadeInLeft animated ${classes.firstButton}`}
                    data-wow-delay="0.85s"
                    tag="forLearners"
                    borderRadius={15}
                    width="180px"
                    background="#00BBFF"
                    onClick={
                      greenGuardiansInstance
                        ? handleDemo
                        : () => {
                            PageSwitch(AccountNav.SIGN_UP);
                            AppControl.SetLoginType(false);
                            AppControl.SetLoginComingFrom('signUp');
                          }
                    }
                    m={0}
                    ml={1}
                  >
                    <ButtonText color="#fff" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
                      {texts.GET_STARTED}
                    </ButtonText>
                  </Button>
                  <Button
                    className={`fadeInLeft animated `}
                    data-wow-delay="0.85s"
                    border="2px solid #02BBFE"
                    background="#fff"
                    width="180px"
                    borderRadius={15}
                    onClick={() => {
                      greenGuardiansInstance ? PageSwitch(DefaultNav.PROGRAM_GLC) : PageSwitch(DefaultNav.CONTACT_US);
                    }}
                  >
                    <ButtonText color="#02BBFE" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
                      {/* {texts.REQUEST_A_DEMO} */}
                      {greenGuardiansInstance ? texts.GG_FIND_OUT_MORE : texts.REQUEST_A_DEMO}
                    </ButtonText>
                  </Button>
                </Box>
              </Fade>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={6}
            className={`${classes.responsiveCard} ${classes.orderImageFirst} animated fadeInRight wow`}
            data-wow-delay="0.4s"
          >
            <Fade right>
              <img src={IMAGES.FEATURE_IMAGE_ONE} alt="Game-based learning" className={classes.image} />
              <img src={IMAGES.LINE_VECTOR_ONE} alt="Game-based learning" className={classes.imageVector1} />
            </Fade>
          </Grid>
        </Grid>

        {/* features second content */}
        <Grid container spacing={3} alignItems="center" justifyContent="space-between" className={classes.gridBottom}>
          <Grid
            item
            xs={12}
            md={12}
            lg={6}
            className={`${classes.responsiveCard} ${classes.orderImageFirst} animated fadeInRight wow`}
          >
            <Fade left>
              <img src={IMAGES.FEATURE_IMAGE_TWO} alt="Game-based learning" className={classes.image} />
              <img src={IMAGES.LINE_VECTOR_TWO} alt="Game-based learning" className={classes.imageVector2} />
            </Fade>
          </Grid>
          <Grid item xs={12} md={12} lg={5} className={`${classes.content} ${classes.orderContentFirst} fadeInLeft animated`}>
            <Box className={classes.fadeContent}>
              <Fade right>
                {/* <Box className={classes.itemCentered}>
                  <TextCapitalize className={`${classes.itemCentered} poppins-font-400`} fontSize="18px">
                    <span className={classes.smallTag}>{texts.FEATURES_SECOND_CARD_TAG}</span>
                  </TextCapitalize>
                </Box> */}
                <Box className={classes.cardTitleBoxTwo}>
                  <H4
                    fontWeight="600"
                    color="#112D70"
                    className={`${classes.marginBottom2} ${classes.itemCentered} ${classes.cardTitle}`}
                  >
                    {getInstanceText(texts, 'FEATURES_SECOND_CARD_TITLE', Inst_config.instance_id)}
                  </H4>
                </Box>
                <Box className={`${classes.itemCentered} ${classes.cardTextBox}`}>
                  <List>
                    {secondCardItemText.map((text, index) => (
                      <ListItem key={index} className={classes.listItem}>
                        <ListItemText>
                          <Body1
                            className={`${classes.itemCentered} ${classes.cardText} poppins-font-400`}
                            textAlign="left"
                            color="#5E5E5E"
                          >
                            {text}
                          </Body1>
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box mt={3} className={classes.itemCentered}>
                  <Button
                    className={`fadeInLeft animated ${classes.firstButton}`}
                    data-wow-delay="0.85s"
                    tag="forLearners"
                    borderRadius={15}
                    width="180px"
                    background="#00BBFF"
                    onClick={
                      greenGuardiansInstance
                        ? handleDemo
                        : () => {
                            PageSwitch(AccountNav.SIGN_UP);
                            AppControl.SetLoginType(false);
                            AppControl.SetLoginComingFrom('signUp');
                          }
                    }
                    m={0}
                    ml={1}
                  >
                    <ButtonText color="#fff" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
                      {texts.GET_STARTED}
                    </ButtonText>
                  </Button>
                  <Button
                    className={`fadeInLeft animated `}
                    data-wow-delay="0.85s"
                    border="2px solid #02BBFE"
                    background="#fff"
                    width="180px"
                    borderRadius={15}
                    onClick={() => {
                      greenGuardiansInstance ? PageSwitch(DefaultNav.PROGRAM_GLC) : PageSwitch(DefaultNav.CONTACT_US);
                    }}
                  >
                    <ButtonText color="#02BBFE" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
                      {/* {texts.REQUEST_A_DEMO} */}
                      {greenGuardiansInstance ? texts.GG_FIND_OUT_MORE : texts.REQUEST_A_DEMO}
                    </ButtonText>
                  </Button>
                </Box>
              </Fade>
            </Box>
          </Grid>
        </Grid>

        {/* features third content */}
        <Grid container spacing={3} alignItems="center" justifyContent="space-between" className={classes.gridBottom}>
          <Grid item xs={12} md={12} lg={6} className={`${classes.content} ${classes.orderContentFirst} fadeInLeft animated`}>
            <Box className={classes.fadeContent}>
              <Fade left>
                {/* <Box className={classes.itemCentered}>
                  <TextCapitalize className={`${classes.itemCentered} poppins-font-400`} fontSize="18px">
                    <span className={classes.smallTag}>{texts.FEATURES_THIRD_CARD_TAG}</span>
                  </TextCapitalize>
                </Box> */}

                <Box className={classes.cardTitleBoxThree}>
                  <H4
                    fontWeight="600"
                    color="#112D70"
                    className={`${classes.marginBottom2} ${classes.itemCentered} ${classes.cardTitle}`}
                  >
                    {texts.FEATURES_THIRD_CARD_TITLE}
                    {/* <span style={{ color: '#02BBFE', paddingLeft: 8 }}>{texts.COMPLETE}</span> */}
                  </H4>
                </Box>
                <Box className={`${classes.itemCentered} ${classes.cardTextBox}`}>
                  <List>
                    {thirdCardItemText.map((text, index) => (
                      <ListItem key={index} className={classes.listItem}>
                        <ListItemText>
                          <Body1
                            className={`${classes.itemCentered} ${classes.cardText} poppins-font-400`}
                            textAlign="left"
                            color="#5E5E5E"
                          >
                            {text}
                          </Body1>
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box mt={3} className={classes.itemCentered}>
                  <Button
                    className={`fadeInLeft animated ${classes.firstButton}`}
                    data-wow-delay="0.85s"
                    tag="forLearners"
                    borderRadius={15}
                    width="180px"
                    background="#00BBFF"
                    onClick={
                      greenGuardiansInstance
                        ? handleDemo
                        : () => {
                            PageSwitch(AccountNav.SIGN_UP);
                            AppControl.SetLoginType(false);
                            AppControl.SetLoginComingFrom('signUp');
                          }
                    }
                    m={0}
                    ml={1}
                  >
                    <ButtonText color="#fff" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
                      {texts.GET_STARTED}
                    </ButtonText>
                  </Button>
                  <Button
                    className={`fadeInLeft animated `}
                    data-wow-delay="0.85s"
                    border="2px solid #02BBFE"
                    background="#fff"
                    width="180px"
                    borderRadius={15}
                    onClick={() => {
                      greenGuardiansInstance ? PageSwitch(DefaultNav.PROGRAM_GLC) : PageSwitch(DefaultNav.CONTACT_US);
                    }}
                  >
                    <ButtonText color="#02BBFE" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
                      {/* {texts.REQUEST_A_DEMO} */}
                      {greenGuardiansInstance ? texts.GG_FIND_OUT_MORE : texts.REQUEST_A_DEMO}
                    </ButtonText>
                  </Button>
                </Box>
              </Fade>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={6}
            className={`${classes.responsiveCard} ${classes.orderImageFirst} animated fadeInRight wow`}
          >
            <Fade right>
              <img src={IMAGES.FEATURE_IMAGE_THREE} alt="Game-based learning" className={classes.image} />
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FeaturesSection;
